"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Activity, ArrowRight, Dna, Flame, HeartPulse, ShieldAlert, Sparkles, Zap } from "lucide-react";

export default function OverclockLoading({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [heartRate, setHeartRate] = useState(72);
  const [stageText, setStageText] = useState("SYNCHRONIZING NEURAL MOTOR UNITS...");
  const [adrenaline, setAdrenaline] = useState(15);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 2.5-second total duration (2500ms)
    const TOTAL_DURATION_MS = 2500;
    const TICK_INTERVAL_MS = 35;
    const TOTAL_TICKS = TOTAL_DURATION_MS / TICK_INTERVAL_MS;
    let currentTick = 0;

    const interval = setInterval(() => {
      currentTick++;
      const nextProgress = Math.min(100, Math.round((currentTick / TOTAL_TICKS) * 100));
      setProgress(nextProgress);

      setHeartRate(Math.round(72 + (nextProgress / 100) * 123)); // 72 BPM -> 195 BPM
      setAdrenaline(Math.round(15 + (nextProgress / 100) * 85)); // 15% -> 100%

      if (nextProgress < 25) {
        setStageText("INJECTING ADRENALINE SURGE (EPINEPHRINE)...");
      } else if (nextProgress < 55) {
        setStageText("SYNCHRONIZING FAST-TWITCH MUSCLE FIBERS...");
      } else if (nextProgress < 85) {
        setStageText("RECRUITING 100% MOTOR UNITS FOR 1RM POWER...");
      } else if (nextProgress < 100) {
        setStageText("STABILIZING LACTIC ATP THRESHOLD...");
      } else {
        setStageText("BIOLOGICAL OVERCLOCK COMPLETE: BERSERKER STATE UNLOCKED!");
        setIsReady(true);
        clearInterval(interval);
      }
    }, TICK_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 overflow-hidden select-none">
      {/* Bio-Adrenaline Red Grid & Pulse Flare */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-600/30 via-red-950/40 to-black pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ef444415_1px,transparent_1px),linear-gradient(to_bottom,#ef444415_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Skip Button */}
      <button
        onClick={onComplete}
        className="absolute top-6 right-6 z-20 px-3.5 py-1.5 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer"
      >
        Skip ➔
      </button>

      {/* Bio-Overclock HUD Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-md sm:max-w-lg p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-neutral-950/95 border-2 border-red-500/60 shadow-[0_0_60px_rgba(239,68,68,0.45)] backdrop-blur-2xl max-h-[90vh] flex flex-col justify-between"
      >
        {/* HUD Corner Tech Brackets */}
        <div className="absolute -top-1 -left-1 w-5 h-5 border-t-2 border-l-2 border-red-400 pointer-events-none" />
        <div className="absolute -top-1 -right-1 w-5 h-5 border-t-2 border-r-2 border-red-400 pointer-events-none" />
        <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-2 border-l-2 border-red-400 pointer-events-none" />
        <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-2 border-r-2 border-red-400 pointer-events-none" />

        {/* Top Biological HUD Header */}
        <div className="flex items-center justify-between border-b border-red-900/40 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
            </span>
            <span className="font-mono text-[11px] font-black tracking-widest text-red-400 uppercase flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4 text-red-500 animate-pulse" />
              HUMAN BIOLOGICAL OVERCLOCK
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-400">
            <span className="text-red-400 font-bold">{heartRate} BPM</span>
            <span>|</span>
            <span className="text-amber-400 font-bold">ATP: MAX</span>
          </div>
        </div>

        {/* Central Bio-Reactor Core (Heart & Synapse) */}
        <div className="relative flex flex-col items-center justify-center my-3">
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
            {/* Outer Pulsing Pulse Wave */}
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.06, 1] }}
              transition={{
                rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                scale: { duration: 0.6, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-red-500/50"
            />

            {/* Counter-Spinning DNA Helix Arc */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-1.5 rounded-full border border-rose-500/60 border-t-transparent border-b-transparent"
            />

            {/* Glowing Bio Arc */}
            <motion.div
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-3 rounded-full border-4 border-red-500 shadow-[0_0_30px_#ff0033]"
              style={{
                clipPath: `polygon(50% 50%, 0 0, ${progress * 2}% 0, ${progress > 50 ? "100% 100%" : "0 100%"})`
              }}
            />

            {/* Center Heart / Bio Metric */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center">
              <motion.div
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <HeartPulse className="w-7 h-7 text-red-400 drop-shadow-[0_0_12px_#ef4444] mb-0.5" />
              </motion.div>
              <div className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tight drop-shadow-[0_0_15px_#ff0033]">
                {progress}%
              </div>
              <div className="text-[10px] font-mono font-bold text-red-400 tracking-wider mt-0.5">
                {heartRate} BPM
              </div>
            </div>
          </div>
        </div>

        {/* Biological Metrics */}
        <div className="space-y-3 mt-2">
          {/* Main Adrenaline Progress Bar */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[11px] font-mono">
              <span className="text-red-400 font-bold flex items-center gap-1">
                <Flame className="w-3 h-3 text-red-500" />
                <span>EPINEPHRINE / ADRENALINE</span>
              </span>
              <span className="text-white font-extrabold">{adrenaline}% SURGE</span>
            </div>

            <div className="h-2.5 w-full bg-neutral-900 rounded-full p-0.5 border border-red-900/60 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-white rounded-full shadow-[0_0_15px_#ef4444]"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.05 }}
              />
            </div>
          </div>

          {/* Sub-Metrics: Motor Units & Lactic Threshold */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="rounded-lg bg-neutral-900/70 p-2.5 border border-red-950/80 text-center sm:text-left">
              <div className="text-[9px] font-mono text-neutral-400 uppercase">MOTOR UNITS</div>
              <div className="text-xs font-bold font-mono text-white flex items-center justify-center sm:justify-start gap-1 mt-0.5">
                <Dna className="w-3 h-3 text-red-400" />
                <span>100% RECRUITED</span>
              </div>
            </div>

            <div className="rounded-lg bg-neutral-900/70 p-2.5 border border-red-950/80 text-center sm:text-left">
              <div className="text-[9px] font-mono text-neutral-400 uppercase">ATP OUTPUT</div>
              <div className="text-xs font-bold font-mono text-red-400 flex items-center justify-center sm:justify-start gap-1 mt-0.5">
                <Zap className="w-3 h-3 text-amber-400" />
                <span>MAX DISCIPLINE</span>
              </div>
            </div>
          </div>

          {/* Stage Status or Interactive Proceed Button */}
          <div className="text-center pt-2">
            <AnimatePresence mode="wait">
              {isReady ? (
                <motion.button
                  key="proceed-btn"
                  initial={{ opacity: 0, scale: 0.9, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={onComplete}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-500 hover:from-red-500 hover:to-rose-500 text-white font-extrabold font-mono text-sm tracking-wider uppercase shadow-[0_0_30px_#ef4444] hover:shadow-[0_0_45px_#ef4444] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <Flame className="w-4 h-4 text-amber-300 animate-bounce" />
                  <span>UNLEASH BIOLOGICAL OVERCLOCK ➔</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              ) : (
                <motion.div
                  key="status-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="inline-block px-3 py-1 rounded-md bg-red-950/50 border border-red-500/30 text-[11px] font-mono text-red-300 font-semibold tracking-wider animate-pulse"
                >
                  {stageText}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
