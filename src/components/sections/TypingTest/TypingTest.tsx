"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTypingTest } from "@/hooks/useTypingTest";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useScoreHistory } from "@/hooks/useScoreHistory";
import { TypingArea } from "./TypingArea";
import { StatsBar } from "./StatsBar";
import { Results } from "../Results/Results";
import { ControlBar } from "./ControlBar";
import type { Difficulty } from "@/lib/texts";
import '@hackernoon/pixel-icon-library/fonts/iconfont.css';

interface TypingTestProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export function TypingTest({ isDark, onToggleTheme }: TypingTestProps) {
  const [duration,     setDuration]     = useState(30);
  const [difficulty,   setDifficulty]   = useState<Difficulty>("medium");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [focused,      setFocused]      = useState(true);
  const [isCapsLock,   setIsCapsLock]   = useState(false); // Track CapsLock state

  const inputRef           = useRef<HTMLInputElement>(null);
  const isPhysicalKeyboard = useRef(false);
  const savedRef           = useRef(false);

  const { playTick, playFinish } = useSoundEffects(soundEnabled);
  const { history, addEntry, clearHistory } = useScoreHistory();

  const {
    chars, cursor, status, timeLeft,
    result, liveWpm, accuracy,
    handleKeyPress, getExpectedChar, restart,
  } = useTypingTest(duration, difficulty);

  const prevStatus = useRef(status);
  useEffect(() => {
    if (prevStatus.current !== "finished" && status === "finished") {
      playFinish();
      savedRef.current = false;
    }
    prevStatus.current = status;
  }, [status, playFinish]);

  // Save to history once when result becomes available
  useEffect(() => {
    if (result && status === "finished" && !savedRef.current) {
      savedRef.current = true;
      addEntry(result);
    }
  }, [result, status, addEntry]);

  const handleKeyPressRef   = useRef(handleKeyPress);
  handleKeyPressRef.current  = handleKeyPress;
  const getExpectedCharRef   = useRef(getExpectedChar);
  getExpectedCharRef.current = getExpectedChar;
  const playTickRef          = useRef(playTick);
  playTickRef.current        = playTick;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (typeof e.getModifierState === "function") {
        setIsCapsLock(e.getModifierState("CapsLock"));
      }

      if (e.key === "Tab")    { e.preventDefault(); restart(); return; }
      if (e.key === "Escape") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "Backspace" || e.key.length === 1) {
        isPhysicalKeyboard.current = true;
        if (e.key !== "Backspace") playTickRef.current(e.key === getExpectedCharRef.current());
        handleKeyPressRef.current(e.key);
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (typeof e.getModifierState === "function") {
        setIsCapsLock(e.getModifierState("CapsLock"));
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [restart]);

  const focusInput = () => { inputRef.current?.focus(); setFocused(true); };

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
      const expected = getExpectedCharRef.current();

      // MOBILE CAPSLOCK ENGINE:
      // Check if typed character is an absolute alphabetic character
      if (last && /[a-zA-Z]/.test(last)) {
        const isUpper = last === last.toUpperCase() && last !== last.toLowerCase();
        const isLower = last === last.toLowerCase() && last !== last.toUpperCase();
        
        if (expected && /[a-zA-Z]/.test(expected)) {
          const expectedUpper = expected === expected.toUpperCase();
          const expectedLower = expected === expected.toLowerCase();

          // Case mismatch indicators:
          if (isUpper && expectedLower) {
            setIsCapsLock(true);
          } else if (isLower && expectedUpper) {
            // If they type lowercase where an uppercase was needed, Caps Lock is off
            setIsCapsLock(false);
          }
        } else {
          // If expecting an arbitrary symbol/number/space but they entered an uppercase letter:
          if (isUpper) {
            setIsCapsLock(true);
          }
        }
      }

      playTickRef.current(last === expected);
      handleKeyPressRef.current(last);
    }
    e.target.value = "a";
  };

  const handleRestart    = useCallback(() => { restart(); setIsCapsLock(false); inputRef.current?.focus(); }, [restart]);
  const handleDuration   = (d: number)     => { setDuration(d);   restart(); setIsCapsLock(false); };
  const handleDifficulty = (d: Difficulty) => { setDifficulty(d); restart(); setIsCapsLock(false); };

  return (
    <div className="w-full flex flex-col">

      {/* Control bar */}
      <div className="mb-4 md:mb-6">
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
            <Results
              result={result}
              isDark={isDark}
              onRestart={handleRestart}
              history={history}
              onClearHistory={clearHistory}
            />
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
            <div>
              <StatsBar
                wpm={liveWpm}
                accuracy={accuracy}
                timeLeft={timeLeft}
                isDark={isDark}
                status={status}
              />
            </div>

            {/* Caps Lock On Alert */}
            <div className="h-3 md:h-10 overflow-hidden flex items-end justify-center">
              <AnimatePresence>
                {isCapsLock && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="mb-3 flex items-center gap-2 bg-bg-surface border border-danger px-2.5 py-1.5 rounded"
                  >
                    <i className="hn hn-exclaimation-solid text-danger text-[10px] md:text-[9.8px]" />
                    <span className="font-pixel text-[0.4rem] md:text-[0.45rem] font-bold text-danger tracking-wider4">
                      CAPS LOCK ON
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Typing area */}
            <div className="relative cursor-text" onClick={focusInput}>
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
                <div className="absolute inset-0 flex items-center justify-center gap-1.5 z-10 backdrop-blur-sm font-pixel text-[0.35rem] sm:text-7xs text-text-sub tracking-wider5">
                  <i className="hn hn-play-solid text-[10px]" />
                  <span>CLICK TO FOCUS</span>
                </div>
              )}
              <TypingArea chars={chars} cursor={cursor} isDark={isDark} />
            </div>

            {/* Hint */}
            <div className="mt-4 sm:mt-6 text-center select-none font-pixel text-[0.3rem] sm:text-5xs text-text-muted tracking-wider4">
              {status === "idle" ? (
                <span className="inline-flex items-center gap-1.5 animate-[pulse_1000ms_cubic-bezier(0.4,0,0.6,1)_infinite]">
                  <i className="hn hn-play-solid text-[9.5px]" />
                  <span>
                    START TYPING
                    <span className="hidden lg:inline">&nbsp;·&nbsp; TAB TO RESTART</span>
                  </span>
                </span>
              ) : (
                <span className="hidden lg:inline">TAB TO RESTART</span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}