import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import QRCode from "qrcode";
import { ExternalLink, Award, Shield, CheckCircle2 } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";

interface Props {
  params: { certId: string };
}

async function getCertificate(certId: string) {
  const admin = createAdminClient();
  const { data } = await admin
    .from("certificates")
    .select("id, display_name, certificate_pda, solana_tx_sig, issued_at, courses(title_en, title_fr, slug)")
    .eq("id", certId)
    .maybeSingle();
  return data;
}

export async function generateMetadata({ params }: Props) {
  const cert = await getCertificate(params.certId);
  if (!cert) return { title: "Certificate Not Found — Fundi3" };
  const c = cert.courses as unknown;
  const course = (Array.isArray(c) ? c[0] : c) as { title_en: string } | null;
  return {
    title: `${cert.display_name} — ${course?.title_en} Certificate | Fundi3`,
    description: `Verified Web3 certificate issued on Solana by Fundi3.`,
  };
}

export default async function CertificatePage({ params }: Props) {
  const cert = await getCertificate(params.certId);
  if (!cert) notFound();

  const cr = cert.courses as unknown;
  const course = (Array.isArray(cr) ? cr[0] : cr) as { title_en: string; title_fr: string; slug: string } | null;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://fundi3.xyz";
  const certUrl = `${appUrl}/certificate/${cert.id}`;

  const qrDataUrl = await QRCode.toDataURL(certUrl, {
    width: 160,
    margin: 2,
    color: { dark: "#0F6E56", light: "#111915" },
  });

  const issuedDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  }).format(new Date(cert.issued_at));

  const explorerUrl = cert.solana_tx_sig
    ? `https://explorer.solana.com/tx/${cert.solana_tx_sig}?cluster=devnet`
    : cert.certificate_pda
    ? `https://explorer.solana.com/address/${cert.certificate_pda}?cluster=devnet`
    : null;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0A0F0E", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 20px", fontFamily: "Inter, sans-serif" }}>
      {/* Certificate card */}
      <div style={{
        width: "100%", maxWidth: 680,
        background: "linear-gradient(135deg, #111915 0%, #0F6E56 200%)",
        borderRadius: 24, border: "1px solid rgba(255,255,255,0.1)",
        padding: "48px 40px", position: "relative", overflow: "hidden",
      }}>
        {/* Decorative orb */}
        <div style={{ position: "absolute", top: -80, right: -80, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(239,159,39,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(15,110,86,0.3)", border: "1px solid rgba(15,110,86,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Award size={20} color="#1D9E75" />
          </div>
          <div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: 2, textTransform: "uppercase", color: "#1D9E75" }}>Fundi3</div>
            <div style={{ fontSize: 11, color: "#4A6358" }}>Certificate of Completion</div>
          </div>
        </div>

        {/* Body */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: "#4A6358", marginBottom: 8 }}>This certifies that</div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 36, color: "#F5FAF7", lineHeight: 1.2, marginBottom: 20 }}>
            {cert.display_name}
          </div>
          <div style={{ fontSize: 13, color: "#4A6358", marginBottom: 8 }}>has successfully completed</div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 24, color: "#EF9F27", marginBottom: 8 }}>
            {course?.title_en ?? "Web3 Course"}
          </div>
          <div style={{ fontSize: 13, color: "#4A6358" }}>on {issuedDate}</div>
        </div>

        {/* Footer row: QR + verification */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <Shield size={14} color="#1D9E75" />
              <span style={{ fontSize: 12, color: "#1D9E75", fontWeight: 500 }}>
                {cert.certificate_pda ? "Verified on Solana" : "Fundi3 Certified"}
              </span>
            </div>

            {cert.certificate_pda && (
              <div style={{ fontSize: 11, color: "#4A6358", marginBottom: 8, fontFamily: "monospace", wordBreak: "break-all", maxWidth: 340 }}>
                PDA: {cert.certificate_pda.slice(0, 24)}…
              </div>
            )}

            {explorerUrl && (
              <a href={explorerUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "#1D9E75", textDecoration: "none", border: "1px solid rgba(29,158,117,0.3)", borderRadius: 8, padding: "6px 12px" }}>
                <ExternalLink size={12} />
                Verify on Solana Explorer
              </a>
            )}
          </div>

          <div style={{ textAlign: "center" }}>
            <Image src={qrDataUrl} alt="QR code" width={100} height={100} style={{ borderRadius: 8 }} />
            <div style={{ fontSize: 10, color: "#4A6358", marginTop: 4 }}>Scan to verify</div>
          </div>
        </div>

        {/* Certificate ID */}
        <div style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: 10, color: "#4A6358", fontFamily: "monospace" }}>
          ID: {cert.id}
        </div>
      </div>

      {/* Actions */}
      <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/courses" style={{ fontSize: 14, color: "#4A6358", textDecoration: "none", padding: "10px 20px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)" }}>
          ← All Courses
        </Link>
        {explorerUrl && (
          <a href={explorerUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: "#F5FAF7", textDecoration: "none", padding: "10px 20px", borderRadius: 10, background: "#0F6E56", display: "inline-flex", alignItems: "center", gap: 6 }}>
            <CheckCircle2 size={14} />
            View on Solana
          </a>
        )}
      </div>

      <p style={{ marginTop: 24, fontSize: 12, color: "#4A6358", textAlign: "center" }}>
        Built in 🇨🇲 Cameroon. For Africa. &nbsp;·&nbsp; Powered by Solana Devnet
      </p>
    </div>
  );
}
