"use client";

import { createContext, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

/** UTF-8-safe base64 — plain btoa() throws on accented French characters. */
export function toBase64Utf8(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function buildRemixUrl(code: string): string {
  const encoded = encodeURIComponent(toBase64Utf8(code));
  return `https://remix.ethereum.org/?#code=${encoded}&embed=true`;
}

interface RemixWorkspaceContextValue {
  /** Persistent DOM node that hosts the single Remix iframe — moved between lesson slots without remounting. */
  hostDiv: HTMLDivElement | null;
  /** Loads the given Solidity source into the shared iframe, reusing it if that source is already active. */
  requestSource: (code: string) => void;
  loading: boolean;
}

const RemixWorkspaceContext = createContext<RemixWorkspaceContextValue | null>(null);

/**
 * Provides one Remix IDE iframe shared across every lesson in a course. The iframe
 * lives in a detached DOM node (`hostDiv`) rendered via portal, so `RemixEmbed`
 * slots can move it in and out of the page without destroying/reloading it.
 * Only switching to a lesson with different starter code triggers a reload.
 */
export function RemixWorkspaceProvider({ children }: { children: ReactNode }) {
  const [hostDiv, setHostDiv] = useState<HTMLDivElement | null>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const currentCodeRef = useRef<string | null>(null);

  // Lazily create the host node once, on the client only.
  if (hostDiv === null && typeof document !== "undefined") {
    const node = document.createElement("div");
    node.style.width = "100%";
    node.style.height = "100%";
    setHostDiv(node);
  }

  const value = useMemo<RemixWorkspaceContextValue>(
    () => ({
      hostDiv,
      loading,
      requestSource: (code: string) => {
        if (currentCodeRef.current === code) return;
        currentCodeRef.current = code;
        setSrc(buildRemixUrl(code));
        setLoading(true);
      },
    }),
    [hostDiv, loading],
  );

  return (
    <RemixWorkspaceContext.Provider value={value}>
      {children}
      {hostDiv &&
        src &&
        createPortal(
          <iframe
            src={src}
            title="Remix IDE"
            allow="clipboard-write"
            onLoad={() => setLoading(false)}
            style={{ width: "100%", height: "100%", border: 0 }}
          />,
          hostDiv,
        )}
    </RemixWorkspaceContext.Provider>
  );
}

export function useRemixWorkspace() {
  const ctx = useContext(RemixWorkspaceContext);
  if (!ctx) throw new Error("useRemixWorkspace must be used within RemixWorkspaceProvider");
  return ctx;
}
