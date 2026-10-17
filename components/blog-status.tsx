import type { BlogStatus as BlogStatusValue } from "@/lib/blog";
import { cn } from "@/lib/utils";

const DOT: Record<BlogStatusValue, string> = {
  EXPLORING: "border border-muted-foreground/60 bg-transparent",
  "IN PROGRESS": "bg-live",
  VALIDATING: "bg-info",
  COMPLETE: "bg-live",
};

/**
 * Accessible maturity label: the text always carries the meaning, the dot is a
 * restrained secondary cue.
 */
export function BlogStatus({ status }: { status: BlogStatusValue }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
      <span
        aria-hidden="true"
        className={cn("size-1.5 shrink-0 rounded-full", DOT[status])}
      />
      {status}
    </span>
  );
}
