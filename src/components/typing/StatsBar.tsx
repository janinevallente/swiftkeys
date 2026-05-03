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
  const muted = isDark ? "#4a4a42" : "#c4bfb5";
  const primary = isDark ? "#e8e4d9" : "#1a1a1a";
  const accent = isDark ? "#e4c96b" : "#d97706";

  const timerPct = Math.min(timeLeft / 60, 1);
  const isLow = timeLeft <= 10 && status === "running";

  return (
    <div className="flex items-center justify-between gap-6 mb-6 select-none">
      {/* Timer */}
      <div className="flex items-center gap-3">
        <motion.span
          key={timeLeft}
          initial={{ scale: 1.15, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-4xl font-mono font-bold tabular-nums"
          style={{ color: isLow ? "#e05555" : accent }}
        >
          {timeLeft}
        </motion.span>
        <span className="text-sm" style={{ color: muted }}>
          s
        </span>
      </div>

      {/* Live stats */}
      <div className="flex items-center gap-6">
        <Stat label="wpm" value={status === "idle" ? "—" : String(wpm)} color={primary} muted={muted} />
        <Stat label="acc" value={status === "idle" ? "—" : `${accuracy}%`} color={primary} muted={muted} />
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  color,
  muted,
}: {
  label: string;
  value: string;
  color: string;
  muted: string;
}) {
  return (
    <div className="text-center">
      <div className="text-2xl font-mono font-semibold tabular-nums" style={{ color }}>
        {value}
      </div>
      <div className="text-xs uppercase tracking-widest mt-0.5" style={{ color: muted, letterSpacing: "0.14em" }}>
        {label}
      </div>
    </div>
  );
}
