"use client";

import { motion } from "framer-motion";
import type { TestResult } from "@/hooks/useTypingTest";

interface ResultsProps {
  result: TestResult;
  isDark: boolean;
  onRestart: () => void;
}

export function Results({ result, isDark, onRestart }: ResultsProps) {
  const secondaryStats = [
    { label: "ACCURACY", value: `${result.accuracy}%`, color: "var(--amber)" },
    { label: "CORRECT",  value: String(result.correct),   color: "var(--cyan)" },
    { label: "ERRORS",   value: String(result.incorrect),  color: result.incorrect > 0 ? "var(--red)" : "var(--cyan)" },
    { label: "TIME",     value: `${Math.round(result.duration)}s`, color: "var(--text-secondary)" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      {/* Game-over header */}
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-pixel)",
            fontSize: "0.7rem",
            color: "var(--amber)",
            letterSpacing: "0.2em",
            marginBottom: "6px",
          }}
        >
          ★ STAGE CLEAR ★
        </motion.div>
        <div
          style={{
            fontFamily: "var(--font-pixel)",
            fontSize: "0.4rem",
            color: "var(--text-muted)",
            letterSpacing: "0.15em",
          }}
        >
          PLAYER 1 RESULTS
        </div>
      </div>

      {/* WPM hero — pixel display panel */}
      <div className="flex justify-center mb-6">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: "var(--bg-surface)",
            border: "2px solid var(--cyan)",
            boxShadow: "6px 6px 0px var(--cyan-dim), 0 0 28px var(--cyan-glow)",
            padding: "18px 36px",
            textAlign: "center",
            position: "relative",
          }}
        >
          {/* Corner decorations */}
          <CornerDeco pos="top-left" />
          <CornerDeco pos="top-right" />
          <CornerDeco pos="bottom-left" />
          <CornerDeco pos="bottom-right" />

          <div
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: "0.4rem",
              color: "var(--text-muted)",
              letterSpacing: "0.2em",
              marginBottom: "8px",
            }}
          >
            FINAL SCORE
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(4rem, 14vw, 6.5rem)",
              fontWeight: "bold",
              color: "var(--cyan)",
              textShadow: "0 0 24px var(--cyan-glow-strong), 0 0 48px var(--cyan-glow)",
              lineHeight: 1,
              letterSpacing: "0.04em",
            }}
          >
            {result.wpm}
          </div>
          <div
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: "0.5rem",
              color: "var(--text-secondary)",
              letterSpacing: "0.15em",
              marginTop: "8px",
            }}
          >
            WPM
          </div>
        </motion.div>
      </div>

      {/* Secondary stats grid */}
      <div
        className="grid grid-cols-4 mb-6"
        style={{
          border: "2px solid var(--border-strong)",
          boxShadow: "4px 4px 0px var(--border-strong)",
          background: "var(--bg-surface)",
        }}
      >
        {secondaryStats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 + i * 0.06, duration: 0.3 }}
            style={{
              borderRight: i < 3 ? "2px solid var(--border-strong)" : "none",
              padding: "14px 10px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: "0.35rem",
                color: "var(--text-muted)",
                letterSpacing: "0.14em",
                marginBottom: "8px",
              }}
            >
              {s.label}
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "1.8rem",
                fontWeight: "bold",
                color: s.color,
                textShadow: `0 0 10px ${s.color}55`,
                letterSpacing: "0.04em",
                lineHeight: 1,
              }}
            >
              {s.value}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Restart button */}
      <div className="flex justify-center">
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={onRestart}
          style={{
            fontFamily: "var(--font-pixel)",
            fontSize: "0.5rem",
            letterSpacing: "0.15em",
            padding: "10px 24px",
            background: "var(--bg-base)",
            color: "var(--cyan)",
            border: "2px solid var(--cyan)",
            boxShadow: "4px 4px 0px var(--cyan-dim), 0 0 12px var(--cyan-glow)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = "var(--cyan)";
            (e.currentTarget as HTMLButtonElement).style.color = "var(--bg-base)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-base)";
            (e.currentTarget as HTMLButtonElement).style.color = "var(--cyan)";
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
            <path d="M1 4v6h6M3.51 15a9 9 0 1 0 .49-3.03" />
          </svg>
          PLAY AGAIN
        </motion.button>
      </div>
    </motion.div>
  );
}

function CornerDeco({ pos }: { pos: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const style: React.CSSProperties = {
    position: "absolute",
    width: "8px",
    height: "8px",
    border: "2px solid var(--amber)",
  };
  if (pos === "top-left")     { style.top = "-2px"; style.left = "-2px";  style.borderRight = "none"; style.borderBottom = "none"; }
  if (pos === "top-right")    { style.top = "-2px"; style.right = "-2px"; style.borderLeft = "none";  style.borderBottom = "none"; }
  if (pos === "bottom-left")  { style.bottom = "-2px"; style.left = "-2px";  style.borderRight = "none"; style.borderTop = "none"; }
  if (pos === "bottom-right") { style.bottom = "-2px"; style.right = "-2px"; style.borderLeft = "none";  style.borderTop = "none"; }
  return <span style={style} />;
}