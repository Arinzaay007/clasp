"use client";

import type { Agent } from "@/lib/types";

function spark(seed: number): string {
  const pts: string[] = [];
  let v = 10;
  let s = Math.floor(seed) % 233280 || 7;
  for (let i = 0; i < 12; i++) {
    s = (s * 9301 + 49297) % 233280;
    const r = s / 233280;
    v += (r - 0.5) * 6;
    v = Math.max(2, Math.min(18, v));
    pts.push(`${(i / 11) * 100},${v.toFixed(1)}`);
  }
  return pts.join(" ");
}

export default function StockGrid({
  agents,
  onBack,
  onCopy,
}: {
  agents: Agent[];
  onBack: (a: Agent) => void;
  onCopy: (a: Agent) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {agents.map((a) => (
        <div
          key={`${a.symbol}-${a.name}`}
          className="panel overflow-hidden"
        >
          <div className="term-head">
            <span className="font-serif text-lg font-semibold text-ink">
              {a.symbol}
            </span>
            <span className="text-ink-soft">{a.name}</span>
            <span className="ml-auto flex items-center gap-2">
              <span className="rounded-full border border-line-strong px-2 py-0.5 text-[10px] text-ink-soft">
                {a.basisCaptured}% basis
              </span>
              <span
                className={`font-semibold ${a.roi >= 0 ? "pos" : "neg"}`}
              >
                {a.roi >= 0 ? "+" : ""}
                {a.roi}%
              </span>
            </span>
          </div>
          <div className="p-4">
            <p className="text-xs leading-relaxed text-ink-soft">{a.thesis}</p>
            <svg
              viewBox="0 0 100 20"
              className="mt-3 h-10 w-full"
              preserveAspectRatio="none"
            >
              <polyline
                points={spark(a.tvl + a.feesEarned)}
                fill="none"
                stroke={a.roi >= 0 ? "#1f7a3d" : "#b3413a"}
                strokeWidth="1.5"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
            <div className="mt-3 grid grid-cols-4 gap-2 text-center text-[11px]">
              <div>
                <p className="pos font-semibold">${a.feesEarned}</p>
                <p className="text-ink-soft">fees</p>
              </div>
              <div>
                <p className="font-semibold text-ink">{a.basisCaptured}%</p>
                <p className="text-ink-soft">basis</p>
              </div>
              <div>
                <p className="font-semibold text-ink">${a.tvl / 1000}k</p>
                <p className="text-ink-soft">tvl</p>
              </div>
              <div>
                <p className="font-semibold text-ink">{a.backers}</p>
                <p className="text-ink-soft">backers</p>
              </div>
            </div>
            <button
              className="btn-solid mt-4 w-full"
              onClick={() => onBack(a)}
            >
              Back this agent
            </button>
            <button
              className="mt-2 w-full rounded-md border border-line-strong py-2 text-xs text-ink-soft transition hover:border-crimson hover:text-crimson"
              onClick={() => onCopy(a)}
            >
              Copy agent
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
