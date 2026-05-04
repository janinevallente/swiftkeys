"use client";

import { motion } from "framer-motion";
import type { TestResult } from "@/hooks/useTypingTest";

interface ResultsProps {
  result: TestResult;
  isDark: boolean;
  onRestart: () => void;
}

export function Results({ result, isDark, onRestart }: ResultsProps) {
  const accent = isDark ? "var(--cyan)" : "#c47c2b";
  const muted = isDark ? "var(--text-muted)" : "#b8a080";
  const secondary = isDark ? "var(--text-secondary)" : "#7a6858";
  const primary = isDark ? "var(--text-primary)" : "#2a1f0e";
  const divider = isDark ? "var(--border-subtle)" : "#d8c8b0";

  const secondaryStats = [
    { label: "accuracy", value: `${result.accuracy}%` },
    { label: "correct", value: String(result.correct) },
    { label: "errors", value: String(result.incorrect) },
    { label: "time", value: `${Math.round(result.duration)}s` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      {/* WPM hero */}
      {/* <div className="mb-10">
        <div
          className="text-xs uppercase mb-2 tracking-widest"
          style={{ color: muted, fontFamily: "var(--font-mono)", letterSpacing: "0.2em" }}
        >
          wpm
        </div>
        <motion.div
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono font-bold leading-none tabular-nums"
          style={{
            fontSize: "clamp(4.5rem, 14vw, 7rem)",
            color: accent,
            textShadow: isDark ? "0 0 40px rgba(0,212,255,0.2)" : "none",
          }}
        >
          {result.wpm}
        </motion.div>
      </div> */}
      <div className="text-center mb-8">
        <div className="text-xs uppercase tracking-widest mb-3" style={{ color: muted, fontFamily: "var(--font-mono)", letterSpacing: "0.2em" }}>
          result
        </div>
        <div className="flex items-end justify-center gap-3">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono font-bold leading-none tabular-nums"
            style={{
              fontSize: "clamp(5rem, 18vw, 7rem)",
              color: accent,
              textShadow: isDark ? "0 0 40px rgba(0,212,255,0.25)" : "none",
            }}
          >
            {result.wpm}
          </motion.div>
          <div className="mb-3 text-left">
            <div className="font-mono text-sm font-bold" style={{ color: muted }}>WPM</div>
            <div className="font-mono text-xs" style={{ color: muted }}>words/min</div>
          </div>
        </div>
      </div>

      {/* Secondary stats row */}
      {/* <div className="flex items-start gap-10 mb-10 flex-wrap"> */}
      <div
        className="grid grid-cols-4 rounded-xl overflow-hidden mb-6"
        style={{ border: `1px solid ${divider}` }}
      >
        {secondaryStats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 + i * 0.05, duration: 0.3 }}
            className="text-center py-3 px-2"
            style={{
              // background: accent,
              borderRight: i < 3 ? `1px solid ${divider}` : "none",
            }}
          >
            <div
              className="text-xs uppercase mb-1"
              style={{ color: muted, fontFamily: "var(--font-mono)", letterSpacing: "0.14em" }}
            >
              {s.label}
            </div>
            <div
              className="font-mono font-semibold tabular-nums"
              style={{ fontSize: "1.75rem", color: primary }}
            >
              {s.value}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Restart button */}
      <div className="flex justify-center">
        <motion.button
          whileHover={{
            color: accent,
            background: isDark ? "rgba(0,212,255,0.06)" : "rgba(196,124,43,0.08)",
          }}
          whileTap={{ scale: 0.96 }}
          onClick={onRestart}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
          style={{
            color: muted,
            background: isDark ? "var(--bg-surface)" : "rgba(0,0,0,0.04)",
            border: `1px solid ${divider}`,
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.04em",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M1 4v6h6M3.51 15a9 9 0 1 0 .49-3.03" />
          </svg>
          restart
        </motion.button>
      </div>
    </motion.div>
  );
}