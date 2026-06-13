"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Loader2,
  AlertCircle,
  Save,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Layers,
  BookOpen,
  Sparkles,
} from "lucide-react";

import { useLanguage } from "@/hooks/useLanguage";
import { authedFetch, type ApiError } from "@/lib/admin/api-client";
import { t } from "@/lib/i18n";
import {
  COURSE_LANGUAGE_MODES,
  COURSE_LEVELS,
  COURSE_STATUSES,
  LESSON_TYPES,
  levelBadgeKey,
  type CodeLanguage,
  type CourseLanguageMode,
  type CourseLevel,
  type CourseStatus,
  type CourseTreeInput,
  type DbCourse,
  type LessonType,
} from "@/lib/courses/types";
import {
  QuizQuestionEditor,
  quizQuestionFromDb,
  type EditorQuizQuestion,
} from "./QuizQuestionEditor";
import { CodeLessonEditor } from "./CodeLessonEditor";

let keyCounter = 0;
export function nextKey(prefix: string): string {
  keyCounter += 1;
  return `${prefix}-${keyCounter}`;
}

interface EditorLesson {
  key: string;
  id?: string;
  titleEn: string;
  titleFr: string;
  durationLabel: string;
  lessonType: LessonType;
  contentEn: string;
  contentFr: string;
  videoUrl: string;
  codeLanguage: CodeLanguage | null;
  codeStarterEn: string;
  codeStarterFr: string;
  quizQuestions: EditorQuizQuestion[];
}

interface EditorModule {
  key: string;
  id?: string;
  titleEn: string;
  titleFr: string;
  lessons: EditorLesson[];
}

function emptyLesson(): EditorLesson {
  return {
    key: nextKey("lesson"),
    titleEn: "",
    titleFr: "",
    durationLabel: "",
    lessonType: "text",
    contentEn: "",
    contentFr: "",
    videoUrl: "",
    codeLanguage: null,
    codeStarterEn: "",
    codeStarterFr: "",
    quizQuestions: [],
  };
}

function emptyModule(): EditorModule {
  return {
    key: nextKey("module"),
    titleEn: "",
    titleFr: "",
    lessons: [emptyLesson()],
  };
}

function fromDbCourse(course: DbCourse): {
  slug: string;
  titleEn: string;
  titleFr: string;
  descriptionEn: string;
  descriptionFr: string;
  longDescriptionEn: string;
  longDescriptionFr: string;
  level: CourseLevel;
  language: CourseLanguageMode;
  status: CourseStatus;
  isFree: boolean;
  priceUsd: string;
  isAfrican: boolean;
  durationLabel: string;
  gradientFrom: string;
  gradientTo: string;
  thumbnailUrl: string;
  tagsText: string;
  outcomesEnText: string;
  outcomesFrText: string;
  modules: EditorModule[];
} {
  return {
    slug: course.slug,
    titleEn: course.titleEn,
    titleFr: course.titleFr,
    descriptionEn: course.descriptionEn,
    descriptionFr: course.descriptionFr,
    longDescriptionEn: course.longDescriptionEn,
    longDescriptionFr: course.longDescriptionFr,
    level: course.level,
    language: course.language,
    status: course.status,
    isFree: course.isFree,
    priceUsd: course.priceUsd !== null ? String(course.priceUsd) : "",
    isAfrican: course.isAfrican,
    durationLabel: course.durationLabel,
    gradientFrom: course.gradientFrom,
    gradientTo: course.gradientTo,
    thumbnailUrl: course.thumbnailUrl ?? "",
    tagsText: course.tags.join(", "),
    outcomesEnText: course.outcomesEn.join("\n"),
    outcomesFrText: course.outcomesFr.join("\n"),
    modules:
      course.modules.length > 0
        ? course.modules.map((module) => ({
            key: nextKey("module"),
            id: module.id,
            titleEn: module.titleEn,
            titleFr: module.titleFr,
            lessons:
              module.lessons.length > 0
                ? module.lessons.map((lesson) => ({
                    key: nextKey("lesson"),
                    id: lesson.id,
                    titleEn: lesson.titleEn,
                    titleFr: lesson.titleFr,
                    durationLabel: lesson.durationLabel,
                    lessonType: lesson.lessonType,
                    contentEn: lesson.contentEn,
                    contentFr: lesson.contentFr,
                    videoUrl: lesson.videoUrl ?? "",
                    codeLanguage: lesson.codeLanguage,
                    codeStarterEn: lesson.codeStarterEn ?? "",
                    codeStarterFr: lesson.codeStarterFr ?? "",
                    quizQuestions: lesson.quizQuestions.map(quizQuestionFromDb),
                  }))
                : [emptyLesson()],
          }))
        : [emptyModule()],
  };
}

function emptyForm() {
  return {
    slug: "",
    titleEn: "",
    titleFr: "",
    descriptionEn: "",
    descriptionFr: "",
    longDescriptionEn: "",
    longDescriptionFr: "",
    level: "beginner" as CourseLevel,
    language: "both" as CourseLanguageMode,
    status: "draft" as CourseStatus,
    isFree: true,
    priceUsd: "",
    isAfrican: false,
    durationLabel: "",
    gradientFrom: "#0F6E56",
    gradientTo: "#1D9E75",
    thumbnailUrl: "",
    tagsText: "",
    outcomesEnText: "",
    outcomesFrText: "",
    modules: [emptyModule()],
  };
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function splitLines(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function splitTags(value: string): string[] {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

// ─── Shared field primitives ──────────────────────────────────────────────────

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-[#F5FAF7]/80 mb-1.5">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-[#4A6358]">{hint}</p>}
    </div>
  );
}

const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-[#F5FAF7] placeholder-[#4A6358] " +
  "focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input {...props} className={`${inputClass} ${props.className ?? ""}`} />
  );
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`${inputClass} resize-y ${props.className ?? ""}`}
    />
  );
}

export function Select(
  props: React.SelectHTMLAttributes<HTMLSelectElement> & {
    children: React.ReactNode;
  },
) {
  return (
    <select {...props} className={`${inputClass} ${props.className ?? ""}`}>
      {props.children}
    </select>
  );
}

function SectionCard({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Layers;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-5">
      <h2 className="font-heading text-lg font-semibold text-[#F5FAF7] flex items-center gap-2">
        <Icon size={18} className="text-accent" />
        {title}
      </h2>
      {children}
    </div>
  );
}

export function IconButton({
  onClick,
  disabled,
  title,
  variant = "default",
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  title: string;
  variant?: "default" | "danger";
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
        variant === "danger"
          ? "text-[#4A6358] hover:text-red-400 hover:bg-red-500/10"
          : "text-[#4A6358] hover:text-[#F5FAF7] hover:bg-white/5"
      }`}
    >
      {children}
    </button>
  );
}

// ─── Main editor ──────────────────────────────────────────────────────────────

interface CourseEditorProps {
  mode: "create" | "edit";
  course?: DbCourse;
}

export function CourseEditor({ mode, course }: CourseEditorProps) {
  const { lang } = useLanguage();
  const router = useRouter();

  const [form, setForm] = useState(() =>
    course ? fromDbCourse(course) : emptyForm(),
  );
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  function patch(partial: Partial<ReturnType<typeof emptyForm>>) {
    setForm((prev) => ({ ...prev, ...partial }));
  }

  function handleTitleEnChange(value: string) {
    setForm((prev) => ({
      ...prev,
      titleEn: value,
      slug: slugTouched ? prev.slug : slugify(value),
    }));
  }

  // ─ Modules / lessons ─

  function addModule() {
    setForm((prev) => ({ ...prev, modules: [...prev.modules, emptyModule()] }));
  }

  function removeModule(moduleKey: string) {
    setForm((prev) => ({
      ...prev,
      modules: prev.modules.filter((m) => m.key !== moduleKey),
    }));
  }

  function moveModule(moduleKey: string, direction: -1 | 1) {
    setForm((prev) => {
      const index = prev.modules.findIndex((m) => m.key === moduleKey);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= prev.modules.length) return prev;
      const modules = [...prev.modules];
      [modules[index], modules[target]] = [modules[target], modules[index]];
      return { ...prev, modules };
    });
  }

  function updateModule(moduleKey: string, partial: Partial<EditorModule>) {
    setForm((prev) => ({
      ...prev,
      modules: prev.modules.map((m) =>
        m.key === moduleKey ? { ...m, ...partial } : m,
      ),
    }));
  }

  function addLesson(moduleKey: string) {
    setForm((prev) => ({
      ...prev,
      modules: prev.modules.map((m) =>
        m.key === moduleKey
          ? { ...m, lessons: [...m.lessons, emptyLesson()] }
          : m,
      ),
    }));
  }

  function removeLesson(moduleKey: string, lessonKey: string) {
    setForm((prev) => ({
      ...prev,
      modules: prev.modules.map((m) =>
        m.key === moduleKey
          ? { ...m, lessons: m.lessons.filter((l) => l.key !== lessonKey) }
          : m,
      ),
    }));
  }

  function moveLesson(moduleKey: string, lessonKey: string, direction: -1 | 1) {
    setForm((prev) => ({
      ...prev,
      modules: prev.modules.map((m) => {
        if (m.key !== moduleKey) return m;
        const index = m.lessons.findIndex((l) => l.key === lessonKey);
        const target = index + direction;
        if (index < 0 || target < 0 || target >= m.lessons.length) return m;
        const lessons = [...m.lessons];
        [lessons[index], lessons[target]] = [lessons[target], lessons[index]];
        return { ...m, lessons };
      }),
    }));
  }

  function updateLesson(
    moduleKey: string,
    lessonKey: string,
    partial: Partial<EditorLesson>,
  ) {
    setForm((prev) => ({
      ...prev,
      modules: prev.modules.map((m) =>
        m.key !== moduleKey
          ? m
          : {
              ...m,
              lessons: m.lessons.map((l) =>
                l.key === lessonKey ? { ...l, ...partial } : l,
              ),
            },
      ),
    }));
  }

  const lessonTypeLabels: Record<LessonType, string> = useMemo(
    () => ({
      video: t("admin.courses.editor.lessonTypeVideo", lang),
      text: t("admin.courses.editor.lessonTypeText", lang),
      code: t("admin.courses.editor.lessonTypeCode", lang),
      quiz: t("admin.courses.editor.lessonTypeQuiz", lang),
    }),
    [lang],
  );

  const languageModeLabels: Record<CourseLanguageMode, string> = useMemo(
    () => ({
      en: t("admin.courses.editor.languageEn", lang),
      fr: t("admin.courses.editor.languageFr", lang),
      both: t("admin.courses.editor.languageBoth", lang),
    }),
    [lang],
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);

    const slug = slugify(form.slug);
    if (!slug) {
      setFormError(t("admin.courses.editor.errorSlug", lang));
      return;
    }
    if (!form.titleEn.trim() || !form.titleFr.trim()) {
      setFormError(t("admin.courses.editor.errorTitle", lang));
      return;
    }
    if (!form.descriptionEn.trim() || !form.descriptionFr.trim()) {
      setFormError(t("admin.courses.editor.errorDescription", lang));
      return;
    }
    if (
      !form.isFree &&
      (!form.priceUsd.trim() ||
        Number.isNaN(Number(form.priceUsd)) ||
        Number(form.priceUsd) < 0)
    ) {
      setFormError(t("admin.courses.editor.errorPrice", lang));
      return;
    }
    for (const courseModule of form.modules) {
      if (!courseModule.titleEn.trim() || !courseModule.titleFr.trim()) {
        setFormError(t("admin.courses.editor.errorModule", lang));
        return;
      }
      for (const lesson of courseModule.lessons) {
        if (!lesson.titleEn.trim() || !lesson.titleFr.trim()) {
          setFormError(t("admin.courses.editor.errorLesson", lang));
          return;
        }
      }
    }

    const payload: CourseTreeInput & { lang: string } = {
      id: course?.id,
      slug,
      titleEn: form.titleEn.trim(),
      titleFr: form.titleFr.trim(),
      descriptionEn: form.descriptionEn.trim(),
      descriptionFr: form.descriptionFr.trim(),
      longDescriptionEn: form.longDescriptionEn.trim(),
      longDescriptionFr: form.longDescriptionFr.trim(),
      level: form.level,
      language: form.language,
      status: form.status,
      isFree: form.isFree,
      priceUsd: form.isFree ? null : Number(form.priceUsd),
      isAfrican: form.isAfrican,
      durationLabel: form.durationLabel.trim(),
      gradientFrom: form.gradientFrom,
      gradientTo: form.gradientTo,
      thumbnailUrl: form.thumbnailUrl.trim() || null,
      tags: splitTags(form.tagsText),
      outcomesEn: splitLines(form.outcomesEnText),
      outcomesFr: splitLines(form.outcomesFrText),
      position: course?.position ?? 0,
      modules: form.modules.map((module, mi) => ({
        id: module.id,
        titleEn: module.titleEn.trim(),
        titleFr: module.titleFr.trim(),
        position: mi,
        lessons: module.lessons.map((lesson, li) => ({
          id: lesson.id,
          titleEn: lesson.titleEn.trim(),
          titleFr: lesson.titleFr.trim(),
          durationLabel: lesson.durationLabel.trim(),
          lessonType: lesson.lessonType,
          contentEn: lesson.contentEn,
          contentFr: lesson.contentFr,
          videoUrl: lesson.videoUrl.trim() || null,
          codeLanguage: lesson.codeLanguage,
          codeStarterEn: lesson.codeStarterEn,
          codeStarterFr: lesson.codeStarterFr,
          position: li,
          quizQuestions: lesson.quizQuestions.map((q, qi) => ({
            id: q.id,
            questionEn: q.questionEn.trim(),
            questionFr: q.questionFr.trim(),
            optionsEn: q.optionsEn.map((s) => s.trim()).filter(Boolean),
            optionsFr: q.optionsFr.map((s) => s.trim()).filter(Boolean),
            correctIndex: q.correctIndex,
            explanationEn: q.explanationEn.trim(),
            explanationFr: q.explanationFr.trim(),
            position: qi,
          })),
        })),
      })),
      lang,
    };

    setSubmitting(true);
    try {
      const url =
        mode === "create"
          ? "/api/admin/courses"
          : `/api/admin/courses/${course!.id}`;
      const method = mode === "create" ? "POST" : "PUT";
      const res = await authedFetch(url, lang, {
        method,
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (!res.ok) {
        setFormError(
          (json as ApiError).message ??
            t("admin.courses.editor.saveFailed", lang),
        );
        setSubmitting(false);
        return;
      }

      toast.success(
        mode === "create"
          ? t("admin.courses.editor.created", lang)
          : t("admin.courses.editor.saved", lang),
        { icon: <Sparkles size={16} className="text-accent" /> },
      );
      router.push("/admin/courses");
      router.refresh();
    } catch {
      setFormError(t("admin.courses.editor.saveFailed", lang));
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-6 pb-16">
      {/* Basics */}
      <SectionCard
        icon={BookOpen}
        title={t("admin.courses.editor.sectionBasics", lang)}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label={t("admin.courses.editor.titleEnLabel", lang)}>
            <TextInput
              required
              value={form.titleEn}
              onChange={(e) => handleTitleEnChange(e.target.value)}
            />
          </Field>
          <Field label={t("admin.courses.editor.titleFrLabel", lang)}>
            <TextInput
              required
              value={form.titleFr}
              onChange={(e) => patch({ titleFr: e.target.value })}
            />
          </Field>
        </div>

        <Field
          label={t("admin.courses.editor.slugLabel", lang)}
          hint={t("admin.courses.editor.slugHint", lang)}
        >
          <TextInput
            required
            value={form.slug}
            onChange={(e) => {
              setSlugTouched(true);
              patch({ slug: e.target.value });
            }}
            className="font-mono"
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label={t("admin.courses.editor.descEnLabel", lang)}>
            <TextArea
              required
              rows={2}
              value={form.descriptionEn}
              onChange={(e) => patch({ descriptionEn: e.target.value })}
            />
          </Field>
          <Field label={t("admin.courses.editor.descFrLabel", lang)}>
            <TextArea
              required
              rows={2}
              value={form.descriptionFr}
              onChange={(e) => patch({ descriptionFr: e.target.value })}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label={t("admin.courses.editor.longDescEnLabel", lang)}>
            <TextArea
              rows={4}
              value={form.longDescriptionEn}
              onChange={(e) => patch({ longDescriptionEn: e.target.value })}
            />
          </Field>
          <Field label={t("admin.courses.editor.longDescFrLabel", lang)}>
            <TextArea
              rows={4}
              value={form.longDescriptionFr}
              onChange={(e) => patch({ longDescriptionFr: e.target.value })}
            />
          </Field>
        </div>
      </SectionCard>

      {/* Classification + pricing */}
      <SectionCard
        icon={Sparkles}
        title={t("admin.courses.editor.sectionClassification", lang)}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label={t("admin.courses.editor.levelLabel", lang)}>
            <Select
              value={form.level}
              onChange={(e) => patch({ level: e.target.value as CourseLevel })}
            >
              {COURSE_LEVELS.map((level) => (
                <option key={level} value={level} className="bg-surface">
                  {t(levelBadgeKey(level), lang)}
                </option>
              ))}
            </Select>
          </Field>
          <Field label={t("admin.courses.editor.languageLabel", lang)}>
            <Select
              value={form.language}
              onChange={(e) =>
                patch({ language: e.target.value as CourseLanguageMode })
              }
            >
              {COURSE_LANGUAGE_MODES.map((mode) => (
                <option key={mode} value={mode} className="bg-surface">
                  {languageModeLabels[mode]}
                </option>
              ))}
            </Select>
          </Field>
          <Field label={t("admin.courses.editor.statusLabel", lang)}>
            <Select
              value={form.status}
              onChange={(e) =>
                patch({ status: e.target.value as CourseStatus })
              }
            >
              {COURSE_STATUSES.map((status) => (
                <option key={status} value={status} className="bg-surface">
                  {t(`admin.courses.status.${status}`, lang)}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        <label className="flex items-center gap-2.5 cursor-pointer w-fit">
          <input
            type="checkbox"
            checked={form.isAfrican}
            onChange={(e) => patch({ isAfrican: e.target.checked })}
            className="w-4 h-4 rounded border-white/20 bg-white/5 accent-[#EF9F27]"
          />
          <span className="text-sm text-[#F5FAF7]/80">
            {t("admin.courses.editor.africanLabel", lang)}
          </span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <label className="flex items-center gap-2.5 cursor-pointer w-fit">
            <input
              type="checkbox"
              checked={form.isFree}
              onChange={(e) =>
                patch({
                  isFree: e.target.checked,
                  priceUsd: e.target.checked ? "" : form.priceUsd,
                })
              }
              className="w-4 h-4 rounded border-white/20 bg-white/5 accent-[#1D9E75]"
            />
            <span className="text-sm text-[#F5FAF7]/80">
              {t("admin.courses.editor.freeLabel", lang)}
            </span>
          </label>

          {!form.isFree && (
            <Field label={t("admin.courses.editor.priceLabel", lang)}>
              <TextInput
                type="number"
                min="0"
                step="0.01"
                value={form.priceUsd}
                onChange={(e) => patch({ priceUsd: e.target.value })}
              />
            </Field>
          )}

          <Field label={t("admin.courses.editor.durationLabel", lang)}>
            <TextInput
              placeholder="2h 30m"
              value={form.durationLabel}
              onChange={(e) => patch({ durationLabel: e.target.value })}
            />
          </Field>
        </div>
      </SectionCard>

      {/* Display */}
      <SectionCard
        icon={Layers}
        title={t("admin.courses.editor.sectionDisplay", lang)}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label={t("admin.courses.editor.gradientFromLabel", lang)}>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={form.gradientFrom}
                onChange={(e) => patch({ gradientFrom: e.target.value })}
                className="w-10 h-10 rounded-lg border border-white/10 bg-transparent cursor-pointer"
              />
              <TextInput
                value={form.gradientFrom}
                onChange={(e) => patch({ gradientFrom: e.target.value })}
                className="font-mono"
              />
            </div>
          </Field>
          <Field label={t("admin.courses.editor.gradientToLabel", lang)}>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={form.gradientTo}
                onChange={(e) => patch({ gradientTo: e.target.value })}
                className="w-10 h-10 rounded-lg border border-white/10 bg-transparent cursor-pointer"
              />
              <TextInput
                value={form.gradientTo}
                onChange={(e) => patch({ gradientTo: e.target.value })}
                className="font-mono"
              />
            </div>
          </Field>
        </div>

        <div
          className="h-20 rounded-xl border border-white/10"
          style={{
            background: `linear-gradient(135deg, ${form.gradientFrom}, ${form.gradientTo})`,
          }}
        />

        <Field label={t("admin.courses.editor.thumbnailLabel", lang)}>
          <TextInput
            type="url"
            placeholder="https://…"
            value={form.thumbnailUrl}
            onChange={(e) => patch({ thumbnailUrl: e.target.value })}
          />
        </Field>

        <Field
          label={t("admin.courses.editor.tagsLabel", lang)}
          hint={t("admin.courses.editor.tagsHint", lang)}
        >
          <TextInput
            value={form.tagsText}
            onChange={(e) => patch({ tagsText: e.target.value })}
          />
        </Field>
      </SectionCard>

      {/* Outcomes */}
      <SectionCard
        icon={Sparkles}
        title={t("admin.courses.editor.sectionOutcomes", lang)}
      >
        <p className="text-xs text-[#4A6358] -mt-2">
          {t("admin.courses.editor.outcomesHint", lang)}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label={t("admin.courses.editor.outcomesEnLabel", lang)}>
            <TextArea
              rows={4}
              value={form.outcomesEnText}
              onChange={(e) => patch({ outcomesEnText: e.target.value })}
            />
          </Field>
          <Field label={t("admin.courses.editor.outcomesFrLabel", lang)}>
            <TextArea
              rows={4}
              value={form.outcomesFrText}
              onChange={(e) => patch({ outcomesFrText: e.target.value })}
            />
          </Field>
        </div>
      </SectionCard>

      {/* Curriculum */}
      <SectionCard
        icon={Layers}
        title={t("admin.courses.editor.sectionCurriculum", lang)}
      >
        <div className="space-y-5">
          {form.modules.map((module, mi) => (
            <div
              key={module.key}
              className="rounded-xl border border-white/10 overflow-hidden"
            >
              <div className="flex items-center gap-3 px-4 py-3 bg-white/[0.03] border-b border-white/10">
                <span className="font-mono text-xs font-medium w-6 h-6 rounded-full flex items-center justify-center shrink-0 bg-primary/15 text-[#9FE1CB]">
                  {mi + 1}
                </span>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <TextInput
                    placeholder={t("admin.courses.editor.moduleTitleEn", lang)}
                    value={module.titleEn}
                    onChange={(e) =>
                      updateModule(module.key, { titleEn: e.target.value })
                    }
                  />
                  <TextInput
                    placeholder={t("admin.courses.editor.moduleTitleFr", lang)}
                    value={module.titleFr}
                    onChange={(e) =>
                      updateModule(module.key, { titleFr: e.target.value })
                    }
                  />
                </div>
                <div className="flex items-center gap-0.5 shrink-0">
                  <IconButton
                    onClick={() => moveModule(module.key, -1)}
                    disabled={mi === 0}
                    title={t("admin.courses.editor.moveUp", lang)}
                  >
                    <ChevronUp size={15} />
                  </IconButton>
                  <IconButton
                    onClick={() => moveModule(module.key, 1)}
                    disabled={mi === form.modules.length - 1}
                    title={t("admin.courses.editor.moveDown", lang)}
                  >
                    <ChevronDown size={15} />
                  </IconButton>
                  <IconButton
                    onClick={() => removeModule(module.key)}
                    disabled={form.modules.length === 1}
                    title={t("admin.courses.editor.removeModule", lang)}
                    variant="danger"
                  >
                    <Trash2 size={15} />
                  </IconButton>
                </div>
              </div>

              <div className="divide-y divide-white/5">
                {module.lessons.map((lesson, li) => (
                  <div key={lesson.key} className="p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-xs text-[#4A6358] mt-2.5 shrink-0">
                        {String(mi + 1).padStart(2, "0")}.
                        {String(li + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <TextInput
                          placeholder={t(
                            "admin.courses.editor.lessonTitleEn",
                            lang,
                          )}
                          value={lesson.titleEn}
                          onChange={(e) =>
                            updateLesson(module.key, lesson.key, {
                              titleEn: e.target.value,
                            })
                          }
                        />
                        <TextInput
                          placeholder={t(
                            "admin.courses.editor.lessonTitleFr",
                            lang,
                          )}
                          value={lesson.titleFr}
                          onChange={(e) =>
                            updateLesson(module.key, lesson.key, {
                              titleFr: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center gap-0.5 shrink-0">
                        <IconButton
                          onClick={() => moveLesson(module.key, lesson.key, -1)}
                          disabled={li === 0}
                          title={t("admin.courses.editor.moveUp", lang)}
                        >
                          <ChevronUp size={14} />
                        </IconButton>
                        <IconButton
                          onClick={() => moveLesson(module.key, lesson.key, 1)}
                          disabled={li === module.lessons.length - 1}
                          title={t("admin.courses.editor.moveDown", lang)}
                        >
                          <ChevronDown size={14} />
                        </IconButton>
                        <IconButton
                          onClick={() => removeLesson(module.key, lesson.key)}
                          disabled={module.lessons.length === 1}
                          title={t("admin.courses.editor.removeLesson", lang)}
                          variant="danger"
                        >
                          <Trash2 size={14} />
                        </IconButton>
                      </div>
                    </div>

                    <div className="pl-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Field label={t("admin.courses.editor.lessonType", lang)}>
                        <Select
                          value={lesson.lessonType}
                          onChange={(e) =>
                            updateLesson(module.key, lesson.key, {
                              lessonType: e.target.value as LessonType,
                            })
                          }
                        >
                          {LESSON_TYPES.map((type) => (
                            <option
                              key={type}
                              value={type}
                              className="bg-surface"
                            >
                              {lessonTypeLabels[type]}
                            </option>
                          ))}
                        </Select>
                      </Field>
                      <Field
                        label={t("admin.courses.editor.lessonDuration", lang)}
                      >
                        <TextInput
                          placeholder="10 min"
                          value={lesson.durationLabel}
                          onChange={(e) =>
                            updateLesson(module.key, lesson.key, {
                              durationLabel: e.target.value,
                            })
                          }
                        />
                      </Field>
                    </div>

                    {lesson.lessonType === "video" && (
                      <div className="pl-7">
                        <Field
                          label={t("admin.courses.editor.lessonVideoUrl", lang)}
                        >
                          <TextInput
                            type="url"
                            placeholder="https://…"
                            value={lesson.videoUrl}
                            onChange={(e) =>
                              updateLesson(module.key, lesson.key, {
                                videoUrl: e.target.value,
                              })
                            }
                          />
                        </Field>
                      </div>
                    )}

                    {lesson.lessonType === "code" && (
                      <div className="pl-7">
                        <CodeLessonEditor
                          codeLanguage={lesson.codeLanguage}
                          codeStarterEn={lesson.codeStarterEn}
                          codeStarterFr={lesson.codeStarterFr}
                          onChange={(patch) =>
                            updateLesson(module.key, lesson.key, patch)
                          }
                          lang={lang}
                        />
                      </div>
                    )}

                    <div className="pl-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Field
                        label={t("admin.courses.editor.lessonContentEn", lang)}
                      >
                        <TextArea
                          rows={3}
                          value={lesson.contentEn}
                          onChange={(e) =>
                            updateLesson(module.key, lesson.key, {
                              contentEn: e.target.value,
                            })
                          }
                        />
                      </Field>
                      <Field
                        label={t("admin.courses.editor.lessonContentFr", lang)}
                      >
                        <TextArea
                          rows={3}
                          value={lesson.contentFr}
                          onChange={(e) =>
                            updateLesson(module.key, lesson.key, {
                              contentFr: e.target.value,
                            })
                          }
                        />
                      </Field>
                    </div>

                    {lesson.lessonType === "quiz" && (
                      <div className="pl-7">
                        <QuizQuestionEditor
                          questions={lesson.quizQuestions}
                          onChange={(quizQuestions) =>
                            updateLesson(module.key, lesson.key, {
                              quizQuestions,
                            })
                          }
                          lang={lang}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-3 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => addLesson(module.key)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1D9E75] hover:text-[#9FE1CB] transition-colors"
                >
                  <Plus size={14} />
                  {t("admin.courses.editor.addLesson", lang)}
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addModule}
          className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-xl border border-dashed border-white/15 text-[#4A6358] hover:text-[#F5FAF7] hover:border-white/30 transition-colors"
        >
          <Plus size={16} />
          {t("admin.courses.editor.addModule", lang)}
        </button>
      </SectionCard>

      {/* Submit */}
      {formError && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-sm text-red-400"
        >
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>{formError}</span>
        </motion.div>
      )}

      <div className="flex items-center justify-end gap-3 sticky bottom-4">
        <button
          type="submit"
          disabled={submitting}
          className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed
                     text-white font-medium rounded-xl px-6 py-3 text-sm
                     flex items-center justify-center gap-2 transition-colors shadow-lg shadow-black/30"
        >
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              {t("admin.courses.editor.saving", lang)}
            </>
          ) : (
            <>
              <Save size={16} />
              {t("admin.courses.editor.save", lang)}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
