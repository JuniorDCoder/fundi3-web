import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { parseLang } from "@/lib/auth/messages";
import { getAuthenticatedAdmin } from "@/lib/admin/guard";
import { courseMessage } from "@/lib/courses/messages";
import { findCourseBySlug, listAllCourses, saveCourseTree } from "@/lib/courses/queries";
import { parseCourseTreeInput } from "@/lib/courses/validation";
import { notifyNewCourseSubscribers } from "@/lib/email/notifications";

/** GET: list every course (any status) — the admin catalog table. */
export async function GET(request: NextRequest) {
  const lang = parseLang(request.nextUrl.searchParams.get("lang"));
  const caller = await getAuthenticatedAdmin(request);
  if (!caller) {
    return NextResponse.json(
      { error: "not_admin", message: courseMessage("notAdminAccount", lang) },
      { status: 403 },
    );
  }

  const admin = createAdminClient();
  const courses = await listAllCourses(admin);
  return NextResponse.json({ courses });
}

/** POST: create a new course (full tree — course + modules + lessons in one shot). */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const lang = parseLang((body as Record<string, unknown> | null)?.lang);

  const caller = await getAuthenticatedAdmin(request);
  if (!caller) {
    return NextResponse.json(
      { error: "not_admin", message: courseMessage("notAdminAccount", lang) },
      { status: 403 },
    );
  }

  const parsed = parseCourseTreeInput(body);
  if (!parsed.ok) {
    return NextResponse.json(
      { error: parsed.error, message: courseMessage("invalidCourse", lang) },
      { status: 400 },
    );
  }

  // Creating always inserts a fresh row — ignore any client-supplied id.
  const input = { ...parsed.value, id: undefined };

  const admin = createAdminClient();

  const existing = await findCourseBySlug(admin, input.slug);
  if (existing) {
    return NextResponse.json(
      { error: "slug_in_use", message: courseMessage("slugInUse", lang) },
      { status: 409 },
    );
  }

  try {
    const course = await saveCourseTree(admin, input, caller.user.id);

    if (course.status === "published") {
      await notifyNewCourseSubscribers(admin, course).catch((err) =>
        console.error("[admin:courses] new-course email failed:", err),
      );
    }

    return NextResponse.json({ course }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "server_error", message: courseMessage("serverError", lang) },
      { status: 500 },
    );
  }
}
