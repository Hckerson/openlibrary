"use client";

import { Button } from "./button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Don’t render anything until the client has hydrated
    return null;
  }

  return (
    <Button
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {" "}
      <div className="flex h-[20px] w-[20px] items-center justify-center">
        {" "}
        {theme === "dark" ? (
          <Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        ) : (
          <Sun className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        )}
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
