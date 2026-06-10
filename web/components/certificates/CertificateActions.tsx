"use client";

import { Download, Share2 } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";

interface CertificateActionsProps {
  certId: string;
  certUrl: string;
  shareTitle: string;
  shareText: string;
}

export function CertificateActions({ certId, certUrl, shareTitle, shareText }: CertificateActionsProps) {
  const { lang } = useLanguage();

  async function handleShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: shareTitle, text: shareText, url: certUrl });
      } catch {
        // user cancelled — no-op
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(certUrl);
      toast.success(t("cert.linkCopied", lang));
    } catch {
      // clipboard unavailable — no-op
    }
  }

  return (
    <>
      <a
        href={`/api/certificates/${certId}/pdf?download=1${lang === "fr" ? "&lang=fr" : ""}`}
        download
        style={{
          fontSize: 14,
          color: "#0A0F0E",
          textDecoration: "none",
          padding: "10px 20px",
          borderRadius: 10,
          background: "#EF9F27",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontWeight: 500,
        }}
      >
        <Download size={14} />
        {t("cert.downloadPdf", lang)}
      </a>
      <button
        type="button"
        onClick={handleShare}
        style={{
          fontSize: 14,
          color: "#F5FAF7",
          textDecoration: "none",
          padding: "10px 20px",
          borderRadius: 10,
          border: "1px solid rgba(255,255,255,0.08)",
          background: "transparent",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          cursor: "pointer",
          fontFamily: "inherit",
        }}
      >
        <Share2 size={14} />
        {t("cert.share", lang)}
      </button>
    </>
  );
}
