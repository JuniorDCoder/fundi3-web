import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { authMessage, parseLang } from "@/lib/auth/messages";
import { courseMessage } from "@/lib/courses/messages";
import { getLessonCourseRef } from "@/lib/courses/queries";
import { touchEnrollment, upsertLessonProgress, type LessonProgressStatus } from "@/lib/courses/progress";

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

    return NextResponse.json({ progress });
  } catch {
    return NextResponse.json(
      { error: "progress_update_failed", message: courseMessage("progressUpdateFailed", lang) },
      { status: 500 },
    );
  }
}
