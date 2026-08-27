"use client";

import { CompoundPR } from "@/app/api/workout-stats/route";
import { motion } from "framer-motion";
import { Award, Dumbbell, Flame, Shield, Sparkles, Target, TrendingUp, Zap } from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  Flame,
  Zap,
  Award,
  Target,
  Dumbbell,
  Shield,
  TrendingUp,
  Sparkles
};

interface PRCardProps {
  pr: CompoundPR;
  index: number;
}

export default function PRCard({ pr, index }: PRCardProps) {
  const IconComponent = ICON_MAP[pr.iconName] || Dumbbell;

  // Relative strength rating bar percentage (e.g. 150kg = 100%)
  const percentage = Math.min(100, Math.round((pr.estimated_1rm_kg / 160) * 100));

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="relative group rounded-2xl bg-gradient-to-b from-neutral-900/90 via-red-950/20 to-black/90 p-6 border border-red-500/30 hover:border-red-500 shadow-[0_4px_25px_rgba(0,0,0,0.7)] hover:shadow-[0_0_30px_rgba(239,68,68,0.35)] transition-all duration-300 backdrop-blur-xl overflow-hidden"
    >
      {/* Background ambient crimson flare on hover */}
      <div className="absolute -top-16 -right-16 w-36 h-36 bg-red-600/15 rounded-full blur-2xl group-hover:bg-red-600/30 transition-all duration-500 pointer-events-none" />

      {/* Header with category and tier */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-red-950/80 border border-red-500/40 text-red-400 group-hover:text-red-300 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_12px_rgba(239,68,68,0.2)]">
            <IconComponent className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-red-400 font-semibold">
              {pr.category}
            </span>
            <h3 className="text-lg font-bold text-white group-hover:text-red-100 transition-colors">
              {pr.name}
            </h3>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-red-500/20 text-red-300 border border-red-500/40 shadow-[0_0_8px_rgba(239,68,68,0.2)]">
          {pr.tier}
        </span>
      </div>

      {/* Big Bold Lift Metrics */}
      <div className="my-5 flex items-baseline justify-between border-y border-red-900/30 py-4">
        <div>
          <div className="text-xs text-neutral-400 font-mono uppercase tracking-wider mb-0.5">
            Heavy Working Set
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl font-extrabold text-white tracking-tight font-serif drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
              {pr.weight_kg}
            </span>
            <span className="text-sm font-bold text-red-400 font-mono">KG</span>
            <span className="text-sm text-neutral-400 font-mono ml-1">× {pr.reps} reps</span>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs text-neutral-400 font-mono uppercase tracking-wider mb-0.5">
            Est. 1RM
          </div>
          <div className="flex items-baseline justify-end gap-1">
            <span className="text-2xl font-bold text-red-400 font-mono">
              ~{pr.estimated_1rm_kg}
            </span>
            <span className="text-xs text-red-500 font-mono">KG</span>
          </div>
        </div>
      </div>

      {/* Strength Milestone Progress Bar */}
      <div className="space-y-1.5 mb-3">
        <div className="flex justify-between text-[11px] font-mono text-neutral-400">
          <span>Strength Milestone</span>
          <span className="text-red-400 font-bold">{percentage}%</span>
        </div>
        <div className="h-2 w-full bg-neutral-950 rounded-full overflow-hidden border border-red-950">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${percentage}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: index * 0.1 + 0.2, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-red-700 via-red-500 to-rose-400 rounded-full shadow-[0_0_8px_#ef4444]"
          />
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-neutral-400 leading-relaxed font-sans">
        {pr.description}
      </p>
    </motion.div>
  );
}
