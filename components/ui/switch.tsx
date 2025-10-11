"use client";

import * as React from "react";
import * as Switch from "@radix-ui/react-switch";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ToggleSwitch({
  theme,
  setTheme,
}: {
  theme: string;
  setTheme: (theme: string) => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = theme === "dark";

  if (!mounted) {
    return (
      <div className="flex items-center justify-center">
        <div className="relative h-[32px] w-[60px] rounded-full bg-gray-400 shadow-inner" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <Switch.Root
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        className="relative h-[32px] w-[60px] rounded-full bg-gray-200 shadow-inner transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=checked]:bg-gray-800"
      >
        <Sun
          className={`absolute top-[6px] left-[6px] size-5 transition-opacity duration-200 ${
            isDark ? "text-gray-400 opacity-30" : "text-yellow-500 opacity-100"
          }`}
        />
        <Switch.Thumb className="block size-[20px] translate-x-[6px] rounded-full bg-white shadow-lg transition-transform duration-200 will-change-transform data-[state=checked]:translate-x-[34px]" />
        <Moon
          className={`absolute top-[6px] right-[6px] size-5 transition-opacity duration-200 ${
            isDark ? "text-blue-300 opacity-100" : "text-gray-400 opacity-30"
          }`}
        />
      </Switch.Root>
    </div>
  );
}
