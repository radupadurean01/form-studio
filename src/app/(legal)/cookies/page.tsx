import type { Metadata } from "next";
import { getSettings } from "@/lib/queries";
import { PlaceholderBanner } from "@/components/placeholder-banner";

export const metadata: Metadata = {
  title: "Politică de cookie-uri — Form Studio",
  description:
    "Ce cookie-uri folosim, cum le poți gestiona și cui se aplică.",
};

export default async function CookiesPage() {
  const settings = await getSettings();
  return (
    <>
      {!settings?.legal_cookies_approved && <PlaceholderBanner />}
      <div
        className="legal-content"
        dangerouslySetInnerHTML={{
          __html: settings?.legal_cookies_html ?? "",
        }}
      />
    </>
  );
}
