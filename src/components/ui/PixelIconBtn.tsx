"use client";

import { motion } from "framer-motion";

interface PixelIconBtnProps {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
  variant?: "default" | "danger";
  showTitle?: boolean; // New optional toggle prop
}

export default function PixelIconBtn({ 
  children, 
  onClick, 
  title, 
  variant = "default",
  showTitle = true // Defaults to showing text if not specified
}: PixelIconBtnProps) {
  
  // Set up baseline theme states vs solid red danger states
  const themeClasses = variant === "danger"
    ? "bg-danger text-white border-danger shadow-[2px_2px_0px_var(--border-strong)] hover:bg-opacity-90"
    : "bg-bg-surface text-text-muted border-border-strong shadow-pixel-base hover:text-accent hover:border-accent hover:shadow-pixel-accent";

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      title={title} // Crucial for icon-only mode so users still see a tooltip on hover
      className={`flex items-center justify-center border-2 cursor-pointer transition-all duration-150 group ${themeClasses} ${
        showTitle ? "py-1.5 px-2.5 gap-1.5" : "py-1 px-0.5 min-w-[32px]"
      }`}
    >
      {/* Icon injection point */}
      {children}
      
      {/* Label tracker — only renders when showTitle is true */}
      {showTitle && (
        <span className={`font-pixel text-6xs tracking-wider uppercase select-none transition-colors duration-150 ${variant === "danger" ? "text-white" : "text-text-muted group-hover:text-accent"}`}>
          {title}
        </span>
      )}
    </motion.button>
  );
}