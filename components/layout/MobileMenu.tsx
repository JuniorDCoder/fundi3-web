"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { LogoFull } from "@/components/brand/Logo";
import { t, type Lang } from "@/lib/i18n";

interface NavLink {
  href: string;
  label: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  lang: Lang;
  toggleLang: () => void;
}

export function MobileMenu({
  isOpen,
  onClose,
  navLinks,
  lang,
  toggleLang,
}: MobileMenuProps) {
  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed inset-0 z-[60] flex flex-col"
          style={{ backgroundColor: "#0A0F0E" }}
        >
          {/* Top bar */}
          <div
            className="flex items-center justify-between px-4 h-14 border-b"
            style={{ borderColor: "#1E2E28" }}
          >
            <LogoFull height={26} />
            <button
              onClick={onClose}
              className="p-2 rounded-lg transition-colors"
              style={{ color: "rgba(245,250,247,0.6)" }}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 flex flex-col px-6 pt-6 overflow-y-auto">
            {navLinks.map(({ href, label }, i) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 + 0.08, ease: "easeOut" }}
              >
                <Link
                  href={href}
                  onClick={onClose}
                  className="flex items-center font-heading font-medium text-2xl py-4 border-b transition-colors"
                  style={{ color: "rgba(245,250,247,0.75)", borderColor: "#1E2E28" }}
                >
                  {label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Bottom actions */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="px-6 pb-12 pt-6 space-y-4"
          >
            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-3 w-full py-3 transition-colors"
              style={{ color: "rgba(245,250,247,0.5)" }}
            >
              <span
                className="font-mono text-xs px-2 py-1 rounded border"
                style={{ borderColor: "#1E2E28", color: "rgba(245,250,247,0.7)" }}
              >
                {lang.toUpperCase()}
              </span>
              <span className="font-body text-sm">
                {lang === "fr" ? "Switch to English" : "Passer en français"}
              </span>
            </button>

            {/* CTA */}
            <Link
              href="/auth/signup"
              onClick={onClose}
              className="flex items-center justify-center w-full py-4 rounded-xl font-heading font-semibold text-lg transition-opacity active:opacity-80"
              style={{ backgroundColor: "#EF9F27", color: "#0A0F0E" }}
            >
              {t("nav.getStarted", lang)}
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
