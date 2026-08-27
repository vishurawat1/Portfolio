"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type ThemeMode = "normal" | "upside-down";

interface ThemeModeContextType {
  mode: ThemeMode;
  isTransitioning: boolean;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
}

const ThemeModeContext = createContext<ThemeModeContextType | undefined>(undefined);

export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("normal");
  const [isTransitioning] = useState(false);

  const toggleMode = useCallback(() => {
    const nextMode: ThemeMode = mode === "normal" ? "upside-down" : "normal";
    setModeState(nextMode);
  }, [mode]);

  const setMode = useCallback((newMode: ThemeMode) => {
    if (newMode === mode) return;
    setModeState(newMode);
  }, [mode]);

  // Sync class on document element for global theme CSS
  useEffect(() => {
    if (mode === "upside-down") {
      document.documentElement.classList.add("upside-down-mode");
      document.body.classList.add("upside-down-mode");
    } else {
      document.documentElement.classList.remove("upside-down-mode");
      document.body.classList.remove("upside-down-mode");
    }
  }, [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, isTransitioning, toggleMode, setMode }}>
      {children}
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode() {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within a ThemeModeProvider");
  }
  return context;
}
