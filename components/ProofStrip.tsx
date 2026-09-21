"use client";
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { Reveal } from '../lib/motion';

/**
 * Verify-everything strip — every claim on this site, as a Solscan link.
 * All four transactions are finalized on Solana mainnet, signed by agents.
 */

const PROOFS = [
  {
    tag: 'TX 1',
    title: 'Agent launches its own token',
    detail: '$CAAPL — the CLASP agent paid the launch from its own wallet',
    href: 'https://solscan.io/tx/5uEjZWz27rPbQfy3vsLcjrz77HE5rJ26qihn7LJUnxc3eR5C1LAPaN7DvHsWRtFCmNYF3824ETPQhStJptobEa22',
  },
  {
    tag: 'TX 2',
    title: 'Agent funds another agent',
    detail: '0.015 SOL — one AI paying another, on-chain',
    href: 'https://solscan.io/tx/2EN8GeWmZaJWoiiQ5bchimjyoA7VELuoKyY2hMCy9DEqbdjyFCQLPspW5zyYRhZpnpZQKVXJjbWFuCjHxmhM2k5g',
  },
  {
    tag: 'TX 3',
    title: 'Agent token quoted in Apple stock',
    detail: '$SAAPL — bonding curve vs AAPLx, every trade settles in the xStock',
    href: 'https://solscan.io/tx/2i2YC3t5mZBsF7TCYqVNvEi6hfMU1P2MS6ei8cPTykFJzcwaFm4G7RbYojkHQ2hyu4g6WYgq1BfgomfkYvhKRYJm',
  },
  {
    tag: 'TX 4',
    title: 'Agent buys tokenized Apple stock',
    detail: '0.002 SOL → AAPLx — the agent holds a real RWA right now',
    href: 'https://solscan.io/tx/5sPW8qjaNqCS6SiUQtvX1aYybNF2JoWSoVsrGHCHWaP6SVSWPCzSEaZJQFr6SaKnksQcni2dCLnKB3CSwR3Fkiwk',
  },
];

export default function ProofStrip() {
  return (
    <section className="relative border-y border-[rgba(214,182,116,0.14)] bg-[rgba(214,182,116,0.03)] py-10">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal>
          <div className="mb-6 flex items-center gap-2.5">
            <ShieldCheck className="h-4 w-4 text-[#f0b429]" strokeWidth={2.2} />
            <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-[#ffd88e]">
              Don&apos;t trust us — verify. Four finalized mainnet transactions,
              signed by agents.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PROOFS.map((p, i) => (
            <Reveal key={p.tag} delay={0.06 * i}>
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col rounded-2xl border border-[rgba(214,182,116,0.18)] bg-[rgba(22,16,6,0.6)] p-5 transition-all hover:-translate-y-0.5 hover:border-[rgba(240,180,41,0.5)] hover:bg-[rgba(240,180,41,0.06)]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#f0b429]">
                    {p.tag} · FINALIZED
                  </span>
                  <ExternalLink
                    className="h-3.5 w-3.5 text-[#8a7a58] transition-colors group-hover:text-[#f0b429]"
                    strokeWidth={2.2}
                  />
                </div>
                <p className="mt-3 text-[14px] font-semibold leading-snug text-[#f7efdd]">
                  {p.title}
                </p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-[#9c8763]">
                  {p.detail}
                </p>
                <p className="mt-auto pt-3 font-mono text-[10px] text-[#6f5f42] group-hover:text-[#cbb28f]">
                  solscan.io ↗
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
