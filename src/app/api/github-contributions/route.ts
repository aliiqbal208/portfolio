import { NextResponse } from "next/server";

const USERNAME = "aliiqbal208";
const GITHUB_GRAPHQL = "https://api.github.com/graphql";

const LEVEL_MAP: Record<string, 0 | 1 | 2 | 3 | 4> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const QUERY = `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json({ error: "GITHUB_TOKEN not set" }, { status: 500 });
  }

  const to = new Date();
  const from = new Date();
  from.setFullYear(from.getFullYear() - 1);

  try {
    const res = await fetch(GITHUB_GRAPHQL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { username: USERNAME, from: from.toISOString(), to: to.toISOString() },
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`GitHub API responded with ${res.status}`);

    const json = await res.json();

    if (json.errors) throw new Error(json.errors[0]?.message ?? "GraphQL error");

    const calendar = json.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) throw new Error("No calendar data in response");

    const contributions = (calendar.weeks as { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }[])
      .flatMap((w) =>
        w.contributionDays.map((d) => ({
          date: d.date,
          count: d.contributionCount,
          level: LEVEL_MAP[d.contributionLevel] ?? 0,
        }))
      );

    return NextResponse.json({ total: calendar.totalContributions as number, contributions });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch" },
      { status: 500 }
    );
  }
}
