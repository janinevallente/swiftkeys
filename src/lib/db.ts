// ─────────────────────────────────────────────────────────────
//  Database client — swap for your preferred ORM / driver
//
//  Popular options:
//    Prisma  →  import { PrismaClient } from "@prisma/client"
//    Drizzle →  import { drizzle } from "drizzle-orm/..."
//    Supabase→  import { createClient } from "@supabase/supabase-js"
//    Mongoose→  import mongoose from "mongoose"
// ─────────────────────────────────────────────────────────────

/**
 * Singleton pattern — prevents multiple DB connections in dev
 * (Next.js hot-reload creates new module instances repeatedly).
 *
 * Usage example with Prisma:
 *
 *   import { PrismaClient } from "@prisma/client";
 *
 *   const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
 *   export const db = globalForPrisma.prisma ?? new PrismaClient();
 *   if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
 */

// Placeholder — replace with your actual client:
export const db = null;

// ─── Example: Supabase ────────────────────────────────────────
// import { createClient } from "@supabase/supabase-js";
// export const db = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!,
// );
