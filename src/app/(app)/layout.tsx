// App shell layout — wraps all authenticated routes
// Add a sidebar or persistent topbar here.

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg">
      {/* TODO: replace with your app's sidebar or top nav */}
      <header className="border-b border-border bg-white px-8 py-4 flex items-center justify-between">
        <span className="font-display text-sm font-semibold text-ink">App</span>
        <a
          href="/api/auth/logout"
          className="font-body text-xs text-ink-muted hover:text-ink transition-colors"
        >
          Sign out
        </a>
      </header>
      <main>{children}</main>
    </div>
  );
}
