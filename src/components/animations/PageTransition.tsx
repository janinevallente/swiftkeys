"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Full-screen curtain that wipes in (covering) then wipes out (revealing)
 * on every route change.  Wrap your layout children with this.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}>
        {/* Curtain overlay — slides down to cover, then slides up to reveal */}
        <motion.div
          className="fixed inset-0 z-[200] origin-top bg-ink"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0 }}
        />

        {/* Entering: black curtain drops from top, then lifts off */}
        <motion.div
          className="fixed inset-0 z-[200] origin-top bg-ink"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.05 } }}
        />

        {/* Page content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
