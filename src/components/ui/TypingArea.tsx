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
        container.scrollTo({ top: cursorTop - 56, behavior: "smooth" });
      }
      if (cursorTop < scrollTop + 40) {
        container.scrollTo({ top: cursorTop - 56, behavior: "smooth" });
      }
    }
  }, [cursor]);

  const untypedColor = "var(--text-muted)";
  const correctColor = "var(--cyan)";
  const incorrectColor = "var(--red)";
  const cursorColor = "var(--amber)";

  return (
    <div
      style={{
        background: "var(--bg-surface)",
        border: "2px solid var(--border-strong)",
        boxShadow: "4px 4px 0px var(--border-strong), 0 0 20px var(--cyan-glow)",
        padding: "20px 24px 24px",
        position: "relative",
      }}
    >
      {/* Corner decorations */}
      <CornerDeco pos="top-left" />
      <CornerDeco pos="top-right" />
      <CornerDeco pos="bottom-left" />
      <CornerDeco pos="bottom-right" />

      <div
        ref={containerRef}
        className="relative w-full overflow-hidden"
        style={{ maxHeight: "172px" }}
      >
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none z-10"
          style={{
            background: "linear-gradient(to top, var(--bg-surface), transparent)",
          }}
        />

        <div
          className="select-none pb-5"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "1.6rem",
            lineHeight: "3rem",
            wordBreak: "break-word",
            whiteSpace: "pre-wrap",
            letterSpacing: "0.04em",
            color: untypedColor,
          }}
        >
          {chars.map((c, i) => {
            const isActive = i === cursor;
            return (
              <span key={i} className="relative inline-block">
                {isActive && (
                  <motion.span
                    ref={cursorRef}
                    className="absolute"
                    style={{
                      left: "0px",
                      top: "4px",
                      bottom: "4px",
                      width: "3px",
                      background: cursorColor,
                      boxShadow: `0 0 8px ${cursorColor}, 0 0 16px rgba(255,184,0,0.4)`,
                    }}
                    animate={{ opacity: [1, 1, 0, 0] }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: "linear", times: [0, 0.45, 0.45, 1] }}
                  />
                )}
                <span
                  style={{
                    color:
                      c.state === "correct" ? correctColor
                      : c.state === "incorrect" ? incorrectColor
                      : untypedColor,
                    textShadow:
                      c.state === "correct"
                        ? "0 0 8px var(--cyan-glow-strong)"
                        : c.state === "incorrect"
                        ? "0 0 8px rgba(255,60,60,0.5)"
                        : "none",
                    textDecoration: c.state === "incorrect" ? `underline ${incorrectColor}` : "none",
                  }}
                >
                  {c.char === " " ? "\u00a0" : c.char}
                </span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CornerDeco({ pos }: { pos: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const style: React.CSSProperties = {
    position: "absolute",
    width: "8px",
    height: "8px",
    border: "2px solid var(--cyan)",
  };
  if (pos === "top-left") { style.top = "-2px"; style.left = "-2px"; style.borderRight = "none"; style.borderBottom = "none"; }
  if (pos === "top-right") { style.top = "-2px"; style.right = "-2px"; style.borderLeft = "none"; style.borderBottom = "none"; }
  if (pos === "bottom-left") { style.bottom = "-2px"; style.left = "-2px"; style.borderRight = "none"; style.borderTop = "none"; }
  if (pos === "bottom-right") { style.bottom = "-2px"; style.right = "-2px"; style.borderLeft = "none"; style.borderTop = "none"; }
  return <span style={style} />;
}