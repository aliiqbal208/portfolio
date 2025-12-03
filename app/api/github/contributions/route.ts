export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const username = process.env.GITHUB_USERNAME || "your-github-username"
  const token = process.env.GITHUB_TOKEN

  if (!token) {
    return new Response(
      JSON.stringify({ error: "Missing GITHUB_TOKEN env var" }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      },
    )
  }

  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              firstDay
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
        }
      }
    }
  `

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { login: username } }),
    cache: "no-store", // no caching → always fresh
  })

  if (!res.ok) {
    const text = await res.text()
    return new Response(
      JSON.stringify({ error: "GitHub API error", details: text }),
      {
        status: 502,
        headers: { "content-type": "application/json" },
      },
    )
  }

  const json = await res.json()
  const calendar =
    json?.data?.user?.contributionsCollection?.contributionCalendar

  return new Response(
    JSON.stringify({
      total: calendar?.totalContributions ?? 0,
      calendar: { weeks: calendar?.weeks ?? [] },
    }),
    {
      status: 200,
      headers: {
        "content-type": "application/json",
        "cache-control": "no-store",
      },
    },
  )
}
