import { connect, moreNav, nav, projects, tilUrl } from "@/lib/content";

export type SearchItem = {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  group: string;
  keywords?: string;
  external?: boolean;
};

export type LatestPost = {
  title: string;
  slug: string;
};

export function getSearchIndex(
  options: { latestPost?: LatestPost } = {},
): SearchItem[] {
  const items: SearchItem[] = [];

  for (const item of nav) {
    items.push({
      id: `nav-${item.href}`,
      title: item.title,
      href: item.href,
      group: "Pages",
    });
  }

  for (const item of moreNav) {
    items.push({
      id: `more-${item.href}`,
      title: item.title,
      href: item.href,
      group: "Pages",
      external: item.external,
    });
  }

  if (options.latestPost) {
    items.push({
      id: "latest-post",
      title: options.latestPost.title,
      subtitle: "Latest note",
      href: `/blog/${options.latestPost.slug}/`,
      group: "Writing",
      keywords: "blog latest note writing",
    });
  }

  items.push({
    id: "page-til",
    title: "TIL",
    subtitle: "Today I learned",
    href: tilUrl,
    group: "Writing",
    keywords: "notes til learning",
    external: true,
  });

  items.push({
    id: "page-resume",
    title: "Resume",
    subtitle: "PDF",
    href: "/resume.pdf",
    group: "Pages",
    external: true,
  });

  for (const item of projects) {
    items.push({
      id: `project-${item.name}`,
      title: item.name,
      subtitle: item.blurb.slice(0, 60),
      href: item.href ?? item.repo ?? "/projects",
      group: "Projects",
      keywords: item.stack.join(" "),
      external: true,
    });
  }

  for (const link of connect) {
    items.push({
      id: `connect-${link.label}`,
      title: link.label,
      subtitle: link.handle,
      href: link.href,
      group: "Connect",
      external: link.href.startsWith("http"),
    });
  }

  return items;
}
