"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AlertTriangle, Globe, MapPin } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";

const CARDS = [
  {
    icon: AlertTriangle,
    titleKey: "problem.card1.title",
    descKey: "problem.card1.desc",
  },
  {
    icon: Globe,
    titleKey: "problem.card2.title",
    descKey: "problem.card2.desc",
  },
  {
    icon: MapPin,
    titleKey: "problem.card3.title",
    descKey: "problem.card3.desc",
  },
] as const;

export function Problem() {
  const { lang } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 relative"
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
            style={{ color: "#EF9F27" }}
          >
            {t("problem.label", lang)}
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
          {t("problem.headline", lang)}
        </motion.h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CARDS.map(({ icon: Icon, titleKey, descKey }, i) => (
            <motion.div
              key={titleKey}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
              className="relative rounded-2xl p-6 border overflow-hidden group"
              style={{
                backgroundColor: "rgba(255,80,50,0.04)",
                borderColor: "rgba(255,80,50,0.12)",
              }}
            >
              {/* Subtle red glow top-right */}
              <div
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-30 transition-opacity group-hover:opacity-50"
                style={{ backgroundColor: "#ff5032" }}
              />

              <div className="relative">
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: "rgba(255,80,50,0.1)" }}
                >
                  <Icon size={20} style={{ color: "#ff6b4a" }} />
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
