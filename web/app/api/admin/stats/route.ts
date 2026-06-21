import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { authMessage, parseLang } from "@/lib/auth/messages";
import { getAuthenticatedAdmin, isTutor } from "@/lib/admin/guard";
import { countAllUsers, listAdminUsers } from "@/lib/admin/users";

/** GET: live counts for the dashboard overview cards — pulled from auth.users. */
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

  if (isTutor(caller.metadata)) {
    const [coursesResult, enrollmentsResult, certificatesResult] = await Promise.all([
      admin.from("courses").select("id", { count: "exact", head: true }).eq("tutor_id", caller.user.id),
      admin.from("course_enrollments").select("user_id, course_id").in(
        "course_id",
        (await admin.from("courses").select("id").eq("tutor_id", caller.user.id)).data?.map((c) => c.id as string) ?? [],
      ),
      admin.from("certificates").select("id", { count: "exact", head: true }).in(
        "course_id",
        (await admin.from("courses").select("id").eq("tutor_id", caller.user.id)).data?.map((c) => c.id as string) ?? [],
      ),
    ]);

    const studentIds = new Set((enrollmentsResult.data ?? []).map((e) => e.user_id as string));

    return NextResponse.json({
      totalCourses: coursesResult.count ?? 0,
      totalStudents: studentIds.size,
      totalCertificates: certificatesResult.count ?? 0,
      totalUsers: 0,
      totalAdmins: 0,
    });
  }

  const [totalUsers, admins, coursesCount, certificatesCount] = await Promise.all([
    countAllUsers(admin),
    listAdminUsers(admin),
    admin.from("courses").select("id", { count: "exact", head: true }).eq("status", "published"),
    admin.from("certificates").select("id", { count: "exact", head: true }),
  ]);

  const totalTutors = admins.filter((a) => a.role === "tutor").length;

  return NextResponse.json({
    totalUsers,
    totalAdmins: admins.length,
    totalTutors,
    totalCourses: coursesCount.count ?? 0,
    totalCertificates: certificatesCount.count ?? 0,
  });
}
