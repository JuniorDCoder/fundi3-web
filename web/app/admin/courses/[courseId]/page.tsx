"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Compass } from "lucide-react";

import { useLanguage } from "@/hooks/useLanguage";
import { authedFetch } from "@/lib/admin/api-client";
import { t } from "@/lib/i18n";
import { CourseEditor } from "@/components/admin/CourseEditor";
import { SkeletonForm } from "@/components/ui/Skeleton";
import type { DbCourse } from "@/lib/courses/types";

export default function EditCoursePage() {
  const { lang } = useLanguage();
  const params = useParams<{ courseId: string }>();

  const [course, setCourse] = useState<DbCourse | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setNotFound(false);

    authedFetch(`/api/admin/courses/${params.courseId}?lang=${lang}`, lang, { method: "GET", body: undefined })
      .then(async (res) => {
        if (cancelled) return;
        if (res.status === 404) {
          setNotFound(true);
          return;
        }
        if (!res.ok) return;
        const data = (await res.json()) as { course: DbCourse };
        setCourse(data.course);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // Re-fetch only when the course id changes — language toggling shouldn't refetch raw bilingual data.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.courseId]);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <Link
          href="/admin/courses"
          className="inline-flex items-center gap-2 text-sm text-[#4A6358] hover:text-[#F5FAF7] transition-colors mb-3"
        >
          <ArrowLeft size={14} />
          {t("admin.courses.editor.back", lang)}
        </Link>
        <h1 className="font-heading text-2xl md:text-3xl font-semibold text-[#F5FAF7] mb-1">
          {t("admin.courses.editor.editTitle", lang)}
        </h1>
        {course && <p className="text-[#4A6358] text-sm font-mono">{course.slug}</p>}
      </motion.div>

      {loading ? (
        <div className="space-y-6">
          <SkeletonForm fields={4} />
          <SkeletonForm fields={3} />
        </div>
      ) : notFound ? (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center gap-3">
          <span className="w-12 h-12 rounded-full flex items-center justify-center bg-secondary/10">
            <Compass size={20} className="text-secondary" />
          </span>
          <p className="text-sm text-[#4A6358]">{t("admin.courses.editor.notFound", lang)}</p>
          <Link
            href="/admin/courses"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#1D9E75] hover:text-[#9FE1CB] transition-colors"
          >
            <ArrowLeft size={15} />
            {t("admin.courses.editor.back", lang)}
          </Link>
        </div>
      ) : course ? (
        <CourseEditor mode="edit" course={course} />
      ) : null}
    </div>
  );
}
