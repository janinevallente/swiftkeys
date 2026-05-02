"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { validateRegisterForm } from "@/lib/validations";
import { ROUTES } from "@/lib/constants";

export default function RegisterPage() {
  const router = useRouter();
  const [fields, setFields] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { valid, errors: ve } = validateRegisterForm(fields);
    if (!valid) return setErrors(ve);

    setLoading(true);
    setServerError("");
    const { error } = await apiFetch("/api/auth/register", {
      method: "POST",
      body: fields,
    });

    if (error) {
      setServerError(error);
      setLoading(false);
      return;
    }

    router.push(ROUTES.login);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl font-bold text-ink mb-8">
          Create account
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {(["name", "email", "password"] as const).map((field) => (
            <div key={field} className="flex flex-col gap-1">
              <label className="text-sm text-ink-muted font-body capitalize">{field}</label>
              <input
                type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                value={fields[field]}
                onChange={(e) => setFields({ ...fields, [field]: e.target.value })}
                className="border border-border rounded-lg px-4 py-2.5 text-sm font-body bg-white text-ink focus:outline-none focus:ring-2 focus:ring-accent"
              />
              {errors[field] && <p className="text-red-500 text-xs">{errors[field]}</p>}
            </div>
          ))}

          {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-ink text-bg font-body text-sm px-4 py-2.5 rounded-lg transition-opacity hover:opacity-80 disabled:opacity-40"
          >
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-sm font-body text-ink-muted text-center">
          Already have an account?{" "}
          <a href={ROUTES.login} className="text-ink underline underline-offset-2">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
