"use client";

import { useState, useRef, type FormEvent } from "react";
import { bondAgent } from "@/lib/meteora";
import type { Agent } from "@/lib/types";

const inputCls =
  "mt-1 w-28 rounded-lg border border-line-strong bg-paper px-3 py-2 text-sm uppercase text-ink outline-none focus:border-crimson";

export default function BondEarn({
  onBonded,
}: {
  onBonded: (a: Agent) => void;
}) {
  const [symbol, setSymbol] = useState("AAPL");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ pool: string; tvl: number } | null>(null);
  const [fees, setFees] = useState(0);
  const [err, setErr] = useState("");
  const feesRef = useRef(0);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setErr("");
    setResult(null);
    setFees(0);
    feesRef.current = 0;
    const sym = symbol.trim().toUpperCase();
    if (!/^[A-Z]{1,5}$/.test(sym)) {
      setErr("Enter a valid stock ticker (e.g. AAPL)");
      return;
    }
    setBusy(true);
    try {
      const r = await bondAgent(sym);
      setResult({ pool: r.pool, tvl: r.tvl });
      const id = setInterval(() => {
        feesRef.current += Math.random() * 0.4;
        setFees(feesRef.current);
      }, 700);
      setTimeout(() => {
        clearInterval(id);
        onBonded({
          symbol: sym,
          name: `${sym}-Agent`,
          clawpumpMint: "",
          meteoraPool: r.pool,
          thesis: `Bonded to ${sym} via Meteora DBC — earning on RWAs.`,
          feesEarned: +feesRef.current.toFixed(2),
          basisCaptured: 0,
          tvl: r.tvl,
          roi: 0,
          backers: 1,
        });
      }, 6000);
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Bond failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="panel mb-6 p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-serif text-base font-medium text-ink">
          Bond &amp; earn (Meteora DBC)
        </h3>
        <span className="chip border-crimson/40 text-crimson">
          dynamic bonding curve
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
        <button
          type="submit"
          disabled={busy}
          className="btn-solid disabled:opacity-50"
        >
          {busy ? "Bonding…" : "Bond to Meteora DBC"}
        </button>
      </form>

      {err && <p className="mt-3 text-xs text-rose-500">{err}</p>}

      {result && (
        <div className="mt-3 rounded-lg border border-crimson/30 bg-crimson/5 p-3 text-xs">
          <p className="accent">✓ pool live · earning on RWAs</p>
          <p className="mt-1 text-ink-soft">
            pool{" "}
            <span className="text-ink">
              {result.pool.slice(0, 8)}…{result.pool.slice(-4)}
            </span>
          </p>
          <p className="text-ink-soft">
            TVL <span className="text-ink">${result.tvl.toLocaleString()}</span> ·
            fees <span className="pos">${fees.toFixed(2)}</span>
          </p>
        </div>
      )}
    </div>
  );
}
