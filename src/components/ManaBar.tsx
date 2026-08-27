"use client";

import { useThemeMode } from "@/context/ThemeModeContext";
import { motion, useScroll } from "framer-motion";

export default function ManaBar() {
  const { scrollYProgress } = useScroll();
  const { mode } = useThemeMode();
  const isUpsideDown = mode === "upside-down";

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-1 origin-left z-50 transition-colors duration-500 ${
        isUpsideDown
          ? "bg-red-500 shadow-[0_0_20px_#ef4444]"
          : "bg-neon-cyan shadow-[0_0_15px_#00f0ff]"
      }`}
      style={{ scaleX: scrollYProgress }}
    />
  );
}
