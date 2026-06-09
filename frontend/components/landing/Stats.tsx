"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { Users, Globe, DollarSign, Languages } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";

interface StatItemProps {
  icon: React.ElementType;
  valueKey: string;
  labelKey: string;
  countTo: number;
  prefix?: string;
  suffix?: string;
  lang: "en" | "fr";
  inView: boolean;
  delay: number;
}

function StatItem({
  icon: Icon,
  valueKey,
  labelKey,
  countTo,
  prefix = "",
  suffix = "",
  lang,
  inView,
  delay,
}: StatItemProps) {
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionVal, countTo, {
      duration: 2,
      delay,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [inView, motionVal, countTo, delay]);

  // For the "< $0.01" stat, use the translated value directly
  const isSpecialValue = t(valueKey, lang).includes("<") || t(valueKey, lang).includes("0,");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6 }}
      className="flex flex-col items-center text-center gap-3"
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center"
        style={{ backgroundColor: "rgba(15,110,86,0.15)" }}
      >
        <Icon size={22} style={{ color: "#1D9E75" }} />
      </div>

      <div>
        <p className="font-heading font-semibold text-4xl sm:text-5xl" style={{ color: "#F5FAF7" }}>
          {isSpecialValue ? t(valueKey, lang) : `${prefix}${display}${suffix}`}
        </p>
        <p className="font-body text-sm mt-2 max-w-[160px] mx-auto" style={{ color: "#4A6358" }}>
          {t(labelKey, lang)}
        </p>
      </div>
    </motion.div>
  );
}

const STATS = [
  {
    icon: Users,
    valueKey: "stats.learners.value",
    labelKey: "stats.learners.label",
    countTo: 2400,
    suffix: "+",
  },
  {
    icon: Globe,
    valueKey: "stats.countries.value",
    labelKey: "stats.countries.label",
    countTo: 6,
  },
  {
    icon: DollarSign,
    valueKey: "stats.cost.value",
    labelKey: "stats.cost.label",
    countTo: 0,
  },
  {
    icon: Languages,
    valueKey: "stats.langs.value",
    labelKey: "stats.langs.label",
    countTo: 3,
  },
] as const;

export function Stats() {
  const { lang } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-24 md:py-32"
      style={{ backgroundColor: "#111915" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-heading font-semibold text-center text-2xl sm:text-3xl mb-16"
          style={{ color: "rgba(245,250,247,0.5)" }}
        >
          {t("stats.headline", lang)}
        </motion.h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {STATS.map((stat, i) => (
            <StatItem
              key={stat.valueKey}
              {...stat}
              lang={lang}
              inView={inView}
              delay={0.1 + i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
