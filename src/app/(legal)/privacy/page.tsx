import type { Metadata } from "next";
import { getSettings } from "@/lib/queries";
import { PlaceholderBanner } from "@/components/placeholder-banner";

export const metadata: Metadata = {
  title: "Politică de confidențialitate — Form Studio",
  description:
    "Cum colectăm, folosim și protejăm datele personale ale vizitatorilor și membrilor Form Studio.",
};

export default async function PrivacyPage() {
  const settings = await getSettings();
  return (
    <>
      {!settings?.legal_privacy_approved && <PlaceholderBanner />}
      <div
        className="legal-content"
        dangerouslySetInnerHTML={{
          __html: settings?.legal_privacy_html ?? "",
        }}
      />
    </>
  );
}
