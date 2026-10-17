import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const BLOG_DIR = path.join(process.cwd(), "content", "blogs");

export const BLOG_STATUSES = [
  "EXPLORING",
  "IN PROGRESS",
  "VALIDATING",
  "COMPLETE",
] as const;

export type BlogStatus = (typeof BLOG_STATUSES)[number];

/**
 * Frontmatter validation runs at build time, so a missing title or an invalid
 * status fails the build rather than shipping a broken post.
 */
const blogFrontmatterSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  category: z.string().min(1),
  status: z.enum(BLOG_STATUSES),
  date: z.string().min(1),
});

export type BlogFrontmatter = z.infer<typeof blogFrontmatterSchema>;

export type BlogDocument = {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
};

function readSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getBlogSlugs(): string[] {
  return readSlugs();
}

export function getBlog(slug: string): BlogDocument | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const parsed = blogFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(
      `Invalid frontmatter in ${path.relative(process.cwd(), filePath)}: ${parsed.error.message}`,
    );
  }

  return { slug, frontmatter: parsed.data, content };
}

export function getBlogs(): BlogDocument[] {
  return readSlugs()
    .map((slug) => getBlog(slug))
    .filter((doc): doc is BlogDocument => doc !== null)
    .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));
}
