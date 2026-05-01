import { Eyebrow } from "./eyebrow";
import { Button } from "./button";
import { getSettings } from "@/lib/queries";

export async function MembershipPreview() {
  const settings = await getSettings();
  if (!settings) return null;

  return (
    <section id="membri-preview" className="bg-cream-warm">
      <div className="relative h-[70vh] min-h-[560px] overflow-hidden bg-black-warm text-on-dark">
        {/* Background photo with parallax (fixed to viewport) — section becomes a window onto the image */}
        {settings.membership_preview_bg_image_url && (
          <div
            aria-hidden
            className="absolute inset-0 bg-fixed bg-cover bg-center"
            style={{
              backgroundImage: `url('${settings.membership_preview_bg_image_url}')`,
            }}
          />
        )}

        {/* Glassy gradient — image clear at top, frosted dark at bottom for text legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(26,24,21,0) 0%, rgba(26,24,21,0.05) 30%, rgba(26,24,21,0.5) 65%, rgba(26,24,21,0.92) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none backdrop-blur-[2px]"
          style={{
            maskImage:
              "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,1) 100%)",
            WebkitMaskImage:
              "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,1) 100%)",
          }}
        />

        {/* Content — bottom-aligned cluster */}
        <div className="relative z-10 h-full max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-20 flex flex-col justify-end py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-12 lg:gap-20 items-end">
            {/* Big number */}
            <div>
              <div className="font-display text-[clamp(160px,18vw,280px)] font-normal leading-[0.85] tracking-[-0.05em]">
                {settings.membership_preview_number}
              </div>
              {settings.membership_preview_max_label && (
                <div className="text-[12px] tracking-[0.24em] uppercase opacity-65 font-medium mt-3">
                  {settings.membership_preview_max_label}
                </div>
              )}
            </div>

            {/* Text + CTA */}
            <div className="max-w-[440px] pb-3">
              {settings.membership_preview_eyebrow && (
                <Eyebrow tone="dark" className="mb-5">
                  {settings.membership_preview_eyebrow}
                </Eyebrow>
              )}
              {settings.membership_preview_title_html && (
                <h3
                  className="font-display text-5xl font-normal leading-[1.05] tracking-tight mb-5"
                  dangerouslySetInnerHTML={{
                    __html: settings.membership_preview_title_html,
                  }}
                />
              )}
              {settings.membership_preview_body && (
                <p className="font-body text-base leading-[1.7] opacity-85 mb-7">
                  {settings.membership_preview_body}
                </p>
              )}
              {settings.membership_preview_cta_label && (
                <Button
                  href={settings.membership_preview_cta_href || "#membri"}
                  variant="solid-mustard"
                >
                  {settings.membership_preview_cta_label}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
