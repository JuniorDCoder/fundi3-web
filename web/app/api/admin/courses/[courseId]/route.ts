import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { parseLang } from "@/lib/auth/messages";
import { getAuthenticatedAdmin } from "@/lib/admin/guard";
import { courseMessage } from "@/lib/courses/messages";
import { deleteCourse, findCourseBySlug, getCourseById, saveCourseTree } from "@/lib/courses/queries";
import { parseCourseTreeInput } from "@/lib/courses/validation";
import { notifyNewCourseSubscribers } from "@/lib/email/notifications";

interface RouteParams {
  params: { courseId: string };
}

async function requireAdmin(request: NextRequest, lang: ReturnType<typeof parseLang>) {
  const caller = await getAuthenticatedAdmin(request);
  if (!caller) {
    return {
      error: NextResponse.json(
        { error: "not_admin", message: courseMessage("notAdminAccount", lang) },
        { status: 403 },
      ),
    };
  }
  return { caller };
}

/** GET: fetch a single course (any status) with its full module/lesson tree — for the editor. */
export async function GET(request: NextRequest, { params }: RouteParams) {
  const lang = parseLang(request.nextUrl.searchParams.get("lang"));
  const guard = await requireAdmin(request, lang);
  if (guard.error) return guard.error;

  const admin = createAdminClient();
  const course = await getCourseById(admin, params.courseId);
  if (!course) {
    return NextResponse.json(
      { error: "course_not_found", message: courseMessage("courseNotFound", lang) },
      { status: 404 },
    );
  }

  return NextResponse.json({ course });
}

/** PUT: replace this course's entire tree (course + modules + lessons). */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const body = await request.json().catch(() => null);
  const lang = parseLang((body as Record<string, unknown> | null)?.lang);

  const guard = await requireAdmin(request, lang);
  if (guard.error) return guard.error;

  const admin = createAdminClient();
  const existing = await getCourseById(admin, params.courseId);
  if (!existing) {
    return NextResponse.json(
      { error: "course_not_found", message: courseMessage("courseNotFound", lang) },
      { status: 404 },
    );
  }

  const parsed = parseCourseTreeInput(body);
  if (!parsed.ok) {
    return NextResponse.json(
      { error: parsed.error, message: courseMessage("invalidCourse", lang) },
      { status: 400 },
    );
  }

  const input = { ...parsed.value, id: existing.id };

  if (input.slug !== existing.slug) {
    const slugOwner = await findCourseBySlug(admin, input.slug);
    if (slugOwner && slugOwner.id !== existing.id) {
      return NextResponse.json(
        { error: "slug_in_use", message: courseMessage("slugInUse", lang) },
        { status: 409 },
      );
    }
  }

  try {
    const course = await saveCourseTree(admin, input, existing.createdBy);

    if (existing.status !== "published" && course.status === "published") {
      await notifyNewCourseSubscribers(admin, course).catch((err) =>
        console.error("[admin:courses] new-course email failed:", err),
      );
    }

    return NextResponse.json({ course });
  } catch {
    return NextResponse.json(
      { error: "server_error", message: courseMessage("serverError", lang) },
      { status: 500 },
    );
  }
}

/** DELETE: remove a course (cascade-deletes its modules and lessons). */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const lang = parseLang(request.nextUrl.searchParams.get("lang"));
  const guard = await requireAdmin(request, lang);
  if (guard.error) return guard.error;

  const admin = createAdminClient();
  const existing = await getCourseById(admin, params.courseId);
  if (!existing) {
    return NextResponse.json(
      { error: "course_not_found", message: courseMessage("courseNotFound", lang) },
      { status: 404 },
    );
  }

  try {
    await deleteCourse(admin, existing.id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "server_error", message: courseMessage("serverError", lang) },
      { status: 500 },
    );
  }
}
