import type { Metadata } from "next";
import { getSettings } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Termeni și condiții — Form Studio",
  description:
    "Termenii și condițiile de utilizare a site-ului și serviciilor Form Studio.",
};

export default async function LicensePage() {
  const settings = await getSettings();
  return (
    <div
      className="legal-content"
      dangerouslySetInnerHTML={{
        __html: settings?.legal_license_html ?? "",
      }}
    />
  );
}
