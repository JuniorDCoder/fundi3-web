"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Clock, ChevronRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";

export interface CourseCardProps {
  title: string;
  description: string;
  level: string;
  language: string;
  lessonCount: number;
  duration: string;
  isFree: boolean;
  tags: string[];
  slug: string;
  gradientFrom: string;
  gradientTo: string;
  isAfricanContext?: boolean;
  delay?: number;
  inView?: boolean;
}

export function CourseCard({
  title,
  description,
  level,
  language,
  lessonCount,
  duration,
  isFree,
  tags,
  slug,
  gradientFrom,
  gradientTo,
  isAfricanContext = false,
  delay = 0,
  inView = true,
}: CourseCardProps) {
  const { lang } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      className="group flex flex-col rounded-2xl border overflow-hidden transition-colors"
      style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "#1E2E28" }}
    >
      <Link href={`/courses/${slug}`} className="flex flex-col flex-1">
        {/* Gradient banner */}
        <div
          className="h-28 flex items-center justify-center relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
        >
          <BookOpen size={32} className="text-white/85" />
          {isAfricanContext && (
            <span
              className="absolute top-3 right-3 font-body font-medium text-xs px-2.5 py-1 rounded-full backdrop-blur-sm"
              style={{ backgroundColor: "rgba(10,15,14,0.45)", color: "#FAEEDA" }}
            >
              {t("courses.badge.african", lang)}
            </span>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-5 space-y-3">
          <h3 className="font-heading font-semibold text-base group-hover:text-primary transition-colors" style={{ color: "#F5FAF7" }}>
            {title}
          </h3>

          <p className="font-body text-sm leading-relaxed flex-1" style={{ color: "#4A6358" }}>
            {description}
          </p>

          {/* Badges row */}
          <div className="flex flex-wrap gap-2 pt-1">
            <Badge label={level} bg="rgba(255,255,255,0.05)" color="rgba(245,250,247,0.6)" />
            <Badge label={language} bg="rgba(255,255,255,0.05)" color="rgba(245,250,247,0.6)" />
            {isFree ? (
              <Badge label={t("courses.badge.free", lang)} bg="rgba(15,110,86,0.15)" color="#1D9E75" />
            ) : (
              tags.slice(0, 1).map((tag) => (
                <Badge key={tag} label={tag} bg="rgba(239,159,39,0.12)" color="#EF9F27" />
              ))
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: "#1E2E28" }}>
            <div className="flex items-center gap-3 font-mono text-xs" style={{ color: "#4A6358" }}>
              <span>{t("courses.lessons", lang, { count: String(lessonCount) })}</span>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {duration}
              </span>
            </div>
            <span
              className="flex items-center gap-1 font-body font-medium text-sm transition-colors group-hover:text-primary"
              style={{ color: "#0F6E56" }}
            >
              {isFree ? t("courses.startFree", lang) : t("courses.viewCourse", lang)}
              <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
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
