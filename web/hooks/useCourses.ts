"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { localizeCourse, type DbCourse, type LocalizedCourse } from "@/lib/courses/types";

interface UseCoursesResult {
  courses: LocalizedCourse[];
  loading: boolean;
  error: boolean;
}

/**
 * Fetches the published catalog once (raw bilingual rows) and re-localizes
 * in memory whenever `lang` toggles — mirrors how t() resolves i18n keys
 * instantly on language switch, with no refetch.
 */
export function useCourses(): UseCoursesResult {
  const { lang } = useLanguage();
  const [raw, setRaw] = useState<DbCourse[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/courses")
      .then((res) => res.json())
      .then((json: { courses?: DbCourse[] }) => {
        if (cancelled) return;
        setRaw(Array.isArray(json.courses) ? json.courses : []);
      })
      .catch(() => {
        if (!cancelled) {
          setRaw([]);
          setError(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const courses = useMemo(() => (raw ?? []).map((course) => localizeCourse(course, lang)), [raw, lang]);

  return { courses, loading: raw === null, error };
}

interface UseCourseResult {
  course: LocalizedCourse | null;
  loading: boolean;
  notFound: boolean;
}

/** Fetches a single published course by slug and localizes it for the active language. */
export function useCourse(slug: string): UseCourseResult {
  const { lang } = useLanguage();
  const [raw, setRaw] = useState<DbCourse | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    setRaw(undefined);

    fetch(`/api/courses/${encodeURIComponent(slug)}`)
      .then(async (res) => {
        if (res.status === 404) return null;
        const json = await res.json();
        return (json?.course as DbCourse | undefined) ?? null;
      })
      .then((course) => {
        if (!cancelled) setRaw(course);
      })
      .catch(() => {
        if (!cancelled) setRaw(null);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const course = useMemo(() => (raw ? localizeCourse(raw, lang) : null), [raw, lang]);

  return { course, loading: raw === undefined, notFound: raw === null };
}
