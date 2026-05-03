"use client";

import { motion } from "framer-motion";
import type { TestResult } from "@/hooks/useTypingTest";

interface ResultsProps {
  result: TestResult;
  isDark: boolean;
  onRestart: () => void;
}

export function Results({ result, isDark, onRestart }: ResultsProps) {
  const bg = isDark ? "#1e1e1a" : "#f5f2ed";
  const border = isDark ? "#2e2e26" : "#e0dbd2";
  const primary = isDark ? "#e8e4d9" : "#1a1a1a";
  const muted = isDark ? "#5a5a50" : "#9a9488";
  const accent = isDark ? "#e4c96b" : "#d97706";

  const stats = [
    { label: "WPM", value: result.wpm, suffix: "" },
    { label: "accuracy", value: result.accuracy, suffix: "%" },
    { label: "correct", value: result.correct, suffix: "" },
    { label: "errors", value: result.incorrect, suffix: "" },
    { label: "time", value: Math.round(result.duration), suffix: "s" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      {/* Main WPM */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-8xl md:text-9xl font-mono font-bold leading-none"
          style={{ color: accent }}
        >
          {result.wpm}
        </motion.div>
        <div className="text-sm uppercase tracking-widest mt-2" style={{ color: muted, letterSpacing: "0.16em" }}>
          words per minute
        </div>
      </div>

      {/* Stat grid */}
      <div
        className="grid grid-cols-4 gap-px rounded-xl overflow-hidden mb-8"
        style={{ background: border }}
      >
        {stats.slice(1).map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.07, duration: 0.35 }}
            className="text-center py-5 px-3"
            style={{ background: bg }}
          >
            <div className="text-2xl font-mono font-semibold tabular-nums" style={{ color: primary }}>
              {s.value}{s.suffix}
            </div>
            <div className="text-xs uppercase tracking-widest mt-1" style={{ color: muted, letterSpacing: "0.14em" }}>
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Restart */}
      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onRestart}
          className="flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-medium transition-all duration-200"
          style={{
            background: accent,
            color: isDark ? "#1a1a14" : "#fff",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M1 4v6h6M23 20v-6h-6" />
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15" />
          </svg>
          try again
        </motion.button>
      </div>
    </motion.div>
  );
}
