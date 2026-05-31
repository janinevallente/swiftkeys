"use client";

import { useRef, useCallback } from "react";

export function useSoundEffects(enabled: boolean) {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (
        window.AudioContext ||
        (window as typeof window & { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext
      )();
    }
    // Resume context if it was suspended by browser autoplay policy
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
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
          // Classic crisp 8-bit arcade blip
          osc.type = "square";
          osc.frequency.setValueAtTime(900, ctx.currentTime);
          // Quick upward pitch slide for a satisfying "correct" hit
          osc.frequency.setValueAtTime(1200, ctx.currentTime + 0.03);

          gain.gain.setValueAtTime(0.02, ctx.currentTime); // Lower gain since square waves are loud
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.05);
        } else {
          // Retro low-pitched error buzz/thud
          osc.type = "triangle"; // Triangle is softer but perfectly retro for errors
          osc.frequency.setValueAtTime(220, ctx.currentTime);
          // Rapid downward slide for a "fail" sound
          osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.08);

          gain.gain.setValueAtTime(0.06, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.09);
        }
      } catch {
        // Silently fail if audio context unavailable
      }
    },
    [enabled, getCtx],
  );

  const playFinish = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getCtx();
      // Retro arpeggio (C major chord: C5 -> E5 -> G5 -> C6)
      const notes = [523.25, 659.25, 783.99, 1046.5];

      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        // Fast sequence spacing for that rapid 8-bit win fanfare
        const t = ctx.currentTime + i * 0.07;

        osc.type = "square";
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.02, t);
        // Instant cutoff at the end of each note creates staccato style
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

        osc.start(t);
        osc.stop(t + 0.15);
      });
    } catch {
      // Silently fail
    }
  }, [enabled, getCtx]);

  return { playTick, playFinish };
}
