import type { Metadata } from "next";
import Image from "next/image";
import { ArrowIcon } from "@/components/icons";
import { ProjectMark } from "@/components/project-mark";
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
        A few things I&apos;ve built. Each card links to the source or a live
        demo.
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {projects.map((project) => {
          const primary = project.href ?? project.repo ?? "#";
          const secondary =
            project.href && project.repo ? project.repo : undefined;
          const primaryLabel = project.href ? "Live demo" : "Source";

          return (
            <div
              key={project.name}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-muted-foreground/40 hover:bg-muted"
            >
              <a
                href={primary}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.name} — ${primaryLabel}`}
                className="pattern-dots relative flex aspect-16/10 items-center justify-center border-b border-border bg-muted outline-none focus-visible:ring-[3px] focus-visible:ring-accent"
              >
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <ProjectMark
                    mark={project.mark}
                    tone={project.tone}
                    anim={project.anim}
                    className="h-14 w-auto opacity-70 transition-opacity group-hover:opacity-100"
                  />
                )}
                <span className="absolute top-2 right-2 rounded-md border border-border bg-background/80 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground backdrop-blur-sm">
                  {project.year}
                </span>
              </a>

              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-sm font-medium text-foreground">
                    <a
                      href={primary}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-sm outline-none transition-colors hover:text-info focus-visible:ring-[3px] focus-visible:ring-accent"
                    >
                      {project.name}
                    </a>
                  </h2>
                  <ArrowIcon className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <p className="mt-1.5 flex-1 text-sm text-muted-foreground">
                  {project.blurb}
                </p>
                {project.insight && (
                  <p className="mt-2 font-mono text-xs leading-relaxed text-info">
                    {project.insight}
                  </p>
                )}
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
                {secondary && (
                  <div className="mt-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                    <a
                      href={primary}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-sm outline-none transition-colors hover:text-foreground focus-visible:text-foreground"
                    >
                      Live
                    </a>
                    <a
                      href={secondary}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-sm outline-none transition-colors hover:text-foreground focus-visible:text-foreground"
                    >
                      GitHub
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}
