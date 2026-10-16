import type { Metadata } from "next";
import { ArrowIcon } from "@/components/icons";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected projects and experiments.",
};

export default function ProjectsPage() {
  return (
    <div className="fade-up py-12">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Projects
      </h1>
      <p className="mt-2 max-w-prose text-sm text-muted-foreground">
        Selected things I&apos;ve built. Content pending — placeholders for now.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.href ?? project.repo ?? "#"}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-foreground">
                {project.name}
              </h2>
              <span className="font-mono text-xs text-muted-foreground">
                {project.year}
              </span>
            </div>
            <p className="mt-1.5 line-clamp-3 flex-1 text-sm text-muted-foreground">
              {project.blurb}
            </p>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <ArrowIcon className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
