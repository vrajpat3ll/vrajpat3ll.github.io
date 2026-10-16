import { PixelCat } from "@/components/pixel-cat";
import { FullLine } from "@/components/ui/divider";
import { site } from "@/lib/content";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative">
      <FullLine className="top-0" />
      <div className="flex items-end justify-between gap-4 px-4 py-6 sm:px-5">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[12px] text-muted-foreground">
            © {year} {site.name}
          </span>
          <span className="font-mono text-[12px] text-muted-foreground">
            Built with love, LLMs and 1 kilo Biryani
          </span>
        </div>
        <PixelCat className="h-20 w-auto shrink-0 opacity-70" />
      </div>
      <div className="h-6 w-full pattern-dots" aria-hidden="true" />
    </footer>
  );
}
