// POST /api/auth/logout — clear session cookie
import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/constants";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out" });
  response.cookies.delete(SESSION_COOKIE);
  return response;
}
