"use client";

import { motion } from "framer-motion";

interface StatsBarProps {
  wpm: number;
  accuracy: number;
  timeLeft: number;
  isDark: boolean;
  status: "idle" | "running" | "finished";
}

export function StatsBar({ wpm, accuracy, timeLeft, isDark, status }: StatsBarProps) {
  const isLow = timeLeft <= 10 && status === "running";
  const accent = isDark ? "var(--cyan)" : "#c47c2b";
  const muted = isDark ? "var(--text-muted)" : "#b8a080";
  const primary = isDark ? "var(--text-secondary)" : "#7a6858";

  return (
    <div className="flex items-center justify-between gap-6 mb-8 select-none">
      {/* Timer */}
      <div className="flex items-end gap-1.5">
        <motion.span
          key={timeLeft}
          initial={{ y: -4, opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.15 }}
          className="font-mono font-bold tabular-nums leading-none"
          style={{
            fontSize: "2.75rem",
            color: isLow ? "var(--red)" : accent,
            textShadow: isLow
              ? "0 0 20px rgba(255,77,106,0.4)"
              : isDark ? "0 0 20px rgba(0,212,255,0.3)" : "none",
          }}
        >
          {timeLeft}
        </motion.span>
        <span
          className="font-mono mb-1.5 text-sm"
          style={{ color: muted }}
        >
          s
        </span>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-5">
        <StatChip
          label="wpm"
          value={status === "idle" ? "—" : String(wpm)}
          isDark={isDark}
          accent={accent}
          muted={muted}
          primary={primary}
          highlight={status === "running"}
        />
        <div style={{ width: "1px", height: "32px", background: isDark ? "var(--border-subtle)" : "#dde8f4" }} />
        <StatChip
          label="acc"
          value={status === "idle" ? "—" : `${accuracy}%`}
          isDark={isDark}
          accent={accent}
          muted={muted}
          primary={primary}
          highlight={false}
        />
      </div>
    </div>
  );
}

function StatChip({
  label, value, isDark, accent, muted, primary, highlight,
}: {
  label: string; value: string; isDark: boolean; accent: string;
  muted: string; primary: string; highlight: boolean;
}) {
  return (
    <div className="text-right">
      <div
        className="font-mono font-bold tabular-nums leading-none"
        style={{
          fontSize: "1.5rem",
          color: highlight ? accent : primary,
          transition: "color 0.2s",
        }}
      >
        {value}
      </div>
      <div
        className="text-xs uppercase mt-1"
        style={{
          color: muted,
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.14em",
        }}
      >
        {label}
      </div>
    </div>
  );
}