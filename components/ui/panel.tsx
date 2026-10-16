import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FullLine } from "@/components/ui/divider";

export function Column({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative mx-auto border-x border-edge md:max-w-3xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Panel({
  id,
  title,
  children,
  className,
  bodyClassName,
}: {
  id?: string;
  title: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section id={id} className={cn("relative", className)}>
      <FullLine className="top-0" />
      <header className="relative px-4 sm:px-5">
        <h2 className="py-4 font-pixel text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
        <FullLine className="bottom-0" />
      </header>
      <div className={cn("px-4 py-6 sm:px-5", bodyClassName)}>{children}</div>
    </section>
  );
}
