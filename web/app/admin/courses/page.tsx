"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Plus, Loader2, Pencil, Trash2, BookOpen, Globe2 } from "lucide-react";

import { useLanguage } from "@/hooks/useLanguage";
import { authedFetch, type ApiError } from "@/lib/admin/api-client";
import { t, type Lang } from "@/lib/i18n";
import { levelBadgeKey, type CourseStatus, type DbCourse } from "@/lib/courses/types";
import { SkeletonTableRows } from "@/components/ui/Skeleton";

function localizedTitle(course: DbCourse, lang: Lang): string {
  if (lang === "fr") return course.titleFr || course.titleEn;
  return course.titleEn || course.titleFr;
}

function lessonCount(course: DbCourse): number {
  return course.modules.reduce((total, module) => total + module.lessons.length, 0);
}

function formatDate(value: string, lang: Lang): string {
  return new Date(value).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function StatusBadge({ status, lang }: { status: CourseStatus; lang: Lang }) {
  const styles: Record<CourseStatus, string> = {
    published: "bg-primary/10 border-primary/20 text-[#1D9E75]",
    draft: "bg-white/5 border-white/10 text-[#4A6358]",
    archived: "bg-secondary/10 border-secondary/20 text-[#FAC775]",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium rounded-full px-2.5 py-1 border ${styles[status]}`}>
      {t(`admin.courses.status.${status}`, lang)}
    </span>
  );
}

export default function AdminCoursesPage() {
  const { lang } = useLanguage();
  const [courses, setCourses] = useState<DbCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [actingId, setActingId] = useState<string | null>(null);

  const loadCourses = useCallback(async () => {
    try {
      const res = await authedFetch(`/api/admin/courses?lang=${lang}`, lang, { method: "GET", body: undefined });
      if (!res.ok) return;
      const data = (await res.json()) as { courses: DbCourse[] };
      setCourses(data.courses);
    } finally {
      setLoading(false);
    }
  }, [lang]);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  async function handleDelete(course: DbCourse) {
    if (!window.confirm(t("admin.courses.confirmDelete", lang, { title: localizedTitle(course, lang) }))) return;

    setActingId(course.id);
    try {
      const res = await authedFetch(`/api/admin/courses/${course.id}?lang=${lang}`, lang, {
        method: "DELETE",
        body: undefined,
      });
      const json = await res.json().catch(() => null);

      if (!res.ok) {
        toast.error((json as ApiError | null)?.message ?? t("admin.courses.actionFailed", lang));
        return;
      }

      toast.success(t("admin.courses.deleted", lang));
      setCourses((prev) => prev.filter((c) => c.id !== course.id));
    } catch {
      toast.error(t("admin.courses.actionFailed", lang));
    } finally {
      setActingId(null);
    }
  }

  return (
    <div className="max-w-6xl space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-semibold text-[#F5FAF7] mb-1">
            {t("admin.courses.title", lang)}
          </h1>
          <p className="text-[#4A6358] text-sm">{t("admin.courses.subtitle", lang)}</p>
        </div>
        <Link
          href="/admin/courses/new"
          className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white
                     font-medium rounded-xl px-5 py-2.5 text-sm transition-colors whitespace-nowrap"
        >
          <Plus size={16} />
          {t("admin.courses.newCourse", lang)}
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden"
      >
        {loading ? (
          <SkeletonTableRows rows={5} columns={6} />
        ) : courses.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-center gap-3">
            <span className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/10">
              <BookOpen size={20} className="text-accent" />
            </span>
            <p className="text-sm text-[#4A6358] max-w-sm">{t("admin.courses.empty", lang)}</p>
            <Link
              href="/admin/courses/new"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#1D9E75] hover:text-[#9FE1CB] transition-colors"
            >
              <Plus size={15} />
              {t("admin.courses.newCourse", lang)}
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-[#4A6358] uppercase tracking-wide">
                  <th className="px-5 py-3 font-medium">{t("admin.courses.tableTitle", lang)}</th>
                  <th className="px-5 py-3 font-medium">{t("admin.courses.tableStatus", lang)}</th>
                  <th className="px-5 py-3 font-medium">{t("admin.courses.tableLevel", lang)}</th>
                  <th className="px-5 py-3 font-medium">{t("admin.courses.tablePricing", lang)}</th>
                  <th className="px-5 py-3 font-medium">{t("admin.courses.tableLessons", lang)}</th>
                  <th className="px-5 py-3 font-medium">{t("admin.courses.tableUpdated", lang)}</th>
                  <th className="px-5 py-3 font-medium text-right">{t("admin.courses.tableActions", lang)}</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => {
                  const acting = actingId === course.id;
                  return (
                    <tr key={course.id} className="border-b border-white/5 last:border-0">
                      <td className="px-5 py-3.5">
                        <div className="text-[#F5FAF7] font-medium">{localizedTitle(course, lang)}</div>
                        <div className="flex items-center gap-1.5 mt-0.5 text-xs text-[#4A6358] font-mono">
                          <Globe2 size={11} />
                          {course.slug}
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <StatusBadge status={course.status} lang={lang} />
                      </td>
                      <td className="px-5 py-3.5 text-[#F5FAF7]/80">{t(levelBadgeKey(course.level), lang)}</td>
                      <td className="px-5 py-3.5 text-[#F5FAF7]/80">
                        {course.isFree
                          ? t("admin.courses.free", lang)
                          : t("admin.courses.priceValue", lang, { amount: String(course.priceUsd ?? 0) })}
                      </td>
                      <td className="px-5 py-3.5 text-[#4A6358]">{lessonCount(course)}</td>
                      <td className="px-5 py-3.5 text-[#4A6358] text-xs">{formatDate(course.updatedAt, lang)}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/courses/${course.id}`}
                            title={t("admin.courses.edit", lang)}
                            className="p-2 rounded-lg text-[#4A6358] hover:text-[#F5FAF7] hover:bg-white/5 transition-colors"
                          >
                            <Pencil size={15} />
                          </Link>
                          <button
                            type="button"
                            disabled={acting}
                            onClick={() => handleDelete(course)}
                            title={t("admin.courses.delete", lang)}
                            className="p-2 rounded-lg text-[#4A6358] hover:text-red-400 hover:bg-red-500/10 disabled:opacity-50 transition-colors"
                          >
                            {acting ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                          </button>
                        </div>
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
