import { NextRequest, NextResponse } from "next/server";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import type { Lang } from "@/lib/i18n";
import { authMessage, parseLang } from "@/lib/auth/messages";
import { courseMessage } from "@/lib/courses/messages";
import { getCourseById, getLessonCourseRef } from "@/lib/courses/queries";
import {
  buildCourseProgressSummary,
  getEnrollment,
  listLessonProgressForCourse,
  markEnrollmentCompleted,
  touchEnrollment,
  upsertLessonProgress,
  type LessonProgressStatus,
} from "@/lib/courses/progress";
import { getNotificationPreferences } from "@/lib/user/preferences";
import { sendMail } from "@/lib/email/mailer";
import { courseCompletedEmail } from "@/lib/email/templates";

interface RouteParams {
  params: { lessonId: string };
}

function parseStatus(value: unknown): LessonProgressStatus | null {
  return value === "completed" || value === "in_progress" ? value : null;
}

/**
 * PUT: record this lesson's progress for the current user. The single
 * mutation endpoint behind both the auto-complete heuristic (scroll-to-end /
 * video watched) and the explicit "Mark complete" / "Mark incomplete" toggle
 * — both call this with a `status`, so there's no special-casing downstream.
 *
 * `courseId` is derived server-side from the lesson (never trusted from the
 * client) — this also confirms the lesson belongs to a published course.
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const body = await request.json().catch(() => null);
  const record = body as Record<string, unknown> | null;
  const lang = parseLang(record?.lang ?? request.nextUrl.searchParams.get("lang"));
  const status = parseStatus(record?.status);

  if (!status) {
    return NextResponse.json(
      { error: "invalid_status", message: courseMessage("progressUpdateFailed", lang) },
      { status: 400 },
    );
  }

  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      { error: "not_authenticated", message: authMessage("notAuthenticated", lang) },
      { status: 401 },
    );
  }

  try {
    const ref = await getLessonCourseRef(supabase, params.lessonId);
    if (!ref) {
      return NextResponse.json(
        { error: "lesson_not_found", message: courseMessage("lessonNotFound", lang) },
        { status: 404 },
      );
    }

    const progress = await upsertLessonProgress(supabase, user.id, ref.courseId, ref.lessonId, status);
    await touchEnrollment(supabase, user.id, ref.courseId).catch(() => {
      // Non-fatal — the learner may not be enrolled yet (the player enrolls on mount).
    });

    await maybeSendCourseCompletedEmail(supabase, user, ref.courseId, lang);

    return NextResponse.json({ progress });
  } catch {
    return NextResponse.json(
      { error: "progress_update_failed", message: courseMessage("progressUpdateFailed", lang) },
      { status: 500 },
    );
  }
}

/**
 * On a learner's first 100% completion of a course, stamps
 * `course_enrollments.completed_at` and — if they haven't opted out — emails
 * them a "course completed" notification. Never throws: a failure here must
 * not turn a successful progress update into a 500.
 */
async function maybeSendCourseCompletedEmail(
  supabase: SupabaseClient,
  user: User,
  courseId: string,
  lang: Lang,
): Promise<void> {
  try {
    const enrollment = await getEnrollment(supabase, user.id, courseId);
    if (!enrollment || enrollment.completedAt) return;

    const course = await getCourseById(supabase, courseId);
    if (!course) return;

    const progressRows = await listLessonProgressForCourse(supabase, user.id, courseId);
    const summary = buildCourseProgressSummary(course, enrollment, progressRows);
    if (summary.percentComplete !== 100) return;

    await markEnrollmentCompleted(supabase, user.id, courseId);

    if (!user.email) return;
    const prefs = await getNotificationPreferences(supabase, user.id);
    if (!prefs.emailCourseCompleted) return;

    const courseName = lang === "fr" ? course.titleFr : course.titleEn;
    await sendMail({ to: user.email, ...courseCompletedEmail(lang, courseName) });
  } catch (err) {
    console.error("[progress] course-completed email failed:", err);
  }
}
