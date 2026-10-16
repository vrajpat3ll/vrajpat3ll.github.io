import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span
      data-slot="tag"
      className="inline-flex items-center rounded-md border border-border px-2 py-0.5 font-mono text-[11px] leading-4 text-muted-foreground"
    >
      {children}
    </span>
  );
}

export function TagList({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className={cn("flex flex-wrap gap-1.5")}>
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </div>
  );
}
