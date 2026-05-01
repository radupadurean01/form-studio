-- Storage bucket for media (team photos, icons, etc.)
insert into storage.buckets (id, name, public)
values ('media', 'media', true);

-- Public read access
create policy "Public can read media"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'media');

-- Authenticated users can upload
create policy "Authenticated can upload media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media');

-- Authenticated users can update their uploads
create policy "Authenticated can update media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media');

-- Authenticated users can delete
create policy "Authenticated can delete media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media');
