import { NowPlaying } from "@/components/now-playing";
import { Panel } from "@/components/ui/panel";
import { about } from "@/lib/content";

export function About() {
  return (
    <Panel id="about" title="About">
      <ul className="space-y-3.5 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
        {about.map((paragraph, i) => (
          <li key={i} className="relative pl-5">
            <span className="absolute left-0 top-2.5 h-1.5 w-1.5 rounded-full bg-muted-foreground/50" />
            {paragraph}
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <NowPlaying />
      </div>
    </Panel>
  );
}
