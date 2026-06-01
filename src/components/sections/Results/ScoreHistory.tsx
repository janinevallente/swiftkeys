"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import WpmChart from "@/components/sections/Results/WpmChart";
import PixelIconBtn from "@/components/ui/PixelIconBtn";
import ClearModal from "@/components/ui/modals/ClearModal";
import type { ScoreEntry } from "@/hooks/useScoreHistory";
import '@hackernoon/pixel-icon-library/fonts/iconfont.css';

interface ScoreHistoryProps {
  history: ScoreEntry[];
  onClear: () => void;
}

function formatTime(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
    + " " + d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

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
            <i className="hn hn-trophy-solid text-amber text-[12px] sm:text-[14px]" />
            <span className="font-pixel text-[0.55rem] md:text-[0.65rem] text-amber tracking-wider5">
              SCORE HISTORY
            </span>
          </div>

          <PixelIconBtn
            onClick={() => setShowModal(true)}
            title="CLEAR"
            variant="danger"
          >
            <i className="hn hn-trash-solid text-[10px] md:text-[11px]" />
          </PixelIconBtn>
        </div>

        {/* Chart */}
        <div className="mb-3 sm:mb-4">
          <div className="font-pixel text-[0.45rem] sm:text-[0.5rem] text-text-muted tracking-wider5 mb-1 text-center">
            WPM — LAST {Math.min(history.length, 10)} SPEED TESTS
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
                      className={`border-b border-border-subtle last:border-b-0 ${
                        isBest ? "bg-[var(--default-glow)]" : ""
                      }`}
                    >
                      {/* DATE */}
                      <td className="font-mono text-xs sm:text-sm text-text-dim px-3 py-2 whitespace-nowrap">
                        {formatTime(entry.timestamp)}
                      </td>
                      
                      {/* WPM */}
                      <td
                        className={`font-mono text-sm sm:text-base font-bold px-3 py-2 ${
                          isBest ? "text-amber" : "text-accent"
                        }`}
                      >
                        <span className="inline-flex items-center gap-1">
                          {entry.wpm}
                          {isBest && <i className="hn hn-star-solid text-amber text-[4px] md:text-[5px]" />}
                        </span>
                      </td>
                      
                      {/* ACC */}
                      <td className="font-mono text-xs sm:text-sm text-text-sub px-3 py-2">{entry.accuracy}%</td>
                      
                      {/* CORRECT */}
                      <td className="font-mono text-xs sm:text-sm text-accent px-3 py-2">{entry.correct}</td>
                      
                      {/* ERRORS */}
                      <td
                        className={`font-mono text-xs sm:text-sm px-3 py-2 ${
                          entry.incorrect > 0 ? "text-danger" : "text-text-muted"
                        }`}
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