"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award, ArrowLeft, ExternalLink, ChevronRight, Download } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuth } from "@/hooks/useAuth";
import { t, type Lang } from "@/lib/i18n";
import { Skeleton } from "@/components/ui/Skeleton";

interface CertItem {
  id: string;
  courseNameEn: string;
  courseNameFr: string;
  courseSlug: string;
  displayName: string;
  certificatePda: string | null;
  solanaExplorerUrl: string | null;
  issuedAt: string;
  certUrl: string;
}

export default function CertificatesPage() {
  const { lang } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const [certs, setCerts] = useState<CertItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    fetch("/api/certificates")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => { setCerts(data?.certificates ?? []); })
      .catch(() => { setCerts([]); })
      .finally(() => setLoading(false));
  }, [user]);

  if (authLoading) return <CertificatesLoading />;

  return (
    <div className="max-w-4xl mx-auto px-4 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm mb-5 transition-colors"
          style={{ color: "#4A6358" }}
        >
          <ArrowLeft size={14} />
          {t("dashboard.welcome", lang)}
        </Link>
        <h1 className="font-heading text-3xl font-semibold" style={{ color: "#F5FAF7" }}>
          {t("dashboard.certificates", lang)}
        </h1>
        <p className="font-body text-sm mt-1" style={{ color: "#4A6358" }}>
          {loading ? "" : certs.length === 0
            ? "Complete a course to earn your first NFT certificate."
            : `${certs.length} certificate${certs.length !== 1 ? "s" : ""} earned`}
        </p>
      </motion.div>

      {loading && (
        <div className="space-y-4">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-2xl" />
          ))}
        </div>
      )}

      {!loading && certs.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border p-10 text-center"
          style={{ borderColor: "#1E2E28", backgroundColor: "rgba(255,255,255,0.02)" }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: "rgba(239,159,39,0.1)" }}
          >
            <Award size={26} style={{ color: "#EF9F27" }} />
          </div>
          <p className="font-heading font-semibold text-lg mb-2" style={{ color: "#F5FAF7" }}>
            No certificates yet
          </p>
          <p className="font-body text-sm mb-6" style={{ color: "#4A6358" }}>
            Finish all lessons in a course to earn a verified NFT certificate on Solana.
          </p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-xl transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: "#0F6E56", color: "#F5FAF7" }}
          >
            Browse Courses
            <ChevronRight size={14} />
          </Link>
        </motion.div>
      )}

      {!loading && certs.length > 0 && (
        <div className="space-y-4">
          {certs.map((cert, i) => (
            <CertRow key={cert.id} cert={cert} delay={0.04 * i} lang={lang} />
          ))}
        </div>
      )}
    </div>
  );
}

function CertRow({ cert, delay, lang }: { cert: CertItem; delay: number; lang: Lang }) {
  const courseName = lang === "fr" ? cert.courseNameFr || cert.courseNameEn : cert.courseNameEn;
  const issued = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(cert.issuedAt));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="rounded-2xl border p-5 flex items-center gap-5"
      style={{ borderColor: "rgba(239,159,39,0.18)", backgroundColor: "rgba(239,159,39,0.04)" }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: "rgba(239,159,39,0.12)" }}
      >
        <Award size={22} style={{ color: "#EF9F27" }} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-heading font-semibold text-base truncate" style={{ color: "#F5FAF7" }}>
          {courseName}
        </p>
        <p className="font-body text-xs mt-0.5" style={{ color: "#4A6358" }}>
          Issued to {cert.displayName} · {issued}
        </p>
        {cert.certificatePda && (
          <p className="font-mono text-[10px] mt-1 truncate" style={{ color: "#1E2E28" }}>
            {cert.certificatePda}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Link
          href={cert.certUrl}
          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg transition-colors"
          style={{ backgroundColor: "rgba(15,110,86,0.14)", color: "#1D9E75" }}
        >
          View
        </Link>
        <a
          href={`/api/certificates/${cert.id}/pdf?download=1${lang === "fr" ? "&lang=fr" : ""}`}
          download
          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg transition-colors"
          style={{ backgroundColor: "rgba(239,159,39,0.14)", color: "#EF9F27" }}
        >
          <Download size={12} />
          {t("cert.downloadPdf", lang)}
        </a>
        {cert.solanaExplorerUrl && (
          <a
            href={cert.solanaExplorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs px-3 py-2 rounded-lg transition-colors"
            style={{ backgroundColor: "rgba(255,255,255,0.04)", color: "#4A6358" }}
          >
            <ExternalLink size={10} />
            Solana
          </a>
        )}
      </div>
    </motion.div>
  );
}

function CertificatesLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 pb-16 space-y-4">
      <Skeleton className="h-10 w-56 rounded-xl" />
      {[0, 1, 2].map((i) => (
        <Skeleton key={i} className="h-24 w-full rounded-2xl" />
      ))}
    </div>
  );
}
