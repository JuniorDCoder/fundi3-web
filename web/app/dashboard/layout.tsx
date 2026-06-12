"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Award, User, Settings, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";

const TABS: { href: string; labelKey: string; icon: LucideIcon }[] = [
  { href: "/dashboard", labelKey: "dashboard.navOverview", icon: LayoutDashboard },
  { href: "/dashboard/certificates", labelKey: "dashboard.navCertificates", icon: Award },
  { href: "/dashboard/profile", labelKey: "dashboard.navProfile", icon: User },
  { href: "/dashboard/settings", labelKey: "dashboard.navSettings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { lang } = useLanguage();
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-dark">
      <div className="max-w-5xl mx-auto px-4 pt-24">
        <nav className="flex items-center gap-2 overflow-x-auto pb-6 -mx-1 px-1">
          {TABS.map(({ href, labelKey, icon: Icon }) => {
            const active = href === "/dashboard" ? pathname === href : pathname?.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center gap-2 font-body font-medium text-sm px-4 py-2 rounded-full border whitespace-nowrap transition-colors"
                style={
                  active
                    ? { backgroundColor: "rgba(15,110,86,0.18)", borderColor: "#1D9E75", color: "#9FE1CB" }
                    : { backgroundColor: "rgba(255,255,255,0.03)", borderColor: "#1E2E28", color: "#4A6358" }
                }
              >
                <Icon size={15} />
                {t(labelKey, lang)}
              </Link>
            );
          })}
        </nav>
      </div>
      {children}
    </div>
  );
}
