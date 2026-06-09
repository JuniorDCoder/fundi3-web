"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Compass } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useCourse } from "@/hooks/useCourses";
import { t } from "@/lib/i18n";
import { LessonPlayer } from "@/components/learn/LessonPlayer";
import { SkeletonLesson } from "@/components/ui/Skeleton";

export default function LessonPlayerPage() {
  const params = useParams<{ courseId: string; lessonId: string }>();
  const { course, loading, notFound } = useCourse(params.courseId);

  const lesson = useMemo(() => {
    if (!course) return null;
    for (const courseModule of course.modules) {
      const found = courseModule.lessons.find((l) => l.id === params.lessonId);
      if (found) return found;
    }
    return null;
  }, [course, params.lessonId]);

  if (notFound || (course && !lesson)) {
    return <LessonNotFound courseSlug={course?.slug} />;
  }
  if (loading || !course || !lesson) {
    return <LessonLoading />;
  }

  return <LessonPlayer course={course} lesson={lesson} />;
}

function LessonLoading() {
  return <SkeletonLesson />;
}

function LessonNotFound({ courseSlug }: { courseSlug?: string }) {
  const { lang } = useLanguage();
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center gap-4 px-4"
      style={{ backgroundColor: "#0A0F0E", color: "#F5FAF7" }}
    >
      <span
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{ backgroundColor: "rgba(239,159,39,0.12)" }}
      >
        <Compass size={22} style={{ color: "#EF9F27" }} />
      </span>
      <h1 className="font-heading font-semibold text-2xl">{t("learn.notFound", lang)}</h1>
      <p className="font-body text-sm max-w-md" style={{ color: "#4A6358" }}>
        {t("learn.notFoundBody", lang)}
      </p>
      <Link
        href={courseSlug ? `/courses/${courseSlug}` : "/courses"}
        className="inline-flex items-center gap-2 font-body font-medium text-sm mt-2 transition-colors hover:text-primary"
        style={{ color: "#0F6E56" }}
      >
        <ArrowLeft size={14} />
        {t("learn.back", lang)}
      </Link>
    </div>
  );
}
