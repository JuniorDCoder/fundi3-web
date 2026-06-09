import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { authMessage, parseLang } from "@/lib/auth/messages";
import { getPublishedCoursesByIds } from "@/lib/courses/queries";
import {
  buildCourseProgressSummary,
  listLessonProgressForCourses,
  listUserEnrollments,
  type CourseProgressSummary,
  type DbCourseEnrollment,
} from "@/lib/courses/progress";
import type { DbCourse } from "@/lib/courses/types";

export interface DashboardEnrollmentEntry {
  enrollment: DbCourseEnrollment;
  course: DbCourse;
  summary: CourseProgressSummary;
}

/**
 * GET: aggregates everything the learner dashboard needs in one round trip —
 * every enrollment, its course, and a computed progress summary — rather than
 * making the dashboard fan out N+1 requests (one per enrolled course).
 */
export async function GET(request: NextRequest) {
  const lang = parseLang(request.nextUrl.searchParams.get("lang"));
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
    const enrollments = await listUserEnrollments(supabase, user.id);
    const courseIds = enrollments.map((e) => e.courseId);

    const [courses, progressRows] = await Promise.all([
      getPublishedCoursesByIds(supabase, courseIds),
      listLessonProgressForCourses(supabase, user.id, courseIds),
    ]);
    const courseById = new Map(courses.map((c) => [c.id, c]));

    const entries: DashboardEnrollmentEntry[] = [];
    let lessonsCompleted = 0;

    for (const enrollment of enrollments) {
      const course = courseById.get(enrollment.courseId);
      if (!course) continue; // course was unpublished/removed since enrolling

      const courseProgressRows = progressRows.filter((row) => row.courseId === course.id);
      const summary = buildCourseProgressSummary(course, enrollment, courseProgressRows);
      lessonsCompleted += summary.completedLessons;
      entries.push({ enrollment, course, summary });
    }

    const admin = createAdminClient();
    const { count: certificatesEarned } = await admin
      .from("certificates")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id);

    return NextResponse.json({
      entries,
      stats: {
        coursesEnrolled: entries.length,
        lessonsCompleted,
        certificatesEarned: certificatesEarned ?? 0,
      },
    });
  } catch {
    return NextResponse.json({ error: "server_error", message: authMessage("serverError", lang) }, { status: 500 });
  }
}
