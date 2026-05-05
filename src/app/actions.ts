"use server";

import { createClient } from "@/lib/supabase/server";
import { getSettings } from "@/lib/queries";
import { z } from "zod/v4";

const contactSchema = z.object({
  name: z.string().min(2, "Numele este obligatoriu"),
  email: z.email("Adresa de email nu este validă"),
  message: z.string().min(10, "Mesajul trebuie să aibă cel puțin 10 caractere"),
});

export type ContactState = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function notifyByEmail(data: z.infer<typeof contactSchema>): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const settings = await getSettings();
  const to = settings?.contact_email?.trim();
  if (!to) return;

  const from =
    process.env.CONTACT_NOTIFICATION_FROM ||
    "Form Studio <onboarding@resend.dev>";

  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safeMessage = escapeHtml(data.message).replace(/\n/g, "<br>");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `Mesaj nou de la ${data.name}`,
        text: `De la: ${data.name} <${data.email}>\n\n${data.message}`,
        html: `<p><strong>De la:</strong> ${safeName} &lt;${safeEmail}&gt;</p><p>${safeMessage}</p>`,
      }),
    });
    if (!res.ok) {
      console.error("Resend notify failed:", res.status, await res.text());
    }
  } catch (e) {
    console.error("Resend notify error:", e);
  }
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  const result = contactSchema.safeParse(raw);
  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string") {
        fieldErrors[key] = issue.message;
      }
    }
    return { success: false, fieldErrors };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("contact_submissions")
    .insert(result.data);

  if (error) {
    return { success: false, error: "A apărut o eroare. Încercați din nou." };
  }

  await notifyByEmail(result.data);

  return { success: true };
}
