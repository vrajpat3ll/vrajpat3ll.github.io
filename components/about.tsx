import { Section } from "@/components/section";
import { about } from "@/lib/content";

export function About() {
  return (
    <Section id="about" title="About">
      <div className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
        {about.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
}
