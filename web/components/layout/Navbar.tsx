"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu } from "lucide-react";
import { LogoFull } from "@/components/brand/Logo";
import { MobileMenu } from "./MobileMenu";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuth } from "@/hooks/useAuth";
import { isAdminUser } from "@/lib/admin/metadata";
import { isChromeHidden } from "@/lib/layout/chrome";
import { t } from "@/lib/i18n";

const AUTH_PATHS = ["/auth/signup", "/auth/login", "/auth/verify"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, toggleLang } = useLanguage();
  const { user } = useAuth();
  const pathname = usePathname();
  const { scrollY } = useScroll();

  const ctaHref = user ? (isAdminUser(user) ? "/admin" : "/dashboard") : "/auth/signup";
  const ctaLabel = user ? t("nav.dashboard", lang) : t("nav.getStarted", lang);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 10);
  });

  const isAuthPage = AUTH_PATHS.some((p) => pathname?.startsWith(p));

  // /admin, /embed and /connect render their own shells — skip the public navbar entirely.
  if (isChromeHidden(pathname)) return null;

  const navLinks = [
    { href: "/courses", label: t("nav.courses", lang) },
    { href: "/about", label: t("nav.about", lang) },
    { href: "/docs", label: t("nav.docs", lang) },
  ];

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 border-b"
        animate={{
          backgroundColor: scrolled ? "#111915" : "rgba(0,0,0,0)",
          borderColor: scrolled ? "#1E2E28" : "rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14 md:h-16">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0" aria-label="Fundi3 home">
            <LogoFull height={26} />
          </Link>

          {/* Desktop nav links — hidden on auth pages */}
          {!isAuthPage && (
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="font-body text-sm transition-colors hover:text-off-white"
                  style={{ color: "rgba(245,250,247,0.65)" }}
                >
                  {label}
                </Link>
              ))}
            </div>
          )}

          {/* Right side — hidden on auth pages */}
          {!isAuthPage && (
            <div className="flex items-center gap-2">
              {/* Language toggle (desktop only) */}
              <button
                onClick={toggleLang}
                className="hidden md:flex items-center font-mono text-xs px-3 py-1.5 rounded-lg border transition-colors hover:border-white/20"
                style={{
                  color: "rgba(245,250,247,0.5)",
                  borderColor: "rgba(255,255,255,0.08)",
                }}
                aria-label="Toggle language"
              >
                {t("nav.langToggle", lang)}
              </button>

              {/* Sign In link (desktop only, signed-out users) */}
              {!user && (
                <Link
                  href="/auth/login"
                  className="hidden md:flex items-center font-body font-medium text-sm px-4 py-2 rounded-lg border transition-colors hover:border-white/20"
                  style={{
                    borderColor: "rgba(255,255,255,0.08)",
                    color: "rgba(245,250,247,0.85)",
                  }}
                >
                  {t("nav.signIn", lang)}
                </Link>
              )}

              {/* CTA button (desktop only) */}
              <Link
                href={ctaHref}
                className="hidden md:flex items-center font-body font-medium text-sm px-4 py-2 rounded-lg transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#EF9F27", color: "#0A0F0E" }}
              >
                {ctaLabel}
              </Link>

              {/* Hamburger (mobile only) */}
              <button
                onClick={() => setMenuOpen(true)}
                className="md:hidden p-2 rounded-lg transition-colors"
                style={{ color: "rgba(245,250,247,0.7)" }}
                aria-label="Open navigation menu"
              >
                <Menu size={22} />
              </button>
            </div>
          )}
        </nav>
      </motion.header>

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        navLinks={navLinks}
        lang={lang}
        toggleLang={toggleLang}
        ctaHref={ctaHref}
        ctaLabel={ctaLabel}
        signInHref={!user ? "/auth/login" : undefined}
        signInLabel={t("nav.signIn", lang)}
      />
    </>
  );
}
