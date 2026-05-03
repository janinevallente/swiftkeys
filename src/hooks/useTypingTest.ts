"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { getRandomText, type Difficulty } from "@/lib/texts";

export type CharState = "idle" | "correct" | "incorrect" | "active";

export interface CharData {
  char: string;
  state: CharState;
}

export interface TestResult {
  wpm: number;
  accuracy: number;
  correct: number;
  incorrect: number;
  duration: number;
}

export type TestStatus = "idle" | "running" | "finished";

export function useTypingTest(duration: number, difficulty: Difficulty) {
  const [text, setText] = useState(() => getRandomText(difficulty));
  const [chars, setChars] = useState<CharData[]>([]);
  const [cursor, setCursor] = useState(0);
  const [status, setStatus] = useState<TestStatus>("idle");
  const [timeLeft, setTimeLeft] = useState(duration);
  const [result, setResult] = useState<TestResult | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const typedRef = useRef<string[]>([]);

  // Init chars from text
  useEffect(() => {
    const initial: CharData[] = text.split("").map((char, i) => ({
      char,
      state: i === 0 ? "active" : "idle",
    }));
    setChars(initial);
    setCursor(0);
    typedRef.current = [];
    setCorrectCount(0);
    setIncorrectCount(0);
  }, [text]);

  // Sync timeLeft when duration changes (only when idle)
  useEffect(() => {
    if (status === "idle") setTimeLeft(duration);
  }, [duration, status]);

  const finishTest = useCallback(
    (elapsed: number, correct: number, incorrect: number) => {
      if (timerRef.current) clearInterval(timerRef.current);
      const minutes = elapsed / 60;
      const wpm = minutes > 0 ? Math.round(correct / 5 / minutes) : 0;
      const total = correct + incorrect;
      const accuracy = total > 0 ? Math.round((correct / total) * 100) : 100;
      setResult({ wpm, accuracy, correct, incorrect, duration: elapsed });
      setStatus("finished");
    },
    [],
  );

  const handleKeyPress = useCallback(
    (key: string) => {
      if (status === "finished") return;

      // Start timer on first keypress
      if (status === "idle") {
        startTimeRef.current = Date.now();
        setStatus("running");
        timerRef.current = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              const elapsed = (Date.now() - startTimeRef.current) / 1000;
              finishTest(elapsed, correctCount, incorrectCount);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }

      setChars((prev) => {
        if (cursor >= prev.length) return prev;

        const next = [...prev];

        if (key === "Backspace") {
          if (cursor === 0) return prev;
          const prevCursor = cursor - 1;
          const wasCorrect = next[prevCursor].state === "correct";
          const wasIncorrect = next[prevCursor].state === "incorrect";

          next[prevCursor] = { ...next[prevCursor], state: "active" };
          if (cursor < next.length) {
            next[cursor] = { ...next[cursor], state: "idle" };
          }

          // Update counts
          if (wasCorrect) setCorrectCount((c) => Math.max(0, c - 1));
          if (wasIncorrect) setIncorrectCount((c) => Math.max(0, c - 1));

          setCursor(prevCursor);
          typedRef.current.pop();
          return next;
        }

        // Regular character
        const expected = next[cursor].char;
        const isCorrect = key === expected;

        next[cursor] = {
          ...next[cursor],
          state: isCorrect ? "correct" : "incorrect",
        };

        const nextCursor = cursor + 1;
        if (nextCursor < next.length) {
          next[nextCursor] = { ...next[nextCursor], state: "active" };
        }

        typedRef.current.push(key);

        if (isCorrect) {
          setCorrectCount((c) => {
            const newC = c + 1;
            if (nextCursor >= next.length) {
              const elapsed = (Date.now() - startTimeRef.current) / 1000;
              finishTest(elapsed, newC, incorrectCount);
            }
            return newC;
          });
        } else {
          setIncorrectCount((c) => c + 1);
        }

        setCursor(nextCursor);
        return next;
      });
    },
    [cursor, status, correctCount, incorrectCount, finishTest],
  );

  const restart = useCallback(
    (newDifficulty?: Difficulty) => {
      if (timerRef.current) clearInterval(timerRef.current);
      const diff = newDifficulty ?? difficulty;
      const newText = getRandomText(diff);
      setText(newText);
      setTimeLeft(duration);
      setStatus("idle");
      setResult(null);
      setCorrectCount(0);
      setIncorrectCount(0);
      setCursor(0);
      typedRef.current = [];
    },
    [difficulty, duration],
  );

  // Live WPM
  const liveWpm =
    status === "running"
      ? (() => {
          const elapsed = (Date.now() - startTimeRef.current) / 1000 / 60;
          return elapsed > 0 ? Math.round(correctCount / 5 / elapsed) : 0;
        })()
      : 0;

  const accuracy =
    correctCount + incorrectCount > 0
      ? Math.round((correctCount / (correctCount + incorrectCount)) * 100)
      : 100;

  return {
    chars,
    cursor,
    status,
    timeLeft,
    result,
    liveWpm,
    accuracy,
    correctCount,
    incorrectCount,
    handleKeyPress,
    restart,
  };
}
