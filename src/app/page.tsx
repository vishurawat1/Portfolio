"use client";

import { useState, useEffect } from "react";
import CanvasCursor from "@/components/CanvasCursor";
import Landing from "@/components/Landing";
import ManaBar from "@/components/ManaBar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    if (!isUnlocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    // Cleanup
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isUnlocked]);

  return (
    <main className="relative min-h-screen selection:bg-neon-cyan/30">
      <CanvasCursor />
      
      <AnimatePresence mode="wait">
        {!isUnlocked && (
          <Landing key="landing" onUnlock={() => setIsUnlocked(true)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isUnlocked && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <ManaBar />
            <Hero />
            <Projects />
            <Skills />
            <Experience />
            {/* <Certificates /> */}
            <Contact />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
