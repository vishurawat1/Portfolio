"use client";

import { useThemeMode } from "@/context/ThemeModeContext";
import { motion } from "framer-motion";
import { Dumbbell, Flame, ShieldAlert, RotateCcw } from "lucide-react";

interface ModeToggleProps {
  variant?: "floating" | "hero" | "header";
  className?: string;
}

export default function ModeToggle({ variant = "floating", className = "" }: ModeToggleProps) {
  const { mode, toggleMode, isTransitioning } = useThemeMode();
  const isUpsideDown = mode === "upside-down";

  if (variant === "hero") {
    return (
      <div className={`relative inline-block w-full sm:w-auto ${className}`}>
        <motion.button
          onClick={toggleMode}
          disabled={isTransitioning}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.96 }}
          className={`group relative z-10 w-full sm:w-auto inline-flex items-center justify-center gap-3 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-bold transition-all duration-300 cursor-pointer overflow-hidden ${
            isUpsideDown
              ? "bg-neutral-950 text-white border-2 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_30px_rgba(239,68,68,0.7)]"
              : "bg-red-950/60 hover:bg-red-900/80 text-red-100 border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.25)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)]"
          }`}
        >
          {/* Ambient Inner Hover Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 via-rose-500/20 to-amber-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <span className="relative z-10 flex items-center gap-2 font-mono text-xs sm:text-sm tracking-wider uppercase">
            {isUpsideDown ? (
              <>
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 group-hover:rotate-180 transition-transform duration-500" />
                <span>Return to Dev Reality</span>
              </>
            ) : (
              <>
                <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 group-hover:text-red-300 animate-pulse" />
                <span className="font-semibold text-white">Enter The Upside Down</span>
                <span className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded bg-red-600 text-white font-mono uppercase tracking-widest ml-0.5 shadow-[0_0_8px_#ef4444]">
                  Gym Mode
                </span>
              </>
            )}
          </span>
        </motion.button>
      </div>
    );
  }

  // Floating Quick-Toggle Dock Button (Responsive)
  return (
    <div className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 ${className}`}>
      <motion.button
        onClick={toggleMode}
        disabled={isTransitioning}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.94 }}
        className={`group relative flex items-center gap-2.5 sm:gap-3 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full backdrop-blur-xl transition-all duration-300 shadow-2xl cursor-pointer ${
          isUpsideDown
            ? "bg-black/95 text-white border-2 border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.5)] hover:bg-red-950/90"
            : "bg-black/85 text-white border border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:border-red-400 hover:shadow-[0_0_30px_rgba(239,68,68,0.6)]"
        }`}
        title={isUpsideDown ? "Return to Developer Profile" : "Enter Gym Alter-Ego Mode"}
      >
        {/* Red Ember Ring */}
        <div className="relative flex items-center justify-center">
          {isUpsideDown ? (
            <div className="relative">
              <span className="absolute -inset-1 rounded-full bg-red-600 animate-ping opacity-60"></span>
              <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-600 flex items-center justify-center text-white">
                <Dumbbell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
          ) : (
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-red-600 to-rose-800 flex items-center justify-center text-white shadow-[0_0_10px_#ef4444]">
              <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse" />
            </div>
          )}
        </div>

        <div className="flex flex-col items-start pr-1 sm:pr-2 text-left">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider font-mono flex items-center gap-1">
            {isUpsideDown ? (
              <span className="text-red-400 font-extrabold flex items-center gap-1">
                <ShieldAlert className="w-3 h-3 text-red-500 inline" />
                ALTER-EGO
              </span>
            ) : (
              <span className="text-gray-200 group-hover:text-red-400 transition-colors">
                UPSIDE DOWN
              </span>
            )}
          </span>
          <span className="text-[9px] sm:text-[10px] text-gray-400 group-hover:text-gray-200 transition-colors font-mono">
            {isUpsideDown ? "Exit Gym Mode" : "Gym Stats"}
          </span>
        </div>
      </motion.button>
    </div>
  );
}
