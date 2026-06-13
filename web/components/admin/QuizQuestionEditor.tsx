"use client";

import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";

import { t } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";
import type { DbQuizQuestion, QuizQuestionInput } from "@/lib/courses/types";
import { Field, TextInput, TextArea, IconButton, nextKey } from "./CourseEditor";

export interface EditorQuizQuestion extends QuizQuestionInput {
  key: string;
}

const MIN_OPTIONS = 2;
const MAX_OPTIONS = 6;

export function emptyQuizQuestion(): EditorQuizQuestion {
  return {
    key: nextKey("quiz"),
    questionEn: "",
    questionFr: "",
    optionsEn: ["", ""],
    optionsFr: ["", ""],
    correctIndex: 0,
    explanationEn: "",
    explanationFr: "",
    position: 0,
  };
}

export function quizQuestionFromDb(question: DbQuizQuestion): EditorQuizQuestion {
  return {
    key: nextKey("quiz"),
    id: question.id,
    questionEn: question.questionEn,
    questionFr: question.questionFr,
    optionsEn: question.optionsEn.length ? [...question.optionsEn] : ["", ""],
    optionsFr: question.optionsFr.length ? [...question.optionsFr] : ["", ""],
    correctIndex: question.correctIndex,
    explanationEn: question.explanationEn,
    explanationFr: question.explanationFr,
    position: question.position,
  };
}

interface QuizQuestionEditorProps {
  questions: EditorQuizQuestion[];
  onChange: (questions: EditorQuizQuestion[]) => void;
  lang: Lang;
}

export function QuizQuestionEditor({ questions, onChange, lang }: QuizQuestionEditorProps) {
  function update(key: string, partial: Partial<EditorQuizQuestion>) {
    onChange(
      questions.map((question) =>
        question.key === key ? { ...question, ...partial } : question,
      ),
    );
  }

  function addQuestion() {
    onChange([...questions, emptyQuizQuestion()]);
  }

  function removeQuestion(key: string) {
    onChange(questions.filter((question) => question.key !== key));
  }

  function moveQuestion(key: string, direction: -1 | 1) {
    const index = questions.findIndex((question) => question.key === key);
    const target = index + direction;
    if (index < 0 || target < 0 || target >= questions.length) return;
    const next = [...questions];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  function updateOption(
    key: string,
    field: "optionsEn" | "optionsFr",
    index: number,
    value: string,
  ) {
    const question = questions.find((q) => q.key === key);
    if (!question) return;
    const options = [...question[field]];
    options[index] = value;
    update(key, { [field]: options } as Partial<EditorQuizQuestion>);
  }

  function addOption(key: string) {
    const question = questions.find((q) => q.key === key);
    if (!question || question.optionsEn.length >= MAX_OPTIONS) return;
    update(key, {
      optionsEn: [...question.optionsEn, ""],
      optionsFr: [...question.optionsFr, ""],
    });
  }

  function removeOption(key: string, index: number) {
    const question = questions.find((q) => q.key === key);
    if (!question || question.optionsEn.length <= MIN_OPTIONS) return;
    const optionsEn = question.optionsEn.filter((_, i) => i !== index);
    const optionsFr = question.optionsFr.filter((_, i) => i !== index);
    let correctIndex = question.correctIndex;
    if (correctIndex === index) correctIndex = 0;
    else if (correctIndex > index) correctIndex -= 1;
    update(key, { optionsEn, optionsFr, correctIndex });
  }

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-medium text-[#F5FAF7]/80">
        {t("admin.courses.editor.quizQuestions", lang)}
      </h3>

      {questions.map((question, qi) => (
        <div
          key={question.key}
          className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-[#4A6358]">Q{qi + 1}</span>
            <div className="flex items-center gap-0.5">
              <IconButton
                onClick={() => moveQuestion(question.key, -1)}
                disabled={qi === 0}
                title={t("admin.courses.editor.moveUp", lang)}
              >
                <ChevronUp size={14} />
              </IconButton>
              <IconButton
                onClick={() => moveQuestion(question.key, 1)}
                disabled={qi === questions.length - 1}
                title={t("admin.courses.editor.moveDown", lang)}
              >
                <ChevronDown size={14} />
              </IconButton>
              <IconButton
                onClick={() => removeQuestion(question.key)}
                title={t("admin.courses.editor.quizRemoveQuestion", lang)}
                variant="danger"
              >
                <Trash2 size={14} />
              </IconButton>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label={t("admin.courses.editor.quizQuestionEn", lang)}>
              <TextArea
                rows={2}
                value={question.questionEn}
                onChange={(e) => update(question.key, { questionEn: e.target.value })}
              />
            </Field>
            <Field label={t("admin.courses.editor.quizQuestionFr", lang)}>
              <TextArea
                rows={2}
                value={question.questionFr}
                onChange={(e) => update(question.key, { questionFr: e.target.value })}
              />
            </Field>
          </div>

          <div className="space-y-2">
            {question.optionsEn.map((_, oi) => (
              <div
                key={oi}
                className="grid grid-cols-[auto_1fr_1fr_auto] gap-2 items-center"
              >
                <input
                  type="radio"
                  name={`correct-${question.key}`}
                  checked={question.correctIndex === oi}
                  onChange={() => update(question.key, { correctIndex: oi })}
                  title={t("admin.courses.editor.quizCorrectAnswer", lang)}
                  className="w-4 h-4 accent-[#1D9E75]"
                />
                <TextInput
                  placeholder={t("admin.courses.editor.quizOptionEn", lang, {
                    index: String(oi + 1),
                  })}
                  value={question.optionsEn[oi]}
                  onChange={(e) =>
                    updateOption(question.key, "optionsEn", oi, e.target.value)
                  }
                />
                <TextInput
                  placeholder={t("admin.courses.editor.quizOptionFr", lang, {
                    index: String(oi + 1),
                  })}
                  value={question.optionsFr[oi]}
                  onChange={(e) =>
                    updateOption(question.key, "optionsFr", oi, e.target.value)
                  }
                />
                <IconButton
                  onClick={() => removeOption(question.key, oi)}
                  disabled={question.optionsEn.length <= MIN_OPTIONS}
                  title={t("admin.courses.editor.quizRemoveOption", lang)}
                  variant="danger"
                >
                  <Trash2 size={14} />
                </IconButton>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addOption(question.key)}
              disabled={question.optionsEn.length >= MAX_OPTIONS}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1D9E75] hover:text-[#9FE1CB] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <Plus size={14} />
              {t("admin.courses.editor.quizAddOption", lang)}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label={t("admin.courses.editor.quizExplanationEn", lang)}>
              <TextArea
                rows={2}
                value={question.explanationEn}
                onChange={(e) => update(question.key, { explanationEn: e.target.value })}
              />
            </Field>
            <Field label={t("admin.courses.editor.quizExplanationFr", lang)}>
              <TextArea
                rows={2}
                value={question.explanationFr}
                onChange={(e) => update(question.key, { explanationFr: e.target.value })}
              />
            </Field>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addQuestion}
        className="inline-flex items-center gap-2 text-xs font-medium px-4 py-2.5 rounded-xl border border-dashed border-white/15 text-[#4A6358] hover:text-[#F5FAF7] hover:border-white/30 transition-colors"
      >
        <Plus size={14} />
        {t("admin.courses.editor.quizAddQuestion", lang)}
      </button>
    </div>
  );
}
