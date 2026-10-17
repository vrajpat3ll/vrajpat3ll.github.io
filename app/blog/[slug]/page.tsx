import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { BlogStatus } from "@/components/blog-status";
import { getBlog, getBlogSlugs } from "@/lib/blog";
import { formatMonthYear } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getBlog(slug);
  if (!doc) return {};
  return {
    title: doc.frontmatter.title,
    description: doc.frontmatter.summary,
    alternates: { canonical: `/blog/${slug}/` },
    openGraph: {
      type: "article",
      url: `/blog/${slug}/`,
      title: doc.frontmatter.title,
      description: doc.frontmatter.summary,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: doc.frontmatter.title }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getBlog(slug);
  if (!doc) notFound();

  const { content } = await compileMDX({
    source: doc.content,
    options: { mdxOptions: { remarkPlugins: [remarkGfm] } },
  });

  return (
    <article className="px-4 py-10 sm:px-5">
      <Link
        href="/blog/"
        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:text-foreground"
      >
        <ArrowLeft aria-hidden="true" className="size-3.5" />
        All posts
      </Link>

      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-wide text-muted-foreground">
        <span className="text-info">{doc.frontmatter.category}</span>
        <time dateTime={doc.frontmatter.date}>
          {formatMonthYear(doc.frontmatter.date)}
        </time>
        <BlogStatus status={doc.frontmatter.status} />
      </div>

      <h1 className="mt-4 max-w-3xl font-pixel text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
        {doc.frontmatter.title}
      </h1>

      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
        {doc.frontmatter.summary}
      </p>

      <div className="prose prose-sm mt-10 max-w-none prose-headings:font-pixel prose-headings:font-semibold prose-headings:tracking-tight">
        {content}
      </div>
    </article>
  );
}
