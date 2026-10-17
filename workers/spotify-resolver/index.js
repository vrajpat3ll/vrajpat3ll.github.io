const TOKEN_URL = "https://accounts.spotify.com/api/token";
const SEARCH_URL = "https://api.spotify.com/v1/search";

let cachedToken = null;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Max-Age": "86400",
};

function json(body, status = 200, extra = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS, ...extra },
  });
}

async function getToken(env) {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 30_000) {
    return cachedToken.value;
  }

  const basic = btoa(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`);
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) throw new Error(`token_request_failed_${res.status}`);

  const data = await res.json();
  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
  return cachedToken.value;
}

export default {
  async fetch(request, env, ctx) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS });
    }
    if (request.method !== "GET") {
      return json({ error: "method_not_allowed" }, 405);
    }

    const url = new URL(request.url);
    const title = url.searchParams.get("title")?.trim();
    const artist = url.searchParams.get("artist")?.trim();

    if (!title || !artist) {
      return json({ error: "missing_title_or_artist" }, 400);
    }

    const cache = caches.default;
    const cacheKey = new Request(
      `https://spotify-resolver.internal/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`,
    );
    const hit = await cache.match(cacheKey);
    if (hit) {
      return new Response(hit.body, {
        headers: {
          "Content-Type": "application/json",
          ...CORS,
          "X-Cache": "HIT",
        },
      });
    }

    try {
      const token = await getToken(env);
      const query = `track:"${title}" artist:"${artist}"`;
      const res = await fetch(
        `${SEARCH_URL}?type=track&limit=1&q=${encodeURIComponent(query)}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (!res.ok) return json({ error: `search_failed_${res.status}` }, 502);

      const data = await res.json();
      const track = data?.tracks?.items?.[0];
      if (!track) return json({ songUrl: null }, 404);

      const body = JSON.stringify({
        songUrl: track.external_urls?.spotify ?? null,
        title: track.name,
        artist: (track.artists ?? []).map((a) => a.name).join(", "),
        album: track.album?.name ?? null,
        albumImageUrl: track.album?.images?.[0]?.url ?? null,
      });

      ctx?.waitUntil(
        cache.put(
          cacheKey,
          new Response(body, {
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "public, max-age=3600",
            },
          }),
        ),
      );

      return new Response(body, {
        headers: {
          "Content-Type": "application/json",
          ...CORS,
          "X-Cache": "MISS",
        },
      });
    } catch (error) {
      return json({ error: String(error?.message ?? error) }, 500);
    }
  },
};
