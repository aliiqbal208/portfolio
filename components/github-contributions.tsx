"use client"

import useSWR from "swr"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

type Day = { date: string; contributionCount: number; color?: string }
type Week = { firstDay: string; contributionDays: Day[] }

const fetcher = (url: string) => fetch(url, { cache: "no-store" }).then((r) => r.json())

function getLevel(count: number) {
  if (count === 0) return 0
  if (count < 2) return 1
  if (count < 4) return 2
  if (count < 7) return 3
  return 4
}

const THEMES: Record<string, { label: string; palette: string[] }> = {
  github: {
    label: "GitHub Green",
    palette: ["#2a2f3a", "#0e4429", "#006d32", "#26a641", "#39d353"],
  },
  ocean: {
    label: "Ocean Blue",
    palette: ["#222833", "#304b75", "#3f6db3", "#58a6ff", "#8ec2ff"],
  },
  gray: {
    label: "Neutral Gray",
    palette: ["#2a2f3a", "#3a3f4a", "#5a616e", "#7b8496", "#a1acc2"],
  },
  purple: {
    label: "Purple",
    palette: ["#2a2236", "#4b2f6b", "#6e41a1", "#8f60c9", "#b18af0"],
  },
  fire: {
    label: "Fire",
    palette: ["#332727", "#7a2c2c", "#b13a2e", "#e25822", "#ff8a3d"],
  },
}

export default function GitHubContributions({
  username = "aliiqbal208", 
}: {
  username?: string
}) {
  const { data, error, isLoading } = useSWR(
    `/api/github/contributions?username=${encodeURIComponent(username)}`,
    fetcher,
    { refreshInterval: 30_000 },
  )

  const weeks: Week[] = data?.calendar?.weeks ?? []

  const total =
    weeks && weeks.length > 0
      ? weeks.reduce(
          (sum: number, w: Week) =>
            sum + w.contributionDays.reduce((s: number, d: Day) => s + (d?.contributionCount ?? 0), 0),
          0,
        )
      : 0

  const [themeKey, setThemeKey] = useState<keyof typeof THEMES>("github")
  const palette = THEMES[themeKey].palette

  const scrollerRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    const onPointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true
      startXRef.current = e.clientX
      scrollLeftRef.current = el.scrollLeft
      el.setPointerCapture(e.pointerId)
      el.style.cursor = "grabbing"
    }
    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return
      const dx = e.clientX - startXRef.current
      el.scrollLeft = scrollLeftRef.current - dx
    }
    const onPointerUp = (e: PointerEvent) => {
      isDraggingRef.current = false
      try {
        el.releasePointerCapture(e.pointerId)
      } catch {}
      el.style.cursor = ""
    }

    el.addEventListener("pointerdown", onPointerDown)
    el.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", onPointerUp)

    return () => {
      el.removeEventListener("pointerdown", onPointerDown)
      el.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", onPointerUp)
    }
  }, [])

  return (
    <div
      className="font-mono w-full mx-auto mb-6 p-4 rounded-xl backdrop-blur-md bg-black/60 border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
      aria-live="polite"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-3">
        <div className="flex items-center gap-3">
          <h3 className="font-bold text-xl">My GitHub</h3>
          {!isLoading && !error && (
            <span className="text-white px-2 py-1 font-bold border-2 border-white border-dashed bg-slate-900 rounded-xl text-xs">
              Total: {total?.toLocaleString?.() ?? "—"}
            </span>
          )}
        </div>

        <label className="flex items-center gap-2 text-xs sm:text-sm">
          <span className="opacity-70 font-semibold underline">Theme</span>
          <select
            className="text-white rounded-md px-2 py-1 outline-none font-semibold border-2 border-white bg-slate-900 border-dashed text-xs"
            value={themeKey}
            onChange={(e) => setThemeKey(e.target.value as keyof typeof THEMES)}
            aria-label="Select contributions theme"
          >
            {Object.entries(THEMES).map(([key, t]) => (
              <option key={key} value={key}>
                {t.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error && <p className="text-sm opacity-70">Couldn’t Load Contributions. Please Check GITHUB_TOKEN.</p>}
      {isLoading && <p className="text-sm opacity-70">Loading Contributions...</p>}

      {!isLoading && !error && weeks.length > 0 && (
        <div
          ref={scrollerRef}
          className="no-scrollbar overflow-x-auto select-none cursor-grab active:cursor-grabbing"
          role="region"
          aria-label="GitHub contributions calendar"
        >
          <div className="grid grid-flow-col auto-cols-max gap-[4px] pr-2">
            {weeks.map((week: Week, wi: number) => (
              <div key={wi} className="grid grid-rows-7 gap-[4px]">
                {week.contributionDays.map((day, di) => {
                  const lvl = getLevel(day.contributionCount)
                  const bg = palette[lvl] ?? palette[0]
                  const isEmpty = lvl === 0
                  return (
                    <div
                      key={di}
                      className={`h-[12px] w-[12px] sm:h-[13px] sm:w-[13px] rounded-[3px] transition-colors duration-150 ${
                        isEmpty ? "ring-1 ring-white/5" : ""
                      }`}
                      style={{ backgroundColor: bg }}
                      title={`${day.date}: ${day.contributionCount} contributions`}
                      aria-label={`${day.date}: ${day.contributionCount} contributions`}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {!isLoading && !error && weeks.length > 0 && (
        <div className="mt-3 flex items-center gap-2 text-xs opacity-70">
          <span className="font-semibold text-xs">Less</span>
          <div className="flex items-center gap-[4px]">
            {[0, 1, 2, 3, 4].map((lvl) => (
              <span
                key={lvl}
                className={`h-[10px] w-[10px] rounded-[2px] ${lvl === 0 ? "ring-1 ring-white/10" : ""}`}
                style={{ backgroundColor: palette[lvl] }}
              />
            ))}
          </div>
          <span className="font-semibold text-xs">More</span>
          <Link
            href={`https://github.com/aliiqbal208`}
            target="_blank"
            className="ml-auto underline hover:opacity-100 opacity-70 text-sm font-semibold"
          >
            @github
          </Link>
        </div>
      )}

      <p className="mt-3 opacity-60 text-sm tracking-tighter font-medium">
        Drag to Pan. Live Updates via GitHub GraphQL API.
      </p>
    </div>
  )
}
