import { site } from "@/lib/content";
import {
  fetchPublicContributions,
  levelFromGraphQL,
  type Contributions,
} from "@/lib/contributions";

const USERNAME = site.username;
const TOKEN = process.env.GH_CONTRIB_TOKEN;

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
      level: levelFromGraphQL(day.contributionLevel),
    })),
  );

  return { total: calendar.totalContributions, days };
}

async function fromPublicApi(): Promise<Contributions> {
  const data = await fetchPublicContributions(USERNAME);
  if (!data) throw new Error("Public contributions API unavailable");
  return data;
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
