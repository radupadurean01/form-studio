import { Container } from "./container";
import { Section } from "./section";
import { Eyebrow } from "./eyebrow";
import { Reveal } from "./reveal";
import { TrainersGrid } from "./trainers-grid";
import { getTeamMembers, getSettings } from "@/lib/queries";

export async function Trainers() {
  const [members, settings] = await Promise.all([
    getTeamMembers(),
    getSettings(),
  ]);
  if (members.length === 0) return null;

  return (
    <Section id="antrenori" className="bg-cream">
      <Container>
        <Reveal className="text-center mb-16 sm:mb-20">
          {settings?.trainers_eyebrow && (
            <Eyebrow className="mb-4">{settings.trainers_eyebrow}</Eyebrow>
          )}
          {settings?.trainers_title_html && (
            <h2
              className="font-display text-[clamp(56px,7vw,112px)] font-normal tracking-tight leading-none mb-5"
              dangerouslySetInnerHTML={{
                __html: settings.trainers_title_html,
              }}
            />
          )}
          {settings?.trainers_subtitle && (
            <p className="font-display italic font-medium text-2xl text-ink-muted max-w-[50ch] mx-auto">
              {settings.trainers_subtitle}
            </p>
          )}
        </Reveal>

        <TrainersGrid members={members} />
      </Container>
    </Section>
  );
}
