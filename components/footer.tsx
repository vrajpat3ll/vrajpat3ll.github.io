import { quote, site } from "@/lib/content";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-8 border-t border-border pt-8 pb-12">
      <blockquote className="border-l-2 border-border pl-4">
        <p className="text-sm italic text-muted-foreground">
          &ldquo;{quote.text}&rdquo;
        </p>
        <footer className="mt-1.5 font-mono text-xs text-muted-foreground">
          — {quote.author}
        </footer>
      </blockquote>

      <p className="mt-8 font-mono text-xs text-muted-foreground">
        © {year} {site.name} · built with Next.js
      </p>
    </footer>
  );
}
