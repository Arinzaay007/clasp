"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronRight,
  CircleDot,
  Gauge,
  Radio,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import {
  AGENTS,
  ANCHORS,
  STOCKS,
  compactUsd,
  num,
  pct,
  sparkPoints,
} from '../lib/data';
import { AnimatedNumber, Reveal, scrollToId, useCountdown } from '../lib/motion';

const buildSeries = (base: number) => {
  const out: number[] = [];
  let v = base * 0.9925;
  for (let i = 0; i < 32; i++) {
    v +=
      (Math.sin(i / 2.7) + Math.sin(i / 1.42) * 0.55) * base * 0.0017 +
      base * 0.00046;
    out.push(v);
  }
  return out;
};

const STATUS = {
  rich: {
    label: 'Rich vs equity',
    color: '#f0b429',
    bg: 'rgba(240,180,41,0.12)',
    border: 'rgba(240,180,41,0.4)',
  },
  cheap: {
    label: 'Cheap vs equity',
    color: '#d99b2e',
    bg: 'rgba(217,155,46,0.12)',
    border: 'rgba(217,155,46,0.4)',
  },
  fair: {
    label: 'Fair value',
    color: '#9fc0dc',
    bg: 'rgba(214,182,116,0.1)',
    border: 'rgba(214,182,116,0.3)',
  },
} as const;

export default function Hero() {
  const cd = useCountdown();
  const [symbol, setSymbol] = useState('NVDA');
  const topAgent = AGENTS.find((a) => a.symbol === symbol) ?? AGENTS[0];

  // REAL data: /api/basis reads Jupiter on-chain xStock prices + official
  // equity reference. No simulation — if the feed is down we show stale.
  type LiveRow = {
    symbol: string;
    xstockUsd: number | null;
    equityRefUsd: number | null;
    basisPct: number | null;
    status: 'rich' | 'cheap' | 'fair' | 'stale';
    liquidityUsd: number | null;
    change24hPct: number | null;
  };
  const [live, setLive] = useState<Record<string, LiveRow>>({});
  const [asOf, setAsOf] = useState<string | null>(null);
  const [history, setHistory] = useState<Record<string, number[]>>({});

  useEffect(() => {
    let stop = false;
    const load = async () => {
      try {
        const res = await fetch('/api/basis', { cache: 'no-store' });
        if (!res.ok) return;
        const data = await res.json();
        if (stop || !data.rows) return;
        const map: Record<string, LiveRow> = {};
        for (const r of data.rows) map[r.symbol] = r;
        setLive(map);
        setAsOf(data.asOf ?? null);
        setHistory((prev) => {
          const next = { ...prev };
          for (const r of data.rows) {
            if (r.xstockUsd == null) continue;
            const arr = [...(next[r.symbol] ?? []), r.xstockUsd];
            next[r.symbol] = arr.slice(-40);
          }
          return next;
        });
      } catch {
        /* keep last real values; never fabricate */
      }
    };
    load();
    const id = window.setInterval(load, 15000);
    return () => {
      stop = true;
      window.clearInterval(id);
    };
  }, []);

  const row = live[symbol];
  const eq = row?.equityRefUsd ?? null;
  const xs = row?.xstockUsd ?? null;
  const basis = row?.basisPct ?? null;
  const status = row?.status ?? 'stale';
  const meta = STATUS[status === 'stale' ? 'fair' : status];
  const rawSeries = history[symbol] ?? [];
  const series =
    rawSeries.length >= 2
      ? rawSeries
      : rawSeries.length === 1
        ? [rawSeries[0], rawSeries[0]]
        : [0, 0];

  const RADIUS = 46;
  const CIRC = 2 * Math.PI * RADIUS;
  const arc = Math.min(96, 22 + Math.abs(basis ?? 0) * 36);

  return (
    <section className="relative isolate overflow-hidden">
      {/* ------------------------------ backdrop ------------------------------ */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(115%_85%_at_12%_8%,rgba(24,17,7,0.42),rgba(22,16,6,0.9)_58%,#161006_100%)]" />
        <div className="grid-bg absolute inset-0 opacity-80" />
        {/* oversized brand mark watermark */}
        <img
          src="/uploads/clasp-logo.jpg"
          alt=""
          aria-hidden
          className="logo-gold pointer-events-none absolute right-[-12%] top-[2%] w-[1280px] max-w-none rounded-[96px] opacity-[0.34] mix-blend-screen blur-[1.5px]"
        />
        <div className="glow-shift pointer-events-none absolute right-[3%] top-[13%] h-[760px] w-[760px] rounded-full bg-[radial-gradient(circle,rgba(240,180,41,0.2),transparent_64%)] blur-[10px]" />
        <div className="glow-shift absolute -left-32 top-0 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(240,180,41,0.2),transparent_66%)] blur-[10px]" />
        <div
          className="glow-shift absolute -right-24 top-28 h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(217,155,46,0.15),transparent_66%)] blur-[10px]"
          style={{ animationDelay: '2.8s' }}
        />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#161006] to-transparent" />
      </div>

      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-14 px-6 pb-24 pt-14 lg:grid-cols-[1.04fr_0.96fr] lg:gap-10 lg:pb-28 lg:pt-20">
        {/* ================================ copy ================================ */}
        <div>
          <Reveal>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="chip chip-aqua">
                <Radio className="h-3 w-3" strokeWidth={2.6} />
                Live on Solana
              </span>
              <span className="chip">
                <Sparkles className="h-3 w-3" strokeWidth={2.4} />
                Live basis engine
              </span>
              <span className="chip chip-volt">
                <CircleDot className="h-3 w-3" strokeWidth={2.6} />
                RWA yield
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-7 font-display text-[clamp(2.55rem,6.2vw,4.65rem)] font-bold leading-[0.99] tracking-[-0.032em] text-[#f2f8ff]">
              Know the <span className="grad-text">true price</span> of a
              tokenized stock — even at 3am.
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-[560px] text-[16.5px] leading-[1.72] text-[#9db2cb]">
              CLASP launches AI agents onto Solana as tokens, bonds them to
              tokenized stocks through{' '}
              <span className="font-medium text-[#cfe6f8]">
                bonding curves quoted in xStocks
              </span>
              , and lets them earn real fees on RWAs — with a{' '}
              <span className="font-medium text-[#cfe6f8]">live on-chain basis engine</span> as
              the brain. Back the agents that win.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => scrollToId('#launch')}
                className="btn-primary"
              >
                Launch your agent
                <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
              </button>
              <button
                type="button"
                onClick={() => scrollToId('#terminal')}
                className="btn-ghost"
              >
                Explore the terminal
                <ChevronRight className="h-4 w-4" strokeWidth={2.4} />
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="hairline mt-11 max-w-[560px]" />
            <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-4">
              {[
                { k: 'Stocks tracked live', v: STOCKS.length, suf: '', dec: 0 },
                { k: 'Mainnet proof txs', v: 4, suf: '', dec: 0 },
                { k: 'Agent tokens live', v: 2, suf: '', dec: 0 },
                { k: 'Cost to launch', v: 0.013, pre: '~', suf: ' SOL', dec: 3 },
              ].map((s, i) => (
                <div key={s.k}>
                  <dt className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-[#6c86a4]">
                    {s.k}
                  </dt>
                  <dd className="mt-2 font-display text-[26px] font-semibold leading-none tracking-[-0.02em] text-[#e7f2ff]">
                    <AnimatedNumber
                      value={s.v}
                      decimals={s.dec}
                      prefix={s.pre ?? ''}
                      suffix={s.suf ?? ''}
                      duration={1200 + i * 160}
                    />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* ============================== terminal ============================== */}
        <Reveal delay={0.18} className="relative">
          <div
            aria-hidden
            className="absolute -inset-6 -z-10 rounded-[42px] bg-[radial-gradient(circle_at_50%_20%,rgba(240,180,41,0.18),transparent_66%)] blur-2xl"
          />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="glass-deep grad-border overflow-hidden rounded-[26px] shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)]"
          >
            {/* header */}
            <div className="flex items-center justify-between gap-3 border-b border-[rgba(214,182,116,0.14)] px-5 py-4">
              <div className="flex items-center gap-2.5">
                <img
                  src="/uploads/clasp-logo.jpg"
                  alt=""
                  className="logo-gold h-8 w-8 rounded-[10px] border border-[rgba(240,180,41,0.32)] object-cover"
                />
                <div>
                  <p className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-[#ffd88e]">
                    CLASP Terminal
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#68809c]">
                    Basis engine · on-chain feeds
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-[rgba(240,180,41,0.28)] bg-[rgba(240,180,41,0.09)] px-2.5 py-1.5">
                <span className="live-dot h-1.5 w-1.5 rounded-full bg-[#f0b429]" />
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#ffe0a0]">
                  Streaming
                </span>
              </div>
            </div>

            {/* symbol tabs */}
            <div className="flex gap-1.5 overflow-x-auto px-5 pt-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {STOCKS.map((s) => (
                <button
                  key={s.symbol}
                  type="button"
                  onClick={() => setSymbol(s.symbol)}
                  className={`shrink-0 rounded-full border px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] transition-all duration-300 ${
                    symbol === s.symbol
                      ? 'border-[rgba(240,180,41,0.5)] bg-[rgba(240,180,41,0.14)] text-[#ffedcb]'
                      : 'border-[rgba(214,182,116,0.18)] text-[#7290ac] hover:border-[rgba(240,180,41,0.34)] hover:text-[#a8c6de]'
                  }`}
                >
                  {s.symbol}
                </button>
              ))}
            </div>

            {/* basis headline */}
            <div className="flex items-end justify-between gap-4 px-5 pt-5">
              <div>
                <p className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-[#6c86a4]">
                  Xstock vs equity basis
                </p>
                <div className="mt-2 flex items-baseline gap-3">
                  <span
                    className="font-display text-[46px] font-bold leading-none tracking-[-0.035em]"
                    style={{ color: meta.color }}
                  >
                    {basis == null ? '—' : pct(basis)}
                  </span>
                  <span
                    className="rounded-full border px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-[0.18em]"
                    style={{
                      color: meta.color,
                      background: meta.bg,
                      borderColor: meta.border,
                    }}
                  >
                    {meta.label}
                  </span>
                </div>
                <p className="mt-2 text-[11px] text-[#65809c]">
                  {symbol} · {STOCKS.find((s) => s.symbol === symbol)?.name}
                </p>
              </div>

              {/* gauge */}
              <div className="relative shrink-0">
                <svg viewBox="0 0 120 120" className="h-[104px] w-[104px]">
                  <defs>
                    <linearGradient id="heroGauge" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#f0b429" />
                      <stop offset="100%" stopColor="#d99b2e" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="60"
                    cy="60"
                    r={RADIUS}
                    fill="none"
                    stroke="rgba(214,182,116,0.16)"
                    strokeWidth="9"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r={RADIUS}
                    fill="none"
                    stroke="url(#heroGauge)"
                    strokeWidth="9"
                    strokeLinecap="round"
                    strokeDasharray={`${(CIRC * arc) / 100} ${CIRC}`}
                    transform="rotate(-90 60 60)"
                    style={{ transition: 'stroke-dasharray 900ms ease' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Gauge className="h-3.5 w-3.5 text-[#5f7b98]" strokeWidth={2.2} />
                  <span className="mt-1 font-mono text-[9px] tracking-[0.16em] text-[#7c97b4]">
                    BASIS
                  </span>
                </div>
              </div>
            </div>

            {/* sparkline */}
            <div className="mt-4 px-5">
              <div className="relative overflow-hidden rounded-2xl border border-[rgba(214,182,116,0.13)] bg-[rgba(214,182,116,0.05)] p-2">
                <svg
                  viewBox="0 0 320 82"
                  className="h-[82px] w-full"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id="heroFill"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#f0b429"
                        stopOpacity="0.34"
                      />
                      <stop
                        offset="100%"
                        stopColor="#f0b429"
                        stopOpacity="0"
                      />
                    </linearGradient>
                    <linearGradient
                      id="heroStroke"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#f0b429" />
                      <stop offset="100%" stopColor="#d99b2e" />
                    </linearGradient>
                  </defs>
                  <polyline
                    points={`4,78 ${sparkPoints(series, 312, 74, 2)}`}
                    fill="none"
                    stroke="url(#heroStroke)"
                    strokeWidth="2.4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                  <polygon
                    points={`4,78 ${sparkPoints(
                      series,
                      312,
                      74,
                      2
                    )} 316,78`}
                    fill="url(#heroFill)"
                  />
                </svg>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between px-3 pb-1.5">
                  <span className="font-mono text-[8px] tracking-[0.18em] text-[#4f6b87]">
                    -32M
                  </span>
                  <span className="font-mono text-[8px] tracking-[0.18em] text-[#4f6b87]">
                    LIVE
                  </span>
                </div>
              </div>
            </div>

            {/* price rows */}
            <div className="mt-4 space-y-px px-5">
              {[
                {
                  label: 'Equity reference',
                  feed: 'xStocks official ref',
                  value: eq,
                  tint: '#cbb28f',
                },
                {
                  label: 'xStock · 24/7 on-chain',
                  feed: 'Jupiter Price v3',
                  value: xs,
                  tint: '#f0b429',
                },
                {
                  label: 'Pool liquidity',
                  feed: 'on-chain DEX depth',
                  value: row?.liquidityUsd ?? null,
                  tint: '#d99b2e',
                },
              ].map((r) => (
                <div
                  key={r.label}
                  className="flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors duration-300 hover:bg-[rgba(214,182,116,0.07)]"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: r.tint }}
                    />
                    <div>
                      <p className="text-[11.5px] font-medium text-[#c3d6ea]">
                        {r.label}
                      </p>
                      <p className="font-mono text-[8.5px] tracking-[0.16em] text-[#54708c]">
                        {r.feed}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className="font-mono text-[13px] font-medium tabular-nums"
                      style={{ color: r.tint }}
                    >
                      {r.value == null
                        ? '—'
                        : r.value >= 10000
                          ? r.value >= 1000000 ? `$${(r.value / 1000000).toFixed(2)}M` : `$${(r.value / 1000).toFixed(1)}k`
                          : `$${r.value.toFixed(2)}`}
                    </p>
                    <p className="font-mono text-[8.5px] tracking-[0.12em] text-[#4f6b87]">
                      USD
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* footer strip */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[rgba(214,182,116,0.13)] bg-[rgba(214,182,116,0.05)] px-5 py-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(217,155,46,0.32)] bg-[rgba(217,155,46,0.12)]">
                  <TrendingUp
                    className="h-3.5 w-3.5 text-[#ffe4b4]"
                    strokeWidth={2.4}
                  />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-[#c9dcee]">
                    $SAAPL · Stocknized AAPL Agent
                  </p>
                  <p className="font-mono text-[8.5px] tracking-[0.16em] text-[#5b7691]">
                    LIVE ON MAINNET · QUOTED IN AAPLx
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div>
                  <p className="font-mono text-[8px] tracking-[0.2em] text-[#54708c]">
                    24H Δ
                  </p>
                  <p className="font-mono text-[12px] text-[#ffe8bb]">
                    {row?.change24hPct == null
                      ? '—'
                      : pct(row.change24hPct, 2)}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[8px] tracking-[0.2em] text-[#54708c]">
                    LIQUIDITY
                  </p>
                  <p className="font-mono text-[12px] text-[#ffe9c2]">
                    {row?.liquidityUsd == null
                      ? '—'
                      : compactUsd(row.liquidityUsd)}
                  </p>
                </div>
                <a
                  href="https://pump.fun/coin/DWMgU6wE3SbnvrCC41FNVFvAG8EoHCFYMW2EAvQZ4s7G"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[rgba(240,180,41,0.4)] bg-[rgba(240,180,41,0.1)] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-[#ffe0a0] transition-colors hover:bg-[rgba(240,180,41,0.2)]"
                >
                  Trade
                </a>
              </div>
            </div>
          </motion.div>

          {/* floating badge */}
          <div className="float-slow absolute -bottom-6 -left-4 hidden items-center gap-2.5 rounded-2xl border border-[rgba(240,180,41,0.28)] bg-[rgba(26,19,8,0.94)] px-4 py-3 shadow-[0_28px_60px_-22px_rgba(0,0,0,0.9)] sm:flex">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(240,180,41,0.16)]">
              <Radio className="h-3.5 w-3.5 text-[#ffe0a0]" strokeWidth={2.4} />
            </div>
            <div>
              <p className="font-mono text-[8px] tracking-[0.22em] text-[#6f8ba7]">
                ON-CHAIN FEEDS LIVE
              </p>
              <p className="mt-0.5 font-mono text-[11px] text-[#c6e2f4]">
                {Object.keys(live).length || '—'} xStocks ·{' '}
                <span className="text-[#ffe8bb]">
                  {asOf
                    ? new Date(asOf).toUTCString().slice(17, 25) + ' UTC'
                    : 'syncing'}
                </span>
              </p>
            </div>
          </div>

          {/* countdown card */}
          <div className="absolute -right-2 top-6 hidden rounded-2xl border border-[rgba(217,155,46,0.24)] bg-[rgba(26,19,8,0.92)] px-4 py-3 text-right shadow-[0_28px_60px_-22px_rgba(0,0,0,0.9)] xl:block">
            <p className="font-mono text-[7.5px] tracking-[0.24em] text-[#d6b57c]">
              STOCKLANA SUBMISSION
            </p>
            <p className="mt-1 font-mono text-[13px] tracking-[0.12em] text-[#ffe4b4]">
              {cd.days}D {String(cd.hours).padStart(2, '0')}H{' '}
              {String(cd.minutes).padStart(2, '0')}M{' '}
              {String(cd.seconds).padStart(2, '0')}S
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
