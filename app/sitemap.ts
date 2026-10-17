import type { MetadataRoute } from "next";
import { getBlogs } from "@/lib/blog";
import { site } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts: MetadataRoute.Sitemap = getBlogs().map((doc) => ({
    url: `${site.url}/blog/${doc.slug}/`,
    lastModified: new Date(doc.frontmatter.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/projects/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${site.url}/blog/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...posts,
  ];
}
