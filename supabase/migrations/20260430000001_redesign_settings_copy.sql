-- Backfill site_settings with the redesign's copy.
-- The original seed (from the Webflow draft) populated these fields with
-- pre-redesign content; this migration aligns the existing row with what
-- the redesigned homepage actually displays today.
--
-- Safe to run on fresh DBs as well — it's a no-op if no row exists.

update public.site_settings set
  hero_eyebrow = 'Form Studio · Boutique Fitness',
  hero_title_html = 'Mișcare. <em>Spațiu.</em><br>Echilibru.',
  hero_subtitle = 'Un loc gândit pentru oameni, nu pentru aglomerație.',
  about_title = 'Mai mult <em>decât</em> fitness.',
  address = case when address = '' then 'Alba Iulia, România' else address end;
