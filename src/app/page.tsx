"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TypingTest } from "@/components/sections/TypingTest/TypingTest";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("sk-theme");
    if (saved === "light") {
      setIsDark(false);
      document.body.classList.add("light");
    }
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
    <div className="h-screen flex flex-col bg-bg-base overflow-hidden">
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />
      
      <main className="relative z-10 flex-1 flex flex-col items-center px-3 sm:px-6 py-6 sm:py-10 md:py-16 overflow-y-auto scrollbar-hide">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-content"
        >
          <TypingTest isDark={isDark} onToggleTheme={toggleTheme} />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}