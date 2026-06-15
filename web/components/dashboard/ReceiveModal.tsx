"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, QrCode, X } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";

interface ReceiveModalProps {
  open: boolean;
  onClose: () => void;
  address: string;
  qrDataUrl: string | null;
}

export function ReceiveModal({ open, onClose, address, qrDataUrl }: ReceiveModalProps) {
  const { lang } = useLanguage();
  const [copied, setCopied] = useState(false);

  function handleClose() {
    setCopied(false);
    onClose();
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — no-op
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(10,15,14,0.7)" }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl border p-6 space-y-5"
            style={{ backgroundColor: "#111915", borderColor: "#1E2E28" }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(15,110,86,0.15)" }}
                >
                  <QrCode size={18} style={{ color: "#1D9E75" }} />
                </div>
                <h2 className="font-heading font-semibold text-lg" style={{ color: "#F5FAF7" }}>
                  {t("wallet.receiveTitle", lang)}
                </h2>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="text-[#4A6358] hover:text-[#F5FAF7] transition-colors shrink-0"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <p className="font-body text-sm leading-relaxed" style={{ color: "#4A6358" }}>
              {t("wallet.receiveDesc", lang)}
            </p>

            {qrDataUrl && (
              <div className="flex justify-center">
                <div className="rounded-xl p-3" style={{ backgroundColor: "#F5FAF7" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={qrDataUrl} alt={t("wallet.qrLabel", lang)} width={180} height={180} />
                </div>
              </div>
            )}

            <div
              className="rounded-xl border px-4 py-3 font-mono text-xs sm:text-sm break-all text-center"
              style={{ backgroundColor: "#0A0F0E", borderColor: "#1E2E28", color: "#F5FAF7" }}
            >
              {address}
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="w-full inline-flex items-center justify-center gap-1.5 font-body font-medium text-sm px-4 py-2.5 rounded-xl transition-colors"
              style={{ backgroundColor: "rgba(15,110,86,0.15)", color: copied ? "#9FE1CB" : "#1D9E75" }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? t("wallet.copied", lang) : t("wallet.copy", lang)}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
