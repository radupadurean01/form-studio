import { Container } from "./container";
import { Section } from "./section";
import { Eyebrow } from "./eyebrow";
import { blobCount } from "./blob-defs";
import { getTeamMembers, getSettings } from "@/lib/queries";

// Temporary Unsplash placeholders — replaced once real trainer photos are uploaded
const placeholderPhotos = [
  "https://images.unsplash.com/photo-1648542036561-e1d66a5ae2b1?w=600&h=750&fit=crop",
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=750&fit=crop",
  "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=600&h=750&fit=crop",
  "https://images.unsplash.com/photo-1584466977773-e625c37cdd50?w=600&h=750&fit=crop",
  "https://images.unsplash.com/photo-1704223523303-a5ed14561b1f?w=600&h=750&fit=crop",
  "https://images.unsplash.com/photo-1519311965067-36d3e5f33d39?w=600&h=750&fit=crop",
];

export async function Trainers() {
  const [members, settings] = await Promise.all([
    getTeamMembers(),
    getSettings(),
  ]);
  if (members.length === 0) return null;

  return (
    <Section id="antrenori" className="bg-cream">
      <Container>
        <div className="text-center mb-16 sm:mb-20">
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
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {members.map((member, idx) => {
            // Cycle through blob variants so each portrait feels distinct
            const blobId = `blob-${(idx % blobCount) + 1}`;
            const displayPhoto =
              member.photo_url ??
              placeholderPhotos[idx % placeholderPhotos.length];
            return (
              <div key={member.id} className="text-center group cursor-pointer">
                {/* Organic blob mask */}
                <div
                  className="relative w-full aspect-[4/5] bg-cream-deep overflow-hidden mb-5 transition-all duration-400 group-hover:bg-oak"
                  style={{ clipPath: `url(#${blobId})` }}
                >
                  <img
                    src={displayPhoto}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="font-display text-3xl font-medium mb-1">
                  {member.name}
                </div>
                {/* <div className="text-xs tracking-[0.22em] uppercase text-ink-muted font-medium mb-1.5">
                  {member.short_bio}
                </div> */}
                <div className="font-display italic text-xl font-medium text-terracotta">
                  {member.years_experience} ani experiență
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
