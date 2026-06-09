"use client";

import { useEffect, useState, useCallback } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { isAdminUser } from "@/lib/admin/metadata";
import type { Lang } from "@/lib/i18n";

type ApiError = { error: string; message: string };
type ApiResult<T> = { data: T | null; error: ApiError | null };

async function postJson<T>(url: string, body: unknown): Promise<ApiResult<T>> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    if (!res.ok) return { data: null, error: json as ApiError };
    return { data: json as T, error: null };
  } catch {
    return { data: null, error: { error: "network_error", message: "Network error. Please try again." } };
  }
}

interface SessionPayload {
  access_token: string;
  refresh_token: string;
}
interface LoginResponse {
  user: User;
  session: SessionPayload;
}
interface ChallengeResponse {
  message: string;
  serverToken: string;
}

/** What the wallet adapter's `signMessage` looks like — kept generic so this
 * hook doesn't depend on @solana/wallet-adapter types directly. */
type SignMessage = (message: Uint8Array) => Promise<Uint8Array>;

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(isAdminUser(data.user) ? data.user : null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(isAdminUser(session?.user) ? (session?.user ?? null) : null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const applySession = useCallback(async (payload: LoginResponse) => {
    const supabase = createClient();
    const { error } = await supabase.auth.setSession({
      access_token: payload.session.access_token,
      refresh_token: payload.session.refresh_token,
    });
    if (error) {
      return { error: { error: "session_error", message: error.message } as ApiError };
    }
    setUser(isAdminUser(payload.user) ? payload.user : null);
    return { error: null };
  }, []);

  const signInWithPassword = useCallback(
    async (email: string, password: string, lang: Lang = "en") => {
      const { data, error } = await postJson<LoginResponse>("/api/admin/auth/login", { email, password, lang });
      if (error || !data) return { error };
      return applySession(data);
    },
    [applySession],
  );

  /**
   * Orchestrates "Sign-In With Solana": fetch a server-signed challenge,
   * have the connected wallet sign it, then hand the signature back to mint
   * a session — mirrors useAuth's verifyOtp flow but for wallets.
   */
  const signInWithWallet = useCallback(
    async (publicKey: string, signMessage: SignMessage, lang: Lang = "en") => {
      const { data: challenge, error: challengeError } = await postJson<ChallengeResponse>(
        "/api/admin/auth/wallet/challenge",
        { publicKey, lang },
      );
      if (challengeError || !challenge) return { error: challengeError };

      let signatureBase58: string;
      try {
        const { default: bs58 } = await import("bs58");
        const signatureBytes = await signMessage(new TextEncoder().encode(challenge.message));
        signatureBase58 = bs58.encode(signatureBytes);
      } catch {
        return { error: { error: "signature_rejected", message: "Signature request was cancelled or failed." } as ApiError };
      }

      const { data, error } = await postJson<LoginResponse>("/api/admin/auth/wallet/verify", {
        publicKey,
        message: challenge.message,
        serverToken: challenge.serverToken,
        signature: signatureBase58,
        lang,
      });
      if (error || !data) return { error };
      return applySession(data);
    },
    [applySession],
  );

  const signOut = useCallback(async () => {
    const supabase = createClient();
    setUser(null);
    return supabase.auth.signOut();
  }, []);

  return { adminUser: user, loading, signInWithPassword, signInWithWallet, signOut };
}
