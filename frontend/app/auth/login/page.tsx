"use client";

import { useState, FormEvent, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle, Sparkles } from "lucide-react";
import { LogoFull } from "@/components/brand/Logo";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";

function LoginForm() {
  const { lang } = useLanguage();
  const { signIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect") ?? "/dashboard";
  const errorParam = searchParams.get("error");
  const successParam = searchParams.get("success");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    errorParam === "auth_callback_failed"
      ? t("auth.callbackError", lang)
      : null,
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: signInError } = await signIn(email, password);

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    toast.success(t("toast.welcomeBack", lang), {
      description: t("toast.welcomeBackDesc", lang),
      icon: <Sparkles size={16} className="text-accent" />,
    });

    router.push(redirect);
    router.refresh();
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
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
          <h1 className="font-heading text-2xl font-semibold text-[#F5FAF7] mb-2">
            {t("auth.login.title", lang)}
          </h1>
          <p className="text-[#4A6358] text-sm mb-6">
            {t("auth.login.subtitle", lang)}
          </p>

          {/* Email verified success */}
          {successParam === "email_confirmed" && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2 bg-primary/10 border border-primary/20 rounded-xl p-3 text-sm text-[#1D9E75] mb-4"
            >
              <CheckCircle size={16} className="mt-0.5 shrink-0" />
              <span>{t("auth.emailConfirmed", lang)}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#F5FAF7]/80 mb-1.5"
              >
                {t("auth.email", lang)}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5
                           text-[#F5FAF7] placeholder-[#4A6358] text-sm
                           focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
                           transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#F5FAF7]/80"
                >
                  {t("auth.password", lang)}
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-accent hover:text-primary transition-colors"
                >
                  {t("auth.forgotPassword", lang)}
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
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

            {/* Error */}
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

            {/* Submit */}
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
                  {t("auth.signingIn", lang)}
                </>
              ) : (
                t("auth.login.cta", lang)
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-[#4A6358]">{t("auth.or", lang)}</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Signup link */}
          <p className="text-center text-sm text-[#4A6358]">
            {t("auth.noAccount", lang)}{" "}
            <Link
              href="/auth/signup"
              className="text-accent hover:text-primary font-medium transition-colors"
            >
              {t("auth.createFree", lang)}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-dark" />}>
      <LoginForm />
    </Suspense>
  );
}
