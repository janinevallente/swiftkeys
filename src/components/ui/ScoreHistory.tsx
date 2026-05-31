"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LabelList } from "recharts";
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

function WpmChart({ history }: { history: ScoreEntry[] }) {
  const rawData = [...history].reverse().slice(-10);
  if (rawData.length === 0) return null;

  const maxWpm = Math.max(...rawData.map((e) => e.wpm));
  const data = rawData.map((entry, i) => ({
    ...entry,
    indexNumber: history.length - rawData.length + i + 1,
    isBest: entry.wpm === maxWpm,
  }));

  return (
    <div className="w-full h-[180px] mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 24, right: 12, left: -8, bottom: 0 }} barGap={0}>
          <CartesianGrid strokeDasharray="2 2" stroke="var(--border-strong)" vertical={false} />
          <XAxis
            dataKey="indexNumber"
            tickLine={false}
            axisLine={{ stroke: "var(--border-strong)", strokeWidth: 1 }}
            tick={{ fontFamily: "'VT323', monospace", fontSize: 14, fill: "var(--text-muted)" }}
            dy={6}
          />
          <YAxis
            tickLine={false}
            axisLine={{ stroke: "var(--border-strong)", strokeWidth: 1 }}
            tick={{ fontFamily: "'VT323', monospace", fontSize: 14, fill: "var(--text-muted)" }}
            allowDecimals={false}
            width={36}
          />
          <Bar
            dataKey="wpm"
            maxBarSize={28}
            shape={(props: any) => {
              const { x, y, width, height, payload } = props;
              const fill = payload?.isBest ? "var(--amber)" : "var(--cyan)";
              return (
                <g>
                  <rect x={x + 2} y={y + 2} width={width} height={height} fill="var(--cyan-dim)" opacity="0.3" />
                  <rect x={x} y={y} width={width} height={height} fill={fill} />
                </g>
              );
            }}
          >
            <LabelList
              dataKey="wpm"
              position="top"
              content={(props) => {
                const { x, y, width, value, index } = props;
                if (index === undefined || x === undefined || y === undefined || width === undefined) return null;
                const isBest = data[index]?.isBest;
                return (
                  <text
                    x={Number(x) + Number(width) / 2}
                    y={Number(y) - 5}
                    fill={isBest ? "var(--amber)" : "var(--text-secondary)"}
                    textAnchor="middle"
                    style={{ fontFamily: "'VT323', monospace", fontSize: "15px" }}
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

// Clear Score Modal
function ClearModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        style={{ background: "rgba(0,0,0,0.75)" }}
        onClick={onCancel}
      >
        {/* Modal panel — stopPropagation so clicking inside doesn't close */}
        <motion.div
          key="modal"
          initial={{ scale: 0.88, opacity: 0, y: 12 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.88, opacity: 0, y: 12 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-xs sm:max-w-sm bg-bg-base border-2 border-accent p-5 sm:p-7"
          style={{
            boxShadow: "6px 6px 0px var(--cyan-dim), 0 0 24px rgba(93,140,62,0.2)",
            imageRendering: "pixelated",
          }}
        >
          {/* Pixel corner decorations */}
          <CornerDeco pos="top-left" />
          <CornerDeco pos="top-right" />
          <CornerDeco pos="bottom-left" />
          <CornerDeco pos="bottom-right" />

          {/* Warning icon */}
          <div className="flex justify-center mb-4">
            <svg width="28" height="28" viewBox="0 0 16 16" style={{ imageRendering: "pixelated" }}>
              <rect x="7"  y="1"  width="2" height="2" fill="var(--amber)" />
              <rect x="6"  y="3"  width="4" height="2" fill="var(--amber)" />
              <rect x="5"  y="5"  width="6" height="2" fill="var(--amber)" />
              <rect x="4"  y="7"  width="8" height="2" fill="var(--amber)" />
              <rect x="3"  y="9"  width="10" height="2" fill="var(--amber)" />
              <rect x="2"  y="11" width="12" height="2" fill="var(--amber)" />
              <rect x="1"  y="13" width="14" height="2" fill="var(--amber)" />
              {/* Exclamation cutouts */}
              <rect x="7"  y="6"  width="2" height="4" fill="var(--bg-base)" />
              <rect x="7"  y="11" width="2" height="2" fill="var(--bg-base)" />
            </svg>
          </div>

          {/* Title */}
          <div className="text-center mb-2">
            <p className="font-pixel text-[0.55rem] sm:text-[0.65rem] text-accent tracking-wider5 leading-relaxed">
              CLEAR SCORE HISTORY?
            </p>
          </div>

          {/* Body text */}
          <div className="text-center mb-5 sm:mb-6">
            <p className="font-mono text-6xs sm:text-sm text-text-sub leading-relaxed">
              This will permanently delete all your saved scores. This cannot be undone.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={onCancel}
              className="font-pixel text-[0.45rem] sm:text-[0.5rem] tracking-wider3 px-4 sm:px-5 py-2 bg-bg-surface text-text-sub border-2 border-border-strong cursor-pointer hover:border-text-sub hover:text-text-base transition-colors duration-150"
              style={{ boxShadow: "3px 3px 0px var(--border-strong)" }}
            >
              CANCEL
            </button>
            <button
              onClick={onConfirm}
              className="font-pixel text-[0.45rem] sm:text-[0.5rem] tracking-wider3 px-4 sm:px-5 py-2 bg-accent text-bg-base border-2 border-accent cursor-pointer hover:opacity-85 transition-opacity"
              style={{ boxShadow: "3px 3px 0px rgba(63,97,40,0.5)" }}
            >
              YES
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function CornerDeco({ pos }: { pos: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const base = "absolute w-2 h-2 border-2 border-amber";
  const variants: Record<typeof pos, string> = {
    "top-left":     "-top-px -left-px border-r-0 border-b-0",
    "top-right":    "-top-px -right-px border-l-0 border-b-0",
    "bottom-left":  "-bottom-px -left-px border-r-0 border-t-0",
    "bottom-right": "-bottom-px -right-px border-l-0 border-t-0",
  };
  return <span className={`${base} ${variants[pos]}`} />;
}

// Main component
export function ScoreHistory({ history, onClear }: ScoreHistoryProps) {
  const [showModal, setShowModal] = useState(false);

  if (history.length === 0) return null;

  const bestWpm = Math.max(...history.map((e) => e.wpm));

  return (
    <>
      {/* Clear confirm modal — rendered in a portal-like position via fixed */}
      {showModal && (
        <ClearModal
          onConfirm={() => { onClear(); setShowModal(false); }}
          onCancel={() => setShowModal(false)}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full mt-6 sm:mt-8"
      >
        {/* Section header */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 12 12" style={{ imageRendering: "pixelated" }}>
              <rect x="3" y="0" width="6" height="1" fill="var(--amber)" />
              <rect x="2" y="1" width="8" height="5" fill="var(--amber)" />
              <rect x="1" y="2" width="2" height="3" fill="var(--amber)" />
              <rect x="9" y="2" width="2" height="3" fill="var(--amber)" />
              <rect x="4" y="6" width="4" height="1" fill="var(--amber)" />
              <rect x="5" y="7" width="2" height="2" fill="var(--amber)" />
              <rect x="3" y="9" width="6" height="2" fill="var(--amber)" />
            </svg>
            <span className="font-pixel text-[0.55rem] sm:text-[0.65rem] text-amber tracking-wider5">
              SCORE HISTORY
            </span>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="font-pixel text-[0.45rem] sm:text-[0.5rem] text-text-muted border border-border-strong px-2 py-1 bg-bg-surface hover:text-danger hover:border-danger transition-colors duration-150 cursor-pointer"
          >
            CLEAR
          </button>
        </div>

        {/* Chart */}
        <div className="mb-3 sm:mb-4">
          <div className="font-pixel text-[0.45rem] sm:text-[0.5rem] text-text-muted tracking-wider5 mb-1 text-center">
            WPM — LAST {Math.min(history.length, 10)} RUNS
          </div>
          <WpmChart history={history} />
        </div>

        {/* Table */}
        <div className="bg-bg-surface border-2 border-border-strong shadow-pixel-border overflow-hidden mt-5">
          <div className="overflow-x-auto max-h-[220px] overflow-y-auto">
            <table className="w-full min-w-[420px]">
              <thead className="sticky top-0 bg-bg-surface z-10">
                <tr className="border-b border-border-strong">
                  {["DATE", "WPM", "ACC", "CORRECT", "ERRORS", "TIME"].map((h) => (
                    <th
                      key={h}
                      className="font-pixel text-[0.4rem] sm:text-[0.45rem] text-text-muted tracking-wider3 px-3 py-2 text-left whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {history.map((entry) => {
                  const isBest = entry.wpm === bestWpm;
                  return (
                    <tr
                      key={entry.id}
                      className="border-b border-border-subtle last:border-b-0"
                      style={{ background: isBest ? "var(--cyan-glow)" : undefined }}
                    >
                      {/* DATE */}
                      <td className="font-mono text-xs sm:text-sm text-text-dim px-3 py-2 whitespace-nowrap">
                        {formatTime(entry.timestamp)}
                      </td>
                      {/* WPM */}
                      <td
                        className="font-mono text-sm sm:text-base font-bold px-3 py-2"
                        style={{ color: isBest ? "var(--amber)" : "var(--cyan)" }}
                      >
                        {entry.wpm}
                        {isBest && <span className="font-pixel text-[0.4rem] text-amber ml-1">★</span>}
                      </td>
                      {/* ACC */}
                      <td className="font-mono text-xs sm:text-sm text-text-sub px-3 py-2">{entry.accuracy}%</td>
                      {/* CORRECT */}
                      <td className="font-mono text-xs sm:text-sm text-accent px-3 py-2">{entry.correct}</td>
                      {/* ERRORS */}
                      <td
                        className="font-mono text-xs sm:text-sm px-3 py-2"
                        style={{ color: entry.incorrect > 0 ? "var(--red)" : "var(--text-muted)" }}
                      >
                        {entry.incorrect}
                      </td>
                      {/* TIME */}
                      <td className="font-mono text-xs sm:text-sm text-text-muted px-3 py-2 whitespace-nowrap">
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
    </>
  );
}