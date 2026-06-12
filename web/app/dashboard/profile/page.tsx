"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Save, CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";
import { SkeletonForm } from "@/components/ui/Skeleton";

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const { lang } = useLanguage();

  const [displayName, setDisplayName] = useState("");
  const [initialName, setInitialName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    fetch("/api/user/profile")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const name = data?.profile?.displayName ?? "";
        setDisplayName(name);
        setInitialName(name);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  const trimmed = displayName.trim();
  const isValid = trimmed.length >= 2 && trimmed.length <= 100;
  const isDirty = trimmed !== initialName;

  async function handleSave() {
    if (!isValid) return;
    setSaving(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName: trimmed }),
      });
      if (!res.ok) throw new Error();
      setInitialName(trimmed);
      toast.success(t("profile.saved", lang), {
        icon: <CheckCircle2 size={16} className="text-accent" />,
      });
    } catch {
      toast.error(t("profile.saveError", lang), {
        icon: <AlertCircle size={16} className="text-red-400" />,
      });
    } finally {
      setSaving(false);
    }
  }

  if (authLoading || loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 pb-16">
        <h1 className="font-heading text-3xl font-semibold mb-8" style={{ color: "#F5FAF7" }}>
          {t("profile.title", lang)}
        </h1>
        <SkeletonForm fields={2} />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 pb-16">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="font-heading text-3xl font-semibold mb-8"
        style={{ color: "#F5FAF7" }}
      >
        {t("profile.title", lang)}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-6 max-w-xl"
      >
        <div className="space-y-2">
          <label className="font-body font-medium text-sm" style={{ color: "#F5FAF7" }}>
            {t("profile.email", lang)}
          </label>
          <p className="font-body text-sm px-4 py-2.5 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.03)", color: "#4A6358" }}>
            {user?.email}
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="displayName" className="font-body font-medium text-sm" style={{ color: "#F5FAF7" }}>
            {t("profile.displayNameLabel", lang)}
          </label>
          <input
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            maxLength={100}
            className="w-full font-body text-sm px-4 py-2.5 rounded-xl border bg-transparent outline-none transition-colors focus:border-primary"
            style={{ borderColor: "#1E2E28", color: "#F5FAF7" }}
          />
          <p className="font-body text-xs" style={{ color: "#4A6358" }}>
            {t("profile.displayNameHint", lang)}
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={!isValid || !isDirty || saving}
          className="inline-flex items-center gap-2 font-body font-medium text-sm px-5 py-2.5 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: "#0F6E56", color: "#F5FAF7" }}
        >
          <Save size={15} />
          {t("profile.save", lang)}
        </button>
      </motion.div>
    </div>
  );
}
