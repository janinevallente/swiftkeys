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

  // Use a ref for handleKeyPress so the event listener never goes stale
  const handleKeyPressRef = useRef(handleKeyPress);
  handleKeyPressRef.current = handleKeyPress;

  const getExpectedCharRef = useRef(getExpectedChar);
  getExpectedCharRef.current = getExpectedChar;

  const playTickRef = useRef(playTick);
  playTickRef.current = playTick;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Prevent default for typing keys to avoid page refresh/other actions
      if (e.key.length === 1 || e.key === "Backspace") {
        e.preventDefault();
      }
      
      if (e.key === "Tab") {
        e.preventDefault();
        restart();
        return;
      }
      if (e.key === "Escape") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === "Backspace" || e.key.length === 1) {
        if (e.key !== "Backspace") {
          const expected = getExpectedCharRef.current();
          console.log("Typed:", e.key, "Expected:", expected);
          playTickRef.current(e.key === expected);
        }
        handleKeyPressRef.current(e.key);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [restart]);

  const focusInput = () => {
    inputRef.current?.focus();
    setFocused(true);
  };

  const handleMobileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val.length === 0) {
      handleKeyPressRef.current("Backspace");
    } else {
      const last = val[val.length - 1];
      if (last !== lastKey.current) {
        const expected = getExpectedCharRef.current();
        playTickRef.current(last === expected);
        handleKeyPressRef.current(last);
        lastKey.current = last;
      }
    }
    e.target.value = "a";
    console.log(val)
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

  const cardBg = isDark ? "#1a1a16" : "#f8f5ef";
  const cardBorder = isDark ? "#2a2a22" : "#e8e3d8";
  const hintColor = isDark ? "#4a4a42" : "#b4afa6";

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <motion.div
        className="relative rounded-2xl p-6 md:p-8"
        style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
        onClick={focusInput}
      >
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

              <div className="relative mb-6">
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

              <div
                className="text-center text-xs mt-4"
                style={{ color: isDark ? "#3a3a32" : "#ccc8c0", letterSpacing: "0.1em" }}
              >
                {status === "idle" ? "start typing · tab to restart" : "tab to restart"}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

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