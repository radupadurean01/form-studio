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
  return (
    <>
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
