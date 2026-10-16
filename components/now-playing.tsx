"use client";

import { useEffect, useState } from "react";
import { MusicIcon } from "@/components/icons";
import { getRecentTrack, isLastfmConfigured, type Track } from "@/lib/lastfm";
import { lastfm } from "@/lib/content";

export function NowPlaying() {
  const [track, setTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLastfmConfigured()) {
      setLoading(false);
      return;
    }

    let active = true;

    async function load() {
      try {
        const t = await getRecentTrack(lastfm.username);
        if (active) setTrack(t);
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    const id = setInterval(load, 30_000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  if (!isLastfmConfigured()) {
    return null;
  }

  const live = track?.nowPlaying;

  return (
    <a
      href={track?.url ?? `https://last.fm/user/${lastfm.username}`}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-3 rounded-xl border border-border bg-card px-3.5 py-3 transition-colors hover:bg-muted"
    >
      <span
        className={`relative flex h-2 w-2 shrink-0 ${live ? "live-dot" : ""}`}
        style={{ color: "var(--live)" }}
      >
        <span className="h-2 w-2 rounded-full bg-current" />
      </span>

      <MusicIcon className="h-4 w-4 shrink-0 text-muted-foreground" />

      <span className="min-w-0 flex-1 font-mono text-xs sm:text-sm">
        {loading ? (
          <span className="text-muted-foreground">Checking activity…</span>
        ) : track ? (
          <>
            <span className="text-muted-foreground">
              {live ? "now playing" : "last played"}:{" "}
            </span>
            <span className="text-foreground">{track.title}</span>
            <span className="text-muted-foreground"> — {track.artist}</span>
          </>
        ) : (
          <span className="text-muted-foreground">Not listening</span>
        )}
      </span>
    </a>
  );
}
