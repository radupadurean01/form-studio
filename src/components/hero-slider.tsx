"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const INTERVAL = 3000;

export type HeroSlide = { src: string; alt: string };

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [next, slides.length]);

  if (slides.length === 0) return null;

  return (
    <>
      {slides.map((slide, i) => (
        <Image
          key={slide.src + i}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={i === 0}
          className={`object-cover transition-opacity duration-2000 ease-in-out ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          sizes="100vw"
        />
      ))}
    </>
  );
}
