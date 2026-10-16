const API_KEY = process.env.NEXT_PUBLIC_LASTFM_API_KEY;
const BASE_URL = "https://ws.audioscrobbler.com/2.0/";

export type Track = {
  title: string;
  artist: string;
  album: string;
  image: string | null;
  url: string;
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

  const image = track.image?.find((i) => i.size === "extralarge")?.["#text"];

  return {
    title: track.name,
    artist: track.artist?.["#text"] ?? "",
    album: track.album?.["#text"] ?? "",
    image: image && image.length > 0 ? image : null,
    url: track.url,
    nowPlaying: track["@attr"]?.nowplaying === "true",
  };
}
