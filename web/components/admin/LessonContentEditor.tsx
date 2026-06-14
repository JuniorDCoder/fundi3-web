"use client";

import { useState } from "react";
import { Code2, Eye } from "lucide-react";
import { LessonMarkdown } from "@/components/learn/LessonMarkdown";
import { t, type Lang } from "@/lib/i18n";
import { Field, TextArea } from "./CourseEditor";

interface LessonContentEditorProps {
  contentEn: string;
  contentFr: string;
  onChange: (patch: { contentEn?: string; contentFr?: string }) => void;
  lang: Lang;
}

export function LessonContentEditor({ contentEn, contentFr, onChange, lang }: LessonContentEditorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <ContentField
        label={t("admin.courses.editor.lessonContentEn", lang)}
        value={contentEn}
        onChange={(value) => onChange({ contentEn: value })}
        lang={lang}
      />
      <ContentField
        label={t("admin.courses.editor.lessonContentFr", lang)}
        value={contentFr}
        onChange={(value) => onChange({ contentFr: value })}
        lang={lang}
      />
    </div>
  );
}

function ContentField({
  label,
  value,
  onChange,
  lang,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  lang: Lang;
}) {
  const [tab, setTab] = useState<"write" | "preview">("write");

  return (
    <Field label={label} hint={t("admin.courses.editor.contentMarkdownHint", lang)}>
      <div className="flex items-center gap-1 mb-2">
        <TabButton
          active={tab === "write"}
          onClick={() => setTab("write")}
          icon={Code2}
          label={t("admin.courses.editor.contentWrite", lang)}
        />
        <TabButton
          active={tab === "preview"}
          onClick={() => setTab("preview")}
          icon={Eye}
          label={t("admin.courses.editor.contentPreview", lang)}
        />
      </div>

      {tab === "write" ? (
        <TextArea rows={10} className="font-mono text-xs" value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <div
          className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 max-h-80 overflow-y-auto"
          style={{ minHeight: "12.5rem" }}
        >
          {value.trim() ? (
            <LessonMarkdown content={value} />
          ) : (
            <p className="text-xs" style={{ color: "#4A6358" }}>
              {t("admin.courses.editor.contentPreviewEmpty", lang)}
            </p>
          )}
        </div>
      )}
    </Field>
  );
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof Code2;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 font-body text-xs px-2.5 py-1 rounded-lg transition-colors"
      style={
        active
          ? { backgroundColor: "rgba(15,110,86,0.16)", color: "#9FE1CB" }
          : { backgroundColor: "transparent", color: "#4A6358" }
      }
    >
      <Icon size={12} />
      {label}
    </button>
  );
}
