import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

interface RouteParams {
  params: { certId: string };
}

// GET /api/certificates/:certId — public, used by the verify page
export async function GET(_request: NextRequest, { params }: RouteParams) {
  const admin = createAdminClient();

  const { data, error } = await admin
    .from("certificates")
    .select(
      `id, display_name, certificate_pda, solana_tx_sig, issued_at,
       courses (title_en, title_fr, slug)`,
    )
    .eq("id", params.certId)
    .maybeSingle();

  if (error) return NextResponse.json({ error: "server_error" }, { status: 500 });
  if (!data) return NextResponse.json({ error: "not_found" }, { status: 404 });

  const coursesRaw = data.courses as unknown;
  const course = (Array.isArray(coursesRaw) ? coursesRaw[0] : coursesRaw) as
    | { title_en: string; title_fr: string; slug: string }
    | null;

  return NextResponse.json({
    id: data.id,
    displayName: data.display_name,
    courseNameEn: course?.title_en ?? "",
    courseNameFr: course?.title_fr ?? "",
    courseSlug: course?.slug ?? "",
    certificatePda: data.certificate_pda ?? null,
    solanaExplorerUrl: data.solana_tx_sig
      ? `https://explorer.solana.com/tx/${data.solana_tx_sig}?cluster=devnet`
      : null,
    issuedAt: data.issued_at,
  });
}
