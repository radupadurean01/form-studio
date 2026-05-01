-- Phase 2: Initial schema for Form Studio
-- Tables: site_settings, benefits, team_members, testimonials, memberships, contact_submissions

-- ============================================================
-- site_settings (single row, enforced via check + trigger)
-- ============================================================
create table public.site_settings (
  id uuid primary key default gen_random_uuid(),
  hero_eyebrow text not null default '',
  hero_title_html text not null default '',
  hero_subtitle text not null default '',
  about_title text not null default '',
  about_body_html text not null default '',
  contact_email text not null default '',
  contact_phone text not null default '',
  address text not null default '',
  instagram_url text not null default '',
  facebook_url text not null default '',
  linkedin_url text not null default '',
  app_ios_url text,
  app_android_url text,
  show_testimonials boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enforce single row
create or replace function public.enforce_single_settings_row()
returns trigger as $$
begin
  if (select count(*) from public.site_settings) >= 1 then
    raise exception 'site_settings can only contain one row';
  end if;
  return new;
end;
$$ language plpgsql;

create trigger trg_enforce_single_settings
  before insert on public.site_settings
  for each row execute function public.enforce_single_settings_row();

-- ============================================================
-- benefits
-- ============================================================
create table public.benefits (
  id uuid primary key default gen_random_uuid(),
  icon text not null default 'star',
  title text not null,
  description text not null,
  "order" integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- team_members
-- ============================================================
create table public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  photo_url text,
  years_experience integer not null default 0,
  short_bio text not null default '',
  long_bio text not null default '',
  experience_items text[] not null default '{}',
  "order" integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- testimonials
-- ============================================================
create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  author_name text not null,
  author_role text not null default '',
  photo_url text,
  quote text not null,
  rating smallint check (rating >= 1 and rating <= 5),
  "order" integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- memberships
-- ============================================================
create table public.memberships (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price_ron numeric(10, 2) not null,
  period text not null default 'Luna',
  features text[] not null default '{}',
  addon_name text,
  addon_features text[] not null default '{}',
  addon_discount_percent integer,
  addon_price_ron numeric(10, 2),
  "order" integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- contact_submissions
-- ============================================================
create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  handled boolean not null default false,
  created_at timestamptz not null default now()
);

-- ============================================================
-- updated_at trigger (reusable)
-- ============================================================
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_site_settings_updated_at
  before update on public.site_settings
  for each row execute function public.update_updated_at();

create trigger trg_benefits_updated_at
  before update on public.benefits
  for each row execute function public.update_updated_at();

create trigger trg_team_members_updated_at
  before update on public.team_members
  for each row execute function public.update_updated_at();

create trigger trg_testimonials_updated_at
  before update on public.testimonials
  for each row execute function public.update_updated_at();

create trigger trg_memberships_updated_at
  before update on public.memberships
  for each row execute function public.update_updated_at();

-- ============================================================
-- RLS policies
-- ============================================================

-- Enable RLS on all tables
alter table public.site_settings enable row level security;
alter table public.benefits enable row level security;
alter table public.team_members enable row level security;
alter table public.testimonials enable row level security;
alter table public.memberships enable row level security;
alter table public.contact_submissions enable row level security;

-- Public read: site_settings
create policy "Public can read site_settings"
  on public.site_settings for select
  to anon, authenticated
  using (true);

-- Public read: benefits
create policy "Public can read benefits"
  on public.benefits for select
  to anon, authenticated
  using (true);

-- Public read: team_members (published only)
create policy "Public can read published team_members"
  on public.team_members for select
  to anon, authenticated
  using (published = true);

-- Public read: testimonials (published only)
create policy "Public can read published testimonials"
  on public.testimonials for select
  to anon, authenticated
  using (published = true);

-- Public read: memberships
create policy "Public can read memberships"
  on public.memberships for select
  to anon, authenticated
  using (true);

-- Public insert: contact_submissions (no read/update/delete)
create policy "Public can submit contact forms"
  on public.contact_submissions for insert
  to anon, authenticated
  with check (true);

-- Authenticated full access on all tables
create policy "Authenticated full access on site_settings"
  on public.site_settings for all
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated full access on benefits"
  on public.benefits for all
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated full access on team_members"
  on public.team_members for all
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated full access on testimonials"
  on public.testimonials for all
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated full access on memberships"
  on public.memberships for all
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated full access on contact_submissions"
  on public.contact_submissions for all
  to authenticated
  using (true)
  with check (true);
