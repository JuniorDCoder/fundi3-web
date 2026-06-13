"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ExternalLink, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";
import { GitHubIcon } from "@/components/ui/icons";

interface PushToGitHubButtonProps {
  getFiles: () => Record<string, string>;
  defaultRepoName: string;
  note?: string;
}

export function PushToGitHubButton({ getFiles, defaultRepoName, note }: PushToGitHubButtonProps) {
  const { user } = useAuth();
  const { lang } = useLanguage();

  const [connected, setConnected] = useState<boolean | null>(null);
  const [repoName, setRepoName] = useState(defaultRepoName);
  const [pushing, setPushing] = useState(false);
  const [repoUrl, setRepoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setConnected(false);
      return;
    }
    fetch("/api/github/status")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setConnected(!!data?.connected))
      .catch(() => setConnected(false));
  }, [user]);

  async function handlePush() {
    setPushing(true);
    setRepoUrl(null);
    try {
      const res = await fetch("/api/github/push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          repoName,
          commitMessage: `Update ${repoName} via Fundi3`,
          files: getFiles(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "github_api_error");
      setRepoUrl(data.repoUrl);
      toast.success(t("learn.pushSuccess", lang), {
        icon: <CheckCircle2 size={16} className="text-accent" />,
      });
    } catch {
      toast.error(t("learn.pushError", lang), {
        icon: <AlertCircle size={16} className="text-red-400" />,
      });
    } finally {
      setPushing(false);
    }
  }

  if (connected === null) return null;

  if (!connected) {
    return (
      <div
        className="rounded-xl border px-4 py-3 flex flex-wrap items-center justify-between gap-3"
        style={{ borderColor: "#1E2E28", backgroundColor: "rgba(239,159,39,0.06)" }}
      >
        <p className="font-body text-sm" style={{ color: "#FAC775" }}>
          {t("learn.pushNotConnected", lang)}
        </p>
        <Link
          href="/dashboard/settings"
          className="font-body font-medium text-sm underline shrink-0"
          style={{ color: "#EF9F27" }}
        >
          {t("learn.pushNotConnectedLink", lang)}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {note && (
        <p className="font-body text-xs leading-relaxed" style={{ color: "#4A6358" }}>
          {note}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <input
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
          aria-label={t("learn.pushRepoName", lang)}
          className="font-mono text-xs px-3 py-2 rounded-lg border bg-transparent outline-none transition-colors focus:border-primary"
          style={{ borderColor: "#1E2E28", color: "#F5FAF7" }}
        />
        <button
          type="button"
          onClick={handlePush}
          disabled={pushing || !repoName.trim()}
          className="inline-flex items-center gap-2 font-body font-medium text-sm px-4 py-2 rounded-lg transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: "#EF9F27", color: "#0A0F0E" }}
        >
          {pushing ? <Loader2 size={14} className="animate-spin" /> : <GitHubIcon size={14} />}
          {t("learn.pushToGithub", lang)}
        </button>
        {repoUrl && (
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-body text-sm"
            style={{ color: "#9FE1CB" }}
          >
            {t("learn.pushViewRepo", lang)}
            <ExternalLink size={14} />
          </a>
        )}
      </div>
    </div>
  );
}
