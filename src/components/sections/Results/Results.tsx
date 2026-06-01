"use client";

import { motion } from "framer-motion";
import { ScoreHistory } from "./ScoreHistory";
import CornerDeco from "@/components/styling/CornerDeco";
import type { TestResult } from "@/hooks/useTypingTest";
import type { ScoreEntry } from "@/hooks/useScoreHistory";
import '@hackernoon/pixel-icon-library/fonts/iconfont.css';

interface ResultsProps {
  result: TestResult;
  isDark: boolean;
  onRestart: () => void;
  history: ScoreEntry[];
  onClearHistory: () => void;
}

export function Results({ result, isDark, onRestart, history, onClearHistory }: ResultsProps) {
  // Map Tailwind custom properties and corresponding text shadow colors dynamically
  const secondaryStats = [
    { 
      label: "ACC",     
      value: `${result.accuracy}%`,        
      textColor: "text-[var(--amber)]", 
      textShadow: "shadow-[0_0_10px_rgba(235,163,55,0.33)]" // Amber glow hue
    },
    { 
      label: "CORRECT", 
      value: String(result.correct),           
      textColor: "text-accent", 
      textShadow: "shadow-[0_0_10px_rgba(93,140,62,0.33)]" // Accent glow hue
    },
    { 
      label: "ERRORS",  
      value: String(result.incorrect),          
      textColor: result.incorrect > 0 ? "text-danger" : "text-accent", 
      textShadow: result.incorrect > 0 ? "shadow-[0_0_10px_rgba(255,60,60,0.33)]" : "shadow-[0_0_10px_rgba(93,140,62,0.33)]" 
    },
    { 
      label: "TIME",    
      value: `${Math.round(result.duration)}s`, 
      textColor: "text-text-sub", 
      textShadow: "shadow-none" 
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      {/* Header */}
      <div className="text-center mb-4 sm:mb-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 font-pixel text-[0.5rem] sm:text-[0.7rem] text-amber tracking-wider8 mb-1.5"
        >
          <i className="hn hn-star-solid text-[6px] md:text-[8px] mb-1" />
          <span>STAGE CLEAR</span>
          <i className="hn hn-star-solid text-[6px] md:text-[8px] mb-1" />
        </motion.div>
        <div className="font-pixel text-[0.3rem] sm:text-4xs text-text-muted tracking-wider5">
          PLAYER 1 RESULTS
        </div>
      </div>

      {/* WPM hero panel */}
      <div className="flex justify-center mb-4 sm:mb-6">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-bg-surface border-2 border-accent shadow-hero-box text-center px-6 sm:px-9 py-3 sm:py-4"
        >
          <CornerDeco pos="top-left" />
          <CornerDeco pos="top-right" />
          <CornerDeco pos="bottom-left" />
          <CornerDeco pos="bottom-right" />

          <div className="font-pixel text-[0.3rem] sm:text-4xs text-text-muted tracking-wider8 mb-2">
            FINAL SCORE
          </div>
          
          <div className="font-mono font-bold leading-none tracking-pixel text-accent text-[clamp(3rem,18vw,6.5rem)]">
            {result.wpm}
          </div>
          
          <div className="font-pixel text-[0.35rem] sm:text-7xs text-text-sub tracking-wider5 mt-2">
            WPM
          </div>
        </motion.div>
      </div>

      {/* Secondary stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 mb-4 sm:mb-6 bg-bg-surface border-2 border-border-strong shadow-pixel-strong">
        {secondaryStats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 + i * 0.06, duration: 0.3 }}
            className={`text-center py-2.5 sm:py-3.5 px-2 sm:px-2.5 border-border-strong
              ${i % 2 === 0 ? "border-r-2" : ""}
              ${i < 2 ? "border-b-2 sm:border-b-0" : ""}
              ${i === 1 ? "sm:border-r-2" : ""}
              ${i === 2 ? "sm:border-r-2" : ""}
            `}
          >
            <div className="font-pixel text-[0.28rem] sm:text-2xs text-text-muted tracking-wider4 mb-1.5 sm:mb-2">
              {s.label}
            </div>
            
            <div className={`font-mono text-[1.3rem] sm:text-[1.8rem] font-bold leading-none tracking-pixel drop-shadow-md [text-shadow:0_0_10px_rgba(0,0,0,0.15)] ${s.textColor}`}>
              {s.value}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Restart button */}
      <div className="flex justify-center mb-2">
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={onRestart}
          className="font-pixel text-[0.35rem] sm:text-7xs tracking-wider5 px-4 sm:px-6 py-2 sm:py-2.5 bg-bg-base text-accent border-2 border-accent shadow-[4px_4px_0px_var(--default-dim)] cursor-pointer flex items-center gap-2 sm:gap-2.5 hover:bg-accent hover:text-bg-base transition-colors duration-150"
        >
          <i className="hn hn-refresh-solid text-[12px] sm:text-[14px]" />
          <span>PLAY AGAIN</span>
        </motion.button>
      </div>

      {/* Score history */}
      <ScoreHistory history={history} onClear={onClearHistory} />
    </motion.div>
  );
}