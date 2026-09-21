"use client";
import { useEffect, useState } from 'react';
import { Activity, ArrowUpRight, Menu, Timer, X } from 'lucide-react';
import Logo from './Logo';
import { scrollToId, useCountdown, useScrolled } from '../lib/motion';

const LINKS = [
  { label: 'Terminal', href: '#terminal' },
  { label: 'How it works', href: '#how' },
  { label: 'Agents', href: '#agents' },
  { label: 'Earn', href: '#earn' },
  { label: 'Build', href: '#build' },
];

export default function Navbar() {
  const scrolled = useScrolled(18);
  const [open, setOpen] = useState(false);
  const cd = useCountdown();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* ------------------------------ ticker bar ------------------------------ */}
      <div className="relative overflow-hidden border-b border-[rgba(240,180,41,0.18)] bg-[#1a1108]">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-x-6 gap-y-1 px-6 py-2">
          <div className="flex items-center gap-2.5">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-[#f0b429]" />
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#ffdc98]">
              Stocklana · Solana Hackathon · Live build
            </p>
          </div>
          <div className="flex items-center gap-5">
            <p className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-[#6d87a6] sm:block">
              Submissions due Sep 25, 2026
            </p>
            <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.18em] text-[#fff0d2]">
              <Timer className="h-3 w-3 opacity-80" strokeWidth={2.2} />
              <span>
                {cd.days}D : {String(cd.hours).padStart(2, '0')}H :{' '}
                {String(cd.minutes).padStart(2, '0')}M :{' '}
                {String(cd.seconds).padStart(2, '0')}S
              </span>
            </div>
          </div>
        </div>
        <div className="shimmer-line pointer-events-none absolute inset-x-0 bottom-0 h-px" />
      </div>

      {/* -------------------------------- nav ---------------------------------- */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-[rgba(214,182,116,0.16)] bg-[rgba(23,17,7,0.86)] shadow-[0_18px_50px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-6 py-3.5">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-3 text-left"
            aria-label="CLASP home"
          >
            <Logo size={42} />
            <span className="ml-1 hidden items-center gap-1.5 rounded-full border border-[rgba(240,180,41,0.26)] bg-[rgba(240,180,41,0.08)] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-[#ffd994] lg:inline-flex">
              <Activity className="h-2.5 w-2.5" strokeWidth={2.6} />
              v1.0 mainnet
            </span>
          </button>

          <div className="hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => (
              <button
                key={l.href}
                type="button"
                onClick={() => scrollToId(l.href)}
                className="group relative rounded-full px-4 py-2 text-[13.5px] font-medium text-[#a9bdd6] transition-colors duration-300 hover:text-[#eaf6ff]"
              >
                <span className="relative z-10">{l.label}</span>
                <span className="absolute inset-x-4 bottom-1 h-px scale-x-0 bg-gradient-to-r from-[#f0b429] to-[#d99b2e] transition-transform duration-300 group-hover:scale-x-100" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="https://x.com/he_is_arinzaay"
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-1.5 rounded-full border border-[rgba(214,182,116,0.22)] px-3.5 py-2 text-[12.5px] text-[#9db3cd] transition-colors duration-300 hover:border-[rgba(240,180,41,0.45)] hover:text-[#ffe9c0] md:inline-flex"
            >
              @he_is_arinzaay
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
            </a>
            <button
              type="button"
              onClick={() => scrollToId('#launch')}
              className="btn-primary hidden !px-5 !py-2.5 !text-[13px] sm:inline-flex"
            >
              Launch an agent
            </button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(214,182,116,0.24)] text-[#cfe2f7] transition-colors hover:border-[rgba(240,180,41,0.5)] lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ----------------------------- mobile menu ----------------------------- */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 bg-[rgba(20,14,5,0.82)] backdrop-blur-md"
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute inset-x-0 top-[68px] mx-4 overflow-hidden rounded-[28px] border border-[rgba(214,182,116,0.2)] bg-[#1c1309] transition-transform duration-400 ${
            open ? 'translate-y-0' : '-translate-y-4'
          }`}
        >
          <div className="flex flex-col p-3">
            {LINKS.map((l, i) => (
              <button
                key={l.href}
                type="button"
                onClick={() => {
                  setOpen(false);
                  setTimeout(() => scrollToId(l.href), 120);
                }}
                className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-left text-[15px] font-medium text-[#c3d5ea] transition-colors hover:bg-[rgba(240,180,41,0.09)] hover:text-[#ffe9c0]"
              >
                {l.label}
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#4f6a89]">
                  0{i + 1}
                </span>
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setTimeout(() => scrollToId('#launch'), 120);
              }}
              className="btn-primary mt-3 w-full"
            >
              Launch an agent
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
