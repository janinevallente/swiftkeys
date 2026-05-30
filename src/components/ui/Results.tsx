"use client";

import { motion } from "framer-motion";
import type { TestResult } from "@/hooks/useTypingTest";

interface ResultsProps {
  result: TestResult;
  isDark: boolean;
  onRestart: () => void;
}

export function Results({ result, isDark, onRestart }: ResultsProps) {
  const secondaryStats = [
    { label: "ACCURACY", value: `${result.accuracy}%`,           colorVar: "var(--amber)" },
    { label: "CORRECT",  value: String(result.correct),           colorVar: "var(--cyan)"  },
    { label: "ERRORS",   value: String(result.incorrect),         colorVar: result.incorrect > 0 ? "var(--red)" : "var(--cyan)" },
    { label: "TIME",     value: `${Math.round(result.duration)}s`, colorVar: "var(--text-secondary)" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-pixel text-[0.7rem] text-amber tracking-wider8 mb-1.5"
        >
          ★ STAGE CLEAR ★
        </motion.div>
        <div className="font-pixel text-4xs text-text-muted tracking-wider5">
          PLAYER 1 RESULTS
        </div>
      </div>

      {/* WPM hero panel */}
      <div className="flex justify-center mb-6">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-bg-surface border-2 border-accent shadow-hero-box text-center px-9 py-4"
        >
          <CornerDeco pos="top-left" />
          <CornerDeco pos="top-right" />
          <CornerDeco pos="bottom-left" />
          <CornerDeco pos="bottom-right" />

          <div className="font-pixel text-4xs text-text-muted tracking-wider8 mb-2">
            FINAL SCORE
          </div>
          <div
            className="font-mono font-bold leading-none tracking-pixel text-accent"
            style={{
              fontSize: "clamp(4rem, 14vw, 6.5rem)",
              textShadow: "0 0 24px var(--cyan-glow-strong), 0 0 48px var(--cyan-glow)",
            }}
          >
            {result.wpm}
          </div>
          <div className="font-pixel text-7xs text-text-sub tracking-wider5 mt-2">
            WPM
          </div>
        </motion.div>
      </div>

      {/* Secondary stats grid */}
      <div className="grid grid-cols-4 mb-6 bg-bg-surface border-2 border-border-strong shadow-pixel-strong">
        {secondaryStats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 + i * 0.06, duration: 0.3 }}
            className={`text-center py-3.5 px-2.5 ${i < 3 ? "border-r-2 border-border-strong" : ""}`}
          >
            <div className="font-pixel text-2xs text-text-muted tracking-wider4 mb-2">
              {s.label}
            </div>
            <div
              className="font-mono text-[1.8rem] font-bold leading-none tracking-pixel"
              style={{
                color: s.colorVar,
                textShadow: `0 0 10px ${s.colorVar}55`,
              }}
            >
              {s.value}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Restart button */}
      <div className="flex justify-center">
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={onRestart}
          className="font-pixel text-7xs tracking-wider5 px-6 py-2.5 bg-bg-base text-accent border-2 border-accent shadow-[4px_4px_0px_var(--cyan-dim)] cursor-pointer flex items-center gap-2.5 hover:bg-accent hover:text-bg-base transition-colors duration-150"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
            <path d="M1 4v6h6M3.51 15a9 9 0 1 0 .49-3.03" />
          </svg>
          PLAY AGAIN
        </motion.button>
      </div>
    </motion.div>
  );
}

function CornerDeco({ pos }: { pos: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const base = "absolute w-2 h-2 border-2 border-amber";
  const variants: Record<typeof pos, string> = {
    "top-left":     "-top-px -left-px border-r-0 border-b-0",
    "top-right":    "-top-px -right-px border-l-0 border-b-0",
    "bottom-left":  "-bottom-px -left-px border-r-0 border-t-0",
    "bottom-right": "-bottom-px -right-px border-l-0 border-t-0",
  };
  return <span className={`${base} ${variants[pos]}`} />;
}