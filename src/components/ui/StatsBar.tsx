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
  const isIdle = status === "idle";

  return (
    <div className="flex items-center justify-between gap-6 mb-6 select-none">

      {/* Timer — big pixel display */}
      <div className="flex items-end gap-2">
        <div
          style={{
            background: "var(--bg-surface)",
            border: `2px solid ${isLow ? "var(--red)" : "var(--border-strong)"}`,
            boxShadow: isLow
              ? "3px 3px 0px rgba(255,60,60,0.4), 0 0 16px rgba(255,60,60,0.2)"
              : "3px 3px 0px var(--border-strong)",
            padding: "6px 14px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: "0.45rem",
              color: isLow ? "var(--red)" : "var(--text-muted)",
              letterSpacing: "0.12em",
            }}
          >
            TIME
          </span>
          <motion.span
            key={timeLeft}
            initial={{ y: -3, opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.1 }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "2.6rem",
              fontWeight: "bold",
              color: isLow ? "var(--red)" : isIdle ? "var(--text-dim)" : "var(--cyan)",
              textShadow: isLow
                ? "0 0 14px rgba(255,60,60,0.6)"
                : isIdle ? "none" : "0 0 14px var(--cyan-glow-strong)",
              lineHeight: 1,
              letterSpacing: "0.04em",
            }}
          >
            {timeLeft}
          </motion.span>
        </div>
      </div>

      {/* Stats — pixel readouts */}
      <div className="flex items-center gap-3">
        <PixelStat
          label="WPM"
          value={isIdle ? "---" : String(wpm)}
          highlight={status === "running"}
          color="var(--cyan)"
        />
        <div style={{ width: "2px", height: "36px", background: "var(--border-subtle)" }} />
        <PixelStat
          label="ACC"
          value={isIdle ? "---" : `${accuracy}%`}
          highlight={false}
          color="var(--amber)"
        />
      </div>
    </div>
  );
}

function PixelStat({
  label,
  value,
  highlight,
  color,
}: {
  label: string;
  value: string;
  highlight: boolean;
  color: string;
}) {
  return (
    <div
      style={{
        background: "var(--bg-surface)",
        border: "2px solid var(--border-strong)",
        boxShadow: highlight
          ? `3px 3px 0px ${color}44, 0 0 10px ${color}22`
          : "3px 3px 0px var(--border-strong)",
        padding: "5px 12px",
        textAlign: "right",
        minWidth: "80px",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "1.55rem",
          fontWeight: "bold",
          color: highlight ? color : "var(--text-secondary)",
          textShadow: highlight ? `0 0 10px ${color}66` : "none",
          lineHeight: 1.1,
          letterSpacing: "0.04em",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "var(--font-pixel)",
          fontSize: "0.38rem",
          color: "var(--text-muted)",
          letterSpacing: "0.16em",
          marginTop: "3px",
        }}
      >
        {label}
      </div>
    </div>
  );
}