-- Make the 3 hero slider image slots editable from /admin/settings.
-- Defaults match the previously hardcoded paths in hero-slider.tsx.

alter table public.site_settings
  add column hero_slider_image_1 text not null default '/images/hero-slider-1.jpeg',
  add column hero_slider_image_2 text not null default '/images/hero-slider-2.jpeg',
  add column hero_slider_image_3 text not null default '/images/hero-slider-3.jpeg';
