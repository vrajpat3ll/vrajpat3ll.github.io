import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { BlogList } from "@/components/blog-list";
import { Panel } from "@/components/ui/panel";
import { getBlogs } from "@/lib/blog";
import { site, tilUrl } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Research notes on systems, market simulation, and agents.",
};

export default function BlogPage() {
  const items = getBlogs().map((doc) => ({
    slug: doc.slug,
    frontmatter: doc.frontmatter,
  }));

  return (
    <Panel id="blog" title="Blog">
      <p className="mb-6 max-w-prose font-mono text-sm text-muted-foreground">
        Research notes on systems, market simulation and agents. I publish them
        while the work is still in progress.
      </p>
      <BlogList items={items} />

      <div className="mt-8 border-t border-border pt-6">
        <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
          I also keep short notes on what I&apos;m learning at my TIL site,
          mostly systems and tooling.
        </p>
        <a
          href={tilUrl}
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
