import { Avatar } from "@/components/avatar";
import { NowPlaying } from "@/components/now-playing";
import { site } from "@/lib/content";

export function Hero() {
  const initials = site.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <section className="fade-up pt-12 pb-4">
      <div className="flex items-center gap-5">
        <Avatar alt={site.name} initials={initials} />
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {site.name}
          </h1>
          <p className="mt-1 font-mono text-sm text-muted-foreground">
            {site.role} · {site.location}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <NowPlaying />
      </div>
    </section>
  );
}
