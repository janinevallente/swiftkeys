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

  const untypedColor = isDark ? "var(--text-muted)" : "#b8cce0";
  const correctColor = isDark ? "var(--green-dim)" : "#2e8b6a";
  const incorrectColor = isDark ? "var(--red)" : "#cc2244";
  const cursorColor = isDark ? "var(--cyan)" : "#0099bb";

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ maxHeight: "168px" }}
    >
      {/* Fade out bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none z-10"
        style={{
          background: isDark
            ? "linear-gradient(to top, var(--bg-card), transparent)"
            : "linear-gradient(to top, #ffffff, transparent)",
        }}
      />

      <div
        className="font-mono select-none relative"
        style={{
          fontSize: "1.45rem",
          lineHeight: "2.8rem",
          wordBreak: "break-word",
          whiteSpace: "pre-wrap",
          letterSpacing: "0.02em",
        }}
      >
        {chars.map((c, i) => {
          const isActive = i === cursor;
          return (
            <span key={i} className="relative inline-block">
              {isActive && (
                <motion.span
                  ref={cursorRef}
                  className="absolute rounded-sm"
                  style={{
                    left: "-1px",
                    top: "4px",
                    bottom: "4px",
                    width: "2px",
                    background: cursorColor,
                    boxShadow: isDark ? `0 0 8px ${cursorColor}, 0 0 16px rgba(0,212,255,0.3)` : "none",
                  }}
                  animate={{ opacity: [1, 1, 0, 0] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear", times: [0, 0.5, 0.5, 1] }}
                />
              )}
              <span
                style={{
                  color:
                    c.state === "correct" ? correctColor
                    : c.state === "incorrect" ? incorrectColor
                    : untypedColor,
                  textDecoration:
                    c.state === "incorrect"
                      ? `underline ${incorrectColor}`
                      : "none",
                  transition: "color 0.06s",
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