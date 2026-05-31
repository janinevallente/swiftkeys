"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PixelLogo from "@/components/ui/PixelLogo";
import PixelToggle from "@/components/ui/PixelToggle";

export default function Navbar() {
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
      <div>
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative z-20 flex items-center justify-between px-4 sm:px-6 md:px-10 py-3 sm:py-4 shrink-0 border-b-2 border-border-subtle"
    >
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-4 select-none">
            <span className="hidden xs:block">
                <PixelLogo />
            </span>
            <div className="font-pixel text-[0.5rem] sm:text-xs md:text-sm tracking-pixel text-accent">
                SWIFT<span className="text-amber">KEYS</span>
            </div>
        </div>

        {/* Pixel toggle */}
        <PixelToggle isDark={isDark} onClick={toggleTheme} />
        </motion.nav>
      </div>
    );
}