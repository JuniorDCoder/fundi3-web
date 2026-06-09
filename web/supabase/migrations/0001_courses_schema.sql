-- Fundi3 — course catalog schema
-- Run this once in the Supabase SQL editor (Project → SQL Editor → New query).
-- No migration runner is configured for this project, so this file is applied manually.

-- ─── Tables ──────────────────────────────────────────────────────────────────

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,

  -- Bilingual content lives directly on the row (admin-authored, not i18n keys)
  title_en text not null,
  title_fr text not null,
  description_en text not null,
  description_fr text not null,
  long_description_en text not null default '',
  long_description_fr text not null default '',

  level text not null default 'beginner'
    check (level in ('beginner', 'intermediate', 'advanced')),
  language text not null default 'both'
    check (language in ('en', 'fr', 'both')),
  status text not null default 'draft'
    check (status in ('draft', 'published', 'archived')),

  is_free boolean not null default true,
  price_usd numeric(10, 2),
  is_african boolean not null default false,

  duration_label text not null default '',
  gradient_from text not null default '#0F6E56',
  gradient_to text not null default '#1D9E75',
  thumbnail_url text,

  tags text[] not null default '{}',
  outcomes_en text[] not null default '{}',
  outcomes_fr text[] not null default '{}',

  position integer not null default 0,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.course_modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title_en text not null,
  title_fr text not null,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.course_lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.course_modules(id) on delete cascade,
  title_en text not null,
  title_fr text not null,
  duration_label text not null default '',
  lesson_type text not null default 'text'
    check (lesson_type in ('video', 'text', 'code', 'quiz')),
  content_en text not null default '',
  content_fr text not null default '',
  video_url text,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists course_modules_course_id_idx on public.course_modules (course_id);
create index if not exists course_lessons_module_id_idx on public.course_lessons (module_id);
create index if not exists courses_status_idx on public.courses (status);
create index if not exists courses_slug_idx on public.courses (slug);

-- ─── updated_at maintenance ──────────────────────────────────────────────────

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists courses_set_updated_at on public.courses;
create trigger courses_set_updated_at
  before update on public.courses
  for each row execute function public.set_updated_at();

drop trigger if exists course_modules_set_updated_at on public.course_modules;
create trigger course_modules_set_updated_at
  before update on public.course_modules
  for each row execute function public.set_updated_at();

drop trigger if exists course_lessons_set_updated_at on public.course_lessons;
create trigger course_lessons_set_updated_at
  before update on public.course_lessons
  for each row execute function public.set_updated_at();

-- ─── Row Level Security ──────────────────────────────────────────────────────
-- The admin dashboard writes through the service-role client (bypasses RLS).
-- Public pages read through the anon client — only published courses (and
-- their modules/lessons) should ever be visible to them.

alter table public.courses enable row level security;
alter table public.course_modules enable row level security;
alter table public.course_lessons enable row level security;

drop policy if exists "Published courses are publicly readable" on public.courses;
create policy "Published courses are publicly readable"
  on public.courses for select
  using (status = 'published');

drop policy if exists "Modules of published courses are publicly readable" on public.course_modules;
create policy "Modules of published courses are publicly readable"
  on public.course_modules for select
  using (
    exists (
      select 1 from public.courses c
      where c.id = course_modules.course_id and c.status = 'published'
    )
  );

drop policy if exists "Lessons of published courses are publicly readable" on public.course_lessons;
create policy "Lessons of published courses are publicly readable"
  on public.course_lessons for select
  using (
    exists (
      select 1 from public.course_modules m
      join public.courses c on c.id = m.course_id
      where m.id = course_lessons.module_id and c.status = 'published'
    )
  );
