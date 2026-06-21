"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, ShieldCheck, BookOpen, Award, Info } from "lucide-react";

import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { adminRole } from "@/lib/admin/metadata";
import { createClient } from "@/lib/supabase/client";
import { Skeleton } from "@/components/ui/Skeleton";
import { t } from "@/lib/i18n";

interface StatsResponse {
  totalUsers: number;
  totalAdmins: number;
  totalCourses: number;
  totalCertificates: number;
  totalTutors?: number;
  totalStudents?: number;
}

function StatCard({
  icon,
  label,
  value,
  loading,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  loading?: boolean;
}) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex items-center gap-4">
      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-accent shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-heading font-semibold text-[#F5FAF7]">
          {loading ? <Skeleton className="inline-block w-10 h-6" /> : value}
        </p>
        <p className="text-xs text-[#4A6358]">{label}</p>
      </div>
    </div>
  );
}

export default function AdminOverviewPage() {
  const { lang } = useLanguage();
  const { adminUser } = useAdminAuth();
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadStats() {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return;

      try {
        const res = await fetch(`/api/admin/stats?lang=${lang}`, {
          headers: { Authorization: `Bearer ${session.access_token}` },
        });
        if (!res.ok) return;
        const data = (await res.json()) as StatsResponse;
        if (!cancelled) setStats(data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadStats();
    return () => {
      cancelled = true;
    };
  }, [lang]);

  const name = adminUser?.email?.split("@")[0] ?? "";
  const role = adminRole(adminUser);
  const isTutorView = role === "tutor";

  return (
    <div className="max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="font-heading text-2xl md:text-3xl font-semibold text-[#F5FAF7]">
          {t("admin.dashboard.welcome", lang, { name })}
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
      >
        {isTutorView ? (
          <>
            <StatCard
              icon={<BookOpen size={20} />}
              label={t("admin.dashboard.myTotalCourses", lang)}
              value={stats?.totalCourses ?? 0}
              loading={loading}
            />
            <StatCard
              icon={<Users size={20} />}
              label={t("admin.dashboard.totalStudents", lang)}
              value={stats?.totalStudents ?? 0}
              loading={loading}
            />
            <StatCard
              icon={<Award size={20} />}
              label={t("admin.dashboard.myCompletedLessons", lang)}
              value={stats?.totalCertificates ?? 0}
              loading={loading}
            />
            <StatCard
              icon={<Award size={20} />}
              label={t("admin.dashboard.myCertificates", lang)}
              value={stats?.totalCertificates ?? 0}
              loading={loading}
            />
          </>
        ) : (
          <>
            <StatCard
              icon={<Users size={20} />}
              label={t("admin.dashboard.totalUsers", lang)}
              value={stats?.totalUsers ?? 0}
              loading={loading}
            />
            <StatCard
              icon={<ShieldCheck size={20} />}
              label={t("admin.dashboard.totalAdmins", lang)}
              value={stats?.totalAdmins ?? 0}
              loading={loading}
            />
            <StatCard
              icon={<BookOpen size={20} />}
              label={t("admin.dashboard.totalCourses", lang)}
              value={stats?.totalCourses ?? 0}
              loading={loading}
            />
            <StatCard
              icon={<Award size={20} />}
              label={t("admin.dashboard.totalCertificates", lang)}
              value={stats?.totalCertificates ?? 0}
              loading={loading}
            />
          </>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex items-start gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-sm text-[#4A6358]"
      >
        <Info size={16} className="mt-0.5 shrink-0 text-accent" />
        <span>{t("admin.dashboard.liveNote", lang)}</span>
      </motion.div>
    </div>
  );
}
