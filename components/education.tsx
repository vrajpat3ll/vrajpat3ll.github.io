import { Section } from "@/components/section";
import { education } from "@/lib/content";

export function Education() {
  return (
    <Section id="education" title="Education">
      <ol className="space-y-5">
        {education.map((item) => (
          <li key={item.school}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-sm font-medium text-foreground">
                {item.schoolUrl ? (
                  <a
                    href={item.schoolUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline-offset-4 hover:underline"
                  >
                    {item.school}
                  </a>
                ) : (
                  item.school
                )}
              </h3>
              <span className="font-mono text-xs text-muted-foreground">
                {item.period}
              </span>
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {item.degree}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
