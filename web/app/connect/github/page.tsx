"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { LogoFull } from "@/components/brand/Logo";
import { GitHubConnectCard } from "@/components/dashboard/GitHubConnectCard";
import { useLanguage } from "@/hooks/useLanguage";
import { createClient } from "@/lib/supabase/client";
import { t } from "@/lib/i18n";

function ConnectGitHubContent() {
  const { lang } = useLanguage();
  const searchParams = useSearchParams();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");

    if (accessToken && refreshToken) {
      const supabase = createClient();
      supabase.auth
        .setSession({ access_token: accessToken, refresh_token: refreshToken })
        .finally(() => setReady(true));
    } else {
      setReady(true);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 gap-8" style={{ backgroundColor: "#0A0F0E" }}>
      <LogoFull height={28} />
      <div className="w-full max-w-md space-y-4">
        <h1 className="font-heading text-xl font-semibold text-center" style={{ color: "#F5FAF7" }}>
          {t("settings.connectedAccountsTitle", lang)}
        </h1>
        {ready && <GitHubConnectCard />}
      </div>
    </div>
  );
}

export default function ConnectGitHubPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ backgroundColor: "#0A0F0E" }} />}>
      <ConnectGitHubContent />
    </Suspense>
  );
}
