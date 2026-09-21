"use client";

import { useState } from "react";
import { TRACKED_STOCKS } from "@/lib/constants";

const FEE_SHARE_APY = 18; // % simulated

export default function HolderUtility() {
  const [symbol, setSymbol] = useState("AAPL");
  const [hold, setHold] = useState(1000);
  const annual = Math.max(0, (hold * FEE_SHARE_APY) / 100);

  return (
    <section id="hold" className="mt-12 px-5">
      <div className="mx-auto max-w-5xl">
        <div className="ornament">
          <span />◇<span />
        </div>
        <h2 className="display text-center">
          <span className="drop">H</span>old to earn
        </h2>
        <p className="mx-auto mt-4 max-w-md text-center text-ink-soft">
          Hold an agent token and take a slice of its RWA fees. Net fees buy
          back &amp; burn the token.
        </p>

        <div className="panel mt-8 p-5">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {TRACKED_STOCKS.map((s) => (
              <button
                key={s.symbol}
                onClick={() => setSymbol(s.symbol)}
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

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="label">Tokens held</label>
              <input
                type="number"
                min={0}
                value={hold}
                onChange={(e) => setHold(Math.max(0, +(e.target.value || 0)))}
                className="mt-1 w-32 rounded-lg border border-line-strong bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-crimson"
              />
            </div>
            <div className="rounded-xl border border-line-strong bg-paper p-4">
              <p className="label">Fee-share APY</p>
              <p className="mt-1 font-mono text-2xl font-semibold text-ink">
                {FEE_SHARE_APY}%
              </p>
            </div>
            <div className="rounded-xl border border-line-strong bg-paper p-4">
              <p className="label">Est. annual yield</p>
              <p className="mt-1 font-mono text-2xl font-semibold pos">
                ${annual.toLocaleString()}
              </p>
            </div>
          </div>

          <p className="mt-4 text-xs text-ink-soft">
            Net RWA fees → buyback &amp; burn ${symbol}-Agent. Simulated until
            mainnet keys land.
          </p>
        </div>
      </div>
    </section>
  );
}
