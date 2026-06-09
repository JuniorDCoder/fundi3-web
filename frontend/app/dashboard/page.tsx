"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { BookOpen, Trophy, Flame, ArrowRight, LogOut, Wand2 } from "lucide-react";
import { LogoMark } from "@/components/brand/Logo";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex items-center gap-4">
      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-accent shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-heading font-semibold text-[#F5FAF7]">{value}</p>
        <p className="text-xs text-[#4A6358]">{label}</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user, signOut, loading } = useAuth();
  const { lang } = useLanguage();
  const router = useRouter();

  async function handleSignOut() {
    await signOut();

    toast.success(t("toast.signedOut", lang), {
      description: t("toast.signedOutDesc", lang),
      icon: <Wand2 size={16} className="text-secondary" />,
    });

    router.push("/");
    router.refresh();
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      <div className="max-w-5xl mx-auto px-4 pt-24 pb-16">
        {/* Welcome header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-10"
        >
          <div>
            <p className="text-[#4A6358] text-sm mb-1">{t("dashboard.welcome", lang)}</p>
            <h1 className="font-heading text-3xl font-semibold text-[#F5FAF7]">
              {user?.email?.split("@")[0] ?? "Learner"} 👋
            </h1>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-sm text-[#4A6358] hover:text-red-400 transition-colors"
          >
            <LogOut size={16} />
            {t("dashboard.signOut", lang)}
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
        >
          <StatCard icon={<BookOpen size={20} />} label={t("dashboard.coursesEnrolled", lang)} value={0} />
          <StatCard icon={<Trophy size={20} />} label={t("dashboard.certificatesEarned", lang)} value={0} />
          <StatCard icon={<Flame size={20} />} label={t("dashboard.dayStreak", lang)} value={0} />
        </motion.div>

        {/* Start learning CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LogoMark className="w-8 h-8" />
          </div>
          <h2 className="font-heading text-xl font-semibold text-[#F5FAF7] mb-2">
            {t("dashboard.noCoursesTitle", lang)}
          </h2>
          <p className="text-[#4A6358] text-sm mb-6 max-w-sm mx-auto">
            {t("dashboard.noCoursesBody", lang)}
          </p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white
                       font-medium rounded-xl px-6 py-2.5 text-sm transition-colors"
          >
            {t("dashboard.browseCourses", lang)}
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
