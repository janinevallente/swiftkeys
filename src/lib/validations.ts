// ─────────────────────────────────────────────────────────────
//  Shared validation schemas
//  Uses native validation — swap for Zod/Yup/Valibot if preferred
//
//  Zod example (after `npm i zod`):
//    import { z } from "zod";
//    export const loginSchema = z.object({
//      email: z.string().email(),
//      password: z.string().min(8),
//    });
// ─────────────────────────────────────────────────────────────

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password: string): boolean {
  return password.length >= 8;
}

export function validateLoginForm(fields: {
  email: string;
  password: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!validateEmail(fields.email))
    errors.email = "Enter a valid email address.";

  if (!validatePassword(fields.password))
    errors.password = "Password must be at least 8 characters.";

  return { valid: Object.keys(errors).length === 0, errors };
}

export function validateRegisterForm(fields: {
  name: string;
  email: string;
  password: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!fields.name.trim()) errors.name = "Name is required.";
  if (!validateEmail(fields.email)) errors.email = "Enter a valid email address.";
  if (!validatePassword(fields.password))
    errors.password = "Password must be at least 8 characters.";

  return { valid: Object.keys(errors).length === 0, errors };
}
