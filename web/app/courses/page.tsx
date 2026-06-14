"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Search, X } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuth } from "@/hooks/useAuth";
import { t } from "@/lib/i18n";
import { useCourses } from "@/hooks/useCourses";
import { type CourseLevel, type LocalizedCourse } from "@/lib/courses/types";
import { createClient } from "@/lib/supabase/client";
import { listUserEnrollments } from "@/lib/courses/progress";
import { CourseGrid } from "@/components/courses/CourseGrid";
import { SkeletonCourseGrid } from "@/components/ui/Skeleton";

type LevelFilter = "all" | CourseLevel;

/** Matches a course against a free-text search query (every word must appear somewhere in the course's text). */
function matchesSearch(course: LocalizedCourse, query: string): boolean {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return true;
  const haystack = [course.title, course.description, course.longDescription, ...course.tags]
    .join(" ")
    .toLowerCase();
  return terms.every((term) => haystack.includes(term));
}

export default function CoursesPage() {
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const { courses, loading } = useCourses();
  const { user } = useAuth();
  const [levelFilter, setLevelFilter] = useState<LevelFilter>("all");
  const [freeOnly, setFreeOnly] = useState(false);
  const [query, setQuery] = useState("");
  const [enrolledIds, setEnrolledIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!user) {
      setEnrolledIds(new Set());
      return;
    }
    const supabase = createClient();
    listUserEnrollments(supabase, user.id)
      .then((rows) => setEnrolledIds(new Set(rows.map((r) => r.courseId))))
      .catch(() => {});
  }, [user]);

  const filtered = useMemo(() => {
    return courses.filter((course) => {
      if (levelFilter !== "all" && course.level !== levelFilter) return false;
      if (freeOnly && !course.isFree) return false;
      if (!matchesSearch(course, query)) return false;
      return true;
    });
  }, [courses, levelFilter, freeOnly, query]);

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
          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="relative max-w-md"
          >
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "#4A6358" }}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("courses.search.placeholder", lang)}
              className="w-full font-body text-sm rounded-full border pl-11 pr-10 py-2.5 outline-none transition-colors focus:border-[#1D9E75]"
              style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "#1E2E28", color: "#F5FAF7" }}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label={t("courses.search.clear", lang)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2"
              >
                <X size={16} style={{ color: "#4A6358" }} />
              </button>
            )}
          </motion.div>

          {/* Filter bar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
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
          {loading ? (
            <SkeletonCourseGrid count={6} />
          ) : (
            <CourseGrid
              courses={filtered}
              inView={inView}
              enrolledCourseIds={enrolledIds}
              emptyMessage={query.trim() ? t("courses.search.empty", lang, { query: query.trim() }) : undefined}
            />
          )}
        </div>
      </section>
    </div>
  );
}
