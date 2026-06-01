"use client";

import { motion, AnimatePresence } from "framer-motion";
import CornerDeco from "@/components/styling/CornerDeco";
import SectionLabel from "@/components/styling/SectionLabel";
import PixelDivider from "@/components/ui/PixelDivider";
import '@hackernoon/pixel-icon-library/fonts/iconfont.css';

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
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/75"
          onClick={onClose}
        >
          <motion.div
            key="modal"
            initial={{ scale: 0.88, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm md:max-w-xl bg-bg-base border-2 border-accent flex flex-col shadow-pixel-hero shadow-[0_0_24px_rgba(93,140,62,0.2)] [image-rendering:pixelated] max-h-[90vh]"
          >
            <CornerDeco pos="top-left" />
            <CornerDeco pos="top-right" />
            <CornerDeco pos="bottom-left" />
            <CornerDeco pos="bottom-right" />

            {/* Header bar */}
            <div className="bg-bg-surface flex items-center justify-between px-4 sm:px-6 py-3 border-b-2 border-border-strong shrink-0">
              <div className="flex items-center gap-2">
                <i className="hn hn-info-circle-solid text-accent text-[12px] md:text-[14px]" />
                <span className="font-pixel text-[0.45rem] md:text-[0.55rem] text-accent tracking-wider5">
                  ABOUT SWIFTKEYS
                </span>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="flex items-center justify-center font-pixel text-[0.45rem] text-text-muted border border-border-strong p-1 bg-bg-base hover:text-danger hover:border-danger transition-colors duration-150 cursor-pointer w-6 h-6"
              >
                <i className="hn hn-window-close text-[26px]" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1 px-4 sm:px-6 py-5">

              <SectionLabel>ABOUT THE APP</SectionLabel>
              <div
                className="relative bg-bg-surface border border-border-strong p-4 mb-1 shadow-pixel-border"
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
                    className="font-pixel text-[0.32rem] md:text-[0.38rem] text-accent border border-border-strong px-2 py-1 bg-bg-surface tracking-wider3"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <PixelDivider />

              <SectionLabel>ABOUT THE DEVELOPER</SectionLabel>
              <div className="relative bg-bg-surface border border-border-strong p-4 shadow-pixel-border">
                <CornerDeco pos="top-left" />
                <CornerDeco pos="bottom-right" />

                {/* Dev name + role */}
                <div className="flex items-start gap-3 mb-3">
                  {/* User Icon next to Developer info card */}
                  <div className="flex items-center justify-center border-2 border-border-strong bg-bg-base w-12 h-12 text-text-muted mt-0.5">
                    <i className="hn hn-user-solid text-[25px]" />
                  </div>
                  <div>
                    <p className="font-pixel text-[0.5rem] md:text-[0.6rem] text-text-base tracking-wider3 leading-relaxed">
                      Janine Vallente ["J9"]
                    </p>
                    <p className="font-pixel text-[0.35rem] md:text-[0.45rem] text-amber tracking-wider3 mt-1">
                      Frontend Developer
                    </p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <i className="hn hn-location-pin-solid text-text-muted text-[11px] md:text-[12px]" />
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
                    className="flex items-center gap-1.5 font-pixel text-[0.32rem] md:text-[0.38rem] text-text-muted border border-border-strong px-2 py-1.5 bg-bg-base hover:text-amber hover:border-amber transition-colors duration-150 tracking-wider3"
                  >
                    <i className="hn hn-linkedin text-[10px] md:text-[12px]" />
                    <span>LINKEDIN</span>
                  </a>
                  
                  <a
                    href="https://github.com/janinevallente"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-pixel text-[0.32rem] md:text-[0.38rem] text-text-muted border border-border-strong px-2 py-1.5 bg-bg-base hover:text-accent hover:border-accent transition-colors duration-150 tracking-wider3"
                  >
                    <i className="hn hn-github text-[10px] md:text-[12px]" />
                    <span>GITHUB</span>
                  </a>
                </div>
              </div>

              <PixelDivider />

              <SectionLabel>WHY I BUILT THIS</SectionLabel>
              <div className="relative bg-bg-surface border border-border-strong p-4 shadow-pixel-border">
                <CornerDeco pos="top-left" />
                <CornerDeco pos="bottom-right" />
                <div className="flex gap-2 items-start mb-2">
                  <p className="font-mono text-sm md:text-lg text-text-sub leading-relaxed">
                    I built SwiftKeys as a personal project to combine two things
                    I enjoy — typing fast and retro aesthetics. I wanted to create
                    something that felt like a fun arcade game while also being a
                    genuinely useful tool.
                  </p>
                </div>
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