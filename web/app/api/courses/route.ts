import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { listPublishedCourses } from "@/lib/courses/queries";

/** GET: list published courses for the public catalog (RLS restricts to status='published'). */
export async function GET() {
  const supabase = createClient();

  try {
    const courses = await listPublishedCourses(supabase);
    return NextResponse.json({ courses });
  } catch {
    return NextResponse.json({ error: "server_error", courses: [] }, { status: 500 });
  }
}
