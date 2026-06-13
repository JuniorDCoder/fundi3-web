"use client";

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  useActiveCode,
} from "@codesandbox/sandpack-react";
import type { SandpackTheme } from "@codesandbox/sandpack-react";
import { ExternalLink } from "lucide-react";

import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";
import { slugify } from "@/lib/utils";
import type { CodeLanguage } from "@/lib/courses/types";
import { RemixEmbed, DEFAULT_SOLIDITY_STARTER } from "./RemixEmbed";
import { PushToGitHubButton } from "./PushToGitHubButton";

const fundi3Theme: SandpackTheme = {
  colors: {
    surface1: "#0A0F0E",
    surface2: "#111915",
    surface3: "#1E2E28",
    clickable: "#9FE1CB",
    base: "#F5FAF7",
    disabled: "#4A6358",
    hover: "#1D9E75",
    accent: "#1D9E75",
    error: "#f87171",
    errorSurface: "#451a1a",
  },
  syntax: {
    plain: "#F5FAF7",
    comment: { color: "#4A6358", fontStyle: "italic" },
    keyword: "#1D9E75",
    tag: "#EF9F27",
    punctuation: "#9FE1CB",
    definition: "#FAC775",
    property: "#9FE1CB",
    static: "#EF9F27",
    string: "#FAC775",
  },
  font: {
    body: "Inter, sans-serif",
    mono: "JetBrains Mono, monospace",
    size: "13px",
    lineHeight: "1.5",
  },
};

const DEFAULT_JS_STARTER = `// Karibu! Write your JavaScript here.
console.log("Hello, Fundi3!");
`;

const DEFAULT_TS_STARTER = `// Karibu! Write your TypeScript here.
const message: string = "Hello, Fundi3!";
console.log(message);
`;

const DEFAULT_RUST_STARTER = `// Karibu! This is a starter for a Solana / Anchor program.
use anchor_lang::prelude::*;

declare_id!("11111111111111111111111111111111111111111");

#[program]
pub mod hello_fundi3 {
    use super::*;

    pub fn greet(_ctx: Context<Greet>) -> Result<()> {
        msg!("Hello, Fundi3!");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Greet {}
`;

interface CodePlaygroundProps {
  codeLanguage: CodeLanguage;
  codeStarter: string | null;
  title: string;
}

/** Renders inside SandpackProvider so it can read the learner's live-edited code. */
function JsPushPanel({ entryFile, defaultRepoName }: { entryFile: string; defaultRepoName: string }) {
  const { code } = useActiveCode();
  const path = entryFile.startsWith("/") ? entryFile.slice(1) : entryFile;

  return <PushToGitHubButton getFiles={() => ({ [path]: code })} defaultRepoName={defaultRepoName} />;
}

export function CodePlayground({ codeLanguage, codeStarter, title }: CodePlaygroundProps) {
  const { lang } = useLanguage();
  const slug = slugify(title);

  if (codeLanguage === "solidity") {
    const code = codeStarter && codeStarter.trim() ? codeStarter : DEFAULT_SOLIDITY_STARTER;
    return (
      <div className="space-y-3">
        <RemixEmbed source={codeStarter} title={title} />
        <PushToGitHubButton
          getFiles={() => ({ [`contracts/${slug}.sol`]: code })}
          defaultRepoName={slug}
          note={t("learn.pushSolidityNote", lang)}
        />
      </div>
    );
  }

  if (codeLanguage === "rust") {
    const code = codeStarter && codeStarter.trim() ? codeStarter : DEFAULT_RUST_STARTER;
    return (
      <div className="space-y-3">
        <div
          className="rounded-2xl border bg-white/5 backdrop-blur-md overflow-x-auto"
          style={{ borderColor: "#1E2E28" }}
        >
          <pre className="p-4 font-mono text-xs leading-relaxed" style={{ color: "#F5FAF7" }}>
            <code>{code}</code>
          </pre>
        </div>
        <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(245,250,247,0.7)" }}>
          {t("learn.codePlaygroundRustNote", lang)}
        </p>
        <a
          href="https://beta.solpg.io"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-body font-medium text-sm px-4 py-2.5 rounded-xl border transition-colors hover:border-white/20"
          style={{ borderColor: "#1E2E28", color: "#9FE1CB" }}
        >
          {t("learn.openSolanaPlayground", lang)}
          <ExternalLink size={14} />
        </a>
        <PushToGitHubButton
          getFiles={() => ({ [`programs/${slug}/src/lib.rs`]: code })}
          defaultRepoName={slug}
          note={t("learn.pushRustNote", lang)}
        />
      </div>
    );
  }

  const isTypeScript = codeLanguage === "typescript";
  const entryFile = isTypeScript ? "/index.ts" : "/index.js";
  const defaultStarter = isTypeScript ? DEFAULT_TS_STARTER : DEFAULT_JS_STARTER;

  return (
    <SandpackProvider
      template={isTypeScript ? "vanilla-ts" : "vanilla"}
      theme={fundi3Theme}
      files={{
        [entryFile]: codeStarter && codeStarter.trim() ? codeStarter : defaultStarter,
      }}
      options={{
        activeFile: entryFile,
      }}
    >
      <div className="space-y-3">
        <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "#1E2E28" }}>
          <SandpackLayout>
            <SandpackCodeEditor showLineNumbers showInlineErrors wrapContent style={{ height: 500 }} />
            <SandpackPreview style={{ height: 500 }} />
          </SandpackLayout>
        </div>
        <JsPushPanel entryFile={entryFile} defaultRepoName={slug} />
      </div>
    </SandpackProvider>
  );
}
