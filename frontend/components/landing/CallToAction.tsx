"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";

export function CallToAction() {
  const { lang } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "#0F6E56" }}
    >
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #1D9E75, transparent 65%)" }}
        />
        <div
          className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #04342C, transparent 65%)" }}
        />
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid opacity-30" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-heading font-semibold text-4xl sm:text-5xl md:text-6xl leading-tight"
          style={{ color: "#F5FAF7" }}
        >
          {t("cta.headline", lang)}
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="font-body text-lg"
          style={{ color: "rgba(245,250,247,0.75)" }}
        >
          {t("cta.subtext", lang)}
        </motion.p>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-3 font-heading font-semibold text-lg px-8 py-5 rounded-2xl transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: "#F5FAF7", color: "#0F6E56" }}
          >
            {t("cta.button", lang)}
            <ArrowRight size={20} />
          </Link>
        </motion.div>

        {/* Trust note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="font-mono text-xs"
          style={{ color: "rgba(245,250,247,0.45)" }}
        >
          {lang === "fr"
            ? "Aucune carte de crédit · Pas de crypto · Commence en 30 secondes"
            : "No credit card · No crypto · Start in 30 seconds"}
        </motion.p>
      </div>
    </section>
  );
}
