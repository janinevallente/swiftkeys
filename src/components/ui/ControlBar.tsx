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

      {/* Left: duration + difficulty groups */}
      <div className="flex items-center gap-3 flex-wrap">

        {/* Duration */}
        <div className="flex items-center gap-1">
          <span className="font-pixel text-4xs text-text-muted tracking-wider2 mr-1">TIME</span>
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

        {/* Divider */}
        <div className="w-px h-5 bg-border-strong" />

        {/* Difficulty */}
        <div className="flex items-center gap-1">
          <span className="font-pixel text-4xs text-text-muted tracking-wider2 mr-1">LVL</span>
          {difficulties.map((d) => (
            <PixelBtn
              key={d}
              active={difficulty === d}
              disabled={disabled}
              onClick={() => { if (!disabled) onDifficulty(d); }}
              amber={true}
            >
              {d.toUpperCase()}
            </PixelBtn>
          ))}
        </div>
      </div>

      {/* Right: icon buttons */}
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
  // Dynamic classes based on active/disabled/amber state
  const base = "font-pixel text-6xs tracking-pixel border-2 cursor-pointer transition-none";

  const activeClass = amber
    ? "bg-amber text-bg-base border-amber shadow-pixel-accent"
    : "bg-accent text-bg-base border-accent shadow-pixel-accent";

  const idleClass = amber
    ? "bg-bg-surface text-amber border-border-strong shadow-pixel-base hover:border-amber"
    : "bg-bg-surface text-accent border-border-strong shadow-pixel-base hover:border-accent";

  const disabledClass = "bg-bg-surface text-text-dim border-border-subtle shadow-pixel-base opacity-35 cursor-not-allowed";

  const className = [
    base,
    "px-2 py-1",
    active ? activeClass : disabled ? disabledClass : idleClass,
  ].join(" ");

  return (
    <button onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  );
}

function PixelIconBtn({ children, onClick, title }: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      title={title}
      className="flex items-center justify-center bg-bg-surface text-text-muted border-2 border-border-strong shadow-pixel-base cursor-pointer p-1.5 hover:text-accent hover:border-accent hover:shadow-pixel-accent transition-colors duration-150"
    >
      {children}
    </motion.button>
  );
}