"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  BookOpen,
  Award,
  UserPlus,
  ShieldOff,
  Send,
  ArrowDownLeft,
  Settings,
  Loader2,
} from "lucide-react";

import { useLanguage } from "@/hooks/useLanguage";
import { authedFetch } from "@/lib/admin/api-client";
import { t } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";
import type { LogEntry } from "@/lib/activity/log";
import { SkeletonTableRows } from "@/components/ui/Skeleton";

const ACTION_ICONS: Record<string, typeof Activity> = {
  course_created: BookOpen,
  course_updated: BookOpen,
  course_published: BookOpen,
  user_enrolled: UserPlus,
  certificate_issued: Award,
  wallet_send: Send,
  wallet_receive: ArrowDownLeft,
  role_promoted: UserPlus,
  role_revoked: ShieldOff,
  commission_updated: Settings,
};

function formatDate(value: string, lang: Lang): string {
  return new Date(value).toLocaleString(lang === "fr" ? "fr-FR" : "en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function snakeToCamel(s: string): string {
  return s.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

function actionDescription(entry: LogEntry, lang: Lang): string {
  const actor = entry.actorEmail?.split("@")[0] ?? "System";
  const meta = entry.metadata as Record<string, string>;
  const key = `admin.activity.${snakeToCamel(entry.action)}`;
  return t(key, lang, { actor, title: meta.title ?? "", amount: meta.amountSol ?? "", role: meta.role ?? "" });
}

export default function ActivityPage() {
  const { lang } = useLanguage();
  const [entries, setEntries] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const load = useCallback(async (offset = 0) => {
    const isInitial = offset === 0;
    if (isInitial) setLoading(true);
    else setLoadingMore(true);

    try {
      const res = await authedFetch(`/api/admin/activity?lang=${lang}&limit=50&offset=${offset}`, lang, {
        method: "GET",
        body: undefined,
      });
      if (!res.ok) return;
      const data = await res.json();
      const newEntries = data.entries as LogEntry[];

      if (isInitial) setEntries(newEntries);
      else setEntries((prev) => [...prev, ...newEntries]);

      setHasMore(newEntries.length === 50);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [lang]);

  useEffect(() => { load(); }, [load]);

  return (
    <div className="max-w-5xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="font-heading text-2xl md:text-3xl font-semibold text-[#F5FAF7] mb-1">
          {t("admin.activity.title", lang)}
        </h1>
        <p className="text-[#4A6358] text-sm">{t("admin.activity.subtitle", lang)}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden"
      >
        {loading ? (
          <SkeletonTableRows rows={8} columns={3} />
        ) : entries.length === 0 ? (
          <div className="p-8 text-center">
            <Activity size={32} className="mx-auto mb-3 text-[#4A6358]" />
            <p className="text-sm text-[#4A6358]">{t("admin.activity.empty", lang)}</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {entries.map((entry) => {
              const Icon = ACTION_ICONS[entry.action] ?? Activity;
              return (
                <div key={entry.id} className="flex items-start gap-3 px-5 py-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={16} className="text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#F5FAF7]">
                      {actionDescription(entry, lang)}
                    </p>
                    <p className="text-xs text-[#4A6358] mt-0.5">
                      {formatDate(entry.createdAt, lang)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>

      {hasMore && entries.length > 0 && (
        <div className="text-center">
          <button
            type="button"
            disabled={loadingMore}
            onClick={() => load(entries.length)}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 hover:border-white/20 text-sm text-[#F5FAF7] rounded-xl px-5 py-2.5 transition-colors disabled:opacity-50"
          >
            {loadingMore && <Loader2 size={14} className="animate-spin" />}
            {t("admin.activity.loadMore", lang)}
          </button>
        </div>
      )}
    </div>
  );
}
