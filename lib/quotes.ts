import { quotes, type Quote } from "@/lib/content";

const DAY_MS = 86_400_000;

/** Whole days since the epoch — one increment per calendar day (UTC). */
export function dayIndex(date: Date = new Date()): number {
  return Math.floor(date.getTime() / DAY_MS);
}

export function quoteForDay(index: number): Quote {
  const { length } = quotes;
  return quotes[((index % length) + length) % length];
}
