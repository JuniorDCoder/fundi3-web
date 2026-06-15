"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import QRCode from "qrcode";
import { toast } from "sonner";
import {
  Wallet as WalletIcon,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  Coins,
  KeyRound,
  Loader2,
  AlertCircle,
  Send as SendIcon,
  QrCode,
  ArrowDownLeft,
  ArrowUpRight,
  History,
  ArrowLeftRight,
  Award,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";
import { Skeleton } from "@/components/ui/Skeleton";
import { ExportKeyModal } from "@/components/dashboard/ExportKeyModal";
import { SendModal } from "@/components/dashboard/SendModal";
import { ReceiveModal } from "@/components/dashboard/ReceiveModal";

interface WalletInfo {
  address: string;
  network: "devnet" | "testnet" | "mainnet-beta";
  balanceSol: number | null;
  explorerUrl: string;
}

interface WalletTransaction {
  signature: string;
  blockTime: number | null;
  status: "success" | "failed";
  direction: "in" | "out" | "other";
  changeSol: number | null;
  counterparty: string | null;
  explorerUrl: string;
  kind: "certificate" | "transfer";
}

const NETWORK_LABEL_KEY: Record<WalletInfo["network"], string> = {
  devnet: "wallet.networkDevnet",
  testnet: "wallet.networkTestnet",
  "mainnet-beta": "wallet.networkMainnet",
};

function truncateAddress(address: string) {
  if (address.length <= 16) return address;
  return `${address.slice(0, 6)}…${address.slice(-6)}`;
}

function formatDate(blockTime: number | null, lang: "en" | "fr") {
  if (!blockTime) return "";
  return new Date(blockTime * 1000).toLocaleString(lang === "fr" ? "fr-FR" : "en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function WalletPage() {
  const { user, loading: authLoading } = useAuth();
  const { lang } = useLanguage();

  const [wallet, setWallet] = useState<WalletInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [airdropping, setAirdropping] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [sendOpen, setSendOpen] = useState(false);
  const [receiveOpen, setReceiveOpen] = useState(false);

  const [transactions, setTransactions] = useState<WalletTransaction[] | null>(null);
  const [txLoading, setTxLoading] = useState(true);

  const loadWallet = useCallback(async () => {
    try {
      const res = await fetch("/api/wallet");
      if (!res.ok) throw new Error();
      const data: WalletInfo = await res.json();
      setWallet(data);
      setError(false);
    } catch {
      setError(true);
    }
  }, []);

  const loadTransactions = useCallback(async () => {
    try {
      const res = await fetch("/api/wallet/transactions");
      if (!res.ok) throw new Error();
      const data: { transactions: WalletTransaction[] } = await res.json();
      setTransactions(data.transactions);
    } catch {
      setTransactions([]);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      setTxLoading(false);
      return;
    }
    setLoading(true);
    setTxLoading(true);
    loadWallet().finally(() => setLoading(false));
    loadTransactions().finally(() => setTxLoading(false));
  }, [user, loadWallet, loadTransactions]);

  useEffect(() => {
    if (!wallet) {
      setQrDataUrl(null);
      return;
    }
    QRCode.toDataURL(wallet.address, {
      width: 200,
      margin: 1,
      color: { dark: "#0A0F0E", light: "#F5FAF7" },
    })
      .then(setQrDataUrl)
      .catch(() => setQrDataUrl(null));
  }, [wallet]);

  async function handleRefresh() {
    setRefreshing(true);
    await Promise.all([loadWallet(), loadTransactions()]);
    setRefreshing(false);
  }

  async function handleCopy() {
    if (!wallet) return;
    try {
      await navigator.clipboard.writeText(wallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — no-op
    }
  }

  async function handleAirdrop() {
    setAirdropping(true);
    try {
      const res = await fetch("/api/wallet/airdrop", { method: "POST" });
      if (!res.ok) throw new Error();
      toast.success(t("wallet.airdropSuccess", lang), { icon: <Coins size={16} className="text-accent" /> });
      setTimeout(() => handleRefresh(), 1500);
    } catch {
      toast.error(t("wallet.airdropError", lang), { icon: <AlertCircle size={16} className="text-red-400" /> });
    } finally {
      setAirdropping(false);
    }
  }

  function handleSendSuccess() {
    setTimeout(() => handleRefresh(), 1500);
  }

  if (authLoading || loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 pb-16">
        <h1 className="font-heading text-3xl font-semibold mb-2" style={{ color: "#F5FAF7" }}>
          {t("wallet.title", lang)}
        </h1>
        <p className="font-body text-sm mb-8" style={{ color: "#4A6358" }}>
          {t("wallet.loading", lang)}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          <Skeleton className="h-64 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error || !wallet) {
    return (
      <div className="max-w-5xl mx-auto px-4 pb-16">
        <h1 className="font-heading text-3xl font-semibold mb-8" style={{ color: "#F5FAF7" }}>
          {t("wallet.title", lang)}
        </h1>
        <div
          className="rounded-2xl border p-6 flex items-center gap-3 max-w-xl"
          style={{ backgroundColor: "rgba(239,68,68,0.06)", borderColor: "rgba(239,68,68,0.2)" }}
        >
          <AlertCircle size={18} className="text-red-400 shrink-0" />
          <p className="font-body text-sm" style={{ color: "#fca5a5" }}>
            {t("wallet.error", lang)}
          </p>
        </div>
      </div>
    );
  }

  const networkColor = wallet.network === "devnet" ? "#EF9F27" : "#1D9E75";

  return (
    <div className="max-w-5xl mx-auto px-4 pb-16">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="font-heading text-3xl font-semibold mb-2" style={{ color: "#F5FAF7" }}>
          {t("wallet.title", lang)}
        </h1>
        <p className="font-body text-sm leading-relaxed mb-8 max-w-2xl" style={{ color: "#4A6358" }}>
          {t("wallet.subtitle", lang)}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
        {/* Address + QR card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(15,110,86,0.15)" }}>
                <WalletIcon size={16} style={{ color: "#1D9E75" }} />
              </div>
              <span className="font-heading font-semibold text-sm" style={{ color: "#F5FAF7" }}>
                {t("wallet.addressLabel", lang)}
              </span>
            </div>
            <span
              className="inline-flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-1 rounded-full"
              style={{ backgroundColor: `${networkColor}1F`, color: networkColor }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: networkColor }} />
              {t(NETWORK_LABEL_KEY[wallet.network], lang)}
            </span>
          </div>

          {qrDataUrl && (
            <div className="flex justify-center">
              <div className="rounded-xl p-3" style={{ backgroundColor: "#F5FAF7" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={qrDataUrl} alt={t("wallet.qrLabel", lang)} width={160} height={160} />
              </div>
            </div>
          )}
          <p className="font-mono text-[11px] text-center" style={{ color: "#4A6358" }}>
            {t("wallet.qrLabel", lang)}
          </p>

          <div
            className="rounded-xl border px-4 py-3 font-mono text-xs sm:text-sm break-all text-center"
            style={{ backgroundColor: "#0A0F0E", borderColor: "#1E2E28", color: "#F5FAF7" }}
          >
            <span className="hidden sm:inline">{wallet.address}</span>
            <span className="sm:hidden">{truncateAddress(wallet.address)}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="flex-1 inline-flex items-center justify-center gap-1.5 font-body font-medium text-sm px-4 py-2.5 rounded-xl transition-colors"
              style={{ backgroundColor: "rgba(15,110,86,0.15)", color: copied ? "#9FE1CB" : "#1D9E75" }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? t("wallet.copied", lang) : t("wallet.copy", lang)}
            </button>
            <a
              href={wallet.explorerUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 font-body font-medium text-sm px-4 py-2.5 rounded-xl border transition-colors hover:border-white/20"
              style={{ borderColor: "#1E2E28", color: "#4A6358" }}
            >
              <ExternalLink size={14} />
              {t("wallet.viewExplorer", lang)}
            </a>
          </div>

          <p className="font-body text-xs leading-relaxed" style={{ color: "#4A6358" }}>
            {t("wallet.addressHint", lang)}
          </p>
        </motion.div>

        {/* Balance + actions card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-6 flex flex-col"
        >
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-body text-sm" style={{ color: "#4A6358" }}>
                {t("wallet.balanceLabel", lang)}
              </span>
              <button
                type="button"
                onClick={handleRefresh}
                disabled={refreshing}
                className="text-[#4A6358] hover:text-[#F5FAF7] transition-colors disabled:opacity-50"
                aria-label={t("wallet.refresh", lang)}
              >
                <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
              </button>
            </div>
            <p className="font-heading font-semibold text-3xl" style={{ color: "#F5FAF7" }}>
              {wallet.balanceSol !== null ? (
                <>
                  {wallet.balanceSol.toLocaleString(undefined, { maximumFractionDigits: 4 })}{" "}
                  <span className="text-lg font-body font-medium" style={{ color: "#4A6358" }}>
                    SOL
                  </span>
                </>
              ) : (
                <span className="text-lg font-body" style={{ color: "#4A6358" }}>
                  {t("wallet.balanceUnavailable", lang)}
                </span>
              )}
            </p>
          </div>

          {/* Send / Receive */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSendOpen(true)}
              className="flex-1 inline-flex items-center justify-center gap-2 font-body font-medium text-sm px-4 py-2.5 rounded-xl transition-colors"
              style={{ backgroundColor: "#0F6E56", color: "#F5FAF7" }}
            >
              <SendIcon size={15} />
              {t("wallet.send", lang)}
            </button>
            <button
              type="button"
              onClick={() => setReceiveOpen(true)}
              className="flex-1 inline-flex items-center justify-center gap-2 font-body font-medium text-sm px-4 py-2.5 rounded-xl border transition-colors hover:border-white/20"
              style={{ borderColor: "#1E2E28", color: "#F5FAF7" }}
            >
              <QrCode size={15} />
              {t("wallet.receive", lang)}
            </button>
          </div>

          {wallet.network === "devnet" && (
            <button
              type="button"
              onClick={handleAirdrop}
              disabled={airdropping}
              className="inline-flex items-center justify-center gap-2 font-body font-medium text-sm px-4 py-2.5 rounded-xl border transition-colors disabled:opacity-50"
              style={{ borderColor: "rgba(239,159,39,0.3)", color: "#EF9F27" }}
            >
              {airdropping ? <Loader2 size={15} className="animate-spin" /> : <Coins size={15} />}
              {airdropping ? t("wallet.airdropLoading", lang) : t("wallet.airdropButton", lang)}
            </button>
          )}

          <div className="flex-1" />

          <div className="border-t pt-5 space-y-3" style={{ borderColor: "#1E2E28" }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(239,159,39,0.12)" }}>
                <KeyRound size={16} style={{ color: "#EF9F27" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-heading font-semibold text-sm" style={{ color: "#F5FAF7" }}>
                  {t("wallet.exportTitle", lang)}
                </p>
                <p className="font-body text-xs leading-relaxed" style={{ color: "#4A6358" }}>
                  {t("wallet.exportDesc", lang)}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setExportOpen(true)}
              className="w-full inline-flex items-center justify-center gap-2 font-body font-medium text-sm px-4 py-2.5 rounded-xl border transition-colors hover:border-white/20"
              style={{ borderColor: "#1E2E28", color: "#F5FAF7" }}
            >
              <KeyRound size={14} />
              {t("wallet.exportButton", lang)}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Transaction history */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 mt-6 max-w-3xl space-y-4"
      >
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(15,110,86,0.15)" }}>
            <History size={16} style={{ color: "#1D9E75" }} />
          </div>
          <span className="font-heading font-semibold text-sm" style={{ color: "#F5FAF7" }}>
            {t("wallet.txHistoryTitle", lang)}
          </span>
        </div>

        {txLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-14 rounded-xl" />
            <Skeleton className="h-14 rounded-xl" />
            <Skeleton className="h-14 rounded-xl" />
          </div>
        ) : !transactions || transactions.length === 0 ? (
          <p className="font-body text-sm leading-relaxed" style={{ color: "#4A6358" }}>
            {t("wallet.txEmpty", lang)}
          </p>
        ) : (
          <div className="space-y-2">
            {transactions.map((txItem) => {
              const isCertificate = txItem.kind === "certificate";
              const isIn = txItem.direction === "in";
              const isOut = txItem.direction === "out";
              const iconColor = isCertificate ? "#EF9F27" : isIn ? "#1D9E75" : isOut ? "#EF9F27" : "#4A6358";
              const iconBg = isCertificate
                ? "rgba(239,159,39,0.12)"
                : isIn
                  ? "rgba(15,110,86,0.15)"
                  : isOut
                    ? "rgba(239,159,39,0.12)"
                    : "rgba(255,255,255,0.05)";
              const Icon = isCertificate ? Award : isIn ? ArrowDownLeft : isOut ? ArrowUpRight : ArrowLeftRight;
              const label = isCertificate
                ? t("wallet.txCertificate", lang)
                : isIn
                  ? t("wallet.txReceived", lang)
                  : isOut
                    ? t("wallet.txSent", lang)
                    : t("wallet.txOther", lang);
              const counterpartyLabel = txItem.counterparty
                ? isIn
                  ? t("wallet.txFrom", lang, { address: truncateAddress(txItem.counterparty) })
                  : t("wallet.txTo", lang, { address: truncateAddress(txItem.counterparty) })
                : null;

              return (
                <a
                  key={txItem.signature}
                  href={txItem.explorerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors hover:border-white/20"
                  style={{ borderColor: "#1E2E28" }}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: iconBg }}>
                    <Icon size={16} style={{ color: iconColor }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-body font-medium text-sm" style={{ color: "#F5FAF7" }}>
                        {label}
                      </p>
                      {txItem.status === "failed" && (
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: "rgba(239,68,68,0.12)", color: "#fca5a5" }}>
                          {t("wallet.txFailed", lang)}
                        </span>
                      )}
                    </div>
                    {counterpartyLabel && (
                      <p className="font-mono text-xs truncate" style={{ color: "#4A6358" }}>
                        {counterpartyLabel}
                      </p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    {txItem.changeSol !== null && (
                      <p className="font-mono text-sm font-medium" style={{ color: isIn ? "#1D9E75" : "#F5FAF7" }}>
                        {txItem.changeSol > 0 ? "+" : ""}
                        {txItem.changeSol.toLocaleString(undefined, { maximumFractionDigits: 6 })} SOL
                      </p>
                    )}
                    <p className="font-mono text-[11px]" style={{ color: "#4A6358" }}>
                      {formatDate(txItem.blockTime, lang)}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </motion.div>

      <ExportKeyModal open={exportOpen} onClose={() => setExportOpen(false)} />
      <SendModal open={sendOpen} onClose={() => setSendOpen(false)} availableSol={wallet.balanceSol} onSuccess={handleSendSuccess} />
      <ReceiveModal open={receiveOpen} onClose={() => setReceiveOpen(false)} address={wallet.address} qrDataUrl={qrDataUrl} />
    </div>
  );
}
