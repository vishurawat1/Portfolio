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
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative min-h-screen selection:bg-neon-cyan/30">
      <CanvasCursor />

      <motion.div
        key="profile"
        className="relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <ManaBar />
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Certificates />
        <Contact />
        <Footer />
      </motion.div>
    </main>
  );
}
