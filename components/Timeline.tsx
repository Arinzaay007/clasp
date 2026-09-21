"use client";
import { CalendarCheck, Check, CircleDashed, Flame } from 'lucide-react';
import { PHASES } from '../lib/data';
import { Reveal } from '../lib/motion';

const STATUS_STYLE = {
  done: {
    badge: 'Done',
    color: '#ffe0a0',
    border: 'rgba(240,180,41,0.32)',
    bg: 'rgba(240,180,41,0.1)',
  },
  active: {
    badge: 'In progress',
    color: '#ffe4b4',
    border: 'rgba(217,155,46,0.42)',
    bg: 'rgba(217,155,46,0.12)',
  },
  upcoming: {
    badge: 'Upcoming',
    color: '#7c96b1',
    border: 'rgba(214,182,116,0.22)',
    bg: 'rgba(214,182,116,0.07)',
  },
} as const;

export default function Timeline() {
  return (
    <section id="timeline" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_56%_at_50%_10%,rgba(240,180,41,0.06),transparent_62%)]" />

      <div className="mx-auto max-w-[1240px] px-6">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          {/* ------------------------------ intro ------------------------------ */}
          <div className="lg:sticky lg:top-[112px] lg:self-start">
            <Reveal>
              <div className="flex items-center gap-2.5">
                <CalendarCheck className="h-3.5 w-3.5 text-[#ffe0a0]" strokeWidth={2.3} />
                <p className="eyebrow">Build log</p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="mt-6 font-display text-[clamp(2.05rem,4vw,3.05rem)] font-bold leading-[1.08] tracking-[-0.028em] text-[#eef6ff]">
                Nine days from{' '}
                <span className="grad-text">concept to submission.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-5 max-w-[440px] text-[14.5px] leading-[1.78] text-[#8ea6bf]">
                CLASP is being built in the open for the Stocklana hackathon —
                daily commits, public demos, and a hard deadline on September
                25, 2026.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 rounded-[20px] border border-[rgba(214,182,116,0.15)] bg-[rgba(214,182,116,0.05)] p-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#54708c]">
                      Current phase
                    </p>
                    <p className="mt-2 font-display text-[28px] font-bold leading-none tracking-[-0.028em] text-[#e6f0fb]">
                      Day 5 <span className="text-[#54708c]">/ 9</span>
                    </p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(217,155,46,0.34)] bg-[rgba(217,155,46,0.12)]">
                    <Flame className="h-4.5 w-4.5 text-[#ffe4b4]" strokeWidth={2.1} />
                  </div>
                </div>

                <div className="mt-5 h-[7px] w-full overflow-hidden rounded-full bg-[rgba(214,182,116,0.14)]">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: '44%',
                      background: 'linear-gradient(90deg,#f0b429,#d99b2e)',
                    }}
                  />
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                  {[
                    { k: 'Completed', v: '4 days', tint: '#ffe0a0' },
                    { k: 'Active', v: '1 day', tint: '#ffe4b4' },
                    { k: 'Remaining', v: '4 days', tint: '#cbb28f' },
                  ].map((s) => (
                    <div key={s.k} className="flex items-center gap-2">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: s.tint }}
                      />
                      <p className="font-mono text-[8px] tracking-[0.16em] text-[#61798f]">
                        {s.k.toUpperCase()}
                      </p>
                      <p
                        className="font-mono text-[9px]"
                        style={{ color: s.tint }}
                      >
                        {s.v}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* ------------------------------ phases ----------------------------- */}
          <div className="relative">
            {/* vertical rail */}
            <div className="absolute bottom-6 left-[19px] top-6 w-px bg-gradient-to-b from-[rgba(240,180,41,0.42)] via-[rgba(217,155,46,0.3)] to-[rgba(214,182,116,0.1)]" />

            <div className="space-y-5">
              {PHASES.map((p, i) => {
                const style = STATUS_STYLE[p.status];
                return (
                  <Reveal key={p.day} delay={Math.min(i * 0.07, 0.5)}>
                    <div className="group relative flex gap-5">
                      {/* node */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div
                          className={`flex h-[39px] w-[39px] shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                            p.status === 'active'
                              ? 'shadow-[0_0_0_6px_rgba(217,155,46,0.1)]'
                              : ''
                          }`}
                          style={{
                            borderColor: style.border,
                            background: style.bg,
                          }}
                        >
                          {p.status === 'done' ? (
                            <Check className="h-[15px] w-[15px]" style={{ color: style.color }} strokeWidth={2.8} />
                          ) : p.status === 'active' ? (
                            <span className="live-dot h-2.5 w-2.5 rounded-full bg-[#d99b2e]" />
                          ) : (
                            <CircleDashed
                              className="h-[15px] w-[15px]"
                              style={{ color: style.color }}
                              strokeWidth={2}
                            />
                          )}
                        </div>
                      </div>

                      {/* card */}
                      <div
                        className={`flex-1 rounded-[18px] border p-5 transition-all duration-500 group-hover:-translate-y-0.5 ${
                          p.status === 'active'
                            ? 'border-[rgba(217,155,46,0.28)] bg-[rgba(217,155,46,0.07)]'
                            : 'border-[rgba(214,182,116,0.13)] bg-[rgba(214,182,116,0.04)] group-hover:border-[rgba(214,182,116,0.26)]'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <p
                              className="font-mono text-[8px] tracking-[0.22em]"
                              style={{ color: style.color }}
                            >
                              {p.day.toUpperCase()}
                            </p>
                            <span className="h-3 w-px bg-[rgba(214,182,116,0.2)]" />
                            <p className="font-display text-[14.5px] font-semibold tracking-[-0.012em] text-[#e2eefb]">
                              {p.title}
                            </p>
                          </div>
                          <span
                            className="rounded-full border px-2.5 py-1 font-mono text-[7px] uppercase tracking-[0.18em]"
                            style={{
                              color: style.color,
                              borderColor: style.border,
                              background: style.bg,
                            }}
                          >
                            {style.badge}
                          </span>
                        </div>
                        <p className="mt-3 text-[12px] leading-[1.76] text-[#7c96b1]">
                          {p.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
