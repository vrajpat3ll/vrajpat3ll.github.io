"use client";

import { Music } from "lucide-react";
import { useEffect, useState } from "react";
import { Icon, SpotifyIcon } from "@/components/icons";
import { lastfm } from "@/lib/content";
import { getRecentTrack, isLastfmConfigured, type Track } from "@/lib/lastfm";
import { cn } from "@/lib/utils";

const PROFILE_URL = `https://www.last.fm/user/${lastfm.username}`;

function AlbumDisc({
  image,
  spinning,
  showBadge,
}: {
  image: string | null;
  spinning: boolean;
  showBadge: boolean;
}) {
  return (
    <div className="relative size-16 shrink-0">
      <div
        className={cn(
          "absolute inset-0",
          spinning && "motion-safe:animate-[spin_6s_linear_infinite]",
        )}
      >
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

      {showBadge && (
        <span
          title="Open in Spotify"
          className="absolute -right-1 -bottom-1 grid size-5 place-items-center rounded-full bg-background ring-1 ring-border transition-colors group-hover:ring-foreground/30"
        >
          <SpotifyIcon className="size-3.5 text-muted-foreground transition-colors duration-500 group-hover:text-[#1DB954] group-focus-within:text-[#1DB954]" />
        </span>
      )}
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

  const live = Boolean(track?.nowPlaying);
  const spotifyUrl = track?.spotifyUrl ?? null;

  const status = loading
    ? "Checking activity…"
    : live
      ? "Now playing"
      : track
        ? "Last played"
        : "Not listening";

  const content = (
    <>
      <AlbumDisc
        image={track?.image ?? null}
        spinning={live}
        showBadge={Boolean(spotifyUrl)}
      />

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
          <span
            className={cn(
              "h-1.5 w-1.5 shrink-0 rounded-full",
              live ? "bg-live live-dot" : "bg-muted-foreground/40",
            )}
          />
          {status}
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
    </>
  );

  return (
    <div
      aria-live="polite"
      className="group mx-auto w-full max-w-sm rounded-2xl border border-border bg-card px-4 py-3 text-sm shadow-sm transition-colors hover:bg-muted"
    >
      {spotifyUrl ? (
        <a
          href={spotifyUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open "${track?.title}" by ${track?.artist} on Spotify`}
          className="flex items-center gap-3 outline-none"
        >
          {content}
        </a>
      ) : (
        <div className="flex items-center gap-3">{content}</div>
      )}

      <div className="mt-2 flex justify-end">
        <a
          href={track?.url ?? PROFILE_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="View on Last.fm"
          className="inline-flex items-center gap-1 font-mono text-[10px] text-muted-foreground outline-none transition-colors duration-500 hover:text-[#D51007] focus-visible:text-[#D51007]"
        >
          <Icon name="lastfm" className="size-3" />
          Last.fm
        </a>
      </div>
    </div>
  );
}
