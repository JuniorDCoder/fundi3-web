"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { GraduationCap, Sparkles, FileBadge, AlertCircle, type LucideIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";
import { Switch } from "@/components/ui/Switch";
import { SkeletonForm } from "@/components/ui/Skeleton";
import { GitHubConnectCard } from "@/components/dashboard/GitHubConnectCard";

interface NotificationPreferences {
  emailCourseCompleted: boolean;
  emailNewCourse: boolean;
  emailCertificatePdf: boolean;
}

const DEFAULT_PREFERENCES: NotificationPreferences = {
  emailCourseCompleted: true,
  emailNewCourse: true,
  emailCertificatePdf: true,
};

interface ToggleRow {
  key: keyof NotificationPreferences;
  icon: LucideIcon;
  labelKey: string;
  hintKey: string;
}

const TOGGLES: ToggleRow[] = [
  { key: "emailCourseCompleted", icon: GraduationCap, labelKey: "settings.notifCourseCompleted", hintKey: "settings.notifCourseCompletedHint" },
  { key: "emailNewCourse", icon: Sparkles, labelKey: "settings.notifNewCourse", hintKey: "settings.notifNewCourseHint" },
  { key: "emailCertificatePdf", icon: FileBadge, labelKey: "settings.notifCertificatePdf", hintKey: "settings.notifCertificatePdfHint" },
];

export default function SettingsPage() {
  const { user, loading: authLoading } = useAuth();
  const { lang } = useLanguage();

  const [prefs, setPrefs] = useState<NotificationPreferences>(DEFAULT_PREFERENCES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    fetch("/api/user/notifications")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.preferences) setPrefs(data.preferences);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  async function handleToggle(key: keyof NotificationPreferences, value: boolean) {
    const previous = prefs;
    setPrefs((p) => ({ ...p, [key]: value }));

    try {
      const res = await fetch("/api/user/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: value }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setPrefs(previous);
      toast.error(t("settings.saveError", lang), {
        icon: <AlertCircle size={16} className="text-red-400" />,
      });
    }
  }

  if (authLoading || loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 pb-16">
        <h1 className="font-heading text-3xl font-semibold mb-8" style={{ color: "#F5FAF7" }}>
          {t("settings.title", lang)}
        </h1>
        <SkeletonForm fields={3} />
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
        {t("settings.title", lang)}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="max-w-xl space-y-4"
      >
        <h2 className="font-heading font-semibold text-lg" style={{ color: "#F5FAF7" }}>
          {t("settings.notificationsTitle", lang)}
        </h2>

        {TOGGLES.map(({ key, icon: Icon, labelKey, hintKey }) => (
          <div
            key={key}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex items-center gap-4"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-accent shrink-0">
              <Icon size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body font-medium text-sm" style={{ color: "#F5FAF7" }}>
                {t(labelKey, lang)}
              </p>
              <p className="font-body text-xs mt-0.5" style={{ color: "#4A6358" }}>
                {t(hintKey, lang)}
              </p>
            </div>
            <Switch
              checked={prefs[key]}
              onChange={(value) => handleToggle(key, value)}
              label={t(labelKey, lang)}
            />
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="max-w-xl space-y-4 mt-10"
      >
        <h2 className="font-heading font-semibold text-lg" style={{ color: "#F5FAF7" }}>
          {t("settings.connectedAccountsTitle", lang)}
        </h2>
        <GitHubConnectCard />
      </motion.div>
    </div>
  );
}
