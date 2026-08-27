"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Award,
  ChevronRight,
  Dumbbell,
  ExternalLink,
  Flame,
  RefreshCw,
  RotateCcw,
  Shield,
  Sparkles,
  Trophy,
  Zap
} from "lucide-react";
import { WorkoutStatsResponse } from "@/app/api/workout-stats/route";
import PRCard from "./PRCard";
import RecentWorkoutCard from "./RecentWorkoutCard";
import WeeklyActivityChart from "./WeeklyActivityChart";
import RoutineBreakdown from "./RoutineBreakdown";
import OverclockLoading from "./OverclockLoading";
import { useThemeMode } from "@/context/ThemeModeContext";

export default function GymDashboard() {
  const { toggleMode } = useThemeMode();
  const [stats, setStats] = useState<WorkoutStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/workout-stats");
      if (!res.ok) throw new Error("Failed to load workout stats");
      const data: WorkoutStatsResponse = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    fetchStats();
  };

  if (loading) {
    return <OverclockLoading onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="relative min-h-screen bg-black text-white px-4 sm:px-6 py-20 md:py-28 max-w-7xl mx-auto z-10 selection:bg-red-600/40">
      {/* Background Ambience & Grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 right-10 w-[500px] h-[500px] bg-rose-700/10 rounded-full blur-[120px]" />
      </div>

      {/* Hero Alter-Ego Header */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-red-900/40"
      >
        <div className="max-w-3xl">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-red-950/80 border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)] mb-6">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
            <span className="text-xs font-mono font-bold tracking-widest text-red-300 uppercase">
              THE UPSIDE DOWN // GYM ALTER-EGO ACTIVE
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight text-white mb-6">
            VISHWAJEET{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-white drop-shadow-[0_0_30px_rgba(239,68,68,0.5)]">
              RAWAT
            </span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-300 font-sans leading-relaxed mb-8 max-w-2xl">
            Beyond engineering scalable software architecture lies the relentless pursuit of progressive overload. Discipline in the terminal, violence in the squat rack.
          </p>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <a
              href="https://hevy.com/user/vishugod"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold font-mono text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(239,68,68,0.6)] hover:shadow-[0_0_35px_rgba(239,68,68,0.9)] transition-all duration-300"
            >
              <Dumbbell className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
              <span>View Live Hevy Profile</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            <button
              onClick={toggleMode}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 font-mono text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer hover:border-cyan-400 hover:text-cyan-300"
            >
              <RotateCcw className="w-4 h-4 text-cyan-400" />
              <span>Return to Dev Portfolio</span>
            </button>
          </div>
        </div>

        {/* Big Highlights Stat Card */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="w-full md:w-80 rounded-2xl bg-gradient-to-b from-neutral-900 via-red-950/40 to-black p-6 border-2 border-red-500/50 shadow-[0_0_35px_rgba(239,68,68,0.3)] backdrop-blur-2xl text-center"
        >
          <div className="text-xs font-mono text-red-400 uppercase tracking-widest mb-1">
            Total SBD 1RM Est.
          </div>
          <div className="text-5xl font-black font-serif text-white tracking-tight drop-shadow-[0_2px_15px_rgba(255,255,255,0.3)]">
            {stats?.total_estimated_sbd_kg || 397}
            <span className="text-lg text-red-400 font-mono ml-1">KG</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-red-900/40 text-left">
            <div>
              <div className="text-[11px] font-mono text-neutral-400 uppercase">Logged Sessions</div>
              <div className="text-xl font-bold text-white font-mono flex items-center gap-1.5 mt-0.5">
                <Flame className="w-4 h-4 text-red-500" />
                <span>{stats?.workout_count || 78}+</span>
              </div>
            </div>
            <div>
              <div className="text-[11px] font-mono text-neutral-400 uppercase">Profile Sync</div>
              <div className="text-xs font-bold text-green-400 font-mono flex items-center gap-1 mt-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span>Live Active</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Sync Status Header with manual refresh */}
      <div className="flex items-center justify-between py-6">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <Activity className="w-3.5 h-3.5 text-red-500" />
          <span>
            Data extracted from Hevy <strong className="text-white">@vishugod</strong> · Source:{" "}
            <span className="text-red-400 uppercase font-bold">{stats?.source || "live"}</span>
          </span>
        </div>

        <button
          onClick={handleManualRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-red-400 transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-red-500" : ""}`} />
          <span>{isRefreshing ? "Syncing..." : "Refresh"}</span>
        </button>
      </div>

      {/* Section 1: Main Compound Strength PRs */}
      <section className="my-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-semibold">
                Personal Records & Max Lifts
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white font-serif">
              The Big Compounds
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(stats?.compound_prs || []).map((pr, idx) => (
            <PRCard key={pr.name} pr={pr} index={idx} />
          ))}
        </div>
      </section>

      {/* Section 2: Recent Live Workout Log */}
      <section className="my-16">
        <RecentWorkoutCard lastWorkout={stats?.last_workout || null} />
      </section>

      {/* Section 3: Secondary Arsenal & Hypertrophy Lifts */}
      <section className="my-16">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-red-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-semibold">
              Secondary Arsenal
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white font-serif">
            Accessory & Machine PRs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(stats?.secondary_lifts || []).map((pr, idx) => (
            <PRCard key={pr.name} pr={pr} index={idx} />
          ))}
        </div>
      </section>

      {/* Section 4: Training Radar & Consistency Chart */}
      <section className="my-16">
        <WeeklyActivityChart weeklyDurations={stats?.weekly_durations || []} />
      </section>

      {/* Section 5: The Split / Blueprint Breakdown */}
      <section className="my-16">
        <RoutineBreakdown routines={stats?.routines || []} />
      </section>

      {/* Bottom Hevy Profile Card CTA */}
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="my-16 rounded-3xl bg-gradient-to-r from-red-950 via-neutral-900 to-black p-8 md:p-12 border border-red-500/40 shadow-[0_0_50px_rgba(239,68,68,0.3)] text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-600/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold font-serif text-white mb-4">
            Follow the Journey on Hevy
          </h3>
          <p className="text-neutral-300 font-sans text-base mb-8 leading-relaxed">
            Every set, warm-up, RPE, and workout split is recorded live. Connect with me on Hevy to follow my strength progression and routine updates.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://hevy.com/user/vishugod"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold font-mono tracking-wider uppercase shadow-[0_0_30px_#ef4444] hover:shadow-[0_0_45px_#ef4444] transition-all duration-300"
            >
              <Dumbbell className="w-5 h-5" />
              <span>hevy.com/user/vishugod</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={toggleMode}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 font-mono tracking-wider uppercase transition-colors cursor-pointer hover:border-cyan-400 hover:text-cyan-300"
            >
              <RotateCcw className="w-4 h-4 text-cyan-400" />
              <span>Back to Portfolio</span>
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
