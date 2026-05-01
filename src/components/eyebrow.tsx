interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "p" | "div";
  tone?: "light" | "dark";
}

export function Eyebrow({
  children,
  className = "",
  as: Tag = "span",
  tone = "light",
}: EyebrowProps) {
  const base =
    "inline-flex items-center px-5 py-2 rounded-full text-[12px] tracking-[0.32em] uppercase font-medium";
  const toneStyles =
    tone === "dark"
      ? "bg-white/10 backdrop-blur-sm text-cream-warm/85"
      : "bg-ink/[0.06] text-ink-muted";
  return <Tag className={`${base} ${toneStyles} ${className}`}>{children}</Tag>;
}
