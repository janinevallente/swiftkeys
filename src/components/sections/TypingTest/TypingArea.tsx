"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import CornerDeco from "@/components/styling/CornerDeco";
import type { CharData } from "@/hooks/useTypingTest";

interface TypingAreaProps {
  chars: CharData[];
  cursor: number;
  isDark: boolean;
}

function groupIntoWords(chars: CharData[]): { chars: CharData[]; startIndex: number }[] {
  const words: { chars: CharData[]; startIndex: number }[] = [];
  let current: CharData[] = [];
  let startIndex = 0;
  chars.forEach((c, i) => {
    current.push(c);
    if (c.char === " " || i === chars.length - 1) {
      words.push({ chars: current, startIndex });
      startIndex = i + 1;
      current = [];
    }
  });
  return words;
}

export function TypingArea({ chars, cursor, isDark }: TypingAreaProps) {
  const cursorRef    = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (cursorRef.current && containerRef.current) {
      const cursorEl        = cursorRef.current;
      const container       = containerRef.current;
      const cursorTop       = cursorEl.offsetTop;
      const cursorBottom    = cursorTop + cursorEl.offsetHeight;
      const containerHeight = container.clientHeight;
      const scrollTop       = container.scrollTop;
      if (cursorBottom > scrollTop + containerHeight - 40) {
        container.scrollTo({ top: cursorTop - 56, behavior: "smooth" });
      }
      if (cursorTop < scrollTop + 40) {
        container.scrollTo({ top: cursorTop - 56, behavior: "smooth" });
      }
    }
  }, [cursor]);

  const words = groupIntoWords(chars);

  return (
    <div className="relative bg-bg-surface border-2 border-border-strong shadow-typing-box px-3 sm:px-5 md:px-7 pt-5 sm:pt-8 pb-6 sm:pb-10">
      <CornerDeco pos="top-left" />
      <CornerDeco pos="top-right" />
      <CornerDeco pos="bottom-left" />
      <CornerDeco pos="bottom-right" />

      <div ref={containerRef} className="relative w-full overflow-hidden max-h-typing">
        <div className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none z-10 bg-fade-surface" />

        <div className="font-mono select-none pb-5 tracking-pixel text-xl md:text-3xl leading-[clamp(2rem,6vw,3rem)]">
          {words.map((word, wi) => (
            <span key={wi} className="inline-block">
              {word.chars.map((c, ci) => {
                const globalIndex = word.startIndex + ci;
                const isActive    = globalIndex === cursor;
                return (
                  <span key={ci} className="relative inline-block">
                    {isActive && (
                      <motion.span
                        ref={cursorRef}
                        className="absolute left-0 top-1 bottom-1 w-[2px] sm:w-[3px] bg-amber shadow-[0_0_8px_var(--amber),0_0_16px_rgba(143,184,106,0.4)]"
                        animate={{ opacity: [1, 1, 0, 0] }}
                        transition={{ duration: 0.9, repeat: Infinity, ease: "linear", times: [0, 0.45, 0.45, 1] }}
                      />
                    )}
                    <span
                      className={`${
                        c.state === "correct"
                          ? "text-accent"
                          : c.state === "incorrect"
                          ? "text-danger underline decoration-danger"
                          : "text-text-dim [text-shadow:none]"
                      }`}
                    >
                      {c.char === " " ? "\u00a0" : c.char}
                    </span>
                  </span>
                );
              })}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}