// Marketing layout — wraps public-facing pages with the site Navbar + Footer.
// Move src/app/page.tsx into this group if you want the landing page
// to share this layout while keeping /dashboard separate.

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
