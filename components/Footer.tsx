"use client";
import { useEffect, useState } from 'react';
import { ArrowUp, ArrowUpRight, Code2, Mail, Radio, Terminal } from 'lucide-react';
import Logo from './Logo';
import { scrollToId } from '../lib/motion';

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Basis terminal', href: '#terminal' },
      { label: 'Agent marketplace', href: '#agents' },
      { label: 'Earn on RWAs', href: '#earn' },
      { label: 'How it works', href: '#how' },
    ],
  },
  {
    title: 'Stack',
    links: [
      {
        label: 'Clawpump',
        href: 'https://clawpump.tech',
        external: true,
      },
      {
        label: 'Meteora DBC',
        href: 'https://www.meteora.ag',
        external: true,
      },
      {
        label: 'Pyth Network',
        href: 'https://www.pyth.network',
        external: true,
      },
      {
        label: 'Solana',
        href: 'https://solana.com',
        external: true,
      },
    ],
  },
  {
    title: 'Build',
    links: [
      {
        label: 'GitHub repo',
        href: 'https://github.com/Arinzaay007/clasp',
        external: true,
      },
      { label: 'Build log', href: '#timeline' },
      { label: 'Architecture', href: '#build' },
      {
        label: 'Pyth feed IDs',
        href: 'https://pyth.network/developers/price-feed-ids',
        external: true,
      },
    ],
  },
];

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 720);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <footer className="relative overflow-hidden border-t border-[rgba(214,182,116,0.14)]">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#070c17_0%,#05080f_100%)]" />
      <div className="grid-bg absolute inset-0 -z-10 opacity-40" />

      <div className="mx-auto max-w-[1240px] px-6 pb-12 pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.55fr_1fr_1fr_1fr]">
          {/* brand */}
          <div>
            <Logo size={52} />
            <p className="mt-6 max-w-[330px] text-[13.5px] leading-[1.82] text-[#7c96b1]">
              Clawpump Launched Agents for Stocknized Pools. Know the true price
              of a tokenized stock — even at 3am.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              <a
                href="https://github.com/Arinzaay007/clasp"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(214,182,116,0.2)] text-[#cbb28f] transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(240,180,41,0.44)] hover:text-[#ffe9c0]"
                aria-label="GitHub"
              >
                <Code2 className="h-4 w-4" strokeWidth={2} />
              </a>
              <a
                href="https://x.com/he_is_arinzaay"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(214,182,116,0.2)] text-[#cbb28f] transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(240,180,41,0.44)] hover:text-[#ffe9c0]"
                aria-label="X / Twitter"
              >
                <Radio className="h-4 w-4" strokeWidth={2} />
              </a>
              <a
                href="mailto:hello@clasp.dev"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(214,182,116,0.2)] text-[#cbb28f] transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(240,180,41,0.44)] hover:text-[#ffe9c0]"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" strokeWidth={2} />
              </a>
            </div>

            <div className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-[rgba(240,180,41,0.22)] bg-[rgba(240,180,41,0.07)] px-4 py-2.5">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-[#f0b429]" />
              <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#ffdc98]">
                Devnet live · mainnet dry run pending
              </p>
            </div>
          </div>

          {/* link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-[8px] uppercase tracking-[0.26em] text-[#54708c]">
                {col.title}
              </h4>
              <ul className="mt-6 space-y-3.5">
                {col.links.map((l) =>
                  'external' in l && l.external ? (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-1.5 text-[12.5px] text-[#8ba4be] transition-colors duration-300 hover:text-[#ffe9c0]"
                      >
                        {l.label}
                        <ArrowUpRight
                          className="h-3 w-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          strokeWidth={2.4}
                        />
                      </a>
                    </li>
                  ) : (
                    <li key={l.label}>
                      <button
                        type="button"
                        onClick={() => scrollToId(l.href)}
                        className="text-[12.5px] text-[#8ba4be] transition-colors duration-300 hover:text-[#ffe9c0]"
                      >
                        {l.label}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* protocol strip */}
        <div className="mt-16 grid grid-cols-2 gap-4 rounded-[20px] border border-[rgba(214,182,116,0.12)] bg-[rgba(214,182,116,0.04)] p-7 md:grid-cols-4">
          {[
            ['$SAAPL mint', 'DWMgU6…4s7G'],
            ['$CAAPL mint', '6AjyCg…Mwrv'],
            ['Price feed', 'lite-api.jup.ag/price/v3'],
            ['Launch API', 'clawpump.tech/api'],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="font-mono text-[7px] uppercase tracking-[0.22em] text-[#4f6b87]">
                {k}
              </p>
              <p className="mt-2 font-mono text-[10px] tracking-[0.1em] text-[#7c96b1]">
                {v}
              </p>
            </div>
          ))}
        </div>

        {/* bottom bar */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-[rgba(214,182,116,0.12)] pt-8">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#4f6b87]">
              © 2026 CLASP · Built for Stocklana
            </p>
            <p className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.2em] text-[#4f6b87]">
              <Terminal className="h-2.5 w-2.5" strokeWidth={2.4} />
              Simulated data · not financial advice
            </p>
          </div>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2 rounded-full border border-[rgba(214,182,116,0.2)] px-4 py-2.5 font-mono text-[8px] uppercase tracking-[0.2em] text-[#7c96b1] transition-all duration-300 hover:border-[rgba(240,180,41,0.42)] hover:text-[#ffe9c0]"
          >
            <ArrowUp
              className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5"
              strokeWidth={2.4}
            />
            Back to top
          </button>
        </div>
      </div>

      {/* floating scroll-to-top */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(240,180,41,0.34)] bg-[rgba(26,19,8,0.92)] text-[#ffe9c0] shadow-[0_18px_40px_-16px_rgba(0,0,0,0.9)] backdrop-blur transition-all duration-400 ${
          showTop
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        <ArrowUp className="h-4 w-4" strokeWidth={2.4} />
      </button>
    </footer>
  );
}
