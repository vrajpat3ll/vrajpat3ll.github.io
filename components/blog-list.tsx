import Link from "next/link";
import { BlogStatus } from "@/components/blog-status";
import type { BlogFrontmatter } from "@/lib/blog";
import { formatMonthYear } from "@/lib/utils";

export type BlogListItem = {
  slug: string;
  frontmatter: BlogFrontmatter;
};

function BlogRow({ item }: { item: BlogListItem }) {
  const { slug, frontmatter } = item;

  return (
    <Link
      href={`/blog/${slug}/`}
      className="group block border-t border-border px-4 py-5 outline-none transition-colors first:border-t-0 hover:bg-accent focus-visible:bg-accent sm:px-5"
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
        <span className="text-info">{frontmatter.category}</span>
        <time dateTime={frontmatter.date}>
          {formatMonthYear(frontmatter.date)}
        </time>
        <BlogStatus status={frontmatter.status} />
      </div>
      <h3 className="mt-2 text-base font-medium leading-snug text-foreground transition-colors group-hover:text-info">
        {frontmatter.title}
      </h3>
      <p className="mt-1.5 max-w-prose text-sm leading-relaxed text-muted-foreground">
        {frontmatter.summary}
      </p>
    </Link>
  );
}

export function BlogList({ items }: { items: BlogListItem[] }) {
  if (items.length === 0) {
    return (
      <p className="border-t border-border py-8 font-mono text-sm text-muted-foreground">
        Nothing published yet.
      </p>
    );
  }

  return (
    <div className="-mx-4 border-t border-border sm:-mx-5">
      {items.map((item) => (
        <BlogRow key={item.slug} item={item} />
      ))}
    </div>
  );
}
