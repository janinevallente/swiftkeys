// ─────────────────────────────────────────────────────────────
//  Utility helpers
// ─────────────────────────────────────────────────────────────

/** Merge class names (drop-in for clsx + tailwind-merge without the deps) */
export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

/** Pause execution for `ms` milliseconds */
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/** Format a Date to a readable locale string */
export const formatDate = (date: Date | string, locale = "en-US") =>
  new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

/** Capitalise the first letter of a string */
export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

/** Truncate a string to `maxLength` chars and append "…" */
export const truncate = (str: string, maxLength: number) =>
  str.length > maxLength ? `${str.slice(0, maxLength)}…` : str;

/** Simple object deep-clone (JSON-safe values only) */
export const deepClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));
