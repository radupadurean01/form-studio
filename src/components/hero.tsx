import { getSettings } from "@/lib/queries";
import { HeroSlider } from "./hero-slider";
import { Button } from "./button";
import { RevealStagger, RevealItem } from "./reveal";

export async function Hero() {
  const settings = await getSettings();
  if (!settings) return null;

  const slides = [
    { src: settings.hero_slider_image_1, alt: "Form Studio" },
    { src: settings.hero_slider_image_2, alt: "Form Studio" },
    { src: settings.hero_slider_image_3, alt: "Form Studio" },
  ].filter((s) => s.src);

  return (
    <section id="hero" className="relative h-screen min-h-[700px] overflow-hidden bg-black-warm">
      {/* Background slider */}
      <HeroSlider slides={slides} />

      {/* Flat overlay — boosts contrast across the entire hero for legibility */}
      <div
        className="absolute inset-0 pointer-events-none bg-ink/40"
        aria-hidden
      />

      {/* Soft bottom attenuation — extra contrast where the text sits */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "linear-gradient(180deg, rgba(26,24,21,0) 50%, rgba(26,24,21,0.35) 100%)",
        }}
      />

      {/* Content — bottom-aligned. Cascade in once the hero image has settled. */}
      <RevealStagger
        className="relative z-10 h-full flex flex-col justify-end max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-20 py-16 lg:py-20 text-on-dark"
        stagger={0.18}
        delayChildren={0.4}
      >
        {/* Eyebrow */}
        <RevealItem className="self-start">
          <span className="inline-flex items-center px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm text-[10px] sm:text-[12px] tracking-[0.32em] uppercase font-medium mb-6">
            {settings.hero_eyebrow}
          </span>
        </RevealItem>

        {/* Title */}
        <RevealItem>
          <h1
            className="font-display text-[clamp(64px,9vw,144px)] font-normal leading-[0.92] tracking-tight max-w-[12ch] mb-8"
            dangerouslySetInnerHTML={{ __html: settings.hero_title_html }}
          />
        </RevealItem>

        {/* Tagline */}
        <RevealItem>
          <p className="font-display italic text-2xl mb-8">
            {settings.hero_subtitle}
          </p>
        </RevealItem>

        {/* CTA */}
        <RevealItem>
          <Button
            href={settings.hero_cta_href || "#membri"}
            variant="solid-mustard"
          >
            {settings.hero_cta_label || "Devino membru →"}
          </Button>
        </RevealItem>
      </RevealStagger>
    </section>
  );
}
