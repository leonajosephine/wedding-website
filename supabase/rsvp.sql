begin;

create table if not exists public.wedding_rsvps (
  id uuid primary key,
  "firstName" text not null check (char_length("firstName") between 1 and 100),
  "lastName" text not null check (char_length("lastName") between 1 and 100),
  email text not null check (char_length(email) between 1 and 254),
  attending text not null check (attending in ('yes', 'no')),
  polterabend boolean not null,
  vegan boolean not null,
  allergies text not null check (char_length(allergies) <= 1000),
  "songWish" text not null check (char_length("songWish") <= 500),
  "submittedAt" timestamptz not null default now()
);

alter table public.wedding_rsvps enable row level security;
revoke all on public.wedding_rsvps from anon, authenticated;
grant select, insert on public.wedding_rsvps to service_role;

commit;
