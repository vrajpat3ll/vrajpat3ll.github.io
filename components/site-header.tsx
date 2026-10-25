"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CommandMenu } from "@/components/command-menu";
import { Icon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { moreNav, nav, resumeHref } from "@/lib/content";
import type { LatestPost } from "@/lib/search-index";

const NAV_INLINE_LIMIT = 4;

type NavItem = { title: string; href: string; external?: boolean };

const allNav: NavItem[] = [...nav, ...moreNav];
const hasOverflow = allNav.length > NAV_INLINE_LIMIT;
const inlineNav = hasOverflow ? allNav.slice(0, NAV_INLINE_LIMIT) : allNav;
const overflowNav = hasOverflow ? allNav.slice(NAV_INLINE_LIMIT) : [];

function MoreMenu({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (items.length === 0) return null;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center gap-1 font-mono text-sm font-medium text-muted-foreground outline-none transition-colors hover:text-foreground"
      >
        More
        <ChevronDown
          className={cn(
            "size-3 transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 min-w-32 overflow-hidden rounded-lg border border-border bg-popover p-1 shadow-lg">
          {items.map((item) =>
            item.external ? (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="block rounded-md px-2 py-1.5 font-mono text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {item.title}
              </a>
            ) : (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-2 py-1.5 font-mono text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {item.title}
              </Link>
            ),
          )}
        </div>
      )}
    </div>
  );
}

export function SiteHeader({ latestPost }: { latestPost?: LatestPost }) {
  const pathname = usePathname();
  const [affix, setAffix] = useState(false);

  useEffect(() => {
    const onScroll = () => setAffix(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-affix={affix}
      className={cn(
        "sticky top-0 z-50 bg-background px-2 pt-2 transition-shadow duration-300",
        affix && "shadow-[0_0_16px_0_black]/10 dark:shadow-[0_0_16px_0_black]",
      )}
    >
      <div className="mx-auto flex h-12 items-center justify-between gap-2 border-x border-t border-b border-edge px-2 sm:gap-4 md:max-w-3xl">
        <Link
          href="/"
          aria-label="Home"
          className="transition-transform ease-out active:scale-[0.98]"
        >
          <Logo className="h-9 w-9" />
        </Link>

        <div className="flex-1" />

        <nav className="hidden items-center gap-4 sm:flex">
          {inlineNav.map((item) =>
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.title}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "font-mono text-sm font-medium transition-colors hover:text-foreground",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {item.title}
              </Link>
            ),
          )}
          <MoreMenu items={overflowNav} />
        </nav>

        <div className="flex items-center">
          <a
            href={resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Résumé (PDF)"
            className="mr-2 inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border border-border bg-background px-2.5 text-muted-foreground shadow-xs outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-accent sm:px-3"
          >
            <Icon name="resume" className="size-4" />
            <span className="hidden font-sans text-sm/4 font-medium sm:inline">
              Résumé
            </span>
          </a>
          <CommandMenu latestPost={latestPost} />
          <span aria-hidden="true" className="mx-2 flex h-4 w-px bg-border" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
