"use client";

import { useCallback, useRef, useState, type DragEvent } from "react";
import { X, Loader2, ImageIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";

interface ImageUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
  folder?: string;
  label?: string;
}

export function ImageUpload({ value, onChange, folder = "general", label }: ImageUploadProps) {
  const { lang } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const upload = useCallback(
    async (file: File) => {
      setError(null);
      setUploading(true);

      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) throw new Error("no_session");

        const form = new FormData();
        form.append("file", file);
        form.append("folder", folder);

        const res = await fetch(`/api/admin/upload?lang=${lang}`, {
          method: "POST",
          headers: { Authorization: `Bearer ${session.access_token}` },
          body: form,
        });

        if (!res.ok) {
          throw new Error(t("admin.upload.error", lang));
        }

        const data = await res.json();
        onChange(data.url);
      } catch (err) {
        setError(err instanceof Error ? err.message : t("admin.upload.error", lang));
      } finally {
        setUploading(false);
      }
    },
    [folder, lang, onChange],
  );

  function handleFile(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError(t("admin.upload.errorInvalidType", lang));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError(t("admin.upload.errorTooLarge", lang));
      return;
    }
    upload(file);
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  }

  return (
    <div>
      {label && (
        <label className="block text-xs font-medium text-[#F5FAF7]/80 mb-1.5">{label}</label>
      )}

      {value ? (
        <div className="relative group rounded-xl overflow-hidden border border-white/10 bg-white/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt=""
            className="w-full h-40 object-cover"
          />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-white/80 hover:text-white hover:bg-black/80 transition-colors opacity-0 group-hover:opacity-100"
            title={t("admin.upload.remove", lang)}
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 cursor-pointer transition-colors ${
            dragOver
              ? "border-primary bg-primary/5"
              : "border-white/10 hover:border-white/20 bg-white/5"
          }`}
        >
          {uploading ? (
            <>
              <Loader2 size={24} className="text-accent animate-spin" />
              <span className="text-xs text-[#4A6358]">{t("admin.upload.uploading", lang)}</span>
            </>
          ) : (
            <>
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <ImageIcon size={20} className="text-[#4A6358]" />
              </div>
              <span className="text-xs text-[#4A6358] text-center">
                {t("admin.upload.dragDrop", lang)}
              </span>
              <span className="text-[10px] text-[#4A6358]/60">
                {t("admin.upload.maxSize", lang)}
              </span>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {error && (
        <p className="mt-1.5 text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}
