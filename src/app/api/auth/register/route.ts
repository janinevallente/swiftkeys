// POST /api/auth/register — create a new user
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateRegisterForm } from "@/lib/validations";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { valid, errors } = validateRegisterForm(body);

  if (!valid) {
    return NextResponse.json({ error: "Validation failed", errors }, { status: 422 });
  }

  // TODO: hash password and create user in DB
  // const hashed = await bcrypt.hash(body.password, 12);
  // const user = await db.user.create({ data: { ...body, password: hashed } });

  return NextResponse.json({ message: "Account created" }, { status: 201 });
}
