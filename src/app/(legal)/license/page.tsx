import type { Metadata } from "next";
import { getSettings } from "@/lib/queries";
import { PlaceholderBanner } from "@/components/placeholder-banner";

export const metadata: Metadata = {
  title: "Termeni și condiții — Form Studio",
  description:
    "Termenii și condițiile de utilizare a site-ului și serviciilor Form Studio.",
};

export default async function LicensePage() {
  const settings = await getSettings();
  return (
    <>
      {!settings?.legal_license_approved && <PlaceholderBanner />}
      <div
        className="legal-content"
        dangerouslySetInnerHTML={{
          __html: settings?.legal_license_html ?? "",
        }}
      />
    </>
  );
}
