"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, Search, ChevronDown } from "lucide-react";

import { useLanguage } from "@/hooks/useLanguage";
import { authedFetch } from "@/lib/admin/api-client";
import { t } from "@/lib/i18n";

interface UserResult {
  id: string;
  email: string;
  role: string;
}

interface UserSearchComboboxProps {
  value: string;
  onChange: (email: string) => void;
}

export function UserSearchCombobox({ value, onChange }: UserSearchComboboxProps) {
  const { lang } = useLanguage();
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<UserResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const search = useCallback(
    async (q: string) => {
      if (q.length < 2) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const res = await authedFetch(`/api/admin/users/search?q=${encodeURIComponent(q)}&lang=${lang}`, lang, {
          method: "GET",
          body: undefined,
        });
        if (!res.ok) return;
        const data = await res.json();
        setResults(data.users ?? []);
      } finally {
        setLoading(false);
      }
    },
    [lang],
  );

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(query), 300);
    return () => clearTimeout(debounceRef.current);
  }, [query, search]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function selectUser(user: UserResult) {
    setQuery(user.email);
    onChange(user.email);
    setOpen(false);
  }

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A6358]" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={t("admin.admins.searchPlaceholder", lang)}
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-8 py-2.5 text-sm
                     text-[#F5FAF7] placeholder-[#4A6358]
                     focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
        />
        {loading ? (
          <Loader2 size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A6358] animate-spin" />
        ) : (
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A6358]" />
        )}
      </div>

      {open && query.length >= 2 && (
        <div className="absolute z-50 mt-1 w-full bg-surface border border-white/10 rounded-xl shadow-xl max-h-48 overflow-y-auto">
          {loading ? (
            <div className="p-3 text-center text-xs text-[#4A6358]">
              {t("admin.admins.searchLoading", lang)}
            </div>
          ) : results.length === 0 ? (
            <div className="p-3 text-center text-xs text-[#4A6358]">
              {t("admin.admins.searchNoResults", lang)}
            </div>
          ) : (
            results.map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => selectUser(u)}
                className="w-full text-left px-3 py-2.5 text-sm text-[#F5FAF7] hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <span className="truncate">{u.email}</span>
                {u.role !== "learner" && (
                  <span className="ml-2 text-[10px] text-[#4A6358] uppercase shrink-0">{u.role}</span>
                )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
