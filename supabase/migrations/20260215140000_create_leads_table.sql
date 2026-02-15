create table public.leads (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  phone text not null,
  email text,
  created_at timestamp with time zone default now() not null
);

alter table public.leads enable row level security;

create policy "Allow anonymous inserts" on public.leads
  for insert with check (true);
