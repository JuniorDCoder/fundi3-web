import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { authMessage, parseLang } from "@/lib/auth/messages";
import { getAuthenticatedAdmin, isTutor } from "@/lib/admin/guard";

export interface TutorStudentRow {
  studentId: string;
  studentEmail: string;
  displayName: string | null;
  courseId: string;
  courseTitleEn: string;
  courseTitleFr: string;
  enrolledAt: string;
  completedLessons: number;
  totalLessons: number;
  lastAccessedAt: string | null;
}

export async function GET(request: NextRequest) {
  const lang = parseLang(request.nextUrl.searchParams.get("lang"));
  const caller = await getAuthenticatedAdmin(request);
  if (!caller) {
    return NextResponse.json(
      { error: "not_admin", message: authMessage("notAdminAccount", lang) },
      { status: 403 },
    );
  }

  const admin = createAdminClient();
  const tutorId = isTutor(caller.metadata) ? caller.user.id : request.nextUrl.searchParams.get("tutorId");

  const { data: courses, error: coursesErr } = await admin
    .from("courses")
    .select("id, title_en, title_fr")
    .eq("tutor_id", tutorId ?? caller.user.id);

  if (coursesErr) {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }

  if (!courses || courses.length === 0) {
    return NextResponse.json({ students: [], courses: [] });
  }

  const courseIds = courses.map((c) => c.id as string);

  const { data: enrollments } = await admin
    .from("course_enrollments")
    .select("user_id, course_id, enrolled_at, last_accessed_at")
    .in("course_id", courseIds);

  if (!enrollments || enrollments.length === 0) {
    return NextResponse.json({ students: [], courses });
  }

  const userIds = Array.from(new Set(enrollments.map((e) => e.user_id as string)));

  const { data: profiles } = await admin
    .from("user_profiles")
    .select("user_id, display_name")
    .in("user_id", userIds);

  const profileMap = new Map((profiles ?? []).map((p) => [p.user_id, p.display_name as string | null]));

  const emailMap = new Map<string, string>();
  for (let page = 1; page <= 10; page++) {
    const { data: users } = await admin.auth.admin.listUsers({ page, perPage: 200 });
    if (!users?.users) break;
    for (const u of users.users) {
      if (userIds.includes(u.id)) emailMap.set(u.id, u.email ?? "");
    }
    if (emailMap.size >= userIds.length || users.users.length < 200) break;
  }

  const { data: lessonCounts } = await admin
    .from("course_modules")
    .select("course_id, course_lessons(id)")
    .in("course_id", courseIds);

  const totalLessonsMap = new Map<string, number>();
  for (const m of lessonCounts ?? []) {
    const cid = m.course_id as string;
    const count = Array.isArray(m.course_lessons) ? m.course_lessons.length : 0;
    totalLessonsMap.set(cid, (totalLessonsMap.get(cid) ?? 0) + count);
  }

  const { data: progress } = await admin
    .from("lesson_progress")
    .select("user_id, course_id")
    .in("course_id", courseIds)
    .eq("status", "completed");

  const completedMap = new Map<string, number>();
  for (const p of progress ?? []) {
    const key = `${p.user_id}:${p.course_id}`;
    completedMap.set(key, (completedMap.get(key) ?? 0) + 1);
  }

  const students: TutorStudentRow[] = enrollments.map((e) => {
    const course = courses.find((c) => c.id === e.course_id);
    return {
      studentId: e.user_id as string,
      studentEmail: emailMap.get(e.user_id as string) ?? "",
      displayName: profileMap.get(e.user_id as string) ?? null,
      courseId: e.course_id as string,
      courseTitleEn: (course?.title_en as string) ?? "",
      courseTitleFr: (course?.title_fr as string) ?? "",
      enrolledAt: e.enrolled_at as string,
      completedLessons: completedMap.get(`${e.user_id}:${e.course_id}`) ?? 0,
      totalLessons: totalLessonsMap.get(e.course_id as string) ?? 0,
      lastAccessedAt: (e.last_accessed_at as string) ?? null,
    };
  });

  return NextResponse.json({ students, courses });
}
