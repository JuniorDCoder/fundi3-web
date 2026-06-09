"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Award, CheckCircle2, ExternalLink, Loader2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";

interface Props {
  courseId: string;
}

type State = "auto_claiming" | "needs_name" | "claiming" | "done" | "error";

export function CertClaimSection({ courseId }: Props) {
  const { lang } = useLanguage();
  const [state, setState] = useState<State>("auto_claiming");
  const [nameInput, setNameInput] = useState("");
  const [nameError, setNameError] = useState("");
  const [certId, setCertId] = useState<string | null>(null);
  const [explorerUrl, setExplorerUrl] = useState<string | null>(null);

  const doClaim = async (displayName?: string) => {
    setState("claiming");
    try {
      const res = await fetch("/api/certificates/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, displayName }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.error === "display_name_required") {
          setState("needs_name");
          return;
        }
        throw new Error(data.error ?? "Failed");
      }

      setCertId(data.certId);
      setExplorerUrl(data.solanaExplorerUrl ?? null);
      setState("done");
      if (!data.alreadyClaimed) {
        toast.success(t("cert.claimSuccess", lang), { description: t("cert.claimSuccessDesc", lang) });
      }
    } catch (err) {
      setState("error");
      toast.error(t("cert.claimError", lang), {
        description: err instanceof Error ? err.message : undefined,
      });
    }
  };

  // Auto-trigger on mount — no button needed
  useEffect(() => {
    const run = async () => {
      try {
        const profileRes = await fetch("/api/user/profile");
        const profileData = await profileRes.json();
        if (profileData.profile?.displayName) {
          await doClaim(profileData.profile.displayName);
        } else {
          setState("needs_name");
        }
      } catch {
        setState("needs_name");
      }
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nameInput.trim();
    if (trimmed.length < 2) { setNameError(t("cert.nameError", lang)); return; }
    setNameError("");
    try {
      const res = await fetch("/api/user/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName: trimmed }),
      });
      if (!res.ok) { setNameError(t("cert.nameErrorSave", lang)); return; }
      await doClaim(trimmed);
    } catch {
      setNameError(t("cert.nameErrorSave", lang));
    }
  };

  const isBusy = state === "auto_claiming" || state === "claiming";

  return (
    <div
      className="rounded-2xl border p-6 space-y-4"
      style={{ backgroundColor: "rgba(239,159,39,0.06)", borderColor: "rgba(239,159,39,0.2)" }}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center"
          style={{ backgroundColor: "rgba(239,159,39,0.15)" }}
        >
          {isBusy ? (
            <Loader2 size={20} className="animate-spin" style={{ color: "#EF9F27" }} />
          ) : state === "done" ? (
            <CheckCircle2 size={20} style={{ color: "#1D9E75" }} />
          ) : (
            <Award size={20} style={{ color: "#EF9F27" }} />
          )}
        </div>
        <div>
          <h3 className="font-heading font-semibold text-lg" style={{ color: "#F5FAF7" }}>
            {state === "done" ? t("cert.claimed", lang) : t("cert.courseCompleteHeadline", lang)}
          </h3>
          <p className="font-body text-sm mt-1 leading-relaxed" style={{ color: "#4A6358" }}>
            {isBusy
              ? t("cert.claiming", lang)
              : state === "done"
              ? t("cert.claimSuccessDesc", lang)
              : state === "needs_name"
              ? t("cert.nameSubtitle", lang)
              : t("cert.courseCompleteSubtext", lang)}
          </p>
        </div>
      </div>

      {state === "done" && certId && (
        <div className="flex flex-wrap gap-3 pl-14">
          <Link
            href={`/certificate/${certId}`}
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border transition-colors"
            style={{ borderColor: "rgba(15,110,86,0.4)", backgroundColor: "rgba(15,110,86,0.12)", color: "#1D9E75" }}
          >
            {t("cert.viewCertificate", lang)} →
          </Link>
          {explorerUrl && (
            <a
              href={explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border transition-colors"
              style={{ borderColor: "#1E2E28", color: "#4A6358" }}
            >
              <ExternalLink size={12} />
              {t("cert.viewOnSolana", lang)}
            </a>
          )}
        </div>
      )}

      {state === "needs_name" && (
        <form onSubmit={handleNameSubmit} className="pl-14 space-y-3">
          <div className="space-y-1">
            <label className="font-body text-sm font-medium" style={{ color: "#F5FAF7" }}>
              {t("cert.nameLabel", lang)}
            </label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => { setNameInput(e.target.value); setNameError(""); }}
              placeholder={t("cert.namePlaceholder", lang)}
              className="w-full max-w-sm rounded-xl border px-4 py-2.5 font-body text-sm bg-transparent outline-none focus:border-primary transition-colors"
              style={{ borderColor: nameError ? "#ef4444" : "#1E2E28", color: "#F5FAF7" }}
              autoFocus
            />
            {nameError && <p className="text-xs" style={{ color: "#ef4444" }}>{nameError}</p>}
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-xl transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#0F6E56", color: "#F5FAF7" }}
          >
            {t("cert.nameSave", lang)}
          </button>
        </form>
      )}

      {state === "error" && (
        <div className="pl-14">
          <button
            onClick={() => { setState("auto_claiming"); doClaim(); }}
            className="text-sm font-medium underline"
            style={{ color: "#EF9F27" }}
          >
            {t("common.retry", lang)}
          </button>
        </div>
      )}
    </div>
  );
}
