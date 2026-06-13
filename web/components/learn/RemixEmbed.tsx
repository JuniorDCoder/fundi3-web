"use client";

export const DEFAULT_SOLIDITY_STARTER = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract HelloFundi3 {
    string public message = "Karibu! Welcome to Solidity.";
}
`;

/** UTF-8-safe base64 — plain btoa() throws on accented French characters. */
export function toBase64Utf8(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

interface RemixEmbedProps {
  source: string | null;
  title: string;
}

export function RemixEmbed({ source, title }: RemixEmbedProps) {
  const code = source && source.trim() ? source : DEFAULT_SOLIDITY_STARTER;
  const encoded = encodeURIComponent(toBase64Utf8(code));
  const src = `https://remix.ethereum.org/?#code=${encoded}&embed=true`;

  return (
    <div
      className="w-full h-[600px] rounded-2xl border overflow-hidden"
      style={{ borderColor: "#1E2E28" }}
    >
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allow="clipboard-write"
        className="w-full h-full"
      />
    </div>
  );
}
