"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LabelList, Cell } from "recharts";
import type { ScoreEntry } from "@/hooks/useScoreHistory";

interface ScoreHistoryProps {
  history: ScoreEntry[];
  onClear: () => void;
}

function formatTime(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
    + " " + d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

// Recharts Implementation with Custom Typography
function WpmChart({ history }: { history: ScoreEntry[] }) {
  // Show last 10 entries, oldest → newest left → right
  const rawData = [...history].reverse().slice(-10);
  if (rawData.length === 0) return null;

  // Map data to match the structure Recharts expects, adding explicit index numbers
  const data = rawData.map((entry, i) => ({
    ...entry,
    indexNumber: history.length - rawData.length + i + 1,
    isBest: entry.wpm === Math.max(...rawData.map((e) => e.wpm)),
  }));

  // Shared font configuration for the retro look
  const pixelFontStyle = {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "10px",
    fill: "var(--text-muted)",
  };

  return (
    <div className="w-full max-w-[500px] h-[160px] mx-auto mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
          barGap={0}
        >
          <CartesianGrid 
            strokeDasharray="2 2" 
            stroke="var(--border-strong)" 
            vertical={false} 
          />
          
          <XAxis 
            dataKey="indexNumber" 
            tickLine={false}
            axisLine={{ stroke: "var(--border-strong)", strokeWidth: 1 }}
            tick={{ ...pixelFontStyle }}
            dy={8}
          />
          
          <YAxis 
            tickLine={false}
            axisLine={{ stroke: "var(--border-strong)", strokeWidth: 1 }}
            tick={{ ...pixelFontStyle }}
            allowDecimals={false}
          />

          <Bar 
            dataKey="wpm" 
            maxBarSize={24}
            shape={(props: any) => {
              const { x, y, width, height, payload } = props;
              // Determine fill based on the specific bar item's payload data
              const fillColor = payload?.isBest ? "var(--amber)" : "var(--cyan)";
              
              return (
                <g>
                  {/* Subtle retro drop shadow block */}
                  <rect x={x + 2} y={y + 2} width={width} height={height} fill="var(--cyan-dim)" opacity="0.3" />
                  {/* Main bar body */}
                  <rect x={x} y={y} width={width} height={height} fill={fillColor} />
                </g>
              );
            }}
          >
            {/* Custom Value Labels above each Bar */}
            <LabelList 
              dataKey="wpm" 
              position="top" 
              offset={6}
              content={(props) => {
                const { x, y, width, value, index } = props;
                if (index === undefined || x === undefined || y === undefined || width === undefined) return null;
                const isBest = data[index]?.isBest;
                return (
                  <text
                    x={Number(x) + Number(width) / 2}
                    y={Number(y) - 6}
                    fill={isBest ? "var(--amber)" : "var(--text-secondary)"}
                    textAnchor="middle"
                    style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px" }}
                  >
                    {value}
                  </text>
                );
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ScoreHistory({ history, onClear }: ScoreHistoryProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (history.length === 0) return null;

  const bestWpm = Math.max(...history.map((e) => e.wpm));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full mt-6 sm:mt-8"
    >
      {/* Section header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2">
          {/* Pixel trophy icon */}
          <svg width="12" height="12" viewBox="0 0 12 12" style={{ imageRendering: "pixelated" }}>
            <rect x="3" y="0" width="6" height="1" fill="var(--amber)" />
            <rect x="2" y="1" width="8" height="5" fill="var(--amber)" />
            <rect x="1" y="2" width="2" height="3" fill="var(--amber)" />
            <rect x="9" y="2" width="2" height="3" fill="var(--amber)" />
            <rect x="4" y="6" width="4" height="1" fill="var(--amber)" />
            <rect x="5" y="7" width="2" height="2" fill="var(--amber)" />
            <rect x="3" y="9" width="6" height="2" fill="var(--amber)" />
          </svg>
          <span className="font-pixel text-[0.4rem] sm:text-6xs text-amber tracking-wider5">
            SCORE HISTORY
          </span>
        </div>

        {/* Clear button */}
        {!showConfirm ? (
          <button
            onClick={() => setShowConfirm(true)}
            className="font-pixel text-[0.3rem] sm:text-4xs text-text-muted border border-border-strong px-2 py-1 bg-bg-surface hover:text-danger hover:border-danger transition-colors duration-150 cursor-pointer"
          >
            CLEAR
          </button>
        ) : (
          <div className="flex items-center gap-1.5">
            <span className="font-pixel text-[0.28rem] sm:text-3xs text-danger tracking-wider3">
              SURE?
            </span>
            <button
              onClick={() => { onClear(); setShowConfirm(false); }}
              className="font-pixel text-[0.28rem] sm:text-3xs text-bg-base bg-danger border border-danger px-1.5 py-0.5 cursor-pointer hover:opacity-80 transition-opacity"
            >
              YES
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="font-pixel text-[0.28rem] sm:text-3xs text-text-muted border border-border-strong px-1.5 py-0.5 bg-bg-surface cursor-pointer hover:border-text-sub transition-colors"
            >
              NO
            </button>
          </div>
        )}
      </div>

      {/* Chart wrapper container */}
      <div className="p-3 sm:p-4 mb-3 sm:mb-4">
        <div className="font-pixel text-[0.3rem] sm:text-4xs text-text-muted tracking-wider5 mb-1 text-center">
          WPM — LAST {Math.min(history.length, 10)} RUNS
        </div>
        <WpmChart history={history} />
      </div>

      {/* Table */}
      <div className="bg-bg-surface border-2 border-border-strong shadow-pixel-border overflow-hidden">
        <div className="font-pixel text-[0.3rem] sm:text-4xs text-text-muted tracking-wider5 p-3 border-b-2 border-border-strong">
          FULL LOG — {history.length} ENTRIES
        </div>
        <div className="overflow-x-auto max-h-[200px] overflow-y-auto">
          <table className="w-full min-w-[400px]">
            <thead>
              <tr className="border-b border-border-strong">
                {["DATE", "WPM", "ACC", "CORRECT", "ERRORS", "TIME"].map((h) => (
                  <th
                    key={h}
                    className="font-pixel text-[0.3rem] sm:text-4xs text-text-muted tracking-wider5 px-2 sm:px-3 py-1.5 text-left whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {history.map((entry, i) => {
                const isBest = entry.wpm === bestWpm;
                return (
                  <tr
                    key={entry.id}
                    className="border-b border-border-subtle last:border-b-0"
                    style={{ background: isBest ? "var(--cyan-glow)" : undefined }}
                  >
                    <td className="font-pixel text-6xs sm:text-2xs text-text-dim px-2 sm:px-3 py-1.5 whitespace-nowrap">
                      {formatTime(entry.timestamp)}
                    </td>
                    <td
                      className="font-mono text-md sm:text-sm font-bold px-2 sm:px-3 py-1.5"
                      style={{ color: isBest ? "var(--amber)" : "var(--cyan)" }}
                    >
                      {entry.wpm}
                      {isBest && (
                        <span className="font-pixel text-[0.3rem] sm:text-4xs text-amber ml-1">★</span>
                      )}
                    </td>
                    <td className="font-mono text-6xs sm:text-sm text-text-sub px-2 sm:px-3 py-1.5">
                      {entry.accuracy}%
                    </td>
                    <td className="font-mono text-6xs sm:text-sm text-accent px-2 sm:px-3 py-1.5">
                      {entry.correct}
                    </td>
                    <td
                      className="font-mono text-6xs sm:text-sm px-2 sm:px-3 py-1.5"
                      style={{ color: entry.incorrect > 0 ? "var(--red)" : "var(--text-muted)" }}
                    >
                      {entry.incorrect}
                    </td>
                    <td className="font-mono text-6xs sm:text-sm text-text-muted px-2 sm:px-3 py-1.5 whitespace-nowrap">
                      {entry.duration}s
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}