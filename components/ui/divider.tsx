import { cn } from "@/lib/utils";

export function FullLine({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute left-1/2 h-px w-screen -translate-x-1/2 bg-edge",
        className,
      )}
    />
  );
}

export function StripedDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("relative h-6 w-full pattern-stripes", className)}
    />
  );
}

/**
 * Hatched bands that fill the left/right gutters beside a section heading,
 * echoing the `StripedDivider` motif, without covering the content itself.
 * Hidden below `md`, where the column has no gutters.
 */
export function EdgeStripes({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 hidden md:block",
        className,
      )}
    >
      <span className="absolute right-full inset-y-0 w-[calc(50vw_-_24rem)] pattern-stripes" />
      <span className="absolute left-full inset-y-0 w-[calc(50vw_-_24rem)] pattern-stripes" />
    </span>
  );
}
