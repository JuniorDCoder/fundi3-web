-- Fundi3 — code playground fields for lessons
-- Run this once in the Supabase SQL editor (Project → SQL Editor → New query).
-- No migration runner is configured for this project, so this file is applied manually.

alter table public.course_lessons
  add column if not exists code_language text
    check (code_language in ('javascript', 'typescript', 'solidity', 'rust')),
  add column if not exists code_starter_en text,
  add column if not exists code_starter_fr text;

-- No RLS changes needed — these are nullable columns on an already-RLS-enabled
-- table, covered by the existing course_lessons select policy.
