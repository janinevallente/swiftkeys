"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TypingTest } from "@/components/typing/TypingTest";

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("sk-theme");
    if (saved === "light") setIsDark(false);
  }, []);

  const toggleTheme = () => {
    setIsDark((d) => {
      const next = !d;
      localStorage.setItem("sk-theme", next ? "dark" : "light");
      return next;
    });
  };

  if (!mounted) return null;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: isDark ? "var(--bg-base)" : "#f5f0e8" }}
    >
      {/* Subtle grid — dark only */}
      {isDark && (
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,212,255,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,212,255,0.02) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />
      )}

      {/* ── Navbar ── */}
      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 flex items-center justify-between px-10 py-5 shrink-0"
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 select-none">
          <LogoMark isDark={isDark} />
          <span
            className="text-lg font-bold"
            style={{
              fontFamily: "var(--font-sans)",
              color: isDark ? "var(--text-primary)" : "#2a1f0e",
              letterSpacing: "-0.025em",
            }}
          >
            Swift<span style={{ color: isDark ? "var(--cyan)" : "#c47c2b" }}>Keys</span>
          </span>
        </div>

        {/* Theme toggle in nav */}
        <motion.button
          whileHover={{ color: isDark ? "var(--cyan)" : "#c47c2b" }}
          whileTap={{ scale: 0.88 }}
          onClick={toggleTheme}
          title={isDark ? "light mode" : "dark mode"}
          className="p-2 rounded-lg transition-colors duration-150"
          style={{ color: isDark ? "var(--text-muted)" : "#a89070" }}
        >
          {isDark ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </motion.button>
      </motion.nav>

      {/* ── Main: vertically centered content ── */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
          style={{ maxWidth: "920px" }}
        >
          <TypingTest isDark={isDark} onToggleTheme={toggleTheme} />
        </motion.div>
      </main>

      {/* ── Footer ── */}
      <footer
        className="relative z-10 flex items-center justify-center gap-5 px-10 py-4 shrink-0 text-xs select-none"
        style={{
          color: isDark ? "var(--text-dim)" : "#c0a882",
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.06em",
        }}
      >
        <span>© 2026 SwiftKeys. All rights reserved</span>
      </footer>
    </div>
  );
}

function LogoMark({ isDark }: { isDark: boolean }) {
  const stroke = isDark ? "var(--cyan)" : "#c47c2b";
  const fill = isDark ? "rgba(0,212,255,0.08)" : "rgba(196,124,43,0.08)";
  const dim = isDark ? "rgba(0,212,255,0.35)" : "rgba(196,124,43,0.35)";
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
      <rect x="1" y="1" width="26" height="26" rx="6" stroke={stroke} strokeWidth="1.5" fill={fill} />
      <path d="M7 14 L12 9 L17 14 L22 9" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 19 L12 14 L17 19 L22 14" stroke={dim} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}