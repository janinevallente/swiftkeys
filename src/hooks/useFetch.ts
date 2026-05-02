"use client";

// ─────────────────────────────────────────────────────────────
//  useFetch — generic data-fetching hook with loading/error state
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "@/lib/api";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Usage:
 *   const { data, loading, error, refetch } = useFetch<User[]>("/api/users");
 */
export function useFetch<T>(url: string) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetch = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    const { data, error } = await apiFetch<T>(url);
    setState({ data: data ?? null, loading: false, error: error ?? null });
  }, [url]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, refetch: fetch };
}
