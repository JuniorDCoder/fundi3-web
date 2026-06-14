"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { sidebarNav } from "@/lib/docs/content";

export default function DocsIndexPage() {
  const { lang } = useLanguage();

  return (
    <div className="space-y-12 pt-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4 pb-8 border-b"
        style={{ borderColor: "#1E2E28" }}
      >
        <h1 className="font-heading font-semibold text-4xl" style={{ color: "#F5FAF7" }}>
          {lang === "fr" ? "Documentation" : "Documentation"}
        </h1>
        <p className="font-body text-lg leading-relaxed max-w-2xl" style={{ color: "#4A6358" }}>
          {lang === "fr"
            ? "Tout ce dont tu as besoin pour apprendre le Web3 et utiliser la plateforme Fundi3."
            : "Everything you need to learn Web3 and use the Fundi3 platform."}
        </p>

        {/* Start here CTA */}
        <Link
          href="/docs/what-is-fundi3"
          className="inline-flex items-center gap-2 font-body font-medium text-sm transition-colors hover:text-primary mt-2"
          style={{ color: "#0F6E56" }}
        >
          <BookOpen size={15} />
          {lang === "fr" ? "Commencer : Qu'est-ce que Fundi3 ?" : "Start here: What is Fundi3?"}
          <ArrowRight size={14} />
        </Link>
      </motion.div>

      {/* Section cards */}
      <div className="space-y-10">
        {sidebarNav.map((section, si) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: si * 0.08, duration: 0.5 }}
          >
            <h2
              className="font-heading font-semibold text-lg mb-4"
              style={{ color: "#F5FAF7" }}
            >
              {lang === "fr" ? section.titleFr : section.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {section.items.map((item) => (
                item.available ? (
                  <Link
                    key={item.slug}
                    href={`/docs/${item.slug}`}
                    className="flex items-center justify-between rounded-xl border px-4 py-3 group transition-colors hover:border-white/20"
                    style={{ backgroundColor: "#111915", borderColor: "#1E2E28" }}
                  >
                    <span
                      className="font-body text-sm group-hover:text-off-white transition-colors"
                      style={{ color: "rgba(245,250,247,0.7)" }}
                    >
                      {lang === "fr" ? item.labelFr : item.label}
                    </span>
                    <ArrowRight size={14} style={{ color: "#4A6358" }} className="group-hover:text-primary transition-colors" />
                  </Link>
                ) : (
                  <div
                    key={item.slug}
                    className="flex items-center justify-between rounded-xl border px-4 py-3 cursor-default"
                    style={{ backgroundColor: "#111915", borderColor: "#1E2E28" }}
                  >
                    <span className="font-body text-sm" style={{ color: "rgba(245,250,247,0.25)" }}>
                      {lang === "fr" ? item.labelFr : item.label}
                    </span>
                    <span className="font-mono text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "#1E2E28", color: "#4A6358" }}>
                      {lang === "fr" ? "Bientôt" : "Soon"}
                    </span>
                  </div>
                )
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
