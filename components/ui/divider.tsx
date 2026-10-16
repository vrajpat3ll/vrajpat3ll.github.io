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
      className={cn(
        "relative h-6 w-full pattern-stripes",
        className,
      )}
    />
  );
}
