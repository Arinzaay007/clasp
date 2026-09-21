"use client";
import { useEffect, useRef, useState } from 'react';
import { Rocket, Wallet, Copy, Check, ExternalLink, Loader2 } from 'lucide-react';
import { Reveal } from '../lib/motion';

/**
 * REAL launch wizard — no simulation.
 * 1) creates a real Clawpump agent (server-side key)
 * 2) user funds the agent's real Solana wallet (~0.013 SOL)
 * 3) agent launches its token — optionally quoted in AAPLx (tokenized Apple)
 */

type Phase = 'form' | 'creating' | 'fund' | 'launching' | 'done' | 'error';

/** Injected Solana wallet provider (Phantom, Solflare, Backpack…). */
function getWalletProvider(): any | null {
  if (typeof window === 'undefined') return null;
  const w = window as any;
  return w.phantom?.solana ?? w.solana ?? w.solflare ?? null;
}

export default function LaunchPad() {
  const [phase, setPhase] = useState<Phase>('form');
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [quote, setQuote] = useState<'SOL' | 'AAPLX'>('AAPLX');
  const [userKey, setUserKey] = useState('');
  const [ownership, setOwnership] = useState<'yours' | 'clasp-demo'>('clasp-demo');
  const [agentId, setAgentId] = useState('');
  const [wallet, setWallet] = useState('');
  const [sol, setSol] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [err, setErr] = useState('');
  const [copied, setCopied] = useState(false);
  const pollRef = useRef<number | null>(null);

  const createAgent = async () => {
    if (!name.trim() || !symbol.trim()) {
      setErr('Give your agent a name and a token symbol.');
      return;
    }
    setErr('');
    setPhase('creating');
    try {
      const res = await fetch('/api/launch-agent', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          step: 'create',
          name,
          symbol,
          userKey: userKey.trim() || undefined,
        }),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error);
      setAgentId(d.agentId);
      setWallet(d.wallet);
      setOwnership(d.ownership ?? 'clasp-demo');
      setPhase('fund');
    } catch (e: any) {
      setErr(e.message ?? 'agent creation failed');
      setPhase('error');
    }
  };

  // poll the real wallet balance while waiting for funding
  useEffect(() => {
    if (phase !== 'fund' || !wallet) return;
    const poll = async () => {
      try {
        const res = await fetch('/api/launch-agent', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ step: 'status', wallet }),
        });
        const d = await res.json();
        if (typeof d.sol === 'number') setSol(d.sol);
      } catch {}
    };
    poll();
    pollRef.current = window.setInterval(poll, 8000);
    return () => {
      if (pollRef.current) window.clearInterval(pollRef.current);
    };
  }, [phase, wallet]);

  const launch = async () => {
    setErr('');
    setPhase('launching');
    try {
      const res = await fetch('/api/launch-agent', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          step: 'launch',
          agentId,
          name,
          symbol,
          quote,
          userKey: userKey.trim() || undefined,
        }),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error);
      setResult(d);
      setPhase('done');
    } catch (e: any) {
      setErr(e.message ?? 'launch failed');
      setPhase('fund'); // let them retry after fixing funding
    }
  };

  const copy = () => {
    navigator.clipboard?.writeText(wallet);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  // one-click funding via injected wallet (Phantom / Solflare / Backpack)
  const [funding, setFunding] = useState(false);
  const [fundMsg, setFundMsg] = useState('');
  const fundWithWallet = async () => {
    setFundMsg('');
    const provider = getWalletProvider();
    if (!provider) {
      setFundMsg('No Solana wallet found — install Phantom, or send manually below.');
      return;
    }
    setFunding(true);
    try {
      const { Connection, PublicKey, SystemProgram, Transaction } =
        await import('@solana/web3.js');
      const resp = await provider.connect();
      const from = new PublicKey(
        resp?.publicKey?.toString() ?? provider.publicKey.toString()
      );
      const conn = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');
      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: from,
          toPubkey: new PublicKey(wallet),
          lamports: Math.round(0.014 * 1e9),
        })
      );
      tx.feePayer = from;
      tx.recentBlockhash = (await conn.getLatestBlockhash()).blockhash;
      const { signature } = await provider.signAndSendTransaction(tx);
      setFundMsg(`Sent — tx ${signature.slice(0, 8)}… confirming, balance updates below.`);
    } catch (e: any) {
      setFundMsg(
        e?.message?.includes('User rejected')
          ? 'Transaction cancelled in wallet.'
          : e?.message ?? 'Wallet transfer failed — you can still send manually below.'
      );
    } finally {
      setFunding(false);
    }
  };

  const inputCls =
    'w-full rounded-xl border border-[rgba(214,182,116,0.22)] bg-[rgba(214,182,116,0.06)] px-4 py-3 font-mono text-[13px] text-[#f7efdd] placeholder:text-[#8a7a58] outline-none transition-colors focus:border-[rgba(240,180,41,0.55)]';

  return (
    <section id="launch" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#161006_0%,rgba(31,22,11,0.9)_50%,#161006_100%)]" />
      <div className="mx-auto max-w-[760px] px-6">
        <Reveal>
          <div className="text-center">
            <p className="eyebrow">Launch terminal</p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.028em] text-[#f7efdd]">
              Launch a real agent. <span className="grad-text">Right now.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[520px] text-[14px] leading-relaxed text-[#cbb28f]">
              This is not a demo. It creates a real Clawpump agent with its own
              Solana wallet, and launches a real token on mainnet — optionally
              quoted in tokenized Apple stock.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass-deep grad-border mt-10 rounded-[24px] p-7">
            {/* ---------------- form ---------------- */}
            {(phase === 'form' || phase === 'creating' || phase === 'error') && (
              <div className="space-y-4">
                <input
                  className={inputCls}
                  placeholder="Agent name — e.g. TSLA Nightwatch"
                  value={name}
                  maxLength={40}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className={inputCls}
                  placeholder="Token symbol — e.g. STSLA"
                  value={symbol}
                  maxLength={10}
                  onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                />
                <div className="flex gap-2">
                  {(['AAPLX', 'SOL'] as const).map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setQuote(q)}
                      className={`flex-1 rounded-xl border px-4 py-3 font-mono text-[11px] tracking-[0.12em] transition-all ${
                        quote === q
                          ? 'border-[rgba(240,180,41,0.55)] bg-[rgba(240,180,41,0.13)] text-[#ffedcb]'
                          : 'border-[rgba(214,182,116,0.18)] text-[#9c8763] hover:border-[rgba(240,180,41,0.35)]'
                      }`}
                    >
                      {q === 'AAPLX'
                        ? 'QUOTE IN AAPLx · tokenized Apple'
                        : 'QUOTE IN SOL'}
                    </button>
                  ))}
                </div>
                <div className="rounded-xl border border-[rgba(214,182,116,0.16)] bg-[rgba(214,182,116,0.04)] p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#9c8763]">
                    Own your agent (recommended)
                  </p>
                  <p className="mt-2 text-[12px] leading-relaxed text-[#cbb28f]">
                    Paste your own Clawpump API key and the agent is created in{' '}
                    <span className="text-[#ffe4b4]">your</span> account — you
                    manage it, chat with it, and collect its fees from your own{' '}
                    <a
                      href="https://clawpump.tech"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#f0b429] underline decoration-[rgba(240,180,41,0.4)] underline-offset-2"
                    >
                      clawpump.tech
                    </a>{' '}
                    dashboard. Your key is used for this request only — never
                    stored. Leave blank to launch a demo agent in the CLASP
                    account instead.
                  </p>
                  <input
                    className={`${inputCls} mt-3`}
                    placeholder="cpk_… (optional — get one free at clawpump.tech)"
                    value={userKey}
                    onChange={(e) => setUserKey(e.target.value)}
                  />
                </div>
                {err && (
                  <p className="font-mono text-[11px] text-[#e0b062]">{err}</p>
                )}
                <button
                  type="button"
                  onClick={createAgent}
                  disabled={phase === 'creating'}
                  className="btn-primary flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-[14px] font-semibold disabled:opacity-60"
                >
                  {phase === 'creating' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Creating real
                      agent…
                    </>
                  ) : (
                    <>
                      <Rocket className="h-4 w-4" /> Create agent on Clawpump
                    </>
                  )}
                </button>
              </div>
            )}

            {/* ---------------- fund ---------------- */}
            {(phase === 'fund' || phase === 'launching') && (
              <div className="space-y-5">
                <div className="flex items-center gap-2.5">
                  <Wallet className="h-4 w-4 text-[#f0b429]" />
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#ffd88e]">
                    Agent created — fund its wallet
                  </p>
                </div>
                <p className="text-[13px] leading-relaxed text-[#cbb28f]">
                  Your agent has its own non-custodial Solana wallet. Send it{' '}
                  <span className="text-[#ffe4b4]">at least 0.013 SOL</span>{' '}
                  (launch cost ≈0.0095 + fees). It pays for its own launch —
                  that&apos;s the point.
                </p>
                <button
                  type="button"
                  onClick={fundWithWallet}
                  disabled={funding}
                  className="btn-primary flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-[14px] font-semibold disabled:opacity-60"
                >
                  {funding ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Confirm in your
                      wallet…
                    </>
                  ) : (
                    <>
                      <Wallet className="h-4 w-4" /> Fund 0.014 SOL with Phantom
                    </>
                  )}
                </button>
                {fundMsg && (
                  <p className="font-mono text-[11px] text-[#e0b062]">{fundMsg}</p>
                )}
                <p className="text-center font-mono text-[10px] tracking-[0.14em] text-[#8a7a58]">
                  OR SEND MANUALLY FROM ANY WALLET
                </p>
                <button
                  type="button"
                  onClick={copy}
                  className="flex w-full items-center justify-between gap-2 rounded-xl border border-[rgba(240,180,41,0.35)] bg-[rgba(240,180,41,0.07)] px-4 py-3 text-left font-mono text-[11px] text-[#ffe0a0] transition-colors hover:bg-[rgba(240,180,41,0.14)]"
                >
                  <span className="truncate">{wallet}</span>
                  {copied ? (
                    <Check className="h-4 w-4 shrink-0" />
                  ) : (
                    <Copy className="h-4 w-4 shrink-0" />
                  )}
                </button>
                <div className="flex items-center justify-between rounded-xl border border-[rgba(214,182,116,0.16)] bg-[rgba(214,182,116,0.05)] px-4 py-3">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-[#9c8763]">
                    LIVE BALANCE
                  </span>
                  <span
                    className="font-mono text-[13px]"
                    style={{ color: sol >= 0.013 ? '#ffe4b4' : '#cbb28f' }}
                  >
                    {sol.toFixed(4)} SOL {sol >= 0.013 ? '✓ funded' : '· waiting…'}
                  </span>
                </div>
                {err && (
                  <p className="font-mono text-[11px] text-[#e0b062]">{err}</p>
                )}
                <button
                  type="button"
                  onClick={launch}
                  disabled={sol < 0.013 || phase === 'launching'}
                  className="btn-primary flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-[14px] font-semibold disabled:cursor-not-allowed disabled:opacity-45"
                >
                  {phase === 'launching' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Launching on
                      mainnet…
                    </>
                  ) : (
                    <>
                      <Rocket className="h-4 w-4" /> Launch ${symbol || 'TOKEN'}{' '}
                      {quote === 'AAPLX' ? 'vs AAPLx' : 'vs SOL'}
                    </>
                  )}
                </button>
              </div>
            )}

            {/* ---------------- done ---------------- */}
            {phase === 'done' && result && (
              <div className="space-y-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#f0b429]">
                  ● Launched on Solana mainnet
                </p>
                <p className="font-display text-[30px] font-bold text-[#f7efdd]">
                  ${symbol} is live — quoted in {result.quote}.
                </p>
                <div className="space-y-2 font-mono text-[11px] text-[#cbb28f]">
                  <p className="break-all">mint: {result.mint}</p>
                  <p className="break-all">tx: {result.tx}</p>
                </div>
                <div className="rounded-xl border border-[rgba(240,180,41,0.3)] bg-[rgba(240,180,41,0.06)] px-4 py-3">
                  <p className="text-[12px] leading-relaxed text-[#cbb28f]">
                    {ownership === 'yours' ? (
                      <>
                        This agent lives in{' '}
                        <span className="text-[#ffe4b4]">your Clawpump account</span>{' '}
                        — manage it, chat with it, and collect its creator fees
                        at{' '}
                        <a
                          href="https://clawpump.tech"
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#f0b429] underline decoration-[rgba(240,180,41,0.4)] underline-offset-2"
                        >
                          clawpump.tech
                        </a>
                        . Save the agent ID: <span className="break-all font-mono text-[11px] text-[#ffe0a0]">{agentId}</span>
                      </>
                    ) : (
                      <>
                        Demo mode — this agent was created in the CLASP account.
                        The token itself is fully yours to trade on-chain, but to
                        own and manage an agent, relaunch with your own free key
                        from{' '}
                        <a
                          href="https://clawpump.tech"
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#f0b429] underline decoration-[rgba(240,180,41,0.4)] underline-offset-2"
                        >
                          clawpump.tech
                        </a>
                        .
                      </>
                    )}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={result.pumpUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold"
                  >
                    Trade it <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={result.explorerUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-[rgba(214,182,116,0.25)] px-4 py-2.5 text-[13px] text-[#e9dcc0] transition-colors hover:border-[rgba(240,180,41,0.45)]"
                  >
                    Verify on Solscan <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-5 text-center font-mono text-[10px] tracking-[0.14em] text-[#8a7a58]">
            REAL MAINNET LAUNCH · YOUR AGENT, ITS WALLET, ITS TOKEN · KEY STAYS
            SERVER-SIDE
          </p>
        </Reveal>
      </div>
    </section>
  );
}
