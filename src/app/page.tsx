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
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative z-10"
      style={
        isDark
          ? { background: "var(--bg-base)" }
          : { background: "linear-gradient(135deg, #f0f4ff 0%, #e8f0fa 100%)" }
      }
    >
      {/* Background grid lines */}
      {isDark && (
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      )}

      {/* Ambient glow top */}
      {isDark && (
        <div
          className="fixed top-0 left-1/2 -translate-x-1/2 pointer-events-none z-0"
          style={{
            width: "600px",
            height: "300px",
            background: "radial-gradient(ellipse at top, rgba(0,212,255,0.07) 0%, transparent 70%)",
          }}
        />
      )}

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10 text-center select-none relative z-10"
      >
        {/* Logo mark */}
        <div className="flex items-center justify-center gap-3 mb-2">
          <LogoMark isDark={isDark} />
          <span
            className="text-2xl font-bold tracking-tight"
            style={{
              fontFamily: "var(--font-sans)",
              color: isDark ? "var(--text-primary)" : "#0d1a2e",
              letterSpacing: "-0.02em",
            }}
          >
            Swift<span style={{ color: "var(--cyan)" }}>Keys</span>
          </span>
        </div>
        <div
          className="text-xs tracking-widest uppercase"
          style={{
            color: isDark ? "var(--text-muted)" : "#94aac0",
            letterSpacing: "0.2em",
            fontFamily: "var(--font-mono)",
          }}
        >
          typing speed test · Developed by J9
        </div>
      </motion.div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full relative z-10"
      >
        <TypingTest isDark={isDark} onToggleTheme={toggleTheme} />
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-12 text-xs relative z-10"
        style={{
          color: isDark ? "var(--text-dim)" : "#b0c4d8",
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.08em",
        }}
      >
        © 2026 SwiftKeys. All rights reserved.
      </motion.div>
    </main>
  );
}

function LogoMark({ isDark }: { isDark: boolean }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect
        x="1" y="1" width="26" height="26" rx="6"
        stroke={isDark ? "var(--cyan)" : "#0099bb"}
        strokeWidth="1.5"
        fill={isDark ? "rgba(0,212,255,0.08)" : "rgba(0,153,187,0.08)"}
      />
      <path
        d="M7 14 L12 9 L17 14 L22 9"
        stroke={isDark ? "var(--cyan)" : "#0099bb"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M7 19 L12 14 L17 19 L22 14"
        stroke={isDark ? "rgba(0,212,255,0.4)" : "rgba(0,153,187,0.4)"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}