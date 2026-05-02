"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface WordRevealProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  threshold?: number;
}

export default function WordReveal({
  text,
  className = "",
  style = {},
  delay = 0,
  threshold = 0.3,
}: WordRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold });

  const words = text.split(" ");

  return (
    <span ref={ref} className={className} style={{ ...style, display: "block" }}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * 0.04,
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
