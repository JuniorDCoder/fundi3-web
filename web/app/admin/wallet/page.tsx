"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import QRCode from "qrcode";
import { toast } from "sonner";
import {
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  Coins,
  KeyRound,
  Loader2,
  AlertCircle,
  Send as SendIcon,
  ArrowDownLeft,
  ArrowUpRight,
  History,
  ArrowLeftRight,
  Award,
} from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
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

export default function AdminWalletPage() {
  const { adminUser: user } = useAdminAuth();
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
      setWallet(await res.json());
      setError(false);
    } catch { setError(true); }
  }, []);

  const loadTransactions = useCallback(async () => {
    try {
      const res = await fetch("/api/wallet/transactions");
      if (!res.ok) throw new Error();
      setTransactions((await res.json()).transactions);
    } catch { setTransactions([]); }
  }, []);

  useEffect(() => {
    if (!user) { setLoading(false); setTxLoading(false); return; }
    setLoading(true); setTxLoading(true);
    loadWallet().finally(() => setLoading(false));
    loadTransactions().finally(() => setTxLoading(false));
  }, [user, loadWallet, loadTransactions]);

  const walletAddress = wallet?.address;
  useEffect(() => {
    if (!walletAddress) { setQrDataUrl(null); return; }
    QRCode.toDataURL(walletAddress, { width: 200, margin: 1, color: { dark: "#0A0F0E", light: "#F5FAF7" } })
      .then(setQrDataUrl).catch(() => setQrDataUrl(null));
  }, [walletAddress]);

  async function handleCopy() {
    if (!wallet) return;
    await navigator.clipboard.writeText(wallet.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleRefresh() {
    setRefreshing(true);
    await Promise.all([loadWallet(), loadTransactions()]);
    setRefreshing(false);
  }

  async function handleAirdrop() {
    if (wallet?.network !== "devnet") return;
    setAirdropping(true);
    try {
      const res = await fetch("/api/wallet/airdrop", { method: "POST" });
      if (!res.ok) throw new Error();
      toast.success(t("wallet.airdropSuccess", lang));
      await loadWallet();
    } catch { toast.error(t("wallet.airdropError", lang)); }
    finally { setAirdropping(false); }
  }

  return (
    <div className="max-w-5xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="font-heading text-2xl md:text-3xl font-semibold text-[#F5FAF7] mb-1">
          {t("admin.wallet.title", lang)}
        </h1>
        <p className="text-[#4A6358] text-sm">{t("admin.wallet.subtitle", lang)}</p>
      </motion.div>

      {loading ? (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-4">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-4 w-64" />
        </div>
      ) : error ? (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex items-center gap-3 text-red-400">
          <AlertCircle size={20} />
          <span className="text-sm">{t("wallet.error", lang)}</span>
        </div>
      ) : wallet ? (
        <>
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 text-[#1D9E75] text-xs font-medium rounded-full px-2.5 py-1">
                    <Coins size={12} />
                    {t(NETWORK_LABEL_KEY[wallet.network], lang)}
                  </span>
                </div>
                <p className="font-heading text-3xl font-semibold text-[#F5FAF7]">
                  {wallet.balanceSol !== null ? `${wallet.balanceSol.toFixed(4)} SOL` : "—"}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button type="button" onClick={() => setSendOpen(true)}
                  className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white rounded-xl px-4 py-2.5 text-sm font-medium transition-colors">
                  <SendIcon size={14} /> {t("wallet.send", lang)}
                </button>
                <button type="button" onClick={() => setReceiveOpen(true)}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 hover:border-white/20 text-[#F5FAF7] rounded-xl px-4 py-2.5 text-sm font-medium transition-colors">
                  <ArrowDownLeft size={14} /> {t("wallet.receive", lang)}
                </button>
                <button type="button" onClick={handleRefresh} disabled={refreshing}
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-[#4A6358] hover:text-[#F5FAF7] transition-colors disabled:opacity-50">
                  <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              {qrDataUrl && (
                <div className="shrink-0 bg-white rounded-xl p-2 w-fit">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={qrDataUrl} alt="QR" className="w-24 h-24" />
                </div>
              )}
              <div className="flex-1 min-w-0 space-y-3">
                <div>
                  <p className="text-xs text-[#4A6358] mb-1">{t("wallet.addressLabel", lang)}</p>
                  <div className="flex items-center gap-2">
                    <code className="text-sm text-[#F5FAF7] font-mono truncate">{wallet.address}</code>
                    <button type="button" onClick={handleCopy}
                      className="shrink-0 p-1.5 rounded-lg text-[#4A6358] hover:text-[#F5FAF7] hover:bg-white/5 transition-colors">
                      {copied ? <Check size={14} className="text-accent" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <a href={wallet.explorerUrl} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline">
                    <ExternalLink size={12} /> {t("wallet.viewExplorer", lang)}
                  </a>
                  <button type="button" onClick={() => setExportOpen(true)}
                    className="inline-flex items-center gap-1.5 text-xs text-[#4A6358] hover:text-[#F5FAF7] transition-colors">
                    <KeyRound size={12} /> {t("wallet.exportButton", lang)}
                  </button>
                  {wallet.network === "devnet" && (
                    <button type="button" onClick={handleAirdrop} disabled={airdropping}
                      className="inline-flex items-center gap-1.5 text-xs text-secondary hover:text-secondary/80 disabled:opacity-50 transition-colors">
                      {airdropping ? <Loader2 size={12} className="animate-spin" /> : <Coins size={12} />}
                      {t("wallet.airdropButton", lang)}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-white/10 flex items-center gap-2">
              <History size={16} className="text-accent" />
              <span className="text-sm font-medium text-[#F5FAF7]">{t("wallet.txHistoryTitle", lang)}</span>
            </div>

            {txLoading ? (
              <div className="p-6 space-y-3">
                {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
              </div>
            ) : !transactions || transactions.length === 0 ? (
              <p className="p-6 text-center text-sm text-[#4A6358]">{t("wallet.txEmpty", lang)}</p>
            ) : (
              <div className="divide-y divide-white/5">
                {transactions.map((tx) => {
                  const isIn = tx.direction === "in";
                  const isOut = tx.direction === "out";
                  const isCert = tx.kind === "certificate";
                  return (
                    <div key={tx.signature} className="flex items-center gap-3 px-5 py-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isCert ? "bg-secondary/10 text-secondary" :
                        isIn ? "bg-green-500/10 text-green-400" :
                        isOut ? "bg-red-500/10 text-red-400" :
                        "bg-white/5 text-[#4A6358]"
                      }`}>
                        {isCert ? <Award size={14} /> : isIn ? <ArrowDownLeft size={14} /> : isOut ? <ArrowUpRight size={14} /> : <ArrowLeftRight size={14} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#F5FAF7]">
                          {isCert ? t("wallet.txCertificate", lang) :
                           isIn ? t("wallet.txReceived", lang) :
                           isOut ? t("wallet.txSent", lang) :
                           t("wallet.txOther", lang)}
                        </p>
                        <p className="text-xs text-[#4A6358] truncate">
                          {tx.counterparty ? truncateAddress(tx.counterparty) : ""} · {formatDate(tx.blockTime, lang)}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        {tx.changeSol !== null && (
                          <span className={`text-sm font-mono ${isIn ? "text-green-400" : isOut ? "text-red-400" : "text-[#4A6358]"}`}>
                            {isIn ? "+" : ""}{tx.changeSol.toFixed(4)}
                          </span>
                        )}
                        <a href={tx.explorerUrl} target="_blank" rel="noreferrer"
                          className="block text-[10px] text-accent hover:underline mt-0.5">
                          {t("wallet.viewTx", lang)}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>

          <ExportKeyModal open={exportOpen} onClose={() => setExportOpen(false)} />
          <SendModal open={sendOpen} onClose={() => setSendOpen(false)} availableSol={wallet.balanceSol} onSuccess={handleRefresh} />
          <ReceiveModal open={receiveOpen} onClose={() => setReceiveOpen(false)} address={wallet.address} qrDataUrl={qrDataUrl} />
        </>
      ) : null}
    </div>
  );
}
