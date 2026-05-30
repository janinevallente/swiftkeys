"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TypingTest } from "@/components/ui/TypingTest";

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("sk-theme");
    if (saved === "light") {
      setIsDark(false);
      document.body.classList.add("light");
    }
    const t = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(t);
  }, []);

  const toggleTheme = () => {
    setIsDark((d) => {
      const next = !d;
      localStorage.setItem("sk-theme", next ? "dark" : "light");
      document.body.classList.toggle("light", !next);
      return next;
    });
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col bg-bg-base">
      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-20 flex items-center justify-between px-10 py-4 shrink-0 border-b-2 border-border-subtle"
      >
        {/* Logo */}
        <div className="flex items-center gap-4 select-none">
          <PixelLogo />
          <div
            className="font-pixel text-sm tracking-pixel text-accent"
            style={{ textShadow: "0 0 10px var(--cyan-glow-strong)" }}
          >
            SWIFT<span className="text-amber">KEYS</span>
          </div>
        </div>

        {/* Theme toggle */}
        <NavIconBtn onClick={toggleTheme} title={isDark ? "light mode" : "dark mode"}>
          {isDark ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </NavIconBtn>
      </motion.nav>

      {/* Main */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-content"
        >
          <TypingTest isDark={isDark} onToggleTheme={toggleTheme} />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 flex items-center justify-between px-10 py-5 shrink-0 select-none font-pixel text-6xs text-text-muted tracking-wider2">
        <span>© 2026 SWIFTKEYS</span>
        <span>v1.0.0</span>
      </footer>
    </div>
  );
}

function PixelLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect x="1" y="1" width="34" height="34" fill="none" stroke="var(--cyan)" strokeWidth="2"/>
      <rect x="4" y="4" width="28" height="28" fill="none" stroke="var(--cyan)" strokeWidth="1" opacity="0.3"/>
      <rect x="7"  y="10" width="5" height="5" fill="var(--cyan)"  opacity="0.9"/>
      <rect x="14" y="10" width="5" height="5" fill="var(--cyan)"  opacity="0.7"/>
      <rect x="21" y="10" width="5" height="5" fill="var(--amber)" opacity="0.9"/>
      <rect x="7"  y="17" width="5" height="5" fill="var(--cyan)"  opacity="0.5"/>
      <rect x="14" y="17" width="5" height="5" fill="var(--amber)" opacity="0.6"/>
      <rect x="21" y="17" width="5" height="5" fill="var(--cyan)"  opacity="0.5"/>
      <rect x="9"  y="24" width="18" height="4" fill="var(--cyan)" opacity="0.4"/>
    </svg>
  );
}

function NavIconBtn({ children, onClick, title }: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="text-text-sub border border-border-strong bg-transparent cursor-pointer px-2 py-1.5 leading-none hover:text-accent hover:border-accent transition-colors duration-150"
    >
      {children}
    </button>
  );
}