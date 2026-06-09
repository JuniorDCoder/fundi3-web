"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";
import { CourseCard } from "@/components/courses/CourseCard";
import {
  localizedLessonCount,
  levelBadgeKey,
  type LocalizedCourse,
} from "@/lib/courses/types";

interface CourseGridProps {
  courses: LocalizedCourse[];
  inView?: boolean;
}

export function CourseGrid({ courses, inView = true }: CourseGridProps) {
  const { lang } = useLanguage();

  if (courses.length === 0) {
    return (
      <p className="font-body text-sm text-center py-16" style={{ color: "#4A6358" }}>
        {t("courses.empty", lang)}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course, i) => (
        <CourseCard
          key={course.id}
          slug={course.slug}
          title={course.title}
          description={course.description}
          level={t(levelBadgeKey(course.level), lang)}
          language={t("courses.badge.bilingual", lang)}
          lessonCount={localizedLessonCount(course)}
          duration={course.duration}
          isFree={course.isFree}
          tags={course.tags}
          gradientFrom={course.gradientFrom}
          gradientTo={course.gradientTo}
          isAfricanContext={course.isAfrican}
          delay={0.06 * i}
          inView={inView}
        />
      ))}
    </div>
  );
}
