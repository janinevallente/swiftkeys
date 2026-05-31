"use client";

import { motion } from "framer-motion";
import { ScoreHistory } from "./ScoreHistory";
import CornerDeco from "@/components/styling/CornerDeco";
import type { TestResult } from "@/hooks/useTypingTest";
import type { ScoreEntry } from "@/hooks/useScoreHistory";

interface ResultsProps {
  result: TestResult;
  isDark: boolean;
  onRestart: () => void;
  history: ScoreEntry[];
  onClearHistory: () => void;
}

export function Results({ result, isDark, onRestart, history, onClearHistory }: ResultsProps) {
  const secondaryStats = [
    { label: "ACC",     value: `${result.accuracy}%`,            colorVar: "var(--amber)" },
    { label: "CORRECT", value: String(result.correct),            colorVar: "var(--default)"  },
    { label: "ERRORS",  value: String(result.incorrect),          colorVar: result.incorrect > 0 ? "var(--red)" : "var(--default)" },
    { label: "TIME",    value: `${Math.round(result.duration)}s`, colorVar: "var(--text-secondary)" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      {/* Header */}
      <div className="text-center mb-4 sm:mb-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-pixel text-[0.5rem] sm:text-[0.7rem] text-amber tracking-wider8 mb-1.5"
        >
          ★ STAGE CLEAR ★
        </motion.div>
        <div className="font-pixel text-[0.3rem] sm:text-4xs text-text-muted tracking-wider5">
          PLAYER 1 RESULTS
        </div>
      </div>

      {/* WPM hero panel */}
      <div className="flex justify-center mb-4 sm:mb-6">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-bg-surface border-2 border-accent shadow-hero-box text-center px-6 sm:px-9 py-3 sm:py-4"
        >
          <CornerDeco pos="top-left" />
          <CornerDeco pos="top-right" />
          <CornerDeco pos="bottom-left" />
          <CornerDeco pos="bottom-right" />

          <div className="font-pixel text-[0.3rem] sm:text-4xs text-text-muted tracking-wider8 mb-2">
            FINAL SCORE
          </div>
          <div
            className="font-mono font-bold leading-none tracking-pixel text-accent"
            style={{
              fontSize: "clamp(3rem, 18vw, 6.5rem)",
            }}
          >
            {result.wpm}
          </div>
          <div className="font-pixel text-[0.35rem] sm:text-7xs text-text-sub tracking-wider5 mt-2">
            WPM
          </div>
        </motion.div>
      </div>

      {/* Secondary stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 mb-4 sm:mb-6 bg-bg-surface border-2 border-border-strong shadow-pixel-strong">
        {secondaryStats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 + i * 0.06, duration: 0.3 }}
            className={`text-center py-2.5 sm:py-3.5 px-2 sm:px-2.5 border-border-strong
              ${i % 2 === 0 ? "border-r-2" : ""}
              ${i < 2 ? "border-b-2 sm:border-b-0" : ""}
              ${i === 1 ? "sm:border-r-2" : ""}
              ${i === 2 ? "sm:border-r-2" : ""}
            `}
          >
            <div className="font-pixel text-[0.28rem] sm:text-2xs text-text-muted tracking-wider4 mb-1.5 sm:mb-2">
              {s.label}
            </div>
            <div
              className="font-mono text-[1.3rem] sm:text-[1.8rem] font-bold leading-none tracking-pixel"
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
      <div className="flex justify-center mb-2">
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={onRestart}
          className="font-pixel text-[0.35rem] sm:text-7xs tracking-wider5 px-4 sm:px-6 py-2 sm:py-2.5 bg-bg-base text-accent border-2 border-accent shadow-[4px_4px_0px_var(--default-dim)] cursor-pointer flex items-center gap-2 sm:gap-2.5 hover:bg-accent hover:text-bg-base transition-colors duration-150"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
            <path d="M1 4v6h6M3.51 15a9 9 0 1 0 .49-3.03" />
          </svg>
          PLAY AGAIN
        </motion.button>
      </div>

      {/* Score history */}
      <ScoreHistory history={history} onClear={onClearHistory} />
    </motion.div>
  );
}