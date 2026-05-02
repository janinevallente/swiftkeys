// ─────────────────────────────────────────────────────────────
//  Dashboard — protected app page
//  Auth is enforced by middleware; this can be a Server Component.
// ─────────────────────────────────────────────────────────────

import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/constants";

export default async function DashboardPage() {
  const user = await getSession();
  if (!user) redirect(ROUTES.login);

  return (
    <div className="min-h-screen bg-bg px-8 py-16 max-w-5xl mx-auto">
      <h1 className="font-display text-4xl font-bold text-ink mb-2">
        Dashboard
      </h1>
      <p className="font-body text-ink-muted mb-12">
        Welcome back{user.name ? `, ${user.name}` : ""}.
      </p>

      {/* Stats row — replace with real data */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {[
          { label: "Stat One",   value: "—" },
          { label: "Stat Two",   value: "—" },
          { label: "Stat Three", value: "—" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-border rounded-xl px-6 py-5"
          >
            <p className="font-body text-xs uppercase tracking-widest text-ink-muted mb-1">
              {stat.label}
            </p>
            <p className="font-display text-3xl font-bold text-ink">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Main content area */}
      <div className="bg-white border border-border rounded-xl px-6 py-8">
        <p className="font-body text-ink-muted text-sm">
          Add your main app content here.
        </p>
      </div>
    </div>
  );
}
