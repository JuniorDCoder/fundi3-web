import type { SupabaseClient } from "@supabase/supabase-js";

export interface NotificationPreferences {
  emailCourseCompleted: boolean;
  emailNewCourse: boolean;
  emailCertificatePdf: boolean;
  emailWalletActivity: boolean;
}

export const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  emailCourseCompleted: true,
  emailNewCourse: true,
  emailCertificatePdf: true,
  emailWalletActivity: true,
};

interface PreferencesRow {
  email_course_completed: boolean;
  email_new_course: boolean;
  email_certificate_pdf: boolean;
  email_wallet_activity: boolean;
}

function mapPreferences(row: PreferencesRow): NotificationPreferences {
  return {
    emailCourseCompleted: row.email_course_completed,
    emailNewCourse: row.email_new_course,
    emailCertificatePdf: row.email_certificate_pdf,
    emailWalletActivity: row.email_wallet_activity,
  };
}

export async function getNotificationPreferences(
  supabase: SupabaseClient,
  userId: string,
): Promise<NotificationPreferences> {
  const { data, error } = await supabase
    .from("user_notification_preferences")
    .select("email_course_completed, email_new_course, email_certificate_pdf, email_wallet_activity")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  return data ? mapPreferences(data as PreferencesRow) : DEFAULT_NOTIFICATION_PREFERENCES;
}

export async function upsertNotificationPreferences(
  supabase: SupabaseClient,
  userId: string,
  partial: Partial<NotificationPreferences>,
): Promise<NotificationPreferences> {
  const current = await getNotificationPreferences(supabase, userId);
  const merged = { ...current, ...partial };

  const { data, error } = await supabase
    .from("user_notification_preferences")
    .upsert(
      {
        user_id: userId,
        email_course_completed: merged.emailCourseCompleted,
        email_new_course: merged.emailNewCourse,
        email_certificate_pdf: merged.emailCertificatePdf,
        email_wallet_activity: merged.emailWalletActivity,
      },
      { onConflict: "user_id" },
    )
    .select("email_course_completed, email_new_course, email_certificate_pdf, email_wallet_activity")
    .single();

  if (error) throw error;
  return mapPreferences(data as PreferencesRow);
}
