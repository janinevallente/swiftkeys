"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import type { CharData } from "@/hooks/useTypingTest";

interface TypingAreaProps {
  chars: CharData[];
  cursor: number;
  isDark: boolean;
}

export function TypingArea({ chars, cursor, isDark }: TypingAreaProps) {
  const cursorRef = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (cursorRef.current && containerRef.current) {
      const cursorEl = cursorRef.current;
      const container = containerRef.current;
      const cursorTop = cursorEl.offsetTop;
      const cursorBottom = cursorTop + cursorEl.offsetHeight;
      const containerHeight = container.clientHeight;
      const scrollTop = container.scrollTop;

      if (cursorBottom > scrollTop + containerHeight - 40) {
        container.scrollTo({ top: cursorTop - 60, behavior: "smooth" });
      }
      if (cursorTop < scrollTop + 40) {
        container.scrollTo({ top: cursorTop - 60, behavior: "smooth" });
      }
    }
  }, [cursor]);

  // Untyped color (both "idle" and "active" look the same — gray)
  const untypedColor = isDark ? "#4a4a42" : "#c4bfb5";

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ maxHeight: "160px" }}
    >
      <div
        className="text-2xl md:text-3xl leading-relaxed tracking-wide font-mono select-none relative"
        style={{
          lineHeight: "2.6rem",
          wordBreak: "break-word",
          whiteSpace: "pre-wrap",
        }}
      >
        {chars.map((c, i) => {
          const isActive = i === cursor;
          return (
            <span key={i} className="relative inline-block">
              {isActive && (
                <motion.span
                  ref={cursorRef}
                  className="absolute -left-0.5 top-0 bottom-0 w-0.5 rounded-full"
                  style={{ background: isDark ? "#e4c96b" : "#d97706" }}
                  animate={{ opacity: [1, 1, 0, 0] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                    times: [0, 0.5, 0.5, 1],
                  }}
                />
              )}
              <span
                className="transition-colors duration-75"
                style={{
                  color: (() => {
                    if (c.state === "correct") return isDark ? "#a8b5a0" : "#4b7a4b";
                    if (c.state === "incorrect") return isDark ? "#c87171" : "#b91c1c";
                    if (c.state === "active") return isDark ? "#e8e4d9" : "#1a1a1a";
                    return untypedColor; // idle state
                  })(),
                  textDecoration: c.state === "incorrect" 
                    ? `underline ${isDark ? "#c87171" : "#b91c1c"}`
                    : "none",
                  backgroundColor: c.state === "active" 
                    ? (isDark ? "rgba(228, 201, 107, 0.15)" : "rgba(217, 119, 6, 0.1)")
                    : "transparent",
                  borderRadius: "2px",
                }}
              >
                {c.char === " " ? "\u00a0" : c.char}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}