import { Eyebrow } from "./eyebrow";
import { Button } from "./button";
import { Reveal } from "./reveal";
import { getSettings } from "@/lib/queries";

export async function ClosingCta() {
  const settings = await getSettings();

  return (
    <section
      id="contact"
      className="bg-terracotta text-cream-warm py-32 sm:py-40 lg:py-52 px-6 text-center"
    >
      <Reveal>
        {settings?.closing_eyebrow && (
          <Eyebrow tone="dark" className="mb-8">
            {settings.closing_eyebrow}
          </Eyebrow>
        )}
        {settings?.closing_title_html && (
          <h2
            className="font-display text-[clamp(64px,9vw,144px)] font-normal leading-[0.95] tracking-tight max-w-[14ch] mx-auto mb-12"
            dangerouslySetInnerHTML={{ __html: settings.closing_title_html }}
          />
        )}
        {settings?.closing_button_label && (
          <Button
            href={settings.closing_button_href || "#contact"}
            variant="outline-light"
          >
            {settings.closing_button_label}
          </Button>
        )}
      </Reveal>
    </section>
  );
}
