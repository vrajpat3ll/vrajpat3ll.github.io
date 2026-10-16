"use client";

import { Quote as QuoteIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { FullLine } from "@/components/ui/divider";
import { dayIndex, quoteForDay } from "@/lib/quotes";

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
      <QuoteIcon className="size-9 fill-current text-zinc-300 dark:text-zinc-700" />
      <div
        key={quote.text}
        className="min-h-[6.5rem] animate-[fade-up_400ms_ease-out] sm:min-h-[6rem]"
      >
        <blockquote className="mb-6 mt-2 max-w-2xl text-xl font-medium italic text-zinc-700 dark:text-zinc-300 sm:text-2xl">
          {quote.text}
        </blockquote>
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-border" />
          <span className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
            {quote.author}
          </span>
          <span className="h-px w-8 bg-border" />
        </div>
      </div>
    </div>
  );
}
