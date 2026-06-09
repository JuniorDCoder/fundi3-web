import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { authMessage, parseLang } from "@/lib/auth/messages";
import { courseMessage } from "@/lib/courses/messages";
import { getPublishedCourseBySlug } from "@/lib/courses/queries";
import { enrollInCourse, getEnrollment } from "@/lib/courses/progress";

interface RouteParams {
  params: { slug: string };
}

/**
 * POST: enroll the current user in a published course. Idempotent — calling
 * this for a course the learner is already enrolled in just returns the
 * existing enrollment (200), not a 409. This is what the lesson player calls
 * silently on first visit.
 *
 * TODO: once paid courses ship, gate this on `course.isFree || hasPurchased(course)`
 * — today every course is free, so enrollment is purely a tracking concept.
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  const body = await request.json().catch(() => null);
  const lang = parseLang((body as Record<string, unknown> | null)?.lang ?? request.nextUrl.searchParams.get("lang"));

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

    const enrollment = await enrollInCourse(supabase, user.id, course.id);
    return NextResponse.json({ enrollment });
  } catch {
    return NextResponse.json(
      { error: "enrollment_failed", message: courseMessage("enrollmentFailed", lang) },
      { status: 500 },
    );
  }
}

/** GET: check whether the current user is enrolled (without enrolling them). */
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

    const enrollment = await getEnrollment(supabase, user.id, course.id);
    return NextResponse.json({ enrollment });
  } catch {
    return NextResponse.json({ error: "server_error", message: authMessage("serverError", lang) }, { status: 500 });
  }
}
