"use client";

// ─────────────────────────────────────────────────────────────
//  useAuth — client-side auth state hook
//  Replace internals with your auth provider's hook if available
//  e.g. useSession() from NextAuth, useUser() from Clerk
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import type { User } from "@/types";
import { apiFetch } from "@/lib/api";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export function useAuth(): AuthState & {
  logout: () => Promise<void>;
} {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    apiFetch<User>("/api/auth/me").then(({ data, error }) => {
      setState({ user: data ?? null, loading: false, error: error ?? null });
    });
  }, []);

  const logout = async () => {
    await apiFetch("/api/auth/logout", { method: "POST" });
    setState({ user: null, loading: false, error: null });
    window.location.href = "/login";
  };

  return { ...state, logout };
}
