"use client";
import { useEffect, useState } from 'react';
import { pct } from '../lib/data';

// REAL ticker: live basis per xStock from /api/basis (Jupiter on-chain px
// vs official equity reference). Shows '—' until first real fetch lands.
type Row = { symbol: string; basis: number | null };

function TickerRow({ r }: { r: Row }) {
  const up = (r.basis ?? 0) >= 0;
  return (
    <div className="flex items-center gap-3 whitespace-nowrap px-7">
      <span
        className="h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ background: up ? '#f0b429' : '#d99b2e' }}
      />
      <span className="font-mono text-[11px] tracking-[0.22em] text-[#7e97b4]">
        {r.symbol}x
      </span>
      <span
        className="font-mono text-[12px] font-medium"
        style={{ color: up ? '#ffe2b0' : '#ffe4b4' }}
      >
        {r.basis == null ? '—' : pct(r.basis)}
      </span>
      <span className="font-mono text-[10px] tracking-[0.16em] text-[#48647f]">
        basis
      </span>
      <span className="h-4 w-px bg-[rgba(214,182,116,0.18)]" />
    </div>
  );
}

export default function Ticker() {
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    let stop = false;
    const load = async () => {
      try {
        const res = await fetch('/api/basis', { cache: 'no-store' });
        if (!res.ok) return;
        const data = await res.json();
        if (stop || !data.rows) return;
        setRows(
          data.rows.map((r: any) => ({ symbol: r.symbol, basis: r.basisPct }))
        );
      } catch {
        /* keep last real values */
      }
    };
    load();
    const id = window.setInterval(load, 20000);
    return () => {
      stop = true;
      window.clearInterval(id);
    };
  }, []);

  if (rows.length === 0) return null;

  return (
    <div className="marquee-wrap relative overflow-hidden border-y border-[rgba(214,182,116,0.13)] bg-[rgba(25,18,8,0.72)]">
      <div className="py-3.5">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center">
              {rows.map((r) => (
                <TickerRow key={`${copy}-${r.symbol}`} r={r} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
