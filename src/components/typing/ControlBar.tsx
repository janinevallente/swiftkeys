"use client";

import { motion } from "framer-motion";
import type { Difficulty } from "@/lib/texts";

interface ControlBarProps {
  duration: number;
  difficulty: Difficulty;
  soundEnabled: boolean;
  isDark: boolean;
  onDuration: (d: number) => void;
  onDifficulty: (d: Difficulty) => void;
  onToggleSound: () => void;
  onToggleTheme: () => void;
  onRestart: () => void;
  status: "idle" | "running" | "finished";
}

const durations = [15, 30, 60];
const difficulties: Difficulty[] = ["easy", "medium", "hard"];

export function ControlBar({
  duration,
  difficulty,
  soundEnabled,
  isDark,
  onDuration,
  onDifficulty,
  onToggleSound,
  onToggleTheme,
  onRestart,
  status,
}: ControlBarProps) {
  const accent = isDark ? "var(--cyan)" : "#c47c2b";
  const muted = isDark ? "var(--text-muted)" : "#b8a080";
  const inactive = isDark ? "var(--text-secondary)" : "#8a7060";
  const disabled = status === "running";

  // Shared pill style
  const pill = (active: boolean, isDisabled: boolean) => ({
    color: active ? accent : isDisabled ? muted : inactive,
    opacity: isDisabled && !active ? 0.45 : 1,
    cursor: isDisabled ? "not-allowed" : "pointer",
    fontFamily: "var(--font-mono)",
    fontSize: "0.78rem",
    letterSpacing: "0.04em",
    padding: "4px 10px",
    borderRadius: "6px",
    background: active
      ? isDark ? "rgba(0,212,255,0.08)" : "rgba(196,124,43,0.1)"
      : "transparent",
    border: "none",
    transition: "color 0.15s, background 0.15s",
  });

  const divider = (
    <span
      style={{
        display: "inline-block",
        width: "1px",
        height: "14px",
        background: isDark ? "var(--border-subtle)" : "#d8c8b0",
        margin: "0 6px",
        verticalAlign: "middle",
        opacity: 0.6,
      }}
    />
  );

  return (
    <div className="flex items-center justify-between w-full flex-wrap gap-y-3">
      {/* Left: duration + difficulty pills */}
      <div
        className="flex items-center flex-wrap gap-0"
        style={{
          background: isDark ? "var(--bg-surface)" : "rgba(0,0,0,0.04)",
          borderRadius: "10px",
          padding: "4px 6px",
          gap: "2px",
        }}
      >
        {/* Duration */}
        {durations.map((d) => (
          <motion.button
            key={d}
            whileTap={!disabled ? { scale: 0.92 } : {}}
            onClick={() => { if (!disabled) onDuration(d); }}
            disabled={disabled}
            style={pill(duration === d, disabled)}
          >
            {d}s
          </motion.button>
        ))}

        {/* Divider */}
        <span
          style={{
            display: "inline-block",
            width: "1px",
            height: "14px",
            background: isDark ? "var(--border-subtle)" : "#d8c8b0",
            margin: "0 4px",
            opacity: 0.5,
          }}
        />

        {/* Difficulty */}
        {difficulties.map((d) => (
          <motion.button
            key={d}
            whileTap={!disabled ? { scale: 0.92 } : {}}
            onClick={() => { if (!disabled) onDifficulty(d); }}
            disabled={disabled}
            style={pill(difficulty === d, disabled)}
          >
            {d}
          </motion.button>
        ))}
      </div>

      {/* Right: icon actions */}
      <div className="flex items-center gap-1">
        <IconBtn
          onClick={onToggleSound}
          title={soundEnabled ? "mute" : "unmute"}
          isDark={isDark}
        >
          {soundEnabled ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          )}
        </IconBtn>

        <IconBtn
          onClick={onRestart}
          title="restart (tab)"
          isDark={isDark}
        >
          <svg width="13.4" height="13.4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M1 4v6h6M3.51 15a9 9 0 1 0 .49-3.03" />
          </svg>
        </IconBtn>
      </div>
    </div>
  );
}

function IconBtn({
  children,
  onClick,
  title,
  isDark,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
  isDark: boolean;
}) {
  const muted = isDark ? "var(--text-muted)" : "#b8a080";
  const accent = isDark ? "var(--cyan)" : "#c47c2b";
  return (
    <motion.button
      whileHover={{ color: accent }}
      whileTap={{ scale: 0.88 }}
      onClick={onClick}
      title={title}
      className="p-2 rounded-lg transition-colors duration-150"
      style={{ color: muted }}
    >
      {children}
    </motion.button>
  );
}