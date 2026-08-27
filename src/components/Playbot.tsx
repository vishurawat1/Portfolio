"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useThemeMode } from "@/context/ThemeModeContext";

export default function Playbot() {
  const { mode } = useThemeMode();
  const isUpsideDown = mode === "upside-down";

  // Coordinates on screen (fixed viewport coordinates)
  const [pos, setPos] = useState({ x: 35, y: 140 });
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [isBonking, setIsBonking] = useState(false);
  const [currentSide, setCurrentSide] = useState<"left" | "right">("left");
  const [dialogue, setDialogue] = useState<string | null>(null);
  const [eyeState, setEyeState] = useState<"happy" | "blink" | "surprised" | "scared" | "wink">("happy");
  const [direction, setDirection] = useState<1 | -1>(1); // 1 = right, -1 = left

  const controls = useAnimation();
  const dialogueTimerRef = useRef<NodeJS.Timeout | null>(null);
  const roamTimerRef = useRef<NodeJS.Timeout | null>(null);

  const showDialogue = (text: string, duration = 4500) => {
    if (dialogueTimerRef.current) clearTimeout(dialogueTimerRef.current);
    setDialogue(text);
    dialogueTimerRef.current = setTimeout(() => {
      setDialogue(null);
    }, duration);
  };

  // Calculate safe side-margin roaming zones
  const getSideGutterCoordinates = (side: "left" | "right") => {
    const screenW = typeof window !== "undefined" ? window.innerWidth : 1200;
    const screenH = typeof window !== "undefined" ? window.innerHeight : 800;

    const contentMargin = Math.max(30, (screenW - 1200) / 2);

    let targetX = 35;
    if (side === "left") {
      const maxX = Math.max(35, Math.min(100, contentMargin - 30));
      targetX = Math.floor(Math.random() * (maxX - 25) + 25);
    } else {
      const minX = Math.min(screenW - 110, screenW - contentMargin + 20);
      const maxX = screenW - 70;
      targetX = Math.floor(Math.random() * (maxX - minX) + minX);
    }

    const minY = 90;
    const maxY = Math.max(minY + 100, screenH - 140);
    const targetY = Math.floor(Math.random() * (maxY - minY) + minY);

    return { targetX, targetY };
  };

  // Check if a point overlaps with central content boxes
  const isOverlappingContent = (x: number, y: number): boolean => {
    if (typeof window === "undefined") return false;
    const screenW = window.innerWidth;

    const safeLeftBoundary = Math.max(75, (screenW - 1100) / 2);
    const safeRightBoundary = screenW - Math.max(85, (screenW - 1100) / 2);

    return x > safeLeftBoundary && x < safeRightBoundary;
  };

  // Dialogue pools
  const NORMAL_QUOTES = [
    "Beep boop! Patrolling the side margin! 🤖",
    "Keeping your screen clear & readable! ✨",
    "Checking out Vishwajeet's portfolio? 🚀",
    "Hover over me to say hello! 👋",
    "I'll stay right here on the side! 🌟",
    "Drag me if you want to play! 🎮"
  ];

  const COLLISION_REBOUND_QUOTES = [
    "Oof! Hit the content boundary! 🛑",
    "Bonk! Heading back to the safe side! 💨",
    "Oops! Staying clear of the text! 🏃‍♂️",
    "Whoa! Returning to the edge gutter! 🌟"
  ];

  const SCARED_QUOTES = [
    "AHHH! GRAVITY IS INVERTED! 😱",
    "STAYING ON THE SAFE OUTSKIRTS! 🦇",
    "WATCHING THE SQUAT RACK FROM AFAR! 🏋️",
    "90KG BENCH PRESS?! KEEP ME SAFE! 💥",
    "HOLD ME! I'M SCARED! 🥺"
  ];

  // Rebound to the nearest safe side margin
  const reboundToSafeSide = async (currentX: number, currentY: number) => {
    const screenW = window.innerWidth;
    const targetSide: "left" | "right" = currentX < screenW / 2 ? "left" : "right";
    setCurrentSide(targetSide);

    const { targetX, targetY } = getSideGutterCoordinates(targetSide);

    setIsBonking(true);
    setEyeState("surprised");
    showDialogue(COLLISION_REBOUND_QUOTES[Math.floor(Math.random() * COLLISION_REBOUND_QUOTES.length)], 3500);

    // Bonk recoil animation
    await controls.start({
      x: currentX + (targetSide === "left" ? -15 : 15),
      transition: { duration: 0.2, ease: "easeOut" }
    });

    setDirection(targetSide === "left" ? -1 : 1);
    setIsWalking(true);

    await controls.start({
      x: targetX,
      y: targetY,
      transition: { duration: 2.2, ease: "easeInOut" }
    });

    setPos({ x: targetX, y: targetY });
    setIsWalking(false);
    setIsBonking(false);
    setEyeState(isUpsideDown ? "scared" : "happy");
  };

  // Autonomous Roaming Logic (Strictly Along Side Gutters)
  useEffect(() => {
    if (isDragging) return;

    const executeRoamCycle = async () => {
      if (isDragging || isHovered || isBonking) return;

      const screenW = window.innerWidth;
      const screenH = window.innerHeight;

      const shouldSwitchSide = Math.random() > 0.8;
      const nextSide: "left" | "right" = shouldSwitchSide
        ? currentSide === "left" ? "right" : "left"
        : currentSide;

      setCurrentSide(nextSide);

      if (shouldSwitchSide) {
        const topPerimeterY = Math.max(35, Math.min(65, screenH * 0.08));
        const midAirX = screenW / 2;

        setDirection(nextSide === "right" ? 1 : -1);
        setIsWalking(true);

        await controls.start({
          x: midAirX,
          y: topPerimeterY,
          transition: { duration: 3.0, ease: "easeInOut" }
        });

        const { targetX, targetY } = getSideGutterCoordinates(nextSide);
        await controls.start({
          x: targetX,
          y: targetY,
          transition: { duration: 3.0, ease: "easeInOut" }
        });

        setPos({ x: targetX, y: targetY });
        setIsWalking(false);
      } else {
        const { targetX, targetY } = getSideGutterCoordinates(nextSide);

        setDirection(targetX > pos.x ? 1 : -1);
        setIsWalking(true);
        setEyeState("blink");
        setTimeout(() => setEyeState(isUpsideDown ? "scared" : "happy"), 300);

        const travelTime = Math.random() * 1.5 + 4.5;

        await controls.start({
          x: targetX,
          y: targetY,
          transition: { duration: travelTime, ease: "easeInOut" }
        });

        setPos({ x: targetX, y: targetY });
        setIsWalking(false);
      }

      if (Math.random() > 0.5) {
        const quotes = isUpsideDown ? SCARED_QUOTES : NORMAL_QUOTES;
        showDialogue(quotes[Math.floor(Math.random() * quotes.length)], 4500);
      }

      await new Promise((res) => setTimeout(res, 4500));
      roamTimerRef.current = setTimeout(executeRoamCycle, Math.random() * 2000 + 4000);
    };

    roamTimerRef.current = setTimeout(executeRoamCycle, 2000);

    return () => {
      if (roamTimerRef.current) clearTimeout(roamTimerRef.current);
    };
  }, [isDragging, isHovered, isBonking, isUpsideDown, currentSide, pos.x, controls]);

  // Upside Down Mode Reaction
  useEffect(() => {
    if (isUpsideDown) {
      setEyeState("scared");
      showDialogue("AHHH! THE GRAVITY FLIPPED! 😱", 4500);
    } else {
      setEyeState("happy");
      showDialogue("Whew! Back on solid ground! 😌", 3500);
    }
  }, [isUpsideDown]);

  // Handle Drag Start
  const handleDragStart = () => {
    setIsDragging(true);
    setIsWalking(false);
    setEyeState("surprised");
    showDialogue(isUpsideDown ? "DON'T DROP ME IN THE SQUAT RACK! 😭" : "WHEEEE! I CAN FLY! 🚀", 3000);
  };

  // Handle Drag End with Auto-Rebound from Content Zones
  const handleDragEnd = async (_: any, info: any) => {
    setIsDragging(false);
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    let droppedX = Math.max(10, Math.min(screenW - 80, pos.x + info.offset.x));
    let droppedY = Math.max(30, Math.min(screenH - 100, pos.y + info.offset.y));

    setPos({ x: droppedX, y: droppedY });

    if (isOverlappingContent(droppedX, droppedY)) {
      await reboundToSafeSide(droppedX, droppedY);
    } else {
      setCurrentSide(droppedX < screenW / 2 ? "left" : "right");
      setEyeState(isUpsideDown ? "scared" : "happy");
      showDialogue(isUpsideDown ? "Safe on the edge... for now! 😵" : "Safe landing on the side! 🌟", 2500);
      controls.start({
        x: droppedX,
        y: droppedY,
        transition: { duration: 0.4, type: "spring" }
      });
    }
  };

  // Handle Poke Click
  const handlePoke = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isUpsideDown) {
      setEyeState("scared");
      showDialogue("Eek! Don't poke a panicked bot! ⚡", 3000);
    } else {
      setEyeState("wink");
      setTimeout(() => setEyeState("happy"), 1200);
      showDialogue("Hehe! Watching the portfolio with you! ✨", 3000);
    }
  };

  return (
    <motion.div
      animate={controls}
      drag
      dragMomentum={true}
      dragElastic={0.15}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onHoverStart={() => {
        setIsHovered(true);
        if (!isDragging) {
          setEyeState(isUpsideDown ? "scared" : "happy");
          showDialogue(isUpsideDown ? "Watch out for the dumbbells! 🏋️" : "Hello there! 👋", 3000);
        }
      }}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handlePoke}
      initial={{ x: 35, y: 140 }}
      className="fixed z-[120] cursor-grab active:cursor-grabbing select-none scale-90 sm:scale-100"
      style={{ touchAction: "none" }}
    >
      {/* Container with Inverted Upside Down Physics (Steady and Vibration-Free) */}
      <motion.div
        animate={{
          rotate: isUpsideDown ? 180 : 0,
          y: isDragging ? -12 : [0, -6, 0],
          scale: isDragging ? 1.15 : isBonking ? 0.95 : 1
        }}
        transition={{
          rotate: { duration: 0.5, ease: "easeInOut" },
          y: { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
        }}
        className="relative flex flex-col items-center"
      >
        {/* Steady Readable Dialogue Speech Bubble */}
        <AnimatePresence>
          {dialogue && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: -30, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.8 }}
              className={`absolute -top-12 z-30 max-w-[200px] sm:max-w-xs text-center px-3.5 py-1.5 rounded-2xl shadow-xl text-[11px] sm:text-xs font-mono font-bold tracking-tight pointer-events-none ${
                isUpsideDown
                  ? "bg-red-950/95 text-red-200 border border-red-500 shadow-[0_0_15px_#ef4444]"
                  : "bg-neutral-900/95 text-cyan-200 border border-cyan-400/60 shadow-[0_0_15px_rgba(0,240,255,0.4)]"
              }`}
              style={{
                // Flip dialogue back upright when in upside-down mode so text is completely static and readable
                transform: isUpsideDown ? "rotate(180deg)" : "none"
              }}
            >
              {dialogue}
              {/* Bubble pointer beak */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 ${
                  isUpsideDown
                    ? "-top-1 bg-red-950 border-t border-l border-red-500"
                    : "-bottom-1 bg-neutral-900 border-b border-r border-cyan-400/60"
                }`}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Robot Character */}
        <div
          className="relative w-20 h-28 flex flex-col items-center transition-transform duration-300"
          style={{ transform: `scaleX(${direction})` }}
        >
          {/* Ambient Glow Aura */}
          <div
            className={`absolute inset-0 rounded-full blur-lg opacity-60 pointer-events-none ${
              isUpsideDown
                ? "bg-red-600/40 shadow-[0_0_25px_#ef4444]"
                : "bg-cyan-500/25 shadow-[0_0_20px_#00f0ff]"
            }`}
          />

          {/* 1. HEAD & ANTENNA */}
          <div className="relative flex flex-col items-center z-20">
            {/* Antenna */}
            {isUpsideDown ? (
              // Steady Devil Horns
              <div className="flex gap-2.5 mb-0.5">
                <div className="w-2 h-3.5 bg-gradient-to-t from-red-600 to-amber-400 rounded-t-full shadow-[0_0_10px_#ef4444] -rotate-12" />
                <div className="w-2 h-3.5 bg-gradient-to-t from-red-600 to-amber-400 rounded-t-full shadow-[0_0_10px_#ef4444] rotate-12" />
              </div>
            ) : (
              // Cute Glowing Ball Antenna
              <div className="flex flex-col items-center mb-0.5">
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f0ff]"
                />
                <div className="w-1 h-2 bg-neutral-600 rounded-b" />
              </div>
            )}

            {/* Head Display Box */}
            <motion.div
              className={`w-14 h-11 rounded-xl p-1 flex flex-col items-center justify-center border-2 transition-colors duration-500 shadow-xl ${
                isUpsideDown
                  ? "bg-gradient-to-b from-neutral-900 to-red-950 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]"
                  : "bg-gradient-to-b from-neutral-900 to-black border-cyan-400/80 shadow-[0_0_15px_rgba(0,240,255,0.3)]"
              }`}
            >
              {/* Screen Face */}
              <div className="w-full h-full rounded-lg bg-black/90 p-1 flex items-center justify-around border border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[size:100%_4px] pointer-events-none opacity-40" />

                {/* Facial Expressions */}
                {isUpsideDown || eyeState === "scared" ? (
                  // Scared Eyes (> <) Steady without jitter
                  <div className="flex items-center justify-around w-full px-0.5">
                    <span className="text-red-500 font-mono font-black text-xs drop-shadow-[0_0_6px_#ef4444]">
                      &gt;
                    </span>
                    <span className="text-[9px] text-cyan-300 font-bold">
                      💧
                    </span>
                    <span className="text-red-500 font-mono font-black text-xs drop-shadow-[0_0_6px_#ef4444]">
                      &lt;
                    </span>
                  </div>
                ) : eyeState === "blink" ? (
                  <div className="flex items-center justify-around w-full px-1">
                    <div className="w-2.5 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_5px_#00f0ff]" />
                    <div className="w-2.5 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_5px_#00f0ff]" />
                  </div>
                ) : eyeState === "surprised" ? (
                  <div className="flex items-center justify-around w-full px-1">
                    <div className="w-3 h-3 rounded-full border-2 border-cyan-300 bg-cyan-400/40 shadow-[0_0_8px_#00f0ff]" />
                    <div className="w-3 h-3 rounded-full border-2 border-cyan-300 bg-cyan-400/40 shadow-[0_0_8px_#00f0ff]" />
                  </div>
                ) : eyeState === "wink" ? (
                  <div className="flex items-center justify-around w-full px-1">
                    <span className="text-cyan-300 font-black text-xs">^</span>
                    <span className="text-cyan-300 font-black text-xs">-</span>
                  </div>
                ) : (
                  // Cute default happy eyes
                  <div className="flex items-center justify-around w-full px-1">
                    <motion.div
                      animate={{ scaleY: [1, 1.25, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]"
                    />
                    <motion.div
                      animate={{ scaleY: [1, 1.25, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* 2. TORSO BODY & ARMS */}
          <div className="relative flex items-center justify-center -mt-1 z-10">
            {/* Left Arm & Hand */}
            <motion.div
              animate={
                isDragging
                  ? { rotate: [-40, -90, -40], y: -5 }
                  : isUpsideDown
                  ? { rotate: -60, y: -2 }
                  : isWalking
                  ? { rotate: [-20, 20, -20] }
                  : isHovered
                  ? { rotate: [-10, 10, -10] }
                  : { rotate: [-10, 10, -10] }
              }
              transition={{ duration: isDragging ? 0.25 : isWalking ? 0.6 : 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-3.5 top-1 origin-top flex flex-col items-center"
            >
              <div className={`w-1.5 h-4 rounded-full border ${isUpsideDown ? "bg-neutral-800 border-red-500" : "bg-neutral-800 border-cyan-400/80"}`} />
              <div className={`w-3 h-3 rounded-full border mt-0.5 flex items-center justify-center shadow-sm ${
                isUpsideDown ? "bg-red-950 border-red-400 text-red-400" : "bg-neutral-900 border-cyan-400 text-cyan-300"
              }`}>
                <div className="w-1 h-1 rounded-full bg-current" />
              </div>
            </motion.div>

            {/* Torso */}
            <div className={`w-10 h-7 rounded-xl flex items-center justify-center border shadow-md ${
              isUpsideDown
                ? "bg-gradient-to-b from-neutral-900 to-red-950 border-red-500/80"
                : "bg-gradient-to-b from-neutral-900 to-neutral-950 border-cyan-500/50"
            }`}>
              {/* Glowing Core Reactor */}
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                  isUpsideDown
                    ? "bg-red-600/60 border-red-400 shadow-[0_0_8px_#ef4444]"
                    : "bg-cyan-500/50 border-cyan-300 shadow-[0_0_8px_#00f0ff]"
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${isUpsideDown ? "bg-amber-300" : "bg-white"}`} />
              </motion.div>
            </div>

            {/* Right Arm & Hand */}
            <motion.div
              animate={
                isDragging
                  ? { rotate: [40, 90, 40], y: -5 }
                  : isUpsideDown
                  ? { rotate: 60, y: -2 }
                  : isHovered
                  ? { rotate: [120, 160, 120], y: -4 }
                  : isWalking
                  ? { rotate: [20, -20, 20] }
                  : { rotate: [10, -10, 10] }
              }
              transition={{ duration: isDragging ? 0.25 : isHovered ? 0.4 : isWalking ? 0.6 : 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-3.5 top-1 origin-top flex flex-col items-center"
            >
              <div className={`w-1.5 h-4 rounded-full border ${isUpsideDown ? "bg-neutral-800 border-red-500" : "bg-neutral-800 border-cyan-400/80"}`} />
              <div className={`w-3 h-3 rounded-full border mt-0.5 flex items-center justify-center shadow-sm ${
                isUpsideDown ? "bg-red-950 border-red-400 text-red-400" : "bg-neutral-900 border-cyan-400 text-cyan-300"
              }`}>
                <div className="w-1 h-1 rounded-full bg-current" />
              </div>
            </motion.div>
          </div>

          {/* 3. ARTICULATED LEGS & FEET BOOTS */}
          <div className="relative flex items-center justify-center gap-2 mt-0.5 z-0">
            {/* Left Leg */}
            <motion.div
              animate={
                isDragging
                  ? { rotate: [-20, 30, -20], y: [0, 2, 0] }
                  : isUpsideDown
                  ? { rotate: -10, y: 0 }
                  : isWalking
                  ? { rotate: [20, -20, 20], y: [-2, 2, -2] }
                  : { y: [0, 1.5, 0] }
              }
              transition={{ duration: isDragging ? 0.3 : isWalking ? 0.6 : 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center origin-top"
            >
              <div className={`w-1.5 h-3.5 rounded-full border ${isUpsideDown ? "bg-neutral-800 border-red-500" : "bg-neutral-800 border-cyan-400/80"}`} />
              <div className={`w-3.5 h-2 rounded-t-sm rounded-b-md border shadow-sm ${
                isUpsideDown ? "bg-neutral-900 border-red-500 shadow-[0_0_6px_#ef4444]" : "bg-neutral-900 border-cyan-400/90 shadow-[0_0_6px_#00f0ff]"
              }`} />
            </motion.div>

            {/* Right Leg */}
            <motion.div
              animate={
                isDragging
                  ? { rotate: [30, -20, 30], y: [2, 0, 2] }
                  : isUpsideDown
                  ? { rotate: 10, y: 0 }
                  : isWalking
                  ? { rotate: [-20, 20, -20], y: [2, -2, 2] }
                  : { y: [1.5, 0, 1.5] }
              }
              transition={{ duration: isDragging ? 0.3 : isWalking ? 0.6 : 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center origin-top"
            >
              <div className={`w-1.5 h-3.5 rounded-full border ${isUpsideDown ? "bg-neutral-800 border-red-500" : "bg-neutral-800 border-cyan-400/80"}`} />
              <div className={`w-3.5 h-2 rounded-t-sm rounded-b-md border shadow-sm ${
                isUpsideDown ? "bg-neutral-900 border-red-500 shadow-[0_0_6px_#ef4444]" : "bg-neutral-900 border-cyan-400/90 shadow-[0_0_6px_#00f0ff]"
              }`} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
