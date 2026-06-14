"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Check, Copy, Eye, EyeOff, KeyRound, Loader2, X } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";

interface ExportKeyModalProps {
  open: boolean;
  onClose: () => void;
}

export function ExportKeyModal({ open, onClose }: ExportKeyModalProps) {
  const { lang } = useLanguage();

  const [password, setPassword] = useState("");
  const [secretKey, setSecretKey] = useState<string | null>(null);
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleClose() {
    setPassword("");
    setSecretKey(null);
    setShowKey(false);
    setCopied(false);
    setError(null);
    setLoading(false);
    onClose();
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/wallet/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json().catch(() => null);

      if (!res.ok) {
        setError(t("wallet.exportInvalidPassword", lang));
        return;
      }

      setSecretKey(json.secretKey);
    } catch {
      setError(t("wallet.exportInvalidPassword", lang));
    } finally {
      setLoading(false);
    }
  }

  async function handleCopyKey() {
    if (!secretKey) return;
    try {
      await navigator.clipboard.writeText(secretKey);
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
                  style={{ backgroundColor: "rgba(239,159,39,0.12)" }}
                >
                  <KeyRound size={18} style={{ color: "#EF9F27" }} />
                </div>
                <h2 className="font-heading font-semibold text-lg" style={{ color: "#F5FAF7" }}>
                  {secretKey ? t("wallet.exportRevealedTitle", lang) : t("wallet.exportTitle", lang)}
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

            {!secretKey ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="font-body text-sm leading-relaxed" style={{ color: "#4A6358" }}>
                  {t("wallet.exportDesc", lang)}
                </p>

                <div
                  className="flex items-start gap-2 rounded-xl border p-3 text-xs leading-relaxed"
                  style={{ backgroundColor: "rgba(239,68,68,0.06)", borderColor: "rgba(239,68,68,0.2)", color: "#fca5a5" }}
                >
                  <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                  <span>{t("wallet.exportWarning", lang)}</span>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="export-password" className="font-body font-medium text-sm" style={{ color: "#F5FAF7" }}>
                    {t("wallet.exportPasswordLabel", lang)}
                  </label>
                  <input
                    id="export-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoFocus
                    autoComplete="current-password"
                    placeholder={t("wallet.exportPasswordPlaceholder", lang)}
                    className="w-full font-body text-sm px-4 py-2.5 rounded-xl border bg-transparent outline-none transition-colors focus:border-primary"
                    style={{ borderColor: "#1E2E28", color: "#F5FAF7" }}
                  />
                </div>

                {error && (
                  <p className="font-body text-xs" style={{ color: "#fca5a5" }}>
                    {error}
                  </p>
                )}

                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="font-body font-medium text-sm px-4 py-2.5 rounded-xl border transition-colors"
                    style={{ borderColor: "#1E2E28", color: "#4A6358" }}
                  >
                    {t("wallet.exportCancel", lang)}
                  </button>
                  <button
                    type="submit"
                    disabled={loading || password.length === 0}
                    className="flex-1 inline-flex items-center justify-center gap-2 font-body font-medium text-sm px-4 py-2.5 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ backgroundColor: "#0F6E56", color: "#F5FAF7" }}
                  >
                    {loading ? <Loader2 size={15} className="animate-spin" /> : <KeyRound size={15} />}
                    {loading ? t("wallet.exportConfirming", lang) : t("wallet.exportConfirm", lang)}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div
                  className="flex items-start gap-2 rounded-xl border p-3 text-xs leading-relaxed"
                  style={{ backgroundColor: "rgba(239,68,68,0.06)", borderColor: "rgba(239,68,68,0.2)", color: "#fca5a5" }}
                >
                  <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                  <span>{t("wallet.exportRevealedWarning", lang)}</span>
                </div>

                <div
                  className="rounded-xl border p-3 font-mono text-xs break-all"
                  style={{ backgroundColor: "#0A0F0E", borderColor: "#1E2E28", color: "#9FE1CB" }}
                >
                  {showKey ? secretKey : "•".repeat(48)}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowKey((v) => !v)}
                    className="inline-flex items-center gap-1.5 font-body font-medium text-sm px-4 py-2.5 rounded-xl border transition-colors"
                    style={{ borderColor: "#1E2E28", color: "#4A6358" }}
                  >
                    {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
                    {showKey ? t("wallet.hide", lang) : t("wallet.show", lang)}
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyKey}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 font-body font-medium text-sm px-4 py-2.5 rounded-xl transition-colors"
                    style={{ backgroundColor: "rgba(15,110,86,0.15)", color: copied ? "#9FE1CB" : "#1D9E75" }}
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? t("wallet.copied", lang) : t("wallet.copyKey", lang)}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full font-body font-medium text-sm px-4 py-2.5 rounded-xl transition-colors"
                  style={{ backgroundColor: "#0F6E56", color: "#F5FAF7" }}
                >
                  {t("wallet.done", lang)}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
