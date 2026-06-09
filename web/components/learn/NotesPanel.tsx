"use client";

import { NotebookPen } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useLessonNote } from "@/hooks/useCourseProgress";
import { t } from "@/lib/i18n";

interface NotesPanelProps {
  lessonId: string;
}

const MAX_NOTE_LENGTH = 20_000;

/** A learner's private autosaved scratchpad for the current lesson. */
export function NotesPanel({ lessonId }: NotesPanelProps) {
  const { lang } = useLanguage();
  const { body, setBody, status } = useLessonNote(lessonId);

  return (
    <div
      className="rounded-2xl border p-5 space-y-3"
      style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "#1E2E28" }}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 font-heading font-semibold text-sm" style={{ color: "#F5FAF7" }}>
          <NotebookPen size={16} style={{ color: "#EF9F27" }} />
          {t("learn.notes", lang)}
        </h3>
        {status === "saving" && (
          <span className="font-mono text-[11px]" style={{ color: "#4A6358" }}>
            {t("learn.notesSaving", lang)}
          </span>
        )}
        {status === "saved" && (
          <span className="font-mono text-[11px]" style={{ color: "#1D9E75" }}>
            {t("learn.notesSaved", lang)}
          </span>
        )}
      </div>

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder={t("learn.notesPlaceholder", lang)}
        rows={8}
        maxLength={MAX_NOTE_LENGTH}
        className="w-full resize-y rounded-xl border px-4 py-3 font-body text-sm leading-relaxed outline-none transition-colors focus:border-primary/50"
        style={{ backgroundColor: "rgba(255,255,255,0.02)", borderColor: "#1E2E28", color: "#F5FAF7" }}
      />

      {!body && status !== "saving" && (
        <p className="font-body text-xs" style={{ color: "#4A6358" }}>
          {t("learn.notesEmpty", lang)}
        </p>
      )}
    </div>
  );
}
