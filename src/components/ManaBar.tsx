"use client";

import { motion, useScroll } from "framer-motion";

export default function ManaBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-neon-cyan origin-left z-50 shadow-[0_0_15px_#00f0ff]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
