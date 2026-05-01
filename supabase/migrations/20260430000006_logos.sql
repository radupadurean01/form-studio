-- Make the header + footer logos editable from /admin/settings.
-- Two slots: white logo for dark backgrounds (header over hero, footer)
-- and dark logo for light backgrounds (header after scroll past hero).

alter table public.site_settings
  add column logo_white_url text not null default '/logos/logo-horizontal-white.svg',
  add column logo_dark_url text not null default '/logos/logo-horizontal-black.svg';
