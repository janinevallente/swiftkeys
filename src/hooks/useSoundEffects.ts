"use client";

import { useRef, useCallback } from "react";

export function useSoundEffects(enabled: boolean) {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext ||
        (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return audioCtxRef.current;
  }, []);

  const playTick = useCallback(
    (correct: boolean) => {
      if (!enabled) return;
      try {
        const ctx = getCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        if (correct) {
          osc.frequency.setValueAtTime(800, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.03);
          gain.gain.setValueAtTime(0.04, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
        } else {
          osc.frequency.setValueAtTime(300, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.08);
          gain.gain.setValueAtTime(0.06, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        }

        osc.type = correct ? "sine" : "sawtooth";
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.12);
      } catch {
        // Silently fail if audio context unavailable
      }
    },
    [enabled, getCtx]
  );

  const playFinish = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getCtx();
      const notes = [523, 659, 784, 1047];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        const t = ctx.currentTime + i * 0.12;
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.08, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
        osc.type = "sine";
        osc.start(t);
        osc.stop(t + 0.3);
      });
    } catch {
      // Silently fail
    }
  }, [enabled, getCtx]);

  return { playTick, playFinish };
}
