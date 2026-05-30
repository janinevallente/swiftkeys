"use client";

import { motion } from "framer-motion";
import { Volume2, VolumeX, RotateCcw } from "lucide-react";
import type { Difficulty } from "@/lib/texts";

interface ControlBarProps {
  duration: number;
  difficulty: Difficulty;
  soundEnabled: boolean;
  isDark: boolean;
  onDuration: (d: number) => void;
  onDifficulty: (d: Difficulty) => void;
  onToggleSound: () => void;
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
  onRestart,
  status,
}: ControlBarProps) {
  const disabled = status === "running";

  return (
    <div className="flex items-center justify-between w-full flex-wrap gap-y-3">
      {/* Left: duration + difficulty pixel buttons */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Duration group */}
        <div className="flex items-center gap-1">
          <span
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: "0.4rem",
              color: "var(--text-muted)",
              letterSpacing: "0.1em",
              marginRight: "4px",
            }}
          >
            TIME
          </span>
          {durations.map((d) => (
            <PixelBtn
              key={d}
              active={duration === d}
              disabled={disabled}
              onClick={() => { if (!disabled) onDuration(d); }}
              amber={false}
            >
              {d}s
            </PixelBtn>
          ))}
        </div>

        {/* Pixel divider */}
        <div
          style={{
            width: "2px",
            height: "20px",
            background: "var(--border-strong)",
          }}
        />

        {/* Difficulty group */}
        <div className="flex items-center gap-1">
          <span
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: "0.4rem",
              color: "var(--text-muted)",
              letterSpacing: "0.1em",
              marginRight: "4px",
            }}
          >
            LVL
          </span>
          {difficulties.map((d) => (
            <PixelBtn
              key={d}
              active={difficulty === d}
              disabled={disabled}
              onClick={() => { if (!disabled) onDifficulty(d); }}
              amber={true}
            >
              {/* {d === "easy" ? "1P" : d === "medium" ? "2P" : "3P"} */}
              {d?.toUpperCase()}
            </PixelBtn>
          ))}
        </div>
      </div>

      {/* Right: icon action buttons */}
      <div className="flex items-center gap-2">
        <PixelIconBtn onClick={onToggleSound} title={soundEnabled ? "Mute" : "Unmute"}>
          {soundEnabled ? <Volume2 size={13} strokeWidth={2} /> : <VolumeX size={13} strokeWidth={2} />}
        </PixelIconBtn>
        <PixelIconBtn onClick={onRestart} title="Restart (Tab)">
          <RotateCcw size={13} strokeWidth={2} />
        </PixelIconBtn>
      </div>
    </div>
  );
}

function PixelBtn({
  children,
  active,
  disabled,
  onClick,
  amber,
}: {
  children: React.ReactNode;
  active: boolean;
  disabled: boolean;
  onClick: () => void;
  amber: boolean;
}) {
  const accentColor = amber ? "var(--amber)" : "var(--cyan)";
  const accentGlow = amber ? "rgba(255,184,0,0.25)" : "var(--cyan-glow)";
  const accentShadow = amber ? "rgba(255,184,0,0.35)" : "var(--cyan-dim)";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        fontFamily: "var(--font-pixel)",
        fontSize: "0.45rem",
        letterSpacing: "0.05em",
        padding: "5px 9px",
        background: active ? accentColor : "var(--bg-surface)",
        color: active ? "var(--bg-base)" : disabled ? "var(--text-dim)" : accentColor,
        border: `2px solid ${active ? accentColor : disabled ? "var(--border-subtle)" : "var(--border-strong)"}`,
        boxShadow: active ? `2px 2px 0px ${accentShadow}, 0 0 10px ${accentGlow}` : "2px 2px 0px var(--bg-base)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled && !active ? 0.35 : 1,
        transition: "none",
        imageRendering: "pixelated",
      }}
      onMouseEnter={e => {
        if (!disabled && !active) {
          (e.currentTarget as HTMLButtonElement).style.borderColor = accentColor;
          (e.currentTarget as HTMLButtonElement).style.color = accentColor;
          (e.currentTarget as HTMLButtonElement).style.boxShadow = `2px 2px 0px ${accentShadow}`;
        }
      }}
      onMouseLeave={e => {
        if (!disabled && !active) {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-strong)";
          (e.currentTarget as HTMLButtonElement).style.color = accentColor;
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "2px 2px 0px var(--bg-base)";
        }
      }}
    >
      {children}
    </button>
  );
}

function PixelIconBtn({
  children,
  onClick,
  title,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      title={title}
      style={{
        color: "var(--text-muted)",
        background: "var(--bg-surface)",
        border: "2px solid var(--border-strong)",
        cursor: "pointer",
        padding: "5px 7px",
        boxShadow: "2px 2px 0px var(--bg-base)",
        lineHeight: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.color = "var(--cyan)";
        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--cyan)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "2px 2px 0px var(--cyan-dim)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)";
        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-strong)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "2px 2px 0px var(--bg-base)";
      }}
    >
      {children}
    </motion.button>
  );
}