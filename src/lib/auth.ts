// ─────────────────────────────────────────────────────────────
//  Auth helpers — swap the internals for your auth provider
//  (NextAuth, Clerk, Lucia, better-auth, custom JWT, etc.)
// ─────────────────────────────────────────────────────────────

import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/constants";
import type { User } from "@/types";

/**
 * Returns the currently authenticated user from the server context,
 * or null if no valid session exists.
 *
 * Replace this with your auth provider's session helper.
 * e.g. auth() from NextAuth, currentUser() from Clerk, etc.
 */
export async function getSession(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  // TODO: validate token, fetch user from DB
  // const user = await db.user.findUnique({ where: { sessionToken: token } });
  // return user;
  return null;
}

/**
 * Shorthand for checking if the current request is authenticated.
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session !== null;
}
