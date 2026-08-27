"use client";

import CanvasCursor from "@/components/CanvasCursor";
import ManaBar from "@/components/ManaBar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ModeToggle from "@/components/ModeToggle";
import Playbot from "@/components/Playbot";
import GymDashboard from "@/components/gym/GymDashboard";
import { ThemeModeProvider, useThemeMode } from "@/context/ThemeModeContext";
import { motion, AnimatePresence } from "framer-motion";

function PortfolioContent() {
  const { mode } = useThemeMode();
  const isUpsideDown = mode === "upside-down";

  return (
    <main className={`relative min-h-screen ${isUpsideDown ? "selection:bg-red-600/40" : "selection:bg-neon-cyan/30"}`}>
      <CanvasCursor />
      <ManaBar />
      <ModeToggle variant="floating" />
      <Playbot />

      <AnimatePresence mode="wait">
        {isUpsideDown ? (
          <motion.div
            key="upside-down-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <GymDashboard />
            <Footer />
          </motion.div>
        ) : (
          <motion.div
            key="developer-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <Hero />
            <Projects />
            <Skills />
            <Experience />
            <Certificates />
            <Contact />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default function Home() {
  return (
    <ThemeModeProvider>
      <PortfolioContent />
    </ThemeModeProvider>
  );
}
