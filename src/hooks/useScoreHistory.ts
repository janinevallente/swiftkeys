"use client";

import { useState, useEffect, useCallback } from "react";
import type { TestResult } from "./useTypingTest";

export interface ScoreEntry {
  id: string;
  wpm: number;
  accuracy: number;
  correct: number;
  incorrect: number;
  duration: number;
  timestamp: number; // unix ms
}

const STORAGE_KEY = "sk-score-history";
const MAX_ENTRIES = 50;

function load(): ScoreEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ScoreEntry[];
  } catch {
    return [];
  }
}

function save(entries: ScoreEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {}
}

export function useScoreHistory() {
  const [history, setHistory] = useState<ScoreEntry[]>([]);

  useEffect(() => {
    setHistory(load());
  }, []);

  const addEntry = useCallback((result: TestResult) => {
    const entry: ScoreEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      wpm: result.wpm,
      accuracy: result.accuracy,
      correct: result.correct,
      incorrect: result.incorrect,
      duration: Math.round(result.duration),
      timestamp: Date.now(),
    };
    setHistory((prev) => {
      const next = [entry, ...prev].slice(0, MAX_ENTRIES);
      save(next);
      return next;
    });
  }, []);

  const clearHistory = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setHistory([]);
  }, []);

  return { history, addEntry, clearHistory };
}
