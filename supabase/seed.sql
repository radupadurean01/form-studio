-- Seed data for Form Studio (sourced from Webflow draft)
-- Run after migration: npx supabase db push && psql ... -f seed.sql

-- ============================================================
-- site_settings
-- ============================================================
insert into public.site_settings (
  hero_eyebrow,
  hero_title_html,
  hero_subtitle,
  about_title,
  about_body_html,
  contact_email,
  contact_phone,
  address,
  instagram_url,
  facebook_url,
  linkedin_url,
  show_testimonials
) values (
  'Form Studio · Boutique Fitness',
  'Mișcare. <em>Spațiu.</em><br>Echilibru.',
  'Un loc gândit pentru oameni, nu pentru aglomerație.',
  'Mai mult <em>decât</em> fitness.',
  '<p>FORM Studio este un spațiu de antrenament gândit pentru oameni care își doresc să se miște și să se simtă mai bine. Punem accent pe antrenamente desfășurate clar și sigur pentru fiecare persoană care ne trece pragul.</p><p>Form Studio nu este o sală clasică. Este un spațiu gândit pentru oameni care vor să se miște bine, să se simtă bine și să nu fie judecați. Lucrăm cu un număr limitat de membri, pentru ca fiecare persoană să conteze. Antrenamentul este personal, atmosfera relaxată iar ritmul este al tău.</p>',
  '',  -- TODO: get from client
  '',  -- TODO: get from client
  'Alba Iulia, România',
  '',  -- TODO: get from client
  '',  -- TODO: get from client
  '',  -- TODO: get from client
  false
);

-- ============================================================
-- team_members (5 trainers from Webflow)
-- Note: Most bios are English placeholders from the Webflow template.
-- Bogdan has real Romanian content. Replace others when client provides real bios.
-- ============================================================
insert into public.team_members (name, years_experience, short_bio, long_bio, experience_items, "order", published) values
  (
    'Javier Morales',
    8,
    'Yoga instructor',
    'A yoga instructor, often referred to as a yoga teacher or yoga coach, is a skilled professional dedicated to guiding individuals on their journey towards physical, mental, and spiritual well-being through the practice of yoga.',
    ARRAY['Effective communication is key aspect of skill set', 'Closely monitors students for proper technique and breathing', 'Praesentium voluptatum deleniti atque', 'Quas molestias excepturi sint occaecati'],
    1,
    true
  ),
  (
    'Raj Gupta',
    5,
    'Yoga instructor',
    'A yoga instructor, often referred to as a yoga teacher or yoga coach, is a skilled professional dedicated to guiding individuals on their journey towards physical, mental, and spiritual well-being through the practice of yoga.',
    ARRAY['Effective communication is key aspect of skill set', 'Closely monitors students for proper technique and breathing', 'Praesentium voluptatum deleniti atque', 'Quas molestias excepturi sint occaecati'],
    2,
    true
  ),
  (
    'Mia Thompson',
    3,
    'Yoga instructor',
    'A yoga instructor, often referred to as a yoga teacher or yoga coach, is a skilled professional dedicated to guiding individuals on their journey towards physical, mental, and spiritual well-being through the practice of yoga.',
    ARRAY['Effective communication is key aspect of skill set', 'Closely monitors students for proper technique and breathing', 'Praesentium voluptatum deleniti atque', 'Quas molestias excepturi sint occaecati'],
    3,
    true
  ),
  (
    'Catherine Miller',
    8,
    'Yoga instructor',
    'A yoga instructor, often referred to as a yoga teacher or yoga coach, is a skilled professional dedicated to guiding individuals on their journey towards physical, mental, and spiritual well-being through the practice of yoga.',
    ARRAY['Effective communication is key aspect of skill set', 'Closely monitors students for proper technique and breathing', 'Praesentium voluptatum deleniti atque', 'Quas molestias excepturi sint occaecati'],
    4,
    true
  ),
  (
    'Bogdan Sularea',
    8,
    'Progres prin consistență, nu perfecțiune.',
    'Cred că rezultatele reale se construiesc prin antrenamente structurate și disciplină. Lucrez cu persoane de toate nivelurile, adaptând fiecare program obiectivelor individuale. Știu cum este să începi fără o direcție clară și fără un antrenor personal, iar scopul meu este să te ajut să eviți greșelile de începător și să obții progres real, fără timp pierdut în sală. Pun accent pe tehnică corectă, progres și consistență. Te aștept în echipa mea.',
    ARRAY[]::text[],
    5,
    true
  );

-- ============================================================
-- tour_tiles (6 bento tiles — "Studio-ul" section)
-- ============================================================
insert into public.tour_tiles (image_url, eyebrow, title, span_class, "order") values
  ('/images/hero-slider-1.jpeg',  '01 — Sala principală', 'Echipamente premium',    'col-span-3 row-span-2', 1),
  ('/images/hero-slider-2.jpeg',  '02 — Cardio',          'Lumină naturală',        'col-span-3 row-span-1', 2),
  ('/images/gallery-slider-2.jpeg','03 — Greutăți',        'One more',               'col-span-2 row-span-1', 3),
  ('/images/plante.JPG',          '04 — Plante',          'Aer curat',              'col-span-1 row-span-2', 4),
  ('/images/gallery-slider-3.jpeg','05 — Vestiar',         'Confort & intimitate',   'col-span-2 row-span-1', 5),
  ('/images/hero-slider-3.jpeg',  '06 — Lounge',          'Loc de respiro',         'col-span-3 row-span-1', 6);

-- ============================================================
-- programs (5 cards — "Ce poți face aici")
-- ============================================================
insert into public.programs (num, title, body, photo_url, "order") values
  ('01', 'Antrenament personal',
   'Sesiuni 1-la-1 cu un antrenor dedicat. Program adaptat obiectivelor tale, ajustări constante în funcție de progres, monitorizare metodică.',
   'https://images.unsplash.com/photo-1758875569414-120ebc62ada3?w=900&h=1125&fit=crop', 1),
  ('02', 'Antrenamente de grup',
   'Grupuri mici (maximum 4 persoane), atmosferă personală. Programe construite pentru un obiectiv comun, cu atenție individuală.',
   'https://images.unsplash.com/photo-1731325632701-90d4e869a98e?w=900&h=1125&fit=crop', 2),
  ('03', 'Consultații de nutriție',
   'Plan alimentar adaptat stilului tău de viață și obiectivelor de antrenament. Suport continuu, nu un PDF generic.',
   'https://images.unsplash.com/photo-1638720772346-b745bcd72f5f?w=900&h=1125&fit=crop', 3),
  ('04', 'Compoziție corporală',
   'Măsurători metodice — masă musculară, masă grasă, hidratare. Date reale, nu doar număr pe cântar.',
   'https://images.unsplash.com/photo-1768479619859-8ee2556a04b1?w=900&h=1125&fit=crop', 4),
  ('05', 'Mobilitate & recuperare',
   'Sesiuni dedicate flexibilității, mobilității articulare și recuperării active. Pentru ca antrenamentul să fie sustenabil.',
   'https://images.unsplash.com/photo-1776710669971-eebdde536700?w=900&h=1125&fit=crop', 5);

-- ============================================================
-- memberships (1 plan + add-on)
-- ============================================================
insert into public.memberships (name, price_ron, period, features, addon_name, addon_features, addon_discount_percent, addon_price_ron, "order") values
  (
    'FORM Access',
    299.00,
    'Luna',
    ARRAY['Acces în studio la momentul ales de tine', '60 de abonamente disponibile', 'Coffee lounge & zone de relaxare', 'Acces complet la echipamente', 'Terasă & facilități premium'],
    'Personal Trainer',
    ARRAY['Sesiuni de antrenament personal', 'Program adaptat obiectivelor tale', 'Ajustări constante în funcție de progres', 'Progres monitorizat și măsurat metodic', 'Alimentație adaptată și suport'],
    25,
    224.25,
    1
  );
