"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";
import type { LocalizedQuizQuestion } from "@/lib/courses/types";

const INCORRECT_COLOR = "#EF4444";

interface QuestionState {
  selectedIndex: number | null;
  revealed: boolean;
}

interface QuizBlockProps {
  questions: LocalizedQuizQuestion[];
  onPassed: () => void;
}

export function QuizBlock({ questions, onPassed }: QuizBlockProps) {
  const { lang } = useLanguage();
  const [state, setState] = useState<Record<string, QuestionState>>(() =>
    Object.fromEntries(questions.map((q) => [q.id, { selectedIndex: null, revealed: false }])),
  );
  const passedRef = useRef(false);

  const correctCount = questions.filter((q) => state[q.id]?.selectedIndex === q.correctIndex).length;
  const allCorrect = questions.length > 0 && correctCount === questions.length;

  useEffect(() => {
    if (allCorrect && !passedRef.current) {
      passedRef.current = true;
      onPassed();
    }
  }, [allCorrect, onPassed]);

  function selectOption(questionId: string, index: number) {
    setState((prev) => ({ ...prev, [questionId]: { selectedIndex: index, revealed: true } }));
  }

  function retry(questionId: string) {
    setState((prev) => ({ ...prev, [questionId]: { selectedIndex: null, revealed: false } }));
  }

  return (
    <div className="space-y-4">
      <p className="font-mono text-xs" style={{ color: "#EF9F27" }}>
        {t("learn.quizProgress", lang, { correct: String(correctCount), total: String(questions.length) })}
      </p>

      {questions.map((question, qi) => {
        const qState = state[question.id] ?? { selectedIndex: null, revealed: false };
        const isCorrect = qState.selectedIndex === question.correctIndex;

        return (
          <div
            key={question.id}
            className="rounded-2xl border p-4 space-y-3"
            style={{ borderColor: "#1E2E28", backgroundColor: "rgba(255,255,255,0.03)" }}
          >
            <p className="font-body font-medium text-sm leading-relaxed" style={{ color: "#F5FAF7" }}>
              {qi + 1}. {question.question}
            </p>

            <div className="space-y-2">
              {question.options.map((option, oi) => {
                const isSelected = qState.selectedIndex === oi;
                const isCorrectOption = oi === question.correctIndex;

                let optionStyle: CSSProperties = {
                  borderColor: "rgba(255,255,255,0.1)",
                  backgroundColor: "rgba(255,255,255,0.03)",
                };
                let icon: ReactNode = null;
                let dimmed = false;

                if (qState.revealed) {
                  if (isCorrectOption) {
                    optionStyle = { borderColor: "#1D9E75", backgroundColor: "rgba(29,158,117,0.16)" };
                    icon = <CheckCircle2 size={18} style={{ color: "#1D9E75" }} />;
                  } else if (isSelected) {
                    optionStyle = { borderColor: INCORRECT_COLOR, backgroundColor: "rgba(239,68,68,0.12)" };
                    icon = <XCircle size={18} style={{ color: INCORRECT_COLOR }} />;
                  } else {
                    dimmed = true;
                  }
                }

                return (
                  <button
                    key={oi}
                    type="button"
                    onClick={() => selectOption(question.id, oi)}
                    disabled={qState.revealed}
                    className={`w-full flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left font-body text-sm transition-colors ${
                      dimmed ? "opacity-60" : ""
                    } ${!qState.revealed ? "hover:border-white/20 cursor-pointer" : "cursor-default"}`}
                    style={{ ...optionStyle, color: "#F5FAF7" }}
                  >
                    <span>{option}</span>
                    {icon}
                  </button>
                );
              })}
            </div>

            {qState.revealed && (
              <div className="space-y-2">
                <p
                  className="font-body font-medium text-sm"
                  style={{ color: isCorrect ? "#1D9E75" : INCORRECT_COLOR }}
                >
                  {isCorrect ? t("learn.quizCorrect", lang) : t("learn.quizIncorrect", lang)}
                </p>
                {question.explanation && (
                  <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(245,250,247,0.7)" }}>
                    {question.explanation}
                  </p>
                )}
                {!isCorrect && (
                  <button
                    type="button"
                    onClick={() => retry(question.id)}
                    className="inline-flex items-center gap-2 font-body text-xs font-medium px-3 py-2 rounded-lg border transition-colors hover:border-white/20"
                    style={{ borderColor: "rgba(255,255,255,0.15)", color: "#F5FAF7" }}
                  >
                    <RotateCcw size={14} />
                    {t("learn.quizTryAgain", lang)}
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}

      <div
        className="rounded-xl border px-4 py-3 font-body text-sm leading-relaxed"
        style={
          allCorrect
            ? { borderColor: "#1D9E75", backgroundColor: "rgba(29,158,117,0.14)", color: "#9FE1CB" }
            : { borderColor: "#EF9F27", backgroundColor: "rgba(239,159,39,0.10)", color: "#EF9F27" }
        }
      >
        {allCorrect ? t("learn.quizPassed", lang) : t("learn.quizMustPass", lang)}
      </div>
    </div>
  );
}
