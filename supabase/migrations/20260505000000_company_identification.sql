-- Company identification fields required by Romanian commercial law
-- (Legea 365/2002 — comerț electronic, OUG 28/2005 — informarea consumatorilor).
-- Rendered in footer; editable by admin from Settings.
-- Defaults are realistic dummy values so layout can be reviewed pre-handoff;
-- client replaces them via /admin/settings before going public.

alter table public.site_settings
  add column company_name text not null default 'Form Studio SRL',
  add column company_cui text not null default 'RO45123789',
  add column company_registry text not null default 'J40/4521/2024',
  add column company_address text not null default 'Str. Calea Victoriei nr. 100, Sector 1, București';
