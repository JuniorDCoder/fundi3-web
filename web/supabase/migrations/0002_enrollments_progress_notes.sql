-- Fundi3 — enrollments, lesson progress, and lesson notes
-- Run this once in the Supabase SQL editor (Project → SQL Editor → New query).
-- No migration runner is configured for this project, so this file is applied manually.
--
-- Unlike courses (admin-authored, publicly readable when published), these
-- tables hold learner-owned data: every row belongs to exactly one user, and
-- that user is the only one who may read or write it. RLS is scoped to
-- auth.uid() throughout — writes go through the cookie-aware client, never
-- the service-role client.

-- ─── Tables ──────────────────────────────────────────────────────────────────

create table if not exists public.course_enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  enrolled_at timestamptz not null default now(),
  last_accessed_at timestamptz not null default now(),
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique (user_id, course_id)
);

create table if not exists public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  lesson_id uuid not null references public.course_lessons(id) on delete cascade,
  status text not null default 'in_progress'
    check (status in ('in_progress', 'completed')),
  completed_at timestamptz,
  last_viewed_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique (user_id, lesson_id)
);

create table if not exists public.lesson_notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  lesson_id uuid not null references public.course_lessons(id) on delete cascade,
  body text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique (user_id, lesson_id)
);

create index if not exists course_enrollments_user_id_idx on public.course_enrollments (user_id);
create index if not exists course_enrollments_course_id_idx on public.course_enrollments (course_id);
create index if not exists lesson_progress_user_course_idx on public.lesson_progress (user_id, course_id);
create index if not exists lesson_progress_lesson_id_idx on public.lesson_progress (lesson_id);
create index if not exists lesson_notes_user_lesson_idx on public.lesson_notes (user_id, lesson_id);

-- ─── updated_at maintenance (reuses public.set_updated_at from migration 0001) ─

drop trigger if exists course_enrollments_set_updated_at on public.course_enrollments;
create trigger course_enrollments_set_updated_at
  before update on public.course_enrollments
  for each row execute function public.set_updated_at();

drop trigger if exists lesson_progress_set_updated_at on public.lesson_progress;
create trigger lesson_progress_set_updated_at
  before update on public.lesson_progress
  for each row execute function public.set_updated_at();

drop trigger if exists lesson_notes_set_updated_at on public.lesson_notes;
create trigger lesson_notes_set_updated_at
  before update on public.lesson_notes
  for each row execute function public.set_updated_at();

-- ─── Row Level Security ──────────────────────────────────────────────────────
-- First user-owned-data tables in this schema. A learner may only see and
-- modify their OWN rows — every policy matches on auth.uid() = user_id.

alter table public.course_enrollments enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.lesson_notes enable row level security;

-- course_enrollments — select/insert/update (no delete: un-enrolling is out of scope)

drop policy if exists "Users can view their own enrollments" on public.course_enrollments;
create policy "Users can view their own enrollments"
  on public.course_enrollments for select
  using (auth.uid() = user_id);

drop policy if exists "Users can enroll themselves" on public.course_enrollments;
create policy "Users can enroll themselves"
  on public.course_enrollments for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own enrollments" on public.course_enrollments;
create policy "Users can update their own enrollments"
  on public.course_enrollments for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- lesson_progress — select/insert/update (no delete: progress is append/update-only)

drop policy if exists "Users can view their own lesson progress" on public.lesson_progress;
create policy "Users can view their own lesson progress"
  on public.lesson_progress for select
  using (auth.uid() = user_id);

drop policy if exists "Users can record their own lesson progress" on public.lesson_progress;
create policy "Users can record their own lesson progress"
  on public.lesson_progress for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own lesson progress" on public.lesson_progress;
create policy "Users can update their own lesson progress"
  on public.lesson_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- lesson_notes — full CRUD (a learner's private scratchpad; deletable)

drop policy if exists "Users can view their own lesson notes" on public.lesson_notes;
create policy "Users can view their own lesson notes"
  on public.lesson_notes for select
  using (auth.uid() = user_id);

drop policy if exists "Users can create their own lesson notes" on public.lesson_notes;
create policy "Users can create their own lesson notes"
  on public.lesson_notes for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own lesson notes" on public.lesson_notes;
create policy "Users can update their own lesson notes"
  on public.lesson_notes for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own lesson notes" on public.lesson_notes;
create policy "Users can delete their own lesson notes"
  on public.lesson_notes for delete
  using (auth.uid() = user_id);
