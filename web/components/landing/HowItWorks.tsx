"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { UserPlus, GitBranch, Code2, GraduationCap } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";

const STEPS = [
  { icon: UserPlus,       titleKey: "how.step1.title", descKey: "how.step1.desc" },
  { icon: GitBranch,      titleKey: "how.step2.title", descKey: "how.step2.desc" },
  { icon: Code2,          titleKey: "how.step3.title", descKey: "how.step3.desc" },
  { icon: GraduationCap,  titleKey: "how.step4.title", descKey: "how.step4.desc" },
] as const;

export function HowItWorks() {
  const { lang } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="py-24 md:py-32"
      style={{ backgroundColor: "#111915" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-heading font-semibold text-3xl sm:text-4xl md:text-5xl"
            style={{ color: "#F5FAF7" }}
          >
            {t("how.headline", lang)}
          </motion.h2>
        </div>

        {/* Steps — horizontal timeline desktop, vertical mobile */}
        <div className="relative">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px" style={{ backgroundColor: "#1E2E28" }}>
            <motion.div
              className="h-full origin-left"
              style={{ backgroundColor: "#0F6E56" }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            {STEPS.map(({ icon: Icon, titleKey, descKey }, i) => (
              <motion.div
                key={titleKey}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.6 }}
                className="relative flex md:flex-col gap-6 md:gap-4"
              >
                {/* Vertical connector (mobile only) */}
                {i < STEPS.length - 1 && (
                  <div
                    className="md:hidden absolute left-5 top-12 w-px h-full"
                    style={{ backgroundColor: "#1E2E28" }}
                  />
                )}

                {/* Step circle */}
                <div className="flex-shrink-0 relative z-10">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center border-2"
                    style={{ backgroundColor: "#111915", borderColor: "#0F6E56" }}
                  >
                    <Icon size={18} style={{ color: "#0F6E56" }} />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2 pb-8 md:pb-0 md:pt-6">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-medium" style={{ color: "#0F6E56" }}>
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-heading font-semibold text-base" style={{ color: "#F5FAF7" }}>
                    {t(titleKey, lang)}
                  </h3>
                  <p className="font-body text-sm leading-relaxed" style={{ color: "#4A6358" }}>
                    {t(descKey, lang)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
