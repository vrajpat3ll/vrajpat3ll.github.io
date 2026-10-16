"use client";

import { Music } from "lucide-react";
import { useEffect, useState } from "react";
import { lastfm } from "@/lib/content";
import { getRecentTrack, isLastfmConfigured, type Track } from "@/lib/lastfm";

function AlbumDisc({ image }: { image: string | null }) {
  return (
    <div className="relative size-16 shrink-0" aria-hidden="true">
      <div className="absolute inset-0 overflow-hidden rounded-full ring-1 ring-black/40">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-neutral-700 via-neutral-900 to-black">
            <Music className="size-5 text-neutral-400" />
          </div>
        )}
      </div>
      <div className="absolute inset-[38%] rounded-full bg-background/80 ring-1 ring-black/30" />
    </div>
  );
}

export function NowPlaying() {
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

  if (!isLastfmConfigured()) return null;

  const live = track?.nowPlaying;

  return (
    <a
      href={track?.url ?? `https://last.fm/user/${lastfm.username}`}
      target="_blank"
      rel="noreferrer"
      className="group mx-auto flex w-full max-w-sm items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-sm shadow-sm transition-colors hover:bg-muted"
    >
      <AlbumDisc image={track?.image ?? null} />

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
          <span
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
              live ? "bg-live live-dot" : "bg-muted-foreground/40"
            }`}
          />
          {loading ? "Checking activity…" : live ? "Now playing" : "Not listening"}
        </span>
        <span className="truncate text-[15px] font-semibold leading-snug text-foreground">
          {loading ? "—" : (track?.title ?? "Nothing playing")}
        </span>
        {track && (
          <span className="truncate font-mono text-xs text-muted-foreground">
            {track.artist}
            {track.album ? ` · ${track.album}` : ""}
          </span>
        )}
      </div>
    </a>
  );
}
