"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Zap,
  ArrowLeftRight,
  Award,
  ArrowRight,
  Wallet,
  Send,
  QrCode,
  ArrowDownLeft,
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";

const POINTS = [
  { icon: Zap, titleKey: "walletPreview.point1Title", descKey: "walletPreview.point1Body" },
  { icon: ArrowLeftRight, titleKey: "walletPreview.point2Title", descKey: "walletPreview.point2Body" },
  { icon: Award, titleKey: "walletPreview.point3Title", descKey: "walletPreview.point3Body" },
] as const;

const MOCK_ADDRESS = "7xKXtg2CW87d97TXJSDpbD5jBkheTqA8sa3RuJosgAsU";

function truncate(address: string) {
  return `${address.slice(0, 4)}…${address.slice(-4)}`;
}

// ─── Wallet mockup card ─────────────────────────────────────────────────────

function WalletMockup({ lang }: { lang: "en" | "fr" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative w-full max-w-sm"
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
        {/* Header */}
        <div className="px-5 pt-5 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#0F6E5625" }}
            >
              <Wallet size={15} style={{ color: "#1D9E75" }} />
            </div>
            <span className="font-mono text-xs" style={{ color: "#4A6358" }}>
              {t("walletPreview.previewLabel", lang)}
            </span>
          </div>
          <span
            className="inline-flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-1 rounded-full"
            style={{ color: "#EF9F27", backgroundColor: "#EF9F2715" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#EF9F27" }} />
            Devnet
          </span>
        </div>

        {/* Address */}
        <div className="px-5 pb-4">
          <p className="font-mono text-[11px] mb-1.5" style={{ color: "#4A6358" }}>
            {t("walletPreview.previewAddress", lang)}
          </p>
          <div
            className="rounded-xl border px-3.5 py-2.5"
            style={{ borderColor: "#1E2E28", backgroundColor: "#0A0F0E" }}
          >
            <p className="font-mono text-xs" style={{ color: "#F5FAF7" }}>
              {truncate(MOCK_ADDRESS)}
            </p>
          </div>
        </div>

        {/* Balance + actions */}
        <div className="px-5 pb-4">
          <p className="font-mono text-[11px] mb-1" style={{ color: "#4A6358" }}>
            {lang === "fr" ? "Solde" : "Balance"}
          </p>
          <p className="font-heading font-semibold text-3xl mb-4" style={{ color: "#F5FAF7" }}>
            2.4500 <span className="font-body font-medium text-sm" style={{ color: "#4A6358" }}>SOL</span>
          </p>
          <div className="flex gap-2.5">
            <div
              className="flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 font-body font-medium text-sm"
              style={{ backgroundColor: "#0F6E56", color: "#F5FAF7" }}
            >
              <Send size={14} />
              {lang === "fr" ? "Envoyer" : "Send"}
            </div>
            <div
              className="flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 font-body font-medium text-sm border"
              style={{ borderColor: "#1E2E28", color: "#F5FAF7" }}
            >
              <QrCode size={14} />
              {lang === "fr" ? "Recevoir" : "Receive"}
            </div>
          </div>
        </div>

        {/* Recent activity */}
        <div className="px-5 pb-5 pt-1 border-t" style={{ borderColor: "#1E2E28" }}>
          <p className="font-mono text-[11px] mb-3 mt-4" style={{ color: "#4A6358" }}>
            {t("walletPreview.previewActivityTitle", lang)}
          </p>
          <div className="space-y-2.5">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#EF9F2715" }}
              >
                <Award size={14} style={{ color: "#EF9F27" }} />
              </div>
              <p className="font-body text-sm flex-1" style={{ color: "#F5FAF7" }}>
                {t("walletPreview.previewActivity1", lang)}
              </p>
              <span className="font-mono text-xs" style={{ color: "#4A6358" }}>NFT</span>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#0F6E5625" }}
              >
                <ArrowDownLeft size={14} style={{ color: "#1D9E75" }} />
              </div>
              <p className="font-body text-sm flex-1" style={{ color: "#F5FAF7" }}>
                {t("walletPreview.previewActivity2", lang)}
              </p>
              <span className="font-mono text-xs" style={{ color: "#1D9E75" }}>+1.00 SOL</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function WalletPreview() {
  const { lang } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 md:py-32" style={{ backgroundColor: "#0A0F0E" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — copy */}
          <div>
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
                {t("walletPreview.label", lang)}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="font-heading font-semibold text-3xl sm:text-4xl md:text-5xl mb-6"
              style={{ color: "#F5FAF7" }}
            >
              {t("walletPreview.headline", lang)}
            </motion.h2>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="font-body text-base sm:text-lg leading-relaxed mb-10 max-w-xl"
              style={{ color: "#4A6358" }}
            >
              {t("walletPreview.body", lang)}
            </motion.p>

            {/* Feature points */}
            <div className="space-y-6 mb-10">
              {POINTS.map(({ icon: Icon, titleKey, descKey }, i) => (
                <motion.div
                  key={titleKey}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="flex gap-4"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(15,110,86,0.15)" }}
                  >
                    <Icon size={18} style={{ color: "#1D9E75" }} />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-base mb-1" style={{ color: "#F5FAF7" }}>
                      {t(titleKey, lang)}
                    </h3>
                    <p className="font-body text-sm leading-relaxed" style={{ color: "#4A6358" }}>
                      {t(descKey, lang)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center gap-2 font-heading font-semibold text-base px-7 py-4 rounded-xl transition-opacity hover:opacity-90 active:scale-95"
                style={{ backgroundColor: "#0F6E56", color: "#F5FAF7" }}
              >
                {t("walletPreview.cta", lang)}
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>

          {/* Right — wallet mockup */}
          <div className="flex items-center justify-center">
            <WalletMockup lang={lang} />
          </div>
        </div>
      </div>
    </section>
  );
}
