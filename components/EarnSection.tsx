"use client";
import { useState } from 'react';
import type { CSSProperties } from 'react';
import {
  ArrowUpRight,
  BadgeCheck,
  Coins,
  Flame,
  Percent,
  Wallet,
} from 'lucide-react';
import { compactUsd, num, usd } from '../lib/data';
import { AnimatedNumber, Reveal, scrollToId } from '../lib/motion';

const APY = 18.4;
const PRESETS = [500, 1000, 5000, 10000];

const FEATURES = [
  {
    icon: Percent,
    title: 'Fee-share APY',
    body: 'Holders take a slice of every trade routed through the agent’s Meteora pool — paid in real fee revenue, not emissions.',
    tint: '#f0b429',
  },
  {
    icon: Flame,
    title: 'Buyback & burn',
    body: 'Net protocol fees buy the agent token back on open markets and burn it, tightening supply as usage grows.',
    tint: '#d99b2e',
  },
  {
    icon: BadgeCheck,
    title: 'Basis capture',
    body: 'Agents that consistently price the spread between tokenized and real shares rank higher — and earn more.',
    tint: '#e9c26c',
  },
];

export default function EarnSection() {
  const [hold, setHold] = useState(2500);
  const fill = ((hold - 100) / (25000 - 100)) * 100;

  const annual = (hold * APY) / 100;
  const monthly = annual / 12;
  const daily = annual / 365;

  return (
    <section id="earn" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#161006_0%,rgba(24,17,7,0.86)_40%,#161006_100%)]" />
        <div className="grid-fine absolute inset-0 opacity-50" />
      </div>

      <div className="mx-auto max-w-[1240px] px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* ------------------------------- copy ------------------------------- */}
          <div>
            <Reveal>
              <div className="flex items-center gap-2.5">
                <Coins className="h-3.5 w-3.5 text-[#ffe4b4]" strokeWidth={2.3} />
                <p className="eyebrow !text-[#ffe1b0]">Earn on RWAs</p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="mt-6 font-display text-[clamp(2.15rem,4.4vw,3.35rem)] font-bold leading-[1.07] tracking-[-0.028em] text-[#eef6ff]">
                Real fees. Real assets.{' '}
                <span className="grad-text">Real yield.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-6 max-w-[540px] text-[15.5px] leading-[1.78] text-[#93a9c2]">
                CLASP agents don’t farm emissions — they earn trading fees from
                pools paired with tokenized equities. When the pool moves, the
                agent earns. When the agent earns, holders earn.
              </p>
            </Reveal>

            <div className="mt-9 space-y-4">
              {FEATURES.map((f, i) => (
                <Reveal key={f.title} delay={0.18 + i * 0.08}>
                  <div className="group flex items-start gap-4 rounded-[18px] border border-[rgba(214,182,116,0.13)] bg-[rgba(214,182,116,0.045)] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[rgba(214,182,116,0.28)]">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border"
                      style={{
                        borderColor: `${f.tint}3d`,
                        background: `${f.tint}14`,
                      }}
                    >
                      <f.icon
                        className="h-[17px] w-[17px]"
                        style={{ color: f.tint }}
                        strokeWidth={2.1}
                      />
                    </div>
                    <div>
                      <h3 className="font-display text-[15px] font-semibold tracking-[-0.01em] text-[#e4eefb]">
                        {f.title}
                      </h3>
                      <p className="mt-1.5 text-[12.5px] leading-[1.74] text-[#7c96b1]">
                        {f.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* ---------------------------- calculator ---------------------------- */}
          <Reveal delay={0.16}>
            <div className="glass-deep grad-border relative overflow-hidden rounded-[26px] p-7 sm:p-9">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(217,155,46,0.16),transparent_66%)] blur-2xl"
              />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[8.5px] uppercase tracking-[0.24em] text-[#d6b57c]">
                    Yield calculator
                  </p>
                  <h3 className="mt-2.5 font-display text-[22px] font-semibold leading-[1.2] tracking-[-0.018em] text-[#eaf3fd]">
                    Project your holder yield
                  </h3>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[rgba(217,155,46,0.3)] bg-[rgba(217,155,46,0.12)]">
                  <Wallet className="h-5 w-5 text-[#ffe4b4]" strokeWidth={2} />
                </div>
              </div>

              {/* slider */}
              <div className="mt-9">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#54708c]">
                      Agent tokens held
                    </p>
                    <p className="mt-2 font-display text-[38px] font-bold leading-none tracking-[-0.032em] text-[#eaf3fd]">
                      <AnimatedNumber value={hold} duration={420} />
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-end gap-2">
                    {PRESETS.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setHold(p)}
                        className={`rounded-full border px-3 py-1.5 font-mono text-[9px] tracking-[0.12em] transition-all duration-300 ${
                          hold === p
                            ? 'border-[rgba(217,155,46,0.48)] bg-[rgba(217,155,46,0.13)] text-[#ffe4b4]'
                            : 'border-[rgba(214,182,116,0.2)] text-[#7c96b1] hover:border-[rgba(217,155,46,0.34)] hover:text-[#ffebc6]'
                        }`}
                      >
                        {p >= 1000 ? `${p / 1000}k` : p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-7">
                  <input
                    type="range"
                    min={100}
                    max={25000}
                    step={100}
                    value={hold}
                    onChange={(e) => setHold(Number(e.target.value))}
                    style={{ '--fill': `${fill}%` } as CSSProperties}
                    aria-label="Agent tokens held"
                  />
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-mono text-[8px] tracking-[0.18em] text-[#4f6b87]">
                      100
                    </span>
                    <span className="font-mono text-[8px] tracking-[0.18em] text-[#4f6b87]">
                      25,000 TOKENS
                    </span>
                  </div>
                </div>
              </div>

              {/* results */}
              <div className="mt-9 grid grid-cols-2 gap-4">
                <div className="col-span-2 overflow-hidden rounded-[20px] border border-[rgba(217,155,46,0.24)] bg-[rgba(217,155,46,0.08)] p-6">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#d6b57c]">
                        Estimated annual yield
                      </p>
                      <p className="mt-2.5 font-display text-[42px] font-bold leading-none tracking-[-0.034em] text-[#fff1d6]">
                        <AnimatedNumber
                          value={annual}
                          prefix="$"
                          decimals={2}
                          duration={520}
                        />
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#d6b57c]">
                        Fee-share APY
                      </p>
                      <p className="mt-2 font-mono text-[26px] leading-none text-[#ffe4b4]">
                        {APY}%
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 h-[7px] w-full overflow-hidden rounded-full bg-[rgba(217,155,46,0.16)]">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, (hold / 25000) * 100)}%`,
                        background:
                          'linear-gradient(90deg,#d99b2e,#f0b429)',
                      }}
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="font-mono text-[8px] tracking-[0.16em] text-[#c5a56c]">
                      POSITION SIZE · {num(hold)} TOKENS
                    </p>
                    <p className="font-mono text-[8px] tracking-[0.16em] text-[#c5a56c]">
                      SIMULATED · NOT FINANCIAL ADVICE
                    </p>
                  </div>
                </div>

                {[
                  { k: 'Per month', v: usd(monthly), s: 'Roughly 1/12 of annual' },
                  { k: 'Per day', v: usd(daily), s: 'Accrues every epoch' },
                ].map((r) => (
                  <div
                    key={r.k}
                    className="rounded-[18px] border border-[rgba(214,182,116,0.15)] bg-[rgba(214,182,116,0.05)] p-5"
                  >
                    <p className="font-mono text-[7.5px] uppercase tracking-[0.22em] text-[#54708c]">
                      {r.k}
                    </p>
                    <p className="mt-2.5 font-display text-[22px] font-semibold leading-none tracking-[-0.022em] text-[#cfe6f8]">
                      {r.v}
                    </p>
                    <p className="mt-2 text-[10px] text-[#61798f]">{r.s}</p>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => scrollToId('#agents')}
                className="btn-primary mt-8 w-full"
              >
                Start earning with an agent
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              </button>

              <p className="mt-4 text-center font-mono text-[7.5px] uppercase leading-[1.9] tracking-[0.18em] text-[#4f6b87]">
                Estimates based on current pool fee rates ·&nbsp;
                {compactUsd(1408)} paid out to date
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
