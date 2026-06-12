import type { SupabaseClient } from "@supabase/supabase-js";
import type { DbCourse } from "@/lib/courses/types";
import { sendMail } from "@/lib/email/mailer";
import { newCourseEmail } from "@/lib/email/templates";

const PAGE_SIZE = 200;

/**
 * Emails every learner who hasn't opted out of `email_new_course` that a new
 * course was published. Always sent in English — there's no per-user
 * language preference stored yet.
 */
export async function notifyNewCourseSubscribers(admin: SupabaseClient, course: DbCourse): Promise<void> {
  const { data: prefsRows, error: prefsError } = await admin
    .from("user_notification_preferences")
    .select("user_id, email_new_course")
    .eq("email_new_course", false);

  if (prefsError) throw prefsError;

  const optedOut = new Set((prefsRows ?? []).map((row) => row.user_id as string));

  const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? "https://fundi3.xyz").replace(/\/$/, "");
  const courseUrl = `${appUrl}/courses/${course.slug}`;
  const template = newCourseEmail("en", course.titleEn, courseUrl);

  let page = 1;
  for (;;) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: PAGE_SIZE });
    if (error) throw error;

    const users = data.users ?? [];
    for (const subscriber of users) {
      if (!subscriber.email || optedOut.has(subscriber.id)) continue;
      try {
        await sendMail({ to: subscriber.email, ...template });
      } catch (err) {
        console.error("[notify:new-course] failed for user", subscriber.id, err);
      }
    }

    if (users.length < PAGE_SIZE) break;
    page += 1;
  }
}
