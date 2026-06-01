"use client";

import { motion, AnimatePresence } from "framer-motion";
import CornerDeco from "@/components/styling/CornerDeco";
import SectionLabel from "@/components/styling/SectionLabel";
import PixelDivider from "@/components/ui/PixelDivider";

interface AboutModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AboutModal({ open, onClose }: AboutModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.75)" }}
          onClick={onClose}
        >
          <motion.div
            key="modal"
            initial={{ scale: 0.88, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm md:max-w-xl bg-bg-base border-2 border-accent flex flex-col"
            style={{
              boxShadow: "6px 6px 0px var(--default-dim), 0 0 24px rgba(93,140,62,0.2)",
              imageRendering: "pixelated",
              maxHeight: "90vh",
            }}
          >
            <CornerDeco pos="top-left" />
            <CornerDeco pos="top-right" />
            <CornerDeco pos="bottom-left" />
            <CornerDeco pos="bottom-right" />

            {/* Header bar */}
            <div
                className="flex items-center justify-between px-4 sm:px-6 py-3 border-b-2 border-border-strong shrink-0"
                style={{ background: "var(--bg-surface)" }}
            >
                <div className="flex items-center gap-2">
                    <span className="font-pixel text-[0.45rem] sm:text-[0.55rem] text-accent tracking-wider5">
                        ABOUT SWIFTKEYS
                    </span>
                </div>

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="font-pixel text-[0.45rem] text-text-muted border border-border-strong px-2 py-1 bg-bg-base hover:text-danger hover:border-danger transition-colors duration-150 cursor-pointer"
                >
                    ✕
                </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1 px-4 sm:px-6 py-5">

            {/* ── About the App ── */}
            <SectionLabel>▸ ABOUT THE APP</SectionLabel>
            <div
                className="relative bg-bg-surface border border-border-strong p-4 mb-1"
                style={{ boxShadow: "3px 3px 0px var(--border-strong)" }}
            >
                <CornerDeco pos="top-left" />
                <CornerDeco pos="bottom-right" />
                <p className="font-mono text-sm md:text-lg text-text-sub leading-relaxed">
                    <span className="text-accent font-bold">SwiftKeys</span> is a
                    retro arcade-themed typing speed test. Test how fast and
                    accurately you can type across three difficulty levels — Easy,
                    Medium, and Hard — with configurable 15s, 30s, or 60s timers.
                </p>
                <p className="font-mono text-sm md:text-lg text-text-sub leading-relaxed mt-2">
                    Your scores are saved locally so you can track your WPM and
                    accuracy over time with a bar chart and full history log.
                    Everything is wrapped in a pixel-art aesthetic inspired by
                    classic arcade games.
                </p>
            </div>

            {/* Tech tag pills */}
            <div className="flex flex-wrap gap-1.5 mt-3 mb-1">
                {["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Web Audio API", "Recharts"].map((t) => (
                <span
                    key={t}
                    className="font-pixel text-[0.32rem] sm:text-[0.38rem] text-accent border border-border-strong px-2 py-1 bg-bg-surface tracking-wider3 py-2"
                >
                    {t}
                </span>
                ))}
            </div>

            <PixelDivider />

            {/* ── About the Developer ── */}
            <SectionLabel>▸ ABOUT THE DEVELOPER</SectionLabel>
            <div
                className="relative bg-bg-surface border border-border-strong p-4"
                style={{ boxShadow: "3px 3px 0px var(--border-strong)" }}
            >
                <CornerDeco pos="top-left"/>
                <CornerDeco pos="bottom-right"/>

                {/* Dev name + role */}
                <div className="flex items-start gap-3 mb-3">
                    <div>
                        <p className="font-pixel text-[0.5rem] md:text-[0.6rem] text-text-base tracking-wider3 leading-relaxed">
                        Janine Vallente ["J9"]
                        </p>
                        <p className="font-pixel text-[0.35rem] md:text-[0.45rem] text-amber tracking-wider3 mt-1">
                        Frontend Developer
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                        <svg width="8" height="10" viewBox="0 0 8 10" style={{ imageRendering: "pixelated", flexShrink: 0 }}>
                            <rect x="2" y="0" width="4" height="1" fill="var(--text-muted)" />
                            <rect x="1" y="1" width="6" height="1" fill="var(--text-muted)" />
                            <rect x="0" y="2" width="8" height="3" fill="var(--text-muted)" />
                            <rect x="1" y="5" width="6" height="1" fill="var(--text-muted)" />
                            <rect x="2" y="6" width="4" height="1" fill="var(--text-muted)" />
                            <rect x="3" y="7" width="2" height="1" fill="var(--text-muted)" />
                            <rect x="3" y="8" width="2" height="1" fill="var(--text-muted)" />
                            <rect x="3" y="9" width="2" height="1" fill="var(--text-muted)" />
                            {/* Hole */}
                            <rect x="3" y="2" width="2" height="2" fill="var(--bg-surface)" />
                        </svg>
                        <p className="font-mono text-[0.65rem] md:text-sm text-text-muted">
                            Cebu City, Philippines
                        </p>
                        </div>
                    </div>
                </div>

                <p className="font-mono text-sm md:text-lg text-text-sub leading-relaxed">
                    Frontend developer who builds interfaces people remember.
                    Experienced in React, Next.js, TypeScript, and Tailwind CSS,
                    with a love for creative UI and polished micro-interactions.
                </p>

                {/* Social links */}
                <div className="flex gap-2 mt-3">
                    <a
                        href="https://linkedin.com/in/janine-christine-vallente"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-pixel text-[0.32rem] sm:text-[0.38rem] text-text-muted border border-border-strong px-2 py-1 bg-bg-base hover:text-amber hover:border-amber transition-colors duration-150 tracking-wider3"
                    >
                        ⌥ LINKEDIN
                    </a>
                    <a
                        href="https://github.com/janinevallente"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-pixel text-[0.32rem] sm:text-[0.38rem] text-text-muted border border-border-strong px-2 py-1 bg-bg-base hover:text-accent hover:border-accent transition-colors duration-150 tracking-wider3"
                    >
                        ⌥ GITHUB
                    </a>
                </div>
            </div>

            <PixelDivider />

            {/* ── Why I Built This ── */}
            <SectionLabel>▸ WHY I BUILT THIS</SectionLabel>
            <div
                className="relative bg-bg-surface border border-border-strong p-4"
                style={{ boxShadow: "3px 3px 0px var(--border-strong)" }}
            >
                <CornerDeco pos="top-left" />
                <CornerDeco pos="bottom-right" />
                <p className="font-mono text-sm md:text-lg text-text-sub leading-relaxed">
                    I built SwiftKeys as a personal project to combine two things
                    I enjoy — typing fast and retro aesthetics. I wanted to create
                    something that felt like a fun arcade game while also being a
                    genuinely useful tool.
                </p>
                <p className="font-mono text-sm md:text-lg text-text-sub leading-relaxed mt-2">
                    It was also a great excuse to dig deeper into the{" "}
                    <span className="text-accent">Web Audio API</span>, explore
                    pixel-art design with pure CSS and SVG, and practice building
                    a polished, responsive app from scratch using{" "}
                    <span className="text-accent">Next.js</span> and{" "}
                    <span className="text-accent">Tailwind CSS</span>.
                </p>
            </div>

            {/* Bottom padding */}
            <div className="h-2" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}