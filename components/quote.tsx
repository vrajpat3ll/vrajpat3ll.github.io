"use client";

import { useEffect, useState } from "react";
import { FullLine } from "@/components/ui/divider";
import { dayIndex, quoteForDay } from "@/lib/quotes";

function PixelQuote() {
  return (
    <svg
      viewBox="0 0 10 6"
      aria-hidden="true"
      className="h-2.5 w-auto text-zinc-400 dark:text-zinc-600"
      fill="currentColor"
    >
      <rect x="0" y="0" width="4" height="4" />
      <rect x="0" y="4" width="2" height="2" />
      <rect x="6" y="0" width="4" height="4" />
      <rect x="6" y="4" width="2" height="2" />
    </svg>
  );
}

/**
 * Rotates once per day. `buildDayIndex` is computed on the server at build time
 * and handed down as a prop, so the prerendered HTML and the first client render
 * agree; the effect then corrects it if the day has rolled over since the build
 * (or while the tab sits open).
 */
export function Quote({ buildDayIndex }: { buildDayIndex: number }) {
  const [quote, setQuote] = useState(() => quoteForDay(buildDayIndex));

  useEffect(() => {
    const sync = () => {
      const next = quoteForDay(dayIndex());
      setQuote((current) => (current.text === next.text ? current : next));
    };

    sync();
    const id = setInterval(sync, 5 * 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative px-4 py-10 sm:px-5">
      <FullLine className="top-0" />
      <div
        key={quote.text}
        className="animate-[fade-up_400ms_ease-out] border-l border-border pl-4 sm:pl-5"
      >
        <PixelQuote />
        <blockquote className="mt-2 mb-5 max-w-2xl text-xl font-medium italic text-zinc-700 dark:text-zinc-300 sm:text-2xl">
          {quote.text}
        </blockquote>
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-border" />
          <span className="font-mono text-xs text-muted-foreground">
            {quote.author}
          </span>
          <span className="h-px w-8 bg-border" />
        </div>
      </div>
    </div>
  );
}
