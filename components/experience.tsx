import { Section } from "@/components/section";
import { experience } from "@/lib/content";

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      {experience.length === 0 ? (
        <p className="font-mono text-sm text-muted-foreground">
          — coming soon
        </p>
      ) : (
        <ol className="space-y-6">
          {experience.map((job) => (
            <li key={`${job.company}-${job.role}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-sm font-medium text-foreground">
                  {job.companyUrl ? (
                    <a
                      href={job.companyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="underline-offset-4 hover:underline"
                    >
                      {job.company}
                    </a>
                  ) : (
                    job.company
                  )}
                </h3>
                <span className="font-mono text-xs text-muted-foreground">
                  {job.period}
                </span>
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {job.role}
                <span className="font-mono text-xs"> · {job.type}</span>
              </p>
              <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                {job.points.map((point, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-current" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              {job.stack.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {job.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ol>
      )}
    </Section>
  );
}
