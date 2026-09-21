"use client";
import {
  Braces,
  Check,
  Database,
  GitBranch,
  Network,
  Server,
  Terminal,
} from 'lucide-react';
import { BOUNTIES } from '../lib/data';
import { Reveal } from '../lib/motion';

const TREE = `clasp/
├── app/
│   ├── api/clawpump/route.ts   # gasless agent launch
│   ├── layout.tsx
│   └── page.tsx                # terminal surface
├── lib/
│   ├── pyth.ts                 # Hermes basis engine
│   ├── clawpump.ts             # Stocknized-Agent mint
│   ├── meteora.ts              # DBC pool reads + creation
│   ├── agents.ts               # agent model + seed data
│   └── constants.ts            # program IDs + feed symbols
└── components/                 # terminal UI`;

const PIPELINE = [
  {
    icon: Database,
    label: 'Pyth Hermes',
    detail: 'Equity.US · Crypto.X · Crypto.ON',
    tint: '#f0b429',
  },
  {
    icon: Braces,
    label: 'Basis engine',
    detail: 'computeBasis() → rich / fair / cheap',
    tint: '#d99b2e',
  },
  {
    icon: Network,
    label: 'Meteora DBC',
    detail: 'Stock-paired dynamic bonding curve',
    tint: '#e9c26c',
  },
  {
    icon: Server,
    label: 'Solana',
    detail: 'Settlement, fees, agent state',
    tint: '#ecc672',
  },
];

export default function Architecture() {
  return (
    <section id="build" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#161006_0%,#080e1c_50%,#161006_100%)]" />

      <div className="mx-auto max-w-[1240px] px-6">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <div className="flex items-center gap-2.5">
              <GitBranch className="h-3.5 w-3.5 text-[#f3d38c]" strokeWidth={2.3} />
              <p className="eyebrow !text-[#f3d38c]">Architecture</p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mt-6 max-w-[820px] font-display text-[clamp(2.15rem,4.4vw,3.35rem)] font-bold leading-[1.07] tracking-[-0.028em] text-[#eef6ff]">
              Built where the data lives —{' '}
              <span className="grad-text-cool">on Solana.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-5 max-w-[620px] text-[15.5px] leading-[1.76] text-[#8ea6bf]">
              A typed Next.js core, a Hermes-powered basis engine, and
              first-class Meteora and Clawpump integrations. Everything reads
              from chain; nothing is faked.
            </p>
          </Reveal>
        </div>

        {/* pipeline rail */}
        <Reveal delay={0.18}>
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {PIPELINE.map((p, i) => (
              <div
                key={p.label}
                className="group relative overflow-hidden rounded-[18px] border border-[rgba(214,182,116,0.14)] bg-[rgba(214,182,116,0.045)] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[rgba(214,182,116,0.28)]"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl border"
                    style={{
                      borderColor: `${p.tint}3d`,
                      background: `${p.tint}14`,
                    }}
                  >
                    <p.icon
                      className="h-[15px] w-[15px]"
                      style={{ color: p.tint }}
                      strokeWidth={2.1}
                    />
                  </div>
                  <div>
                    <p className="font-mono text-[8px] tracking-[0.22em] text-[#54708c]">
                      STAGE 0{i + 1}
                    </p>
                    <p className="mt-1 text-[12.5px] font-medium text-[#dae7f5]">
                      {p.label}
                    </p>
                  </div>
                </div>
                <p className="mt-4 font-mono text-[8px] leading-[1.9] tracking-[0.13em] text-[#61798f]">
                  {p.detail}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
          {/* code window */}
          <Reveal delay={0.1}>
            <div className="glass-deep overflow-hidden rounded-[24px]">
              <div className="flex items-center justify-between gap-3 border-b border-[rgba(214,182,116,0.13)] px-6 py-4">
                <div className="flex items-center gap-2">
                  {['#d99b2e', '#e9b95c', '#e0ac47'].map((c) => (
                    <span
                      key={c}
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: c, opacity: 0.85 }}
                    />
                  ))}
                  <div className="ml-3 flex items-center gap-2">
                    <Terminal className="h-3 w-3 text-[#6c86a4]" strokeWidth={2.3} />
                    <span className="font-mono text-[8.5px] tracking-[0.18em] text-[#6c86a4]">
                      clasp — repository map
                    </span>
                  </div>
                </div>
                <span className="rounded-full border border-[rgba(240,180,41,0.26)] bg-[rgba(240,180,41,0.09)] px-2.5 py-1 font-mono text-[7.5px] tracking-[0.16em] text-[#ffd88e]">
                  TYPESCRIPT
                </span>
              </div>

              <div className="overflow-x-auto px-6 py-6">
                <pre className="font-mono text-[11px] leading-[2.05] text-[#8ba4be]">
                  {TREE.split('\n').map((line, i) => {
                    const commentIndex = line.indexOf('#');
                    return (
                      <div key={i} className="flex gap-4">
                        <span className="w-5 shrink-0 select-none text-right text-[#3f5670]">
                          {i + 1}
                        </span>
                        <span className="whitespace-pre">
                          {commentIndex >= 0 ? (
                            <>
                              <span className="text-[#ffdc98]">
                                {line.slice(0, commentIndex)}
                              </span>
                              <span className="text-[#4f6b87]">
                                {line.slice(commentIndex)}
                              </span>
                            </>
                          ) : (
                            <span className="text-[#a9c3da]">{line}</span>
                          )}
                        </span>
                      </div>
                    );
                  })}
                </pre>
              </div>

              <div className="border-t border-[rgba(214,182,116,0.12)] bg-[rgba(214,182,116,0.04)] px-6 py-5">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  {[
                    'Next.js + TypeScript',
                    'Tailwind design system',
                    'Solana wallet adapter',
                    'Pyth Hermes SDK',
                  ].map((t) => (
                    <span
                      key={t}
                      className="flex items-center gap-1.5 font-mono text-[8px] tracking-[0.16em] text-[#6c86a4]"
                    >
                      <Check className="h-2.5 w-2.5 text-[#ffe0a0]" strokeWidth={3} />
                      {t.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* bounty map */}
          <Reveal delay={0.18}>
            <div className="flex h-full flex-col">
              <div className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f3d38c]" />
                <p className="eyebrow !text-[#f3d38c]">Bounty map</p>
              </div>
              <h3 className="mt-5 font-display text-[24px] font-semibold leading-[1.22] tracking-[-0.02em] text-[#e6f0fb]">
                Four tracks, one coherent product.
              </h3>

              <div className="mt-7 space-y-4">
                {BOUNTIES.map((b, i) => (
                  <div
                    key={b.track}
                    className="group rounded-[18px] border border-[rgba(214,182,116,0.13)] bg-[rgba(214,182,116,0.045)] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[rgba(214,182,116,0.28)]"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[rgba(214,182,116,0.24)] bg-[rgba(214,182,116,0.08)] font-mono text-[8.5px] text-[#cbb28f]">
                          0{i + 1}
                        </span>
                        <p className="font-display text-[14px] font-semibold text-[#dae7f5]">
                          {b.track}
                        </p>
                      </div>
                      <span className="rounded-full border border-[rgba(240,180,41,0.3)] bg-[rgba(240,180,41,0.1)] px-2.5 py-1 font-mono text-[7.5px] tracking-[0.16em] text-[#ffd88e]">
                        {b.prize.toUpperCase()}
                      </span>
                    </div>
                    <p className="mt-3.5 text-[12px] leading-[1.72] text-[#8ba4be]">
                      <span className="text-[#c3d6ea]">{b.claim}</span> —{' '}
                      {b.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
