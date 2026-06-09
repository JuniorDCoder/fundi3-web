"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";
import { useCourses } from "@/hooks/useCourses";
import { type CourseLevel } from "@/lib/courses/types";
import { CourseGrid } from "@/components/courses/CourseGrid";
import { SkeletonCourseGrid } from "@/components/ui/Skeleton";

type LevelFilter = "all" | CourseLevel;

export default function CoursesPage() {
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const { courses, loading } = useCourses();
  const [levelFilter, setLevelFilter] = useState<LevelFilter>("all");
  const [freeOnly, setFreeOnly] = useState(false);

  const filtered = useMemo(() => {
    return courses.filter((course) => {
      if (levelFilter !== "all" && course.level !== levelFilter) return false;
      if (freeOnly && !course.isFree) return false;
      return true;
    });
  }, [courses, levelFilter, freeOnly]);

  const levelOptions: { value: LevelFilter; labelKey: string }[] = [
    { value: "all", labelKey: "courses.filter.all" },
    { value: "beginner", labelKey: "courses.badge.beginner" },
    { value: "intermediate", labelKey: "courses.badge.intermediate" },
    { value: "advanced", labelKey: "courses.badge.advanced" },
  ];

  return (
    <div style={{ backgroundColor: "#0A0F0E", color: "#F5FAF7" }}>
      {/* Hero / header */}
      <section className="relative pt-28 pb-12 overflow-hidden">
        <div
          className="absolute -top-40 left-1/4 w-[480px] h-[480px] rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #EF9F27, transparent 65%)" }}
        />
        <div className="absolute inset-0 bg-grid pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 max-w-2xl"
          >
            <span
              className="inline-block font-mono text-xs tracking-widest uppercase"
              style={{ color: "#1D9E75" }}
            >
              {t("courses.catalog.label", lang)}
            </span>
            <h1 className="font-heading font-semibold text-4xl sm:text-5xl leading-tight">
              {t("courses.catalog.headline", lang)}
            </h1>
            <p className="font-body text-lg leading-relaxed" style={{ color: "#4A6358" }}>
              {t("courses.catalog.subtext", lang)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters + grid */}
      <section ref={ref} className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Filter bar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div className="flex flex-wrap gap-2">
              {levelOptions.map((option) => {
                const active = levelFilter === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setLevelFilter(option.value)}
                    className="font-body font-medium text-sm px-4 py-2 rounded-full border transition-colors"
                    style={
                      active
                        ? { backgroundColor: "rgba(15,110,86,0.18)", borderColor: "#1D9E75", color: "#9FE1CB" }
                        : { backgroundColor: "rgba(255,255,255,0.03)", borderColor: "#1E2E28", color: "#4A6358" }
                    }
                  >
                    {t(option.labelKey, lang)}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setFreeOnly((v) => !v)}
              className="self-start sm:self-auto flex items-center gap-2 font-body font-medium text-sm px-4 py-2 rounded-full border transition-colors"
              style={
                freeOnly
                  ? { backgroundColor: "rgba(239,159,39,0.15)", borderColor: "#EF9F27", color: "#FAC775" }
                  : { backgroundColor: "rgba(255,255,255,0.03)", borderColor: "#1E2E28", color: "#4A6358" }
              }
            >
              <span
                className="w-3.5 h-3.5 rounded-full border flex items-center justify-center"
                style={{ borderColor: freeOnly ? "#EF9F27" : "#4A6358" }}
              >
                {freeOnly && <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#EF9F27" }} />}
              </span>
              {t("courses.filter.free", lang)}
            </button>
          </motion.div>

          {/* Results count */}
          {!loading && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="font-mono text-xs"
              style={{ color: "#4A6358" }}
            >
              {t(filtered.length === 1 ? "courses.results.one" : "courses.results", lang, {
                count: String(filtered.length),
              })}
            </motion.p>
          )}

          {/* Grid */}
          {loading ? <SkeletonCourseGrid count={6} /> : <CourseGrid courses={filtered} inView={inView} />}
        </div>
      </section>
    </div>
  );
}
