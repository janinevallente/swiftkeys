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
  const isPhysicalKeyboard = useRef(false);

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
    getExpectedChar,
    restart,
  } = useTypingTest(duration, difficulty);

  const prevStatus = useRef(status);
  useEffect(() => {
    if (prevStatus.current !== "finished" && status === "finished") {
      playFinish();
    }
    prevStatus.current = status;
  }, [status, playFinish]);

  const handleKeyPressRef = useRef(handleKeyPress);
  handleKeyPressRef.current = handleKeyPress;

  const getExpectedCharRef = useRef(getExpectedChar);
  getExpectedCharRef.current = getExpectedChar;

  const playTickRef = useRef(playTick);
  playTickRef.current = playTick;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Tab") { e.preventDefault(); restart(); return; }
      if (e.key === "Escape") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "Backspace" || e.key.length === 1) {
        isPhysicalKeyboard.current = true;
        if (e.key !== "Backspace") {
          playTickRef.current(e.key === getExpectedCharRef.current());
        }
        handleKeyPressRef.current(e.key);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restart]);

  const focusInput = () => {
    inputRef.current?.focus();
    setFocused(true);
  };

  const handleMobileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isPhysicalKeyboard.current) {
      isPhysicalKeyboard.current = false;
      e.target.value = "a";
      return;
    }
    const val = e.target.value;
    if (val.length === 0) {
      handleKeyPressRef.current("Backspace");
    } else {
      const last = val[val.length - 1];
      playTickRef.current(last === getExpectedCharRef.current());
      handleKeyPressRef.current(last);
    }
    e.target.value = "a";
  };

  const handleRestart = useCallback(() => {
    restart();
    inputRef.current?.focus();
  }, [restart]);

  const handleDuration   = (d: number)     => { setDuration(d);   restart(); };
  const handleDifficulty = (d: Difficulty) => { setDifficulty(d); restart(); };

  return (
    <div className="w-full flex flex-col gap-0">

      {/* Control bar */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <ControlBar
          duration={duration}
          difficulty={difficulty}
          soundEnabled={soundEnabled}
          isDark={isDark}
          onDuration={handleDuration}
          onDifficulty={handleDifficulty}
          onToggleSound={() => setSoundEnabled((s) => !s)}
          onRestart={handleRestart}
          status={status}
        />
      </div>

      <AnimatePresence mode="wait">
        {status === "finished" && result ? (

          <motion.div
            key="results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Results result={result} isDark={isDark} onRestart={handleRestart} />
          </motion.div>

        ) : (

          <motion.div
            key="test"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col"
          >
            {/* Stats */}
            <div className="mb-2">
              <StatsBar
                wpm={liveWpm}
                accuracy={accuracy}
                timeLeft={timeLeft}
                isDark={isDark}
                status={status}
              />
            </div>

            {/* Typing area */}
            <div className="relative" onClick={focusInput}>
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

              {!focused && (
                <div
                  className="absolute inset-0 flex items-center justify-center z-10 backdrop-blur-sm text-sm"
                  style={{
                    color: "var(--text-secondary)",
                    fontFamily: "var(--font-pixel)",
                    fontSize: "0.5rem",
                    letterSpacing: "0.15em",
                  }}
                >
                  ▶ CLICK TO FOCUS
                </div>
              )}

              <TypingArea chars={chars} cursor={cursor} isDark={isDark} />
            </div>

            {/* Hint */}
            <div
              className="mt-6 text-center select-none"
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: "0.43rem",
                color: "var(--text-dim)",
                letterSpacing: "0.14em",
              }}
            >
              {status === "idle"
                ? "▶ START TYPING  ·  TAB TO RESTART"
                : "TAB TO RESTART"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}