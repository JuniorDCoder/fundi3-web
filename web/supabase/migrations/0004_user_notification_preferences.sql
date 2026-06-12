-- 0004_user_notification_preferences.sql
-- Per-user email notification preferences. Absence of a row means "all defaults (true)".

CREATE TABLE user_notification_preferences (
    user_id                 UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email_course_completed BOOLEAN     NOT NULL DEFAULT true,
    email_new_course       BOOLEAN     NOT NULL DEFAULT true,
    email_certificate_pdf  BOOLEAN     NOT NULL DEFAULT true,
    created_at              TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at              TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TRIGGER set_user_notification_preferences_updated_at
    BEFORE UPDATE ON user_notification_preferences
    FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

ALTER TABLE user_notification_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_notification_preferences_select_own"
    ON user_notification_preferences FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "user_notification_preferences_insert_own"
    ON user_notification_preferences FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_notification_preferences_update_own"
    ON user_notification_preferences FOR UPDATE USING (auth.uid() = user_id);
