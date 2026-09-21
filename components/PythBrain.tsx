"use client";

import { useEffect, useState } from "react";
import { getBasis, simulatedTick, computeBasis } from "@/lib/pyth";
import { TRACKED_STOCKS } from "@/lib/constants";
import type { BasisStatus } from "@/lib/types";

const STATUS_COLOR: Record<BasisStatus, string> = {
  rich: "border-green-300/50 bg-green-500/5 text-green-700",
  cheap: "border-amber-400/50 bg-amber-400/5 text-amber-700",
  fair: "border-line-strong bg-white text-ink-soft",
  stale: "border-rose-400/50 bg-rose-500/5 text-rose-600",
};

export default function PythBrain() {
  const [symbol, setSymbol] = useState("AAPL");
  const [vals, setVals] = useState(() => simulatedTick("AAPL"));
  const [dropped, setDropped] = useState(false);

  useEffect(() => {
    if (dropped) return;
    const id = setInterval(() => setVals(simulatedTick(symbol)), 1500);
    return () => clearInterval(id);
  }, [symbol, dropped]);

  const { basisPct, status } = computeBasis(
    dropped ? null : vals.eq,
    dropped ? null : vals.xs,
    dropped ? null : vals.on
  );

  return (
    <section id="brain" className="mt-12 px-5">
      <div className="mx-auto max-w-5xl">
        <div className="ornament">
          <span />◇<span />
        </div>
        <h2 className="display text-center">
          <span className="drop">P</span>yth brain — the basis
        </h2>
        <p className="sub mx-auto mt-4 max-w-md text-center text-ink-soft">
          Live equity vs xStock vs Ondo. Kill the feed and the agent refuses to
          trade blind.
        </p>

        <div className="panel mt-8 p-5">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {TRACKED_STOCKS.map((s) => (
              <button
                key={s.symbol}
                onClick={() => {
                  setSymbol(s.symbol);
                  setDropped(false);
                  setVals(simulatedTick(s.symbol));
                }}
                className={`rounded-full border px-3 py-1 text-xs transition ${
                  symbol === s.symbol
                    ? "border-crimson/50 bg-crimson/10 text-crimson"
                    : "border-line-strong text-ink-soft"
                }`}
              >
                ${s.symbol}
              </button>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <Feed label="Equity (real share)" value={dropped ? null : vals.eq} />
            <Feed label="xStock (24/7)" value={dropped ? null : vals.xs} />
            <Feed label="Ondo (24/7)" value={dropped ? null : vals.on} />
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="label">basis (xStock vs equity)</p>
              <p
                className={`mt-1 text-3xl font-bold ${
                  status === "rich"
                    ? "text-green-700"
                    : status === "cheap"
                    ? "text-amber-700"
                    : status === "stale"
                    ? "text-rose-600"
                    : "text-ink"
                }`}
              >
                {basisPct == null ? "—" : `${basisPct > 0 ? "+" : ""}${basisPct.toFixed(2)}%`}
              </p>
            </div>

            {dropped ? (
              <span
                className={`rounded-full border px-4 py-2 text-sm font-semibold ${STATUS_COLOR.stale}`}
              >
                ⛔ AGENT STANDBY — Pyth feed lost, refuses to trade blind
              </span>
            ) : (
              <span
                className={`rounded-full border px-4 py-2 text-sm font-semibold ${STATUS_COLOR[status]}`}
              >
                {status.toUpperCase()}
              </span>
            )}

            <button onClick={() => setDropped((d) => !d)} className="btn">
              {dropped ? "Restore Pyth feed" : "Simulate Pyth drop"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Feed({ label, value }: { label: string; value: number | null }) {
  return (
    <div className="rounded-xl border border-line-strong bg-paper p-4">
      <p className="label">{label}</p>
      <p className="mt-1 font-mono text-2xl font-semibold text-ink">
        {value == null ? "—" : `$${value.toFixed(2)}`}
      </p>
    </div>
  );
}
