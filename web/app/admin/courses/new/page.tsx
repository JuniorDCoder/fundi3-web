"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";
import { CourseEditor } from "@/components/admin/CourseEditor";

export default function NewCoursePage() {
  const { lang } = useLanguage();

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <Link
          href="/admin/courses"
          className="inline-flex items-center gap-2 text-sm text-[#4A6358] hover:text-[#F5FAF7] transition-colors mb-3"
        >
          <ArrowLeft size={14} />
          {t("admin.courses.editor.back", lang)}
        </Link>
        <h1 className="font-heading text-2xl md:text-3xl font-semibold text-[#F5FAF7] mb-1">
          {t("admin.courses.editor.newTitle", lang)}
        </h1>
        <p className="text-[#4A6358] text-sm">{t("admin.courses.editor.newSubtitle", lang)}</p>
      </motion.div>

      <CourseEditor mode="create" />
    </div>
  );
}
