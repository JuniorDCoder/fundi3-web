"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Check, ExternalLink, Loader2, Send as SendIcon, X } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";

interface SendModalProps {
  open: boolean;
  onClose: () => void;
  availableSol: number | null;
  onSuccess: () => void;
}

interface SendResult {
  signature: string;
  explorerUrl: string;
}

// Reserve a little extra above the requested amount to cover the network fee.
const FEE_BUFFER_SOL = 0.00001;

const ERROR_KEYS: Record<string, string> = {
  invalid_recipient: "wallet.sendErrorInvalidRecipient",
  invalid_amount: "wallet.sendErrorInvalidAmount",
  insufficient_balance: "wallet.sendErrorInsufficientBalance",
  self_transfer: "wallet.sendErrorSelfTransfer",
  invalid_password: "wallet.sendErrorInvalidPassword",
};

export function SendModal({ open, onClose, availableSol, onSuccess }: SendModalProps) {
  const { lang } = useLanguage();

  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SendResult | null>(null);

  function handleClose() {
    setRecipient("");
    setAmount("");
    setPassword("");
    setError(null);
    setLoading(false);
    setResult(null);
    onClose();
  }

  function handleSendAnother() {
    setRecipient("");
    setAmount("");
    setPassword("");
    setError(null);
    setResult(null);
  }

  function handleMax() {
    if (availableSol === null) return;
    const max = Math.max(availableSol - FEE_BUFFER_SOL, 0);
    setAmount(max.toString());
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const amountSol = parseFloat(amount);
    if (!recipient.trim()) {
      setError(t("wallet.sendErrorInvalidRecipient", lang));
      return;
    }
    if (!Number.isFinite(amountSol) || amountSol <= 0) {
      setError(t("wallet.sendErrorInvalidAmount", lang));
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/wallet/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, recipient: recipient.trim(), amountSol }),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(t(ERROR_KEYS[json.error] ?? "wallet.sendErrorGeneric", lang));
        return;
      }

      setResult(json);
      onSuccess();
    } catch {
      setError(t("wallet.sendErrorGeneric", lang));
    } finally {
      setLoading(false);
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
                  <SendIcon size={18} style={{ color: "#1D9E75" }} />
                </div>
                <h2 className="font-heading font-semibold text-lg" style={{ color: "#F5FAF7" }}>
                  {result ? t("wallet.sendSuccessTitle", lang) : t("wallet.sendTitle", lang)}
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

            {!result ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="font-body text-sm leading-relaxed" style={{ color: "#4A6358" }}>
                  {t("wallet.sendDesc", lang)}
                </p>

                <div className="space-y-1.5">
                  <label htmlFor="send-recipient" className="font-body font-medium text-sm" style={{ color: "#F5FAF7" }}>
                    {t("wallet.recipientLabel", lang)}
                  </label>
                  <input
                    id="send-recipient"
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    required
                    autoFocus
                    spellCheck={false}
                    placeholder={t("wallet.recipientPlaceholder", lang)}
                    className="w-full font-mono text-xs px-4 py-2.5 rounded-xl border bg-transparent outline-none transition-colors focus:border-primary"
                    style={{ borderColor: "#1E2E28", color: "#F5FAF7" }}
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="send-amount" className="font-body font-medium text-sm" style={{ color: "#F5FAF7" }}>
                      {t("wallet.amountLabel", lang)}
                    </label>
                    {availableSol !== null && (
                      <span className="font-mono text-xs" style={{ color: "#4A6358" }}>
                        {t("wallet.amountAvailable", lang, {
                          amount: availableSol.toLocaleString(undefined, { maximumFractionDigits: 4 }),
                        })}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="flex-1 flex items-center rounded-xl border px-4 focus-within:border-primary transition-colors"
                      style={{ borderColor: "#1E2E28" }}
                    >
                      <input
                        id="send-amount"
                        type="number"
                        inputMode="decimal"
                        step="any"
                        min="0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        placeholder="0.00"
                        className="w-full font-body text-sm py-2.5 bg-transparent outline-none"
                        style={{ color: "#F5FAF7" }}
                      />
                      <span className="font-body text-xs font-medium pl-2" style={{ color: "#4A6358" }}>
                        SOL
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleMax}
                      disabled={availableSol === null}
                      className="font-body font-medium text-xs px-3 py-2.5 rounded-xl border transition-colors disabled:opacity-40"
                      style={{ borderColor: "#1E2E28", color: "#1D9E75" }}
                    >
                      {t("wallet.sendMax", lang)}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="send-password" className="font-body font-medium text-sm" style={{ color: "#F5FAF7" }}>
                    {t("wallet.sendPasswordLabel", lang)}
                  </label>
                  <input
                    id="send-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    placeholder={t("wallet.exportPasswordPlaceholder", lang)}
                    className="w-full font-body text-sm px-4 py-2.5 rounded-xl border bg-transparent outline-none transition-colors focus:border-primary"
                    style={{ borderColor: "#1E2E28", color: "#F5FAF7" }}
                  />
                </div>

                <div
                  className="flex items-start gap-2 rounded-xl border p-3 text-xs leading-relaxed"
                  style={{ backgroundColor: "rgba(239,159,39,0.06)", borderColor: "rgba(239,159,39,0.2)", color: "#FAC775" }}
                >
                  <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                  <span>{t("wallet.sendWarning", lang)}</span>
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
                    {t("wallet.sendCancel", lang)}
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !recipient.trim() || !amount || !password}
                    className="flex-1 inline-flex items-center justify-center gap-2 font-body font-medium text-sm px-4 py-2.5 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ backgroundColor: "#0F6E56", color: "#F5FAF7" }}
                  >
                    {loading ? <Loader2 size={15} className="animate-spin" /> : <SendIcon size={15} />}
                    {loading ? t("wallet.sendConfirming", lang) : t("wallet.sendConfirm", lang)}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div
                  className="flex items-center gap-3 rounded-xl border p-4"
                  style={{ backgroundColor: "rgba(15,110,86,0.08)", borderColor: "rgba(15,110,86,0.25)" }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "rgba(15,110,86,0.2)" }}
                  >
                    <Check size={16} style={{ color: "#1D9E75" }} />
                  </div>
                  <p className="font-body text-sm" style={{ color: "#9FE1CB" }}>
                    {t("wallet.sendSuccess", lang)}
                  </p>
                </div>

                <a
                  href={result.explorerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 font-body font-medium text-sm px-4 py-2.5 rounded-xl border transition-colors hover:border-white/20"
                  style={{ borderColor: "#1E2E28", color: "#F5FAF7" }}
                >
                  <ExternalLink size={14} />
                  {t("wallet.sendViewTx", lang)}
                </a>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleSendAnother}
                    className="flex-1 font-body font-medium text-sm px-4 py-2.5 rounded-xl border transition-colors"
                    style={{ borderColor: "#1E2E28", color: "#4A6358" }}
                  >
                    {t("wallet.sendAnother", lang)}
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 font-body font-medium text-sm px-4 py-2.5 rounded-xl transition-colors"
                    style={{ backgroundColor: "#0F6E56", color: "#F5FAF7" }}
                  >
                    {t("wallet.done", lang)}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
