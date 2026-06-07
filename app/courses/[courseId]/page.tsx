"use client";

import { useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, useInView } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  Layers,
  Globe2,
  Award,
  ChevronRight,
  Compass,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuth } from "@/hooks/useAuth";
import { t } from "@/lib/i18n";
import {
  getCourseById,
  getCourseLessonCount,
  getCourseModuleCount,
  levelBadgeKey,
  type Course,
} from "@/lib/courses/data";

export default function CourseDetailPage() {
  const params = useParams<{ courseId: string }>();
  const course = getCourseById(params.courseId);

  if (!course) {
    return <CourseNotFound />;
  }

  return <CourseDetail course={course} />;
}

function CourseNotFound() {
  const { lang } = useLanguage();
  return (
    <div
      className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-4 px-4"
      style={{ backgroundColor: "#0A0F0E", color: "#F5FAF7" }}
    >
      <span
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{ backgroundColor: "rgba(239,159,39,0.12)" }}
      >
        <Compass size={22} style={{ color: "#EF9F27" }} />
      </span>
      <h1 className="font-heading font-semibold text-2xl">{t("courses.detail.notFound", lang)}</h1>
      <p className="font-body text-sm max-w-md" style={{ color: "#4A6358" }}>
        {t("courses.detail.notFoundBody", lang)}
      </p>
      <Link
        href="/courses"
        className="inline-flex items-center gap-2 font-body font-medium text-sm mt-2 transition-colors hover:text-primary"
        style={{ color: "#0F6E56" }}
      >
        <ArrowLeft size={14} />
        {t("courses.detail.back", lang)}
      </Link>
    </div>
  );
}

function CourseDetail({ course }: { course: Course }) {
  const { lang } = useLanguage();
  const { user } = useAuth();

  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-60px" });

  const curriculumRef = useRef<HTMLDivElement>(null);
  const curriculumInView = useInView(curriculumRef, { once: true, margin: "-80px" });

  const lessonCount = getCourseLessonCount(course);
  const moduleCount = getCourseModuleCount(course);

  const ctaLabel = course.isFree
    ? t("courses.detail.start", lang)
    : user
      ? t("courses.detail.continue", lang)
      : t("courses.detail.signInToStart", lang);

  const ctaHref = user ? `/learn/${course.id}/lesson-1` : `/auth/signup?redirect=/courses/${course.id}`;

  return (
    <div style={{ backgroundColor: "#0A0F0E", color: "#F5FAF7" }}>
      {/* Hero / banner */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div
          className="absolute -top-32 right-0 w-[520px] h-[520px] rounded-full opacity-10 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${course.gradientTo}, transparent 65%)` }}
        />
        <div className="absolute inset-0 bg-grid pointer-events-none" />

        <div ref={heroRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 font-body text-sm transition-colors hover:text-primary"
              style={{ color: "#4A6358" }}
            >
              <ArrowLeft size={14} />
              {t("courses.detail.back", lang)}
            </Link>
          </motion.div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10 items-start">
            {/* Left: title, desc, badges, CTA */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08, duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex flex-wrap gap-2">
                <Badge label={t(levelBadgeKey(course.level), lang)} bg="rgba(255,255,255,0.05)" color="rgba(245,250,247,0.6)" />
                <Badge label={t("courses.badge.bilingual", lang)} bg="rgba(255,255,255,0.05)" color="rgba(245,250,247,0.6)" />
                {course.isFree && (
                  <Badge label={t("courses.badge.free", lang)} bg="rgba(15,110,86,0.15)" color="#1D9E75" />
                )}
                {course.isAfrican && (
                  <Badge label={t("courses.badge.african", lang)} bg="rgba(239,159,39,0.12)" color="#EF9F27" />
                )}
              </div>

              <h1 className="font-heading font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight">
                {t(course.titleKey, lang)}
              </h1>

              <p className="font-body text-lg leading-relaxed max-w-2xl" style={{ color: "#4A6358" }}>
                {t(course.longDescKey, lang)}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {course.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: "rgba(255,255,255,0.04)", color: "#4A6358", border: "1px solid #1E2E28" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href={ctaHref}
                  className="inline-flex items-center gap-2 font-body font-semibold text-sm px-6 py-3.5 rounded-xl transition-transform hover:scale-[1.03]"
                  style={{ backgroundColor: "#0F6E56", color: "#F5FAF7" }}
                >
                  {ctaLabel}
                  <ChevronRight size={16} />
                </Link>
              </div>
            </motion.div>

            {/* Right: gradient banner + stats card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.16, duration: 0.6 }}
              className="space-y-4"
            >
              <div
                className="h-40 rounded-2xl flex items-center justify-center border"
                style={{
                  background: `linear-gradient(135deg, ${course.gradientFrom}, ${course.gradientTo})`,
                  borderColor: "#1E2E28",
                }}
              >
                <BookOpen size={40} className="text-white/85" />
              </div>

              <div
                className="rounded-2xl border divide-y"
                style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "#1E2E28" }}
              >
                <StatRow icon={Layers} labelKey="courses.detail.statLessons" value={String(lessonCount)} />
                <StatRow icon={Clock} labelKey="courses.detail.statDuration" value={course.duration} />
                <StatRow icon={Award} labelKey="courses.detail.statLevel" value={t(levelBadgeKey(course.level), lang)} />
                <StatRow icon={Globe2} labelKey="courses.detail.statLanguage" value={t("courses.detail.languageValue", lang)} />
                <StatRow icon={CheckCircle2} labelKey="courses.detail.statCertificate" value={t("courses.detail.certificateValue", lang)} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What you'll learn */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-heading font-semibold text-2xl sm:text-3xl mb-6">
              {t("courses.detail.outcomesHeadline", lang)}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {course.outcomeKeys.map((key, i) => (
              <FadeIn key={key} delay={0.05 * i}>
                <div
                  className="flex items-start gap-3 rounded-xl border p-4"
                  style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "#1E2E28" }}
                >
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0" style={{ color: "#1D9E75" }} />
                  <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(245,250,247,0.8)" }}>
                    {t(key, lang)}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section ref={curriculumRef} className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={curriculumInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8"
          >
            <h2 className="font-heading font-semibold text-2xl sm:text-3xl">
              {t("courses.detail.curriculumHeadline", lang)}
            </h2>
            <p className="font-mono text-xs" style={{ color: "#4A6358" }}>
              {t("courses.detail.modulesSummary", lang, {
                modules: String(moduleCount),
                lessons: String(lessonCount),
              })}
            </p>
          </motion.div>

          <div className="space-y-5">
            {course.modules.map((courseModule, mi) => (
              <motion.div
                key={courseModule.id}
                initial={{ opacity: 0, y: 20 }}
                animate={curriculumInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.08 * mi, duration: 0.5 }}
                className="rounded-2xl border overflow-hidden"
                style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "#1E2E28" }}
              >
                <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: "#1E2E28" }}>
                  <span
                    className="font-mono text-xs font-medium w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "rgba(15,110,86,0.18)", color: "#9FE1CB" }}
                  >
                    {mi + 1}
                  </span>
                  <h3 className="font-heading font-semibold text-base" style={{ color: "#F5FAF7" }}>
                    {t(courseModule.titleKey, lang)}
                  </h3>
                </div>
                <ul className="divide-y" style={{ borderColor: "#1E2E28" }}>
                  {courseModule.lessons.map((lesson, li) => (
                    <li
                      key={lesson.id}
                      className="flex items-center justify-between gap-4 px-5 py-3.5"
                      style={{ borderColor: "#1E2E28" }}
                    >
                      <span className="flex items-center gap-3 font-body text-sm" style={{ color: "rgba(245,250,247,0.75)" }}>
                        <span className="font-mono text-xs" style={{ color: "#4A6358" }}>
                          {String(mi + 1).padStart(2, "0")}.{String(li + 1).padStart(2, "0")}
                        </span>
                        {t(lesson.titleKey, lang)}
                      </span>
                      <span className="flex items-center gap-1 font-mono text-xs shrink-0" style={{ color: "#4A6358" }}>
                        <Clock size={12} />
                        {lesson.duration}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={curriculumInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-12 rounded-2xl border p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
            style={{ background: `linear-gradient(120deg, ${course.gradientFrom}1A, ${course.gradientTo}1A)`, borderColor: "#1E2E28" }}
          >
            <div className="space-y-1">
              <h3 className="font-heading font-semibold text-xl" style={{ color: "#F5FAF7" }}>
                {t(course.titleKey, lang)}
              </h3>
              <p className="font-body text-sm" style={{ color: "#4A6358" }}>
                {t("courses.detail.modulesSummary", lang, {
                  modules: String(moduleCount),
                  lessons: String(lessonCount),
                })}
              </p>
            </div>
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center gap-2 font-body font-semibold text-sm px-6 py-3.5 rounded-xl transition-transform hover:scale-[1.03] whitespace-nowrap"
              style={{ backgroundColor: "#0F6E56", color: "#F5FAF7" }}
            >
              {ctaLabel}
              <ChevronRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Badge({ label, bg, color }: { label: string; bg: string; color: string }) {
  return (
    <span className="font-body font-medium text-xs px-2.5 py-1 rounded-full" style={{ backgroundColor: bg, color }}>
      {label}
    </span>
  );
}

function StatRow({
  icon: Icon,
  labelKey,
  value,
}: {
  icon: LucideIcon;
  labelKey: string;
  value: string;
}) {
  const { lang } = useLanguage();
  return (
    <div className="flex items-center justify-between px-5 py-3.5" style={{ borderColor: "#1E2E28" }}>
      <span className="flex items-center gap-2 font-body text-sm" style={{ color: "#4A6358" }}>
        <Icon size={15} style={{ color: "#1D9E75" }} />
        {t(labelKey, lang)}
      </span>
      <span className="font-body font-medium text-sm" style={{ color: "#F5FAF7" }}>
        {value}
      </span>
    </div>
  );
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
