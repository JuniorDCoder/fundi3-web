import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { authMessage, parseLang } from "@/lib/auth/messages";
import { courseMessage } from "@/lib/courses/messages";
import { getLessonCourseRef } from "@/lib/courses/queries";
import { deleteLessonNote, getLessonNote, upsertLessonNote } from "@/lib/courses/progress";

interface RouteParams {
  params: { lessonId: string };
}

const MAX_NOTE_LENGTH = 20_000;

async function requireUser(request: NextRequest, lang: ReturnType<typeof parseLang>) {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      supabase,
      user: null as null,
      error: NextResponse.json(
        { error: "not_authenticated", message: authMessage("notAuthenticated", lang) },
        { status: 401 },
      ),
    };
  }
  return { supabase, user, error: null };
}

/** GET: the current user's private note for this lesson (plain text, one per lesson — a scratchpad). */
export async function GET(request: NextRequest, { params }: RouteParams) {
  const lang = parseLang(request.nextUrl.searchParams.get("lang"));
  const guard = await requireUser(request, lang);
  if (guard.error) return guard.error;

  try {
    const note = await getLessonNote(guard.supabase, guard.user.id, params.lessonId);
    return NextResponse.json({ note });
  } catch {
    return NextResponse.json({ error: "server_error", message: authMessage("serverError", lang) }, { status: 500 });
  }
}

/** PUT: upsert (autosave-friendly full replace) the note's body. */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const body = await request.json().catch(() => null);
  const record = body as Record<string, unknown> | null;
  const lang = parseLang(record?.lang ?? request.nextUrl.searchParams.get("lang"));
  const noteBody = typeof record?.body === "string" ? record.body : null;

  if (noteBody === null || noteBody.length > MAX_NOTE_LENGTH) {
    return NextResponse.json(
      { error: "invalid_note", message: courseMessage("noteSaveFailed", lang) },
      { status: 400 },
    );
  }

  const guard = await requireUser(request, lang);
  if (guard.error) return guard.error;

  try {
    const ref = await getLessonCourseRef(guard.supabase, params.lessonId);
    if (!ref) {
      return NextResponse.json(
        { error: "lesson_not_found", message: courseMessage("lessonNotFound", lang) },
        { status: 404 },
      );
    }

    const note = await upsertLessonNote(guard.supabase, guard.user.id, ref.courseId, ref.lessonId, noteBody);
    return NextResponse.json({ note });
  } catch {
    return NextResponse.json(
      { error: "note_save_failed", message: courseMessage("noteSaveFailed", lang) },
      { status: 500 },
    );
  }
}

/** DELETE: clear the note entirely. */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const lang = parseLang(request.nextUrl.searchParams.get("lang"));
  const guard = await requireUser(request, lang);
  if (guard.error) return guard.error;

  try {
    await deleteLessonNote(guard.supabase, guard.user.id, params.lessonId);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "note_save_failed", message: courseMessage("noteSaveFailed", lang) },
      { status: 500 },
    );
  }
}
