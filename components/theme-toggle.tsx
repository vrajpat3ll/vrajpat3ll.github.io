"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const order = ["light", "dark", "system"] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const next = order[(order.indexOf(theme) + 1) % order.length];

  return (
    <Tooltip label={`Theme: ${theme}`}>
      <button
        type="button"
        onClick={() => setTheme(next)}
        aria-label="Toggle theme"
        className={cn(
          "inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground outline-none transition-[background-color,color,transform] ease-out hover:bg-accent hover:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-accent active:scale-95",
        )}
      >
        {theme === "light" && <Sun className="size-[18px]" />}
        {theme === "dark" && <Moon className="size-[18px]" />}
        {theme === "system" && <Monitor className="size-[18px]" />}
      </button>
    </Tooltip>
  );
}
