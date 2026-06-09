"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import type { CourseProgressSummary, DbCourseEnrollment, LessonProgressStatus } from "@/lib/courses/progress";

interface ProgressResponse {
  enrollment: DbCourseEnrollment | null;
  summary: CourseProgressSummary;
}

interface UseCourseProgressResult {
  enrollment: DbCourseEnrollment | null;
  summary: CourseProgressSummary | null;
  loading: boolean;
  /** O(1) lookup for the curriculum tree — `summary.completedLessonIds` as a Set. */
  isCompleted: (lessonId: string) => boolean;
  /** Single mutation behind both the auto-complete heuristic and the explicit toggle — optimistic, re-syncs after. */
  setLessonStatus: (lessonId: string, status: LessonProgressStatus) => Promise<void>;
  /** Idempotent silent enroll — the lesson player calls this once on mount. */
  ensureEnrolled: () => Promise<void>;
  refresh: () => void;
}

function applyOptimisticStatus(
  summary: CourseProgressSummary,
  lessonId: string,
  status: LessonProgressStatus,
): CourseProgressSummary {
  const has = summary.completedLessonIds.includes(lessonId);
  if ((status === "completed") === has) return summary;

  const completedLessonIds =
    status === "completed"
      ? [...summary.completedLessonIds, lessonId]
      : summary.completedLessonIds.filter((id) => id !== lessonId);

  const completedLessons = completedLessonIds.length;
  return {
    ...summary,
    completedLessonIds,
    completedLessons,
    percentComplete: summary.totalLessons === 0 ? 0 : Math.round((completedLessons / summary.totalLessons) * 100),
  };
}

/**
 * Fetches a learner's enrollment + progress summary for one course, and
 * exposes the mutations the lesson player needs (enroll, mark complete/
 * incomplete). Mirrors `useCourses`' fetch-once pattern, but is per-user so it
 * re-fetches whenever the signed-in user changes.
 */
export function useCourseProgress(courseSlug: string): UseCourseProgressResult {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const [enrollment, setEnrollment] = useState<DbCourseEnrollment | null>(null);
  const [summary, setSummary] = useState<CourseProgressSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  const refresh = useCallback(() => setReloadKey((k) => k + 1), []);

  useEffect(() => {
    if (!user) {
      setEnrollment(null);
      setSummary(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    fetch(`/api/courses/${encodeURIComponent(courseSlug)}/progress?lang=${lang}`)
      .then((res) => (res.ok ? (res.json() as Promise<ProgressResponse>) : null))
      .then((json) => {
        if (cancelled || !json) return;
        setEnrollment(json.enrollment);
        setSummary(json.summary);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [user, courseSlug, lang, reloadKey]);

  const ensureEnrolled = useCallback(async () => {
    if (!user || enrollment) return;
    try {
      const res = await fetch(`/api/courses/${encodeURIComponent(courseSlug)}/enroll`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lang }),
      });
      if (!res.ok) return;
      const json = (await res.json()) as { enrollment: DbCourseEnrollment };
      setEnrollment(json.enrollment);
      refresh();
    } catch {
      // Silent — the player still renders without a confirmed enrollment row; the next mount retries.
    }
  }, [user, enrollment, courseSlug, lang, refresh]);

  const isCompleted = useCallback(
    (lessonId: string) => summary?.completedLessonIds.includes(lessonId) ?? false,
    [summary],
  );

  const setLessonStatus = useCallback(
    async (lessonId: string, status: LessonProgressStatus) => {
      if (!user) return;

      // Optimistic flip — the toggle (and auto-complete) should feel instant, especially on slow connections.
      setSummary((prev) => (prev ? applyOptimisticStatus(prev, lessonId, status) : prev));

      try {
        const res = await fetch(`/api/lessons/${encodeURIComponent(lessonId)}/progress`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status, lang }),
        });
        if (!res.ok) throw new Error("progress_update_failed");
      } finally {
        refresh(); // re-sync with the server either way — corrects the optimistic guess and recomputes nextLessonId
      }
    },
    [user, lang, refresh],
  );

  return { enrollment, summary, loading, isCompleted, setLessonStatus, ensureEnrolled, refresh };
}

type NoteStatus = "idle" | "loading" | "saving" | "saved";

interface UseLessonNoteResult {
  body: string;
  setBody: (value: string) => void;
  status: NoteStatus;
}

const NOTE_AUTOSAVE_DELAY_MS = 1500;

/**
 * A learner's private plain-text scratchpad for one lesson — autosaved with a
 * short debounce so typing never feels interrupted by network round trips.
 */
export function useLessonNote(lessonId: string): UseLessonNoteResult {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const [body, setBodyState] = useState("");
  const [status, setStatus] = useState<NoteStatus>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestRef = useRef("");

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    setStatus("loading");

    fetch(`/api/lessons/${encodeURIComponent(lessonId)}/notes?lang=${lang}`)
      .then((res) => (res.ok ? (res.json() as Promise<{ note: { body: string } | null }>) : null))
      .then((json) => {
        if (cancelled) return;
        const initial = json?.note?.body ?? "";
        setBodyState(initial);
        latestRef.current = initial;
        setStatus("idle");
      })
      .catch(() => {
        if (!cancelled) setStatus("idle");
      });

    return () => {
      cancelled = true;
    };
  }, [user, lessonId, lang]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const save = useCallback(
    (value: string) => {
      fetch(`/api/lessons/${encodeURIComponent(lessonId)}/notes`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: value, lang }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("note_save_failed");
          if (latestRef.current === value) setStatus("saved");
        })
        .catch(() => {
          if (latestRef.current === value) setStatus("idle");
        });
    },
    [lessonId, lang],
  );

  const setBody = useCallback(
    (value: string) => {
      setBodyState(value);
      latestRef.current = value;
      setStatus("saving");
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => save(value), NOTE_AUTOSAVE_DELAY_MS);
    },
    [save],
  );

  return { body, setBody, status };
}
