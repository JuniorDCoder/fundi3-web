"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Users, Eye, Star, Code2, BookOpen, GraduationCap,
  Globe, Smartphone, Target, ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";

export default function AboutPage() {
  const { lang } = useLanguage();
  return (
    <div style={{ backgroundColor: "#0A0F0E", color: "#F5FAF7" }}>
      <HeroSection lang={lang} />
      <MissionSection lang={lang} />
      <ProblemStatSection lang={lang} />
      <TeamSection lang={lang} />
      <ValuesSection lang={lang} />
    </div>
  );
}

// ─── Fade-in wrapper ──────────────────────────────────────────────────────────

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection({ lang }: { lang: "en" | "fr" }) {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      <div
        className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #0F6E56, transparent 65%)" }}
      />
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <span
            className="inline-block font-mono text-xs tracking-widest uppercase"
            style={{ color: "#1D9E75" }}
          >
            {lang === "fr" ? "Notre histoire" : "Our story"}
          </span>

          <h1 className="font-heading font-semibold text-4xl sm:text-5xl md:text-6xl leading-tight">
            {t("about.headline", lang)}
          </h1>

          <p className="font-body text-xl leading-relaxed max-w-2xl" style={{ color: "#4A6358" }}>
            {t("about.subheadline", lang)}
          </p>

          <div
            className="rounded-2xl border p-8 space-y-4 max-w-3xl"
            style={{ backgroundColor: "#111915", borderColor: "#1E2E28" }}
          >
            <div
              className="w-8 h-1 rounded-full"
              style={{ backgroundColor: "#0F6E56" }}
            />
            <p className="font-body text-base leading-relaxed" style={{ color: "rgba(245,250,247,0.8)" }}>
              {t("about.story", lang)}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Mission pillars ──────────────────────────────────────────────────────────

const PILLARS = [
  { icon: Globe,      titleKey: "about.pillar1.title", descKey: "about.pillar1.desc" },
  { icon: Smartphone, titleKey: "about.pillar2.title", descKey: "about.pillar2.desc" },
  { icon: Target,     titleKey: "about.pillar3.title", descKey: "about.pillar3.desc" },
] as const;

function MissionSection({ lang }: { lang: "en" | "fr" }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-24" style={{ backgroundColor: "#111915" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-14">
          <h2 className="font-heading font-semibold text-3xl sm:text-4xl">
            {lang === "fr" ? "Notre mission" : "Our mission"}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map(({ icon: Icon, titleKey, descKey }, i) => (
            <motion.div
              key={titleKey}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
              className="rounded-2xl border p-6 space-y-4 hover:border-white/20 transition-colors"
              style={{ backgroundColor: "#0A0F0E", borderColor: "#1E2E28" }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "rgba(15,110,86,0.15)" }}
              >
                <Icon size={20} style={{ color: "#1D9E75" }} />
              </div>
              <h3 className="font-heading font-semibold text-lg">
                {t(titleKey, lang)}
              </h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: "#4A6358" }}>
                {t(descKey, lang)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Problem stat ─────────────────────────────────────────────────────────────

function ProblemStatSection({ lang }: { lang: "en" | "fr" }) {
  return (
    <section className="py-24" style={{ backgroundColor: "#0A0F0E" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div
            className="rounded-2xl border p-8 md:p-12 space-y-6"
            style={{
              backgroundColor: "rgba(15,110,86,0.04)",
              borderColor: "rgba(15,110,86,0.2)",
            }}
          >
            <span
              className="font-mono text-xs tracking-widest uppercase"
              style={{ color: "#EF9F27" }}
            >
              {lang === "fr" ? "Le problème qu'on résout" : "The problem we solve"}
            </span>

            <p
              className="font-heading font-semibold text-2xl sm:text-3xl leading-snug"
              style={{ color: "#F5FAF7" }}
            >
              {lang === "fr"
                ? "L'Afrique subsaharienne est le troisième marché crypto à la plus forte croissance dans le monde — pourtant, il n'existe presque aucune infrastructure locale d'éducation Web3."
                : "Sub-Saharan Africa is the world's third fastest-growing crypto market — yet has almost no local Web3 education infrastructure."}
            </p>

            <p className="font-body text-base leading-relaxed" style={{ color: "#4A6358" }}>
              {lang === "fr"
                ? "Des millions de francophones africains veulent apprendre. Les outils pour les enseigner n'existent tout simplement pas encore — pas dans leur langue, pas avec leurs exemples, pas adaptés à leurs réalités. C'est l'écart que Fundi3 comble."
                : "Millions of African learners want to participate. The tools to teach them simply don't exist yet — not in their language, not with their examples, not adapted to their realities. That's the gap Fundi3 fills."}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t" style={{ borderColor: "#1E2E28" }}>
              {[
                { value: "~600M", label: lang === "fr" ? "Francophones en Afrique" : "French speakers in Africa" },
                { value: "#3", label: lang === "fr" ? "Marché crypto croissant" : "Fastest-growing crypto market" },
                { value: "<1%", label: lang === "fr" ? "Accès à l'éducation Web3" : "Have access to Web3 education" },
                { value: "2025", label: lang === "fr" ? "Notre objectif : 10 000 apprenants" : "Goal: 10,000 learners" },
              ].map(({ value, label }) => (
                <div key={label} className="space-y-1">
                  <p className="font-heading font-semibold text-2xl" style={{ color: "#1D9E75" }}>
                    {value}
                  </p>
                  <p className="font-body text-xs leading-snug" style={{ color: "#4A6358" }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Team ─────────────────────────────────────────────────────────────────────

function TeamSection({ lang }: { lang: "en" | "fr" }) {
  return (
    <section className="py-24" style={{ backgroundColor: "#111915" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-12">
          <h2 className="font-heading font-semibold text-3xl sm:text-4xl">
            {t("about.team.headline", lang)}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          {/* Founder card */}
          <FadeIn delay={0.1}>
            <div
              className="rounded-2xl border p-6 space-y-4"
              style={{ backgroundColor: "#0A0F0E", borderColor: "#1E2E28" }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center font-heading font-semibold text-lg"
                  style={{ backgroundColor: "#0F6E56", color: "#F5FAF7" }}
                >
                  F3
                </div>
                <div>
                  <p className="font-heading font-semibold" style={{ color: "#F5FAF7" }}>
                    {lang === "fr" ? "Fondateur" : "Founder"}
                  </p>
                  <p className="font-mono text-xs" style={{ color: "#4A6358" }}>
                    Founder &amp; CEO · 🇨🇲 Cameroon
                  </p>
                </div>
              </div>
              <p className="font-body text-sm leading-relaxed" style={{ color: "#4A6358" }}>
                {lang === "fr"
                  ? "Passionné de technologie blockchain depuis 2020. A vécu la frustration d'apprendre le Web3 sans ressources en français. A construit Fundi3 pour que personne d'autre n'ait à traverser ça."
                  : "Passionate about blockchain technology since 2020. Experienced the frustration of learning Web3 without French resources firsthand. Built Fundi3 so nobody else has to go through that."}
              </p>
            </div>
          </FadeIn>

          {/* We're hiring card */}
          <FadeIn delay={0.15}>
            <div
              className="rounded-2xl border p-6 space-y-4 flex flex-col"
              style={{
                backgroundColor: "rgba(15,110,86,0.04)",
                borderColor: "rgba(15,110,86,0.2)",
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "rgba(15,110,86,0.15)" }}
              >
                <Users size={20} style={{ color: "#1D9E75" }} />
              </div>
              <div className="flex-1 space-y-2">
                <p className="font-heading font-semibold" style={{ color: "#F5FAF7" }}>
                  {t("about.hiring", lang)}
                </p>
                <p className="font-body text-sm leading-relaxed" style={{ color: "#4A6358" }}>
                  {t("about.hiring.desc", lang)}
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-body font-medium text-sm transition-colors hover:text-primary"
                style={{ color: "#0F6E56" }}
              >
                {lang === "fr" ? "Nous contacter" : "Get in touch"}
                <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Values ───────────────────────────────────────────────────────────────────

const VALUES = [
  { icon: Users,       key: "about.value1" },
  { icon: Eye,         key: "about.value2" },
  { icon: Star,        key: "about.value3" },
  { icon: Code2,       key: "about.value4" },
  { icon: BookOpen,    key: "about.value5" },
  { icon: GraduationCap, key: "about.value6" },
] as const;

function ValuesSection({ lang }: { lang: "en" | "fr" }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-24" style={{ backgroundColor: "#0A0F0E" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-12">
          <h2 className="font-heading font-semibold text-3xl sm:text-4xl">
            {t("about.values.headline", lang)}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {VALUES.map(({ icon: Icon, key }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.05 + i * 0.06, duration: 0.5 }}
              className="rounded-xl border p-4 flex items-center gap-3 hover:border-white/20 transition-colors"
              style={{ backgroundColor: "#111915", borderColor: "#1E2E28" }}
            >
              <Icon size={18} style={{ color: "#4A6358" }} />
              <span className="font-body font-medium text-sm" style={{ color: "rgba(245,250,247,0.7)" }}>
                {t(key, lang)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
