"use client";

import { motion } from "framer-motion";
import PixelStat from "@/components/ui/PixelStat";

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
    <div className="flex items-center justify-between gap-2 sm:gap-6 mb-4 sm:mb-6 select-none">

      {/* Timer panel */}
      <div
        className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3.5 py-1 sm:py-1.5 bg-bg-surface border-2 ${
          isLow
            ? "border-danger shadow-[3px_3px_0px_rgba(255,60,60,0.4)]"
            : "border-border-strong shadow-pixel-border"
        }`}
      >
        <span className={`font-pixel text-[0.3rem] sm:text-6xs tracking-wider3 ${isLow ? "text-danger" : "text-text-muted"}`}>
          TIME
        </span>
        <motion.span
          key={timeLeft}
          initial={{ y: -3, opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.1 }}
          className={`font-mono text-[1.8rem] sm:text-[2.6rem] font-bold leading-none tracking-pixel ${
            isLow ? "text-danger" : isIdle ? "text-text-muted" : "text-accent"
          }`}
          style={{
            textShadow: isLow
              ? "0 0 14px rgba(255,60,60,0.6)"
              : isIdle ? "none" : "0 0 14px var(--default-glow-strong)",
          }}
        >
          {timeLeft}
        </motion.span>
      </div>

      {/* WPM + ACC panels */}
      <div className="flex items-center gap-2 sm:gap-3">
        <PixelStat
          label="WPM"
          value={isIdle ? "---" : String(wpm)}
          highlight={status === "running"}
          colorVar="var(--default)"
        />
        <div className="w-px h-7 sm:h-9 bg-border-subtle" />
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
