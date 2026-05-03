"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTypingTest } from "@/hooks/useTypingTest";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { TypingArea } from "./TypingArea";
import { StatsBar } from "./StatsBar";
import { Results } from "./Results";
import { ControlBar } from "./ControlBar";
import type { Difficulty } from "@/lib/texts";

interface TypingTestProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export function TypingTest({ isDark, onToggleTheme }: TypingTestProps) {
  const [duration, setDuration] = useState(30);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [focused, setFocused] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);
  const lastKey = useRef<string>("");

  const { playTick, playFinish } = useSoundEffects(soundEnabled);

  const {
    chars,
    cursor,
    status,
    timeLeft,
    result,
    liveWpm,
    accuracy,
    handleKeyPress,
    restart,
  } = useTypingTest(duration, difficulty);

  const prevStatus = useRef(status);
  useEffect(() => {
    if (prevStatus.current !== "finished" && status === "finished") {
      playFinish();
    }
    prevStatus.current = status;
  }, [status, playFinish]);

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      // Tab = restart
      if (e.key === "Tab") {
        e.preventDefault();
        restart();
        return;
      }

      // Escape = blur / refocus
      if (e.key === "Escape") return;

      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === "Backspace" || e.key.length === 1) {
        const isCorrect =
          e.key !== "Backspace" &&
          chars[cursor]?.char === e.key;
        const isIncorrect =
          e.key !== "Backspace" &&
          chars[cursor]?.char !== e.key;

        if (isCorrect) playTick(true);
        if (isIncorrect) playTick(false);

        handleKeyPress(e.key);
      }
    },
    [chars, cursor, handleKeyPress, playTick, restart]
  );

  // Global keydown listener
  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  // Focus management for mobile
  const focusInput = () => {
    inputRef.current?.focus();
    setFocused(true);
  };

  const handleMobileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val.length === 0) {
      handleKeyPress("Backspace");
    } else {
      const last = val[val.length - 1];
      if (last !== lastKey.current) {
        const isCorrect = chars[cursor]?.char === last;
        playTick(isCorrect);
        handleKeyPress(last);
        lastKey.current = last;
      }
    }
    // Reset to prevent accumulation
    e.target.value = "a";
  };

  const handleRestart = useCallback(() => {
    restart();
    inputRef.current?.focus();
  }, [restart]);

  const handleDuration = (d: number) => {
    setDuration(d);
    restart();
  };

  const handleDifficulty = (d: Difficulty) => {
    setDifficulty(d);
    restart();
  };

  // Colors
  const bg = isDark ? "#17171380" : "#f5f2ed80";
  const border = isDark ? "#2e2e2640" : "#e0dbd260";
  const cardBg = isDark ? "#1a1a16" : "#f8f5ef";
  const cardBorder = isDark ? "#2a2a22" : "#e8e3d8";
  const muted = isDark ? "#3a3a32" : "#cdc8be";
  const hintColor = isDark ? "#4a4a42" : "#b4afa6";

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Card */}
      <motion.div
        className="relative rounded-2xl p-6 md:p-8"
        style={{
          background: cardBg,
          border: `1px solid ${cardBorder}`,
        }}
        onClick={focusInput}
      >
        {/* Hidden input for mobile */}
        <input
          ref={inputRef}
          className="absolute opacity-0 w-0 h-0 pointer-events-none"
          onChange={handleMobileInput}
          defaultValue="a"
          autoCapitalize="none"
          autoCorrect="off"
          autoComplete="off"
          spellCheck={false}
        />

        <AnimatePresence mode="wait">
          {status === "finished" && result ? (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <Results result={result} isDark={isDark} onRestart={handleRestart} />
            </motion.div>
          ) : (
            <motion.div
              key="test"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <StatsBar
                wpm={liveWpm}
                accuracy={accuracy}
                timeLeft={timeLeft}
                isDark={isDark}
                status={status}
              />

              {/* Typing area */}
              <div className="relative mb-6">
                {/* Focus hint */}
                {!focused && (
                  <div
                    className="absolute inset-0 flex items-center justify-center z-10 rounded-xl backdrop-blur-sm text-sm"
                    style={{ color: hintColor }}
                  >
                    click to focus
                  </div>
                )}
                <TypingArea chars={chars} cursor={cursor} isDark={isDark} />
              </div>

              {/* Hint */}
              <div
                className="text-center text-xs mt-4"
                style={{ color: isDark ? "#3a3a32" : "#ccc8c0", letterSpacing: "0.1em" }}
              >
                {status === "idle"
                  ? "start typing · tab to restart"
                  : "tab to restart"}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Controls */}
      <div className="mt-5 px-1">
        <ControlBar
          duration={duration}
          difficulty={difficulty}
          soundEnabled={soundEnabled}
          isDark={isDark}
          onDuration={handleDuration}
          onDifficulty={handleDifficulty}
          onToggleSound={() => setSoundEnabled((s) => !s)}
          onToggleTheme={onToggleTheme}
          onRestart={handleRestart}
          status={status}
        />
      </div>
    </div>
  );
}
