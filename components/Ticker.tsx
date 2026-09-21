"use client";
import { ANCHORS, STOCKS, pct } from '../lib/data';

type Row = { symbol: string; basis: number; fees: number };

const ROWS: Row[] = STOCKS.map((s, i) => {
  const a = ANCHORS[s.symbol];
  return {
    symbol: s.symbol,
    basis: ((a.xs - a.eq) / a.eq) * 100,
    fees: 96 + i * 47.6,
  };
});

function Row({ r }: { r: Row }) {
  const up = r.basis >= 0;
  return (
    <div className="flex items-center gap-3 whitespace-nowrap px-7">
      <span
        className="h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ background: up ? '#f0b429' : '#d99b2e' }}
      />
      <span className="font-mono text-[11px] tracking-[0.22em] text-[#7e97b4]">
        {r.symbol}X
      </span>
      <span
        className="font-mono text-[12px] font-medium"
        style={{ color: up ? '#ffe2b0' : '#ffe4b4' }}
      >
        {pct(r.basis)}
      </span>
      <span className="font-mono text-[10px] tracking-[0.16em] text-[#48647f]">
        basis
      </span>
      <span className="h-4 w-px bg-[rgba(214,182,116,0.18)]" />
    </div>
  );
}

export default function Ticker() {
  return (
    <div className="marquee-wrap relative overflow-hidden border-y border-[rgba(214,182,116,0.13)] bg-[rgba(25,18,8,0.72)]">
      <div className="py-3.5">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center">
              {ROWS.map((r) => (
                <Row key={`${copy}-${r.symbol}`} r={r} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#161006] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#161006] to-transparent" />
    </div>
  );
}
