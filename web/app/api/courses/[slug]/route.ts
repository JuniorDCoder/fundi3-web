import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getPublishedCourseBySlug } from "@/lib/courses/queries";

interface RouteParams {
  params: { slug: string };
}

/** GET: fetch a single published course (with its modules/lessons) by slug. */
export async function GET(_request: Request, { params }: RouteParams) {
  const supabase = createClient();

  try {
    const course = await getPublishedCourseBySlug(supabase, params.slug);
    if (!course) {
      return NextResponse.json({ error: "course_not_found" }, { status: 404 });
    }
    return NextResponse.json({ course });
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
