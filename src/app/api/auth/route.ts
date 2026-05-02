// ─────────────────────────────────────────────────────────────
//  POST /api/auth — Login
// ─────────────────────────────────────────────────────────────

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateLoginForm } from "@/lib/validations";
import { SESSION_COOKIE } from "@/lib/constants";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { valid, errors } = validateLoginForm(body);

  if (!valid) {
    return NextResponse.json({ error: "Validation failed", errors }, { status: 422 });
  }

  // TODO: verify credentials against DB
  // const user = await db.user.findUnique({ where: { email: body.email } });
  // const valid = await bcrypt.compare(body.password, user.passwordHash);

  // Placeholder — set a real signed token here
  const fakeToken = "replace-with-real-jwt";

  const response = NextResponse.json({ message: "Logged in" });
  response.cookies.set(SESSION_COOKIE, fakeToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}
