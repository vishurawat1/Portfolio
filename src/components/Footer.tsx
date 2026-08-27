"use client";

import { useThemeMode } from "@/context/ThemeModeContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { mode } = useThemeMode();
  const isUpsideDown = mode === "upside-down";
  
  return (
    <footer className={`py-8 px-6 text-center relative z-10 border-t transition-colors duration-500 mt-20 ${
      isUpsideDown ? "border-red-900/30 text-neutral-400" : "border-white/5 text-muted-silver/60"
    }`}>
      <p className="text-sm font-mono">
        &copy; {currentYear} | {isUpsideDown ? (
          <>
            Forged with Iron, Discipline & Code by{" "}
            <span className="text-red-400 font-semibold">Vishwajeet Singh Rawat</span>.
          </>
        ) : (
          <>
            Designed & Engineered with Code & Sorcery by{" "}
            <span className="text-neon-cyan/70">Vishwajeet Singh Rawat</span>.
          </>
        )}
      </p>
    </footer>
  );
}
