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
  completed: boolean; // true = typed to the end; false = ran out of time
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

  const initializeTest = useCallback((newText: string) => {
    const initial: CharData[] = newText.split("").map((char, index) => ({
      char,
      state: index === 0 ? "active" : "idle",
    }));

    charsRef.current = initial;
    setChars([...initial]);
    cursorRef.current = 0;
    setCursor(0);
    correctRef.current = 0;
    setCorrectCount(0);
    incorrectRef.current = 0;
    setIncorrectCount(0);
    statusRef.current = "idle";
    setStatus("idle");
    setResult(null);

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    const newText = getRandomText(difficulty);
    setText(newText);
    initializeTest(newText);
    setTimeLeft(duration);
  }, [difficulty, duration, initializeTest]);

  useEffect(() => {
    if (statusRef.current === "idle") {
      setTimeLeft(duration);
    }
  }, [duration]);

  // completed = true means the player finished the text; false = time ran out
  const finishTest = useCallback(
    (
      elapsed: number,
      correct: number,
      incorrect: number,
      completed: boolean,
    ) => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      const minutes = elapsed / 60;
      const wpm = minutes > 0 ? Math.round(correct / 5 / minutes) : 0;
      const total = correct + incorrect;
      const accuracy = total > 0 ? Math.round((correct / total) * 100) : 100;
      setResult({
        wpm,
        accuracy,
        correct,
        incorrect,
        duration: elapsed,
        completed,
      });
      statusRef.current = "finished";
      setStatus("finished");
    },
    [],
  );

  const handleKeyPress = useCallback(
    (key: string) => {
      if (statusRef.current === "finished") return;

      if (statusRef.current === "idle" && key !== "Backspace") {
        startTimeRef.current = Date.now();
        statusRef.current = "running";
        setStatus("running");
        timerRef.current = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              const elapsed = (Date.now() - startTimeRef.current) / 1000;
              // Time ran out — completed = false
              finishTest(
                elapsed,
                correctRef.current,
                incorrectRef.current,
                false,
              );
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }

      const pos = cursorRef.current;
      const current = charsRef.current;

      if (key === "Backspace") {
        if (pos === 0) return;

        const prevPos = pos - 1;
        const prevCharState = current[prevPos].state;

        const next = [...current];
        next[prevPos] = { ...next[prevPos], state: "active" };
        if (pos < next.length) {
          next[pos] = { ...next[pos], state: "idle" };
        }

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

      if (pos >= current.length) return;

      const expectedChar = current[pos].char;
      const isCorrect = key === expectedChar;

      const next = [...current];
      next[pos] = { ...next[pos], state: isCorrect ? "correct" : "incorrect" };
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
          // Typed to the end — completed = true
          finishTest(elapsed, correctRef.current, incorrectRef.current, true);
        }
      } else {
        incorrectRef.current += 1;
        setIncorrectCount(incorrectRef.current);
      }
    },
    [finishTest],
  );

  const getExpectedChar = useCallback((): string => {
    return charsRef.current[cursorRef.current]?.char ?? "";
  }, []);

  const restart = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    const newText = getRandomText(difficulty);
    setText(newText);
    initializeTest(newText);
    setTimeLeft(duration);
  }, [difficulty, duration, initializeTest]);

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
