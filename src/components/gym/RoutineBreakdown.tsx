"use client";

import { Routine } from "@/app/api/workout-stats/route";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Flame, Sparkles, Target, Zap } from "lucide-react";
import { useState } from "react";

interface RoutineBreakdownProps {
  routines: Routine[];
}

export default function RoutineBreakdown({ routines }: RoutineBreakdownProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  if (!routines || routines.length === 0) return null;

  const currentRoutine = routines[selectedIdx] || routines[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl bg-gradient-to-b from-neutral-900/90 via-red-950/20 to-black/95 p-6 md:p-8 border border-red-500/30 shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-xl"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Zap className="w-4 h-4 text-red-500" />
            <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-semibold">
              Training Split Blueprint
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white font-serif">
            Active Workout Routines
          </h3>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-neutral-950/80 border border-red-950">
          {routines.map((r, idx) => (
            <button
              key={r.id || idx}
              onClick={() => setSelectedIdx(idx)}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                selectedIdx === idx
                  ? "bg-red-600 text-white shadow-[0_0_15px_#ef4444]"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-900"
              }`}
            >
              {r.title}
            </button>
          ))}
        </div>
      </div>

      {/* Routine Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentRoutine.id || selectedIdx}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between py-2 border-b border-red-900/30 text-xs font-mono text-neutral-400">
            <span className="flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-red-400" />
              <span>Routine: <strong className="text-white">{currentRoutine.title}</strong></span>
            </span>
            <span>{currentRoutine.exercises?.length || 0} Exercises Programmed</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {(currentRoutine.exercises || []).map((ex, i) => (
              <div
                key={i}
                className="rounded-xl bg-neutral-950/60 p-4 border border-red-950/60 hover:border-red-500/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-sm font-bold text-white">
                    {ex.title}
                  </h4>
                  <span className="text-[10px] font-mono uppercase text-red-400 bg-red-950/50 px-2 py-0.5 rounded border border-red-900/50">
                    {ex.muscle_group}
                  </span>
                </div>

                <div className="space-y-1">
                  {(ex.sets || []).map((s, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-center justify-between text-xs font-mono text-neutral-300 py-0.5"
                    >
                      <span className="text-neutral-500">Set {sIdx + 1} ({s.type || "normal"})</span>
                      <span className="font-semibold text-red-300">
                        {s.weight_kg > 0 ? `${s.weight_kg} kg` : "BW"} × {s.reps} reps
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
