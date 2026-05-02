import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Tour } from "@/components/tour";
import { MembershipPreview } from "@/components/membership-preview";
import { Trainers } from "@/components/trainers";
import { Programs } from "@/components/programs";
import { Testimonials } from "@/components/testimonials";
import { MembershipPricingWrapper } from "@/components/membership-pricing-wrapper";
import { Contact } from "@/components/contact";
import { ClosingCta } from "@/components/closing-cta";
import { Footer } from "@/components/footer";
import { getSettings } from "@/lib/queries";

export default async function Home() {
  const settings = await getSettings();
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://form-studio.example";

  // LocalBusiness JSON-LD — helps Google Maps / "near me" / knowledge panel.
  const sameAs = [
    settings?.instagram_url,
    settings?.facebook_url,
    settings?.linkedin_url,
  ].filter(Boolean) as string[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthClub",
    name: "Form Studio",
    description:
      "Form Studio este un spațiu gândit pentru oameni care vor să se miște bine, să se simtă bine și să nu fie judecați.",
    url: baseUrl,
    image: `${baseUrl}/opengraph-image`,
    ...(settings?.address && { address: settings.address }),
    ...(settings?.contact_email && { email: settings.contact_email }),
    ...(settings?.contact_phone && { telephone: settings.contact_phone }),
    ...(sameAs.length > 0 && { sameAs }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header
        logoWhiteUrl={settings?.logo_white_url}
        logoDarkUrl={settings?.logo_dark_url}
      />
      <main className="flex-1">
        <Hero />
        <About />
        <Tour />
        <MembershipPreview />
        <Trainers />
        <Programs />
        <Testimonials />
        <MembershipPricingWrapper />
        <Contact />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
