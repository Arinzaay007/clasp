"use client";

import { useState, type FormEvent } from "react";
import { launchAgent, agentFromLaunch } from "@/lib/clawpump";
import type { Agent, LaunchAgentParams } from "@/lib/types";

const inputCls =
  "mt-1 w-28 rounded-lg border border-line-strong bg-paper px-3 py-2 text-sm uppercase text-ink outline-none focus:border-crimson";

export default function LaunchAgent({
  onLaunched,
}: {
  onLaunched: (a: Agent) => void;
}) {
  const [symbol, setSymbol] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<LaunchResult | null>(null);
  const [err, setErr] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    setErr("");
    setResult(null);
    const sym = symbol.trim().toUpperCase();
    if (!/^[A-Z]{1,5}$/.test(sym)) {
      setErr("Enter a valid stock ticker (e.g. AAPL)");
      return;
    }
    setBusy(true);
    try {
      const params: LaunchAgentParams = {
        symbol: sym,
        name: name.trim() || `${sym}-Agent`,
        stockMint: "So11111111111111111111111111111111111111112",
      };
      const r = await launchAgent(params);
      setResult(r);
      onLaunched(agentFromLaunch(params, r));
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Launch failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="panel mb-6 p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-serif text-base font-medium text-ink">
          Launch a Stocknized Agent
        </h3>
        <span className="chip border-crimson/40 text-crimson">
          gasless · 0 SOL
        </span>
      </div>
      <form onSubmit={submit} className="flex flex-wrap items-end gap-3">
        <div>
          <label className="label">Stock</label>
          <input
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="AAPL"
            maxLength={5}
            className={inputCls}
          />
        </div>
        <div>
          <label className="label">Agent name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="AAPL-Theta"
            className="mt-1 w-44 rounded-lg border border-line-strong bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-crimson"
          />
        </div>
        <button
          type="submit"
          disabled={busy}
          className="btn-solid disabled:opacity-50"
        >
          {busy ? "Launching…" : "Launch gasless"}
        </button>
      </form>

      {err && <p className="mt-3 text-xs text-rose-500">{err}</p>}

      {result && (
        <div className="mt-3 rounded-lg border border-crimson/30 bg-crimson/5 p-3 text-xs">
          <p className="accent">✓ agent minted · 0 SOL</p>
          <p className="mt-1 text-ink-soft">
            mint{" "}
            <span className="text-ink">
              {result.mint.slice(0, 8)}…{result.mint.slice(-4)}
            </span>
          </p>
          <p className="text-ink-soft">
            pool{" "}
            <span className="text-ink">
              {result.pool.slice(0, 8)}…{result.pool.slice(-4)}
            </span>
          </p>
          <p className="text-ink-soft">
            tx{" "}
            <span className="text-ink">
              {result.signature.slice(0, 8)}…{result.signature.slice(-4)}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

import type { LaunchResult } from "@/lib/clawpump";
