const RESOLVER_URL = process.env.NEXT_PUBLIC_SPOTIFY_RESOLVER_URL;

export type ResolvableTrack = { title: string; artist: string };

export function isSpotifyResolverConfigured(): boolean {
  return Boolean(RESOLVER_URL);
}

/**
 * Asks the companion resolver for the canonical Spotify track URL. The resolver
 * holds the Spotify credentials (which cannot live in a static bundle), so this
 * only works once `NEXT_PUBLIC_SPOTIFY_RESOLVER_URL` points at a deployed
 * instance — see `workers/spotify-resolver`.
 */
export async function resolveSpotifyTrackUrl(
  track: ResolvableTrack,
  signal?: AbortSignal,
): Promise<string | null> {
  if (!RESOLVER_URL) return null;

  let url: URL;
  try {
    url = new URL(RESOLVER_URL);
  } catch {
    return null;
  }

  url.searchParams.set("title", track.title);
  url.searchParams.set("artist", track.artist);

  try {
    const res = await fetch(url, { signal });
    if (!res.ok) return null;

    const data = (await res.json()) as { songUrl?: unknown };
    return typeof data.songUrl === "string" && data.songUrl.length > 0
      ? data.songUrl
      : null;
  } catch {
    return null;
  }
}
