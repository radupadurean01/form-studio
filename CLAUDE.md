# Form Studio — Claude Code Guidelines

## Stack
- Next.js 14 (App Router, `src/` directory)
- TypeScript (strict)
- Tailwind CSS
- Framer Motion (animations)
- Supabase (Postgres + Auth + Storage)
- Lucide React (icons)
- Zod (validation)

## Conventions
- Import alias: `@/*` maps to `src/*`
- Conventional commits: `feat(scope): message`, `fix(scope): message`
- Server Components by default; `"use client"` only when needed
- All DB reads on public site via server components + ISR (`revalidateTag`)
- Romanian language (RO) — ensure diacritics render (ă, î, ș, ț, â)

## Do
- Run `tsc --noEmit` and `next build` before claiming a phase done
- Use `next/image` for all images with proper `sizes` attribute
- Lazy-load below-the-fold content
- Keep components small and focused
- Use server actions for form submissions and admin mutations

## Don't
- Don't add libraries not listed in BRIEF.md without asking
- Don't skip phases or jump ahead
- Don't guess visual decisions — ask Daniel
- Don't put legal content in the database (use MDX)
- Don't create `.env.local` with real keys in commits
