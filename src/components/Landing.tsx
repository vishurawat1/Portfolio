"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Landing({ onUnlock }: { onUnlock: () => void }) {
  const [isClicked, setIsClicked] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const quote = "A developer is a magician that brings unimaginable to life.";
  
  const handleSealClick = () => {
    setIsClicked(true);
    // After shockwave expands, show quote
    setTimeout(() => {
      setShowQuote(true);
    }, 800);
  };

  useEffect(() => {
    if (showQuote) {
      // Wait for typing animation + a small pause, then fade out everything
      const typingDuration = quote.length * 50; // 50ms per character
      const pauseDuration = 1500;
      
      const fadeOutTimer = setTimeout(() => {
        setIsFadingOut(true);
      }, typingDuration + pauseDuration);

      // Trigger unlock callback after fade out finishes
      const unlockTimer = setTimeout(() => {
        onUnlock();
      }, typingDuration + pauseDuration + 1000);

      return () => {
        clearTimeout(fadeOutTimer);
        clearTimeout(unlockTimer);
      };
    }
  }, [showQuote, onUnlock]);

  const typingContainerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, textShadow: "0px 0px 0px rgba(0,240,255,0)" },
    visible: { 
      opacity: 1, 
      textShadow: "0px 0px 8px rgba(0,240,255,0.8)",
      transition: { duration: 0.1 }
    },
  };

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-transparent"
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          
          {/* Shockwave */}
          {isClicked && (
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 25, opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute w-32 h-32 rounded-full border-4 border-neon-cyan shadow-[0_0_50px_#00f0ff] pointer-events-none"
            />
          )}

          {/* Glowing Artifact / Wax Seal Button */}
          <AnimatePresence>
        {!isClicked && (
          <motion.button
            key="seal"
            onClick={handleSealClick}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0, filter: "blur(10px)" }}
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(0,240,255,0.6)" }}
            whileTap={{ scale: 0.95, boxShadow: "inset 0px 4px 10px rgba(0,0,0,0.8), 0px 0px 5px rgba(0,240,255,0.3)", y: 2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative w-40 h-40 rounded-full bg-deep-space border-2 border-neon-cyan/50 flex items-center justify-center cursor-pointer overflow-hidden group shadow-[0px_10px_30px_rgba(0,240,255,0.2)] transition-shadow duration-300"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-celestial-purple/20 to-transparent group-hover:from-neon-cyan/30 transition-colors duration-500" />
            
            <div className="relative z-10 flex flex-col items-center gap-2">
              <Sparkles className="w-8 h-8 text-soft-gold animate-pulse" />
              <span className="font-serif text-neon-cyan tracking-widest text-sm font-semibold uppercase">
                Reveal
              </span>
            </div>

            <div className="absolute inset-0 rounded-full border border-neon-cyan/20 animate-spin-slow" />
          </motion.button>
        )}
      </AnimatePresence>

          {/* Typing Quote */}
          {showQuote && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
            >
              <motion.p
                variants={typingContainerVariants}
                initial="hidden"
                animate="visible"
                className="text-2xl md:text-3xl lg:text-5xl text-center px-4 leading-[2] font-serif uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-celestial-purple drop-shadow-[0_0_25px_rgba(0,240,255,0.6)]"
              >
                {quote.split("").map((char, index) => (
                  <motion.span key={index} variants={letterVariants}>
                    {char}
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
