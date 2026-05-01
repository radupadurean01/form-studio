# Form Studio — Full Site Redesign Brief

## Concept: "Sanctuary"

Form Studio is not a premium gym. It is a Mediterranean-modernist sanctuary — warm, plant-filled, sculpturally lit — that happens to be a gym. The website should feel like the website of a boutique hotel or an Aesop store, not a fitness brand. Movement is what people do here, but calm is what they come for.

This redesign is a complete refresh, not an iteration on the current site. The current visual language (terracotta gradient cards, line icons in rounded squares, generic stock-feeling photography) reads as a Bootstrap fitness template and undersells the actual space by a wide margin. Read the existing codebase for stack/structure, but assume design decisions are open to revision.

The aesthetic reference is the actual interior — see `mockups/photos/` for the studio's real photography. Every visual decision should be traceable to something in those rooms.

---

## What this brand actually is

Visual signatures pulled directly from the space, all of which should appear in the website:

- **Organic wavy/blob shapes** — the curved walnut wall, the blob-shaped mirrors in the lounge, the curved cutouts behind the dumbbell rack. This is a design motif, not an accident. Use it for section dividers, image masks, decorative moments.
- **Plants as structural elements** — large fiddle leaf figs, palms, peace lilies in black metal greenhouse-frame planters with white pebbles. Photography should preserve this, layouts should leave room for it.
- **Signage as sculpture** — cursive "form studio" neon, bold "ONE MORE" backlit lettering, "DO" cut into vertical terracotta slats. Treat type the same way: typography is object, not just text.
- **Single-surface color rooms** — the lounge has full mustard + full terracotta walls. The website should mirror this — entire sections in one warm color, not pastel-on-cream throughout.
- **Layered warm lighting** — backlit panels, ring pendants, glowing neon. Replicate digitally with subtle glow effects on key elements (hero CTA, section markers), warm gradients, never harsh contrast.
- **Walnut + oak + cream + warm metals** — material palette is rich and layered, not minimal-white.

---

## Color system

Pulled directly from photographs of the space.

```css
/* Backgrounds */
--cream:           #ECE4D3;   /* primary page background, walls */
--cream-warm:      #F1EBDB;   /* card backgrounds, soft surfaces */
--cream-deep:      #E0D5BC;   /* secondary surfaces */

/* Accent surfaces (use as full-section colors) */
--mustard:         #D9A84C;   /* the lounge yellow wall */
--terracotta:      #B5482C;   /* the lounge accent wall */
--clay-deep:       #8E3A1F;   /* darker terracotta moments */

/* Wood / earth */
--walnut:          #5C3925;   /* dark wood paneling */
--oak:             #C8A878;   /* floors */
--oak-light:       #D9BE8E;   /* lighter wood */

/* Neutrals */
--black-warm:      #1A1815;   /* warm-tinted black */
--charcoal:        #2A2620;   /* dark surfaces */
--ink:             #1F1A14;   /* body text */
--ink-muted:       #635A4D;   /* secondary text */

/* Plant accent (use sparingly, in illustrations only) */
--green-leaf:      #4A6B3A;
```

Usage rule: a single section uses one dominant warm color (cream / mustard / terracotta / walnut), not a card grid of mixed colors. Color blocks the room, not the component.

---

## Typography system

```css
/* Display — for headlines, numbers, editorial moments */
--font-display: "PP Editorial New", "Cormorant Garamond", Georgia, serif;

/* Script — used sparingly to echo the neon signage */
--font-script: "Caveat", "Reenie Beanie", cursive;

/* Body — modern geometric, characterful */
--font-body: "Outfit", "Inter Tight", sans-serif;

/* Eyebrows / labels — small caps, tracked */
--font-label: "Outfit", sans-serif;
/* applied with text-transform: uppercase, letter-spacing: 0.22em, font-size: 11-12px */
```

Type rules:

- Display serif italic for editorial emphasis ("Mișcare. *Spațiu.* Echilibru.")
- Cursive used **once or twice on the entire site maximum** — for the brand mark or one signature moment, never for body or section headers. It echoes the neon, it doesn't replace the serif.
- Body weight 400, never below 14px, line-height 1.6
- Sentence case everywhere except labels/eyebrows
- Numbers in display serif when used as proof points (member cap, years, etc.)

If PP Editorial New isn't available (it's licensed), Cormorant Garamond is the free fallback and works well.

---

## Photography direction

The studio's own photography is the entire foundation. Use what's in `mockups/photos/`. If new shots are needed, the brief is:

- **Available light only**, golden hour preferred. No flash, no over-saturation.
- **Wide, calm, often empty rooms** — emptiness sells exclusivity. Crowds undercut the premium positioning.
- **Plants in foreground frequently** — leverage the layered depth the space already has.
- **Detail shots** of textures (walnut grain, neon close-up, dumbbell rack rubber, locker wood, blob mirror).
- **One or two human-action shots** at most for the homepage — a trainer working with a single client. Never group classes, never crowds.

If real photography isn't available for a section, **flag it** — do not fall back to AI-generated images or generic stock. The brand cannot be premium and AI-photographed at the same time.

---

## Site architecture

```
/                        Homepage
/despre                  About / philosophy
/spațiul                 The space (tour)
/antrenori               Trainers
/programe                Programs / what you can do
/membri                  Membership / pricing
/contact                 Contact / location / hours
```

Optional later: `/blog` (editorial content), `/rezervări` (class booking).

---

## Section-by-section requirements

### Homepage

A long, slow-scrolling editorial page. Each section is a self-contained "spread."

**1. Hero**
- Full-bleed cinematic interior photo (the wide gym floor with wavy wood paneling is the strongest)
- Headline pairs cursive + serif: cursive "form" + serif "studio" mirroring the actual neon, OR full serif "Mișcare. *Spațiu.* Echilibru."
- Single CTA "Devino membru" — outlined button with subtle warm glow on hover (echo the backlit signage)
- Scroll indicator, low-key

**2. Manifesto**
- Editorial spread layout. Large serif quote on cream, photo on side.
- "Mai mult decât fitness." Body copy in Outfit. Small caption.
- Photo: the neon "form studio" sign on the textured wall.

**3. The space (tour)**
- Section title "Spațiul" in serif italic
- Asymmetric photo gallery / bento — show 5–6 zones of the gym (cardio, lifting floor, lounge, locker room, relaxation room, "DO" entryway). Each photo with minimal caption (zone name in eyebrow + one-line description).
- Layout uses varied tile sizes and the wavy/blob mask shape on at least one image.

**4. Membership (the differentiator)**
- Single hero card, charcoal background, photo overlay
- Big serif number for member cap: "60 membri activi · maximum"
- Tagline + brief copy
- CTA to `/membri`
- This is the boutique pitch — give it weight, don't bury it in a comparison table.

**5. Trainers preview**
- Section title "Echipa noastră" in serif
- 5 portraits in arch shapes (already a good motif on the current site) — keep this, but consistent crop and lighting
- Below each: name in serif, specialty in eyebrow caps, years experience in serif italic
- Hover reveals a longer one-liner
- CTA to `/antrenori`

**6. Programs preview**
- Editorial list, no cards — "01 — Antrenament personal", "02 — Programe de grup", etc.
- Each item: serif title, body, small detail photo on hover
- Numbered eyebrows reference the editorial layout, not bullets

**7. Closing CTA**
- Single large serif statement on a colored block (mustard or terracotta as the section background — full surface, no cards)
- "Vino să vezi locul." or similar
- Booking CTA

**8. Footer**
- Address, hours, phone, email
- Social
- Map
- Newsletter signup (optional)

---

### About page (`/despre`)

Long-form editorial. A magazine article about the space.

- Hero: a single hero quote/manifesto in serif, no photo
- Below: alternating photo + text spreads. The story of the studio, the philosophy, the founders.
- Drop caps on opening paragraphs (serif) for editorial flavor
- Pull quotes pulled out at intervals
- End with a photo gallery and a CTA

---

### The space page (`/spațiul`)

A virtual tour. One page, vertical scroll, room by room.

- Each room gets a "spread" — large photo, room name in serif, paragraph about what happens there, equipment list in small caps
- Use the wavy mask shape on hero images for each room
- Zones to cover: Recepție (with the neon), Sală principală, Zona cardio, Sala de greutăți (with "ONE MORE"), Vestiar, Lounge & relaxare (the mustard/terracotta room), Terasă

---

### Trainers page (`/antrenori`)

- Index view: arch portraits in a grid, name, specialty
- Click → individual trainer page with bio, certifications, specialties, booking link
- Individual page is editorial: hero portrait, serif name, body bio, photo of them in the gym

---

### Programs page (`/programe`)

- Editorial list of services: personal training, small group, nutrition consultations, body composition, etc.
- Each program: serif title, eyebrow category, description, what's included, CTA to book
- No card grid — vertical magazine layout

---

### Membership page (`/membri`)

The pricing model is **single tier** (Form Access at 299 RON/Lună) with an optional personal trainer add-on (224.25 RON/Lună on top, 25% off the standalone trainer price). This is already the right structure — do not propose tiered alternatives. The boutique pitch is "one good membership for the people who fit" — multiple tiers would undermine it.

**Page structure:**

- Hero: the proof number "60" in serif, full-width, charcoal background with photo overlay (mirror the homepage membership card treatment)
- Below: the membership card itself (see spec below)
- "Ce primești" list in editorial format with serif em-dashes or no marks at all, not line icons in circles
- FAQ at the bottom in serif italic Q + body A
- CTA at the page end: "Vino să vezi locul" → schedule a tour rather than checkout. Boutique sales are relational, not e-commerce.

**Membership card spec (replaces current sage-green design):**

The current card has the right structure but the wrong visual language. Rebuild as:

- Background: `--cream-warm` or full `--mustard` (full-section color block, mirroring the lounge yellow wall)
- No badges, no pills, no tier names — there's only one tier, naming it "FORM Access" is generic SaaS pattern. Replace with an editorial eyebrow: `Membership · 2026` or `Tariful · Lunar`
- Price treatment: "299 RON/Lună" in **Cormorant Garamond serif**, large (clamp 56–88px), with `Lună` smaller and in italic. Weight 400. Mirror the homepage hero number treatment.
- Bullet list: drop the line icons in circles. Use a small serif em-dash (`—`) prefix, or no marker at all — just generous line-height. Body text in Outfit, color `--ink`.
- Add-on (Antrenor personal): **do not nest a card inside a card**. Two options, pick one based on layout space:
  - **Option A (preferred):** horizontal toggle at the top of the card — `Membership` / `Membership + Antrenor`. Toggle changes price + bullets in place. Single card, no nesting.
  - **Option B:** two separate cards side-by-side, equal weight. Left = Membership, Right = Membership + Antrenor.
- Discount display: do not use strikethrough pricing or a `-25%` badge — that's e-commerce theater. Instead, show the bundle price plainly: "Membership + Antrenor — 523.25 RON/Lună" with a small italic note: "*Tariful include 25% reducere la antrenamentele personale, disponibil doar pentru membri.*"
- CTA: single button — "Programează o vizită" — leading to `/contact`, not a checkout

**What to keep from the current card:**

- The bullet content itself (Acces în studio, 60 abonamente, Coffee lounge, Echipamente, Terasă) — copy is fine, only the styling changes
- The single-tier strategy
- The trainer add-on as a paid extra, not bundled by default

---

### Contact (`/contact`)

- Map + photo + hours + form
- Form is single-column, generous spacing, no busy fields
- Photo of the entrance / neon sign as the visual anchor

---

## Layout & motion principles

### Layout

1. **Editorial > template.** Every section is a spread, not a slot. Vary widths, vary alignments, break the grid intentionally.
2. **Asymmetric > symmetric.** The current site's biggest weakness is symmetric grids of equal-weight content. Prioritize and size accordingly.
3. **Negative space is a material.** Don't fill the screen. Let cream breathe.
4. **Organic shapes as accents.** Blob masks, wavy section dividers, curved button shapes — sparingly, deliberately.
5. **Single-color section backgrounds** (cream / mustard / terracotta / walnut full-bleed) are encouraged. They mirror the rooms.
6. **Photography is full-bleed by default**, contained in cards only when there's a typographic reason.

### Motion (Framer Motion)

Restraint over delight. The space is calm — the website should be calm.

- One orchestrated reveal per section on scroll-into-view (stagger children 60–80ms)
- Photo zoom on hover for gallery tiles (1.04 scale, 800ms ease-out)
- The hero number animates from 0 → 60 once, on scroll-into-view, 1.2s with easeOut
- Smooth scroll on anchor links
- **No** parallax, **no** mouse-follow effects, **no** type-typing animations, **no** scattered micro-interactions

### Performance

- Next.js `<Image>` with `priority` only on hero
- Lazy-load below the fold
- Local fonts via `next/font`
- Aim for LCP <2s on 4G mobile

---

## Anti-patterns (do not ship any of these)

- ❌ Line icons inside rounded white squares
- ❌ Symmetric grids of 4 equal cards in any color
- ❌ Solid walls of terracotta as a background for entire sections
- ❌ Generic stock or AI-generated photography
- ❌ "We are a premium gym" copy — show, don't claim
- ❌ Three-column pricing comparison tables
- ❌ Glass morphism, neumorphism, gradient mesh
- ❌ Inter, Roboto, system fonts
- ❌ Animated typing effects, parallax, mouse-follow cursors
- ❌ Generic fitness language ("crush your goals," "transform your body")
- ❌ Stock CTAs ("Get started today," "Sign up now") — use specific verbs ("Devino membru," "Vino să vezi locul")

---

## Implementation notes

- **Stack assumed:** Next.js 14+ App Router, React, TypeScript, Tailwind CSS, Framer Motion. Adjust to whatever the current project uses.
- **Tailwind:** extend the theme with the color tokens above. Don't use Tailwind's default warm colors — they don't match.
- **Fonts:** load via `next/font` from Google Fonts (Cormorant Garamond, Outfit, Caveat). PP Editorial New is licensed; only use if budget exists.
- **Content:** Romanian copy throughout. If copy needs to be expanded, draft suggestions but flag for review — do not invent claims about the studio.
- **Components:** build a small set of reusable primitives — `<Section>`, `<Spread>`, `<PullQuote>`, `<RoomTile>`, `<TrainerCard>`, `<Eyebrow>`. Resist component-explosion.

---

## Order of operations

Work in this sequence and **pause for review between each step** — do not batch the whole site into one PR.

1. **Design system** — extend Tailwind theme with tokens, set up fonts, build base typography styles, build the 6 reusable components above. Show on a single style-guide page.
2. **Homepage hero + manifesto** — the two strongest moments. Get these right before going further.
3. **Homepage tour section** — the bento with real photos. This validates the whole layout direction.
4. **Rest of homepage** — membership card, trainers preview, programs preview, closing CTA, footer.
5. **Internal pages** — about, space, trainers, programs, membership, contact.
6. **Polish pass** — motion, image optimization, accessibility, mobile.

For each step: propose the change with a short rationale, build it, show it for review, iterate, move on.

---

## Acceptance criteria

The redesign is done when:

1. A first-time visitor identifies the site as belonging to a boutique hotel, gallery, or design-forward retail brand — not a gym — within 3 seconds. The "gym" reveal is part of the surprise.
2. The wavy/organic motif appears in at least 3 distinct moments across the site
3. There's at least one full-section single-color background (mustard, terracotta, or walnut) on the homepage
4. The cursive script appears no more than twice on the entire site
5. There is a real number on the homepage proving the boutique claim (member cap, ratio, years, etc.)
6. Zero line icons in rounded squares anywhere on the site
7. All photography is real — every image traceable to the actual studio
8. Lighthouse performance ≥ 90 on mobile

---

## References

For Claude Code to study:
- The studio's own photos in `mockups/photos/` — primary reference
- The HTML demo in `mockups/form-studio-homepage.html` — direction-setting demo
- Visual mood references (search): Aesop website, Apartamento magazine, Cabana magazine, Cereal magazine, Six Senses hotel website, Ace Hotel website
- Avoid as references: Equinox, Barry's, OneFit, F45 — wrong category
