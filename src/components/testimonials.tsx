import { Star } from "lucide-react";
import { Container } from "./container";
import { Section } from "./section";
import { Eyebrow } from "./eyebrow";
import { getTestimonials, getSettings } from "@/lib/queries";

export async function Testimonials() {
  const [testimonials, settings] = await Promise.all([
    getTestimonials(),
    getSettings(),
  ]);

  if (!settings?.show_testimonials || testimonials.length === 0) return null;

  return (
    <Section id="testimoniale" className="bg-cream">
      <Container>
        <div className="text-center mb-16 sm:mb-20">
          <Eyebrow className="mb-4">Testimoniale</Eyebrow>
          <h2 className="font-display text-[clamp(48px,6vw,88px)] font-normal tracking-tight leading-none max-w-[14ch] mx-auto">
            Ce spun <em className="italic">membrii.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t) => {
            const initials = t.author_name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2);
            return (
              <article
                key={t.id}
                className="group bg-cream-warm rounded-2xl p-7 sm:p-8 flex flex-col transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(31,26,20,0.18)]"
              >
                {t.rating != null && (
                  <div className="flex gap-0.5 mb-5 text-mustard-deep">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < t.rating! ? "currentColor" : "none"}
                        strokeWidth={1.5}
                      />
                    ))}
                  </div>
                )}
                <p className="font-display italic text-[18px] sm:text-[20px] leading-[1.45] text-ink mb-7 flex-1">
                  {t.quote}
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  {t.photo_url ? (
                    <img
                      src={t.photo_url}
                      alt={t.author_name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-cream-deep flex items-center justify-center font-display text-[14px] text-walnut transition-colors duration-500 group-hover:bg-oak group-hover:text-cream-warm">
                      {initials}
                    </div>
                  )}
                  <div>
                    <div className="font-display text-[15px] font-medium text-ink leading-tight">
                      {t.author_name}
                    </div>
                    {t.author_role && (
                      <div className="text-[11px] tracking-[0.16em] uppercase text-ink-muted font-medium mt-0.5">
                        {t.author_role}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
