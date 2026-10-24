export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type Contributions = {
  total: number;
  days: ContributionDay[];
};

const PUBLIC_API = "https://github-contributions-api.jogruber.de/v4";

const LEVELS: Record<string, ContributionDay["level"]> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

export function levelFromGraphQL(level: string): ContributionDay["level"] {
  return LEVELS[level] ?? 0;
}

type PublicApiResponse = {
  total?: Record<string, number>;
  contributions?: { date: string; count: number; level: number }[];
};

export function parsePublicContributions(
  json: PublicApiResponse,
): Contributions | null {
  if (!Array.isArray(json.contributions) || json.contributions.length === 0) {
    return null;
  }

  const total = Object.values(json.total ?? {}).reduce((a, b) => a + b, 0);

  return {
    total,
    days: json.contributions.map((day) => ({
      date: day.date,
      count: day.count,
      level: Math.min(Math.max(day.level, 0), 4) as ContributionDay["level"],
    })),
  };
}

/**
 * Reads the calendar from the public contributions API. Safe to call from the
 * browser (the API sends `Access-Control-Allow-Origin: *`), so the heatmap can
 * refresh after the static build. Returns `null` on any failure.
 *
 * Avoid passing Next's `cache` option while prerendering — a `no-store` server
 * fetch marks the route dynamic, which `output: "export"` rejects.
 */
export async function fetchPublicContributions(
  username: string,
  options: { signal?: AbortSignal; cache?: RequestCache } = {},
): Promise<Contributions | null> {
  try {
    const res = await fetch(
      `${PUBLIC_API}/${encodeURIComponent(username)}?y=last`,
      { cache: options.cache, signal: options.signal },
    );

    if (!res.ok) return null;

    return parsePublicContributions((await res.json()) as PublicApiResponse);
  } catch {
    return null;
  }
}
