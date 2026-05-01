import { Eyebrow } from "./eyebrow";
import { Container } from "./container";
import { Section } from "./section";
import { ProgramsList } from "./programs-list";
import { getPrograms, getSettings } from "@/lib/queries";

export async function Programs() {
  const [programs, settings] = await Promise.all([
    getPrograms(),
    getSettings(),
  ]);
  if (programs.length === 0) return null;

  return (
    <Section id="programe" className="bg-cream-warm">
      <Container>
        <div className="mb-16 sm:mb-20">
          {settings?.programs_eyebrow && (
            <Eyebrow className="mb-4">{settings.programs_eyebrow}</Eyebrow>
          )}
          {settings?.programs_title_html && (
            <h2
              className="font-display text-[clamp(56px,7vw,112px)] font-normal tracking-tight leading-none max-w-[14ch]"
              dangerouslySetInnerHTML={{
                __html: settings.programs_title_html,
              }}
            />
          )}
        </div>

        <ProgramsList programs={programs} />
      </Container>
    </Section>
  );
}
