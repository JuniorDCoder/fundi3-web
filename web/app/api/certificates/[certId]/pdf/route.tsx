import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";
import { renderToBuffer } from "@react-pdf/renderer";
import { createAdminClient } from "@/lib/supabase/admin";
import { CertificatePDF } from "@/lib/certificates/pdf";

export const runtime = "nodejs";

interface RouteParams {
  params: { certId: string };
}

// GET /api/certificates/:certId/pdf — public, generates a downloadable PDF certificate.
// ?download=1 forces a "Save As" dialog; otherwise the PDF opens inline (browser preview + native share).
// ?lang=fr selects the French course title.
export async function GET(request: NextRequest, { params }: RouteParams) {
  const admin = createAdminClient();

  const { data: cert, error } = await admin
    .from("certificates")
    .select(
      `id, display_name, certificate_pda, solana_tx_sig, issued_at,
       courses (title_en, title_fr, slug)`,
    )
    .eq("id", params.certId)
    .maybeSingle();

  if (error) return NextResponse.json({ error: "server_error" }, { status: 500 });
  if (!cert) return NextResponse.json({ error: "not_found" }, { status: 404 });

  const coursesRaw = cert.courses as unknown;
  const course = (Array.isArray(coursesRaw) ? coursesRaw[0] : coursesRaw) as
    | { title_en: string; title_fr: string; slug: string }
    | null;

  const lang = request.nextUrl.searchParams.get("lang") === "fr" ? "fr" : "en";
  const courseName =
    (lang === "fr" ? course?.title_fr || course?.title_en : course?.title_en) ?? "Web3 Course";

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://fundi3.xyz";
  const verifyUrl = `${appUrl}/certificate/${cert.id}`;
  const siteHost = new URL(appUrl).host;

  const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
    width: 240,
    margin: 1,
    color: { dark: "#0A0F0E", light: "#FFFFFF" },
  });

  const pdfBuffer = await renderToBuffer(
    <CertificatePDF
      displayName={cert.display_name}
      courseName={courseName}
      issuedAt={cert.issued_at}
      certId={cert.id}
      certificatePda={cert.certificate_pda ?? null}
      qrDataUrl={qrDataUrl}
      verifyUrl={verifyUrl}
      siteHost={siteHost}
    />,
  );

  const download = request.nextUrl.searchParams.get("download") === "1";

  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${download ? "attachment" : "inline"}; filename="fundi3-certificate-${cert.id}.pdf"`,
      "Cache-Control": "private, max-age=0, no-cache",
    },
  });
}
