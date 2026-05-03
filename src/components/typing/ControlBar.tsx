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
  const accent = isDark ? "var(--cyan)" : "#0099bb";
  const accentBg = isDark ? "rgba(0,212,255,0.1)" : "rgba(0,153,187,0.1)";
  const accentBorder = isDark ? "rgba(0,212,255,0.25)" : "rgba(0,153,187,0.25)";
  const surface = isDark ? "var(--bg-elevated)" : "#eef4fb";
  const surfaceBorder = isDark ? "var(--border-subtle)" : "#dde8f4";
  const text = isDark ? "var(--text-secondary)" : "#4a6a88";
  const muted = isDark ? "var(--text-muted)" : "#94aac0";
  const divider = isDark ? "var(--border-subtle)" : "#dde8f4";
  const disabled = status === "running";

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full">
      {/* Pill group container */}
      <div
        className="flex items-center gap-0 rounded-xl overflow-hidden"
        style={{ border: `1px solid ${surfaceBorder}`, background: isDark ? "var(--bg-surface)" : "#f0f6ff" }}
      >
        {/* Duration pills */}
        {durations.map((d, i) => (
          <PillBtn
            key={d}
            active={duration === d}
            disabled={disabled}
            onClick={() => { if (!disabled) onDuration(d); }}
            accent={accent}
            accentBg={accentBg}
            accentBorder={accentBorder}
            text={text}
            muted={muted}
            isFirst={i === 0}
            isLast={false}
          >
            {d}s
          </PillBtn>
        ))}
        <div style={{ width: "1px", height: "20px", background: divider, flexShrink: 0 }} />

        {/* Difficulty pills */}
        {difficulties.map((d, i) => (
          <PillBtn
            key={d}
            active={difficulty === d}
            disabled={disabled}
            onClick={() => { if (!disabled) onDifficulty(d); }}
            accent={accent}
            accentBg={accentBg}
            accentBorder={accentBorder}
            text={text}
            muted={muted}
            isFirst={false}
            isLast={i === difficulties.length - 1}
          >
            {d}
          </PillBtn>
        ))}
      </div>

      {/* Icon actions */}
      <div
        className="flex items-center rounded-xl overflow-hidden"
        style={{ border: `1px solid ${surfaceBorder}`, background: isDark ? "var(--bg-surface)" : "#f0f6ff" }}
      >
        <IconBtn onClick={onToggleSound} title={soundEnabled ? "mute" : "unmute"} muted={muted} accent={accent} divider={divider} showDivider>
          {soundEnabled ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          )}
        </IconBtn>
        <IconBtn onClick={onToggleTheme} title={isDark ? "light mode" : "dark mode"} muted={muted} accent={accent} divider={divider} showDivider>
          {isDark ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </IconBtn>
        <IconBtn onClick={onRestart} title="restart (tab)" muted={muted} accent={accent} divider={divider} showDivider={false}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M1 4v6h6M3.51 15a9 9 0 1 0 .49-3.03" />
          </svg>
        </IconBtn>
      </div>
    </div>
  );
}

function PillBtn({
  children, active, disabled, onClick,
  accent, accentBg, accentBorder, text, muted, isFirst, isLast,
}: {
  children: React.ReactNode;
  active: boolean; disabled: boolean;
  onClick: () => void;
  accent: string; accentBg: string; accentBorder: string;
  text: string; muted: string;
  isFirst: boolean; isLast: boolean;
}) {
  return (
    <motion.button
      whileTap={!disabled ? { scale: 0.93 } : {}}
      onClick={onClick}
      disabled={disabled}
      className="px-3.5 py-2 text-xs font-medium transition-all duration-150 relative"
      style={{
        background: active ? accentBg : "transparent",
        color: active ? accent : disabled ? muted : text,
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "var(--font-mono)",
        letterSpacing: "0.05em",
        opacity: disabled && !active ? 0.4 : 1,
        boxShadow: active ? `inset 0 0 0 1px ${accentBorder}` : "none",
      }}
    >
      {children}
    </motion.button>
  );
}

function IconBtn({
  children, onClick, title, muted, accent, divider, showDivider,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
  muted: string;
  accent: string;
  divider: string;
  showDivider: boolean;
}) {
  return (
    <>
      <motion.button
        whileHover={{ color: accent }}
        whileTap={{ scale: 0.88 }}
        onClick={onClick}
        title={title}
        className="p-2.5 transition-colors duration-150"
        style={{ color: muted }}
      >
        {children}
      </motion.button>
      {showDivider && (
        <div style={{ width: "1px", height: "20px", background: divider, flexShrink: 0 }} />
      )}
    </>
  );
}