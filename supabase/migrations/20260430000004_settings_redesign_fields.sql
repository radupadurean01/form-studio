-- Phase D: extend site_settings with all the editable copy/media that was
-- still hardcoded in the redesigned components.
--
-- Each column has a DEFAULT matching the current homepage copy so:
--   1. The single existing row is backfilled automatically.
--   2. Fresh DBs from seed.sql get correct defaults too.

alter table public.site_settings
  -- Hero CTA
  add column hero_cta_label text not null default 'Devino membru →',
  add column hero_cta_href text not null default '#membri',

  -- About
  add column about_image_url text not null default '/images/about-image.jpeg',
  add column about_signature text not null default '— echipa form studio',

  -- Tour section ("Studio-ul")
  add column tour_eyebrow text not null default 'Studio-ul',
  add column tour_title_html text not null default 'Tot ce contează. <em>Fără exces.</em>',

  -- Trainers section
  add column trainers_eyebrow text not null default 'Antrenori',
  add column trainers_title_html text not null default 'Echipa <em>noastră.</em>',
  add column trainers_subtitle text not null default 'Antrenori care îți cunosc obiectivele și îți urmăresc progresul. Nu doar îți scriu un program și pleacă.',
  add column trainers_footnote text not null default '— fotografiile sunt placeholder-e (stock); vor fi înlocuite cu portretele reale ale antrenorilor —',

  -- Programs section
  add column programs_eyebrow text not null default 'Programe',
  add column programs_title_html text not null default 'Ce poți <em>face</em> aici.',

  -- Membership preview ("60 membri activi")
  add column membership_preview_eyebrow text not null default 'Membri · Limitat',
  add column membership_preview_number text not null default '60',
  add column membership_preview_max_label text not null default 'membri activi · maximum',
  add column membership_preview_title_html text not null default 'Acces fără <em>aglomerație.</em>',
  add column membership_preview_body text not null default 'Acces permanent la echipamente, îndrumare profesionistă și o atmosferă primitoare. Fără aglomerație. Fără grabă.',
  add column membership_preview_bg_image_url text not null default '/images/hero-slider-1.jpeg',
  add column membership_preview_cta_label text not null default 'Vezi tarifele →',
  add column membership_preview_cta_href text not null default '#membri',

  -- Pricing section
  add column pricing_title_html text not null default 'Acces complet, <em>fără surprize.</em>',
  add column pricing_tagline text not null default 'Acces nelimitat la spațiu',
  add column pricing_cta_label text not null default 'Descarcă aplicația pentru a începe',
  add column pricing_addon_footnote text not null default '*Antrenorul personal se plătește separat.',

  -- Contact section
  add column contact_eyebrow text not null default 'Contact',
  add column contact_title_html text not null default 'Vorbim <em>personal.</em>',
  add column contact_body text not null default 'Trimite-ne un mesaj și te contactăm noi. Fără formulare complicate, fără roboți.',

  -- Closing CTA
  add column closing_eyebrow text not null default 'Vino să vezi',
  add column closing_title_html text not null default 'Locul există. <em>Tu ești invitat.</em>',
  add column closing_button_label text not null default 'Programează o vizită →',
  add column closing_button_href text not null default '#contact',

  -- Footer
  add column footer_tagline text not null default 'Alba Iulia · Boutique Fitness';
