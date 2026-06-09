"use client";

import { useState, useCallback, Suspense, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  KeyRound,
  Wallet,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

import { LogoFull } from "@/components/brand/Logo";
import { AdminWalletProvider } from "@/components/admin/AdminWalletProvider";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { t, type Lang } from "@/lib/i18n";

type LoginMethod = "password" | "wallet";

function shortAddress(address: string): string {
  if (address.length <= 10) return address;
  return `${address.slice(0, 4)}…${address.slice(-4)}`;
}

function PasswordPanel({ lang, redirect }: { lang: Lang; redirect: string }) {
  const { signInWithPassword } = useAdminAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: signInError } = await signInWithPassword(email, password, lang);

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    toast.success(t("admin.dashboard.title", lang), {
      icon: <Sparkles size={16} className="text-accent" />,
    });

    router.push(redirect);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="admin-email" className="block text-sm font-medium text-[#F5FAF7]/80 mb-1.5">
          {t("admin.login.emailLabel", lang)}
        </label>
        <input
          id="admin-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          placeholder="you@fundi3.xyz"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5
                     text-[#F5FAF7] placeholder-[#4A6358] text-sm
                     focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
                     transition-colors"
        />
      </div>

      <div>
        <label htmlFor="admin-password" className="block text-sm font-medium text-[#F5FAF7]/80 mb-1.5">
          {t("admin.login.passwordLabel", lang)}
        </label>
        <div className="relative">
          <input
            id="admin-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            placeholder="••••••••"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 pr-11
                       text-[#F5FAF7] placeholder-[#4A6358] text-sm
                       focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
                       transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A6358] hover:text-[#F5FAF7] transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-sm text-red-400"
        >
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed
                   text-white font-medium rounded-xl py-2.5 text-sm
                   flex items-center justify-center gap-2
                   transition-colors mt-2"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            {t("admin.login.signingIn", lang)}
          </>
        ) : (
          t("admin.login.submit", lang)
        )}
      </button>
    </form>
  );
}

function WalletPanel({ lang, redirect }: { lang: Lang; redirect: string }) {
  const { signInWithWallet } = useAdminAuth();
  const { publicKey, connected, signMessage, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const router = useRouter();

  const [signing, setSigning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const address = publicKey?.toBase58() ?? null;

  const handleConnect = useCallback(() => {
    setError(null);
    setVisible(true);
  }, [setVisible]);

  const handleChangeWallet = useCallback(async () => {
    setError(null);
    try {
      await disconnect();
    } catch {
      // user closed the wallet popup — ignore
    }
    setVisible(true);
  }, [disconnect, setVisible]);

  async function handleSignAndContinue() {
    if (!address) return;

    if (!signMessage) {
      setError(t("admin.login.walletUnavailable", lang));
      return;
    }

    setError(null);
    setSigning(true);

    const { error: signInError } = await signInWithWallet(address, signMessage, lang);

    setSigning(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    toast.success(t("admin.dashboard.title", lang), {
      icon: <Sparkles size={16} className="text-accent" />,
    });

    router.push(redirect);
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-[#4A6358]">{t("admin.login.walletIntro", lang)}</p>

      {!connected || !address ? (
        <button
          type="button"
          onClick={handleConnect}
          className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20
                     text-[#F5FAF7] font-medium rounded-xl py-2.5 text-sm
                     flex items-center justify-center gap-2 transition-colors"
        >
          <Wallet size={16} className="text-accent" />
          {t("admin.login.connectWallet", lang)}
        </button>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
            <span className="flex items-center gap-2 text-sm text-[#F5FAF7]">
              <CheckCircle2 size={16} className="text-[#1D9E75] shrink-0" />
              {t("admin.login.connectedAs", lang, { address: shortAddress(address) })}
            </span>
            <button
              type="button"
              onClick={handleChangeWallet}
              className="text-xs text-accent hover:text-primary transition-colors shrink-0"
            >
              {t("admin.login.changeWallet", lang)}
            </button>
          </div>

          <button
            type="button"
            onClick={handleSignAndContinue}
            disabled={signing}
            className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed
                       text-white font-medium rounded-xl py-2.5 text-sm
                       flex items-center justify-center gap-2 transition-colors"
          >
            {signing ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                {t("admin.login.signing", lang)}
              </>
            ) : (
              <>
                <KeyRound size={16} />
                {t("admin.login.signAndContinue", lang)}
              </>
            )}
          </button>
        </div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-sm text-red-400"
        >
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}
    </div>
  );
}

function AdminLoginCard() {
  const { lang } = useLanguage();
  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect") ?? "/admin";
  const errorParam = searchParams.get("error");

  const [method, setMethod] = useState<LoginMethod>("password");

  return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-4">
      {/* Background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-primary/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-secondary/15 blur-3xl animate-pulse [animation-delay:1s]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative"
      >
        <div className="flex justify-center mb-8">
          <Link href="/">
            <LogoFull className="h-8 w-auto" />
          </Link>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
          <h1 className="font-heading text-2xl font-semibold text-[#F5FAF7] mb-2">
            {t("admin.login.title", lang)}
          </h1>
          <p className="text-[#4A6358] text-sm mb-6">{t("admin.login.subtitle", lang)}</p>

          {errorParam === "not_admin" && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-sm text-red-400 mb-4"
            >
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>{t("admin.login.notAdmin", lang)}</span>
            </motion.div>
          )}

          {/* Segmented control */}
          <div className="grid grid-cols-2 gap-1 bg-white/5 border border-white/10 rounded-xl p-1 mb-6">
            <button
              type="button"
              onClick={() => setMethod("password")}
              className={`flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-colors ${
                method === "password"
                  ? "bg-primary text-white"
                  : "text-[#4A6358] hover:text-[#F5FAF7]"
              }`}
            >
              <KeyRound size={14} />
              {t("admin.login.methodPassword", lang)}
            </button>
            <button
              type="button"
              onClick={() => setMethod("wallet")}
              className={`flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-colors ${
                method === "wallet"
                  ? "bg-primary text-white"
                  : "text-[#4A6358] hover:text-[#F5FAF7]"
              }`}
            >
              <Wallet size={14} />
              {t("admin.login.methodWallet", lang)}
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={method}
              initial={{ opacity: 0, x: method === "wallet" ? 12 : -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {method === "password" ? (
                <PasswordPanel lang={lang} redirect={redirect} />
              ) : (
                <WalletPanel lang={lang} redirect={redirect} />
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <p className="text-center text-sm">
            <Link href="/" className="text-[#4A6358] hover:text-accent transition-colors">
              {t("admin.login.backToSite", lang)}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-dark" />}>
      <AdminWalletProvider>
        <AdminLoginCard />
      </AdminWalletProvider>
    </Suspense>
  );
}
