"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { BookOpen, ChevronRight, ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";

interface CourseCardProps {
  title: string;
  description: string;
  level: string;
  lessonCount: number;
  isFree: boolean;
  isAfrican: boolean;
  lang: string;
  gradientFrom: string;
  gradientTo: string;
  delay: number;
  inView: boolean;
}

function CourseCard({
  title,
  description,
  level,
  lessonCount,
  isFree,
  isAfrican,
  lang,
  gradientFrom,
  gradientTo,
  delay,
  inView,
}: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className="group flex flex-col rounded-2xl border overflow-hidden hover:border-white/20 transition-colors"
      style={{ backgroundColor: "#111915", borderColor: "#1E2E28" }}
    >
      {/* Gradient banner */}
      <div
        className="h-28 flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
      >
        <BookOpen size={32} className="text-white opacity-80" />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 space-y-3">
        {/* African context badge (if applicable) */}
        {isAfrican && (
          <span
            className="self-start font-body font-medium text-xs px-2.5 py-1 rounded-full"
            style={{ backgroundColor: "#EF9F2720", color: "#EF9F27" }}
          >
            {t("courses.badge.african", lang as "en" | "fr")}
          </span>
        )}

        {/* Title */}
        <h3 className="font-heading font-semibold text-base" style={{ color: "#F5FAF7" }}>
          {title}
        </h3>

        {/* Description */}
        <p className="font-body text-sm leading-relaxed flex-1" style={{ color: "#4A6358" }}>
          {description}
        </p>

        {/* Badges row */}
        <div className="flex flex-wrap gap-2 pt-1">
          <Badge
            label={level}
            bg="rgba(255,255,255,0.05)"
            color="rgba(245,250,247,0.5)"
          />
          <Badge label="FR + EN" bg="rgba(255,255,255,0.05)" color="rgba(245,250,247,0.5)" />
          {isFree && (
            <Badge
              label={t("courses.badge.free", lang as "en" | "fr")}
              bg="rgba(15,110,86,0.15)"
              color="#1D9E75"
            />
          )}
        </div>

        {/* Footer: lesson count + CTA */}
        <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: "#1E2E28" }}>
          <span className="font-mono text-xs" style={{ color: "#4A6358" }}>
            {t("courses.lessons", lang as "en" | "fr", { count: String(lessonCount) })}
          </span>
          <Link
            href="/courses"
            className="flex items-center gap-1 font-body font-medium text-sm transition-colors group-hover:text-primary"
            style={{ color: "#0F6E56" }}
          >
            {t("courses.startFree", lang as "en" | "fr")}
            <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function Badge({ label, bg, color }: { label: string; bg: string; color: string }) {
  return (
    <span
      className="font-body font-medium text-xs px-2.5 py-1 rounded-full"
      style={{ backgroundColor: bg, color }}
    >
      {label}
    </span>
  );
}

export function CoursesPreview() {
  const { lang } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const courses = [
    {
      title: t("courses.course1.title", lang),
      description: t("courses.course1.desc", lang),
      level: t("courses.badge.beginner", lang),
      lessonCount: 6,
      isFree: true,
      isAfrican: false,
      gradientFrom: "#0F6E56",
      gradientTo: "#1D9E75",
    },
    {
      title: t("courses.course2.title", lang),
      description: t("courses.course2.desc", lang),
      level: t("courses.badge.intermediate", lang),
      lessonCount: 12,
      isFree: false,
      isAfrican: false,
      gradientFrom: "#4338ca",
      gradientTo: "#7c3aed",
    },
    {
      title: t("courses.course3.title", lang),
      description: t("courses.course3.desc", lang),
      level: t("courses.badge.intermediate", lang),
      lessonCount: 10,
      isFree: false,
      isAfrican: true,
      gradientFrom: "#BA7517",
      gradientTo: "#EF9F27",
    },
  ];

  return (
    <section
      ref={ref}
      className="py-24 md:py-32"
      style={{ backgroundColor: "#0A0F0E" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-heading font-semibold text-3xl sm:text-4xl"
            style={{ color: "#F5FAF7" }}
          >
            {t("courses.headline", lang)}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/courses"
              className="flex items-center gap-1 font-body font-medium text-sm transition-colors hover:text-primary whitespace-nowrap"
              style={{ color: "#0F6E56" }}
            >
              {t("courses.viewAll", lang)}
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <CourseCard
              key={course.title}
              {...course}
              lang={lang}
              delay={0.1 + i * 0.12}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
