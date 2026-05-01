"use client";

import { useState } from "react";
import Image from "next/image";
import type { Program } from "@/lib/supabase/types";

export function ProgramsList({ programs }: { programs: Program[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-start">
      {/* List */}
      <div className="border-t border-ink/[0.12]">
        {programs.map((prog, i) => (
          <div
            key={prog.id}
            onMouseEnter={() => setActive(i)}
            className={`py-8 border-b border-ink/[0.12] cursor-pointer transition-all duration-500 relative ${
              i === active ? "pl-6" : "pl-0 hover:pl-6"
            }`}
          >
            {/* Active dot */}
            {i === active && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-terracotta" />
            )}
            <span className="font-display italic text-sm text-terracotta block mb-1.5">
              — {prog.num}
            </span>
            <h3 className="font-display text-[28px] lg:text-[36px] font-medium tracking-tight mb-2">
              {prog.title}
            </h3>
            <p className="font-body text-sm text-ink-muted max-w-[50ch] leading-[1.65]">
              {prog.body}
            </p>
          </div>
        ))}
      </div>

      {/* Sticky photo */}
      <div className="hidden lg:block sticky top-[100px]">
        <div
          className="relative aspect-[4/5] overflow-hidden bg-charcoal"
          style={{ clipPath: "url(#blob-3)" }}
        >
          {programs.map((prog, i) =>
            prog.photo_url ? (
              <Image
                key={prog.id}
                src={prog.photo_url}
                alt={prog.title}
                fill
                className={`object-cover transition-opacity duration-600 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
                sizes="40vw"
              />
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}
