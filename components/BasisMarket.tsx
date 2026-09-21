"use client";

import { useEffect, useState } from "react";
import { simulatedTick, computeBasis } from "@/lib/pyth";
import { TRACKED_STOCKS } from "@/lib/constants";

const NOTIONAL = 100;

export default function BasisMarket() {
  const [symbol, setSymbol] = useState("AAPL");
  const [vals, setVals] = useState(() => simulatedTick("AAPL"));
  const [pos, setPos] = useState<null | { side: "long" | "short"; entry: number }>(
    null
  );

  useEffect(() => {
    const id = setInterval(() => setVals(simulatedTick(symbol)), 1500);
    return () => clearInterval(id);
  }, [symbol]);

  const basis = computeBasis(vals.eq, vals.xs, vals.on).basisPct;

  const pnlPct =
    pos && basis != null
      ? pos.side === "long"
        ? basis - pos.entry
        : pos.entry - basis
      : 0;
  const pnl = pos ? (NOTIONAL * pnlPct) / 100 : 0;

  return (
    <section id="basis-market" className="mt-12 px-5">
      <div className="mx-auto max-w-5xl">
        <div className="ornament">
          <span />◇<span />
        </div>
        <h2 className="display text-center">
          <span className="drop">T</span>rade the basis
        </h2>
        <p className="mx-auto mt-4 max-w-md text-center text-ink-soft">
          Long or short a stock&apos;s on-chain vs off-chain gap. Powered by Pyth
          + a Clawpump agent token.
        </p>

        <div className="panel mt-8 p-5">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {TRACKED_STOCKS.map((s) => (
              <button
                key={s.symbol}
                onClick={() => {
                  setSymbol(s.symbol);
                  setPos(null);
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
            <Feed label="Equity (real)" value={vals.eq} />
            <Feed label="xStock (on-chain)" value={vals.xs} />
            <Feed label="Basis" value={basis} suffix="%" />
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            {!pos ? (
              <>
                <button
                  onClick={() => setPos({ side: "long", entry: basis ?? 0 })}
                  className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800"
                >
                  ▲ Long basis
                </button>
                <button
                  onClick={() => setPos({ side: "short", entry: basis ?? 0 })}
                  className="rounded-lg bg-rose-700 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-800"
                >
                  ▼ Short basis
                </button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <span
                  className={`rounded-full border px-3 py-1 text-sm font-semibold ${
                    pos.side === "long"
                      ? "border-green-300/50 bg-green-500/5 text-green-700"
                      : "border-rose-400/50 bg-rose-500/5 text-rose-600"
                  }`}
                >
                  {pos.side.toUpperCase()} @ {pos.entry.toFixed(2)}%
                </span>
                <span className={`font-mono text-lg ${pnl >= 0 ? "pos" : "neg"}`}>
                  ${pnl.toFixed(2)}
                </span>
                <button onClick={() => setPos(null)} className="btn">
                  Close
                </button>
              </div>
            )}
            <span className="label">notional $100 · sim</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Feed({
  label,
  value,
  suffix = "",
}: {
  label: string;
  value: number | null;
  suffix?: string;
}) {
  return (
    <div className="rounded-xl border border-line-strong bg-paper p-4">
      <p className="label">{label}</p>
      <p className="mt-1 font-mono text-2xl font-semibold text-ink">
        {value == null ? "—" : `$${value.toFixed(2)}${suffix}`}
      </p>
    </div>
  );
}
