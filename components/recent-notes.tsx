import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { BlogList } from "@/components/blog-list";
import { Panel } from "@/components/ui/panel";
import { getBlogs } from "@/lib/blog";
import { tilUrl } from "@/lib/content";

export function RecentNotes() {
  const items = getBlogs()
    .slice(0, 3)
    .map((doc) => ({ slug: doc.slug, frontmatter: doc.frontmatter }));

  return (
    <Panel id="writing" title="Writing">
      <p className="mb-6 max-w-prose font-mono text-sm text-muted-foreground">
        Notes I publish while the work is still in progress.
      </p>

      <BlogList items={items} />

      <div className="mt-6 flex items-center gap-4 font-mono text-xs">
        <Link
          href="/blog/"
          className="group inline-flex items-center gap-1.5 text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:text-foreground"
        >
          All notes
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <a
          href={tilUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:text-foreground"
        >
          TIL
          <ArrowUpRight className="size-3.5" />
        </a>
      </div>
    </Panel>
  );
}
