"use client";

import { useState, useEffect } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import type { Lang } from "@/lib/i18n";

type ApiError = { error: string; message: string };

async function postJson<T>(url: string, body: unknown): Promise<{ data: T | null; error: ApiError | null }> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    if (!res.ok) {
      return { data: null, error: json as ApiError };
    }
    return { data: json as T, error: null };
  } catch {
    return { data: null, error: { error: "network_error", message: "Network error. Please try again." } };
  }
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // Seed initial session
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    // Keep in sync with auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      },
    );

    return () => subscription.unsubscribe();
  }, []);

  // Custom signup — backed by /api/auth/signup so the verification email is
  // sent through Fundi3's own branded, bilingual SMTP flow (not Supabase's).
  async function signUp(email: string, password: string, lang: Lang = "en") {
    const { error } = await postJson<{ success: true; email: string }>("/api/auth/signup", {
      email,
      password,
      lang,
    });
    return { error };
  }

  async function signIn(email: string, password: string) {
    const supabase = createClient();
    return supabase.auth.signInWithPassword({ email, password });
  }

  async function signOut() {
    const supabase = createClient();
    return supabase.auth.signOut();
  }

  // Verifies the 6-digit OTP sent by /api/auth/signup, then syncs the
  // resulting session into the browser client (cookies + in-memory state).
  async function verifyOtp(email: string, token: string, lang: Lang = "en") {
    const { data, error } = await postJson<{
      user: User;
      session: { access_token: string; refresh_token: string };
    }>("/api/auth/verify", { email, token, lang });

    if (error || !data) {
      return { error };
    }

    const supabase = createClient();
    const { error: setSessionError } = await supabase.auth.setSession({
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    });

    if (setSessionError) {
      return { error: { error: "session_error", message: setSessionError.message } };
    }

    setUser(data.user);
    return { error: null };
  }

  async function resendVerification(email: string, lang: Lang = "en") {
    const { error } = await postJson<{ success: true; email: string }>("/api/auth/resend", {
      email,
      lang,
    });
    return { error };
  }

  return { user, loading, signUp, signIn, signOut, verifyOtp, resendVerification };
}
