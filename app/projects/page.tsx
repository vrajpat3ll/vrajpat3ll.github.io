import type { Metadata } from "next";
import Image from "next/image";
import { ArrowIcon } from "@/components/icons";
import { Panel } from "@/components/ui/panel";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected projects and experiments.",
};

export default function ProjectsPage() {
  return (
    <Panel title="Projects">
      <p className="mb-6 max-w-prose font-mono text-sm text-muted-foreground">
        Selected things I&apos;ve built and broken. Placeholders until I write
        the real ones up.
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {projects.map((project) => {
          const href = project.href ?? project.repo ?? "#";
          return (
            <a
              key={project.name}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-muted-foreground/40 hover:bg-muted"
            >
              <div className="pattern-dots relative flex aspect-16/10 items-center justify-center border-b border-border bg-muted">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="font-pixel text-5xl font-semibold text-muted-foreground/40">
                    {project.name.charAt(0)}
                  </span>
                )}
                <span className="absolute top-2 right-2 rounded-md border border-border bg-background/80 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground backdrop-blur-sm">
                  {project.year}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-sm font-medium text-foreground">
                    {project.name}
                  </h2>
                  <ArrowIcon className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <p className="mt-1.5 flex-1 text-sm text-muted-foreground">
                  {project.blurb}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </Panel>
  );
}
