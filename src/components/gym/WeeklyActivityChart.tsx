"use client";

import { WeeklyDuration } from "@/app/api/workout-stats/route";
import { motion } from "framer-motion";
import { Activity, Clock, Flame } from "lucide-react";
import { useState } from "react";

interface WeeklyActivityChartProps {
  weeklyDurations: WeeklyDuration[];
}

export default function WeeklyActivityChart({ weeklyDurations }: WeeklyActivityChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const maxMinutes = Math.max(...weeklyDurations.map((w) => w.total_minutes), 180);
  const totalMinutesAllWeeks = weeklyDurations.reduce((acc, w) => acc + w.total_minutes, 0);
  const activeWeeksCount = weeklyDurations.filter((w) => w.total_minutes > 0).length;
  const avgMinutesPerActiveWeek = activeWeeksCount > 0 ? Math.round(totalMinutesAllWeeks / activeWeeksCount) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl bg-gradient-to-b from-neutral-900/90 via-red-950/20 to-black/95 p-5 sm:p-6 md:p-8 border border-red-500/30 shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-xl"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Activity className="w-4 h-4 text-red-500" />
            <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-semibold">
              Training Consistency Radar
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
            Weekly Workout Volume (Last 12 Weeks)
          </h3>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="text-left sm:text-right">
            <div className="text-[11px] sm:text-xs text-neutral-400 font-mono">Total Active Time</div>
            <div className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-1 sm:justify-end">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400" />
              <span>{Math.round(totalMinutesAllWeeks / 60)}h {totalMinutesAllWeeks % 60}m</span>
            </div>
          </div>
          <div className="h-7 w-px bg-red-900/40" />
          <div className="text-left sm:text-right">
            <div className="text-[11px] sm:text-xs text-neutral-400 font-mono">Avg / Active Wk</div>
            <div className="text-base sm:text-lg font-bold text-red-400 font-mono flex items-center gap-1 sm:justify-end">
              <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              <span>{Math.round(avgMinutesPerActiveWeek / 60)}h {avgMinutesPerActiveWeek % 60}m</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Bars with overflow-x-auto for narrow screens */}
      <div className="relative pt-6 pb-2 overflow-x-auto">
        <div className="grid grid-cols-12 gap-1.5 sm:gap-2 md:gap-3 items-end h-44 sm:h-48 border-b border-red-900/30 pb-2 min-w-[280px]">
          {weeklyDurations.map((week, idx) => {
            const heightPercent = Math.max(8, Math.round((week.total_minutes / maxMinutes) * 100));
            const startDate = new Date(week.week_start_date).toLocaleDateString("en-US", {
              month: "numeric",
              day: "numeric"
            });
            const isHovered = hoveredIdx === idx;
            const hours = (week.total_minutes / 60).toFixed(1);

            return (
              <div
                key={idx}
                className="flex flex-col items-center justify-end h-full relative group cursor-pointer"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Floating Tooltip */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: -5 }}
                    className="absolute -top-12 z-20 whitespace-nowrap bg-neutral-900 border border-red-500/80 px-2 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono text-white shadow-[0_0_15px_rgba(239,68,68,0.4)] pointer-events-none"
                  >
                    <div className="font-bold text-red-400">{hours} Hours</div>
                    <div className="text-[9px] text-neutral-400">Wk of {startDate}</div>
                  </motion.div>
                )}

                {/* Bar */}
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: `${heightPercent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.04, ease: "easeOut" }}
                  className={`w-full rounded-t-md sm:rounded-t-lg transition-all duration-300 ${
                    week.total_minutes === 0
                      ? "bg-neutral-800/40 border-t border-neutral-700/50"
                      : isHovered
                      ? "bg-gradient-to-t from-red-600 via-rose-500 to-white shadow-[0_0_20px_#ef4444]"
                      : "bg-gradient-to-t from-red-950 via-red-600 to-red-400 hover:from-red-800 hover:to-rose-300 shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                  }`}
                />

                {/* Week Label */}
                <span className="text-[8px] sm:text-[9px] md:text-[10px] font-mono text-neutral-500 mt-2 group-hover:text-red-400 transition-colors">
                  {startDate}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
