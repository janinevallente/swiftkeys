"use client";

import { useRef, useCallback } from "react";

export function useSoundEffects(enabled: boolean) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const compressorRef = useRef<DynamicsCompressorNode | null>(null);

  const getCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (
        window.AudioContext ||
        (window as typeof window & { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext
      )();

      // Single compressor shared across all sounds —
      // prevents clipping at higher gain values and normalises
      // output level across different browser/OS audio stacks
      const compressor = audioCtxRef.current.createDynamicsCompressor();
      compressor.threshold.value = -6; // dB — start compressing here
      compressor.knee.value = 3; // dB — soft knee
      compressor.ratio.value = 4; // 4:1 compression
      compressor.attack.value = 0.001;
      compressor.release.value = 0.1;
      compressor.connect(audioCtxRef.current.destination);
      compressorRef.current = compressor;
    }

    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }

    return audioCtxRef.current;
  }, []);

  const getCompressor = useCallback(() => {
    getCtx();
    return compressorRef.current!;
  }, [getCtx]);

  const playTick = useCallback(
    (correct: boolean) => {
      if (!enabled) return;
      try {
        const ctx = getCtx();
        const comp = getCompressor();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(comp);

        if (correct) {
          // Classic crisp 8-bit arcade blip
          osc.type = "square";
          osc.frequency.setValueAtTime(900, ctx.currentTime);
          // Quick upward pitch slide for a satisfying "correct" hit
          osc.frequency.setValueAtTime(1200, ctx.currentTime + 0.03);

          gain.gain.setValueAtTime(0.35, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.06);
        } else {
          // Retro low-pitched error buzz/thud
          osc.type = "triangle";
          osc.frequency.setValueAtTime(220, ctx.currentTime);
          // Rapid downward slide for a "fail" sound
          osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.08);

          gain.gain.setValueAtTime(0.5, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.1);
        }
      } catch {
        // Silently fail if AudioContext unavailable
      }
    },
    [enabled, getCtx, getCompressor],
  );

  const playFinish = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getCtx();
      const comp = getCompressor();

      // C major arpeggio: C5 → E5 → G5 → C6
      const notes = [523.25, 659.25, 783.99, 1046.5];

      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(comp);

        // Fast sequence spacing for that rapid 8-bit win fanfare
        const t = ctx.currentTime + i * 0.07;

        osc.type = "square";
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.35, t);
        // Instant cutoff at the end of each note creates staccato style
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

        osc.start(t);
        osc.stop(t + 0.15);
      });
    } catch {
      // Silently fail
    }
  }, [enabled, getCtx, getCompressor]);

  return { playTick, playFinish };
}
