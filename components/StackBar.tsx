"use client";
import { Cpu, Radio, Waves, Zap } from 'lucide-react';
import { Reveal } from '../lib/motion';

const STACK = [
  {
    name: 'Clawpump',
    sub: 'Gasless agent launch',
    icon: Zap,
    tint: '#f0b429',
    glow: 'rgba(240,180,41,0.16)',
  },
  {
    name: 'Meteora DBC',
    sub: 'Bonding curves + fees',
    icon: Waves,
    tint: '#d99b2e',
    glow: 'rgba(217,155,46,0.14)',
  },
  {
    name: 'Pyth Network',
    sub: 'The live data brain',
    icon: Radio,
    tint: '#e9c26c',
    glow: 'rgba(228,186,102,0.15)',
  },
  {
    name: 'Solana',
    sub: 'Settlement layer',
    icon: Cpu,
    tint: '#ecc672',
    glow: 'rgba(232,192,106,0.15)',
  },
];

export default function StackBar() {
  return (
    <section className="relative mx-auto max-w-[1240px] px-6 py-16">
      <Reveal>
        <div className="flex flex-col items-center gap-3">
          <p className="eyebrow">Built on</p>
          <div className="hairline w-40" />
        </div>
      </Reveal>

      <div className="mt-9 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STACK.map((s, i) => (
          <Reveal key={s.name} delay={i * 0.08}>
            <div className="group relative overflow-hidden rounded-[22px] border border-[rgba(214,182,116,0.14)] bg-[rgba(214,182,116,0.045)] px-6 py-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-[rgba(214,182,116,0.28)]">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: s.glow }}
              />
              <div
                className="flex h-11 w-11 items-center justify-center rounded-2xl border"
                style={{
                  borderColor: `${s.tint}44`,
                  background: `${s.tint}14`,
                }}
              >
                <s.icon
                  className="h-[19px] w-[19px]"
                  style={{ color: s.tint }}
                  strokeWidth={2}
                />
              </div>
              <p className="mt-5 font-display text-[17px] font-semibold tracking-[-0.012em] text-[#e4eefb]">
                {s.name}
              </p>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#7d97b3]">
                {s.sub}
              </p>
              <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[rgba(214,182,116,0.18)] to-transparent" />
              <p className="mt-4 font-mono text-[8.5px] uppercase tracking-[0.22em] text-[#4e6a86]">
                Integrated · v0.5
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
