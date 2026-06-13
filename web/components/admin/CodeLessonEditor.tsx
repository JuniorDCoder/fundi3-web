"use client";

import { t } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";
import { CODE_LANGUAGES, type CodeLanguage } from "@/lib/courses/types";
import { Field, Select, TextArea } from "./CourseEditor";

const CODE_LANGUAGE_LABEL_KEYS: Record<CodeLanguage, string> = {
  javascript: "admin.courses.editor.codeLanguageJavascript",
  typescript: "admin.courses.editor.codeLanguageTypescript",
  solidity: "admin.courses.editor.codeLanguageSolidity",
  rust: "admin.courses.editor.codeLanguageRust",
};

interface CodeLessonEditorProps {
  codeLanguage: CodeLanguage | null;
  codeStarterEn: string;
  codeStarterFr: string;
  onChange: (patch: {
    codeLanguage?: CodeLanguage | null;
    codeStarterEn?: string;
    codeStarterFr?: string;
  }) => void;
  lang: Lang;
}

export function CodeLessonEditor({
  codeLanguage,
  codeStarterEn,
  codeStarterFr,
  onChange,
  lang,
}: CodeLessonEditorProps) {
  return (
    <div className="space-y-3">
      <Field label={t("admin.courses.editor.codeLanguageLabel", lang)}>
        <Select
          value={codeLanguage ?? ""}
          onChange={(e) =>
            onChange({
              codeLanguage: (e.target.value || null) as CodeLanguage | null,
            })
          }
        >
          <option value="" className="bg-surface">
            {t("admin.courses.editor.codeLanguageNone", lang)}
          </option>
          {CODE_LANGUAGES.map((option) => (
            <option key={option} value={option} className="bg-surface">
              {t(CODE_LANGUAGE_LABEL_KEYS[option], lang)}
            </option>
          ))}
        </Select>
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field
          label={t("admin.courses.editor.codeStarterEn", lang)}
          hint={t("admin.courses.editor.codeStarterHint", lang)}
        >
          <TextArea
            rows={10}
            className="font-mono text-xs"
            value={codeStarterEn}
            onChange={(e) => onChange({ codeStarterEn: e.target.value })}
          />
        </Field>
        <Field label={t("admin.courses.editor.codeStarterFr", lang)}>
          <TextArea
            rows={10}
            className="font-mono text-xs"
            value={codeStarterFr}
            onChange={(e) => onChange({ codeStarterFr: e.target.value })}
          />
        </Field>
      </div>
    </div>
  );
}
