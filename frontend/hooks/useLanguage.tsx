"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang } from "@/lib/i18n";

const STORAGE_KEY = "fundi3_lang";

function detectDefaultLang(): Lang {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
  if (stored === "en" || stored === "fr") return stored;
  // Default to French only for French-speaking locales — English otherwise.
  return navigator.language.startsWith("fr") ? "fr" : "en";
}

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  hydrated: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * Single source of truth for the FR/EN preference. Mount once at the root —
 * every component reading via useLanguage() shares and re-renders on change.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLangState(detectDefaultLang());
    setHydrated(true);
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
  }

  function toggleLang() {
    setLang(lang === "fr" ? "en" : "fr");
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, hydrated }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a <LanguageProvider>");
  }
  return ctx;
}
