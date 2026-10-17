import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      <rect width="64" height="64" rx="14" className="fill-background" />
      <text
        x="32"
        y="42"
        textAnchor="middle"
        fontSize="30"
        fontWeight="600"
        className="fill-foreground"
        style={{
          fontFamily:
            "var(--font-geist-pixel-square), var(--font-geist-mono), ui-monospace, monospace",
        }}
      >
        vp
      </text>
    </svg>
  );
}
