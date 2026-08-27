import { NextResponse } from "next/server";

export interface ExerciseSet {
  weight_kg: number;
  reps: number;
  type?: string;
  prs?: string[];
}

export interface Exercise {
  title: string;
  muscle_group: string;
  sets: ExerciseSet[];
}

export interface Routine {
  id: string;
  title: string;
  short_id: string;
  exercises?: Exercise[];
}

export interface LastWorkout {
  name: string;
  nth_workout: number;
  created_at: string;
  estimated_volume_kg: number;
  exercises: Exercise[];
}

export interface CompoundPR {
  name: string;
  category: "Chest" | "Legs" | "Back" | "Shoulders" | "Arms";
  weight_kg: number;
  reps: number;
  estimated_1rm_kg: number;
  tier: "Elite" | "Advanced" | "Proficient" | "Intermediate";
  iconName: string;
  description: string;
}

export interface WeeklyDuration {
  week_start_date: string;
  week_end_date: string;
  total_seconds: number;
  total_minutes: number;
}

export interface WorkoutStatsResponse {
  username: string;
  full_name: string;
  description: string;
  workout_count: number;
  follower_count: number;
  following_count: number;
  last_workout: LastWorkout | null;
  weekly_durations: WeeklyDuration[];
  routines: Routine[];
  compound_prs: CompoundPR[];
  secondary_lifts: CompoundPR[];
  total_estimated_sbd_kg: number;
  cached_at: string;
  source: "live" | "cache" | "fallback";
}

// Fallback snapshot data in case upstream API/network is unavailable
const FALLBACK_STATS: WorkoutStatsResponse = {
  username: "vishugod",
  full_name: "VISHWAJEET",
  description: "Hehe",
  workout_count: 78,
  follower_count: 3,
  following_count: 2,
  cached_at: new Date().toISOString(),
  source: "fallback",
  total_estimated_sbd_kg: 397,
  compound_prs: [
    {
      name: "Bench Press (Barbell)",
      category: "Chest",
      weight_kg: 90,
      reps: 7,
      estimated_1rm_kg: 111,
      tier: "Advanced",
      iconName: "Flame",
      description: "Heavy working sets at 90kg with clean form and controlled eccentric."
    },
    {
      name: "Squat (Barbell)",
      category: "Legs",
      weight_kg: 115,
      reps: 6,
      estimated_1rm_kg: 138,
      tier: "Advanced",
      iconName: "Zap",
      description: "Deep ATG barbell squats pushing maximum leg drive."
    },
    {
      name: "Deadlift (Barbell)",
      category: "Back",
      weight_kg: 140,
      reps: 2,
      estimated_1rm_kg: 148,
      tier: "Advanced",
      iconName: "Award",
      description: "Conventional pull locking out 140kg with explosive power."
    },
    {
      name: "Seated Overhead Press",
      category: "Shoulders",
      weight_kg: 60,
      reps: 6,
      estimated_1rm_kg: 72,
      tier: "Advanced",
      iconName: "Target",
      description: "Strict barbell overhead press for heavy anterior deltoid development."
    }
  ],
  secondary_lifts: [
    {
      name: "Leg Press (Machine)",
      category: "Legs",
      weight_kg: 180,
      reps: 12,
      estimated_1rm_kg: 240,
      tier: "Elite",
      iconName: "Dumbbell",
      description: "High volume leg destruction sets."
    },
    {
      name: "Bent Over Row (Barbell)",
      category: "Back",
      weight_kg: 75,
      reps: 8,
      estimated_1rm_kg: 93,
      tier: "Advanced",
      iconName: "Shield",
      description: "Strict barbell rows targeting lat thickness."
    },
    {
      name: "Weighted Pull Up",
      category: "Back",
      weight_kg: 15,
      reps: 6,
      estimated_1rm_kg: 35,
      tier: "Advanced",
      iconName: "Activity",
      description: "Bodyweight + 15kg plate clean full range pull-ups."
    },
    {
      name: "Incline Dumbbell Press",
      category: "Chest",
      weight_kg: 30,
      reps: 6,
      estimated_1rm_kg: 36,
      tier: "Advanced",
      iconName: "TrendingUp",
      description: "Upper chest hyper-isolation with heavy dumbbells."
    },
    {
      name: "Triceps Pushdown",
      category: "Arms",
      weight_kg: 62.5,
      reps: 10,
      estimated_1rm_kg: 83,
      tier: "Elite",
      iconName: "Sparkles",
      description: "Full stack cable pushdowns with peak contraction."
    },
    {
      name: "Hammer Curl (Dumbbell)",
      category: "Arms",
      weight_kg: 17.5,
      reps: 22,
      estimated_1rm_kg: 28,
      tier: "Elite",
      iconName: "Flame",
      description: "Brachialis endurance burnout sets."
    }
  ],
  last_workout: {
    name: "PUSH",
    nth_workout: 78,
    created_at: "2026-08-27T01:49:31.063Z",
    estimated_volume_kg: 7920,
    exercises: [
      {
        title: "Bench Press (Barbell)",
        muscle_group: "chest",
        sets: [
          { weight_kg: 50, reps: 10 },
          { weight_kg: 70, reps: 5 },
          { weight_kg: 90, reps: 7 },
          { weight_kg: 85, reps: 8 },
          { weight_kg: 85, reps: 5 },
          { weight_kg: 80, reps: 4 }
        ]
      },
      {
        title: "Incline Bench Press (Dumbbell)",
        muscle_group: "chest",
        sets: [
          { weight_kg: 30, reps: 6 },
          { weight_kg: 30, reps: 6 },
          { weight_kg: 25, reps: 10 }
        ]
      },
      {
        title: "Triceps Pushdown",
        muscle_group: "triceps",
        sets: [
          { weight_kg: 62.5, reps: 10 },
          { weight_kg: 62.5, reps: 10 },
          { weight_kg: 62.5, reps: 6 }
        ]
      },
      {
        title: "Overhead Triceps Extension (Cable)",
        muscle_group: "triceps",
        sets: [
          { weight_kg: 40, reps: 8 },
          { weight_kg: 40, reps: 6 },
          { weight_kg: 40, reps: 6 }
        ]
      },
      {
        title: "Cable Fly Crossovers",
        muscle_group: "chest",
        sets: [
          { weight_kg: 25, reps: 12 },
          { weight_kg: 15, reps: 16 }
        ]
      },
      {
        title: "Bench Press - Close Grip (Barbell)",
        muscle_group: "triceps",
        sets: [
          { weight_kg: 55, reps: 8 },
          { weight_kg: 50, reps: 10 },
          { weight_kg: 50, reps: 10 }
        ]
      }
    ]
  },
  weekly_durations: [
    { week_start_date: "2026-06-07T00:00:00+00:00", week_end_date: "2026-06-14T00:00:00+00:00", total_seconds: 17905, total_minutes: 298 },
    { week_start_date: "2026-06-14T00:00:00+00:00", week_end_date: "2026-06-21T00:00:00+00:00", total_seconds: 17886, total_minutes: 298 },
    { week_start_date: "2026-06-21T00:00:00+00:00", week_end_date: "2026-06-28T00:00:00+00:00", total_seconds: 12963, total_minutes: 216 },
    { week_start_date: "2026-06-28T00:00:00+00:00", week_end_date: "2026-07-05T00:00:00+00:00", total_seconds: 11885, total_minutes: 198 },
    { week_start_date: "2026-07-05T00:00:00+00:00", week_end_date: "2026-07-12T00:00:00+00:00", total_seconds: 2300, total_minutes: 38 },
    { week_start_date: "2026-07-12T00:00:00+00:00", week_end_date: "2026-07-19T00:00:00+00:00", total_seconds: 0, total_minutes: 0 },
    { week_start_date: "2026-07-19T00:00:00+00:00", week_end_date: "2026-07-26T00:00:00+00:00", total_seconds: 35508, total_minutes: 591 },
    { week_start_date: "2026-07-26T00:00:00+00:00", week_end_date: "2026-08-02T00:00:00+00:00", total_seconds: 11654, total_minutes: 194 },
    { week_start_date: "2026-08-02T00:00:00+00:00", week_end_date: "2026-08-09T00:00:00+00:00", total_seconds: 7046, total_minutes: 117 },
    { week_start_date: "2026-08-09T00:00:00+00:00", week_end_date: "2026-08-16T00:00:00+00:00", total_seconds: 10680, total_minutes: 178 },
    { week_start_date: "2026-08-16T00:00:00+00:00", week_end_date: "2026-08-23T00:00:00+00:00", total_seconds: 0, total_minutes: 0 },
    { week_start_date: "2026-08-23T00:00:00+00:00", week_end_date: "2026-08-30T00:00:00+00:00", total_seconds: 4483, total_minutes: 74 }
  ],
  routines: [
    {
      id: "1796764c-aaca-415b-93ee-072e669af702",
      title: "PUSH",
      short_id: "7nGriiM6LfI"
    },
    {
      id: "6f291cb6-03d7-4cf0-9c73-bcd215998864",
      title: "PULL",
      short_id: "lOx2O8WuI8P"
    },
    {
      id: "eff662c6-20fb-4d7c-9d44-8905bc860576",
      title: "LEGS",
      short_id: "m95KjB9myuY"
    },
    {
      id: "f4db9cb9-ba85-4e36-af0f-3442fb65e84f",
      title: "Back 2",
      short_id: "jSSVfJu7SoT"
    }
  ]
};

// In-memory cache for fast serverless responses
let cachedData: WorkoutStatsResponse | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 1000 * 60 * 60 * 12; // 12 Hours TTL

function calculate1RM(weight: number, reps: number): number {
  if (reps <= 1) return weight;
  // Brzycki formula: weight * (36 / (37 - reps))
  return Math.round(weight * (36 / (37 - Math.min(reps, 15))));
}

async function fetchHevyEndpoint(endpoint: string) {
  const url = `https://api.hevyapp.com/${endpoint}`;
  const response = await fetch(url, {
    headers: {
      "x-api-key": "shelobs_hevy_web",
      "Hevy-Platform": "web",
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    },
    next: { revalidate: 43200 } // 12 hours Next.js data cache
  });

  if (!response.ok) {
    throw new Error(`Hevy API returned status ${response.status} for ${endpoint}`);
  }

  return response.json();
}

export async function GET() {
  const now = Date.now();

  // Return memory cache if still valid
  if (cachedData && now - cacheTimestamp < CACHE_TTL_MS) {
    return NextResponse.json({
      ...cachedData,
      source: "cache"
    }, {
      headers: {
        "Cache-Control": "public, s-maxage=43200, stale-while-revalidate=86400"
      }
    });
  }

  try {
    // 1. Fetch public profile
    const profile = await fetchHevyEndpoint("public_user_profile/vishugod");

    // 2. Fetch routines in parallel if available
    const routinesData: Routine[] = [];
    if (Array.isArray(profile.routines)) {
      await Promise.all(
        profile.routines.map(async (r: { id: string; title: string; short_id: string }) => {
          try {
            if (r.short_id) {
              const detail = await fetchHevyEndpoint(`routine_with_short_id/${r.short_id}`);
              const routineObj = detail.routine || detail;
              routinesData.push({
                id: r.id,
                title: r.title,
                short_id: r.short_id,
                exercises: routineObj.exercises?.map((e: any) => ({
                  title: e.title,
                  muscle_group: e.muscle_group,
                  sets: e.sets?.map((s: any) => ({
                    weight_kg: s.weight_kg || 0,
                    reps: s.reps || 0,
                    type: s.set_type || s.indicator || "normal"
                  })) || []
                }))
              });
            } else {
              routinesData.push({ id: r.id, title: r.title, short_id: "" });
            }
          } catch (e) {
            routinesData.push({ id: r.id, title: r.title, short_id: r.short_id });
          }
        })
      );
    }

    // 3. Extract Weekly Durations
    const weeklyDurations: WeeklyDuration[] = (profile.weekly_workout_durations || []).map((w: any) => ({
      week_start_date: w.week_start_date,
      week_end_date: w.week_end_date,
      total_seconds: w.total_seconds || 0,
      total_minutes: Math.round((w.total_seconds || 0) / 60)
    }));

    // 4. Extract Last Workout
    let lastWorkout: LastWorkout | null = null;
    if (profile.last_workout) {
      const lw = profile.last_workout;
      lastWorkout = {
        name: lw.name,
        nth_workout: lw.nth_workout,
        created_at: lw.created_at,
        estimated_volume_kg: lw.estimated_volume_kg || 0,
        exercises: (lw.exercises || []).map((e: any) => ({
          title: e.title,
          muscle_group: e.muscle_group,
          sets: (e.sets || []).map((s: any) => ({
            weight_kg: s.weight_kg || 0,
            reps: s.reps || 0,
            type: s.indicator || "normal",
            prs: s.prs || []
          }))
        }))
      };
    }

    // 5. Compute max lifts across last workout + all routines
    let maxBench = { weight: 90, reps: 7 };
    let maxSquat = { weight: 115, reps: 6 };
    let maxDeadlift = { weight: 140, reps: 2 };
    let maxOHP = { weight: 60, reps: 6 };
    let maxLegPress = { weight: 180, reps: 12 };
    let maxRow = { weight: 75, reps: 8 };
    let maxPullUp = { weight: 15, reps: 6 };
    let maxIncPress = { weight: 30, reps: 6 };
    let maxPushdown = { weight: 62.5, reps: 10 };
    let maxCurl = { weight: 17.5, reps: 22 };

    const scanExercises = (exList: Exercise[]) => {
      for (const ex of exList) {
        const title = (ex.title || "").toLowerCase();
        for (const set of ex.sets || []) {
          const w = set.weight_kg || 0;
          const r = set.reps || 0;
          if (w === 0 && r === 0) continue;

          if (title.includes("bench press") && !title.includes("close") && !title.includes("incline") && !title.includes("dumbbell")) {
            if (calculate1RM(w, r) > calculate1RM(maxBench.weight, maxBench.reps)) maxBench = { weight: w, reps: r };
          } else if (title.includes("squat") && !title.includes("hack")) {
            if (calculate1RM(w, r) > calculate1RM(maxSquat.weight, maxSquat.reps)) maxSquat = { weight: w, reps: r };
          } else if (title.includes("deadlift")) {
            if (calculate1RM(w, r) > calculate1RM(maxDeadlift.weight, maxDeadlift.reps)) maxDeadlift = { weight: w, reps: r };
          } else if (title.includes("overhead press")) {
            if (calculate1RM(w, r) > calculate1RM(maxOHP.weight, maxOHP.reps)) maxOHP = { weight: w, reps: r };
          } else if (title.includes("leg press")) {
            if (w >= maxLegPress.weight) maxLegPress = { weight: w, reps: r };
          } else if (title.includes("bent over row") || title.includes("barbell row")) {
            if (calculate1RM(w, r) > calculate1RM(maxRow.weight, maxRow.reps)) maxRow = { weight: w, reps: r };
          } else if (title.includes("pull up") && w > 0) {
            if (w >= maxPullUp.weight) maxPullUp = { weight: w, reps: r };
          } else if (title.includes("incline") && title.includes("dumbbell")) {
            if (w >= maxIncPress.weight) maxIncPress = { weight: w, reps: r };
          } else if (title.includes("pushdown")) {
            if (w >= maxPushdown.weight) maxPushdown = { weight: w, reps: r };
          } else if (title.includes("hammer curl") || title.includes("bicep curl")) {
            if (w >= maxCurl.weight) maxCurl = { weight: w, reps: r };
          }
        }
      }
    };

    if (lastWorkout) scanExercises(lastWorkout.exercises);
    for (const r of routinesData) {
      if (r.exercises) scanExercises(r.exercises);
    }

    const compound_prs: CompoundPR[] = [
      {
        name: "Bench Press (Barbell)",
        category: "Chest",
        weight_kg: maxBench.weight,
        reps: maxBench.reps,
        estimated_1rm_kg: calculate1RM(maxBench.weight, maxBench.reps),
        tier: "Advanced",
        iconName: "Flame",
        description: "Barbell bench press working set with strict form."
      },
      {
        name: "Squat (Barbell)",
        category: "Legs",
        weight_kg: maxSquat.weight,
        reps: maxSquat.reps,
        estimated_1rm_kg: calculate1RM(maxSquat.weight, maxSquat.reps),
        tier: "Advanced",
        iconName: "Zap",
        description: "Full-depth barbell back squat with explosive quad drive."
      },
      {
        name: "Deadlift (Barbell)",
        category: "Back",
        weight_kg: maxDeadlift.weight,
        reps: maxDeadlift.reps,
        estimated_1rm_kg: calculate1RM(maxDeadlift.weight, maxDeadlift.reps),
        tier: "Advanced",
        iconName: "Award",
        description: "Heavy conventional deadlift locking out max load."
      },
      {
        name: "Seated Overhead Press",
        category: "Shoulders",
        weight_kg: maxOHP.weight,
        reps: maxOHP.reps,
        estimated_1rm_kg: calculate1RM(maxOHP.weight, maxOHP.reps),
        tier: "Advanced",
        iconName: "Target",
        description: "Heavy barbell shoulder press for compound vertical push."
      }
    ];

    const secondary_lifts: CompoundPR[] = [
      {
        name: "Leg Press (Machine)",
        category: "Legs",
        weight_kg: maxLegPress.weight,
        reps: maxLegPress.reps,
        estimated_1rm_kg: calculate1RM(maxLegPress.weight, maxLegPress.reps),
        tier: "Elite",
        iconName: "Dumbbell",
        description: "Heavy volume machine leg press sets."
      },
      {
        name: "Bent Over Row (Barbell)",
        category: "Back",
        weight_kg: maxRow.weight,
        reps: maxRow.reps,
        estimated_1rm_kg: calculate1RM(maxRow.weight, maxRow.reps),
        tier: "Advanced",
        iconName: "Shield",
        description: "Strict barbell row pulling to the sternum."
      },
      {
        name: "Weighted Pull Up",
        category: "Back",
        weight_kg: maxPullUp.weight,
        reps: maxPullUp.reps,
        estimated_1rm_kg: calculate1RM(maxPullUp.weight + 70, maxPullUp.reps) - 70,
        tier: "Advanced",
        iconName: "Activity",
        description: "Strict weighted pull-ups with +15kg plate load."
      },
      {
        name: "Incline Dumbbell Press",
        category: "Chest",
        weight_kg: maxIncPress.weight,
        reps: maxIncPress.reps,
        estimated_1rm_kg: calculate1RM(maxIncPress.weight, maxIncPress.reps),
        tier: "Advanced",
        iconName: "TrendingUp",
        description: "Heavy upper-chest dumbbell pressing."
      },
      {
        name: "Triceps Pushdown",
        category: "Arms",
        weight_kg: maxPushdown.weight,
        reps: maxPushdown.reps,
        estimated_1rm_kg: calculate1RM(maxPushdown.weight, maxPushdown.reps),
        tier: "Elite",
        iconName: "Sparkles",
        description: "Heavy cable stack lockout reps."
      },
      {
        name: "Hammer Curl (Dumbbell)",
        category: "Arms",
        weight_kg: maxCurl.weight,
        reps: maxCurl.reps,
        estimated_1rm_kg: calculate1RM(maxCurl.weight, maxCurl.reps),
        tier: "Elite",
        iconName: "Flame",
        description: "High-rep dumbbell arm blast."
      }
    ];

    const total_estimated_sbd_kg =
      calculate1RM(maxSquat.weight, maxSquat.reps) +
      calculate1RM(maxBench.weight, maxBench.reps) +
      calculate1RM(maxDeadlift.weight, maxDeadlift.reps);

    const freshStats: WorkoutStatsResponse = {
      username: profile.username || "vishugod",
      full_name: profile.full_name || "VISHWAJEET",
      description: profile.description || "Hehe",
      workout_count: profile.workout_count || 78,
      follower_count: profile.follower_count || 3,
      following_count: profile.following_count || 2,
      last_workout: lastWorkout,
      weekly_durations: weeklyDurations,
      routines: routinesData.length > 0 ? routinesData : FALLBACK_STATS.routines,
      compound_prs,
      secondary_lifts,
      total_estimated_sbd_kg,
      cached_at: new Date().toISOString(),
      source: "live"
    };

    // Cache the fresh data in memory
    cachedData = freshStats;
    cacheTimestamp = now;

    return NextResponse.json(freshStats, {
      headers: {
        "Cache-Control": "public, s-maxage=43200, stale-while-revalidate=86400"
      }
    });
  } catch (error) {
    console.error("Error fetching live Hevy profile:", error);
    // Return fallback stats gracefully
    return NextResponse.json(
      {
        ...FALLBACK_STATS,
        source: "fallback",
        cached_at: new Date().toISOString()
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600"
        }
      }
    );
  }
}
