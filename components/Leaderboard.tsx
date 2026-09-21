"use client";

import type { Agent } from "@/lib/types";

export default function Leaderboard({
  agents,
  onCopy,
}: {
  agents: Agent[];
  onCopy: (a: Agent) => void;
}) {
  const top = [...agents]
    .sort((a, b) => b.feesEarned - a.feesEarned)
    .slice(0, 5);

  return (
    <div className="mt-10">
      <div className="ornament">
        <span />◇<span />
      </div>
      <h2 className="display text-center">
        <span className="drop">T</span>op agents
      </h2>
      <div className="panel mt-6 overflow-hidden">
        <div className="term-head">
          <span className="w-6">#</span>
          <span>Agent</span>
          <span className="ml-auto">Fees</span>
          <span className="ml-4">Basis</span>
          <span className="ml-4">ROI</span>
          <span className="ml-4 w-14 text-right">Copy</span>
        </div>
        {top.map((a, i) => (
          <div
            key={`${a.symbol}-${a.name}`}
            className="flex items-center gap-3 border-b border-line px-4 py-3 text-sm last:border-0"
          >
            <span className="w-6 font-mono text-ink-soft">{i + 1}</span>
            <span className="font-serif text-lg font-medium text-ink">
              {a.symbol}
            </span>
            <span className="text-ink-soft">{a.name}</span>
            <span className="ml-auto font-mono pos">${a.feesEarned}</span>
            <span className="ml-4 font-mono text-ink-soft">
              {a.basisCaptured}%
            </span>
            <span
              className={`ml-4 font-mono ${a.roi >= 0 ? "pos" : "neg"}`}
            >
              {a.roi >= 0 ? "+" : ""}
              {a.roi}%
            </span>
            <button
              onClick={() => onCopy(a)}
              className="btn ml-4 w-14 px-2 py-1 text-xs"
            >
              Copy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
