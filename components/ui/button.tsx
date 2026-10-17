import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "outline" | "ghost" | "secondary";
type Size = "sm" | "md" | "icon";

const variants: Record<Variant, string> = {
  default:
    "bg-accent text-accent-foreground hover:bg-accent/80 border border-transparent",
  outline: "border border-border bg-transparent text-foreground hover:bg-muted",
  secondary:
    "bg-muted text-foreground hover:bg-muted/70 border border-transparent",
  ghost:
    "border border-transparent hover:bg-muted text-muted-foreground hover:text-foreground",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-9 px-4 text-sm",
  icon: "h-8 w-8",
};

export function buttonVariants({
  variant = "outline",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return cn(
    "inline-flex select-none items-center justify-center gap-1.5 rounded-lg font-medium outline-none transition-[background-color,color,transform] ease-out focus-visible:ring-[3px] focus-visible:ring-accent active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
}

export function Button({
  variant = "outline",
  size = "md",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}) {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
}
