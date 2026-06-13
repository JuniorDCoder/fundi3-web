-- Fundi3 — GitHub OAuth connections (service-role access only)
-- Run this once in the Supabase SQL editor (Project → SQL Editor → New query).
-- No migration runner is configured for this project, so this file is applied manually.

create table if not exists public.github_connections (
  user_id uuid primary key references auth.users(id) on delete cascade,

  github_username text not null,
  github_user_id bigint not null,
  access_token text not null,
  scopes text not null default '',

  connected_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists github_connections_set_updated_at on public.github_connections;
create trigger github_connections_set_updated_at
  before update on public.github_connections
  for each row execute function public.set_updated_at();

-- ─── Row Level Security ──────────────────────────────────────────────────────
-- Stores per-user GitHub access tokens. No policies are defined, so only the
-- service-role client (which bypasses RLS) can read/write this table — all
-- access goes through the /api/github/* routes.

alter table public.github_connections enable row level security;
