"use client";

import { useEffect, useState } from "react";
import { ContributionHeatmap } from "@/components/contribution-heatmap";
import { site } from "@/lib/content";
import {
  fetchPublicContributions,
  type Contributions,
} from "@/lib/contributions";

const REFRESH_MS = 15 * 60_000;

/**
 * The build-time snapshot is rendered first so the prerendered HTML and the
 * first client render agree; the effect then refreshes it from the public
 * contributions API and keeps it current while the tab is open.
 */
export function GitHubActivityLive({
  initial,
}: {
  initial: Contributions | null;
}) {
  const [data, setData] = useState(initial);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    const refresh = async () => {
      const next = await fetchPublicContributions(site.username, {
        signal: controller.signal,
        cache: "no-store",
      });
      if (active && next) setData(next);
    };

    void refresh();
    const id = setInterval(() => void refresh(), REFRESH_MS);

    const onVisible = () => {
      if (document.visibilityState === "visible") void refresh();
    };
    const onOnline = () => void refresh();

    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("online", onOnline);

    return () => {
      active = false;
      controller.abort();
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("online", onOnline);
    };
  }, []);

  if (!data || data.days.length === 0) {
    return (
      <p className="font-mono text-sm text-muted-foreground">
        Contribution data unavailable.
      </p>
    );
  }

  return <ContributionHeatmap data={data} />;
}
