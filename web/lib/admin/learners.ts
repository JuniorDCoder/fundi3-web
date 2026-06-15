import type { SupabaseClient } from "@supabase/supabase-js";
import { deriveStudentPubkey } from "@/lib/certificates/solana";
import { getBalanceSol, getExplorerUrl, getTxExplorerUrl } from "@/lib/wallet/solana";
import { getAdminMetadata, type AdminRole } from "./metadata";
import { listAllAuthUsers } from "./users";

export interface LearnerSummary {
  id: string;
  email: string;
  displayName: string | null;
  walletAddress: string;
  walletExplorerUrl: string;
  isAdmin: boolean;
  adminRole: AdminRole | null;
  createdAt: string;
  lastSignInAt: string | null;
  enrolledCourses: number;
  completedLessons: number;
  certificates: number;
}

function countByUserId(rows: { user_id: string }[] | null): Map<string, number> {
  const map = new Map<string, number>();
  for (const row of rows ?? []) {
    map.set(row.user_id, (map.get(row.user_id) ?? 0) + 1);
  }
  return map;
}

/**
 * Every Fundi3 account with cross-cutting platform stats — backs the admin
 * "Learners" table. Wallet addresses need no lookup: every account's Solana
 * keypair is deterministically derived from its user id (see
 * lib/certificates/solana.ts), so the address is computed locally.
 */
export async function listLearners(admin: SupabaseClient): Promise<LearnerSummary[]> {
  const [users, profilesRes, enrollmentsRes, progressRes, certsRes] = await Promise.all([
    listAllAuthUsers(admin),
    admin.from("user_profiles").select("user_id, display_name"),
    admin.from("course_enrollments").select("user_id"),
    admin.from("lesson_progress").select("user_id").eq("status", "completed"),
    admin.from("certificates").select("user_id"),
  ]);

  if (profilesRes.error) throw profilesRes.error;
  if (enrollmentsRes.error) throw enrollmentsRes.error;
  if (progressRes.error) throw progressRes.error;
  if (certsRes.error) throw certsRes.error;

  const displayNameByUser = new Map<string, string>(
    ((profilesRes.data ?? []) as { user_id: string; display_name: string }[]).map((r) => [
      r.user_id,
      r.display_name,
    ]),
  );
  const enrolledCountByUser = countByUserId(enrollmentsRes.data as { user_id: string }[] | null);
  const completedLessonCountByUser = countByUserId(progressRes.data as { user_id: string }[] | null);
  const certCountByUser = countByUserId(certsRes.data as { user_id: string }[] | null);

  return users
    .map((user): LearnerSummary => {
      const meta = getAdminMetadata(user);
      const adminRole: AdminRole | null = meta ? (meta.admin_role === "superadmin" ? "superadmin" : "admin") : null;
      const walletAddress = deriveStudentPubkey(user.id).toBase58();
      return {
        id: user.id,
        email: user.email ?? "",
        displayName: displayNameByUser.get(user.id) ?? null,
        walletAddress,
        walletExplorerUrl: getExplorerUrl(walletAddress),
        isAdmin: meta !== null,
        adminRole,
        createdAt: user.created_at,
        lastSignInAt: user.last_sign_in_at ?? null,
        enrolledCourses: enrolledCountByUser.get(user.id) ?? 0,
        completedLessons: completedLessonCountByUser.get(user.id) ?? 0,
        certificates: certCountByUser.get(user.id) ?? 0,
      };
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export interface LearnerEnrollmentDetail {
  courseId: string;
  courseSlug: string;
  titleEn: string;
  titleFr: string;
  enrolledAt: string;
  completedAt: string | null;
  totalLessons: number;
  completedLessons: number;
  percentComplete: number;
}

export interface LearnerCertificateDetail {
  id: string;
  courseId: string;
  titleEn: string;
  titleFr: string;
  issuedAt: string;
  certificatePda: string | null;
  solanaTxSig: string | null;
  explorerUrl: string | null;
  txExplorerUrl: string | null;
}

export interface LearnerDetail extends LearnerSummary {
  walletBalanceSol: number | null;
  walletExplorerUrl: string;
  enrollments: LearnerEnrollmentDetail[];
  certificateDetails: LearnerCertificateDetail[];
}

interface CourseLite {
  slug: string;
  titleEn: string;
  titleFr: string;
  totalLessons: number;
}

/** One learner's full picture — profile, wallet balance, per-course progress, and certificates. */
export async function getLearnerDetail(admin: SupabaseClient, userId: string): Promise<LearnerDetail | null> {
  const { data: userData, error: userError } = await admin.auth.admin.getUserById(userId);
  if (userError || !userData?.user) return null;
  const user = userData.user;

  const [profileRes, enrollRes, certRes] = await Promise.all([
    admin.from("user_profiles").select("display_name").eq("user_id", userId).maybeSingle(),
    admin
      .from("course_enrollments")
      .select("course_id, enrolled_at, completed_at")
      .eq("user_id", userId)
      .order("enrolled_at", { ascending: false }),
    admin
      .from("certificates")
      .select("id, course_id, issued_at, certificate_pda, solana_tx_sig")
      .eq("user_id", userId)
      .order("issued_at", { ascending: false }),
  ]);

  if (profileRes.error) throw profileRes.error;
  if (enrollRes.error) throw enrollRes.error;
  if (certRes.error) throw certRes.error;

  const enrollRows = (enrollRes.data ?? []) as { course_id: string; enrolled_at: string; completed_at: string | null }[];
  const certRows = (certRes.data ?? []) as {
    id: string;
    course_id: string;
    issued_at: string;
    certificate_pda: string | null;
    solana_tx_sig: string | null;
  }[];

  const courseIds = Array.from(new Set([...enrollRows.map((r) => r.course_id), ...certRows.map((r) => r.course_id)]));

  const coursesById = new Map<string, CourseLite>();
  const completedByCourse = new Map<string, number>();

  if (courseIds.length > 0) {
    const [courseRes, progressRes] = await Promise.all([
      admin
        .from("courses")
        .select("id, slug, title_en, title_fr, course_modules(course_lessons(id))")
        .in("id", courseIds),
      admin.from("lesson_progress").select("course_id").eq("user_id", userId).eq("status", "completed").in("course_id", courseIds),
    ]);
    if (courseRes.error) throw courseRes.error;
    if (progressRes.error) throw progressRes.error;

    interface CourseRow {
      id: string;
      slug: string;
      title_en: string;
      title_fr: string;
      course_modules: { course_lessons: { id: string }[] }[] | null;
    }

    for (const row of (courseRes.data ?? []) as CourseRow[]) {
      const totalLessons = (row.course_modules ?? []).reduce(
        (sum, m) => sum + (m.course_lessons?.length ?? 0),
        0,
      );
      coursesById.set(row.id, { slug: row.slug, titleEn: row.title_en, titleFr: row.title_fr, totalLessons });
    }

    for (const row of (progressRes.data ?? []) as { course_id: string }[]) {
      completedByCourse.set(row.course_id, (completedByCourse.get(row.course_id) ?? 0) + 1);
    }
  }

  const pubkey = deriveStudentPubkey(userId);
  const walletAddress = pubkey.toBase58();
  const walletBalanceSol = await getBalanceSol(pubkey);

  const enrollments: LearnerEnrollmentDetail[] = enrollRows.map((row) => {
    const course = coursesById.get(row.course_id);
    const totalLessons = course?.totalLessons ?? 0;
    const completedLessons = completedByCourse.get(row.course_id) ?? 0;
    return {
      courseId: row.course_id,
      courseSlug: course?.slug ?? "",
      titleEn: course?.titleEn ?? "",
      titleFr: course?.titleFr ?? "",
      enrolledAt: row.enrolled_at,
      completedAt: row.completed_at,
      totalLessons,
      completedLessons,
      percentComplete: totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100),
    };
  });

  const certificateDetails: LearnerCertificateDetail[] = certRows.map((row) => {
    const course = coursesById.get(row.course_id);
    return {
      id: row.id,
      courseId: row.course_id,
      titleEn: course?.titleEn ?? "",
      titleFr: course?.titleFr ?? "",
      issuedAt: row.issued_at,
      certificatePda: row.certificate_pda,
      solanaTxSig: row.solana_tx_sig,
      explorerUrl: row.certificate_pda ? getExplorerUrl(row.certificate_pda) : null,
      txExplorerUrl: row.solana_tx_sig ? getTxExplorerUrl(row.solana_tx_sig) : null,
    };
  });

  const meta = getAdminMetadata(user);

  return {
    id: user.id,
    email: user.email ?? "",
    displayName: profileRes.data?.display_name ?? null,
    walletAddress,
    isAdmin: meta !== null,
    adminRole: meta ? (meta.admin_role === "superadmin" ? "superadmin" : "admin") : null,
    createdAt: user.created_at,
    lastSignInAt: user.last_sign_in_at ?? null,
    enrolledCourses: enrollments.length,
    completedLessons: enrollments.reduce((sum, e) => sum + e.completedLessons, 0),
    certificates: certificateDetails.length,
    walletBalanceSol,
    walletExplorerUrl: getExplorerUrl(walletAddress),
    enrollments,
    certificateDetails,
  };
}
