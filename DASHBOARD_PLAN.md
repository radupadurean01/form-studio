# Dashboard Editability Plan

Goal: every piece of homepage content is editable from `/admin` without code changes.

## Decisions

- Section titles (H2 with italic emphasis like `Echipa <em>noastră.</em>`) are stored as HTML strings, edited in admin as HTML — same pattern as the existing `hero_title_html`.
- Hero slider stays at exactly 3 images.
- Benefits feature is dropped entirely (table, admin, query, seed).
- Testimonials section is built but hidden by default — gated by the existing `show_testimonials` flag.
- New images (trainers, tour tiles, programs, hero slider, about, membership preview BG) upload to Supabase Storage via a reusable uploader component. The bucket already exists from `20250428000001_storage_bucket.sql`.
- All new admin fields are pre-seeded with the current hardcoded copy so nothing visually changes after wiring.

---

## Phase A — Wire existing settings to the public site (no migrations) ✅

- [x] Drop benefits entirely
  - [x] Migration: `drop table public.benefits cascade;` + drop policies
  - [x] Remove `getBenefits` from `src/lib/queries.ts`
  - [x] Remove `Benefit` types/exports from `src/lib/supabase/types.ts`
  - [x] Delete `src/components/admin/benefits-manager.tsx` and `src/app/admin/benefits/`
  - [x] Remove "Beneficii" link from `src/components/admin/admin-shell.tsx`
  - [x] Remove benefits stat from `src/app/admin/dashboard/page.tsx`
  - [x] Remove benefits seed block from `supabase/seed.sql`
- [x] Hero reads from settings
  - [x] `src/components/hero.tsx` uses `settings.hero_eyebrow`, `settings.hero_title_html`, `settings.hero_subtitle`
  - [x] Update seed values to match current hardcoded copy
- [x] About reads `about_title` from settings
  - [x] `src/components/about.tsx` uses `settings.about_title`
  - [x] Update seed
- [x] Contact info reads `address` from settings
  - [x] `src/components/contact.tsx` uses `settings.address`
  - [x] Surface `contact_email` and `contact_phone` next to address
  - [x] Update seed
- [x] Pricing app store buttons use `app_ios_url` / `app_android_url`
  - [x] Buttons hidden / disabled if URL is empty
- [x] Footer gets social icons (Instagram / Facebook / LinkedIn) from settings URLs
  - [x] Hide each icon when its URL is empty
  - Note: lucide-react doesn't ship brand icons; inlined small SVGs in `footer.tsx` instead

**Migrations to run for Phase A:**
- `20260430000000_drop_benefits.sql` — drops the benefits table
- `20260430000001_redesign_settings_copy.sql` — backfills the existing site_settings row with redesign copy

## Phase B — Testimonials section (hidden until toggled) ✅

- [x] Build `src/components/testimonials.tsx` (server component, reads from `testimonials` table)
- [x] Section is gated by `settings.show_testimonials` AND at least one published testimonial
- [x] Add it to `src/app/page.tsx` — placed between Programs and Pricing
- [x] Visibility toggle moved out of `/admin/settings` to `/admin/testimonials` (lives next to the testimonial list)

## Phase C — `tour_tiles` and `programs` tables ✅

- [x] Migration: create `public.tour_tiles`
  - Columns: `id`, `image_url`, `eyebrow`, `title`, `span_class` (for the bento layout: e.g. `col-span-3 row-span-2`), `order`, timestamps
  - RLS: public read, authenticated full access (mirror existing tables)
  - Seed with the 6 tiles from `src/components/tour.tsx`
- [x] Migration: create `public.programs`
  - Columns: `id`, `num`, `title`, `body`, `photo_url`, `order`, timestamps
  - Same RLS pattern
  - Seed with the 5 programs from `src/components/programs.tsx`
- [x] Update `src/lib/supabase/types.ts` with new types
- [x] New queries: `getTourTiles`, `getPrograms` in `src/lib/queries.ts`
- [x] `src/components/tour.tsx`: become async, fetch tiles from DB, fall back gracefully if empty
- [x] `src/components/programs.tsx`: split into server wrapper + `programs-list.tsx` (client interactive child)
- [x] New admin page `src/app/admin/tour/page.tsx` + manager + form
- [x] New admin page `src/app/admin/programs/page.tsx` + manager + form
- [x] Add "Studio" and "Programe" links to `src/components/admin/admin-shell.tsx`
- [x] Add stat cards on dashboard

**Migrations to run for Phase C:**
- `20260430000002_tour_tiles_and_programs.sql` — creates the two tables
- `20260430000003_seed_tour_and_programs.sql` — backfills rows (idempotent: only runs if tables empty)

## Phase D — Extend `site_settings` for everything else ✅

- [x] Migration: add columns to `public.site_settings`
  - Hero: `hero_cta_label`, `hero_cta_href`
  - About: `about_image_url`, `about_signature`
  - Tour section: `tour_eyebrow`, `tour_title_html`
  - Trainers section: `trainers_eyebrow`, `trainers_title_html`, `trainers_subtitle`, `trainers_footnote`
  - Programs section: `programs_eyebrow`, `programs_title_html`
  - Membership preview: `mp_number`, `mp_max_label`, `mp_title_html`, `mp_body`, `mp_bg_image_url`, `mp_cta_label`, `mp_cta_href`, `mp_eyebrow`
  - Pricing section: `pricing_title_html`, `pricing_tagline`, `pricing_cta_label`, `pricing_addon_footnote`
  - Contact section: `contact_eyebrow`, `contact_title_html`, `contact_body`
  - Closing CTA: `closing_eyebrow`, `closing_title_html`, `closing_button_label`, `closing_button_href`
  - Footer: `footer_tagline`
  - All defaulted to current hardcoded values so the seed stays accurate
- [x] Update `src/lib/supabase/types.ts`
- [x] Components read these new fields:
  - [x] `hero.tsx` (CTA label/href)
  - [x] `about.tsx` (image URL, signature)
  - [x] `tour.tsx` (eyebrow, title)
  - [x] `trainers.tsx` (all four fields)
  - [x] `programs.tsx` (eyebrow, title)
  - [x] `membership-preview.tsx` (all eight fields)
  - [x] `membership-pricing.tsx` (title, tagline, CTA label, addon footnote — wrapper passes whole settings object)
  - [x] `contact.tsx` (eyebrow, title, body)
  - [x] `closing-cta.tsx` (all four fields)
  - [x] `footer.tsx` (tagline)
- [x] Extend `src/components/admin/settings-form.tsx`
  - Grouped into 11 cards (Hero / Despre / Studio / Antrenori / Programe / Membership preview / Pricing / Contact / Closing / Footer / Social & app)
  - Reusable Text/Textarea/Html helpers reduce boilerplate
  - HTML fields show inline hint about `<em>...</em>`
  - Sticky save bar at the bottom
- [x] `updateSettings` action — auto-typed via the Update type; no signature change needed
- [x] Image fields use the `ImageUploader` (about image, membership preview BG)

**Migration to run for Phase D:**
- `20260430000004_settings_redesign_fields.sql` — adds ~30 columns with defaults matching current homepage copy. The single existing row is backfilled automatically.

## Phase E — Image uploads via Supabase Storage ✅ (partial — Phase D fields TBD)

- [x] Confirm `media` bucket exists (from `20250428000001_storage_bucket.sql`) — public read, authenticated upload/update/delete already in place
- [x] Build `src/components/admin/image-uploader.tsx`
  - File picker (no drag-drop yet — could add later)
  - Preview tile with overlay actions for Replace + Remove
  - Uploads to `media` bucket under `<folder>/<uuid>.<ext>`, returns the public URL
  - Validates: 5 MB max, only JPG/PNG/WebP/SVG
  - Inline error + spinner states
- [x] `next.config.ts` adds `*.supabase.co/storage/v1/object/public/**` to remotePatterns so `next/image` accepts Supabase URLs
- [x] Wired into existing forms:
  - [x] Trainer form (`folder="team"`)
  - [x] Tour tile form (`folder="tour"`)
  - [x] Program form (`folder="programs"`)
  - [x] Testimonials form (`folder="testimonials"`)
- [ ] Phase D fields (about image, hero slider, membership preview BG) — wired during Phase D
- [ ] Cleanup strategy: replaced images currently stay in storage (orphaned). Acceptable for now — simpler. Periodic cleanup could be added later if storage cost matters.

---

## Hero slider images ✅ (added after Phase D)

- [x] Migration `20260430000005_hero_slider_images.sql` adds 3 columns: `hero_slider_image_1/2/3`, defaults match the originally hardcoded paths
- [x] `hero-slider.tsx` accepts a `slides` prop, gracefully handles 0 / 1 / 2 / 3 slides
- [x] `hero.tsx` builds the slides array from settings, filters empties
- [x] Settings form has 3 ImageUploader slots in the Hero card

## Out of scope for now

- Header navigation links (consider later if the client wants to rename "Studio-ul" / "Antrenori" etc.)
- Logo replacement from admin (currently hardcoded SVG paths)
- Slider interval / timing controls (still 3s)
- A WYSIWYG editor for HTML fields — for now the client types HTML directly with hints
