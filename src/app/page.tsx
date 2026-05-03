"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TypingTest } from "@/components/typing/TypingTest";

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("tt-theme");
    if (saved === "light") setIsDark(false);
  }, []);

  const toggleTheme = () => {
    setIsDark((d) => {
      const next = !d;
      localStorage.setItem("tt-theme", next ? "dark" : "light");
      return next;
    });
  };

  if (!mounted) return null;

  const bg = isDark
    ? "radial-gradient(ellipse at 50% 0%, #1f1e15 0%, #111110 60%)"
    : "radial-gradient(ellipse at 50% 0%, #f0ede4 0%, #e8e4d9 70%)";

  const logoColor = isDark ? "#4a4a42" : "#c4bfb5";
  const subtitleColor = isDark ? "#353530" : "#d0cbc0";

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12 transition-colors duration-500"
      style={{ background: bg }}
    >
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10 text-center select-none"
      >
        <div
          className="text-sm font-mono tracking-widest uppercase mb-1"
          style={{ color: logoColor, letterSpacing: "0.22em" }}
        >
          swiftkeys
        </div>
        <div className="text-xs" style={{ color: subtitleColor, letterSpacing: "0.1em" }}>
          typing speed test · developed by J9
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        <TypingTest isDark={isDark} onToggleTheme={toggleTheme} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12 text-xs"
        style={{ color: subtitleColor, letterSpacing: "0.08em" }}
      >
        © 2026 SwiftKeys. All rights reserved
      </motion.div>
    </main>
  );
}
