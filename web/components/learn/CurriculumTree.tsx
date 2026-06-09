"use client";

import Link from "next/link";
import { Check, Circle, PlayCircle } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";
import type { LocalizedCourse } from "@/lib/courses/types";

interface CurriculumTreeProps {
  course: LocalizedCourse;
  currentLessonId: string;
  isCompleted: (lessonId: string) => boolean;
  onNavigate?: () => void;
}

/** The sidebar lesson list — shows position, completion state, and the active lesson. */
export function CurriculumTree({ course, currentLessonId, isCompleted, onNavigate }: CurriculumTreeProps) {
  const { lang } = useLanguage();

  return (
    <nav aria-label={t("learn.curriculum", lang)} className="space-y-5">
      {course.modules.map((courseModule, mi) => (
        <div key={courseModule.id}>
          <p className="font-mono text-[11px] uppercase tracking-wide px-2 mb-2" style={{ color: "#4A6358" }}>
            {String(mi + 1).padStart(2, "0")} · {courseModule.title}
          </p>
          <ul className="space-y-1">
            {courseModule.lessons.map((lesson) => {
              const active = lesson.id === currentLessonId;
              const done = isCompleted(lesson.id);
              return (
                <li key={lesson.id}>
                  <Link
                    href={`/learn/${course.slug}/${lesson.id}`}
                    onClick={onNavigate}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 font-body text-sm leading-snug transition-colors"
                    style={{
                      backgroundColor: active ? "rgba(15,110,86,0.16)" : "transparent",
                      color: active ? "#9FE1CB" : done ? "rgba(245,250,247,0.72)" : "#4A6358",
                    }}
                  >
                    {done ? (
                      <span
                        className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "#1D9E75" }}
                        aria-label={t("learn.completed", lang)}
                      >
                        <Check size={12} strokeWidth={3} style={{ color: "#04342C" }} />
                      </span>
                    ) : active ? (
                      <PlayCircle size={16} className="shrink-0" style={{ color: "#9FE1CB" }} />
                    ) : (
                      <Circle size={16} className="shrink-0" />
                    )}
                    <span>{lesson.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
