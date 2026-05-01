"use server";

import { createClient } from "@/lib/supabase/server";
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

  return { success: true };
}
