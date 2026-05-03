"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CharData } from "@/hooks/useTypingTest";

interface TypingAreaProps {
  chars: CharData[];
  cursor: number;
  isDark: boolean;
}

export function TypingArea({ chars, cursor, isDark }: TypingAreaProps) {
  const cursorRef = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to keep cursor visible
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
              {/* Blinking cursor before this char */}
              {isActive && (
                <motion.span
                  ref={cursorRef}
                  className="absolute -left-0.5 top-0 bottom-0 w-0.5 rounded-full"
                  style={{
                    background: isDark ? "#e4c96b" : "#d97706",
                  }}
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ 
                    duration: 1, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    repeatType: "mirror"
                  }}
                />
              )}
              <span
                className="transition-colors duration-75"
                style={{
                  color:
                    c.state === "correct"
                      ? isDark
                        ? "#a8b5a0"
                        : "#4b7a4b"
                      : c.state === "incorrect"
                      ? isDark
                        ? "#c87171"
                        : "#b91c1c"
                      : c.state === "active"
                      ? isDark
                        ? "#e8e4d9"
                        : "#1a1a1a"
                      : isDark
                      ? "#4a4a42"
                      : "#c4bfb5",
                  textDecorationLine: c.state === "incorrect" ? "underline" : "none",
                  textDecorationColor: isDark ? "#c87171" : "#b91c1c",
                  textDecorationThickness: "auto", // optional
                  textDecorationStyle: "solid",     // optional
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
