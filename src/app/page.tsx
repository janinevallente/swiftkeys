"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
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
        className="relative z-20 flex items-center justify-between px-10 py-3 shrink-0"
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 select-none">
          <KeyboardLogo isDark={isDark} />
          <span
            className="text-lg font-bold pt-2"
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
          title={isDark ? "Light mode" : "Dark mode"}
          className="p-2 mt-2 rounded-lg transition-colors duration-150"
          style={{ color: isDark ? "var(--text-muted)" : "#a89070" }}
        >
          {isDark ? (
            <Sun size={18} strokeWidth={1.8} />
          ) : (
            <Moon size={18} strokeWidth={1.8} />
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

function KeyboardLogo({ isDark }: { isDark: boolean }) {
  const primaryColor = isDark ? "var(--cyan)" : "#c47c2b";
  const fadedColor = isDark ? "rgba(0,212,255,0.35)" : "rgba(196,124,43,0.35)";
  const moreFaded = isDark ? "rgba(0,212,255,0.15)" : "rgba(196,124,43,0.15)";
  
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Keyboard base */}
      <rect x="3" y="15" width="26" height="14" rx="3" stroke={primaryColor} strokeWidth="1.5" fill="none" opacity="0.8" />
      
      {/* Key rows */}
      {/* Row 1: QWERTY */}
      <g opacity="0.9">
        <rect x="6" y="18" width="3" height="3" rx="0.5" stroke={primaryColor} strokeWidth="1" fill={moreFaded} />
        <rect x="10" y="18" width="3" height="3" rx="0.5" stroke={primaryColor} strokeWidth="1" fill={moreFaded} />
        <rect x="14" y="18" width="3" height="3" rx="0.5" stroke={primaryColor} strokeWidth="1" fill={moreFaded} />
        <rect x="18" y="18" width="3" height="3" rx="0.5" stroke={primaryColor} strokeWidth="1" fill={moreFaded} />
        <rect x="22" y="18" width="3" height="3" rx="0.5" stroke={primaryColor} strokeWidth="1" fill={moreFaded} />
      </g>
      
      {/* Row 2: ASDF */}
      <g opacity="0.7">
        <rect x="7" y="22" width="3" height="3" rx="0.5" stroke={primaryColor} strokeWidth="1" fill={fadedColor} />
        <rect x="11" y="22" width="3" height="3" rx="0.5" stroke={primaryColor} strokeWidth="1" fill={fadedColor} />
        <rect x="15" y="22" width="3" height="3" rx="0.5" stroke={primaryColor} strokeWidth="1" fill={fadedColor} />
        <rect x="19" y="22" width="3" height="3" rx="0.5" stroke={primaryColor} strokeWidth="1" fill={fadedColor} />
        <rect x="23" y="22" width="3" height="3" rx="0.5" stroke={primaryColor} strokeWidth="1" fill={fadedColor} />
      </g>
      
      {/* Spacebar row */}
      <rect x="10" y="26" width="12" height="2.5" rx="1" stroke={primaryColor} strokeWidth="1" fill={moreFaded} opacity="0.5" />
      
      {/* Swift indicator - accent line */}
      <path 
        d="M16 6 L19 10 L13 10 L16 14" 
        stroke={primaryColor} 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        fill="none"
        opacity="0.9"
      />
    </svg>
  );
}