"use client";

import { motion } from "framer-motion";
import type { TestResult } from "@/hooks/useTypingTest";

interface ResultsProps {
  result: TestResult;
  isDark: boolean;
  onRestart: () => void;
}

export function Results({ result, isDark, onRestart }: ResultsProps) {
  const primary = isDark ? "var(--text-primary)" : "#0d1a2e";
  const muted = isDark ? "var(--text-secondary)" : "#6a8aaa";
  const border = isDark ? "var(--border-subtle)" : "#dde8f4";
  const cardBg = isDark ? "var(--bg-surface)" : "#f5f9ff";
  const accent = isDark ? "var(--cyan)" : "#0099bb";

  const secondaryStats = [
    { label: "accuracy", value: result.accuracy, suffix: "%" },
    { label: "correct", value: result.correct, suffix: "" },
    { label: "errors", value: result.incorrect, suffix: "" },
    { label: "time", value: Math.round(result.duration), suffix: "s" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      {/* WPM Hero */}
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
            <div className="font-mono text-xs" style={{ color: isDark ? "var(--text-muted)" : "#b0c4d8" }}>words/min</div>
          </div>
        </div>
      </div>

      {/* Secondary stats */}
      <div
        className="grid grid-cols-4 rounded-xl overflow-hidden mb-6"
        style={{ border: `1px solid ${border}` }}
      >
        {secondaryStats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.06, duration: 0.3 }}
            className="text-center py-5 px-2"
            style={{
              background: cardBg,
              borderRight: i < 3 ? `1px solid ${border}` : "none",
            }}
          >
            <div
              className="font-mono font-bold tabular-nums mb-1"
              style={{ fontSize: "1.35rem", color: primary }}
            >
              {s.value}{s.suffix}
            </div>
            <div
              className="text-xs uppercase"
              style={{ color: muted, fontFamily: "var(--font-mono)", letterSpacing: "0.12em" }}
            >
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Restart button */}
      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.02, boxShadow: isDark ? "0 0 24px rgba(0,212,255,0.25)" : "0 4px 16px rgba(0,153,187,0.2)" }}
          whileTap={{ scale: 0.97 }}
          onClick={onRestart}
          className="flex items-center gap-2.5 px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
          style={{
            background: isDark
              ? "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,212,255,0.08))"
              : "linear-gradient(135deg, #0099bb, #007a99)",
            border: `1px solid ${isDark ? "rgba(0,212,255,0.3)" : "transparent"}`,
            color: isDark ? "var(--cyan)" : "#ffffff",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.04em",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M1 4v6h6M3.51 15a9 9 0 1 0 .49-3.03" />
          </svg>
          restart
        </motion.button>
      </div>
    </motion.div>
  );
}