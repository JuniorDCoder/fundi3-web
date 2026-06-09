import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { buildCertificateMetadata } from "@/lib/certificates/metadata";

interface RouteParams {
  params: { certId: string };
}

// GET /api/certificates/:certId/metadata — NFT metadata JSON (public)
export async function GET(request: NextRequest, { params }: RouteParams) {
  const admin = createAdminClient();

  const { data, error } = await admin
    .from("certificates")
    .select("id, display_name, issued_at, courses (title_en)")
    .eq("id", params.certId)
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://fundi3.xyz";
  const coursesRaw = data.courses as unknown;
  const course = (Array.isArray(coursesRaw) ? coursesRaw[0] : coursesRaw) as { title_en: string } | null;

  const metadata = buildCertificateMetadata({
    certId: data.id,
    courseName: course?.title_en ?? "Web3 Course",
    studentName: data.display_name,
    issuedAt: new Date(data.issued_at),
    appUrl,
  });

  return NextResponse.json(metadata, {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
