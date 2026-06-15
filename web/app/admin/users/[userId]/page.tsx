"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  AlertTriangle,
  ArrowLeft,
  Compass,
  Wallet,
  Copy,
  ExternalLink,
  Award,
  BookOpen,
  Crown,
  ShieldPlus,
  Trash2,
} from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { authedFetch } from "@/lib/admin/api-client";
import { t, type Lang } from "@/lib/i18n";
import { adminRole } from "@/lib/admin/metadata";
import type { LearnerDetail } from "@/lib/admin/learners";
import { SkeletonForm } from "@/components/ui/Skeleton";

function formatDate(value: string | null, lang: Lang): string {
  if (!value) return t("admin.learners.never", lang);
  return new Date(value).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function localizedTitle(titleEn: string, titleFr: string, lang: Lang): string {
  return lang === "fr" ? titleFr || titleEn : titleEn || titleFr;
}

function RoleBadge({ role, lang }: { role: "admin" | "superadmin"; lang: Lang }) {
  if (role === "superadmin") {
    return (
      <span className="inline-flex items-center gap-1.5 bg-secondary/10 border border-secondary/20 text-[#EF9F27] text-xs font-medium rounded-full px-2.5 py-1">
        <Crown size={12} />
        {t("admin.learners.roleSuperadmin", lang)}
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

export default function LearnerDetailPage() {
  const { lang } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams<{ userId: string }>();

  const [learner, setLearner] = useState<LearnerDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [displayNameInput, setDisplayNameInput] = useState("");
  const [savingName, setSavingName] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteConfirmEmail, setDeleteConfirmEmail] = useState("");
  const [deleting, setDeleting] = useState(false);

  const isSuperadmin = !!user && adminRole(user) === "superadmin";

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setNotFound(false);

    authedFetch(`/api/admin/learners/${params.userId}?lang=${lang}`, lang, { method: "GET", body: undefined })
      .then(async (res) => {
        if (cancelled) return;
        if (res.status === 404) {
          setNotFound(true);
          return;
        }
        if (!res.ok) return;
        const data = (await res.json()) as { learner: LearnerDetail };
        setLearner(data.learner);
        setDisplayNameInput(data.learner.displayName ?? "");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.userId]);

  async function handleCopy(address: string) {
    try {
      await navigator.clipboard.writeText(address);
      toast.success(t("admin.learners.addressCopied", lang));
    } catch {
      // clipboard access denied — silently ignore
    }
  }

  async function handleSaveName() {
    if (!learner) return;
    const trimmed = displayNameInput.trim();
    if (trimmed.length < 2 || trimmed.length > 100) return;

    setSavingName(true);
    try {
      const res = await authedFetch(`/api/admin/learners/${params.userId}`, lang, {
        method: "PATCH",
        body: JSON.stringify({ displayName: trimmed, lang }),
      });
      if (!res.ok) throw new Error("save_failed");
      setLearner((prev) => (prev ? { ...prev, displayName: trimmed } : prev));
      toast.success(t("admin.learnerDetail.nameSaved", lang));
    } catch {
      toast.error(t("admin.learnerDetail.nameSaveError", lang));
    } finally {
      setSavingName(false);
    }
  }

  async function handleDeleteAccount() {
    if (!learner) return;

    setDeleting(true);
    try {
      const res = await authedFetch(`/api/admin/learners/${params.userId}?lang=${lang}`, lang, {
        method: "DELETE",
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string; sweptAmountSol?: number | null };
      if (!res.ok) {
        toast.error(data.message ?? t("admin.learnerDetail.deleteError", lang));
        return;
      }
      if (data.sweptAmountSol) {
        toast.success(t("admin.learnerDetail.deleteSuccessSwept", lang, { amount: data.sweptAmountSol.toFixed(4) }));
      } else {
        toast.success(t("admin.learnerDetail.deleteSuccess", lang));
      }
      router.push("/admin/users");
    } catch {
      toast.error(t("admin.learnerDetail.deleteError", lang));
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="max-w-4xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <Link
          href="/admin/users"
          className="inline-flex items-center gap-2 text-sm text-[#4A6358] hover:text-[#F5FAF7] transition-colors mb-3"
        >
          <ArrowLeft size={14} />
          {t("admin.learnerDetail.back", lang)}
        </Link>
        {learner && (
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="font-heading text-2xl md:text-3xl font-semibold text-[#F5FAF7]">{learner.email}</h1>
            {learner.adminRole && <RoleBadge role={learner.adminRole} lang={lang} />}
          </div>
        )}
      </motion.div>

      {loading ? (
        <div className="space-y-6">
          <SkeletonForm fields={4} />
          <SkeletonForm fields={3} />
        </div>
      ) : notFound || !learner ? (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center gap-3">
          <span className="w-12 h-12 rounded-full flex items-center justify-center bg-secondary/10">
            <Compass size={20} className="text-secondary" />
          </span>
          <p className="text-sm text-[#4A6358]">{t("admin.learnerDetail.notFound", lang)}</p>
          <Link
            href="/admin/users"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#1D9E75] hover:text-[#9FE1CB] transition-colors"
          >
            <ArrowLeft size={15} />
            {t("admin.learnerDetail.back", lang)}
          </Link>
        </div>
      ) : (
        <>
          {/* Profile */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
          >
            <h2 className="font-heading text-lg font-semibold text-[#F5FAF7] mb-4">
              {t("admin.learnerDetail.profileTitle", lang)}
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-xs text-[#4A6358] uppercase tracking-wide mb-1">
                  {t("admin.learnerDetail.email", lang)}
                </dt>
                <dd className="text-[#F5FAF7]">{learner.email}</dd>
              </div>
              <div>
                <dt className="text-xs text-[#4A6358] uppercase tracking-wide mb-1">
                  {t("admin.learnerDetail.displayName", lang)}
                </dt>
                <dd className="text-[#F5FAF7]">{learner.displayName || t("admin.learners.noName", lang)}</dd>
              </div>
              <div>
                <dt className="text-xs text-[#4A6358] uppercase tracking-wide mb-1">
                  {t("admin.learnerDetail.joined", lang)}
                </dt>
                <dd className="text-[#F5FAF7]">{formatDate(learner.createdAt, lang)}</dd>
              </div>
              <div>
                <dt className="text-xs text-[#4A6358] uppercase tracking-wide mb-1">
                  {t("admin.learnerDetail.lastSignIn", lang)}
                </dt>
                <dd className="text-[#F5FAF7]">{formatDate(learner.lastSignInAt, lang)}</dd>
              </div>
              <div>
                <dt className="text-xs text-[#4A6358] uppercase tracking-wide mb-1">
                  {t("admin.learnerDetail.role", lang)}
                </dt>
                <dd className="text-[#F5FAF7]">
                  {learner.adminRole ? (
                    <RoleBadge role={learner.adminRole} lang={lang} />
                  ) : (
                    t("admin.learnerDetail.roleLearner", lang)
                  )}
                </dd>
              </div>
            </dl>
          </motion.div>

          {/* Wallet */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
          >
            <h2 className="font-heading text-lg font-semibold text-[#F5FAF7] mb-4 flex items-center gap-2">
              <Wallet size={18} className="text-accent" />
              {t("admin.learnerDetail.walletTitle", lang)}
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="sm:col-span-2">
                <dt className="text-xs text-[#4A6358] uppercase tracking-wide mb-1">
                  {t("admin.learnerDetail.walletAddress", lang)}
                </dt>
                <dd className="flex items-center gap-2 font-mono text-xs text-[#F5FAF7] break-all">
                  {learner.walletAddress}
                  <button
                    type="button"
                    onClick={() => handleCopy(learner.walletAddress)}
                    title={t("admin.learners.copyAddress", lang)}
                    className="p-1.5 rounded-lg text-[#4A6358] hover:text-[#F5FAF7] hover:bg-white/5 transition-colors shrink-0"
                  >
                    <Copy size={13} />
                  </button>
                  <a
                    href={learner.walletExplorerUrl}
                    target="_blank"
                    rel="noreferrer"
                    title={t("admin.learnerDetail.viewOnExplorer", lang)}
                    className="p-1.5 rounded-lg text-[#4A6358] hover:text-[#F5FAF7] hover:bg-white/5 transition-colors shrink-0"
                  >
                    <ExternalLink size={13} />
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[#4A6358] uppercase tracking-wide mb-1">
                  {t("admin.learnerDetail.walletBalance", lang)}
                </dt>
                <dd className="text-[#F5FAF7]">
                  {learner.walletBalanceSol !== null
                    ? `${learner.walletBalanceSol.toFixed(4)} SOL`
                    : t("admin.learnerDetail.balanceUnavailable", lang)}
                </dd>
              </div>
            </dl>
          </motion.div>

          {/* Edit display name */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.12 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
          >
            <h2 className="font-heading text-lg font-semibold text-[#F5FAF7] mb-1">
              {t("admin.learnerDetail.editNameLabel", lang)}
            </h2>
            <p className="text-xs text-[#4A6358] mb-4">{t("admin.learnerDetail.editNameHint", lang)}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={displayNameInput}
                onChange={(e) => setDisplayNameInput(e.target.value)}
                maxLength={100}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm
                           text-[#F5FAF7] placeholder-[#4A6358]
                           focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
              <button
                type="button"
                onClick={handleSaveName}
                disabled={
                  savingName ||
                  displayNameInput.trim().length < 2 ||
                  displayNameInput.trim().length > 100 ||
                  displayNameInput.trim() === (learner.displayName ?? "")
                }
                className="px-4 py-2.5 rounded-xl bg-primary text-[#0A0F0E] text-sm font-medium
                           hover:bg-primary/90 transition-colors shrink-0
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t("admin.learnerDetail.save", lang)}
              </button>
            </div>
          </motion.div>

          {/* Enrollments */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-white/10">
              <h2 className="font-heading text-lg font-semibold text-[#F5FAF7] flex items-center gap-2">
                <BookOpen size={18} className="text-accent" />
                {t("admin.learnerDetail.enrollmentsTitle", lang)}
              </h2>
            </div>
            {learner.enrollments.length === 0 ? (
              <p className="p-6 text-center text-sm text-[#4A6358]">{t("admin.learnerDetail.enrollmentsEmpty", lang)}</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-left text-xs text-[#4A6358] uppercase tracking-wide">
                      <th className="px-6 py-3 font-medium">{t("admin.learnerDetail.tableCourse", lang)}</th>
                      <th className="px-6 py-3 font-medium">{t("admin.learnerDetail.tableProgress", lang)}</th>
                      <th className="px-6 py-3 font-medium">{t("admin.learnerDetail.tableEnrolledAt", lang)}</th>
                      <th className="px-6 py-3 font-medium">{t("admin.learnerDetail.tableCompletedAt", lang)}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {learner.enrollments.map((e) => (
                      <tr key={e.courseId} className="border-b border-white/5 last:border-0">
                        <td className="px-6 py-3.5 text-[#F5FAF7]">
                          {e.courseSlug ? (
                            <Link
                              href={`/courses/${e.courseSlug}`}
                              target="_blank"
                              className="hover:text-[#1D9E75] transition-colors"
                            >
                              {localizedTitle(e.titleEn, e.titleFr, lang)}
                            </Link>
                          ) : (
                            localizedTitle(e.titleEn, e.titleFr, lang)
                          )}
                        </td>
                        <td className="px-6 py-3.5">
                          <div className="flex items-center gap-2 min-w-[140px]">
                            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${e.percentComplete}%` }}
                              />
                            </div>
                            <span className="text-[#4A6358] text-xs shrink-0">
                              {e.completedLessons}/{e.totalLessons}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-3.5 text-[#4A6358] text-xs">{formatDate(e.enrolledAt, lang)}</td>
                        <td className="px-6 py-3.5 text-[#4A6358] text-xs">
                          {e.completedAt ? formatDate(e.completedAt, lang) : t("admin.learnerDetail.notCompleted", lang)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>

          {/* Certificates */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-white/10">
              <h2 className="font-heading text-lg font-semibold text-[#F5FAF7] flex items-center gap-2">
                <Award size={18} className="text-secondary" />
                {t("admin.learnerDetail.certificatesTitle", lang)}
              </h2>
            </div>
            {learner.certificateDetails.length === 0 ? (
              <p className="p-6 text-center text-sm text-[#4A6358]">{t("admin.learnerDetail.certificatesEmpty", lang)}</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-left text-xs text-[#4A6358] uppercase tracking-wide">
                      <th className="px-6 py-3 font-medium">{t("admin.learnerDetail.tableCourse", lang)}</th>
                      <th className="px-6 py-3 font-medium">{t("admin.learnerDetail.tableIssued", lang)}</th>
                      <th className="px-6 py-3 font-medium text-right">{t("admin.learners.tableActions", lang)}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {learner.certificateDetails.map((c) => (
                      <tr key={c.id} className="border-b border-white/5 last:border-0">
                        <td className="px-6 py-3.5 text-[#F5FAF7]">{localizedTitle(c.titleEn, c.titleFr, lang)}</td>
                        <td className="px-6 py-3.5 text-[#4A6358] text-xs">{formatDate(c.issuedAt, lang)}</td>
                        <td className="px-6 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-3">
                            {c.explorerUrl ? (
                              <a
                                href={c.explorerUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-medium text-[#1D9E75] hover:text-[#1D9E75]/80 transition-colors"
                              >
                                {t("admin.learnerDetail.viewCertificate", lang)}
                                <ExternalLink size={12} />
                              </a>
                            ) : null}
                            {c.txExplorerUrl ? (
                              <a
                                href={c.txExplorerUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-medium text-[#1D9E75] hover:text-[#1D9E75]/80 transition-colors"
                              >
                                {t("admin.learnerDetail.viewTransaction", lang)}
                                <ExternalLink size={12} />
                              </a>
                            ) : null}
                            {!c.explorerUrl && !c.txExplorerUrl ? (
                              <span className="text-xs text-[#4A6358]">{t("admin.learnerDetail.pendingOnChain", lang)}</span>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>

          {/* Danger zone */}
          {isSuperadmin && !learner.adminRole && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="bg-red-500/5 backdrop-blur-md border border-red-500/20 rounded-2xl p-6"
            >
              <h2 className="font-heading text-lg font-semibold text-red-400 mb-1 flex items-center gap-2">
                <AlertTriangle size={18} />
                {t("admin.learnerDetail.dangerZoneTitle", lang)}
              </h2>
              <p className="text-sm text-[#4A6358] mb-4">{t("admin.learnerDetail.deleteIntro", lang)}</p>

              {!deleteOpen ? (
                <button
                  type="button"
                  onClick={() => setDeleteOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30
                             text-red-400 text-sm font-medium hover:bg-red-500/20 transition-colors"
                >
                  <Trash2 size={14} />
                  {t("admin.learnerDetail.deleteAccount", lang)}
                </button>
              ) : (
                <div className="space-y-3">
                  {learner.walletBalanceSol !== null && learner.walletBalanceSol > 0 && (
                    <p className="text-xs text-secondary">
                      {t("admin.learnerDetail.deleteSweepNotice", lang, {
                        amount: learner.walletBalanceSol.toFixed(4),
                      })}
                    </p>
                  )}
                  <div>
                    <label className="text-xs text-[#4A6358] block mb-1.5">
                      {t("admin.learnerDetail.deleteTypeEmail", lang)}
                    </label>
                    <input
                      type="text"
                      value={deleteConfirmEmail}
                      onChange={(e) => setDeleteConfirmEmail(e.target.value)}
                      placeholder={learner.email}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm
                                 text-[#F5FAF7] placeholder-[#4A6358]
                                 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-colors"
                    />
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={handleDeleteAccount}
                      disabled={deleting || deleteConfirmEmail.trim() !== learner.email}
                      className="px-4 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium
                                 hover:bg-red-600 transition-colors
                                 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {t("admin.learnerDetail.deleteConfirmButton", lang)}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDeleteOpen(false);
                        setDeleteConfirmEmail("");
                      }}
                      className="px-4 py-2.5 rounded-xl border border-white/10 text-[#F5FAF7] text-sm font-medium
                                 hover:bg-white/5 transition-colors"
                    >
                      {t("admin.learnerDetail.cancel", lang)}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
