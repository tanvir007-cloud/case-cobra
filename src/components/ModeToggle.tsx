"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle({
  variant = "outline",
  size = "icon",
}: {
  variant?: "outline" | "ghost" | "default";
  size?: "sm" | "default" | "icon" | "lg";
}) {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => {
        theme === "dark" ? setTheme("light") : setTheme("dark");
      }}
    >
      <Sun className="dark:scale-0 dark:-rotate-90 transition-all scale-100 rotate-0 size-[1.2rem]" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
