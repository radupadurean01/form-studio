"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Despre", href: "#despre" },
  { label: "Studio-ul", href: "#spatiul" },
  { label: "Antrenori", href: "#antrenori" },
  { label: "Programe", href: "#programe" },
  { label: "Prețuri", href: "#membri" },
  { label: "Contact", href: "#contact" },
];

export function Header({
  logoWhiteUrl = "/logos/logo-horizontal-white.svg",
  logoDarkUrl = "/logos/logo-horizontal-black.svg",
}: {
  logoWhiteUrl?: string;
  logoDarkUrl?: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Once the hero is no longer intersecting, we've scrolled past it
        setPastHero(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // Highlight the nav link whose section is currently in the upper-middle band of the viewport
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] pt-4">
      <div className="mx-auto w-full max-w-[1320px] px-6 sm:px-10">
        <nav
          className={`
            flex items-center justify-between
            px-6 sm:px-8 py-4 rounded-2xl
            transition-all duration-500 ease-out
            ${
              pastHero
                ? "bg-white/95 backdrop-blur-md text-ink shadow-[0_2px_20px_rgba(0,0,0,0.08)]"
                : "bg-black-warm/20 backdrop-blur-md text-white shadow-[0_2px_20px_rgba(0,0,0,0.15)]"
            }
          `}
        >
        {/* Brand mark — cross-fades between white (over hero) and black (past hero) */}
        <Link href="/" className="relative block" aria-label="Form Studio">
          <Image
            src={logoWhiteUrl}
            alt="Form Studio"
            width={580}
            height={197}
            priority
            className={`h-8 w-auto transition-opacity duration-500 ${
              pastHero ? "opacity-0" : "opacity-100"
            }`}
          />
          <Image
            src={logoDarkUrl}
            alt=""
            aria-hidden
            width={580}
            height={197}
            priority
            className={`absolute inset-0 h-8 w-auto transition-opacity duration-500 ${
              pastHero ? "opacity-100" : "opacity-0"
            }`}
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-10 list-none">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative font-body text-[14px] tracking-[0.08em] transition-opacity ${
                    isActive ? "opacity-100" : "opacity-85 hover:opacity-60"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-terracotta"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2"
          aria-label={mobileOpen ? "Închide meniu" : "Deschide meniu"}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        </nav>
      </div>

      {/* Mobile nav overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-[101] bg-black-warm/95 text-on-dark flex flex-col items-center justify-center gap-8"
          onClick={() => setMobileOpen(false)}
        >
          <button
            className="absolute top-6 right-6 p-2"
            aria-label="Închide meniu"
          >
            <X size={24} />
          </button>
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`font-display text-3xl font-light tracking-tight transition-opacity ${
                  isActive ? "opacity-100 text-terracotta" : "hover:opacity-60"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
