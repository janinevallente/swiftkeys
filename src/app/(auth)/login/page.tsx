"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { validateLoginForm } from "@/lib/validations";
import { ROUTES } from "@/lib/constants";

export default function LoginPage() {
  const router = useRouter();
  const [fields, setFields] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { valid, errors: ve } = validateLoginForm(fields);
    if (!valid) return setErrors(ve);

    setLoading(true);
    setServerError("");
    const { error } = await apiFetch("/api/auth", {
      method: "POST",
      body: fields,
    });

    if (error) {
      setServerError(error);
      setLoading(false);
      return;
    }

    router.push(ROUTES.dashboard);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl font-bold text-ink mb-8">
          Sign in
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-ink-muted font-body">Email</label>
            <input
              type="email"
              value={fields.email}
              onChange={(e) => setFields({ ...fields, email: e.target.value })}
              className="border border-border rounded-lg px-4 py-2.5 text-sm font-body bg-white text-ink focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-ink-muted font-body">Password</label>
            <input
              type="password"
              value={fields.password}
              onChange={(e) => setFields({ ...fields, password: e.target.value })}
              className="border border-border rounded-lg px-4 py-2.5 text-sm font-body bg-white text-ink focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
          </div>

          {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-ink text-bg font-body text-sm px-4 py-2.5 rounded-lg transition-opacity hover:opacity-80 disabled:opacity-40"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-sm font-body text-ink-muted text-center">
          Don&apos;t have an account?{" "}
          <a href={ROUTES.register} className="text-ink underline underline-offset-2">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
