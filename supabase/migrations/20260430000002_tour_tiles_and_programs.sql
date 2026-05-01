-- Phase C: tour_tiles + programs tables
-- Both follow the existing pattern (team_members, testimonials):
-- public read, authenticated full access, updated_at trigger.

-- ============================================================
-- tour_tiles  (the bento grid on the homepage "Studio-ul" section)
-- ============================================================
create table public.tour_tiles (
  id uuid primary key default gen_random_uuid(),
  image_url text,
  eyebrow text not null default '',
  title text not null default '',
  -- Tailwind grid utility for bento layout, e.g. "col-span-3 row-span-2"
  span_class text not null default 'col-span-2 row-span-1',
  "order" integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger trg_tour_tiles_updated_at
  before update on public.tour_tiles
  for each row execute function public.update_updated_at();

alter table public.tour_tiles enable row level security;

create policy "Public can read tour_tiles"
  on public.tour_tiles for select
  to anon, authenticated
  using (true);

create policy "Authenticated full access on tour_tiles"
  on public.tour_tiles for all
  to authenticated
  using (true)
  with check (true);

-- ============================================================
-- programs  (the "Ce poți face aici" list on the homepage)
-- ============================================================
create table public.programs (
  id uuid primary key default gen_random_uuid(),
  num text not null default '',
  title text not null default '',
  body text not null default '',
  photo_url text,
  "order" integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger trg_programs_updated_at
  before update on public.programs
  for each row execute function public.update_updated_at();

alter table public.programs enable row level security;

create policy "Public can read programs"
  on public.programs for select
  to anon, authenticated
  using (true);

create policy "Authenticated full access on programs"
  on public.programs for all
  to authenticated
  using (true)
  with check (true);
