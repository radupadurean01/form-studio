"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { TeamMember } from "@/lib/supabase/types";
import { blobCount } from "./blob-defs";
import { RevealStagger, RevealItem } from "./reveal";

// Temporary Unsplash placeholders — replaced once real trainer photos are uploaded
const placeholderPhotos = [
  "https://images.unsplash.com/photo-1648542036561-e1d66a5ae2b1?w=600&h=750&fit=crop",
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=750&fit=crop",
  "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=600&h=750&fit=crop",
  "https://images.unsplash.com/photo-1584466977773-e625c37cdd50?w=600&h=750&fit=crop",
  "https://images.unsplash.com/photo-1704223523303-a5ed14561b1f?w=600&h=750&fit=crop",
  "https://images.unsplash.com/photo-1519311965067-36d3e5f33d39?w=600&h=750&fit=crop",
];

function photoFor(member: TeamMember, idx: number) {
  return member.photo_url ?? placeholderPhotos[idx % placeholderPhotos.length];
}

export function TrainersGrid({ members }: { members: TeamMember[] }) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const titleId = useId();

  const active = activeIdx !== null ? members[activeIdx] : null;

  useEffect(() => {
    if (!active) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveIdx(null);
    }
    window.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus to close button so Escape/Tab feel natural
    closeBtnRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active]);

  return (
    <>
      <RevealStagger className="flex flex-wrap justify-center gap-6 lg:gap-8">
        {members.map((member, idx) => {
          const blobId = `blob-${(idx % blobCount) + 1}`;
          const displayPhoto = photoFor(member, idx);
          return (
            <RevealItem
              key={member.id}
              className="basis-[calc(50%-12px)] sm:basis-[calc(33.333%-16px)] lg:basis-[calc(33.333%-21.334px)]"
            >
              <button
                type="button"
                onClick={() => setActiveIdx(idx)}
                aria-label={`Detalii despre ${member.name}`}
                className="w-full text-center group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream rounded-lg"
              >
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
                <div className="font-display text-3xl font-medium mb-1">
                  {member.name}
                </div>
                <div className="font-display italic text-xl font-medium text-terracotta">
                  {member.years_experience} ani experiență
                </div>
              </button>
            </RevealItem>
          );
        })}
      </RevealStagger>

      <AnimatePresence>
        {active && activeIdx !== null && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveIdx(null)}
            className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            <motion.div
              key="dialog"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-cream rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => setActiveIdx(null)}
                aria-label="Închide"
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-ink hover:bg-ink/85 text-cream flex items-center justify-center transition-colors shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
              >
                <X size={18} />
              </button>

              <div className="grid sm:grid-cols-[320px_1fr] gap-8 p-6 sm:p-8">
                {/* Photo with the same blob mask as the card */}
                <div
                  className="relative w-full bg-cream-deep overflow-hidden aspect-[4/5] sm:aspect-auto sm:h-full sm:min-h-[400px]"
                  style={{
                    clipPath: `url(#blob-${(activeIdx % blobCount) + 1})`,
                  }}
                >
                  <img
                    src={photoFor(active, activeIdx)}
                    alt={active.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                <div>
                  {/* Role / short bio as eyebrow above the name */}
                  {active.short_bio && (
                    <div className="text-xs tracking-[0.22em] uppercase text-ink-muted font-medium mb-3">
                      {active.short_bio}
                    </div>
                  )}

                  <h3
                    id={titleId}
                    className="font-display text-4xl sm:text-5xl font-medium leading-tight mb-2"
                  >
                    {active.name}
                  </h3>

                  <div className="font-display italic text-xl text-terracotta mb-6">
                    {active.years_experience} ani experiență
                  </div>

                  {/* Decorative divider */}
                  <div
                    className="w-12 h-px bg-terracotta mb-6"
                    aria-hidden="true"
                  />

                  {active.long_bio && (
                    <p className="font-body text-base text-ink-muted leading-relaxed mb-7 whitespace-pre-line">
                      {active.long_bio}
                    </p>
                  )}

                  {active.experience_items &&
                    active.experience_items.length > 0 && (
                      <div>
                        <div className="text-xs tracking-[0.22em] uppercase text-ink-muted font-medium mb-3">
                          Specializări
                        </div>
                        <ul className="space-y-2.5">
                          {active.experience_items.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 font-body text-base text-ink-muted leading-relaxed"
                            >
                              <span
                                className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-terracotta shrink-0"
                                aria-hidden="true"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
