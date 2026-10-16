"use client";

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { ChevronsUpDown } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const Collapsible = CollapsiblePrimitive.Root;

export function CollapsibleTrigger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <CollapsiblePrimitive.Trigger
      className={cn(
        "group/trigger flex w-full items-center gap-2 text-left outline-none",
        className,
      )}
    >
      {children}
      <ChevronsUpDown
        aria-hidden="true"
        className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]/trigger:rotate-180"
      />
    </CollapsiblePrimitive.Trigger>
  );
}

export function CollapsibleContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <CollapsiblePrimitive.Content
      className={cn(
        "overflow-hidden data-[state=closed]:animate-out data-[state=open]:animate-in",
        className,
      )}
    >
      {children}
    </CollapsiblePrimitive.Content>
  );
}
