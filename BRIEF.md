# Form Studio — Project Brief

## Project

Rebuild **Form Studio** (gym, Romania) from Webflow to a self-hosted Next.js stack with a small admin dashboard. Replace ~€276/yr Webflow CMS cost with €0 hosting and a custom client-friendly editor.

Source reference: `https://form-studio-c4fd9b-d9dd75852bf3967702b9.webflow.io/`

## Goals

- 1:1 visual & UX parity with the Webflow draft (single-page anchor layout).
- Light admin dashboard so the client can self-edit team, benefits, copy, pricing.
- Maintainable foundation that can absorb a small store later without a rebuild.
- Free hosting (Vercel + Supabase free tier).

## Out of scope (this phase)

- E-commerce / store (parked, Phase 10).
- Mobile app (the iOS / Google Play buttons in hero are placeholders).
- Booking system.
- Multi-language (RO only for now).
- Marketing automation, newsletter, blog.

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14 (App Router) | Daniel's primary stack; SSG + ISR + server actions in one. |
| Language | TypeScript | Non-negotiable. |
| Styling | Tailwind CSS | Same as Velto; fast layout work. |
| Motion | Framer Motion | Match Webflow's subtle reveals. |
| Backend | Supabase (Postgres + Auth + Storage) | Daniel knows it; free tier covers this fully. |
| Forms | Server Actions → Supabase table + email | No third-party form provider. |
| Hosting | Vercel | Free tier; Daniel uses it. |
| Analytics | Vercel Analytics or Plausible | Decide in Phase 8. |

## Content model

### `site_settings` (single row)
- `hero_eyebrow`, `hero_title_html`, `hero_subtitle`
- `about_title`, `about_body_html`
- `contact_email`, `contact_phone`, `address`
- `instagram_url`, other socials
- `app_ios_url`, `app_android_url` (nullable until apps ship)
- `show_testimonials` (bool — feature flag for the section)

### `benefits` (collection — 4 items today)
- `id`, `icon` (string key or uploaded SVG), `title`, `description`, `order`

### `team_members` (collection — 5 items today)
- `id`, `name`, `photo_url`, `years_experience` (int), `short_bio`, `long_bio`,
- `experience_items` (text[] — bullet list), `order`, `published` (bool)

### `testimonials` (collection — empty at launch, section hidden)
- `id`, `author_name`, `author_role` (e.g., "Membru din 2024"), `photo_url` (nullable),
- `quote`, `rating` (1–5, nullable), `order`, `published`

### `memberships` (collection — 1 today, room to grow)
- `id`, `name`, `price_ron`, `period` ("Luna"), `features` (text[]),
- `addon_name`, `addon_features` (text[]), `addon_discount_percent`, `addon_price_ron`,
- `order`

### Legal pages
- Static MDX files (`/license`, `/privacy`, `/cookies`). Don't put these in DB — they change once a year max.

## Routes

- `/` — single-page site with anchored sections (`#trainers`, `#memberships`, `#contact`, etc.)
- `/license`, `/privacy`, `/cookies` — static MDX
- `/admin` — login
- `/admin/dashboard` — overview
- `/admin/team` — CRUD trainers
- `/admin/benefits` — CRUD benefits
- `/admin/memberships` — edit pricing
- `/admin/settings` — edit hero/about/contact

## Hosting & cost

| | Webflow (current) | New stack |
|---|---|---|
| Hosting + CMS | ~€23/mo (~€276/yr) | €0 |
| Domain | client's own | client's own |
| Email forwarding | external | external |
| Total | ~€276/yr | €0 + your time |

Vercel free: enough. Supabase free: 500 MB DB + 1 GB storage — way more than this site needs.

## Pricing for the client (suggestion)

- One-time build fee (your call based on relationship).
- Optional **€10–15/mo maintenance** for tweaks, updates, hosting management. Still cheaper than Webflow, and creates recurring income.

## Resolved decisions

- **Testimonials**: build the section + admin CRUD now, ship hidden via `show_testimonials` flag in settings. Flip on when content is ready.
- **Legal pages**: ship with Romanian placeholder content, clearly marked "PLACEHOLDER — REPLACE BEFORE PRODUCTION." Block production deploy on this.
- **App buttons**: keeping them. URLs stored in `site_settings` (`app_ios_url`, `app_android_url`). Until apps exist, point to a `/coming-soon` page or leave nullable and conditionally render.
- **Logos**: Daniel has SVGs locally — drop into `public/`, no CDN download needed.

## Still to confirm with client

- [ ] **Domain**: does he have one? Where is it registered?
- [ ] **Email**: where should contact form submissions go? (His email + DB record.)
- [ ] **Photography**: keep current images, or will he supply finals?

## Handoff plan

What the client gets at the end:
1. Live site on his domain.
2. Admin login (Supabase magic link, no password to remember).
3. Loom walkthrough (5–10 min) of how to edit team, benefits, pricing, copy.
4. One-page written cheatsheet (PDF or Notion).
5. Your contact for "something broke" questions.

## Reuse from Velto

Copy-paste these directly — no need for a skills system:
- `lib/supabase/client.ts`, `server.ts`, `middleware.ts`
- Auth helpers + magic-link flow
- Tailwind config + design token approach
- Form/input/button base components if styling allows reskin
- Image upload util to Supabase Storage

## Risks / watch items

- **Image weight**: Webflow auto-optimizes; we'll need `next/image` discipline.
- **Romanian diacritics**: ensure fonts load with full Latin Extended charset.
- **Single-page scroll perf**: lots of images + Framer Motion → lazy-load aggressively.
- **Client editor UX**: if dashboard is annoying, he'll call you for everything. Spend time on this in Phase 6.
