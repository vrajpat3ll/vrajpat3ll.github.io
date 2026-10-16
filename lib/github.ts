const USERNAME = "vrajpat3ll";
const TOKEN = process.env.GH_CONTRIB_TOKEN;

export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type Contributions = {
  total: number;
  days: ContributionDay[];
};

const LEVELS: Record<string, ContributionDay["level"]> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

async function fromGraphQL(): Promise<Contributions> {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": `${USERNAME}-site`,
    },
    body: JSON.stringify({
      query: `query($login:String!){ user(login:$login){ contributionsCollection { contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount contributionLevel } }
      } } } }`,
      variables: { login: USERNAME },
    }),
  });

  if (!res.ok) throw new Error(`GitHub GraphQL ${res.status}`);

  const json = (await res.json()) as {
    data?: {
      user?: {
        contributionsCollection?: {
          contributionCalendar?: {
            totalContributions: number;
            weeks: {
              contributionDays: {
                date: string;
                contributionCount: number;
                contributionLevel: string;
              }[];
            }[];
          };
        };
      };
    };
  };

  const calendar =
    json.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) throw new Error("No contribution calendar in response");

  const days = calendar.weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: LEVELS[day.contributionLevel] ?? 0,
    })),
  );

  return { total: calendar.totalContributions, days };
}

async function fromPublicApi(): Promise<Contributions> {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`,
    { headers: { "User-Agent": `${USERNAME}-site` } },
  );

  if (!res.ok) throw new Error(`Public contributions API ${res.status}`);

  const json = (await res.json()) as {
    total: Record<string, number>;
    contributions: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[];
  };

  const total = Object.values(json.total ?? {}).reduce((a, b) => a + b, 0);

  return {
    total,
    days: json.contributions.map((d) => ({
      date: d.date,
      count: d.count,
      level: (Math.min(Math.max(d.level, 0), 4) as ContributionDay["level"]),
    })),
  };
}

export async function getContributions(): Promise<Contributions | null> {
  try {
    return TOKEN ? await fromGraphQL() : await fromPublicApi();
  } catch {
    try {
      return await fromPublicApi();
    } catch {
      return null;
    }
  }
}
