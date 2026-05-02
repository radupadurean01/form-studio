import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { LegalEditor } from "@/components/admin/legal-editor";

const PAGES = {
  license: {
    label: "Termeni și condiții",
    publicPath: "/license",
    htmlField: "legal_license_html",
    approvedField: "legal_license_approved",
  },
  privacy: {
    label: "Politică de confidențialitate",
    publicPath: "/privacy",
    htmlField: "legal_privacy_html",
    approvedField: "legal_privacy_approved",
  },
  cookies: {
    label: "Politică de cookie-uri",
    publicPath: "/cookies",
    htmlField: "legal_cookies_html",
    approvedField: "legal_cookies_approved",
  },
} as const;

export default async function LegalEditorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!(slug in PAGES)) notFound();
  const page = PAGES[slug as keyof typeof PAGES];

  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("site_settings")
    .select(`${page.htmlField}, ${page.approvedField}`)
    .single();

  const html =
    (settings?.[page.htmlField as keyof typeof settings] as unknown as string) ??
    "";
  const approved =
    (settings?.[page.approvedField as keyof typeof settings] as unknown as boolean) ??
    false;

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/admin/legal"
        className="inline-flex items-center gap-2 font-body text-sm text-muted hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        Toate paginile legale
      </Link>

      <h1 className="font-heading text-2xl mb-1">{page.label}</h1>
      <p className="font-body text-base text-muted mb-8">
        Apare pe site la <code>{page.publicPath}</code>
      </p>

      <LegalEditor
        htmlField={page.htmlField}
        approvedField={page.approvedField}
        initialHtml={html}
        initialApproved={approved}
      />
    </div>
  );
}
