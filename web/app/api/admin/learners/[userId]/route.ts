import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { authMessage, parseLang } from "@/lib/auth/messages";
import { getAuthenticatedAdmin, isSuperadmin } from "@/lib/admin/guard";
import { getAdminMetadata } from "@/lib/admin/metadata";
import { getLearnerDetail } from "@/lib/admin/learners";
import { deriveStudentKeypair, deriveStudentPubkey, getAuthorityKeypair } from "@/lib/certificates/solana";
import { getBalanceSol, sendSol, WALLET_FEE_BUFFER_SOL } from "@/lib/wallet/solana";

interface RouteParams {
  params: { userId: string };
}

/** GET: one learner's profile, wallet, per-course progress, and certificates. */
export async function GET(request: NextRequest, { params }: RouteParams) {
  const lang = parseLang(request.nextUrl.searchParams.get("lang"));
  const caller = await getAuthenticatedAdmin(request);
  if (!caller) {
    return NextResponse.json(
      { error: "not_admin", message: authMessage("notAdminAccount", lang) },
      { status: 403 },
    );
  }

  const admin = createAdminClient();
  const learner = await getLearnerDetail(admin, params.userId);
  if (!learner) {
    return NextResponse.json(
      { error: "user_not_found", message: authMessage("userNotFound", lang) },
      { status: 404 },
    );
  }

  return NextResponse.json({ learner });
}

/** PATCH: update a learner's display name. Any authenticated admin. */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const body = await request.json().catch(() => null);
  const lang = parseLang(body?.lang);

  const caller = await getAuthenticatedAdmin(request);
  if (!caller) {
    return NextResponse.json(
      { error: "not_admin", message: authMessage("notAdminAccount", lang) },
      { status: 403 },
    );
  }

  const displayName = typeof body?.displayName === "string" ? body.displayName.trim() : "";
  if (displayName.length < 2 || displayName.length > 100) {
    return NextResponse.json(
      { error: "invalid_display_name", message: authMessage("invalidDisplayName", lang) },
      { status: 400 },
    );
  }

  const admin = createAdminClient();

  const { data: targetData, error: targetError } = await admin.auth.admin.getUserById(params.userId);
  if (targetError || !targetData?.user) {
    return NextResponse.json(
      { error: "user_not_found", message: authMessage("userNotFound", lang) },
      { status: 404 },
    );
  }

  const { error } = await admin.from("user_profiles").upsert(
    {
      user_id: params.userId,
      display_name: displayName,
      student_pubkey: deriveStudentPubkey(params.userId).toBase58(),
    },
    { onConflict: "user_id" },
  );

  if (error) {
    return NextResponse.json(
      { error: "server_error", message: authMessage("serverError", lang) },
      { status: 500 },
    );
  }

  return NextResponse.json({ displayName });
}

/**
 * DELETE: permanently delete a learner's account. Superadmin-only.
 * If the custodial wallet holds funds, they're swept to the platform
 * treasury wallet (CERTIFICATE_AUTHORITY_KEYPAIR) before the account is
 * removed — deletion is aborted if the sweep fails.
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const lang = parseLang(request.nextUrl.searchParams.get("lang"));

  const caller = await getAuthenticatedAdmin(request);
  if (!caller) {
    return NextResponse.json(
      { error: "not_admin", message: authMessage("notAdminAccount", lang) },
      { status: 403 },
    );
  }
  if (!isSuperadmin(caller.metadata)) {
    return NextResponse.json(
      { error: "not_authorized", message: authMessage("notAuthenticated", lang) },
      { status: 403 },
    );
  }

  const admin = createAdminClient();

  const { data: targetData, error: targetError } = await admin.auth.admin.getUserById(params.userId);
  const target = targetData?.user;
  if (targetError || !target) {
    return NextResponse.json(
      { error: "user_not_found", message: authMessage("userNotFound", lang) },
      { status: 404 },
    );
  }

  if (getAdminMetadata(target)) {
    return NextResponse.json(
      { error: "cannot_delete_admin", message: authMessage("cannotDeleteAdmin", lang) },
      { status: 400 },
    );
  }

  let sweptAmountSol: number | null = null;
  let sweepTxSig: string | null = null;

  const pubkey = deriveStudentPubkey(params.userId);
  const balance = await getBalanceSol(pubkey);

  if (balance !== null && balance > WALLET_FEE_BUFFER_SOL) {
    const sweepAmount = balance - WALLET_FEE_BUFFER_SOL;
    try {
      const result = await sendSol(
        deriveStudentKeypair(params.userId),
        getAuthorityKeypair().publicKey.toBase58(),
        sweepAmount,
      );
      sweptAmountSol = sweepAmount;
      sweepTxSig = result.signature;
    } catch (err) {
      console.error("[admin:learners] fund sweep failed:", err);
      return NextResponse.json(
        { error: "fund_sweep_failed", message: authMessage("fundSweepFailed", lang) },
        { status: 502 },
      );
    }
  }

  const { error } = await admin.auth.admin.deleteUser(params.userId);
  if (error) {
    return NextResponse.json(
      { error: "server_error", message: authMessage("serverError", lang) },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true, sweptAmountSol, sweepTxSig });
}
