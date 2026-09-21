"use client";
import { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  Copy,
  Crown,
  Layers,
  Percent,
  SlidersHorizontal,
  TrendingUp,
  Users,
} from 'lucide-react';
import {
  AGENTS,
  compactUsd,
  num,
  pct,
  sparkPoints,
  walk,
} from '../lib/data';
import { Reveal, scrollToId } from '../lib/motion';

type SortKey = 'fees' | 'tvl' | 'roi' | 'backers';
type FilterKey = 'all' | 'positive' | 'top';

const SORTS: { key: SortKey; label: string }[] = [
  { key: 'fees', label: 'Fees earned' },
  { key: 'tvl', label: 'TVL' },
  { key: 'roi', label: 'ROI' },
  { key: 'backers', label: 'Backers' },
];

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All agents' },
  { key: 'positive', label: 'Positive ROI' },
  { key: 'top', label: 'Top earners' },
];

const STRATEGY_TINT: Record<string, string> = {
  basis: '#f0b429',
  arb: '#d99b2e',
  yield: '#e9c26c',
  event: '#ecc672',
};

export default function Marketplace() {
  const [sort, setSort] = useState<SortKey>('fees');
  const [filter, setFilter] = useState<FilterKey>('all');
  const [backed, setBacked] = useState<Record<string, boolean>>({});

  const list = useMemo(() => {
    let out = [...AGENTS];
    if (filter === 'positive') out = out.filter((a) => a.roi > 0);
    if (filter === 'top') out = out.filter((a) => a.feesEarned >= 180);

    return out.sort((a, b) => {
      switch (sort) {
        case 'fees':
          return b.feesEarned - a.feesEarned;
        case 'tvl':
          return b.tvl - a.tvl;
        case 'roi':
          return b.roi - a.roi;
        case 'backers':
          return b.backers - a.backers;
        default:
          return 0;
      }
    });
  }, [sort, filter]);

  return (
    <section id="agents" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(85%_58%_at_50%_0%,rgba(217,155,46,0.055),transparent_60%)]" />

      <div className="mx-auto max-w-[1240px] px-6">
        {/* header */}
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-[620px]">
            <Reveal>
              <div className="flex items-center gap-2.5">
                <Layers className="h-3.5 w-3.5 text-[#ffe4b4]" strokeWidth={2.3} />
                <p className="eyebrow !text-[#ffe1b0]">Agent marketplace</p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="mt-6 font-display text-[clamp(2.15rem,4.4vw,3.35rem)] font-bold leading-[1.07] tracking-[-0.028em] text-[#eef6ff]">
                Back the agents{' '}
                <span className="grad-text">earning on RWAs.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-5 text-[15.5px] leading-[1.76] text-[#8ea6bf]">
                Every agent is a live Meteora pool paired with a real stock.
                Fees accrue on-chain, ranks update continuously, and copying a
                strategy takes one click.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.18}>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-[rgba(214,182,116,0.18)] bg-[rgba(214,182,116,0.06)] px-4 py-2.5">
                <SlidersHorizontal className="h-3.5 w-3.5 text-[#7f9bb6]" strokeWidth={2.2} />
                <span className="font-mono text-[8.5px] tracking-[0.18em] text-[#7f9bb6]">
                  {list.length} OF {AGENTS.length} AGENTS
                </span>
              </div>
              <button
                type="button"
                onClick={() => scrollToId('#earn')}
                className="btn-primary !px-5 !py-2.5 !text-[12.5px]"
              >
                Calculate your yield
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>
          </Reveal>
        </div>

        {/* controls */}
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 rounded-[20px] border border-[rgba(214,182,116,0.13)] bg-[rgba(214,182,116,0.045)] px-6 py-5">
            <div className="flex flex-wrap items-center gap-2.5">
              <p className="mr-1 font-mono text-[8px] uppercase tracking-[0.22em] text-[#54708c]">
                Filter
              </p>
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFilter(f.key)}
                  className={`rounded-full border px-3.5 py-1.5 text-[11px] transition-all duration-300 ${
                    filter === f.key
                      ? 'border-[rgba(240,180,41,0.5)] bg-[rgba(240,180,41,0.13)] text-[#ffedcb]'
                      : 'border-[rgba(214,182,116,0.18)] text-[#7c96b1] hover:border-[rgba(240,180,41,0.34)] hover:text-[#a8c6de]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <p className="mr-1 font-mono text-[8px] uppercase tracking-[0.22em] text-[#54708c]">
                Sort by
              </p>
              {SORTS.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setSort(s.key)}
                  className={`rounded-full border px-3.5 py-1.5 text-[11px] transition-all duration-300 ${
                    sort === s.key
                      ? 'border-[rgba(217,155,46,0.48)] bg-[rgba(217,155,46,0.12)] text-[#ffe4b4]'
                      : 'border-[rgba(214,182,116,0.18)] text-[#7c96b1] hover:border-[rgba(217,155,46,0.32)] hover:text-[#ffebc6]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {list.map((a, i) => {
            const tint = STRATEGY_TINT[a.strategy];
            const isBacked = backed[a.name];
            return (
              <Reveal key={a.name} delay={Math.min(i * 0.07, 0.42)}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-[rgba(214,182,116,0.14)] bg-[rgba(214,182,116,0.045)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[rgba(214,182,116,0.3)] hover:shadow-[0_36px_80px_-32px_rgba(0,0,0,0.85)]">
              {/* accent bar */}
              <div
                className="h-[3px] w-full"
                style={{
                  background: `linear-gradient(90deg, ${tint}, ${tint}22)`,
                }}
              />

              <div className="flex items-start justify-between gap-4 p-6 pb-0">
                <div className="flex items-center gap-3.5">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border font-display text-[15px] font-bold"
                    style={{
                      borderColor: `${tint}44`,
                      background: `linear-gradient(150deg, ${tint}26, ${tint}0a)`,
                      color: tint,
                    }}
                  >
                    {a.symbol.slice(0, 2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-[16.5px] font-semibold tracking-[-0.012em] text-[#e8f1fb]">
                        {a.name}
                      </h3>
                      {i === 0 && sort === 'fees' && filter === 'all' && (
                        <span className="flex items-center gap-1 rounded-full border border-[rgba(227,178,80,0.36)] bg-[rgba(227,178,80,0.12)] px-2 py-0.5">
                          <Crown className="h-2.5 w-2.5 text-[#eccb8c]" strokeWidth={2.6} />
                          <span className="font-mono text-[7px] tracking-[0.16em] text-[#eccb8c]">
                            TOP
                          </span>
                        </span>
                      )}
                    </div>
                    <p className="mt-1 font-mono text-[8px] tracking-[0.18em] text-[#54708c]">
                      {a.symbol} POOL · {a.mint}
                    </p>
                  </div>
                </div>

                <span
                  className="shrink-0 rounded-full border px-2.5 py-1 font-mono text-[7.5px] uppercase tracking-[0.16em]"
                  style={{
                    color: tint,
                    borderColor: `${tint}44`,
                    background: `${tint}14`,
                  }}
                >
                  {a.strategy}
                </span>
              </div>

              <p className="px-6 pt-4 text-[12.5px] leading-[1.72] text-[#7c96b1]">
                {a.thesis}
              </p>

              {/* sparkline */}
              <div className="px-6 pt-4">
                <div className="overflow-hidden rounded-xl border border-[rgba(214,182,116,0.11)] bg-[rgba(214,182,116,0.035)] px-2 py-1.5">
                  <svg viewBox="0 0 240 40" className="h-[40px] w-full">
                    <polyline
                      points={sparkPoints(walk(i * 7 + 3, 22, a.roi * 0.06), 240, 40, 4)}
                      fill="none"
                      stroke={tint}
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      opacity="0.85"
                    />
                  </svg>
                </div>
              </div>

              {/* stats */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-4 px-6 pt-5">
                {[
                  {
                    k: 'Fees earned',
                    v: compactUsd(a.feesEarned),
                    icon: Percent,
                    tint: '#ffe0a0',
                  },
                  {
                    k: 'Pool TVL',
                    v: compactUsd(a.tvl),
                    icon: Layers,
                    tint: '#b8cee4',
                  },
                  {
                    k: 'ROI',
                    v: pct(a.roi, 1),
                    icon: TrendingUp,
                    tint: a.roi >= 0 ? '#ffe4b4' : '#e0b062',
                  },
                  {
                    k: 'Backers',
                    v: num(a.backers + (isBacked ? 1 : 0)),
                    icon: Users,
                    tint: '#f7e0ac',
                  },
                ].map((s) => (
                  <div key={s.k}>
                    <div className="flex items-center gap-1.5">
                      <s.icon
                        className="h-[11px] w-[11px] opacity-70"
                        style={{ color: s.tint }}
                        strokeWidth={2.3}
                      />
                      <p className="font-mono text-[7.5px] uppercase tracking-[0.2em] text-[#54708c]">
                        {s.k}
                      </p>
                    </div>
                    <p
                      className="mt-1.5 font-mono text-[15px] tabular-nums"
                      style={{ color: s.tint }}
                    >
                      {s.v}
                    </p>
                  </div>
                ))}
              </div>

              {/* basis captured bar */}
              <div className="px-6 pt-5">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[7.5px] uppercase tracking-[0.2em] text-[#54708c]">
                    Basis captured
                  </p>
                  <p
                    className="font-mono text-[10px]"
                    style={{ color: tint }}
                  >
                    {a.basisCaptured.toFixed(1)}%
                  </p>
                </div>
                <div className="mt-2 h-[5px] w-full overflow-hidden rounded-full bg-[rgba(214,182,116,0.12)]">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.min(100, (a.basisCaptured / 5) * 100)}%`,
                      background: `linear-gradient(90deg, ${tint}, ${tint}77)`,
                    }}
                  />
                </div>
              </div>

              {/* actions */}
              <div className="mt-auto flex items-center gap-2.5 p-6 pt-6">
                <button
                  type="button"
                  onClick={() =>
                    setBacked((prev) => ({ ...prev, [a.name]: !prev[a.name] }))
                  }
                  className={`flex-1 rounded-full px-4 py-2.5 text-[11.5px] font-medium transition-all duration-300 ${
                    isBacked
                      ? 'border border-[rgba(217,155,46,0.42)] bg-[rgba(217,155,46,0.14)] text-[#ffe4b4]'
                      : 'bg-[rgba(240,180,41,0.14)] text-[#ffedcb] hover:bg-[rgba(240,180,41,0.22)]'
                  }`}
                >
                  {isBacked ? (
                    <span className="flex items-center justify-center gap-1.5">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.8} />
                      Backed
                    </span>
                  ) : (
                    'Back this agent'
                  )}
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-1.5 rounded-full border border-[rgba(214,182,116,0.22)] px-4 py-2.5 text-[11.5px] text-[#9db3cd] transition-all duration-300 hover:border-[rgba(214,182,116,0.42)] hover:text-[#cfe2f7]"
                >
                  <Copy className="h-3.5 w-3.5" strokeWidth={2.2} />
                  Copy
                </button>
              </div>
            </article>
          </Reveal>
          );
        })}
        </div>

        {/* summary strip */}
        <Reveal delay={0.16}>
          <div className="mt-12 grid grid-cols-2 gap-4 rounded-[22px] border border-[rgba(214,182,116,0.13)] bg-[rgba(214,182,116,0.045)] p-8 md:grid-cols-4">
            {[
              { k: 'Total value locked', v: '$106.6k', s: 'Across 7 live pools' },
              { k: 'Fees paid to agents', v: '$1,408', s: 'Accrued since launch' },
              { k: 'Active backers', v: '2,291', s: 'Wallets positions open' },
              { k: 'Avg. basis captured', v: '2.81%', s: 'Weighted by TVL' },
            ].map((s) => (
              <div key={s.k}>
                <p className="font-mono text-[7.5px] uppercase tracking-[0.22em] text-[#54708c]">
                  {s.k}
                </p>
                <p className="mt-2.5 font-display text-[27px] font-bold leading-none tracking-[-0.028em] text-[#e6f0fb]">
                  {s.v}
                </p>
                <p className="mt-2 text-[11px] text-[#68809c]">{s.s}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
