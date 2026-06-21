"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  LayoutDashboard,
  ShieldCheck,
  BookOpen,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Wand2,
  Users,
  Activity,
  Wallet,
  Settings,
  GraduationCap,
} from "lucide-react";

import { LogoMark, LogoFull } from "@/components/brand/Logo";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { adminRole, type AdminRole } from "@/lib/admin/metadata";
import { t } from "@/lib/i18n";

interface NavItem {
  href: string;
  labelKey: string;
  icon: typeof LayoutDashboard;
  exact: boolean;
}

function getNavItems(role: AdminRole): NavItem[] {
  const items: NavItem[] = [
    { href: "/admin", labelKey: "admin.nav.dashboard", icon: LayoutDashboard, exact: true },
  ];

  if (role === "tutor") {
    items.push({ href: "/admin/courses", labelKey: "admin.nav.myCourses", icon: BookOpen, exact: false });
    items.push({ href: "/admin/students", labelKey: "admin.nav.myStudents", icon: GraduationCap, exact: false });
  } else {
    items.push({ href: "/admin/users", labelKey: "admin.nav.learners", icon: Users, exact: false });
    items.push({ href: "/admin/courses", labelKey: "admin.nav.courses", icon: BookOpen, exact: false });
    items.push({ href: "/admin/admins", labelKey: "admin.nav.admins", icon: ShieldCheck, exact: false });
    items.push({ href: "/admin/activity", labelKey: "admin.nav.activity", icon: Activity, exact: false });
  }

  items.push({ href: "/admin/wallet", labelKey: "admin.nav.wallet", icon: Wallet, exact: false });

  if (role === "superadmin") {
    items.push({ href: "/admin/settings", labelKey: "admin.nav.settings", icon: Settings, exact: false });
  }

  return items;
}

function isActive(pathname: string, href: string, exact: boolean): boolean {
  return exact ? pathname === href : pathname.startsWith(href);
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { lang } = useLanguage();
  const { adminUser, signOut } = useAdminAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const role = adminRole(adminUser);
  const navItems = getNavItems(role);

  // /admin/login renders its own full-screen layout — skip the shell.
  if (pathname === "/admin/login") return <>{children}</>;

  async function handleSignOut() {
    await signOut();
    toast.success(t("admin.nav.signOut", lang), {
      icon: <Wand2 size={16} className="text-secondary" />,
    });
    router.push("/admin/login");
    router.refresh();
  }

  const navLinks = (onNavigate?: () => void) => (
    <nav className="space-y-1">
      {navItems.map(({ href, labelKey, icon: Icon, exact }) => {
        const active = isActive(pathname, href, exact);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              active
                ? "bg-primary/15 text-[#1D9E75] border border-primary/20"
                : "text-[#4A6358] hover:text-[#F5FAF7] hover:bg-white/5 border border-transparent"
            }`}
          >
            <Icon size={18} className="shrink-0" />
            {t(labelKey, lang)}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:shrink-0 border-r border-white/10 px-4 py-6">
        <Link href="/admin" className="flex items-center gap-2 px-2 mb-8">
          <LogoFull className="h-7 w-auto" />
        </Link>

        {navLinks()}

        <div className="mt-auto space-y-1 pt-6">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#4A6358] hover:text-[#F5FAF7] hover:bg-white/5 transition-colors"
          >
            <ExternalLink size={18} className="shrink-0" />
            {t("admin.nav.viewSite", lang)}
          </a>
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#4A6358] hover:text-red-400 hover:bg-white/5 transition-colors"
          >
            <LogOut size={18} className="shrink-0" />
            {t("admin.nav.signOut", lang)}
          </button>
        </div>
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.2 }}
              className="absolute inset-y-0 left-0 w-72 max-w-[85%] bg-surface border-r border-white/10 px-4 py-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8 px-2">
                <LogoFull className="h-7 w-auto" />
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="text-[#4A6358] hover:text-[#F5FAF7] transition-colors"
                  aria-label={t("admin.nav.closeMenu", lang)}
                >
                  <X size={20} />
                </button>
              </div>

              {navLinks(() => setDrawerOpen(false))}

              <div className="mt-auto space-y-1 pt-6">
                <a
                  href="/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#4A6358] hover:text-[#F5FAF7] hover:bg-white/5 transition-colors"
                >
                  <ExternalLink size={18} className="shrink-0" />
                  {t("admin.nav.viewSite", lang)}
                </a>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#4A6358] hover:text-red-400 hover:bg-white/5 transition-colors"
                >
                  <LogOut size={18} className="shrink-0" />
                  {t("admin.nav.signOut", lang)}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main column */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <header className="flex items-center justify-between gap-4 border-b border-white/10 px-4 md:px-8 h-16 shrink-0">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="md:hidden text-[#4A6358] hover:text-[#F5FAF7] transition-colors"
            aria-label={t("admin.nav.openMenu", lang)}
          >
            <Menu size={22} />
          </button>

          <div className="md:hidden flex items-center gap-2">
            <LogoMark className="h-6 w-6" />
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <div className="w-8 h-8 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center text-xs font-semibold text-[#1D9E75] shrink-0">
              {adminUser?.email?.[0]?.toUpperCase() ?? "A"}
            </div>
            <span className="hidden sm:block text-sm text-[#F5FAF7]/80 truncate max-w-[180px]">
              {adminUser?.email ?? ""}
            </span>
          </div>
        </header>

        <main className="flex-1 px-4 md:px-8 py-8">{children}</main>
      </div>
    </div>
  );
}
