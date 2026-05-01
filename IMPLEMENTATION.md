# Form Studio — Implementation Plan

> Each phase ends with **Stop & verify** — commit, test, and confirm before moving on. Don't let Claude Code race past this. Phases are sized to be small enough to ship and verify.

---

## Phase 0 — Setup

**Goal:** Empty repo with Next.js running locally and deploying to Vercel.

- [ ] Create new GitHub repo `form-studio`
- [ ] `npx create-next-app@latest` — TypeScript, Tailwind, App Router, src dir, alias `@/*`
- [ ] Add `.env.local`, `.env.example`
- [ ] Install: `framer-motion`, `@supabase/supabase-js`, `@supabase/ssr`, `lucide-react`, `zod`
- [ ] Set up Supabase project (free tier, EU region)
- [ ] Add Supabase URL + anon key + service role key to `.env.local`
- [ ] Connect repo to Vercel, set env vars, verify preview deploy works
- [ ] Add `CLAUDE.md` at repo root (stack, conventions, do/don'ts)

**Stop & verify:** Push to main → Vercel deploys → default Next.js page loads on preview URL.

---

## Phase 1 — Design foundation

**Goal:** Tokens, typography, layout shell that matches Webflow's look.

- [ ] Drop Daniel's logo SVGs (white, black, black-gold) into `public/logos/`
- [ ] Identify Webflow's font families (inspect site) and load via `next/font`
- [ ] Define color tokens in `tailwind.config.ts` (background, foreground, gold/accent, muted)
- [ ] Build `<Container>`, `<Section>` primitives
- [ ] Build `<Header>` with anchor nav (Antrenori, Memberships, Contact) + Instagram icon
- [ ] Build `<Footer>` with logo, tagline, legal links, copyright
- [ ] Add Romanian-friendly font subsets (Latin Extended)
- [ ] Add base `globals.css` (resets, smooth scroll for anchor nav)

**Stop & verify:** Header + Footer render correctly on a blank page. Diacritics (ă, î, ș, ț) render properly. Anchor smooth-scroll works.

---

## Phase 2 — Database schema + seed

**Goal:** All tables created, RLS configured, seeded with current Webflow content.

- [ ] Create migration: `site_settings` (single row, enforced via check) — includes `show_testimonials` boolean default false
- [ ] Create migration: `benefits` (id, icon, title, description, order)
- [ ] Create migration: `team_members` (id, name, photo_url, years_experience, short_bio, long_bio, experience_items text[], order, published)
- [ ] Create migration: `testimonials` (id, author_name, author_role, photo_url nullable, quote, rating nullable, order, published)
- [ ] Create migration: `memberships` (id, name, price_ron, period, features text[], addon_name, addon_features text[], addon_discount_percent, addon_price_ron, order)
- [ ] Create migration: `contact_submissions` (id, name, email, message, created_at)
- [ ] RLS: public **read** on `site_settings`, `benefits`, `team_members` (where published=true), `testimonials` (where published=true), `memberships`
- [ ] RLS: public **insert** on `contact_submissions`, no read/update/delete
- [ ] RLS: authenticated full access (admin only) on all tables
- [ ] Generate TypeScript types via Supabase CLI
- [ ] Create Storage bucket `media` (public read, authenticated write)
- [ ] Seed script: insert 4 benefits, 5 trainers, 1 membership, settings — copy-paste from Webflow

**Stop & verify:** Run `select * from team_members` in Supabase SQL editor → 5 rows. Public anon key can read; insert without auth fails.

---

## Phase 3 — Public homepage (data-wired)

**Goal:** Pixel-close match to Webflow, fully driven by Supabase, server-rendered with ISR.

- [ ] `<Hero>` — title, subtitle, CTA, three-image collage, with reveal animation
- [ ] `<Benefits>` — 2x2 grid (responsive), icon + title + description from DB
- [ ] `<AboutMore>` — heading, body, CTA, two side images
- [ ] `<Team>` — horizontal carousel or grid; each card flips/expands to show long bio + experience list
- [ ] `<Testimonials>` — built but conditionally rendered: only mount if `site_settings.show_testimonials === true` AND there's at least one published testimonial. Nav link `#Reviews` rendered conditionally too.
- [ ] `<Gallery>` — "Un loc în care vrei să revii" image strip
- [ ] `<Memberships>` — pricing card with add-on; app store buttons render only if URL is set in settings (otherwise hide or link to `/coming-soon`)
- [ ] `<Contact>` — form (name, email, message) → server action → `contact_submissions` + email notification
- [ ] All sections fetch from Supabase (server components)
- [ ] ISR with `revalidateTag` per content type so dashboard edits propagate fast
- [ ] All images via `next/image` with proper `sizes`

**Stop & verify:** Side-by-side compare with Webflow on desktop + mobile. Submit contact form → row appears in `contact_submissions`. Lighthouse score ≥ 90 perf, ≥ 95 a11y.

---

## Phase 4 — Legal pages

**Goal:** /license, /privacy, /cookies live with **placeholder content** (real copy added before production).

- [ ] Set up MDX support (`@next/mdx` or `next-mdx-remote`)
- [ ] Create `content/legal/license.mdx`, `privacy.mdx`, `cookies.mdx`
- [ ] Build `<LegalLayout>` — readable typography, back-to-home link
- [ ] Add Romanian placeholder content with a clear banner at the top of each page: **"⚠️ Conținut provizoriu — a se înlocui înainte de lansare"** (or similar — make it visually obvious so the client doesn't ship as-is)
- [ ] Update footer links to point to new pages
- [ ] Add a TODO note in `BRIEF.md` open issues to replace before production

**Stop & verify:** All three legal pages load with the placeholder banner visible, link back to home.

---

## Phase 5 — Admin auth + shell

**Goal:** Locked-down /admin area with magic-link login.

- [ ] Configure Supabase Auth — email magic link, single allowed email (client's)
- [ ] `/admin/login` page with email input + magic link send
- [ ] `/admin/auth/callback` route handler
- [ ] Middleware to protect `/admin/*` (redirect to login if no session)
- [ ] `<AdminLayout>` — sidebar nav (Dashboard, Team, Benefits, Memberships, Settings, Submissions), logout button
- [ ] `/admin/dashboard` — at-a-glance: counts of team members, recent submissions

**Stop & verify:** Logged-out visit to `/admin/dashboard` → redirects to login. Magic link arrives, clicking it logs in. Logout works.

---

## Phase 6 — Admin CRUD

**Goal:** Client can edit everything that drives the public site.

### Team
- [ ] `/admin/team` — list with reorder, edit, delete, "Add new"
- [ ] Edit form: name, photo upload, years experience, short bio, long bio, experience bullets (dynamic list), published toggle
- [ ] Drag-to-reorder (or up/down arrows — simpler, works fine)
- [ ] Optimistic UI on save

### Benefits
- [ ] `/admin/benefits` — same pattern
- [ ] Icon picker (Lucide subset) or SVG upload

### Memberships
- [ ] `/admin/memberships` — edit pricing, features list, add-on details

### Testimonials
- [ ] `/admin/testimonials` — list, add, edit, delete, reorder, publish toggle
- [ ] Edit form: author name, role/label, photo (optional), quote, rating (optional)

### Settings
- [ ] `/admin/settings` — hero copy, about copy, contact info, social links, app store URLs, **`show_testimonials` toggle** (with note: "Section appears on site only when toggled on AND at least one testimonial is published")

### Submissions
- [ ] `/admin/submissions` — read-only list of contact form messages, mark as handled

- [ ] After every save: `revalidateTag` so public site updates within seconds

**Stop & verify:** Make an edit in dashboard → refresh public site → change appears. Test as the client would: add a trainer, reorder, delete, edit copy. Watch for friction points.

---

## Phase 7 — Image uploads

**Goal:** Client uploads photos directly without your help.

- [ ] Reusable `<ImageUpload>` component using Supabase Storage
- [ ] Client-side resize/compress before upload (browser-image-compression)
- [ ] Show upload progress + preview
- [ ] Wire into team photo, benefit icon (if SVG upload), settings (logo if needed)
- [ ] Set max dimensions + file size; reject oversized files with friendly error

**Stop & verify:** Upload a 5 MB photo from phone → compresses → appears on team card on public site.

---

## Phase 8 — SEO, OG, polish

**Goal:** Site looks professional when shared and ranks for local searches.

- [ ] `<head>` metadata in root layout (Romanian locale)
- [ ] Per-page metadata (title, description)
- [ ] OG image — generate via `@vercel/og` or static design
- [ ] `robots.txt`, `sitemap.xml`
- [ ] Favicon set (multiple sizes + Apple touch)
- [ ] Schema.org `LocalBusiness` / `HealthClub` JSON-LD with address + hours
- [ ] Vercel Analytics (or Plausible)
- [ ] 404 page (themed)
- [ ] Cookie banner (only if analytics is non-anonymous — Plausible doesn't need one)

**Stop & verify:** Share URL in WhatsApp / Slack → preview card looks right. `https://search.google.com/test/rich-results` validates schema.

---

## Phase 9 — Deploy + handoff

**Goal:** Live on client's domain, client knows how to use it.

### Pre-launch gate
- [ ] **Legal pages have real content** (or client has explicitly accepted the risk of launching with placeholders)
- [ ] App store URLs set OR app store buttons hidden if no URLs
- [ ] Testimonials toggle decision made (on/off for launch)
- [ ] Contact form submissions are reaching the client's email

### Deploy
- [ ] Custom domain configured on Vercel + DNS records set
- [ ] SSL verified
- [ ] Production env vars set
- [ ] Final cross-browser test (Chrome, Safari, mobile Safari, Firefox)
- [ ] Loom walkthrough recorded (5–10 min) of admin dashboard
- [ ] One-page cheatsheet PDF: how to log in, edit team, edit pricing, see submissions
- [ ] Client logs in successfully and edits one thing under your supervision
- [ ] Backup plan documented: Supabase auto-backups (free tier = 1 day; consider paid if critical)

**Stop & verify:** Client opens dashboard alone, makes a change, sees it live. He's not blocked on anything.

---

## Phase 10 — Store (parked)

When the client wants to sell merch / packages / classes:
- [ ] Add `products`, `orders`, `order_items` tables
- [ ] Stripe Checkout integration (you've already done this in Velto — copy)
- [ ] `/shop` route + product cards
- [ ] `/admin/products` CRUD
- [ ] `/admin/orders` view

Don't build until needed.

---

## Notes for Claude Code

- Read `BRIEF.md` and this file at the start of every session.
- Stay inside the current phase. Ask before jumping ahead.
- Always run `tsc --noEmit` and `next build` before claiming a phase done.
- Commit with conventional commits: `feat(team): add long bio field`.
- Don't add libraries not listed in the brief without asking.
- When in doubt about visual match, ask Daniel — don't guess.
