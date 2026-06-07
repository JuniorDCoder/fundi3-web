"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Languages, Smartphone, Globe } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";

const CARDS = [
  {
    icon: Languages,
    titleKey: "solution.card1.title",
    descKey: "solution.card1.desc",
  },
  {
    icon: Smartphone,
    titleKey: "solution.card2.title",
    descKey: "solution.card2.desc",
  },
  {
    icon: Globe,
    titleKey: "solution.card3.title",
    descKey: "solution.card3.desc",
  },
] as const;

export function Solution() {
  const { lang } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-24 md:py-32"
      style={{ backgroundColor: "#0A0F0E" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span
            className="font-mono text-xs font-medium tracking-widest uppercase"
            style={{ color: "#1D9E75" }}
          >
            {lang === "fr" ? "LA SOLUTION" : "THE SOLUTION"}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="font-heading font-semibold text-3xl sm:text-4xl md:text-5xl max-w-2xl mb-16"
          style={{ color: "#F5FAF7" }}
        >
          {t("solution.headline", lang)}
        </motion.h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CARDS.map(({ icon: Icon, titleKey, descKey }, i) => (
            <motion.div
              key={titleKey}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
              className="relative rounded-2xl p-6 border overflow-hidden group hover:border-white/20 transition-colors"
              style={{
                backgroundColor: "rgba(15,110,86,0.05)",
                borderColor: "rgba(15,110,86,0.2)",
              }}
            >
              {/* Subtle green glow */}
              <div
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-20 transition-opacity group-hover:opacity-40"
                style={{ backgroundColor: "#0F6E56" }}
              />

              <div className="relative">
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: "rgba(15,110,86,0.15)" }}
                >
                  <Icon size={20} style={{ color: "#1D9E75" }} />
                </div>

                {/* Title */}
                <h3 className="font-heading font-semibold text-lg mb-2" style={{ color: "#F5FAF7" }}>
                  {t(titleKey, lang)}
                </h3>

                {/* Description */}
                <p className="font-body text-sm leading-relaxed" style={{ color: "#4A6358" }}>
                  {t(descKey, lang)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
