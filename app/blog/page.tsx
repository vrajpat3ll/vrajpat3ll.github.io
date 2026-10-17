import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { BlogList } from "@/components/blog-list";
import { Panel } from "@/components/ui/panel";
import { getBlogs } from "@/lib/blog";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes, TILs, and writing.",
};

const TIL_URL = "https://vrajpat3ll.github.io/til";

export default function BlogPage() {
  const items = getBlogs().map((doc) => ({
    slug: doc.slug,
    frontmatter: doc.frontmatter,
  }));

  return (
    <Panel id="blog" title="Blog">
      <p className="mb-6 max-w-prose font-mono text-sm text-muted-foreground">
        Research notes and things I&apos;m digging into — systems, market
        simulation and agents. Published while they&apos;re still in progress,
        not after.
      </p>
      <BlogList items={items} />

      <div className="mt-8 border-t border-border pt-6">
        <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
          I also write short notes and things I learn over at my TIL site —
          mostly systems, tooling, and whatever I&apos;m currently digging into.
        </p>
        <a
          href={TIL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-5 inline-flex h-9 items-center gap-2 rounded-xl border border-border bg-card px-3 text-xs font-medium text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground"
        >
          Visit {site.username}.github.io/til
          <ArrowUpRight className="size-3.5" />
        </a>
      </div>
    </Panel>
  );
}
