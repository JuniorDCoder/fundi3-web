"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Award, BookOpen, Trophy, GraduationCap, ArrowRight, ChevronRight, ExternalLink, LogOut, Wand2 } from "lucide-react";
import { LogoMark } from "@/components/brand/Logo";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";
import { localizeCourse, levelBadgeKey, type DbCourse } from "@/lib/courses/types";
import type { CourseProgressSummary, DbCourseEnrollment } from "@/lib/courses/progress";
import { Skeleton, SkeletonStatCard, SkeletonCourseProgressCard } from "@/components/ui/Skeleton";

interface DashboardEntry {
  enrollment: DbCourseEnrollment;
  course: DbCourse;
  summary: CourseProgressSummary;
}

interface CertItem {
  id: string;
  courseNameEn: string;
  courseNameFr: string;
  issuedAt: string;
  certUrl: string;
  solanaExplorerUrl: string | null;
}

interface DashboardData {
  entries: DashboardEntry[];
  stats: { coursesEnrolled: number; lessonsCompleted: number; certificatesEarned: number };
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex items-center gap-4">
      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-accent shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-heading font-semibold text-[#F5FAF7]">{value}</p>
        <p className="text-xs text-[#4A6358]">{label}</p>
      </div>
    </div>
  );
}

function useDashboardProgress(enabled: boolean) {
  const { lang } = useLanguage();
  const [data, setData] = useState<DashboardData | null>(null);
  const [certs, setCerts] = useState<CertItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!enabled) {
      setData(null);
      setCerts([]);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    Promise.all([
      fetch(`/api/dashboard/progress?lang=${lang}`).then((r) => (r.ok ? r.json() : null)),
      fetch("/api/certificates").then((r) => (r.ok ? r.json() : null)),
    ])
      .then(([progress, certsData]) => {
        if (cancelled) return;
        setData(progress ?? null);
        setCerts(certsData?.certificates ?? []);
      })
      .catch(() => { if (!cancelled) { setData(null); setCerts([]); } })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [enabled, lang]);

  return { data, certs, loading };
}

export default function DashboardPage() {
  const { user, signOut, loading: authLoading } = useAuth();
  const { lang } = useLanguage();
  const router = useRouter();
  const { data, certs, loading: progressLoading } = useDashboardProgress(Boolean(user));

  async function handleSignOut() {
    await signOut();

    toast.success(t("toast.signedOut", lang), {
      description: t("toast.signedOutDesc", lang),
      icon: <Wand2 size={16} className="text-secondary" />,
    });

    router.push("/");
    router.refresh();
  }

  if (authLoading) {
    return <DashboardLoading />;
  }

  const entries = data?.entries ?? [];
  const stats = data?.stats ?? { coursesEnrolled: 0, lessonsCompleted: 0, certificatesEarned: 0 };
  const hasCourses = entries.length > 0;
  const allComplete = hasCourses && entries.every((entry) => entry.summary.percentComplete === 100);

  return (
    <div className="max-w-5xl mx-auto px-4 pb-16">
      {/* Welcome header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-10"
      >
        <div>
          <p className="text-[#4A6358] text-sm mb-1">{t("dashboard.welcome", lang)}</p>
          <h1 className="font-heading text-3xl font-semibold text-[#F5FAF7]">
            {user?.email?.split("@")[0] ?? "Learner"} 👋
          </h1>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 text-sm text-[#4A6358] hover:text-red-400 transition-colors"
        >
          <LogOut size={16} />
          {t("dashboard.signOut", lang)}
        </button>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
      >
        <StatCard icon={<BookOpen size={20} />} label={t("dashboard.coursesEnrolled", lang)} value={stats.coursesEnrolled} />
        <StatCard icon={<GraduationCap size={20} />} label={t("dashboard.lessonsCompleted", lang)} value={stats.lessonsCompleted} />
        <StatCard icon={<Trophy size={20} />} label={t("dashboard.certificatesEarned", lang)} value={stats.certificatesEarned} />
      </motion.div>

      {progressLoading && (
        <div className="mb-10 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <p className="font-heading text-xl font-semibold text-[#F5FAF7]/30">{t("dashboard.myCourses", lang)}</p>
          </div>
          <SkeletonCourseProgressCard />
          <SkeletonCourseProgressCard />
        </div>
      )}

      {!progressLoading && hasCourses && (
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-10"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-xl font-semibold text-[#F5FAF7]">{t("dashboard.myCourses", lang)}</h2>
            <Link
              href="/courses"
              className="inline-flex items-center gap-1.5 text-sm text-[#4A6358] hover:text-primary transition-colors"
            >
              {t("dashboard.viewAllCourses", lang)}
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="space-y-4">
            {entries.map((entry, i) => (
              <CourseProgressCard key={entry.course.id} entry={entry} delay={0.05 * i} />
            ))}
          </div>

          {allComplete && (
            <p className="mt-4 text-sm text-center text-[#4A6358]">{t("dashboard.allCaughtUp", lang)}</p>
          )}
        </motion.section>
      )}

      {/* Certificates section */}
      {!progressLoading && certs.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-xl font-semibold text-[#F5FAF7]">
              {t("dashboard.certificates", lang)}
            </h2>
            <Link
              href="/dashboard/certificates"
              className="inline-flex items-center gap-1.5 text-sm text-[#4A6358] hover:text-primary transition-colors"
            >
              {t("dashboard.viewAllCerts", lang)}
              <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certs.slice(0, 3).map((cert, i) => (
              <CertCard key={cert.id} cert={cert} delay={0.05 * i} lang={lang} />
            ))}
          </div>
        </motion.section>
      )}

      {/* Start learning CTA — shown when there's nothing enrolled yet */}
      {!progressLoading && !hasCourses && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LogoMark className="w-8 h-8" />
          </div>
          <h2 className="font-heading text-xl font-semibold text-[#F5FAF7] mb-2">
            {t("dashboard.noCoursesTitle", lang)}
          </h2>
          <p className="text-[#4A6358] text-sm mb-6 max-w-sm mx-auto">{t("dashboard.noCoursesBody", lang)}</p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white
                       font-medium rounded-xl px-6 py-2.5 text-sm transition-colors"
          >
            {t("dashboard.browseCourses", lang)}
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      )}
    </div>
  );
}

function DashboardLoading() {
  const { lang } = useLanguage();
  return (
    <div className="max-w-5xl mx-auto px-4 pb-16">
      <div className="flex items-center justify-between mb-10">
        <div className="space-y-2">
          <p className="text-[#4A6358] text-sm">{t("dashboard.welcome", lang)}</p>
          <Skeleton className="h-8 w-48" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <SkeletonStatCard />
        <SkeletonStatCard />
        <SkeletonStatCard />
      </div>

      <div className="space-y-4">
        <SkeletonCourseProgressCard />
        <SkeletonCourseProgressCard />
      </div>
    </div>
  );
}

function CertCard({ cert, delay, lang }: { cert: CertItem; delay: number; lang: string }) {
  const issued = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(
    new Date(cert.issuedAt),
  );
  const courseName = lang === "fr" ? cert.courseNameFr || cert.courseNameEn : cert.courseNameEn;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-white/5 backdrop-blur-md border rounded-2xl p-5 flex flex-col gap-3"
      style={{ borderColor: "rgba(239,159,39,0.2)" }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(239,159,39,0.12)" }}>
        <Award size={20} style={{ color: "#EF9F27" }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-heading font-semibold text-sm text-[#F5FAF7] truncate">{courseName}</p>
        <p className="font-mono text-xs mt-0.5" style={{ color: "#4A6358" }}>{issued}</p>
      </div>
      <div className="flex items-center gap-2">
        <Link
          href={cert.certUrl}
          className="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
          style={{ backgroundColor: "rgba(15,110,86,0.15)", color: "#1D9E75" }}
        >
          View →
        </Link>
        {cert.solanaExplorerUrl && (
          <a
            href={cert.solanaExplorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
            style={{ backgroundColor: "rgba(255,255,255,0.04)", color: "#4A6358" }}
          >
            <ExternalLink size={10} />
            Solana
          </a>
        )}
      </div>
    </motion.div>
  );
}

function CourseProgressCard({ entry, delay }: { entry: DashboardEntry; delay: number }) {
  const { lang } = useLanguage();
  const course = localizeCourse(entry.course, lang);
  const { summary } = entry;

  const continueLessonId = summary.nextLessonId ?? summary.firstLessonId;
  const continueHref = continueLessonId ? `/learn/${course.slug}/${continueLessonId}` : `/courses/${course.slug}`;
  const isComplete = summary.percentComplete === 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-5"
    >
      <div
        className="w-full sm:w-32 h-20 sm:h-16 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: `linear-gradient(135deg, ${course.gradientFrom}, ${course.gradientTo})` }}
      >
        <BookOpen size={22} className="text-white/85" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-heading font-semibold text-base text-[#F5FAF7] truncate">{course.title}</h3>
          <span className="font-mono text-[11px] px-2 py-0.5 rounded-full shrink-0 bg-white/5 text-[#4A6358]">
            {t(levelBadgeKey(course.level), lang)}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-[#1E2E28] max-w-xs">
            <div
              className="h-full rounded-full transition-[width] duration-500"
              style={{ width: `${summary.percentComplete}%`, backgroundColor: isComplete ? "#EF9F27" : "#1D9E75" }}
            />
          </div>
          <span className="font-mono text-xs text-[#4A6358] shrink-0">
            {t("dashboard.progressLabel", lang, { percent: String(summary.percentComplete) })}
          </span>
        </div>
        <p className="font-mono text-[11px] text-[#4A6358] mt-1">
          {t("dashboard.courseCardLessons", lang, {
            completed: String(summary.completedLessons),
            total: String(summary.totalLessons),
          })}
        </p>
      </div>

      <Link
        href={continueHref}
        className="inline-flex items-center justify-center gap-2 font-body font-medium text-sm px-5 py-2.5 rounded-xl shrink-0 transition-transform hover:scale-[1.03]"
        style={{ backgroundColor: isComplete ? "rgba(239,159,39,0.14)" : "#0F6E56", color: isComplete ? "#EF9F27" : "#F5FAF7" }}
      >
        {t("dashboard.continueLearning", lang)}
        <ArrowRight size={16} />
      </Link>
    </motion.div>
  );
}
