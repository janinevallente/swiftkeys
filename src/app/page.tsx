"use client";

import { useState, useEffect, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/ui/Preloader";
import ScrollToSection from "@/components/animations/ScrollToSection";

// Set to false to disable the preloader entirely
const ENABLE_PRELOADER = true;
const SESSION_KEY = "site_loaded";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ENABLE_PRELOADER) {
      setLoaded(true);
      setReady(true);
      return;
    }
    const hasLoaded = sessionStorage.getItem(SESSION_KEY) === "1";
    setLoaded(hasLoaded);
    setReady(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      const hash = window.location.hash;
      if (hash) {
        const el = document.getElementById(hash.slice(1));
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [loaded]);

  const handleDone = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setLoaded(true);
  };

  if (!ready) {
    return <div className="fixed inset-0 bg-ink z-[100]" />;
  }

  return (
    <>
      <Suspense fallback={null}>
        <ScrollToSection />
      </Suspense>

      <AnimatePresence mode="wait">
        {!loaded && <Preloader key="preloader" onDone={handleDone} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Navbar />

        <main>
          {/* ── Add your sections here ─────────────────────────── */}
          <section
            id="home"
            className="min-h-screen flex items-center justify-center bg-bg"
          >
            <div className="text-center px-8">
              <h1 className="font-display text-5xl md:text-7xl font-bold text-ink mb-4">
                Your Project
              </h1>
              <p className="font-body text-ink-muted text-lg">
                Replace this with your first section.
              </p>
            </div>
          </section>

          {/* Example section skeleton — duplicate and customise */}
          <section id="about" className="min-h-screen flex items-center justify-center bg-ink">
            <p className="font-body text-white/50">About section</p>
          </section>

          <section id="work" className="min-h-screen flex items-center justify-center bg-bg">
            <p className="font-body text-ink-muted">Work section</p>
          </section>

          <section id="contact" className="min-h-screen flex items-center justify-center bg-ink">
            <p className="font-body text-white/50">Contact section</p>
          </section>
          {/* ───────────────────────────────────────────────────── */}
        </main>

        <Footer />
      </motion.div>
    </>
  );
}
