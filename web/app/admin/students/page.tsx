"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

import { useLanguage } from "@/hooks/useLanguage";
import { authedFetch } from "@/lib/admin/api-client";
import { t } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";
import { SkeletonTableRows } from "@/components/ui/Skeleton";

interface StudentRow {
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

interface CourseOption {
  id: string;
  title_en: string;
  title_fr: string;
}

function formatDate(value: string | null, lang: Lang): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function TutorStudentsPage() {
  const { lang } = useLanguage();
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [courses, setCourses] = useState<CourseOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  const load = useCallback(async () => {
    try {
      const res = await authedFetch(`/api/admin/tutor/students?lang=${lang}`, lang, { method: "GET", body: undefined });
      if (!res.ok) return;
      const data = await res.json();
      setStudents(data.students ?? []);
      setCourses(data.courses ?? []);
    } finally {
      setLoading(false);
    }
  }, [lang]);

  useEffect(() => { load(); }, [load]);

  const filtered = filter === "all" ? students : students.filter((s) => s.courseId === filter);

  return (
    <div className="max-w-5xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="font-heading text-2xl md:text-3xl font-semibold text-[#F5FAF7] mb-1">
          {t("admin.students.title", lang)}
        </h1>
        <p className="text-[#4A6358] text-sm">{t("admin.students.subtitle", lang)}</p>
      </motion.div>

      {courses.length > 1 && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-[#F5FAF7] focus:outline-none focus:border-primary transition-colors"
          >
            <option value="all" className="bg-surface">{t("admin.students.filterAll", lang)}</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id} className="bg-surface">
                {lang === "fr" ? c.title_fr || c.title_en : c.title_en || c.title_fr}
              </option>
            ))}
          </select>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden"
      >
        {loading ? (
          <SkeletonTableRows rows={5} columns={5} />
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center">
            <GraduationCap size={32} className="mx-auto mb-3 text-[#4A6358]" />
            <p className="text-sm text-[#4A6358]">{t("admin.students.empty", lang)}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-[#4A6358] uppercase tracking-wide">
                  <th className="px-5 py-3 font-medium">{t("admin.students.tableStudent", lang)}</th>
                  <th className="px-5 py-3 font-medium">{t("admin.students.tableCourse", lang)}</th>
                  <th className="px-5 py-3 font-medium">{t("admin.students.tableEnrolled", lang)}</th>
                  <th className="px-5 py-3 font-medium">{t("admin.students.tableProgress", lang)}</th>
                  <th className="px-5 py-3 font-medium">{t("admin.students.tableLastActive", lang)}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => {
                  const pct = s.totalLessons > 0 ? Math.round((s.completedLessons / s.totalLessons) * 100) : 0;
                  return (
                    <tr key={`${s.studentId}-${s.courseId}`} className="border-b border-white/5 last:border-0">
                      <td className="px-5 py-3.5">
                        <div className="text-[#F5FAF7]">{s.displayName ?? s.studentEmail}</div>
                        {s.displayName && (
                          <div className="text-[#4A6358] text-xs">{s.studentEmail}</div>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-[#F5FAF7]/80 text-xs">
                        {lang === "fr" ? s.courseTitleFr || s.courseTitleEn : s.courseTitleEn || s.courseTitleFr}
                      </td>
                      <td className="px-5 py-3.5 text-[#4A6358] text-xs">
                        {formatDate(s.enrolledAt, lang)}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden max-w-[80px]">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                width: `${pct}%`,
                                backgroundColor: pct === 100 ? "#EF9F27" : "#1D9E75",
                              }}
                            />
                          </div>
                          <span className="text-xs text-[#4A6358] whitespace-nowrap">
                            {s.completedLessons}/{s.totalLessons} ({pct}%)
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-[#4A6358] text-xs">
                        {formatDate(s.lastAccessedAt, lang)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
