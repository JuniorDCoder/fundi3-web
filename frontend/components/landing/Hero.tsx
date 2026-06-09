"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Play, CheckCircle } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";

// ─── Course player mockup (desktop right-side decoration) ─────────────────────

function CourseMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
      className="relative w-full max-w-sm xl:max-w-md"
    >
      {/* Glow behind card */}
      <div
        className="absolute -inset-4 rounded-3xl blur-2xl opacity-20"
        style={{ background: "radial-gradient(ellipse, #0F6E56, transparent 70%)" }}
      />

      {/* Card */}
      <div
        className="relative rounded-2xl border overflow-hidden"
        style={{ backgroundColor: "#111915", borderColor: "#1E2E28" }}
      >
        {/* Top bar — lesson title + progress */}
        <div className="px-5 pt-5 pb-4 border-b" style={{ borderColor: "#1E2E28" }}>
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "#1D9E75" }}
            />
            <span className="font-mono text-xs" style={{ color: "#4A6358" }}>
              Lesson 3 / 6
            </span>
          </div>
          <p className="font-heading font-semibold text-sm" style={{ color: "#F5FAF7" }}>
            What is a Block?
          </p>
          {/* Progress bar */}
          <div
            className="mt-3 h-1.5 rounded-full overflow-hidden"
            style={{ backgroundColor: "#1E2E28" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: "#0F6E56" }}
              initial={{ width: "0%" }}
              animate={{ width: "45%" }}
              transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Code block */}
        <div className="px-5 py-4 font-mono text-xs space-y-1" style={{ color: "#4A6358" }}>
          <p><span style={{ color: "#1D9E75" }}>const</span> <span style={{ color: "#F5FAF7" }}>block</span> = {"{"}</p>
          <p className="pl-4"><span style={{ color: "#EF9F27" }}>index</span>: <span style={{ color: "#9FE1CB" }}>3</span>,</p>
          <p className="pl-4"><span style={{ color: "#EF9F27" }}>data</span>: <span style={{ color: "#9FE1CB" }}>"Njangi payment"</span>,</p>
          <p className="pl-4"><span style={{ color: "#EF9F27" }}>hash</span>: <span style={{ color: "#9FE1CB" }}>"0x4a2f…"</span>,</p>
          <p className="pl-4"><span style={{ color: "#EF9F27" }}>prevHash</span>: <span style={{ color: "#9FE1CB" }}>"0x9e1b…"</span></p>
          <p>{"}"}</p>
        </div>

        {/* Badges row */}
        <div className="px-5 pb-5 flex items-center gap-2 flex-wrap">
          {[
            { label: "Blockchain 101", color: "#0F6E5630", text: "#1D9E75" },
            { label: "Free", color: "#EF9F2720", text: "#EF9F27" },
            { label: "Beginner", color: "#1E2E28", text: "#4A6358" },
          ].map(({ label, color, text }) => (
            <span
              key={label}
              className="font-body font-medium text-xs px-2.5 py-1 rounded-full"
              style={{ backgroundColor: color, color: text }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* AI tutor hint */}
        <div
          className="mx-5 mb-5 px-4 py-3 rounded-xl flex items-start gap-3"
          style={{ backgroundColor: "#0F6E5615", borderLeft: "2px solid #0F6E56" }}
        >
          <div
            className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
            style={{ backgroundColor: "#0F6E56" }}
          >
            <span className="text-white font-mono text-xs font-bold">AI</span>
          </div>
          <p className="font-body text-xs leading-relaxed" style={{ color: "#9FE1CB" }}>
            Pense à un bloc comme une page dans le registre du village — tout le monde peut la lire.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Social proof bar ─────────────────────────────────────────────────────────

function SocialProofBar({ lang }: { lang: "en" | "fr" }) {
  return (
    <div
      className="border-t border-b py-5"
      style={{ borderColor: "#1E2E28" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center">
          <p className="font-body text-sm" style={{ color: "#4A6358" }}>
            {t("social.trusted", lang)}
          </p>
          <div className="hidden sm:block h-4 w-px" style={{ backgroundColor: "#1E2E28" }} />
          {[
            t("social.learners", lang),
            t("social.countries", lang),
            t("social.free", lang),
          ].map((stat, i) => (
            <span key={i} className="font-body font-medium text-sm" style={{ color: "rgba(245,250,247,0.6)" }}>
              {stat}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function Hero() {
  const { lang } = useLanguage();

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden" style={{ backgroundColor: "#0A0F0E" }}>

      {/* CSS gradient orbs — green + amber, no JS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20 animate-pulse-slow"
          style={{ background: "radial-gradient(circle, #0F6E56, transparent 65%)" }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full opacity-10 animate-pulse-slow"
          style={{
            background: "radial-gradient(circle, #EF9F27, transparent 65%)",
            animationDelay: "2s",
          }}
        />
      </div>

      {/* SVG grid overlay */}
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-100" />

      {/* Main content */}
      <div className="relative flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left — copy + CTAs */}
            <div className="space-y-8">
              {/* Section label */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span
                  className="inline-flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-full border"
                  style={{ color: "#1D9E75", borderColor: "#1D9E7540", backgroundColor: "#1D9E7510" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                  Web3 · Africa · {lang === "fr" ? "Bilingue" : "Bilingual"}
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="font-heading font-semibold text-5xl sm:text-6xl xl:text-7xl leading-[1.05] tracking-tight"
                style={{ color: "#F5FAF7" }}
              >
                {t("hero.headline", lang)}
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="font-heading font-medium text-xl sm:text-2xl"
                style={{ color: "rgba(245,250,247,0.6)" }}
              >
                {t("hero.subheadline", lang)}
              </motion.p>

              {/* Body */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="font-body text-base sm:text-lg leading-relaxed max-w-lg"
                style={{ color: "#4A6358" }}
              >
                {t("hero.body", lang)}
              </motion.p>

              {/* Trust bullets */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="flex flex-wrap gap-x-6 gap-y-2"
              >
                {[
                  lang === "fr" ? "Aucune carte de crédit" : "No credit card",
                  lang === "fr" ? "Pas de crypto requise" : "No crypto needed",
                  lang === "fr" ? "Gratuit pour commencer" : "Free to start",
                ].map((point) => (
                  <span key={point} className="flex items-center gap-1.5 font-body text-sm" style={{ color: "#4A6358" }}>
                    <CheckCircle size={14} style={{ color: "#0F6E56" }} />
                    {point}
                  </span>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center gap-2 font-heading font-semibold text-base px-7 py-4 rounded-xl transition-opacity hover:opacity-90 active:scale-95"
                  style={{ backgroundColor: "#0F6E56", color: "#F5FAF7" }}
                >
                  {t("hero.cta.primary", lang)}
                  <ArrowRight size={18} />
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 font-heading font-medium text-base px-7 py-4 rounded-xl border transition-colors hover:border-white/20"
                  style={{ borderColor: "#1E2E28", color: "rgba(245,250,247,0.7)" }}
                >
                  <Play size={15} />
                  {t("hero.cta.secondary", lang)}
                </a>
              </motion.div>
            </div>

            {/* Right — course player mockup (desktop only) */}
            <div className="hidden lg:flex items-center justify-center">
              <CourseMockup />
            </div>
          </div>
        </div>
      </div>

      {/* Social proof bar */}
      <SocialProofBar lang={lang} />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="font-mono text-xs" style={{ color: "#4A6358" }}>
          {t("hero.scroll", lang)}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} style={{ color: "#4A6358" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
