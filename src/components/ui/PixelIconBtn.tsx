"use client";

import { motion } from "framer-motion";

export default function PixelIconBtn({ children, onClick, title }: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      title={title}
      className="flex items-center justify-center bg-bg-surface text-text-muted border-2 border-border-strong shadow-pixel-base cursor-pointer p-1.5 hover:text-accent hover:border-accent hover:shadow-pixel-accent transition-colors duration-150"
    >
      {children}
    </motion.button>
  );
}