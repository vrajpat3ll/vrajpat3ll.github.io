import { CodeXml } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Panel } from "@/components/ui/panel";
import { TagList } from "@/components/ui/tag";
import { experience, type Experience as ExperienceItem } from "@/lib/content";

function Job({
  job,
  defaultOpen,
}: {
  job: ExperienceItem;
  defaultOpen?: boolean;
}) {
  return (
    <Collapsible className="group" defaultOpen={defaultOpen}>
      <div className="flex items-start gap-3">
        <CodeXml className="mt-1 size-4 shrink-0 text-muted-foreground" />
        <div className="min-w-0 flex-1">
          <CollapsibleTrigger className="flex w-full items-start justify-between gap-3 text-left outline-none focus-visible:ring-[3px] focus-visible:ring-accent">
            <div className="flex flex-col">
              <span className="text-base font-medium leading-snug text-foreground">
                {job.role}
              </span>
              <dl className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 font-mono text-xs text-muted-foreground">
                <div className="flex gap-1.5">
                  <dt className="text-muted-foreground/70">Employment Type:</dt>
                  <dd>{job.type}</dd>
                </div>
                <div className="flex gap-1.5">
                  <dt className="text-muted-foreground/70">Period:</dt>
                  <dd>{job.period}</dd>
                </div>
              </dl>
            </div>
          </CollapsibleTrigger>

          {job.stack.length > 0 && (
            <div className="mt-3">
              <TagList items={job.stack} />
            </div>
          )}

          <CollapsibleContent>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {job.points.map((point, i) => (
                <li key={i} className="relative pl-5">
                  <span className="absolute left-0 top-2.5 h-1 w-1 rounded-full bg-muted-foreground/60" />
                  {point}
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </div>
      </div>
    </Collapsible>
  );
}

export function Experience() {
  const companies = new Map<string, ExperienceItem[]>();
  for (const job of experience) {
    const list = companies.get(job.company) ?? [];
    list.push(job);
    companies.set(job.company, list);
  }

  return (
    <Panel id="experience" title="Experience">
      {experience.length === 0 ? (
        <p className="font-mono text-sm text-muted-foreground">— coming soon</p>
      ) : (
        <div className="space-y-8">
          {[...companies.entries()].map(([company, jobs]) => (
            <div key={company}>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                <h3 className="text-lg font-medium leading-snug">
                  {jobs[0].companyUrl ? (
                    <a
                      href={jobs[0].companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-offset-4 hover:underline"
                    >
                      {company}
                    </a>
                  ) : (
                    company
                  )}
                </h3>
              </div>
              <div className="ml-1 mt-4 space-y-6 border-l border-border pl-5">
                {jobs.map((job) => (
                  <Job
                    key={`${job.company}-${job.role}`}
                    job={job}
                    defaultOpen={job === experience[0]}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Panel>
  );
}
