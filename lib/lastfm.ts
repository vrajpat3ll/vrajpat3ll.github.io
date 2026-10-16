const API_KEY = process.env.NEXT_PUBLIC_LASTFM_API_KEY;
const BASE_URL = "https://ws.audioscrobbler.com/2.0/";

// Last.fm's "no artwork" asset: one hash reused for every size, unlike real
// cover art which differs per size.
const PLACEHOLDER_HASH = "2a96cbd8b46e442fc41c2b86b821562f";

const ART_SIZES = ["mega", "extralarge", "large", "medium"];

export type Track = {
  title: string;
  artist: string;
  album: string;
  image: string | null;
  url: string;
  spotifyUrl: string | null;
  nowPlaying: boolean;
};

type LastfmImage = { "#text": string; size: string };

type LastfmTrack = {
  name: string;
  artist: { "#text": string };
  album: { "#text": string };
  image: LastfmImage[];
  url: string;
  "@attr"?: { nowplaying?: string };
};

export function isLastfmConfigured(): boolean {
  return Boolean(API_KEY);
}

export function spotifySearchUrl(track: {
  title: string;
  artist: string;
}): string | null {
  const query = `${track.artist} ${track.title}`.trim();
  if (!query) return null;
  return `https://open.spotify.com/search/${encodeURIComponent(query)}`;
}

function pickImage(images: LastfmImage[] | undefined): string | null {
  if (!images) return null;

  const bySize = new Map(
    images
      .filter((image) => image["#text"]?.length > 0)
      .map((image) => [image.size, image["#text"]]),
  );

  const candidates = [...bySize.values()];
  if (candidates.length === 0) return null;

  if (candidates.some((url) => url.includes(PLACEHOLDER_HASH))) return null;
  if (new Set(candidates).size === 1 && bySize.size > 1) return null;

  for (const size of ART_SIZES) {
    const url = bySize.get(size);
    if (url) return url;
  }

  return candidates[0];
}

export async function getRecentTrack(username: string): Promise<Track | null> {
  if (!API_KEY) return null;

  const params = new URLSearchParams({
    method: "user.getrecenttracks",
    user: username,
    api_key: API_KEY,
    format: "json",
    limit: "1",
  });

  const res = await fetch(`${BASE_URL}?${params.toString()}`);
  if (!res.ok) return null;

  const data = (await res.json()) as {
    recenttracks?: { track?: LastfmTrack | LastfmTrack[] };
  };

  const raw = data.recenttracks?.track;
  const track = Array.isArray(raw) ? raw[0] : raw;
  if (!track) return null;

  const title = track.name;
  const artist = track.artist?.["#text"] ?? "";

  return {
    title,
    artist,
    album: track.album?.["#text"] ?? "",
    image: pickImage(track.image),
    url: track.url,
    spotifyUrl: spotifySearchUrl({ title, artist }),
    nowPlaying: track["@attr"]?.nowplaying === "true",
  };
}
