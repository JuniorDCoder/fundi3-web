"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";
import { useCourses } from "@/hooks/useCourses";
import { CourseGrid } from "@/components/courses/CourseGrid";

export function CoursesPreview() {
  const { lang } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const { courses } = useCourses();
  const featured = courses.slice(0, 3);

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
        <CourseGrid courses={featured} inView={inView} />
      </div>
    </section>
  );
}
