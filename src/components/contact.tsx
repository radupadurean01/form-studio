import { Container } from "./container";
import { Section } from "./section";
import { Eyebrow } from "./eyebrow";
import { RevealStagger, RevealItem } from "./reveal";
import { ContactForm } from "./contact-form";
import { getSettings } from "@/lib/queries";

export async function Contact() {
  const settings = await getSettings();

  return (
    <Section id="contact" className="bg-cream">
      <Container>
        <RevealStagger className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Text */}
          <RevealItem>
            {settings?.contact_eyebrow && (
              <Eyebrow className="mb-8">{settings.contact_eyebrow}</Eyebrow>
            )}
            {settings?.contact_title_html && (
              <h2
                className="font-display text-[clamp(36px,4.2vw,64px)] font-normal leading-[1.05] tracking-tight mb-8"
                dangerouslySetInnerHTML={{
                  __html: settings.contact_title_html,
                }}
              />
            )}
            {settings?.contact_body && (
              <p className="font-body text-base text-ink-muted leading-[1.75] max-w-[44ch] mb-8">
                {settings.contact_body}
              </p>
            )}
            {settings && (
              <div className="font-body text-sm text-ink-muted space-y-2">
                {settings.address && <p>{settings.address}</p>}
                {settings.contact_email && (
                  <p>
                    <a
                      href={`mailto:${settings.contact_email}`}
                      className="hover:text-terracotta transition-colors"
                    >
                      {settings.contact_email}
                    </a>
                  </p>
                )}
                {settings.contact_phone && (
                  <p>
                    <a
                      href={`tel:${settings.contact_phone.replace(/\s+/g, "")}`}
                      className="hover:text-terracotta transition-colors"
                    >
                      {settings.contact_phone}
                    </a>
                  </p>
                )}
              </div>
            )}
          </RevealItem>

          {/* Form */}
          <RevealItem>
            <ContactForm />
          </RevealItem>
        </RevealStagger>
      </Container>
    </Section>
  );
}
