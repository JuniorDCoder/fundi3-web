"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { CodeXml } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";
import { Skeleton } from "@/components/ui/Skeleton";
import { useRemixWorkspace } from "./RemixWorkspace";

export const DEFAULT_SOLIDITY_STARTER = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract HelloFundi3 {
    string public message = "Karibu! Welcome to Solidity.";
}
`;

interface RemixEmbedProps {
  source: string | null;
  title: string;
}

export function RemixEmbed({ source, title }: RemixEmbedProps) {
  const { lang } = useLanguage();
  const { hostDiv, requestSource, loading } = useRemixWorkspace();
  const slotRef = useRef<HTMLDivElement>(null);

  // Move the shared iframe into this lesson's slot. useLayoutEffect runs
  // synchronously right after the previous slot is removed from the DOM,
  // so the iframe is reparented within the same paint — no detach period
  // long enough for the browser to discard its browsing context (reload).
  useLayoutEffect(() => {
    const slot = slotRef.current;
    if (!slot || !hostDiv) return;
    slot.appendChild(hostDiv);
  }, [hostDiv]);

  useEffect(() => {
    const code = source && source.trim() ? source : DEFAULT_SOLIDITY_STARTER;
    requestSource(code);
  }, [source, requestSource]);

  return (
    <div className="space-y-2">
      <div
        className="relative w-full h-[600px] rounded-2xl border overflow-hidden"
        style={{ borderColor: "#1E2E28" }}
        aria-label={title}
      >
        <div ref={slotRef} className="w-full h-full" />
        {loading && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            style={{ backgroundColor: "#0A0F0E" }}
          >
            <Skeleton className="absolute inset-0 rounded-none" />
            <span
              className="relative z-10 flex items-center justify-center w-10 h-10 rounded-xl"
              style={{ backgroundColor: "rgba(29,158,117,0.12)" }}
            >
              <CodeXml size={18} style={{ color: "#1D9E75" }} />
            </span>
            <p className="relative z-10 font-body text-sm" style={{ color: "rgba(245,250,247,0.75)" }}>
              {t("learn.remixLoading", lang)}
            </p>
          </div>
        )}
      </div>
      <p className="font-body text-xs" style={{ color: "#4A6358" }}>
        {t("learn.remixShared", lang)}
      </p>
    </div>
  );
}
