import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/supabase/get-user";
import { createAdminClient } from "@/lib/supabase/admin";

// GET /api/certificates — list the current user's earned certificates
export async function GET(request: NextRequest) {
  const user = await getUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "not_authenticated" }, { status: 401 });

  const admin = createAdminClient();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const { data, error } = await admin
    .from("certificates")
    .select("id, display_name, certificate_pda, solana_tx_sig, issued_at, courses(title_en, title_fr, slug)")
    .eq("user_id", user.id)
    .order("issued_at", { ascending: false });

  if (error) return NextResponse.json({ error: "server_error" }, { status: 500 });

  const certificates = (data ?? []).map((row) => {
    const cr = row.courses as unknown;
    const course = (Array.isArray(cr) ? cr[0] : cr) as {
      title_en: string;
      title_fr: string;
      slug: string;
    } | null;
    return {
      id: row.id,
      displayName: row.display_name,
      courseNameEn: course?.title_en ?? "",
      courseNameFr: course?.title_fr ?? "",
      courseSlug: course?.slug ?? "",
      certificatePda: row.certificate_pda ?? null,
      solanaExplorerUrl: row.solana_tx_sig
        ? `https://explorer.solana.com/tx/${row.solana_tx_sig}?cluster=devnet`
        : null,
      issuedAt: row.issued_at,
      certUrl: `${appUrl}/certificate/${row.id}`,
    };
  });

  return NextResponse.json({ certificates });
}
