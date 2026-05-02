// ─────────────────────────────────────────────────────────────
//  User service — server-side data access layer
//  Wire up the db client and replace the TODOs
// ─────────────────────────────────────────────────────────────

// import { db } from "@/lib/db";
import type { User } from "@/types";

export async function getUserById(id: string): Promise<User | null> {
  // TODO: return await db.user.findUnique({ where: { id } });
  console.log("getUserById", id);
  return null;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  // TODO: return await db.user.findUnique({ where: { email } });
  console.log("getUserByEmail", email);
  return null;
}

export async function createUser(data: {
  name: string;
  email: string;
  passwordHash: string;
}): Promise<User> {
  // TODO: return await db.user.create({ data });
  console.log("createUser", data);
  return { id: "stub", email: data.email, name: data.name, createdAt: new Date() };
}
