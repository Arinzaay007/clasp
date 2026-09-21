"use client";
import { ArrowRight, Code2, MessageCircle, Rocket, ShieldCheck, Zap } from 'lucide-react';
import { Reveal, scrollToId, useCountdown } from '../lib/motion';
import Logo from './Logo';

const PROOF = [
  { icon: Zap, label: 'Gasless to launch' },
  { icon: ShieldCheck, label: 'On-chain verified pricing' },
  { icon: Rocket, label: 'Live on devnet' },
];

export default function Finale() {
  const cd = useCountdown();

  return (
    <section id="cta" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(85%_70%_at_50%_20%,rgba(240,180,41,0.12),transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_90%,rgba(217,155,46,0.1),transparent_62%)]" />
        <div className="grid-bg absolute inset-0 opacity-55" />
        {/* oversized brand mark watermark */}
        <img
          src="/uploads/clasp-logo.jpg"
          alt=""
          aria-hidden
          className="logo-gold pointer-events-none absolute left-1/2 top-1/2 w-[1020px] max-w-none -translate-x-1/2 -translate-y-1/2 rounded-[80px] opacity-[0.15] mix-blend-screen blur-[3px]"
        />
      </div>

      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal>
          <div className="glass-deep grad-border relative overflow-hidden rounded-[32px]">
            {/* decorative rings */}
            <div
              aria-hidden
              className="pointer-events-none absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full border border-[rgba(240,180,41,0.12)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -left-12 -top-12 h-[300px] w-[300px] rounded-full border border-[rgba(240,180,41,0.1)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-32 -right-20 h-[460px] w-[460px] rounded-full border border-[rgba(217,155,46,0.12)]"
            />

            <div className="relative grid items-center gap-10 p-9 sm:p-12 lg:grid-cols-[1.15fr_0.85fr] lg:p-16">
              {/* copy */}
              <div>
                <div className="flex items-center gap-3">
                  <Logo size={52} markOnly />
                  <div className="h-9 w-px bg-[rgba(214,182,116,0.22)]" />
                  <p className="font-mono text-[8.5px] uppercase tracking-[0.26em] text-[#ffdc98]">
                    Stocklana · Solana Hackathon 2026
                  </p>
                </div>

                <h2 className="mt-8 font-display text-[clamp(2.35rem,5.2vw,4.15rem)] font-bold leading-[1.02] tracking-[-0.032em] text-[#f2f8ff]">
                  Your turn to <span className="grad-text">clasp the market.</span>
                </h2>

                <p className="mt-6 max-w-[520px] text-[16px] leading-[1.76] text-[#9db2cb]">
                  Launch a Stocknized Agent, bond it to its stock, and earn on
                  real-world assets — gasless on Solana. The terminal is live,
                  the feeds are streaming, and the deadline is close.
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => scrollToId('#agents')}
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
                    Open the terminal
                  </button>
                </div>

                <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
                  {PROOF.map((p) => (
                    <div key={p.label} className="flex items-center gap-2">
                      <p.icon className="h-3.5 w-3.5 text-[#ffe0a0]" strokeWidth={2.2} />
                      <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#7f9bb6]">
                        {p.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* countdown panel */}
              <div className="relative">
                <div className="rounded-[22px] border border-[rgba(240,180,41,0.22)] bg-[rgba(240,180,41,0.07)] p-7">
                  <div className="flex items-center gap-2.5">
                    <span className="live-dot h-1.5 w-1.5 rounded-full bg-[#f0b429]" />
                    <p className="font-mono text-[8px] uppercase tracking-[0.24em] text-[#ffdc98]">
                      Submission window closes in
                    </p>
                  </div>

                  <div className="mt-6 grid grid-cols-4 gap-2.5">
                    {[
                      { v: cd.days, l: 'Days' },
                      { v: cd.hours, l: 'Hours' },
                      { v: cd.minutes, l: 'Mins' },
                      { v: cd.seconds, l: 'Secs' },
                    ].map((u) => (
                      <div
                        key={u.l}
                        className="rounded-2xl border border-[rgba(214,182,116,0.16)] bg-[rgba(214,182,116,0.07)] px-2 py-4 text-center"
                      >
                        <p className="font-display text-[27px] font-bold leading-none tracking-[-0.03em] text-[#eaf6ff]">
                          {String(u.v).padStart(2, '0')}
                        </p>
                        <p className="mt-2 font-mono text-[7px] uppercase tracking-[0.22em] text-[#61798f]">
                          {u.l}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 space-y-3.5">
                    {[
                      ['Target date', 'Sep 25, 2026 · 16:00 EDT'],
                      ['Network', 'Solana · devnet → mainnet'],
                      ['Status', 'Day 5 of 9 · on track'],
                    ].map(([k, v]) => (
                      <div
                        key={k}
                        className="flex items-center justify-between border-b border-[rgba(214,182,116,0.12)] pb-3.5 last:border-0 last:pb-0"
                      >
                        <p className="font-mono text-[7.5px] uppercase tracking-[0.2em] text-[#61798f]">
                          {k}
                        </p>
                        <p className="font-mono text-[9px] tracking-[0.11em] text-[#b8cee4]">
                          {v}
                        </p>
                      </div>
                    ))}
                  </div>

                  <a
                    href="https://github.com/Arinzaay007/clasp"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 flex items-center justify-center gap-2 rounded-full border border-[rgba(214,182,116,0.24)] px-4 py-3 text-[11px] text-[#9db3cd] transition-all duration-300 hover:border-[rgba(240,180,41,0.46)] hover:text-[#ffe9c0]"
                  >
                    <Code2 className="h-3.5 w-3.5" strokeWidth={2.1} />
                    Follow the build on GitHub
                  </a>

                  <a
                    href="https://x.com/he_is_arinzaay"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2.5 flex items-center justify-center gap-2 rounded-full border border-[rgba(214,182,116,0.24)] px-4 py-3 text-[11px] text-[#9db3cd] transition-all duration-300 hover:border-[rgba(240,180,41,0.46)] hover:text-[#ffe9c0]"
                  >
                    <MessageCircle className="h-3.5 w-3.5" strokeWidth={2.1} />
                    Daily updates on X
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
