"use client";

import { motion, AnimatePresence } from "framer-motion";
import CornerDeco from "@/components/styling/CornerDeco";

export default function ClearModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <AnimatePresence>
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
            boxShadow: "6px 6px 0px var(--default-dim), 0 0 24px rgba(93,140,62,0.2)",
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