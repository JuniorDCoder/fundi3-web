"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Users,
  Eye,
  Star,
  Code2,
  BookOpen,
  GraduationCap,
  Globe,
  Smartphone,
  Target,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";

// ─── Social icons (inline SVG — lucide-react v1.x doesn't ship these) ────────

function GitHubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM3.558 20.452h3.56V9h-3.56v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
    </svg>
  );
}

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
        style={{
          background: "radial-gradient(circle, #0F6E56, transparent 65%)",
        }}
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

          <p
            className="font-body text-xl leading-relaxed max-w-2xl"
            style={{ color: "#4A6358" }}
          >
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
            <p
              className="font-body text-base leading-relaxed"
              style={{ color: "rgba(245,250,247,0.8)" }}
            >
              {t("about.story", lang)}
            </p>
            <p
              className="font-mono text-xs tracking-wide"
              style={{ color: "#1D9E75" }}
            >
              {t("about.story.attribution", lang)}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Mission pillars ──────────────────────────────────────────────────────────

const PILLARS = [
  {
    icon: Globe,
    titleKey: "about.pillar1.title",
    descKey: "about.pillar1.desc",
  },
  {
    icon: Smartphone,
    titleKey: "about.pillar2.title",
    descKey: "about.pillar2.desc",
  },
  {
    icon: Target,
    titleKey: "about.pillar3.title",
    descKey: "about.pillar3.desc",
  },
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
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: "#4A6358" }}
              >
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
              {lang === "fr"
                ? "Le problème qu'on résout"
                : "The problem we solve"}
            </span>

            <p
              className="font-heading font-semibold text-2xl sm:text-3xl leading-snug"
              style={{ color: "#F5FAF7" }}
            >
              {lang === "fr"
                ? "L'Afrique subsaharienne est le troisième marché crypto à la plus forte croissance dans le monde — pourtant, il n'existe presque aucune infrastructure locale d'éducation Web3."
                : "Sub-Saharan Africa is the world's third fastest-growing crypto market — yet has almost no local Web3 education infrastructure."}
            </p>

            <p
              className="font-body text-base leading-relaxed"
              style={{ color: "#4A6358" }}
            >
              {lang === "fr"
                ? "Des millions de francophones africains veulent apprendre. Les outils pour les enseigner n'existent tout simplement pas encore — pas dans leur langue, pas avec leurs exemples, pas adaptés à leurs réalités. C'est l'écart que Fundi3 comble."
                : "Millions of African learners want to participate. The tools to teach them simply don't exist yet — not in their language, not with their examples, not adapted to their realities. That's the gap Fundi3 fills."}
            </p>

            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t"
              style={{ borderColor: "#1E2E28" }}
            >
              {[
                {
                  value: "~600M",
                  label:
                    lang === "fr"
                      ? "Francophones en Afrique"
                      : "French speakers in Africa",
                },
                {
                  value: "#3",
                  label:
                    lang === "fr"
                      ? "Marché crypto croissant"
                      : "Fastest-growing crypto market",
                },
                {
                  value: "<1%",
                  label:
                    lang === "fr"
                      ? "Accès à l'éducation Web3"
                      : "Have access to Web3 education",
                },
                {
                  value: "2025",
                  label:
                    lang === "fr"
                      ? "Notre objectif : 10 000 apprenants"
                      : "Goal: 10,000 learners",
                },
              ].map(({ value, label }) => (
                <div key={label} className="space-y-1">
                  <p
                    className="font-heading font-semibold text-2xl"
                    style={{ color: "#1D9E75" }}
                  >
                    {value}
                  </p>
                  <p
                    className="font-body text-xs leading-snug"
                    style={{ color: "#4A6358" }}
                  >
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
                  FJ
                </div>
                <div>
                  <p
                    className="font-heading font-semibold"
                    style={{ color: "#F5FAF7" }}
                  >
                    Foryoung Junior Ngu
                  </p>
                  <p className="font-mono text-xs" style={{ color: "#4A6358" }}>
                    {t("about.founder.title", lang)}
                  </p>
                </div>
              </div>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: "#4A6358" }}
              >
                {t("about.founder.bio", lang)}
              </p>
              <div className="flex items-center gap-3 pt-1">
                <a
                  href="https://github.com/JuniorDCoder"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="w-8 h-8 rounded-lg border flex items-center justify-center transition-colors hover:border-white/20"
                  style={{ borderColor: "#1E2E28", color: "#4A6358" }}
                >
                  <GitHubIcon size={14} />
                </a>
                <a
                  href="https://linkedin.com/in/juniordcoder"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-lg border flex items-center justify-center transition-colors hover:border-white/20"
                  style={{ borderColor: "#1E2E28", color: "#4A6358" }}
                >
                  <LinkedInIcon size={14} />
                </a>
              </div>
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
                <p
                  className="font-heading font-semibold"
                  style={{ color: "#F5FAF7" }}
                >
                  {t("about.hiring", lang)}
                </p>
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: "#4A6358" }}
                >
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
  { icon: Users, key: "about.value1" },
  { icon: Eye, key: "about.value2" },
  { icon: Star, key: "about.value3" },
  { icon: Code2, key: "about.value4" },
  { icon: BookOpen, key: "about.value5" },
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
              <span
                className="font-body font-medium text-sm"
                style={{ color: "rgba(245,250,247,0.7)" }}
              >
                {t(key, lang)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
