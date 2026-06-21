"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  ShieldPlus,
  Loader2,
  AlertCircle,
  Wallet,
  ShieldOff,
  Unlink,
  Sparkles,
  Crown,
} from "lucide-react";

import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { adminRole, type AdminRole } from "@/lib/admin/metadata";
import { authedFetch, type ApiError } from "@/lib/admin/api-client";
import { t, type Lang } from "@/lib/i18n";
import type { AdminUserSummary } from "@/lib/admin/users";
import { SkeletonTableRows } from "@/components/ui/Skeleton";
import { UserSearchCombobox } from "@/components/admin/UserSearchCombobox";

function formatDate(value: string | null, lang: Lang): string {
  if (!value) return t("admin.admins.never", lang);
  return new Date(value).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function RoleBadge({ role, lang }: { role: AdminRole; lang: Lang }) {
  if (role === "superadmin") {
    return (
      <span className="inline-flex items-center gap-1.5 bg-secondary/10 border border-secondary/20 text-[#EF9F27] text-xs font-medium rounded-full px-2.5 py-1">
        <Crown size={12} />
        {t("admin.admins.roleSuperadmin", lang)}
      </span>
    );
  }
  if (role === "tutor") {
    return (
      <span className="inline-flex items-center gap-1.5 bg-accent/10 border border-accent/20 text-[#1D9E75] text-xs font-medium rounded-full px-2.5 py-1">
        <Sparkles size={12} />
        {t("admin.admins.roleTutor", lang)}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 text-[#1D9E75] text-xs font-medium rounded-full px-2.5 py-1">
      <ShieldPlus size={12} />
      {t("admin.admins.roleAdmin", lang)}
    </span>
  );
}

export default function AdminAdminsPage() {
  const { lang } = useLanguage();
  const { adminUser } = useAdminAuth();
  const isSuper = adminRole(adminUser) === "superadmin";

  const [admins, setAdmins] = useState<AdminUserSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [actingId, setActingId] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [role, setRole] = useState<AdminRole>("admin");
  const [wallet, setWallet] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const loadAdmins = useCallback(async () => {
    try {
      const res = await authedFetch(`/api/admin/users?lang=${lang}`, lang, { method: "GET", body: undefined });
      if (!res.ok) return;
      const data = (await res.json()) as { admins: AdminUserSummary[] };
      setAdmins(data.admins);
    } finally {
      setLoading(false);
    }
  }, [lang]);

  useEffect(() => {
    loadAdmins();
  }, [loadAdmins]);

  async function handlePromote(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);

    try {
      const res = await authedFetch("/api/admin/users", lang, {
        method: "POST",
        body: JSON.stringify({ email, role, walletAddress: wallet.trim() || undefined, lang }),
      });
      const json = await res.json();

      if (!res.ok) {
        setFormError((json as ApiError).message);
        setSubmitting(false);
        return;
      }

      toast.success(t("admin.admins.promoted", lang), {
        description: t("admin.admins.promotedDesc", lang, { email }),
        icon: <Sparkles size={16} className="text-accent" />,
      });

      setEmail("");
      setRole("admin");
      setWallet("");
      await loadAdmins();
    } catch {
      setFormError(t("admin.admins.actionFailed", lang));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleRevoke(target: AdminUserSummary) {
    if (!window.confirm(t("admin.admins.confirmRevoke", lang, { email: target.email }))) return;

    setActingId(target.id);
    try {
      const res = await authedFetch(`/api/admin/users/${target.id}?lang=${lang}`, lang, {
        method: "DELETE",
        body: undefined,
      });
      const json = await res.json().catch(() => null);

      if (!res.ok) {
        toast.error((json as ApiError | null)?.message ?? t("admin.admins.actionFailed", lang));
        return;
      }

      toast.success(t("admin.admins.revoked", lang));
      await loadAdmins();
    } catch {
      toast.error(t("admin.admins.actionFailed", lang));
    } finally {
      setActingId(null);
    }
  }

  async function handleUnlinkWallet(target: AdminUserSummary) {
    setActingId(target.id);
    try {
      const res = await authedFetch(`/api/admin/users/${target.id}`, lang, {
        method: "PATCH",
        body: JSON.stringify({ walletAddress: "", lang }),
      });
      const json = await res.json().catch(() => null);

      if (!res.ok) {
        toast.error((json as ApiError | null)?.message ?? t("admin.admins.actionFailed", lang));
        return;
      }

      toast.success(t("admin.admins.walletUnlinked", lang));
      await loadAdmins();
    } catch {
      toast.error(t("admin.admins.actionFailed", lang));
    } finally {
      setActingId(null);
    }
  }

  return (
    <div className="max-w-5xl space-y-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="font-heading text-2xl md:text-3xl font-semibold text-[#F5FAF7] mb-1">
          {t("admin.admins.title", lang)}
        </h1>
        <p className="text-[#4A6358] text-sm">{t("admin.admins.subtitle", lang)}</p>
      </motion.div>

      {/* Promote form — superadmin only */}
      {isSuper && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
        >
          <h2 className="font-heading text-lg font-semibold text-[#F5FAF7] mb-4 flex items-center gap-2">
            <ShieldPlus size={18} className="text-accent" />
            {t("admin.admins.inviteTitle", lang)}
          </h2>

          <form onSubmit={handlePromote} className="grid grid-cols-1 md:grid-cols-[2fr_1fr_2fr_auto] gap-3 items-end">
            <div>
              <label className="block text-xs font-medium text-[#F5FAF7]/80 mb-1.5">
                {t("admin.admins.emailLabel", lang)}
              </label>
              <UserSearchCombobox value={email} onChange={setEmail} />
            </div>

            <div>
              <label htmlFor="promote-role" className="block text-xs font-medium text-[#F5FAF7]/80 mb-1.5">
                {t("admin.admins.roleLabel", lang)}
              </label>
              <select
                id="promote-role"
                value={role}
                onChange={(e) => {
                  const v = e.target.value;
                  setRole(v === "superadmin" ? "superadmin" : v === "tutor" ? "tutor" : "admin");
                }}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-[#F5FAF7]
                           focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              >
                <option value="tutor" className="bg-surface">{t("admin.admins.roleTutor", lang)}</option>
                <option value="admin" className="bg-surface">{t("admin.admins.roleAdmin", lang)}</option>
                <option value="superadmin" className="bg-surface">{t("admin.admins.roleSuperadmin", lang)}</option>
              </select>
            </div>

            <div>
              <label htmlFor="promote-wallet" className="block text-xs font-medium text-[#F5FAF7]/80 mb-1.5">
                {t("admin.admins.walletLabel", lang)}
              </label>
              <input
                id="promote-wallet"
                type="text"
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                placeholder={t("admin.admins.walletPlaceholder", lang)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm font-mono
                           text-[#F5FAF7] placeholder-[#4A6358]
                           focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed
                         text-white font-medium rounded-xl px-5 py-2.5 text-sm
                         flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  {t("admin.admins.submitting", lang)}
                </>
              ) : (
                t("admin.admins.submit", lang)
              )}
            </button>
          </form>

          {formError && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-sm text-red-400 mt-4"
            >
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>{formError}</span>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Admins table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden"
      >
        {loading ? (
          <SkeletonTableRows rows={5} columns={5} />
        ) : admins.length === 0 ? (
          <p className="p-8 text-center text-sm text-[#4A6358]">{t("admin.admins.empty", lang)}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-[#4A6358] uppercase tracking-wide">
                  <th className="px-5 py-3 font-medium">{t("admin.admins.tableEmail", lang)}</th>
                  <th className="px-5 py-3 font-medium">{t("admin.admins.tableRole", lang)}</th>
                  <th className="px-5 py-3 font-medium">{t("admin.admins.tableWallet", lang)}</th>
                  <th className="px-5 py-3 font-medium">{t("admin.admins.tableLastLogin", lang)}</th>
                  <th className="px-5 py-3 font-medium text-right">{t("admin.admins.tableActions", lang)}</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((a) => {
                  const acting = actingId === a.id;
                  const isSelf = a.id === adminUser?.id;
                  return (
                    <tr key={a.id} className="border-b border-white/5 last:border-0">
                      <td className="px-5 py-3.5 text-[#F5FAF7]">
                        {a.email}
                        {isSelf && <span className="text-[#4A6358] text-xs ml-2">({lang === "fr" ? "vous" : "you"})</span>}
                      </td>
                      <td className="px-5 py-3.5">
                        <RoleBadge role={a.role} lang={lang} />
                      </td>
                      <td className="px-5 py-3.5 font-mono text-xs text-[#4A6358]">
                        {a.walletAddress ? (
                          <span className="inline-flex items-center gap-1.5 text-[#F5FAF7]/80">
                            <Wallet size={12} className="text-accent" />
                            {a.walletAddress.slice(0, 4)}…{a.walletAddress.slice(-4)}
                          </span>
                        ) : (
                          t("admin.admins.noWallet", lang)
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-[#4A6358] text-xs">{formatDate(a.lastLoginAt, lang)}</td>
                      <td className="px-5 py-3.5">
                        {isSuper && !isSelf && (
                          <div className="flex items-center justify-end gap-2">
                            {a.walletAddress && (
                              <button
                                type="button"
                                disabled={acting}
                                onClick={() => handleUnlinkWallet(a)}
                                title={t("admin.admins.unlinkWallet", lang)}
                                className="p-2 rounded-lg text-[#4A6358] hover:text-[#F5FAF7] hover:bg-white/5 disabled:opacity-50 transition-colors"
                              >
                                <Unlink size={15} />
                              </button>
                            )}
                            <button
                              type="button"
                              disabled={acting}
                              onClick={() => handleRevoke(a)}
                              title={t("admin.admins.revoke", lang)}
                              className="p-2 rounded-lg text-[#4A6358] hover:text-red-400 hover:bg-red-500/10 disabled:opacity-50 transition-colors"
                            >
                              {acting ? <Loader2 size={15} className="animate-spin" /> : <ShieldOff size={15} />}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
