import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { authMessage, parseLang } from "@/lib/auth/messages";
import { courseMessage } from "@/lib/courses/messages";
import { getPublishedCourseBySlug } from "@/lib/courses/queries";
import {
  buildCourseProgressSummary,
  getEnrollment,
  listLessonProgressForCourse,
} from "@/lib/courses/progress";

interface RouteParams {
  params: { slug: string };
}

/**
 * GET: the current user's enrollment + aggregate progress summary for one
 * course. Works whether or not the learner is enrolled yet — an unenrolled
 * visitor simply gets `summary.enrolled = false` and zeroed counts, which lets
 * the course detail page compute a "Start learning" link without forcing
 * enrollment first. Backs the lesson player's CurriculumTree checkmarks too.
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
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
    const course = await getPublishedCourseBySlug(supabase, params.slug);
    if (!course) {
      return NextResponse.json(
        { error: "course_not_found", message: courseMessage("courseNotFound", lang) },
        { status: 404 },
      );
    }

    const [enrollment, progressRows] = await Promise.all([
      getEnrollment(supabase, user.id, course.id),
      listLessonProgressForCourse(supabase, user.id, course.id),
    ]);

    const summary = buildCourseProgressSummary(course, enrollment, progressRows);
    return NextResponse.json({ enrollment, summary });
  } catch {
    return NextResponse.json({ error: "server_error", message: authMessage("serverError", lang) }, { status: 500 });
  }
}
