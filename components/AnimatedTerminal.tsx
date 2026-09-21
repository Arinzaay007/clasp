"use client";

import { useEffect, useState } from "react";

const LINES: { t: string; c: string }[] = [
  { t: "$ clasp launch AAPL --clawpump --gasless", c: "text-slate-300" },
  { t: "✓ minted agent token · 0 SOL", c: "text-lime-300" },
  { t: "$ clasp bond AAPL --meteora-dbc", c: "text-slate-300" },
  { t: "✓ pool live · liquidity $12.4K", c: "text-lime-300" },
  { t: "$ clasp earn AAPL", c: "text-slate-300" },
  { t: "▸ fees $214.60 · ROI +6.4%", c: "text-cyan-300" },
  { t: "$ clasp brain AAPL --pyth", c: "text-slate-300" },
  { t: "✓ basis +3.1%  equity vs xStock", c: "text-lime-300" },
  { t: "$ clasp back AAPL", c: "text-slate-300" },
  { t: "✓ 312 backers · you're in", c: "text-cyan-300" },
];

export default function AnimatedTerminal() {
  const [n, setN] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setN((p) => (p + 1) % (LINES.length + 1)), 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="term">
      <div className="term-head">
        <span className="dot bg-rose-400" />
        <span className="dot bg-amber-300" />
        <span className="dot bg-lime-300" />
        <span className="ml-2">clasp://agent-terminal</span>
        <span className="ml-auto font-semibold text-lime-300">● live</span>
      </div>
      <div className="min-h-[220px] p-4 font-mono text-[12px] leading-relaxed">
        {LINES.slice(0, n).map((l, i) => (
          <div key={i} className={l.c}>
            {l.t}
          </div>
        ))}
        {n < LINES.length && (
          <span className="ml-0.5 inline-block h-3.5 w-2 animate-pulse bg-cyan-300 align-middle" />
        )}
      </div>
    </div>
  );
}
