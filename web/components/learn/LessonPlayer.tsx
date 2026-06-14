"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Menu,
  PartyPopper,
  Sparkles,
  X,
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuth } from "@/hooks/useAuth";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import { CurriculumTree } from "./CurriculumTree";
import { NotesPanel } from "./NotesPanel";
import { CertClaimSection } from "./CertClaimSection";
import { QuizBlock } from "./QuizBlock";
import { VideoEmbed } from "./VideoEmbed";
import { CodePlayground } from "./CodePlayground";
import { LessonMarkdown } from "./LessonMarkdown";
import { Skeleton } from "@/components/ui/Skeleton";
import { t } from "@/lib/i18n";
import type { LocalizedCourse, LocalizedLesson } from "@/lib/courses/types";

interface LessonPlayerProps {
  course: LocalizedCourse;
  lesson: LocalizedLesson;
}

const LESSON_TYPE_KEYS: Record<string, string> = {
  video: "learn.lessonTypeVideo",
  code: "learn.lessonTypeCode",
  quiz: "learn.lessonTypeQuiz",
};

export function LessonPlayer({ course, lesson }: LessonPlayerProps) {
  const { lang } = useLanguage();
  const { user } = useAuth();
  const { summary, loading, isCompleted, setLessonStatus, ensureEnrolled } = useCourseProgress(course.slug);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  // Guards against the auto-complete observer (and quiz/manual triggers) re-firing
  // completeLesson for the same lesson while the optimistic progress update is
  // still in flight — without this, multiple "Lesson completed" toasts can stack.
  const completingRef = useRef<Set<string>>(new Set());

  const ordered = useMemo(
    () => course.modules.flatMap((courseModule) => courseModule.lessons),
    [course],
  );
  const currentIndex = ordered.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? ordered[currentIndex - 1] : null;
  const nextLesson = currentIndex >= 0 && currentIndex < ordered.length - 1 ? ordered[currentIndex + 1] : null;
  const isLastLesson = currentIndex === ordered.length - 1;
  const done = isCompleted(lesson.id);
  const lessonTypeKey = LESSON_TYPE_KEYS[lesson.lessonType];
  const hasVideo = lesson.lessonType === "video" && !!lesson.videoUrl;
  const hasCode = lesson.lessonType === "code" && !!lesson.codeLanguage;
  const hasQuiz = lesson.lessonType === "quiz" && lesson.quiz.length > 0;
  const canProceed = !(hasQuiz && !quizPassed);
  const showComingSoon =
    (lesson.lessonType === "video" && !hasVideo) ||
    (lesson.lessonType === "quiz" && !hasQuiz) ||
    (lesson.lessonType === "code" && !hasCode);

  // Silent, idempotent enroll on first view — backs the "just start learning" UX (no separate enroll step).
  useEffect(() => {
    if (user) void ensureEnrolled();
  }, [user, ensureEnrolled]);

  // Close the mobile curriculum drawer whenever the lesson changes.
  useEffect(() => {
    setSidebarOpen(false);
  }, [lesson.id]);

  // Quiz lessons stay locked until answered correctly; seed from existing progress
  // so a previously-passed quiz doesn't re-lock the lesson on revisit.
  useEffect(() => {
    setQuizPassed(isCompleted(lesson.id));
  }, [lesson.id, isCompleted]);

  const completeLesson = useCallback(async () => {
    if (isCompleted(lesson.id) || completingRef.current.has(lesson.id)) return;
    completingRef.current.add(lesson.id);
    try {
      await setLessonStatus(lesson.id, "completed");
      toast.success(t("toast.lessonCompleted", lang), {
        id: `lesson-completed-${lesson.id}`,
        description: t("toast.lessonCompletedDesc", lang),
        icon: <CheckCircle2 size={16} className="text-accent" />,
      });
      if (isLastLesson) {
        toast.success(t("learn.courseComplete", lang), {
          id: `course-completed-${course.id}`,
          description: t("learn.courseCompleteBody", lang),
          icon: <PartyPopper size={16} className="text-secondary" />,
        });
      }
    } finally {
      completingRef.current.delete(lesson.id);
    }
  }, [isCompleted, lesson.id, setLessonStatus, lang, isLastLesson, course.id]);

  // Auto-complete heuristic: once the reader scrolls the lesson content into view
  // near its end, treat the lesson as read and mark it complete automatically.
  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || done || loading || (hasQuiz && !quizPassed)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void completeLesson();
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [lesson.id, done, loading, completeLesson, hasQuiz, quizPassed]);

  async function toggleComplete() {
    if (done) {
      await setLessonStatus(lesson.id, "in_progress");
    } else {
      await completeLesson();
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A0F0E", color: "#F5FAF7" }}>
      {/* Top bar */}
      <header
        className="sticky top-0 z-30 backdrop-blur-md border-b"
        style={{ backgroundColor: "rgba(10,15,14,0.85)", borderColor: "#1E2E28" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden shrink-0 w-9 h-9 rounded-lg flex items-center justify-center border transition-colors"
              style={{ borderColor: "#1E2E28", color: "#4A6358" }}
              aria-label={t("learn.curriculum", lang)}
            >
              <Menu size={16} />
            </button>
            <Link
              href={`/courses/${course.slug}`}
              className="hidden sm:inline-flex items-center gap-2 font-body text-sm shrink-0 transition-colors hover:text-primary"
              style={{ color: "#4A6358" }}
            >
              <ArrowLeft size={14} />
              {t("learn.back", lang)}
            </Link>
            <span className="hidden sm:block w-px h-5" style={{ backgroundColor: "#1E2E28" }} />
            <p className="font-body text-sm truncate" style={{ color: "rgba(245,250,247,0.7)" }}>
              {course.title}
            </p>
          </div>

          {summary && (
            <div className="hidden md:flex items-center gap-3 shrink-0">
              <div className="w-32 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "#1E2E28" }}>
                <div
                  className="h-full rounded-full transition-[width] duration-500"
                  style={{ width: `${summary.percentComplete}%`, backgroundColor: "#1D9E75" }}
                />
              </div>
              <span className="font-mono text-xs whitespace-nowrap" style={{ color: "#4A6358" }}>
                {t("learn.progressLabel", lang, {
                  completed: String(summary.completedLessons),
                  total: String(summary.totalLessons),
                })}
              </span>
            </div>
          )}

          {loading && !summary ? (
            <Skeleton className="h-9 w-32 rounded-xl shrink-0" />
          ) : hasQuiz && !quizPassed ? (
            <span
              className="inline-flex items-center gap-2 font-body font-medium text-sm px-4 py-2 rounded-xl border shrink-0 opacity-60 cursor-not-allowed"
              style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "#1E2E28", color: "#4A6358" }}
              title={t("learn.quizLocked", lang)}
            >
              <CheckCircle2 size={16} />
              <span className="hidden sm:inline">{t("learn.quizLockedShort", lang)}</span>
            </span>
          ) : (
            <button
              onClick={toggleComplete}
              className="inline-flex items-center gap-2 font-body font-medium text-sm px-4 py-2 rounded-xl border transition-colors shrink-0"
              style={
                done
                  ? { backgroundColor: "rgba(15,110,86,0.16)", borderColor: "rgba(29,158,117,0.4)", color: "#9FE1CB" }
                  : { backgroundColor: "#0F6E56", borderColor: "#0F6E56", color: "#F5FAF7" }
              }
            >
              <CheckCircle2 size={16} />
              <span className="hidden sm:inline">{done ? t("learn.completed", lang) : t("learn.markComplete", lang)}</span>
            </button>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
        {/* Sidebar — desktop */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-1">
            <CurriculumTree course={course} currentLessonId={lesson.id} isCompleted={isCompleted} />
          </div>
        </aside>

        {/* Sidebar — mobile drawer */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              className="fixed inset-0 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div
                className="absolute inset-0"
                style={{ backgroundColor: "rgba(10,15,14,0.7)" }}
                onClick={() => setSidebarOpen(false)}
              />
              <motion.div
                className="absolute inset-y-0 left-0 w-[85%] max-w-sm overflow-y-auto border-r p-5"
                style={{ backgroundColor: "#111915", borderColor: "#1E2E28" }}
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.25 }}
              >
                <div className="flex items-center justify-between mb-5">
                  <p className="font-heading font-semibold text-sm" style={{ color: "#F5FAF7" }}>
                    {t("learn.curriculum", lang)}
                  </p>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ color: "#4A6358" }}
                    aria-label="Close"
                  >
                    <X size={16} />
                  </button>
                </div>
                <CurriculumTree
                  course={course}
                  currentLessonId={lesson.id}
                  isCompleted={isCompleted}
                  onNavigate={() => setSidebarOpen(false)}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content */}
        <main className="min-w-0 space-y-8">
          <motion.article
            key={lesson.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-5"
          >
            <div className="space-y-2">
              <p className="font-mono text-xs" style={{ color: "#4A6358" }}>
                {t("learn.lessonOf", lang, {
                  current: String(currentIndex + 1),
                  total: String(ordered.length),
                })}
              </p>
              <h1 className="font-heading font-semibold text-2xl sm:text-3xl leading-tight">{lesson.title}</h1>
            </div>

            {showComingSoon && lessonTypeKey && (
              <div
                className="flex items-start gap-3 rounded-xl border px-4 py-3"
                style={{ backgroundColor: "rgba(239,159,39,0.08)", borderColor: "#1E2E28" }}
              >
                <Sparkles size={16} className="mt-0.5 shrink-0" style={{ color: "#EF9F27" }} />
                <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(245,250,247,0.75)" }}>
                  {t("learn.lessonTypeComingSoon", lang, { type: t(lessonTypeKey, lang) })}
                </p>
              </div>
            )}

            <LessonMarkdown content={lesson.content} />

            {hasVideo && <VideoEmbed url={lesson.videoUrl!} title={lesson.title} />}

            {hasCode && (
              <CodePlayground
                codeLanguage={lesson.codeLanguage!}
                codeStarter={lesson.codeStarter}
                title={lesson.title}
              />
            )}

            {hasQuiz && (
              <QuizBlock
                questions={lesson.quiz}
                onPassed={() => {
                  setQuizPassed(true);
                  void completeLesson();
                }}
              />
            )}

            {/* Auto-complete sentinel — fires once this scrolls into view near the end of the lesson */}
            <div ref={sentinelRef} aria-hidden className="h-px w-full" />
          </motion.article>

          <NotesPanel lessonId={lesson.id} />

          {/* Certificate claim — auto-triggers on last lesson once at 100% */}
          {isLastLesson && summary?.percentComplete === 100 && (
            <CertClaimSection courseId={course.id} />
          )}

          {/* Prev / Next navigation */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            {prevLesson ? (
              <Link
                href={`/learn/${course.slug}/${prevLesson.id}`}
                className="inline-flex items-center gap-2 font-body text-sm px-4 py-3 rounded-xl border transition-colors hover:border-white/20"
                style={{ borderColor: "#1E2E28", color: "rgba(245,250,247,0.75)" }}
              >
                <ChevronLeft size={16} />
                <span className="truncate">
                  {t("learn.prevLesson", lang)} · {prevLesson.title}
                </span>
              </Link>
            ) : (
              <span />
            )}

            {!canProceed ? (
              <span
                className="inline-flex items-center justify-end gap-2 font-body font-medium text-sm px-5 py-3 rounded-xl opacity-50 cursor-not-allowed"
                style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "#4A6358" }}
                title={t("learn.quizLocked", lang)}
              >
                {t("learn.quizLocked", lang)}
                <ChevronRight size={16} />
              </span>
            ) : nextLesson ? (
              <Link
                href={`/learn/${course.slug}/${nextLesson.id}`}
                className="inline-flex items-center justify-end gap-2 font-body font-medium text-sm px-5 py-3 rounded-xl transition-transform hover:scale-[1.02]"
                style={{ backgroundColor: "#0F6E56", color: "#F5FAF7" }}
              >
                <span className="truncate">
                  {t("learn.nextLesson", lang)} · {nextLesson.title}
                </span>
                <ChevronRight size={16} />
              </Link>
            ) : (
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-end gap-2 font-body font-semibold text-sm px-5 py-3 rounded-xl transition-transform hover:scale-[1.02]"
                style={{ backgroundColor: "#EF9F27", color: "#04342C" }}
              >
                <PartyPopper size={16} />
                {t("learn.finishCourse", lang)}
              </Link>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
