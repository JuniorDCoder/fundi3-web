-- 0009_tutor_system.sql
-- Adds tutor role support, activity logging, commission config, and storage bucket.

-- ── Tutor ownership + commission on courses ─────────────────────────────────

ALTER TABLE public.courses
  ADD COLUMN tutor_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

CREATE INDEX courses_tutor_id_idx ON public.courses (tutor_id);

ALTER TABLE public.courses
  ADD COLUMN commission_rate numeric(5,2) NOT NULL DEFAULT 70.00
  CHECK (commission_rate >= 0 AND commission_rate <= 100);

-- ── Activity log ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id text,
  metadata jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

CREATE INDEX activity_log_created_at_idx ON public.activity_log (created_at DESC);
CREATE INDEX activity_log_actor_id_idx ON public.activity_log (actor_id);
CREATE INDEX activity_log_action_idx ON public.activity_log (action);

-- ── Commission config (platform-wide defaults) ─────────────────────────────

CREATE TABLE IF NOT EXISTS public.commission_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  default_tutor_rate numeric(5,2) NOT NULL DEFAULT 70.00
    CHECK (default_tutor_rate >= 0 AND default_tutor_rate <= 100),
  platform_wallet_address text,
  updated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.commission_config ENABLE ROW LEVEL SECURITY;

INSERT INTO public.commission_config (default_tutor_rate)
VALUES (70.00);

-- ── Supabase Storage bucket for course images ───────────────────────────────

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'course-images',
  'course-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read for course images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'course-images');

CREATE POLICY "Admin and tutor upload course images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'course-images'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Admin and tutor update course images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'course-images'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Admin and tutor delete course images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'course-images'
    AND auth.role() = 'authenticated'
  );
