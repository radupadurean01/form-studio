import type { Metadata } from "next";
import { getSettings } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Politică de cookie-uri — Form Studio",
  description:
    "Ce cookie-uri folosim, cum le poți gestiona și cui se aplică.",
};

export default async function CookiesPage() {
  const settings = await getSettings();
  return (
    <div
      className="legal-content"
      dangerouslySetInnerHTML={{
        __html: settings?.legal_cookies_html ?? "",
      }}
    />
  );
}
