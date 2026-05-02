"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionRevealProps {
  children: React.ReactNode;
  delay?: number;
  /** "up" = slide up (default), "left" = slide from left, "fade" = opacity only */
  direction?: "up" | "left" | "fade" | "scale";
  className?: string;
  style?: React.CSSProperties;
  amount?: number;
}

/**
 * Wraps children in a scroll-triggered entrance animation.
 * Uses clip-path reveal + translate for a crisp editorial feel.
 */
export default function SectionReveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  style = {},
  amount = 0.2,
}: SectionRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount });

  const variants = {
    hidden: {
      up:    { y: 48, opacity: 0, clipPath: "inset(0 0 100% 0)" },
      left:  { x: -48, opacity: 0, clipPath: "inset(0 100% 0 0)" },
      fade:  { opacity: 0 },
      scale: { scale: 0.94, opacity: 0 },
    },
    visible: {
      up:    { y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)" },
      left:  { x: 0, opacity: 1, clipPath: "inset(0 0% 0 0)" },
      fade:  { opacity: 1 },
      scale: { scale: 1, opacity: 1 },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={variants.hidden[direction]}
      animate={inView ? variants.visible[direction] : variants.hidden[direction]}
      transition={{
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
