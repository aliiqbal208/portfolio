"use client";

import { useEffect, useRef, useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";

type Contribution = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

const BLOCK_MARGIN = 4;
const WEEKS = 53;

const theme = {
  dark: ["rgba(255,255,255,0.05)", "#0e3040", "#0b6a8a", "#0ea5c7", "#22d3ee"],
};

function calcBlockSize(containerWidth: number) {
  // total width = WEEKS * blockSize + (WEEKS - 1) * BLOCK_MARGIN
  const size = Math.floor((containerWidth - (WEEKS - 1) * BLOCK_MARGIN) / WEEKS);
  return Math.max(10, Math.min(22, size));
}

export default function GitHubGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [blockSize, setBlockSize] = useState(13);
  const [data, setData] = useState<Contribution[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setBlockSize(calcBlockSize(entry.contentRect.width));
    });
    ro.observe(el);
    setBlockSize(calcBlockSize(el.offsetWidth));
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    fetch("/api/github-contributions")
      .then((r) => r.json())
      .then((json) => {
        if (json.error) { setError(true); return; }
        setData(json.contributions);
        setTotal(json.total);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (error) {
    return (
      <p className="text-xs font-orbitron text-muted-foreground uppercase tracking-widest py-8 text-center">
        Could not load contributions
      </p>
    );
  }

  return (
    <div ref={containerRef} className="w-full space-y-3">
      {total !== null && (
        <p className="text-[10px] font-orbitron text-muted-foreground uppercase tracking-[0.2em]">
          <span className="text-ice font-bold">{total.toLocaleString()}</span> contributions in the last year
        </p>
      )}
      <ActivityCalendar
        data={loading ? [] : data}
        loading={loading}
        colorScheme="dark"
        theme={theme}
        blockSize={blockSize}
        blockMargin={BLOCK_MARGIN}
        fontSize={12}
        style={{ color: "#94a3b8", fontFamily: "inherit", width: "100%" }}
      />
    </div>
  );
}
