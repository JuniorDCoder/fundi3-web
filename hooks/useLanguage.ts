"use client";

import { useState, useEffect } from "react";
import type { Lang } from "@/lib/i18n";

const STORAGE_KEY = "fundi3_lang";

function detectDefaultLang(): Lang {
  if (typeof window === "undefined") return "fr";
  const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
  if (stored === "en" || stored === "fr") return stored;
  return navigator.language.startsWith("fr") ? "fr" : "en";
}

export function useLanguage() {
  const [lang, setLangState] = useState<Lang>("fr");
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

  return { lang, setLang, toggleLang, hydrated };
}
