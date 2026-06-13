-- Fundi3 — quiz questions for lessons
-- Run this once in the Supabase SQL editor (Project → SQL Editor → New query).
-- No migration runner is configured for this project, so this file is applied manually.

create table if not exists public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.course_lessons(id) on delete cascade,

  question_en text not null,
  question_fr text not null,
  options_en text[] not null,
  options_fr text[] not null,
  correct_index smallint not null check (correct_index >= 0),
  explanation_en text not null default '',
  explanation_fr text not null default '',

  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists quiz_questions_lesson_id_idx on public.quiz_questions (lesson_id);

drop trigger if exists quiz_questions_set_updated_at on public.quiz_questions;
create trigger quiz_questions_set_updated_at
  before update on public.quiz_questions
  for each row execute function public.set_updated_at();

-- ─── Row Level Security ──────────────────────────────────────────────────────
-- The admin dashboard writes through the service-role client (bypasses RLS).
-- Public pages read through the anon client — only quiz questions belonging to
-- published courses should ever be visible to them.

alter table public.quiz_questions enable row level security;

drop policy if exists "Quiz questions of published courses are publicly readable" on public.quiz_questions;
create policy "Quiz questions of published courses are publicly readable"
  on public.quiz_questions for select
  using (
    exists (
      select 1 from public.course_lessons l
      join public.course_modules m on m.id = l.module_id
      join public.courses c on c.id = m.course_id
      where l.id = quiz_questions.lesson_id and c.status = 'published'
    )
  );
