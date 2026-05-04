"use client";

import * as React from "react";

import { useTheme } from "@/hooks/use-theme";
import { useCircularTransition } from "@/hooks/use-circular-transition";
import "./theme-customizer/circular-transition.css";
import ModeToggleSwitch from "@/shared/ui/switch-13";

interface ModeToggleProps {
  variant?: "outline" | "ghost" | "default";
}

export function ModeToggle({ variant = "outline" }: ModeToggleProps) {
  const { theme } = useTheme();
  const { toggleTheme } = useCircularTransition();

  // Simple, reliable dark mode detection with re-sync
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    const updateMode = () => {
      if (theme === "dark") {
        setIsDarkMode(true);
      } else if (theme === "light") {
        setIsDarkMode(false);
      } else {
        setIsDarkMode(
          typeof window !== "undefined" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        );
      }
    };

    updateMode();

    // Listen for system theme changes
    const mediaQuery =
      typeof window !== "undefined"
        ? window.matchMedia("(prefers-color-scheme: dark)")
        : null;
    if (mediaQuery) {
      mediaQuery.addEventListener("change", updateMode);
    }

    return () => {
      if (mediaQuery) {
        mediaQuery.removeEventListener("change", updateMode);
      }
    };
  }, [theme]);

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    toggleTheme(event);
  };

  return (
    <>
      <ModeToggleSwitch isDarkMode={isDarkMode} handleToggle={handleToggle} />
    </>
  );
}
