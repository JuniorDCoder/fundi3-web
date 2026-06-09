import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/supabase/get-user";
import { createAdminClient } from "@/lib/supabase/admin";
import { issueCertificateOnChain, deriveStudentPubkey } from "@/lib/certificates/solana";

// POST /api/certificates/claim
// Body: { courseId: string, displayName?: string }
// Works for web (cookie) and mobile (Bearer token) via getUserFromRequest.
// All DB reads use the admin/service-role client after we verify the user
// identity ourselves — no cookie-session dependency for row-level operations.
export async function POST(request: NextRequest) {
  const user = await getUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "not_authenticated" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const courseId: string | undefined = body?.courseId;
  const displayNameInput: string | undefined =
    typeof body?.displayName === "string" ? body.displayName.trim() : undefined;

  if (!courseId) return NextResponse.json({ error: "courseId required" }, { status: 400 });

  const admin = createAdminClient();

  // ── 1. Resolve / create user profile ────────────────────────────────────────
  const { data: profileRow } = await admin
    .from("user_profiles")
    .select("display_name, student_pubkey")
    .eq("user_id", user.id)
    .maybeSingle();

  let displayName = profileRow?.display_name ?? displayNameInput ?? "";
  if (displayName.length < 2) {
    return NextResponse.json({ error: "display_name_required" }, { status: 400 });
  }

  if (!profileRow) {
    const studentPubkey = deriveStudentPubkey(user.id).toBase58();
    await admin.from("user_profiles").upsert(
      { user_id: user.id, display_name: displayName, student_pubkey: studentPubkey },
      { onConflict: "user_id" },
    );
  }

  // ── 2. Idempotency — already claimed? ────────────────────────────────────────
  const { data: existingCert } = await admin
    .from("certificates")
    .select("id, certificate_pda, solana_tx_sig")
    .eq("user_id", user.id)
    .eq("course_id", courseId)
    .maybeSingle();

  if (existingCert) {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    return NextResponse.json({
      certId: existingCert.id,
      certificatePda: existingCert.certificate_pda,
      txSig: existingCert.solana_tx_sig,
      alreadyClaimed: true,
      certUrl: `${appUrl}/certificate/${existingCert.id}`,
      solanaExplorerUrl: existingCert.solana_tx_sig
        ? `https://explorer.solana.com/tx/${existingCert.solana_tx_sig}?cluster=devnet`
        : null,
    });
  }

  // ── 3. Verify 100% completion (admin client — no RLS dependency) ─────────────
  const { data: lessonProgressRows } = await admin
    .from("lesson_progress")
    .select("lesson_id, status")
    .eq("user_id", user.id)
    .eq("course_id", courseId)
    .eq("status", "completed");

  const { data: courseRow } = await admin
    .from("courses")
    .select("id, course_modules(course_lessons(id))")
    .eq("id", courseId)
    .eq("status", "published")
    .maybeSingle();

  if (!courseRow) return NextResponse.json({ error: "course_not_found" }, { status: 404 });

  const totalLessons = (courseRow.course_modules as { course_lessons: unknown[] }[]).reduce(
    (sum, m) => sum + m.course_lessons.length,
    0,
  );
  const completedLessons = lessonProgressRows?.length ?? 0;

  if (totalLessons === 0 || completedLessons < totalLessons) {
    return NextResponse.json(
      { error: "course_not_completed", completed: completedLessons, total: totalLessons },
      { status: 403 },
    );
  }

  // ── 4. Insert DB record first ─────────────────────────────────────────────────
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const { data: newCert, error: insertError } = await admin
    .from("certificates")
    .insert({ user_id: user.id, course_id: courseId, display_name: displayName })
    .select("id")
    .single();

  if (insertError || !newCert) {
    return NextResponse.json({ error: "insert_failed", detail: insertError?.message }, { status: 500 });
  }

  const certId: string = newCert.id;
  const metadataUri = `${appUrl}/api/certificates/${certId}/metadata`;

  // ── 5. Mint on-chain (non-blocking — cert is valid even without on-chain data) ─
  let certificatePda: string | null = null;
  let txSig: string | null = null;

  try {
    const result = await issueCertificateOnChain(user.id, courseId, metadataUri);
    certificatePda = result.certificatePda;
    txSig = result.txSig || null;

    await admin
      .from("certificates")
      .update({ certificate_pda: certificatePda, metadata_uri: metadataUri, solana_tx_sig: txSig })
      .eq("id", certId);
  } catch (err) {
    console.error("[cert:mint] on-chain minting failed — cert saved in DB only:", err);
  }

  return NextResponse.json({
    certId,
    certificatePda,
    txSig,
    certUrl: `${appUrl}/certificate/${certId}`,
    solanaExplorerUrl: txSig
      ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet`
      : null,
  });
}
