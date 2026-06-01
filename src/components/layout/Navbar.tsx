"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PixelLogo from "@/components/ui/PixelLogo";
import PixelToggle from "@/components/ui/PixelToggle";
import PixelIconBtn from "@/components/ui/PixelIconBtn";
import AboutModal from "@/components/ui/modals/AboutModal";
import '@hackernoon/pixel-icon-library/fonts/iconfont.css';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export default function Navbar({ isDark, onToggleTheme }: NavbarProps) {
  const [aboutOpen, setAboutOpen] = useState(false);

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

        {/* Right side: info button + theme toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <PixelToggle isDark={isDark} onClick={onToggleTheme} />
          <PixelIconBtn onClick={() => setAboutOpen(true)} title="About SwiftKeys" showTitle={false}>
            <i className="hn hn-info-circle text-[18px]" />
          </PixelIconBtn>
        </div>  
      </motion.nav>

      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  );
}