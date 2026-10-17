"use client";

import { useEffect, useState } from "react";
import { lastfm } from "@/lib/content";
import { getRecentTrack, isLastfmConfigured, type Track } from "@/lib/lastfm";

export function ActivityStatus() {
  const [track, setTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(isLastfmConfigured());

  useEffect(() => {
    if (!isLastfmConfigured()) return;
    let active = true;

    const load = async () => {
      const t = await getRecentTrack(lastfm.username);
      if (active) {
        setTrack(t);
        setLoading(false);
      }
    };

    load();
    const id = setInterval(load, 30_000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  const live = track?.nowPlaying;
  const label = loading
    ? "Checking activity..."
    : track
      ? `${live ? "Listening to" : "Last played"} ${track.title} — ${track.artist}`
      : "Not listening";

  return (
    <span
      aria-live="polite"
      className="flex min-h-4 min-w-0 items-start gap-1.5 font-mono text-xs text-muted-foreground"
    >
      <span
        className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${
          live ? "bg-live live-dot" : "bg-muted-foreground/40"
        }`}
      />
      <span className="break-words">{label}</span>
    </span>
  );
}
