"use client";
import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  Brain,
  Database,
  Power,
  RefreshCw,
  ShieldCheck,
  WifiOff,
} from 'lucide-react';
import { ANCHORS, STOCKS, pct, sparkPoints } from '../lib/data';
import { Reveal } from '../lib/motion';

const STATUS_META = {
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
  stale: {
    label: 'Feed stale',
    color: '#e0b062',
    bg: 'rgba(217,155,46,0.12)',
    border: 'rgba(217,155,46,0.4)',
  },
} as const;

type Status = keyof typeof STATUS_META;

export default function BasisTerminal() {
  const [symbol, setSymbol] = useState('AAPL');
  const [down, setDown] = useState(false);
  const [tick, setTick] = useState(0);
  const base = ANCHORS[symbol];

  useEffect(() => {
    if (down) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 1500);
    return () => window.clearInterval(id);
  }, [down]);

  const vals = useMemo(() => {
    const jitter = (n: number, k: number) =>
      n * (1 + Math.sin(tick * 0.62 + k) * 0.0012 + Math.sin(tick * 0.27 + k * 1.7) * 0.0008);
    return {
      eq: jitter(base.eq, 1.15),
      xs: jitter(base.xs, 2.65),
      on: jitter(base.on, 3.95),
    };
  }, [base, tick]);

  const basis = down ? null : ((vals.xs - vals.eq) / vals.eq) * 100;
  const status: Status = down
    ? 'stale'
    : basis! > 0.9
      ? 'rich'
      : basis! < -0.9
        ? 'cheap'
        : 'fair';
  const meta = STATUS_META[status];

  const anchorBasis = ((base.xs - base.eq) / base.eq) * 100;

  const history = useMemo(() => {
    return Array.from({ length: 32 }, (_, i) => {
      const t = tick - 31 + i;
      return (
        anchorBasis * 0.62 +
        Math.sin(t * 0.36 + 1.2) * 0.24 +
        Math.sin(t * 0.14 + 2.6) * 0.16
      );
    });
  }, [anchorBasis, tick]);

  return (
    <section id="terminal" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#161006_0%,#080f1e_46%,#161006_100%)]" />
      <div className="absolute -left-40 top-24 -z-10 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(240,180,41,0.1),transparent_66%)] blur-2xl" />
      <div className="absolute -right-40 bottom-10 -z-10 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(217,155,46,0.09),transparent_66%)] blur-2xl" />

      <div className="mx-auto max-w-[1240px] px-6">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <div className="flex items-center gap-2.5">
              <Brain className="h-3.5 w-3.5 text-[#ffe0a0]" strokeWidth={2.3} />
              <p className="eyebrow">The Pyth brain</p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mt-6 max-w-[820px] font-display text-[clamp(2.15rem,4.4vw,3.35rem)] font-bold leading-[1.07] tracking-[-0.028em] text-[#eef6ff]">
              Three feeds. One truth.{' '}
              <span className="grad-text">Zero guesswork.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-5 max-w-[600px] text-[15.5px] leading-[1.76] text-[#8ea6bf]">
              Equity, xStock and Ondo prices stream simultaneously from Pyth
              Hermes. CLASP computes the basis in real time — and the moment a
              feed drops, the agent refuses to trade blind.
            </p>
          </Reveal>
        </div>

        {/* symbol selector */}
        <Reveal delay={0.18}>
          <div className="mt-11 flex flex-wrap items-center justify-center gap-2">
            {STOCKS.map((s) => (
              <button
                key={s.symbol}
                type="button"
                onClick={() => {
                  setSymbol(s.symbol);
                  setDown(false);
                }}
                className={`group rounded-full border px-4 py-2 font-mono text-[10.5px] tracking-[0.16em] transition-all duration-300 ${
                  symbol === s.symbol
                    ? 'border-[rgba(240,180,41,0.52)] bg-[rgba(240,180,41,0.14)] text-[#ffedcb] shadow-[0_12px_30px_-12px_rgba(240,180,41,0.5)]'
                    : 'border-[rgba(214,182,116,0.18)] text-[#7290ac] hover:-translate-y-0.5 hover:border-[rgba(240,180,41,0.36)] hover:text-[#a8c6de]'
                }`}
              >
                ${s.symbol}
              </button>
            ))}
          </div>
        </Reveal>

        {/* terminal panel */}
        <Reveal delay={0.22}>
          <div className="glass-deep grad-border mt-8 overflow-hidden rounded-[26px]">
            {/* panel header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[rgba(214,182,116,0.13)] px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(240,180,41,0.28)] bg-[rgba(240,180,41,0.1)]">
                  <Activity className="h-[18px] w-[18px] text-[#ffe0a0]" strokeWidth={2.2} />
                </div>
                <div>
                  <p className="font-display text-[15px] font-semibold tracking-[-0.01em] text-[#e4eefb]">
                    Basis engine · ${symbol}
                  </p>
                  <p className="mt-0.5 font-mono text-[8.5px] uppercase tracking-[0.2em] text-[#61798f]">
                    hermes.pyth.network · websocket + rest
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex items-center gap-2 rounded-full border border-[rgba(214,182,116,0.18)] bg-[rgba(214,182,116,0.07)] px-3 py-1.5">
                  <Database className="h-3 w-3 text-[#7f9bb6]" strokeWidth={2.2} />
                  <span className="font-mono text-[8.5px] tracking-[0.16em] text-[#7f9bb6]">
                    3 FEEDS
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-[rgba(214,182,116,0.18)] bg-[rgba(214,182,116,0.07)] px-3 py-1.5">
                  <RefreshCw className="h-3 w-3 text-[#7f9bb6]" strokeWidth={2.2} />
                  <span className="font-mono text-[8.5px] tracking-[0.16em] text-[#7f9bb6]">
                    1.5S REFRESH
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setDown((v) => !v)}
                  className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[8.5px] tracking-[0.16em] transition-all duration-300 ${
                    down
                      ? 'border-[rgba(217,155,46,0.5)] bg-[rgba(217,155,46,0.14)] text-[#e0b062]'
                      : 'border-[rgba(214,182,116,0.22)] text-[#8ba4be] hover:border-[rgba(217,155,46,0.42)] hover:text-[#eac98d]'
                  }`}
                >
                  {down ? (
                    <WifiOff className="h-3 w-3" strokeWidth={2.3} />
                  ) : (
                    <Power className="h-3 w-3" strokeWidth={2.3} />
                  )}
                  {down ? 'RESTORE FEED' : 'SIMULATE FEED DROP'}
                </button>
              </div>
            </div>

            {/* main grid */}
            <div className="grid gap-6 p-6 lg:grid-cols-[1.15fr_0.85fr] lg:p-8">
              {/* feed table */}
              <div>
                <p className="font-mono text-[8.5px] uppercase tracking-[0.24em] text-[#61798f]">
                  Live price feeds
                </p>

                <div className="mt-4 space-y-3">
                  {[
                    {
                      key: 'eq',
                      venue: 'Equity.US',
                      label: 'Real share · US hours',
                      value: vals.eq,
                      feed: `Equity.US.${symbol}/USD`,
                      tint: '#cbb28f',
                      change: -0.18,
                    },
                    {
                      key: 'xs',
                      venue: 'Crypto.X',
                      label: 'xStock · 24/7',
                      value: vals.xs,
                      feed: `Crypto.${symbol}X/USD`,
                      tint: '#f0b429',
                      change: 0.42,
                    },
                    {
                      key: 'on',
                      venue: 'Crypto.ON',
                      label: 'Ondo · 24/7',
                      value: vals.on,
                      feed: `Crypto.${symbol}ON/USD`,
                      tint: '#d99b2e',
                      change: 0.27,
                    },
                  ].map((row) => (
                    <div
                      key={row.key}
                      className={`flex flex-wrap items-center justify-between gap-4 rounded-2xl border px-5 py-4 transition-all duration-500 ${
                        down
                          ? 'border-[rgba(217,155,46,0.2)] bg-[rgba(217,155,46,0.05)] opacity-55'
                          : 'border-[rgba(214,182,116,0.13)] bg-[rgba(214,182,116,0.045)] hover:border-[rgba(214,182,116,0.24)]'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span
                          className="h-2 w-2 shrink-0 rounded-full"
                          style={{
                            background: down ? '#5d7286' : row.tint,
                            boxShadow: down ? 'none' : `0 0 12px ${row.tint}88`,
                          }}
                        />
                        <div>
                          <p className="text-[13px] font-medium text-[#d0e0f0]">
                            {row.label}
                          </p>
                          <p className="mt-1 font-mono text-[8px] tracking-[0.14em] text-[#54708c]">
                            {row.feed}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="hidden h-9 w-[86px] items-center sm:flex">
                          <svg viewBox="0 0 86 30" className="h-full w-full">
                            <polyline
                              points={sparkPoints(
                                Array.from(
                                  { length: 12 },
                                  (_, i) =>
                                    12 +
                                    Math.sin(i * 0.7 + row.change * 9) * 6 +
                                    i * row.change * 1.7
                                ),
                                86,
                                30,
                                3
                              )}
                              fill="none"
                              stroke={down ? '#42566a' : row.tint}
                              strokeWidth="1.9"
                              strokeLinejoin="round"
                              strokeLinecap="round"
                              opacity={down ? 0.5 : 0.9}
                            />
                          </svg>
                        </div>
                        <div className="text-right">
                          <p
                            className="font-mono text-[17px] font-medium tabular-nums"
                            style={{ color: down ? '#6b8199' : row.tint }}
                          >
                            {down ? '—' : `$${row.value.toFixed(2)}`}
                          </p>
                          <p
                            className="mt-0.5 font-mono text-[8.5px] tracking-[0.14em]"
                            style={{
                              color: down
                                ? '#5d7286'
                                : row.change >= 0
                                  ? '#ffe0a0'
                                  : '#e0b062',
                            }}
                          >
                            {down ? 'NO DATA' : `${row.change >= 0 ? '+' : ''}${row.change.toFixed(2)}% 24H`}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* basis chart */}
                <div className="mt-6 overflow-hidden rounded-2xl border border-[rgba(214,182,116,0.13)] bg-[rgba(214,182,116,0.04)] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-mono text-[8.5px] uppercase tracking-[0.22em] text-[#61798f]">
                      Basis history · rolling 48 ticks
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5">
                        <span className="h-[2.5px] w-5 rounded-full bg-[#f0b429]" />
                        <span className="font-mono text-[8px] tracking-[0.14em] text-[#6c86a4]">
                          BASIS %
                        </span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="h-[2.5px] w-5 rounded-full bg-[rgba(214,182,116,0.34)]" />
                        <span className="font-mono text-[8px] tracking-[0.14em] text-[#6c86a4]">
                          FAIR BAND
                        </span>
                      </span>
                    </div>
                  </div>

                  <svg viewBox="0 0 560 150" className="mt-4 h-auto w-full">
                    <defs>
                      <linearGradient id="termFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f0b429" stopOpacity="0.28" />
                        <stop offset="100%" stopColor="#f0b429" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {[30, 62, 94, 126].map((y) => (
                      <line
                        key={y}
                        x1="10"
                        x2="550"
                        y1={y}
                        y2={y}
                        stroke="rgba(214,182,116,0.1)"
                        strokeWidth="1"
                      />
                    ))}
                    <rect
                      x="10"
                      y="52"
                      width="540"
                      height="30"
                      fill="rgba(214,182,116,0.08)"
                    />
                    <line
                      x1="10"
                      x2="550"
                      y1="67"
                      y2="67"
                      stroke="rgba(214,182,116,0.3)"
                      strokeWidth="1"
                      strokeDasharray="4 6"
                    />

                    {!down && (
                      <>
                        <polygon
                          points={`10,140 ${sparkPoints(history, 540, 130, 10)} 550,140`}
                          fill="url(#termFill)"
                        />
                        <polyline
                          points={sparkPoints(history, 540, 130, 10)}
                          fill="none"
                          stroke="#f0b429"
                          strokeWidth="2.6"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        />
                      </>
                    )}

                    {down && (
                      <>
                        <line
                          x1="10"
                          x2="550"
                          y1="86"
                          y2="86"
                          stroke="rgba(217,155,46,0.5)"
                          strokeWidth="2"
                          strokeDasharray="7 8"
                        />
                        <text
                          x="280"
                          y="80"
                          fill="#e0b062"
                          fontSize="11"
                          fontFamily="IBM Plex Mono, monospace"
                          letterSpacing="2.6"
                          textAnchor="middle"
                        >
                          FEED LOST · AGENT STOOD DOWN
                        </text>
                      </>
                    )}
                  </svg>
                </div>
              </div>

              {/* status column */}
              <div>
                <div
                  className={`relative overflow-hidden rounded-[22px] border p-6 transition-all duration-500 ${
                    down
                      ? 'border-[rgba(217,155,46,0.3)] bg-[rgba(217,155,46,0.08)]'
                      : 'border-[rgba(214,182,116,0.16)] bg-[rgba(214,182,116,0.055)]'
                  }`}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-2xl"
                    style={{ background: meta.bg }}
                  />

                  <p className="font-mono text-[8.5px] uppercase tracking-[0.24em] text-[#61798f]">
                    Computed basis
                  </p>

                  <div className="mt-3 flex items-end gap-3">
                    <p
                      className="font-display text-[52px] font-bold leading-none tracking-[-0.038em]"
                      style={{ color: meta.color }}
                    >
                      {down ? '—' : pct(basis!)}
                    </p>
                    <span
                      className="mb-1.5 rounded-full border px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.18em]"
                      style={{
                        color: meta.color,
                        background: meta.bg,
                        borderColor: meta.border,
                      }}
                    >
                      {meta.label}
                    </span>
                  </div>

                  <div className="mt-6 space-y-3.5">
                    {[
                      {
                        k: 'xStock premium',
                        v: down ? '—' : pct(((vals.xs - vals.eq) / vals.eq) * 100),
                        tint: '#f0b429',
                      },
                      {
                        k: 'Ondo premium',
                        v: down ? '—' : pct(((vals.on - vals.eq) / vals.eq) * 100),
                        tint: '#d99b2e',
                      },
                      {
                        k: 'Cross-venue spread',
                        v: down ? '—' : pct(((vals.xs - vals.on) / vals.on) * 100),
                        tint: '#e9c26c',
                      },
                      {
                        k: 'Confidence',
                        v: down ? '0.00' : '0.98',
                        tint: down ? '#e0b062' : '#ffe0a0',
                      },
                    ].map((r) => (
                      <div
                        key={r.k}
                        className="flex items-center justify-between border-b border-[rgba(214,182,116,0.1)] pb-3 last:border-0 last:pb-0"
                      >
                        <span className="text-[11.5px] text-[#8ba4be]">{r.k}</span>
                        <span
                          className="font-mono text-[12px] tabular-nums"
                          style={{ color: r.tint }}
                        >
                          {r.v}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* agent behaviour card */}
                <div
                  className={`mt-5 rounded-[22px] border p-6 transition-all duration-500 ${
                    down
                      ? 'border-[rgba(217,155,46,0.32)] bg-[rgba(217,155,46,0.1)]'
                      : 'border-[rgba(217,155,46,0.22)] bg-[rgba(217,155,46,0.07)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full ${
                        down
                          ? 'bg-[rgba(217,155,46,0.18)]'
                          : 'bg-[rgba(217,155,46,0.16)]'
                      }`}
                    >
                      {down ? (
                        <WifiOff className="h-4 w-4 text-[#e0b062]" strokeWidth={2.2} />
                      ) : (
                        <ShieldCheck className="h-4 w-4 text-[#ffe4b4]" strokeWidth={2.2} />
                      )}
                    </div>
                    <div>
                      <p
                        className="font-display text-[13.5px] font-semibold"
                        style={{ color: down ? '#eac98d' : '#fff1d6' }}
                      >
                        {down ? 'Agent paused automatically' : 'Agent armed and trading'}
                      </p>
                      <p className="mt-0.5 font-mono text-[8px] tracking-[0.18em] text-[#7c94a8]">
                        SAFETY POLICY · PYTH STALE GUARD
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-[11.5px] leading-[1.75] text-[#8ba4be]">
                    {down
                      ? 'With the feed unavailable, CLASP refuses to price the pool. Positions are frozen, no new orders are signed, and the agent waits for a healthy heartbeat before resuming.'
                      : 'Basis confidence is high. The agent is quoting both sides of the pool, harvesting the spread between the tokenized stock and the real share.'}
                  </p>

                  <button
                    type="button"
                    onClick={() => setDown((v) => !v)}
                    className={`mt-5 w-full rounded-full px-4 py-2.5 font-mono text-[9px] tracking-[0.2em] transition-all duration-300 ${
                      down
                        ? 'bg-[rgba(240,180,41,0.16)] text-[#ffedcb] hover:bg-[rgba(240,180,41,0.24)]'
                        : 'border border-[rgba(217,155,46,0.32)] text-[#eac98d] hover:bg-[rgba(217,155,46,0.12)]'
                    }`}
                  >
                    {down ? 'RESTORE THE FEED' : 'CUT THE FEED TO SEE'}
                  </button>
                </div>
              </div>
            </div>

            {/* footer strip */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[rgba(214,182,116,0.12)] bg-[rgba(214,182,116,0.04)] px-6 py-5 lg:px-8">
              <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
                {[
                  ['Feed IDs resolved', '21'],
                  ['Median latency', '42ms'],
                  ['Uptime (30d)', '99.98%'],
                  ['Stale threshold', '3 beats'],
                ].map(([k, v]) => (
                  <div key={k}>
                    <p className="font-mono text-[7.5px] uppercase tracking-[0.22em] text-[#54708c]">
                      {k}
                    </p>
                    <p className="mt-1 font-mono text-[12px] text-[#b8cee4]">
                      {v}
                    </p>
                  </div>
                ))}
              </div>
              <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#4f6b87]">
                Simulated feed · real Hermes integration in progress
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
