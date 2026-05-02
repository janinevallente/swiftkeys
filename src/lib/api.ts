// ─────────────────────────────────────────────────────────────
//  Client-side fetch wrapper
// ─────────────────────────────────────────────────────────────

import type { ApiResponse } from "@/types";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface FetchOptions {
  method?: Method;
  body?: unknown;
  headers?: Record<string, string>;
}

/**
 * Typed fetch wrapper for internal API routes.
 *
 * Usage:
 *   const { data, error } = await apiFetch<User[]>("/api/users");
 *   const { data } = await apiFetch<User>("/api/users", { method: "POST", body: newUser });
 */
export async function apiFetch<T>(
  path: string,
  { method = "GET", body, headers = {} }: FetchOptions = {}
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(path, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });

    const json = await res.json();

    if (!res.ok) {
      return { error: json.error ?? `HTTP ${res.status}` };
    }

    return { data: json };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Network error" };
  }
}
