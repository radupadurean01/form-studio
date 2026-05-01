-- Drop the benefits feature: not used in the redesigned homepage.
-- Removes table + RLS policies + the unused trigger.

drop trigger if exists trg_benefits_updated_at on public.benefits;
drop table if exists public.benefits cascade;
