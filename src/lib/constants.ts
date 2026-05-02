// ─────────────────────────────────────────────────────────────
//  App-wide constants
// ─────────────────────────────────────────────────────────────

export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const API_BASE = `${APP_URL}/api`;

/** Default page size for paginated queries */
export const DEFAULT_PAGE_SIZE = 20;

/** Session cookie / token name */
export const SESSION_COOKIE = "session_token";

/** Route paths — update to match your app's routes */
export const ROUTES = {
  home:      "/",
  login:     "/login",
  register:  "/register",
  dashboard: "/dashboard",
  settings:  "/dashboard/settings",
} as const;

/** Public routes that don't require authentication */
export const PUBLIC_ROUTES: string[] = [
  ROUTES.home,
  ROUTES.login,
  ROUTES.register,
];
