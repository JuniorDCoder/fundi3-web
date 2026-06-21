"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Search, Wallet, Copy, ExternalLink, ChevronRight, Crown, ShieldPlus } from "lucide-react";

import { useLanguage } from "@/hooks/useLanguage";
import { authedFetch } from "@/lib/admin/api-client";
import { t, type Lang } from "@/lib/i18n";
import type { LearnerSummary } from "@/lib/admin/learners";
import { SkeletonTableRows } from "@/components/ui/Skeleton";

function formatDate(value: string | null, lang: Lang): string {
  if (!value) return t("admin.learners.never", lang);
  return new Date(value).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function shortAddress(address: string): string {
  return `${address.slice(0, 4)}…${address.slice(-4)}`;
}

function RoleBadge({ role, lang }: { role: "admin" | "superadmin" | "tutor"; lang: Lang }) {
  if (role === "superadmin") {
    return (
      <span className="inline-flex items-center gap-1.5 bg-secondary/10 border border-secondary/20 text-[#EF9F27] text-xs font-medium rounded-full px-2.5 py-1">
        <Crown size={12} />
        {t("admin.learners.roleSuperadmin", lang)}
      </span>
    );
  }
  if (role === "tutor") {
    return (
      <span className="inline-flex items-center gap-1.5 bg-accent/10 border border-accent/20 text-[#1D9E75] text-xs font-medium rounded-full px-2.5 py-1">
        <ShieldPlus size={12} />
        {t("admin.admins.roleTutor", lang)}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 text-[#1D9E75] text-xs font-medium rounded-full px-2.5 py-1">
      <ShieldPlus size={12} />
      {t("admin.learners.roleAdmin", lang)}
    </span>
  );
}

export default function AdminLearnersPage() {
  const { lang } = useLanguage();
  const [learners, setLearners] = useState<LearnerSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const loadLearners = useCallback(async () => {
    try {
      const res = await authedFetch(`/api/admin/learners?lang=${lang}`, lang, { method: "GET", body: undefined });
      if (!res.ok) return;
      const data = (await res.json()) as { learners: LearnerSummary[] };
      setLearners(data.learners);
    } finally {
      setLoading(false);
    }
  }, [lang]);

  useEffect(() => {
    loadLearners();
  }, [loadLearners]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return learners;
    return learners.filter(
      (l) => l.email.toLowerCase().includes(q) || (l.displayName ?? "").toLowerCase().includes(q),
    );
  }, [learners, query]);

  async function handleCopy(address: string) {
    try {
      await navigator.clipboard.writeText(address);
      toast.success(t("admin.learners.addressCopied", lang));
    } catch {
      // clipboard access denied — silently ignore
    }
  }

  return (
    <div className="max-w-6xl space-y-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="font-heading text-2xl md:text-3xl font-semibold text-[#F5FAF7] mb-1">
          {t("admin.learners.title", lang)}
        </h1>
        <p className="text-[#4A6358] text-sm">{t("admin.learners.subtitle", lang)}</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}>
        <div className="relative max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A6358]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("admin.learners.searchPlaceholder", lang)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-sm
                       text-[#F5FAF7] placeholder-[#4A6358]
                       focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden"
      >
        {loading ? (
          <SkeletonTableRows rows={6} columns={6} />
        ) : filtered.length === 0 ? (
          <p className="p-8 text-center text-sm text-[#4A6358]">
            {learners.length === 0 ? t("admin.learners.empty", lang) : t("admin.learners.noResults", lang, { query })}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-[#4A6358] uppercase tracking-wide">
                  <th className="px-5 py-3 font-medium">{t("admin.learners.tableLearner", lang)}</th>
                  <th className="px-5 py-3 font-medium">{t("admin.learners.tableWallet", lang)}</th>
                  <th className="px-5 py-3 font-medium text-center">{t("admin.learners.tableEnrolled", lang)}</th>
                  <th className="px-5 py-3 font-medium text-center">{t("admin.learners.tableCompleted", lang)}</th>
                  <th className="px-5 py-3 font-medium text-center">{t("admin.learners.tableCertificates", lang)}</th>
                  <th className="px-5 py-3 font-medium">{t("admin.learners.tableJoined", lang)}</th>
                  <th className="px-5 py-3 font-medium text-right">{t("admin.learners.tableActions", lang)}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((learner) => (
                  <tr key={learner.id} className="border-b border-white/5 last:border-0">
                    <td className="px-5 py-3.5">
                      <div className="text-[#F5FAF7]">{learner.email}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[#4A6358] text-xs">
                          {learner.displayName || t("admin.learners.noName", lang)}
                        </span>
                        {learner.adminRole && <RoleBadge role={learner.adminRole} lang={lang} />}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5 font-mono text-xs text-[#F5FAF7]/80">
                        <Wallet size={12} className="text-accent shrink-0" />
                        {shortAddress(learner.walletAddress)}
                        <button
                          type="button"
                          onClick={() => handleCopy(learner.walletAddress)}
                          title={t("admin.learners.copyAddress", lang)}
                          className="p-1 rounded-lg text-[#4A6358] hover:text-[#F5FAF7] hover:bg-white/5 transition-colors"
                        >
                          <Copy size={12} />
                        </button>
                        <a
                          href={learner.walletExplorerUrl}
                          target="_blank"
                          rel="noreferrer"
                          title={t("admin.learners.viewOnExplorer", lang)}
                          className="p-1 rounded-lg text-[#4A6358] hover:text-[#F5FAF7] hover:bg-white/5 transition-colors"
                        >
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-center text-[#F5FAF7]">{learner.enrolledCourses}</td>
                    <td className="px-5 py-3.5 text-center text-[#F5FAF7]">{learner.completedLessons}</td>
                    <td className="px-5 py-3.5 text-center text-[#F5FAF7]">{learner.certificates}</td>
                    <td className="px-5 py-3.5 text-[#4A6358] text-xs">{formatDate(learner.createdAt, lang)}</td>
                    <td className="px-5 py-3.5 text-right">
                      <Link
                        href={`/admin/users/${learner.id}`}
                        className="inline-flex items-center gap-1 text-xs font-medium text-[#1D9E75] hover:text-[#1D9E75]/80 transition-colors"
                      >
                        {t("admin.learners.view", lang)}
                        <ChevronRight size={14} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
