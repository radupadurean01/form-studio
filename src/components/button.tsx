"use client";

import Link from "next/link";

type ButtonVariant = "outline-light" | "outline-dark" | "solid-mustard" | "solid-ink";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
}

const styles: Record<ButtonVariant, { base: string; hover: string }> = {
  "outline-light": {
    base: "border border-on-dark/40 text-on-dark",
    hover: "hover:bg-on-dark/[0.08] hover:border-on-dark/80 hover:shadow-[0_0_40px_rgba(217,168,76,0.3)]",
  },
  "outline-dark": {
    base: "border border-ink/20 text-ink",
    hover: "hover:bg-ink/[0.05] hover:border-ink/40",
  },
  "solid-mustard": {
    base: "bg-mustard text-ink border border-transparent",
    hover: "hover:bg-cream hover:-translate-y-0.5",
  },
  "solid-ink": {
    base: "bg-ink text-cream-warm border border-transparent",
    hover: "hover:bg-terracotta hover:-translate-y-0.5",
  },
};

export function Button({
  href,
  children,
  variant = "outline-light",
  className = "",
  onClick,
}: ButtonProps) {
  const safeHref = href ?? "#";
  const isAnchor = safeHref.startsWith("#") || safeHref.startsWith("http");
  const s = styles[variant];

  const cls = `inline-flex items-center gap-2.5 px-10 py-[18px] font-body text-[12px] tracking-[0.16em] uppercase font-medium rounded-full transition-all duration-400 ${s.base} ${s.hover} ${className}`;

  if (isAnchor) {
    return (
      <a href={safeHref} className={cls} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={safeHref} className={cls} onClick={onClick}>
      {children}
    </Link>
  );
}
