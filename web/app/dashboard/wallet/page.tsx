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
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";
import { Skeleton } from "@/components/ui/Skeleton";
import { ExportKeyModal } from "@/components/dashboard/ExportKeyModal";

interface WalletInfo {
  address: string;
  network: "devnet" | "testnet" | "mainnet-beta";
  balanceSol: number | null;
  explorerUrl: string;
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

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    loadWallet().finally(() => setLoading(false));
  }, [user, loadWallet]);

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
    await loadWallet();
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
      setTimeout(() => loadWallet(), 1500);
    } catch {
      toast.error(t("wallet.airdropError", lang), { icon: <AlertCircle size={16} className="text-red-400" /> });
    } finally {
      setAirdropping(false);
    }
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

      <ExportKeyModal open={exportOpen} onClose={() => setExportOpen(false)} />
    </div>
  );
}
