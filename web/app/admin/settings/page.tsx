"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Settings, Loader2, Save, Sparkles } from "lucide-react";

import { useLanguage } from "@/hooks/useLanguage";
import { authedFetch } from "@/lib/admin/api-client";
import { t } from "@/lib/i18n";
import { Skeleton } from "@/components/ui/Skeleton";

export default function AdminSettingsPage() {
  const { lang } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [rate, setRate] = useState("70");
  const [wallet, setWallet] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await authedFetch(`/api/admin/settings/commission?lang=${lang}`, lang, {
        method: "GET",
        body: undefined,
      });
      if (!res.ok) return;
      const data = await res.json();
      setRate(String(data.defaultTutorRate));
      setWallet(data.platformWalletAddress ?? "");
    } finally {
      setLoading(false);
    }
  }, [lang]);

  useEffect(() => { load(); }, [load]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await authedFetch("/api/admin/settings/commission", lang, {
        method: "PUT",
        body: JSON.stringify({ defaultTutorRate: Number(rate), platformWalletAddress: wallet, lang }),
      });
      if (!res.ok) {
        toast.error(t("admin.settings.saveError", lang));
        return;
      }
      toast.success(t("admin.settings.saved", lang), {
        icon: <Sparkles size={16} className="text-accent" />,
      });
    } catch {
      toast.error(t("admin.settings.saveError", lang));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="font-heading text-2xl md:text-3xl font-semibold text-[#F5FAF7] mb-1">
          {t("admin.settings.title", lang)}
        </h1>
        <p className="text-[#4A6358] text-sm">{t("admin.settings.subtitle", lang)}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
      >
        <h2 className="font-heading text-lg font-semibold text-[#F5FAF7] mb-1 flex items-center gap-2">
          <Settings size={18} className="text-accent" />
          {t("admin.settings.commissionTitle", lang)}
        </h2>
        <p className="text-[#4A6358] text-xs mb-6">{t("admin.settings.commissionSubtitle", lang)}</p>

        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="rate" className="block text-xs font-medium text-[#F5FAF7]/80 mb-1.5">
                {t("admin.settings.defaultRate", lang)}
              </label>
              <input
                id="rate"
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-[#F5FAF7]
                           focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
              <p className="text-[10px] text-[#4A6358] mt-1">{t("admin.settings.defaultRateHint", lang)}</p>
            </div>

            <div>
              <label htmlFor="wallet" className="block text-xs font-medium text-[#F5FAF7]/80 mb-1.5">
                {t("admin.settings.platformWallet", lang)}
              </label>
              <input
                id="wallet"
                type="text"
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                placeholder="Solana address"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm font-mono
                           text-[#F5FAF7] placeholder-[#4A6358]
                           focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
              <p className="text-[10px] text-[#4A6358] mt-1">{t("admin.settings.platformWalletHint", lang)}</p>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed
                         text-white font-medium rounded-xl px-5 py-2.5 text-sm
                         flex items-center gap-2 transition-colors"
            >
              {saving ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  {t("admin.settings.saving", lang)}
                </>
              ) : (
                <>
                  <Save size={16} />
                  {t("admin.settings.save", lang)}
                </>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
