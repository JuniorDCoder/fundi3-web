"use client";

import { useState, type ComponentPropsWithoutRef } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/prism-light";
import solidity from "react-syntax-highlighter/dist/esm/languages/prism/solidity";
import rust from "react-syntax-highlighter/dist/esm/languages/prism/rust";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import { Check, Copy } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";
import { fundi3CodeTheme } from "./codeTheme";

SyntaxHighlighter.registerLanguage("solidity", solidity);
SyntaxHighlighter.registerLanguage("rust", rust);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("json", json);

const LANGUAGE_LABELS: Record<string, string> = {
  solidity: "Solidity",
  sol: "Solidity",
  rust: "Rust",
  rs: "Rust",
  javascript: "JavaScript",
  js: "JavaScript",
  typescript: "TypeScript",
  ts: "TypeScript",
  jsx: "JSX",
  tsx: "TSX",
  bash: "Bash",
  sh: "Bash",
  shell: "Bash",
  json: "JSON",
};

interface CodeBlockProps {
  language: string;
  code: string;
}

function CodeBlock({ language, code }: CodeBlockProps) {
  const { lang } = useLanguage();
  const [copied, setCopied] = useState(false);
  const label = LANGUAGE_LABELS[language.toLowerCase()] ?? language;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — no-op
    }
  }

  return (
    <div className="not-prose my-5 rounded-xl border overflow-hidden" style={{ borderColor: "#1E2E28" }}>
      <div
        className="flex items-center justify-between gap-2 px-4 py-2 border-b"
        style={{ backgroundColor: "#111915", borderColor: "#1E2E28" }}
      >
        <span className="font-mono text-[11px] uppercase tracking-wide" style={{ color: "#4A6358" }}>
          {label}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 font-body text-xs px-2 py-1 rounded-md transition-colors"
          style={{ color: copied ? "#9FE1CB" : "#4A6358" }}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? t("learn.codeCopied", lang) : t("learn.codeCopy", lang)}
        </button>
      </div>
      <div className="overflow-x-auto" style={{ backgroundColor: "#0A0F0E" }}>
        <SyntaxHighlighter
          language={language.toLowerCase()}
          style={fundi3CodeTheme}
          customStyle={{ margin: 0, padding: "1rem", background: "transparent" }}
          codeTagProps={{ style: { fontFamily: "var(--font-jetbrains-mono), monospace" } }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

type CodeProps = ComponentPropsWithoutRef<"code"> & { node?: unknown };

function CodeRenderer({ className, children }: CodeProps) {
  const match = /language-(\w+)/.exec(className ?? "");
  if (match) {
    const code = String(children).replace(/\n$/, "");
    return <CodeBlock language={match[1]} code={code} />;
  }
  return <code className={className}>{children}</code>;
}

type ImgProps = ComponentPropsWithoutRef<"img"> & { node?: unknown };

function ImgRenderer({ src, alt }: ImgProps) {
  if (!src) return null;
  return (
    <figure
      className="not-prose my-5 rounded-2xl border overflow-hidden"
      style={{ borderColor: "#1E2E28", backgroundColor: "rgba(255,255,255,0.02)" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={typeof src === "string" ? src : undefined} alt={alt ?? ""} loading="lazy" className="w-full h-auto block" />
      {alt && (
        <figcaption className="px-4 py-3 font-body text-xs text-center leading-relaxed" style={{ color: "#4A6358" }}>
          {alt}
        </figcaption>
      )}
    </figure>
  );
}

type AnchorProps = ComponentPropsWithoutRef<"a"> & { node?: unknown };

function LinkRenderer({ href, children }: AnchorProps) {
  const isExternal = typeof href === "string" && /^https?:\/\//.test(href);
  return (
    <a href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined}>
      {children}
    </a>
  );
}

const components: Components = {
  pre: ({ children }) => <>{children}</>,
  code: CodeRenderer,
  img: ImgRenderer,
  a: LinkRenderer,
};

interface LessonMarkdownProps {
  content: string;
  className?: string;
}

/** Renders lesson content as bilingual-friendly markdown — headings, lists, tables,
 * inline code, and brand-themed syntax-highlighted fenced code blocks. */
export function LessonMarkdown({ content, className = "" }: LessonMarkdownProps) {
  return (
    <div className={`lesson-content ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
