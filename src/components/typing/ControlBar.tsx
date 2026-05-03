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
const difficulties: Difficulty[] = ["easy", "medium", "hard", "code"];

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
  const muted = isDark ? "#4a4a42" : "#c4bfb5";
  const accent = isDark ? "#e4c96b" : "#d97706";
  const surface = isDark ? "#232320" : "#ece8e0";
  const text = isDark ? "#e8e4d9" : "#1a1a1a";

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full">
      {/* Left: time + difficulty */}
      <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
        {/* Separator dot */}
        <div className="hidden sm:block w-1 h-1 rounded-full" style={{ background: muted }} />

        {/* Duration pills */}
        <div className="flex items-center gap-1">
          {durations.map((d) => (
            <PillButton
              key={d}
              active={duration === d}
              accent={accent}
              surface={surface}
              text={text}
              muted={muted}
              onClick={() => {
                if (status === "idle" || status === "finished") onDuration(d);
              }}
              disabled={status === "running"}
            >
              {d}s
            </PillButton>
          ))}
        </div>

        <div className="w-1 h-1 rounded-full" style={{ background: muted }} />

        {/* Difficulty pills */}
        <div className="flex items-center gap-1">
          {difficulties.map((d) => (
            <PillButton
              key={d}
              active={difficulty === d}
              accent={accent}
              surface={surface}
              text={text}
              muted={muted}
              onClick={() => {
                if (status === "idle" || status === "finished") onDifficulty(d);
              }}
              disabled={status === "running"}
            >
              {d}
            </PillButton>
          ))}
        </div>
      </div>

      {/* Right: icon buttons */}
      <div className="flex items-center gap-1">
        {/* Sound */}
        <IconButton onClick={onToggleSound} muted={muted} title={soundEnabled ? "mute" : "unmute"}>
          {soundEnabled ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          )}
        </IconButton>

        {/* Theme */}
        <IconButton onClick={onToggleTheme} muted={muted} title={isDark ? "light mode" : "dark mode"}>
          {isDark ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </IconButton>

        {/* Restart */}
        <IconButton onClick={onRestart} muted={muted} title="restart (tab)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 4v6h6M3.51 15a9 9 0 1 0 .49-3.03" />
          </svg>
        </IconButton>
      </div>
    </div>
  );
}

function PillButton({
  children,
  active,
  onClick,
  disabled,
  accent,
  surface,
  text,
  muted,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
  accent: string;
  surface: string;
  text: string;
  muted: string;
}) {
  return (
    <motion.button
      whileTap={!disabled ? { scale: 0.92 } : {}}
      onClick={onClick}
      disabled={disabled}
      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
      style={{
        background: active ? accent : surface,
        color: active ? "#1a1a14" : disabled ? muted : text,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        letterSpacing: "0.05em",
      }}
    >
      {children}
    </motion.button>
  );
}

function IconButton({
  children,
  onClick,
  muted,
  title,
}: {
  children: React.ReactNode;
  onClick: () => void;
  muted: string;
  title: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      title={title}
      className="p-2 rounded-lg transition-colors duration-150"
      style={{ color: muted }}
    >
      {children}
    </motion.button>
  );
}
