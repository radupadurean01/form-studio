-- Idempotent backfill: only inserts rows if the table is empty.
-- Mirrors what was previously hardcoded in tour.tsx and programs.tsx so the
-- existing homepage stays unchanged after switching to DB-driven content.

insert into public.tour_tiles (image_url, eyebrow, title, span_class, "order")
select * from (values
  ('/images/hero-slider-1.jpeg'::text,  '01 — Sala principală'::text, 'Echipamente premium'::text,    'col-span-3 row-span-2'::text, 1),
  ('/images/hero-slider-2.jpeg'::text,  '02 — Cardio'::text,          'Lumină naturală'::text,        'col-span-3 row-span-1'::text, 2),
  ('/images/gallery-slider-2.jpeg'::text,'03 — Greutăți'::text,        'One more'::text,               'col-span-2 row-span-1'::text, 3),
  ('/images/plante.JPG'::text,          '04 — Plante'::text,          'Aer curat'::text,              'col-span-1 row-span-2'::text, 4),
  ('/images/gallery-slider-3.jpeg'::text,'05 — Vestiar'::text,         'Confort & intimitate'::text,   'col-span-2 row-span-1'::text, 5),
  ('/images/hero-slider-3.jpeg'::text,  '06 — Lounge'::text,          'Loc de respiro'::text,         'col-span-3 row-span-1'::text, 6)
) as v(image_url, eyebrow, title, span_class, "order")
where not exists (select 1 from public.tour_tiles);

insert into public.programs (num, title, body, photo_url, "order")
select * from (values
  ('01'::text, 'Antrenament personal'::text,
   'Sesiuni 1-la-1 cu un antrenor dedicat. Program adaptat obiectivelor tale, ajustări constante în funcție de progres, monitorizare metodică.'::text,
   'https://images.unsplash.com/photo-1758875569414-120ebc62ada3?w=900&h=1125&fit=crop'::text, 1),
  ('02'::text, 'Antrenamente de grup'::text,
   'Grupuri mici (maximum 4 persoane), atmosferă personală. Programe construite pentru un obiectiv comun, cu atenție individuală.'::text,
   'https://images.unsplash.com/photo-1731325632701-90d4e869a98e?w=900&h=1125&fit=crop'::text, 2),
  ('03'::text, 'Consultații de nutriție'::text,
   'Plan alimentar adaptat stilului tău de viață și obiectivelor de antrenament. Suport continuu, nu un PDF generic.'::text,
   'https://images.unsplash.com/photo-1638720772346-b745bcd72f5f?w=900&h=1125&fit=crop'::text, 3),
  ('04'::text, 'Compoziție corporală'::text,
   'Măsurători metodice — masă musculară, masă grasă, hidratare. Date reale, nu doar număr pe cântar.'::text,
   'https://images.unsplash.com/photo-1768479619859-8ee2556a04b1?w=900&h=1125&fit=crop'::text, 4),
  ('05'::text, 'Mobilitate & recuperare'::text,
   'Sesiuni dedicate flexibilității, mobilității articulare și recuperării active. Pentru ca antrenamentul să fie sustenabil.'::text,
   'https://images.unsplash.com/photo-1776710669971-eebdde536700?w=900&h=1125&fit=crop'::text, 5)
) as v(num, title, body, photo_url, "order")
where not exists (select 1 from public.programs);
