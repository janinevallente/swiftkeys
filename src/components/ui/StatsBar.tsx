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
  const isLow  = timeLeft <= 10 && status === "running";
  const isIdle = status === "idle";

  return (
    <div className="flex items-center justify-between gap-6 mb-6 select-none">

      {/* Timer panel */}
      <div className="flex items-end gap-2">
        <div
          className={`flex items-center gap-2 px-3.5 py-1.5 bg-bg-surface border-2 ${
            isLow
              ? "border-danger shadow-[3px_3px_0px_rgba(255,60,60,0.4)]"
              : "border-border-strong shadow-pixel-border"
          }`}
        >
          <span
            className={`font-pixel text-6xs tracking-wider3 ${
              isLow ? "text-danger" : "text-text-muted"
            }`}
          >
            TIME
          </span>
          <motion.span
            key={timeLeft}
            initial={{ y: -3, opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.1 }}
            className={`font-mono text-[2.6rem] font-bold leading-none tracking-pixel ${
              isLow ? "text-danger" : isIdle ? "text-text-muted" : "text-accent"
            }`}
            style={{
              textShadow: isLow
                ? "0 0 14px rgba(255,60,60,0.6)"
                : isIdle ? "none" : "0 0 14px var(--cyan-glow-strong)",
            }}
          >
            {timeLeft}
          </motion.span>
        </div>
      </div>

      {/* WPM + ACC panels */}
      <div className="flex items-center gap-3">
        <PixelStat
          label="WPM"
          value={isIdle ? "---" : String(wpm)}
          highlight={status === "running"}
          colorVar="var(--cyan)"
        />
        <div className="w-px h-9 bg-border-subtle" />
        <PixelStat
          label="ACC"
          value={isIdle ? "---" : `${accuracy}%`}
          highlight={false}
          colorVar="var(--amber)"
        />
      </div>
    </div>
  );
}

function PixelStat({ label, value, highlight, colorVar }: {
  label: string;
  value: string;
  highlight: boolean;
  colorVar: string;
}) {
  return (
    <div
      className="bg-bg-surface border-2 border-border-strong text-right min-w-[80px] px-3 py-1"
      style={{
        boxShadow: highlight
          ? `3px 3px 0px ${colorVar}44, 0 0 10px ${colorVar}22`
          : "3px 3px 0px var(--border-strong)",
      }}
    >
      <div
        className="font-mono text-[1.55rem] font-bold leading-[1.1] tracking-pixel"
        style={{
          color: highlight ? colorVar : "var(--text-secondary)",
          textShadow: highlight ? `0 0 10px ${colorVar}66` : "none",
        }}
      >
        {value}
      </div>
      <div className="font-pixel text-3xs text-text-muted tracking-wider6 mt-0.5">
        {label}
      </div>
    </div>
  );
}