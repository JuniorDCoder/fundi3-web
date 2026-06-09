"use client";

import { notFound } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Calendar, ChevronRight, ThumbsUp, ThumbsDown } from "lucide-react";
import { getDoc, docs } from "@/lib/docs/content";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";

interface Props {
  params: { slug: string };
}

export default function DocPage({ params }: Props) {
  const { lang, toggleLang } = useLanguage();
  const doc = getDoc(params.slug);
  const [helpful, setHelpful] = useState<boolean | null>(null);

  if (!doc) notFound();

  const title = lang === "fr" ? doc.titleFr : doc.title;
  const category = lang === "fr" ? doc.categoryFr : doc.category;
  const content = lang === "fr" ? doc.contentFr : doc.content;

  const currentIndex = docs.findIndex((d) => d.slug === params.slug);
  const prev = currentIndex > 0 ? docs[currentIndex - 1] : null;
  const next = currentIndex < docs.length - 1 ? docs[currentIndex + 1] : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-4"
    >
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 font-body text-xs mb-8" style={{ color: "#4A6358" }}>
        <Link href="/docs" className="hover:text-off-white transition-colors">
          {lang === "fr" ? "Docs" : "Docs"}
        </Link>
        <ChevronRight size={12} />
        <span style={{ color: "rgba(245,250,247,0.5)" }}>{category}</span>
        <ChevronRight size={12} />
        <span style={{ color: "#F5FAF7" }}>{title}</span>
      </nav>

      {/* Header */}
      <div className="space-y-4 pb-8 border-b" style={{ borderColor: "#1E2E28" }}>
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-4">
          <span
            className="font-mono text-xs px-2.5 py-1 rounded-full"
            style={{ backgroundColor: "rgba(15,110,86,0.15)", color: "#1D9E75" }}
          >
            {category}
          </span>

          <span className="flex items-center gap-1.5 font-mono text-xs" style={{ color: "#4A6358" }}>
            <Clock size={12} />
            {t("docs.readingTime", lang, { min: String(doc.readingTime) })}
          </span>

          <span className="flex items-center gap-1.5 font-mono text-xs" style={{ color: "#4A6358" }}>
            <Calendar size={12} />
            {t("docs.lastUpdated", lang, { date: doc.lastUpdated })}
          </span>

          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="ml-auto font-mono text-xs px-3 py-1 rounded-lg border transition-colors hover:border-white/20"
            style={{ borderColor: "#1E2E28", color: "#4A6358" }}
          >
            {lang === "fr" ? "🇬🇧 English" : "🇫🇷 Français"}
          </button>
        </div>

        <h1 className="font-heading font-semibold text-3xl sm:text-4xl" style={{ color: "#F5FAF7" }}>
          {title}
        </h1>
      </div>

      {/* Doc content */}
      <div className="doc-content py-8">
        {content}
      </div>

      {/* Was this helpful? */}
      <div
        className="mt-8 pt-8 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ borderColor: "#1E2E28" }}
      >
        <p className="font-body text-sm" style={{ color: "#4A6358" }}>
          {t("docs.helpful", lang)}
        </p>

        {helpful === null ? (
          <div className="flex gap-3">
            <button
              onClick={() => setHelpful(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border font-body text-sm transition-colors hover:border-white/20"
              style={{ borderColor: "#1E2E28", color: "rgba(245,250,247,0.6)" }}
            >
              <ThumbsUp size={14} />
              {t("docs.helpful.yes", lang)}
            </button>
            <button
              onClick={() => setHelpful(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border font-body text-sm transition-colors hover:border-white/20"
              style={{ borderColor: "#1E2E28", color: "rgba(245,250,247,0.6)" }}
            >
              <ThumbsDown size={14} />
              {t("docs.helpful.no", lang)}
            </button>
          </div>
        ) : (
          <p className="font-body text-sm" style={{ color: "#1D9E75" }}>
            {helpful
              ? (lang === "fr" ? "Merci pour votre retour !" : "Thanks for the feedback!")
              : (lang === "fr" ? "Merci ! Nous allons améliorer cela." : "Thanks! We'll improve this.")}
          </p>
        )}
      </div>

      {/* Prev / Next navigation */}
      {(prev ?? next) && (
        <div
          className="mt-8 pt-8 border-t grid grid-cols-1 sm:grid-cols-2 gap-4"
          style={{ borderColor: "#1E2E28" }}
        >
          {prev ? (
            <Link
              href={`/docs/${prev.slug}`}
              className="flex flex-col gap-1 rounded-xl border p-4 transition-colors hover:border-white/20 group"
              style={{ backgroundColor: "#111915", borderColor: "#1E2E28" }}
            >
              <span className="font-mono text-xs" style={{ color: "#4A6358" }}>
                ← {lang === "fr" ? "Précédent" : "Previous"}
              </span>
              <span
                className="font-body font-medium text-sm group-hover:text-off-white transition-colors"
                style={{ color: "rgba(245,250,247,0.7)" }}
              >
                {lang === "fr" ? prev.titleFr : prev.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {next && (
            <Link
              href={`/docs/${next.slug}`}
              className="flex flex-col gap-1 rounded-xl border p-4 transition-colors hover:border-white/20 group sm:text-right"
              style={{ backgroundColor: "#111915", borderColor: "#1E2E28" }}
            >
              <span className="font-mono text-xs" style={{ color: "#4A6358" }}>
                {lang === "fr" ? "Suivant" : "Next"} →
              </span>
              <span
                className="font-body font-medium text-sm group-hover:text-off-white transition-colors"
                style={{ color: "rgba(245,250,247,0.7)" }}
              >
                {lang === "fr" ? next.titleFr : next.title}
              </span>
            </Link>
          )}
        </div>
      )}
    </motion.article>
  );
}
