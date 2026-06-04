"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import CornerDeco from "@/components/styling/CornerDeco";
import type { CharData } from "@/hooks/useTypingTest";

interface TypingAreaProps {
  chars: CharData[];
  cursor: number;
  isDark: boolean;
}

function groupIntoWords(chars: CharData[]): { chars: CharData[]; startIndex: number; endIndex: number }[] {
  const words: { chars: CharData[]; startIndex: number; endIndex: number }[] = [];
  let current: CharData[] = [];
  let startIndex = 0;
  
  chars.forEach((c, i) => {
    current.push(c);
    if (c.char === " " || i === chars.length - 1) {
      words.push({ 
        chars: current, 
        startIndex,
        endIndex: i
      });
      startIndex = i + 1;
      current = [];
    }
  });
  return words;
}

export function TypingArea({ chars, cursor, isDark }: TypingAreaProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [lineIndex, setLineIndex] = useState(0);
  const words = groupIntoWords(chars);

  const desktopLineHeight = 56; // 3.5rem = 56px
  const mobileLineHeight = 40;  // 2.5rem = 40px

  useEffect(() => {
    // Find the word the cursor is currently inside
    const activeWordIndex = words.findIndex(w => cursor >= w.startIndex && cursor <= w.endIndex);
    
    if (activeWordIndex !== -1 && containerRef.current) {
      const wordElements = containerRef.current.querySelectorAll(".word-box");
      const activeWordEl = wordElements[activeWordIndex] as HTMLElement;
      const firstWordEl = wordElements[0] as HTMLElement;

      if (activeWordEl && firstWordEl) {
        // Calculate exact distance from the very first line of text
        const activeWordTop = activeWordEl.offsetTop;
        const firstWordTop = firstWordEl.offsetTop;
        const relativeTop = activeWordTop - firstWordTop;

        // Determine line heights dynamically matching CSS lineHeights below
        const isDesktop = window.innerWidth >= 768;
        const currentLineHeight = isDesktop ? desktopLineHeight : mobileLineHeight;

        // Calculate the absolute math row (0, 1, 2, etc.) based on structural layout lines
        const exactCalculatedLine = Math.round(relativeTop / currentLineHeight);

        // Update if it doesn't match, locking it strictly to the real row position
        if (exactCalculatedLine !== lineIndex && exactCalculatedLine >= 0) {
          setLineIndex(exactCalculatedLine);
        }
      }
    }
  }, [cursor, words, lineIndex]);

  // Reset typewriter carriage mechanism cleanly on test restart
  useEffect(() => {
    if (cursor === 0) {
      setLineIndex(0);
    }
  }, [cursor]);

  return (
    <div className="relative bg-bg-surface border-2 border-border-strong shadow-typing-box px-4 sm:px-6 md:px-8 pt-5 pb-5 overflow-hidden">
      <CornerDeco pos="top-left" />
      <CornerDeco pos="top-right" />
      <CornerDeco pos="bottom-left" />
      <CornerDeco pos="bottom-right" />

      <div 
        ref={containerRef}
        className="relative w-full overflow-hidden max-h-typing"
      >
        {/* Animated Typewriter Roller Grid */}
        <motion.div 
          className="font-mono select-none flex flex-wrap tracking-pixel text-xl md:text-3xl"
          animate={{ 
            y: typeof window !== "undefined" && window.innerWidth >= 768 
               ? -(lineIndex * desktopLineHeight) 
               : -(lineIndex * mobileLineHeight) 
          }}
          transition={{ type: "spring", stiffness: 240, damping: 28 }}
          style={{
            lineHeight: typeof window !== "undefined" && window.innerWidth >= 768 ? '3.5rem' : '2.5rem'
          }}
        >
          {words.map((word, wi) => (
            <span 
              key={wi} 
              className="word-box inline-flex flex-wrap mr-[0.5ch] last:mr-0 h-[40px] md:h-[56px] items-center"
            >
              {word.chars.map((c, ci) => {
                const globalIndex = word.startIndex + ci;
                const isActive    = globalIndex === cursor;
                
                if (c.char === " ") return null;

                return (
                  <span key={ci} className="relative inline-block">
                    {isActive && (
                      <motion.span
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
                      {c.char}
                    </span>
                  </span>
                );
              })}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}