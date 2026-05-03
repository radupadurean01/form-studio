import Image from "next/image";
import { Container } from "./container";
import { Section } from "./section";
import { Eyebrow } from "./eyebrow";
import { RevealStagger, RevealItem } from "./reveal";
import { getSettings } from "@/lib/queries";

export async function About() {
  const settings = await getSettings();
  if (!settings) return null;

  return (
    <Section id="despre" className="bg-cream">
      <Container>
        <RevealStagger className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image — organic blob mask */}
          <RevealItem
            className="relative aspect-[4/5] overflow-hidden"
            style={{ clipPath: "url(#blob-1)" }}
          >
            {settings.about_image_url && (
              <Image
                src={settings.about_image_url}
                alt="Form Studio interior"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            )}
          </RevealItem>

          {/* Text */}
          <RevealItem>
            <Eyebrow className="mb-8">Despre noi</Eyebrow>
            <h2
              className="font-display text-[clamp(36px,4.2vw,64px)] font-normal leading-[1.05] tracking-tight mb-10"
              dangerouslySetInnerHTML={{ __html: settings.about_title }}
            />

            <div
              className="font-body text-base text-ink-muted leading-[1.75] max-w-[48ch] space-y-6 [&>p]:mb-0"
              dangerouslySetInnerHTML={{ __html: settings.about_body_html }}
            />
            {settings.about_signature && (
              <span className="font-script text-[28px] text-terracotta mt-6 inline-block">
                {settings.about_signature}
              </span>
            )}
          </RevealItem>
        </RevealStagger>
      </Container>
    </Section>
  );
}
