"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/lib/data";

const DURATION = 3500; // ms — adjust to taste
const STEPS = [
  { pct: 15,  label: "Initializing" },
  { pct: 38,  label: "Loading assets" },
  { pct: 62,  label: "Building interface" },
  { pct: 85,  label: "Almost ready" },
  { pct: 100, label: "Welcome." },
];

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [done, setDone] = useState(false);
  const startRef = useRef<number | null>(null);
  const rafRef   = useRef<number | null>(null);

  useEffect(() => {
    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const raw     = Math.min(elapsed / DURATION, 1);
      const eased   = 1 - Math.pow(1 - raw, 3);
      const pct     = Math.round(eased * 100);
      setProgress(pct);
      const idx = STEPS.findLastIndex((s) => pct >= s.pct - 15);
      setStepIndex(Math.max(0, idx));
      if (raw < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setProgress(100);
        setStepIndex(STEPS.length - 1);
        setTimeout(() => setDone(true), 600);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  useEffect(() => {
    if (done) {
      const t = setTimeout(onDone, 700);
      return () => clearTimeout(t);
    }
  }, [done, onDone]);

  const currentStep = STEPS[stepIndex];

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] bg-ink flex flex-col items-center justify-center px-8"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Brand — top-left */}
          <div className="absolute top-8 left-8 md:top-10 md:left-12">
            <span className="font-display text-xs uppercase tracking-[0.2em] text-white/20">
              {site.name}
            </span>
          </div>

          {/* Centre */}
          <div className="w-full max-w-sm md:max-w-md flex flex-col gap-6">
            {/* Status label */}
            <div className="overflow-hidden h-5 text-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentStep.label}
                  className="font-body text-xs uppercase tracking-[0.18em] text-white/35"
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  {currentStep.label}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Progress track */}
            <div className="relative w-full h-px bg-white/10">
              <motion.div
                className="absolute top-0 left-0 h-full bg-accent origin-left"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0 }}
              />
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-accent shadow-[0_0_8px_2px_rgba(200,240,74,0.6)]"
                style={{ left: `calc(${progress}% - 2px)` }}
              />
            </div>

            {/* Percentage */}
            <div className="flex justify-center">
              <span className="font-display text-xs tracking-wider tabular-nums text-accent/80">
                {String(progress).padStart(3)}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
