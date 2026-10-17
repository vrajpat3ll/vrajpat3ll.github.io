"use client";

import { ArrowUp } from "lucide-react";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { PixelCat } from "@/components/pixel-cat";
import { FullLine } from "@/components/ui/divider";
import { connect, moreNav, nav, site } from "@/lib/content";

const socialIcons = ["github", "linkedin", "x", "mail"] as const;

const footerLinks = [...nav, ...moreNav];

export function SiteFooter() {
  const year = new Date().getFullYear();
  const socials = connect.filter((link) =>
    socialIcons.includes(link.icon as (typeof socialIcons)[number]),
  );

  return (
    <footer className="relative">
      <FullLine className="top-0" />
      <div className="flex flex-col gap-8 px-4 py-8 sm:px-5">
        <div className="flex items-start justify-between gap-6">
          <div className="flex min-w-0 flex-col gap-3">
            <span className="font-pixel text-lg font-semibold tracking-tight">
              {site.name}
            </span>
            <p className="max-w-sm font-mono text-[12px] leading-relaxed text-muted-foreground">
              {site.role} building at the intersection of systems, AI, and the
              web, and overfitting a backtest or two to the market.
            </p>
            <div className="flex items-center gap-2">
              {socials.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex size-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground"
                >
                  <Icon name={link.icon} className="size-4" />
                </a>
              ))}
            </div>
          </div>
          <PixelCat className="h-16 w-auto shrink-0 opacity-70 sm:h-20" />
        </div>

        <div className="flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[12px]">
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <span className="font-mono text-[12px] text-muted-foreground">
            Built with love, LLMs and an unhealthy amount of Biryani{" "}
            <span className="font-serif text-[14px] italic">&amp;</span> coke.
          </span>
        </div>

        <div className="flex flex-col gap-1 font-mono text-[11px] text-muted-foreground/70 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {site.name}. All rights reserved.
          </span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex w-fit items-center gap-1 outline-none transition-colors hover:text-foreground focus-visible:text-foreground"
          >
            Back to top
            <ArrowUp className="size-3" />
          </button>
        </div>
      </div>
      <div className="h-6 w-full pattern-dots" aria-hidden="true" />
    </footer>
  );
}
