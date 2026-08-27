"use client";

import { LastWorkout } from "@/app/api/workout-stats/route";
import { motion } from "framer-motion";
import { Calendar, CheckCircle2, Dumbbell, Flame, Layers, Timer } from "lucide-react";

interface RecentWorkoutCardProps {
  lastWorkout: LastWorkout | null;
}

export default function RecentWorkoutCard({ lastWorkout }: RecentWorkoutCardProps) {
  if (!lastWorkout) {
    return (
      <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 text-neutral-400 font-mono text-sm text-center">
        No recent workout logged.
      </div>
    );
  }

  const workoutDate = new Date(lastWorkout.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  const totalSets = lastWorkout.exercises.reduce((acc, ex) => acc + ex.sets.length, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative rounded-2xl bg-gradient-to-b from-neutral-900/90 via-red-950/20 to-black/95 p-6 md:p-8 border border-red-500/40 shadow-[0_0_40px_rgba(239,68,68,0.2)] backdrop-blur-xl overflow-hidden"
    >
      {/* Header Flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-red-900/30">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-semibold">
              Live Hevy Session Logged
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white font-serif flex items-center gap-3">
            <span>Workout #{lastWorkout.nth_workout}:</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-white">
              {lastWorkout.name}
            </span>
          </h2>
        </div>

        {/* Quick Stats Badges */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-red-950/60 border border-red-500/30 text-xs font-mono text-white">
            <Calendar className="w-3.5 h-3.5 text-red-400" />
            <span>{workoutDate}</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-red-950/60 border border-red-500/30 text-xs font-mono text-white">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>{lastWorkout.estimated_volume_kg.toLocaleString()} kg Volume</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-red-950/60 border border-red-500/30 text-xs font-mono text-white">
            <Layers className="w-3.5 h-3.5 text-red-400" />
            <span>{totalSets} Sets · {lastWorkout.exercises.length} Exercises</span>
          </div>
        </div>
      </div>

      {/* Exercise Breakdown Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lastWorkout.exercises.map((ex, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="rounded-xl bg-neutral-950/70 p-4 border border-red-900/30 hover:border-red-500/50 transition-colors"
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <h4 className="text-sm font-bold text-white leading-snug">
                  {ex.title}
                </h4>
                <span className="text-[10px] font-mono uppercase text-red-400 tracking-wider">
                  {ex.muscle_group}
                </span>
              </div>
              <span className="text-xs font-mono text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                {ex.sets.length} sets
              </span>
            </div>

            {/* Sets list */}
            <div className="space-y-1.5">
              {ex.sets.map((s, sIdx) => (
                <div
                  key={sIdx}
                  className="flex items-center justify-between text-xs font-mono py-1 px-2 rounded bg-neutral-900/60 text-neutral-300 border border-neutral-900"
                >
                  <span className="text-neutral-500">Set {sIdx + 1}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-white">{s.weight_kg} kg</span>
                    <span className="text-neutral-500">×</span>
                    <span className="text-red-300">{s.reps} reps</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
