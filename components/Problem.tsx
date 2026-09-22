"use client";
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, MoonStar, SunMedium } from 'lucide-react';
import { AnimatedNumber, Reveal } from '../lib/motion';

const STATS = [
  {
    icon: Clock,
    value: 6.5,
    decimals: 1,
    suffix: 'h',
    label: 'Real share pricing window',
    body: 'US equities only truly price for about six and a half hours a day.',
    tint: '#f0b429',
  },
  {
    icon: MoonStar,
    value: 24,
    decimals: 0,
    suffix: '/7',
    label: 'Tokenized stocks trade',
    body: 'xStocks and Ondo tokens keep moving long after the US close.',
    tint: '#d99b2e',
  },
  {
    icon: AlertTriangle,
    value: 100,
    decimals: 0,
    suffix: '%',
    label: 'Of the time, basis is unknown',
    body: 'Without a live reference, traders fly blind on fair value.',
    tint: '#e9b95c',
  },
];

export default function Problem() {
  return (
    <section id="problem" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#161006_0%,#080e1c_42%,#161006_100%)]" />
      <div className="grid-fine absolute inset-0 -z-10 opacity-60" />

      <div className="mx-auto max-w-[1240px] px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr]">
          {/* ------------------------------- copy ------------------------------- */}
          <div>
            <Reveal>
              <div className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e9b95c]" />
                <p className="eyebrow !text-[#e8b978]">The problem</p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="mt-6 font-display text-[clamp(2.15rem,4.4vw,3.35rem)] font-bold leading-[1.06] tracking-[-0.028em] text-[#eef6ff]">
                Trading tokenized stocks{' '}
                <span className="grad-text-cool">while flying blind.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 max-w-[520px] text-[15.5px] leading-[1.78] text-[#93a9c2]">
                Tokenized stocks trade 24/7 on Solana — but the real share only
                prices for about 6.5 hours a day, in US hours. After the close,
                the on-chain token quietly decouples from the underlying asset.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-6 rounded-2xl border border-[rgba(227,178,80,0.24)] bg-[rgba(227,178,80,0.07)] p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[rgba(227,178,80,0.16)]">
                    <SunMedium className="h-4 w-4 text-[#eccb8c]" strokeWidth={2.2} />
                  </div>
                  <p className="text-[13.5px] leading-[1.72] text-[#d7c3a3]">
                    A trader in Lagos buying{' '}
                    <span className="font-mono text-[12.5px] text-[#ffd7a6]">
                      xAAPL
                    </span>{' '}
                    at 2am has no reliable way to know if they are overpaying.
                    Pyth publishes all three prices at once — CLASP turns that
                    into a live basis signal.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="group rounded-2xl border border-[rgba(214,182,116,0.13)] bg-[rgba(214,182,116,0.045)] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[rgba(214,182,116,0.26)]"
                  >
                    <s.icon
                      className="h-[18px] w-[18px]"
                      style={{ color: s.tint }}
                      strokeWidth={2}
                    />
                    <p
                      className="mt-3.5 font-display text-[30px] font-bold leading-none tracking-[-0.03em]"
                      style={{ color: s.tint }}
                    >
                      <AnimatedNumber
                        value={s.value}
                        decimals={s.decimals}
                        suffix={s.suffix}
                      />
                    </p>
                    <p className="mt-2.5 font-mono text-[8.5px] uppercase leading-[1.7] tracking-[0.19em] text-[#7b94af]">
                      {s.label}
                    </p>
                    <p className="mt-2.5 text-[11.5px] leading-[1.7] text-[#61798f]">
                      {s.body}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ------------------------------- chart ------------------------------ */}
          <Reveal delay={0.14}>
            <div className="glass relative overflow-hidden rounded-[26px] p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#6f8ba7]">
                    Basis divergence · illustrative
                  </p>
                  <p className="mt-1.5 font-display text-[19px] font-semibold tracking-[-0.015em] text-[#e2eefb]">
                    What happens after the US close
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex items-center gap-1.5">
                    <span className="h-[3px] w-6 rounded-full bg-[#f0b429]" />
                    <span className="font-mono text-[8.5px] tracking-[0.16em] text-[#7f9bb6]">
                      EQUITY
                    </span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-[3px] w-6 rounded-full bg-[#d99b2e]" />
                    <span className="font-mono text-[8.5px] tracking-[0.16em] text-[#7f9bb6]">
                      XSTOCK 24/7
                    </span>
                  </span>
                </div>
              </div>

              <div className="relative mt-6 overflow-hidden rounded-2xl border border-[rgba(214,182,116,0.12)] bg-[rgba(214,182,116,0.04)] p-1">
                <svg viewBox="0 0 680 300" className="h-auto w-full">
                  <defs>
                    <linearGradient id="blindZone" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#d99b2e" stopOpacity="0.03" />
                      <stop offset="100%" stopColor="#d99b2e" stopOpacity="0.14" />
                    </linearGradient>
                    <linearGradient id="eqLine" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#f0b429" />
                      <stop offset="100%" stopColor="#f0b429" stopOpacity="0.35" />
                    </linearGradient>
                    <linearGradient id="xsFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#d99b2e" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#d99b2e" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* grid */}
                  {[60, 110, 160, 210, 260].map((y) => (
                    <line
                      key={y}
                      x1="30"
                      x2="656"
                      y1={y}
                      y2={y}
                      stroke="rgba(214,182,116,0.1)"
                      strokeWidth="1"
                    />
                  ))}

                  {/* blind zone */}
                  <rect
                    x="352"
                    y="26"
                    width="304"
                    height="248"
                    fill="url(#blindZone)"
                  />
                  <line
                    x1="352"
                    x2="352"
                    y1="26"
                    y2="274"
                    stroke="rgba(217,155,46,0.5)"
                    strokeWidth="1.5"
                    strokeDasharray="6 7"
                  />

                  {/* xstock area + line */}
                  <motion.path
                    d="M30 226 C 100 214, 148 186, 202 190 S 292 150, 352 146 C 418 138, 470 108, 528 92 S 612 62, 652 52 L 652 274 L 30 274 Z"
                    fill="url(#xsFill)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: 0.5 }}
                  />
                  <motion.path
                    d="M30 226 C 100 214, 148 186, 202 190 S 292 150, 352 146 C 418 138, 470 108, 528 92 S 612 62, 652 52"
                    fill="none"
                    stroke="#d99b2e"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.9, ease: 'easeInOut' }}
                  />

                  {/* equity line (stops at close) */}
                  <motion.path
                    d="M30 226 C 100 214, 148 186, 202 190 S 292 150, 352 146"
                    fill="none"
                    stroke="url(#eqLine)"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.25, ease: 'easeInOut' }}
                  />
                  <motion.path
                    d="M352 146 C 420 148, 470 152, 528 150 S 612 152, 652 151"
                    fill="none"
                    stroke="rgba(240,180,41,0.32)"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeDasharray="7 9"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 1.15 }}
                  />

                  {/* markers */}
                  <circle cx="352" cy="146" r="6" fill="#f0b429" />
                  <circle
                    cx="352"
                    cy="146"
                    r="12"
                    fill="none"
                    stroke="rgba(240,180,41,0.42)"
                    strokeWidth="2"
                  />
                  <circle cx="652" cy="52" r="6" fill="#d99b2e" />
                  <circle cx="652" cy="151" r="5" fill="rgba(240,180,41,0.5)" />

                  {/* labels */}
                  <text
                    x="366"
                    y="48"
                    fill="#ffe4b4"
                    fontSize="12"
                    fontFamily="IBM Plex Mono, monospace"
                    letterSpacing="2"
                  >
                    THE BLIND ZONE
                  </text>
                  <text
                    x="366"
                    y="70"
                    fill="rgba(217,155,46,0.62)"
                    fontSize="10.5"
                    fontFamily="IBM Plex Mono, monospace"
                    letterSpacing="1.4"
                  >
                    no equity reference · basis risk
                  </text>
                  <text
                    x="30"
                    y="292"
                    fill="#5b7691"
                    fontSize="10"
                    fontFamily="IBM Plex Mono, monospace"
                    letterSpacing="1.8"
                  >
                    9:30 AM
                  </text>
                  <text
                    x="286"
                    y="292"
                    fill="#5b7691"
                    fontSize="10"
                    fontFamily="IBM Plex Mono, monospace"
                    letterSpacing="1.8"
                  >
                    4:00 PM
                  </text>
                  <text
                    x="586"
                    y="292"
                    fill="#5b7691"
                    fontSize="10"
                    fontFamily="IBM Plex Mono, monospace"
                    letterSpacing="1.8"
                  >
                    2:00 AM
                  </text>
                  <text
                    x="272"
                    y="122"
                    fill="#ffe8bb"
                    fontSize="10"
                    fontFamily="IBM Plex Mono, monospace"
                    letterSpacing="1.6"
                  >
                    US CLOSE
                  </text>
                </svg>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#5d7994]">
                  Source: Jupiter Price v3 · on-chain xStock px + official equity ref
                </p>
                <div className="ml-auto flex items-center gap-2">
                  <span className="live-dot h-1.5 w-1.5 rounded-full bg-[#f0b429]" />
                  <span className="font-mono text-[9px] tracking-[0.18em] text-[#ffe0a0]">
                    CLASP RESOLVES THIS
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
