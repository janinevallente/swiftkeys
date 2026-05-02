"use client";

import { useState, useEffect } from "react";

/**
 * Persist state to localStorage with SSR safety.
 *
 * Usage:
 *   const [theme, setTheme] = useLocalStorage("theme", "dark");
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) setValue(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, [key]);

  const set = (newValue: T | ((prev: T) => T)) => {
    setValue((prev) => {
      const resolved =
        typeof newValue === "function"
          ? (newValue as (prev: T) => T)(prev)
          : newValue;
      try {
        localStorage.setItem(key, JSON.stringify(resolved));
      } catch {
        // ignore
      }
      return resolved;
    });
  };

  return [value, set] as const;
}
