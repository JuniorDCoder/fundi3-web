"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { createClient } from "@/lib/supabase/client";
import { t } from "@/lib/i18n";
import { GitHubIcon } from "@/components/ui/icons";

interface GitHubStatus {
  connected: boolean;
  username: string | null;
}

export function GitHubConnectCard() {
  const { user } = useAuth();
  const { lang } = useLanguage();

  const [status, setStatus] = useState<GitHubStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    fetch("/api/github/status")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) setStatus(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  async function handleConnect() {
    setBusy(true);
    const supabase = createClient();
    const { error } = await supabase.auth.linkIdentity({
      provider: "github",
      options: {
        scopes: "repo read:user user:email",
        redirectTo: `${window.location.origin}/auth/github/callback`,
      },
    });
    if (error) {
      setBusy(false);
      toast.error(t("settings.githubConnectError", lang), {
        icon: <AlertCircle size={16} className="text-red-400" />,
      });
    }
    // On success, Supabase redirects the browser to GitHub — no further action needed here.
  }

  async function handleDisconnect() {
    setBusy(true);
    try {
      const res = await fetch("/api/github/disconnect", { method: "POST" });
      if (!res.ok) throw new Error();
      setStatus({ connected: false, username: null });
      toast.success(t("settings.githubDisconnected", lang), {
        icon: <CheckCircle2 size={16} className="text-accent" />,
      });
    } catch {
      toast.error(t("settings.githubDisconnectError", lang), {
        icon: <AlertCircle size={16} className="text-red-400" />,
      });
    } finally {
      setBusy(false);
    }
  }

  if (loading) return null;

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex items-center gap-4">
      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-accent shrink-0">
        <GitHubIcon size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-body font-medium text-sm" style={{ color: "#F5FAF7" }}>
          {t("settings.githubTitle", lang)}
        </p>
        <p className="font-body text-xs mt-0.5" style={{ color: "#4A6358" }}>
          {status?.connected
            ? t("settings.githubConnectedAs", lang, { username: status.username ?? "" })
            : t("settings.githubHint", lang)}
        </p>
      </div>
      {status?.connected ? (
        <button
          type="button"
          onClick={handleDisconnect}
          disabled={busy}
          className="font-body font-medium text-sm px-4 py-2 rounded-lg border transition-colors hover:border-white/20 disabled:opacity-50 shrink-0"
          style={{ borderColor: "#1E2E28", color: "#F5FAF7" }}
        >
          {t("settings.githubDisconnect", lang)}
        </button>
      ) : (
        <button
          type="button"
          onClick={handleConnect}
          disabled={busy}
          className="font-body font-medium text-sm px-4 py-2 rounded-lg transition-opacity hover:opacity-90 disabled:opacity-50 shrink-0"
          style={{ backgroundColor: "#EF9F27", color: "#0A0F0E" }}
        >
          {t("settings.githubConnect", lang)}
        </button>
      )}
    </div>
  );
}
