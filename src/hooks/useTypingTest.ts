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

  const cursorRef = useRef(0);
  const correctRef = useRef(0);
  const incorrectRef = useRef(0);
  const statusRef = useRef<TestStatus>("idle");
  const charsRef = useRef<CharData[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);

  // Initialize or reset the test
  const initializeTest = useCallback((newText: string) => {
    const initial: CharData[] = newText.split("").map((char) => ({
      char,
      state: "idle" as CharState,
    }));

    if (initial.length > 0) {
      initial[0].state = "active";
    }

    charsRef.current = initial;
    setChars([...initial]); // Create a new array to ensure re-render
    cursorRef.current = 0;
    setCursor(0);
    correctRef.current = 0;
    setCorrectCount(0);
    incorrectRef.current = 0;
    setIncorrectCount(0);
  }, []);

  // Initialize when text changes
  useEffect(() => {
    initializeTest(text);
  }, [text, initializeTest]);

  useEffect(() => {
    if (statusRef.current === "idle") setTimeLeft(duration);
  }, [duration]);

  const finishTest = useCallback(
    (elapsed: number, correct: number, incorrect: number) => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      const minutes = elapsed / 60;
      const wpm = minutes > 0 ? Math.round(correct / 5 / minutes) : 0;
      const total = correct + incorrect;
      const accuracy = total > 0 ? Math.round((correct / total) * 100) : 100;
      setResult({ wpm, accuracy, correct, incorrect, duration: elapsed });
      statusRef.current = "finished";
      setStatus("finished");
    },
    [],
  );

  const handleKeyPress = useCallback(
    (key: string) => {
      console.log("Key pressed:", key); // Debug log

      if (statusRef.current === "finished") return;

      // Start the test on first character input (not backspace)
      if (statusRef.current === "idle" && key !== "Backspace") {
        console.log("Starting test...");
        startTimeRef.current = Date.now();
        statusRef.current = "running";
        setStatus("running");
        timerRef.current = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              const elapsed = (Date.now() - startTimeRef.current) / 1000;
              finishTest(elapsed, correctRef.current, incorrectRef.current);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }

      const pos = cursorRef.current;
      const current = charsRef.current;

      console.log("Current cursor position:", pos);
      console.log("Current char at position:", current[pos]?.char);
      console.log("Expected char:", current[pos]?.char);

      if (key === "Backspace") {
        if (pos === 0) return;

        const prevPos = pos - 1;
        const prevCharState = current[prevPos].state;

        // Create new array
        const next = [...current];

        // If the previous character was correct or incorrect, we need to reset it
        if (prevCharState === "correct" || prevCharState === "incorrect") {
          next[prevPos] = { ...next[prevPos], state: "active" };
        } else {
          next[prevPos] = { ...next[prevPos], state: "active" };
        }

        // Reset current position to idle
        if (pos < next.length) {
          next[pos] = { ...next[pos], state: "idle" };
        }

        // Update counts
        if (prevCharState === "correct") {
          correctRef.current = Math.max(0, correctRef.current - 1);
          setCorrectCount(correctRef.current);
        } else if (prevCharState === "incorrect") {
          incorrectRef.current = Math.max(0, incorrectRef.current - 1);
          setIncorrectCount(incorrectRef.current);
        }

        charsRef.current = next;
        setChars(next);
        cursorRef.current = prevPos;
        setCursor(prevPos);
        return;
      }

      // Handle regular typing
      if (pos >= current.length) return;

      const expectedChar = current[pos].char;
      const isCorrect = key === expectedChar;

      console.log(
        `Comparing: "${key}" vs "${expectedChar}" -> ${isCorrect ? "CORRECT" : "INCORRECT"}`,
      );

      const next = [...current];
      next[pos] = {
        ...next[pos],
        state: isCorrect ? "correct" : "incorrect",
      };

      const nextPos = pos + 1;
      if (nextPos < next.length) {
        next[nextPos] = { ...next[nextPos], state: "active" };
      }

      charsRef.current = next;
      setChars(next);
      cursorRef.current = nextPos;
      setCursor(nextPos);

      if (isCorrect) {
        correctRef.current += 1;
        setCorrectCount(correctRef.current);

        if (nextPos >= next.length) {
          const elapsed = (Date.now() - startTimeRef.current) / 1000;
          finishTest(elapsed, correctRef.current, incorrectRef.current);
        }
      } else {
        incorrectRef.current += 1;
        setIncorrectCount(incorrectRef.current);
      }
    },
    [finishTest],
  );

  const getExpectedChar = useCallback((): string => {
    const expected = charsRef.current[cursorRef.current]?.char ?? "";
    console.log("getExpectedChar returning:", expected);
    return expected;
  }, []);

  const restart = useCallback(
    (newDifficulty?: Difficulty) => {
      console.log("Restarting test...");
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      const diff = newDifficulty ?? difficulty;
      const newText = getRandomText(diff);
      setText(newText);
      setTimeLeft(duration);
      statusRef.current = "idle";
      setStatus("idle");
      setResult(null);
      initializeTest(newText);
    },
    [difficulty, duration, initializeTest],
  );

  const liveWpm =
    statusRef.current === "running"
      ? (() => {
          const elapsed = (Date.now() - startTimeRef.current) / 1000 / 60;
          return elapsed > 0 ? Math.round(correctRef.current / 5 / elapsed) : 0;
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
    getExpectedChar,
    restart,
  };
}
