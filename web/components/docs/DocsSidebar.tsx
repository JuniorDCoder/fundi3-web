"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Lock } from "lucide-react";
import { sidebarNav, type NavSection } from "@/lib/docs/content";
import type { Lang } from "@/lib/i18n";

interface Props {
  lang: Lang;
  onNavigate?: () => void;
}

export function DocsSidebar({ lang, onNavigate }: Props) {
  return (
    <nav className="space-y-1">
      {sidebarNav.map((section) => (
        <SidebarSection
          key={section.title}
          section={section}
          lang={lang}
          onNavigate={onNavigate}
        />
      ))}
    </nav>
  );
}

function SidebarSection({
  section,
  lang,
  onNavigate,
}: {
  section: NavSection;
  lang: Lang;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const isActive = section.items.some((i) => pathname === `/docs/${i.slug}`);
  const [open, setOpen] = useState(isActive || section.items.some((i) => i.available));

  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full px-2 py-2 rounded-lg group transition-colors hover:bg-white/5"
      >
        <span
          className="font-body font-medium text-xs tracking-wide uppercase"
          style={{ color: "rgba(245,250,247,0.35)" }}
        >
          {lang === "fr" ? section.titleFr : section.title}
        </span>
        <motion.span
          animate={{ rotate: open ? 0 : -90 }}
          transition={{ duration: 0.2 }}
          style={{ color: "rgba(245,250,247,0.2)" }}
        >
          <ChevronDown size={13} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden pl-2 mt-1 space-y-0.5"
          >
            {section.items.map((item) => (
              <SidebarItem
                key={item.slug}
                slug={item.slug}
                label={lang === "fr" ? item.labelFr : item.label}
                available={item.available}
                onNavigate={onNavigate}
              />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function SidebarItem({
  slug,
  label,
  available,
  onNavigate,
}: {
  slug: string;
  label: string;
  available: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === `/docs/${slug}`;

  if (!available) {
    return (
      <li
        className="flex items-center justify-between px-3 py-2 rounded-lg cursor-default"
        title="Coming soon"
      >
        <span className="font-body text-sm" style={{ color: "rgba(245,250,247,0.2)" }}>
          {label}
        </span>
        <Lock size={11} style={{ color: "rgba(245,250,247,0.15)" }} />
      </li>
    );
  }

  return (
    <li>
      <Link
        href={`/docs/${slug}`}
        onClick={onNavigate}
        className="flex items-center px-3 py-2 rounded-lg text-sm transition-colors font-body"
        style={{
          backgroundColor: isActive ? "rgba(15,110,86,0.15)" : "transparent",
          color: isActive ? "#1D9E75" : "rgba(245,250,247,0.6)",
          borderLeft: isActive ? "2px solid #0F6E56" : "2px solid transparent",
        }}
      >
        {label}
      </Link>
    </li>
  );
}
