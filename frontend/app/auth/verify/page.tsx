"use client";

import { useState, FormEvent, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Mail, Loader2, CheckCircle, RefreshCw, AlertCircle, PartyPopper } from "lucide-react";
import { LogoFull } from "@/components/brand/Logo";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";

function VerifyContent() {
  const { lang } = useLanguage();
  const { verifyOtp, resendVerification } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);

  const [resending, setResending] = useState(false);

  async function handleVerify(e: FormEvent) {
    e.preventDefault();
    if (!email || code.trim().length < 8) return;

    setVerifying(true);
    setVerifyError(null);

    const { error: otpError } = await verifyOtp(email, code.trim(), lang);

    if (otpError) {
      setVerifyError(otpError.message || t("auth.verify.invalidCode", lang));
      setVerifying(false);
      return;
    }

    setVerified(true);
    toast.success(t("toast.emailVerified", lang), {
      description: t("toast.emailVerifiedDesc", lang),
      icon: <PartyPopper size={16} className="text-accent" />,
    });
    setTimeout(() => {
      router.push("/dashboard");
      router.refresh();
    }, 1200);
  }

  async function handleResend() {
    if (!email) return;
    setResending(true);
    const { error: resendError } = await resendVerification(email, lang);
    setResending(false);

    if (resendError) {
      toast.error(t("toast.resendFailed", lang), {
        description: resendError.message,
        icon: <AlertCircle size={16} className="text-red-400" />,
      });
    } else {
      toast.success(t("toast.codeResent", lang), {
        description: t("toast.codeResentDesc", lang),
        icon: <Mail size={16} className="text-accent" />,
      });
    }
  }

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
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/">
            <LogoFull className="h-8 w-auto" />
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mail size={32} className="text-accent" />
          </div>

          <h1 className="font-heading text-2xl font-semibold text-[#F5FAF7] mb-3">
            {t("auth.verify.title", lang)}
          </h1>

          <p className="text-[#4A6358] text-sm mb-2">
            {t("auth.verify.sent", lang)}
          </p>

          {email && (
            <p className="text-accent font-medium text-sm mb-6">{email}</p>
          )}

          <p className="text-[#4A6358] text-sm mb-6">
            {t("auth.verify.instructions", lang)}
          </p>

          {/* Verified success */}
          {verified ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2 text-sm text-[#1D9E75] mb-6"
            >
              <CheckCircle size={16} />
              {t("auth.verify.success", lang)}
            </motion.div>
          ) : (
            <form onSubmit={handleVerify} className="space-y-4 mb-6 text-left">
              <div>
                <label
                  htmlFor="code"
                  className="block text-sm font-medium text-[#F5FAF7]/80 mb-1.5"
                >
                  {t("auth.verify.codeLabel", lang)}
                </label>
                <input
                  id="code"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={8}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ""))}
                  placeholder={t("auth.verify.codePlaceholder", lang)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5
                             text-center font-mono text-lg tracking-[0.5em] text-[#F5FAF7]
                             placeholder-[#4A6358]/50
                             focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
                             transition-colors"
                />
              </div>

              {verifyError && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-sm text-red-400"
                >
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  <span>{verifyError}</span>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={verifying || code.trim().length < 8}
                className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed
                           text-white font-medium rounded-xl py-2.5 text-sm
                           flex items-center justify-center gap-2
                           transition-colors"
              >
                {verifying ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    {t("auth.verify.verifying", lang)}
                  </>
                ) : (
                  t("auth.verify.submit", lang)
                )}
              </button>
            </form>
          )}

          {/* Resend button */}
          {!verified && (
            <button
              onClick={handleResend}
              disabled={resending || !email}
              className="inline-flex items-center gap-2 text-sm text-accent hover:text-primary
                         disabled:opacity-50 disabled:cursor-not-allowed transition-colors mb-6"
            >
              {resending ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <RefreshCw size={14} />
              )}
              {t("auth.verify.resend", lang)}
            </button>
          )}

          <div className="border-t border-white/10 pt-6">
            <Link
              href="/auth/login"
              className="text-sm text-[#4A6358] hover:text-[#F5FAF7] transition-colors"
            >
              ← {t("auth.backToLogin", lang)}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-dark" />}>
      <VerifyContent />
    </Suspense>
  );
}
