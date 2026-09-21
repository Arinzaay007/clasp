"use client";
import { ArrowRight, Check, Radio, Sparkles, Users, Waves, Zap } from 'lucide-react';
import { STEPS } from '../lib/data';
import { Reveal, scrollToId } from '../lib/motion';

const ICONS = [Zap, Waves, Radio, Users];
const TINTS = ['#f0b429', '#d99b2e', '#e9c26c', '#ecc672'];

export default function HowItWorks() {
  return (
    <section id="how" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(90%_60%_at_50%_0%,rgba(240,180,41,0.07),transparent_62%)]" />

      <div className="mx-auto max-w-[1240px] px-6">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <div className="flex items-center gap-2.5">
              <Sparkles className="h-3.5 w-3.5 text-[#ffe0a0]" strokeWidth={2.4} />
              <p className="eyebrow">How it works</p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mt-6 max-w-[760px] font-display text-[clamp(2.15rem,4.4vw,3.35rem)] font-bold leading-[1.07] tracking-[-0.028em] text-[#eef6ff]">
              Four moves from <span className="grad-text">idea to yield.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-5 max-w-[560px] text-[15.5px] leading-[1.76] text-[#8ea6bf]">
              Every CLASP agent follows the same on-chain path — launch, bond,
              think, and get backed. No gatekeepers, no funded wallets, no
              waiting for market open.
            </p>
          </Reveal>
        </div>

        {/* connecting rail */}
        <div className="relative mt-16">
          <div className="absolute left-[12%] right-[12%] top-[46px] hidden h-px lg:block">
            <div className="h-full w-full bg-gradient-to-r from-[rgba(240,180,41,0.05)] via-[rgba(240,180,41,0.38)] via-[rgba(217,155,46,0.3)] to-[rgba(232,192,106,0.12)]" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => {
              const Icon = ICONS[i];
              const tint = TINTS[i];
              return (
                <Reveal key={s.n} delay={i * 0.1}>
                  <div className="group relative h-full">
                    {/* node */}
                    <div className="relative z-10 flex items-center gap-4">
                      <div
                        className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl border transition-transform duration-500 group-hover:-translate-y-1"
                        style={{
                          borderColor: `${tint}40`,
                          background: `linear-gradient(150deg, ${tint}22, ${tint}0a)`,
                          boxShadow: `0 16px 40px -18px ${tint}66`,
                        }}
                      >
                        <Icon
                          className="h-[21px] w-[21px]"
                          style={{ color: tint }}
                          strokeWidth={2}
                        />
                      </div>
                      <div>
                        <p
                          className="font-mono text-[9px] tracking-[0.24em]"
                          style={{ color: `${tint}cc` }}
                        >
                          STEP {s.n}
                        </p>
                        <p className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.2em] text-[#5f7b96]">
                          {s.tag}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 rounded-[20px] border border-[rgba(214,182,116,0.13)] bg-[rgba(214,182,116,0.04)] p-6 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-[rgba(214,182,116,0.26)] group-hover:bg-[rgba(214,182,116,0.07)]">
                      <h3 className="font-display text-[18.5px] font-semibold leading-[1.28] tracking-[-0.014em] text-[#e6f0fb]">
                        {s.title}
                      </h3>
                      <p className="mt-3 text-[12.8px] leading-[1.76] text-[#7c96b1]">
                        {s.body}
                      </p>
                      <ul className="mt-5 space-y-2.5">
                        {s.points.map((p) => (
                          <li
                            key={p}
                            className="flex items-start gap-2.5 text-[11.5px] leading-[1.6] text-[#8ba4be]"
                          >
                            <span
                              className="mt-[3px] flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full"
                              style={{ background: `${tint}1f` }}
                            >
                              <Check
                                className="h-[9px] w-[9px]"
                                style={{ color: tint }}
                                strokeWidth={3.2}
                              />
                            </span>
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => scrollToId('#terminal')}
              className="btn-primary"
            >
              See it live in the terminal
              <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
            </button>
            <button
              type="button"
              onClick={() => scrollToId('#build')}
              className="btn-ghost"
            >
              Read the architecture
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
