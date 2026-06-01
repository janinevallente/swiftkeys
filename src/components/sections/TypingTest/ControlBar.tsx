"use client";

import { Volume2, VolumeX, RotateCcw } from "lucide-react";
import type { Difficulty } from "@/lib/texts";
import PixelBtn from "@/components/ui/PixelBtn";
import PixelIconBtn from "@/components/ui/PixelIconBtn";

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
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-3">

      <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-3 flex-wrap">
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

        {/* Divider — hidden on mobile */}
        <div className="hidden xs:block w-px h-5 bg-border-strong" />

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
              {/* Shorten labels on mobile */}
              <span className="xs:hidden">{d === "easy" ? "E" : d === "medium" ? "M" : "H"}</span>
              <span className="hidden xs:inline">{d.toUpperCase()}</span>
            </PixelBtn>
          ))}
        </div>
      </div>

      {/* Icon buttons */}
      <div className="flex items-center gap-2 self-end sm:self-auto">
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