"use client";

import { useEffect, useState } from "react";

const SYMS = ["AAPL", "NVDA", "TSLA", "MSFT", "AMZN", "GOOGL", "META"];

type Row = { s: string; v: number };

export default function LiveTicker() {
  const [data, setData] = useState<Row[]>(() =>
    SYMS.map((s) => ({ s, v: Math.random() * 5 - 1.5 }))
  );

  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) =>
        prev.map((d) => ({
          s: d.s,
          v: Math.max(-4.5, Math.min(6.5, d.v + (Math.random() - 0.5) * 0.5)),
        }))
      );
    }, 1100);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mx-auto mt-4 flex max-w-3xl items-center gap-3 overflow-hidden rounded-full border border-line-strong bg-white px-4 py-1.5 text-[11px]">
      <span className="shrink-0 font-mono font-semibold text-crimson">
        ● LIVE BASIS
      </span>
      <div className="flex flex-wrap gap-x-4 gap-y-0.5">
        {data.map((d) => (
          <span key={d.s} className="font-mono">
            <span className="text-ink-soft">{d.s}</span>{" "}
            <span className={d.v >= 0 ? "pos" : "neg"}>
              {d.v >= 0 ? "+" : ""}
              {d.v.toFixed(1)}%
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
