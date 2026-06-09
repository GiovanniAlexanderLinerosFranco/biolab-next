-- Base schema for student notebook entries (bitacora)
create table if not exists public.bitacoras (
  id bigint generated always as identity primary key,
  practica_id integer not null,
  estudiante_nombre text,
  contenido text not null,
  created_at timestamp with time zone not null default now()
);

alter table public.bitacoras enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'bitacoras'
      and policyname = 'insert_anon_bitacoras'
  ) then
    create policy insert_anon_bitacoras
      on public.bitacoras
      for insert
      to anon
      with check (true);
  end if;
end
$$;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'bitacoras'
      and policyname = 'read_anon_bitacoras'
  ) then
    create policy read_anon_bitacoras
      on public.bitacoras
      for select
      to anon
      using (true);
  end if;
end
$$;
