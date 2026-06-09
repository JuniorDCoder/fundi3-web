"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";

const TESTIMONIALS = [
  {
    quoteKey: "testimonials.1.quote",
    nameKey: "testimonials.1.name",
    metaKey: "testimonials.1.meta",
    initials: "AK",
    color: "#0F6E56",
  },
  {
    quoteKey: "testimonials.2.quote",
    nameKey: "testimonials.2.name",
    metaKey: "testimonials.2.meta",
    initials: "DM",
    color: "#1D9E75",
  },
  {
    quoteKey: "testimonials.3.quote",
    nameKey: "testimonials.3.name",
    metaKey: "testimonials.3.meta",
    initials: "FS",
    color: "#085041",
  },
] as const;

export function Testimonials() {
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

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-heading font-semibold text-3xl sm:text-4xl text-center mb-16"
          style={{ color: "#F5FAF7" }}
        >
          {t("testimonials.headline", lang)}
        </motion.h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ quoteKey, nameKey, metaKey, initials, color }, i) => (
            <motion.div
              key={quoteKey}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.12, duration: 0.6 }}
              className="glass-card p-6 flex flex-col gap-5"
            >
              {/* Large opening quote mark */}
              <span
                className="font-heading text-5xl leading-none select-none"
                style={{ color: "#1E2E28" }}
                aria-hidden="true"
              >
                &ldquo;
              </span>

              {/* Quote */}
              <p
                className="font-body text-base leading-relaxed -mt-4 flex-1"
                style={{ color: "rgba(245,250,247,0.8)" }}
              >
                {t(quoteKey, lang)}
              </p>

              {/* Attribution */}
              <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: "#1E2E28" }}>
                {/* Avatar */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: color }}
                >
                  <span className="font-heading font-semibold text-xs text-white">
                    {initials}
                  </span>
                </div>
                <div>
                  <p className="font-heading font-semibold text-sm" style={{ color: "#F5FAF7" }}>
                    {t(nameKey, lang)}
                  </p>
                  <p className="font-mono text-xs" style={{ color: "#4A6358" }}>
                    {t(metaKey, lang)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
