import { GraduationCap } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { education } from "@/lib/content";

export function Education() {
  return (
    <Panel id="education" title="Education">
      <div className="space-y-6">
        {education.map((item) => (
          <div key={item.school} className="flex items-start gap-3">
            <GraduationCap className="mt-1 size-4 shrink-0 text-muted-foreground" />
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-medium leading-snug">
                {item.schoolUrl ? (
                  <a
                    href={item.schoolUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-4 hover:underline"
                  >
                    {item.school}
                  </a>
                ) : (
                  item.school
                )}
              </h3>
              <p className="mt-1 flex flex-wrap gap-x-4 font-mono text-xs text-muted-foreground">
                <span>{item.degree}</span>
                <span>{item.period}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
