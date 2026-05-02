import Link from "next/link";
import { Pencil, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

const PAGES = [
  {
    slug: "license",
    label: "Termeni și condiții",
    publicPath: "/license",
    htmlField: "legal_license_html" as const,
    approvedField: "legal_license_approved" as const,
  },
  {
    slug: "privacy",
    label: "Politică de confidențialitate",
    publicPath: "/privacy",
    htmlField: "legal_privacy_html" as const,
    approvedField: "legal_privacy_approved" as const,
  },
  {
    slug: "cookies",
    label: "Politică de cookie-uri",
    publicPath: "/cookies",
    htmlField: "legal_cookies_html" as const,
    approvedField: "legal_cookies_approved" as const,
  },
];

export default async function AdminLegalPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("site_settings")
    .select(
      "legal_license_html, legal_license_approved, legal_privacy_html, legal_privacy_approved, legal_cookies_html, legal_cookies_approved"
    )
    .single();

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="font-heading text-2xl mb-2">Pagini legale</h1>
      <p className="font-body text-base text-muted mb-8">
        Editează conținutul paginilor legale afișate în footer. Bifează
        „Aprobat" pe fiecare pagină ca să dispară bannerul de avertisment de pe
        site.
      </p>

      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
        {PAGES.map((p) => {
          const approved = settings?.[p.approvedField] ?? false;
          const wordCount =
            (settings?.[p.htmlField] ?? "")
              .replace(/<[^>]*>/g, " ")
              .split(/\s+/)
              .filter(Boolean).length;

          return (
            <Link
              key={p.slug}
              href={`/admin/legal/${p.slug}`}
              className="flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="font-body text-base font-medium">{p.label}</p>
                <p className="font-body text-sm text-muted mt-0.5">
                  <code>{p.publicPath}</code> · {wordCount} cuvinte
                </p>
              </div>
              <div
                className={`flex items-center gap-1.5 text-sm ${
                  approved ? "text-sage" : "text-amber-600"
                }`}
              >
                {approved ? <Eye size={16} /> : <EyeOff size={16} />}
                {approved ? "Aprobat" : "Provizoriu"}
              </div>
              <Pencil size={16} className="text-muted" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
