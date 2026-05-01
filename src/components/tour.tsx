import Image from "next/image";
import { Container } from "./container";
import { Section } from "./section";
import { Eyebrow } from "./eyebrow";
import { getTourTiles, getSettings } from "@/lib/queries";

export async function Tour() {
  const [tiles, settings] = await Promise.all([getTourTiles(), getSettings()]);
  if (tiles.length === 0) return null;

  return (
    <Section id="spatiul" className="bg-cream-warm">
      <Container>
        <div className="text-center mb-16 sm:mb-20">
          {settings?.tour_eyebrow && (
            <Eyebrow className="mb-4">{settings.tour_eyebrow}</Eyebrow>
          )}
          {settings?.tour_title_html && (
            <h2
              className="font-display text-[clamp(56px,7vw,112px)] font-normal tracking-tight leading-none"
              dangerouslySetInnerHTML={{ __html: settings.tour_title_html }}
            />
          )}
        </div>

        {/* Bento grid — 6 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-6 auto-rows-[260px] gap-4">
          {tiles.map((tile) => (
            <div
              key={tile.id}
              className={`relative overflow-hidden rounded-2xl bg-charcoal group ${tile.span_class}`}
            >
              {tile.image_url && (
                <Image
                  src={tile.image_url}
                  alt={tile.title}
                  fill
                  className="object-cover transition-transform duration-900 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105"
                  sizes="(min-width: 640px) 33vw, 100vw"
                />
              )}
              {/* Gradient overlay — stronger so captions stay legible on bright images */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(26,24,21,0) 35%, rgba(26,24,21,0.55) 70%, rgba(26,24,21,0.92) 100%)",
                }}
              />
              {/* Caption */}
              <div className="absolute bottom-7 left-7 right-7 z-10 text-on-dark">
                {tile.eyebrow && (
                  <span className="block mb-2 font-body text-[11px] font-medium uppercase tracking-[0.24em] text-on-dark/85 drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]">
                    {tile.eyebrow}
                  </span>
                )}
                <span className="font-display text-[28px] sm:text-[32px] font-medium leading-[1.05] drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                  {tile.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
