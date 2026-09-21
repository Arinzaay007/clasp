# CLASP — Clawpump Launched Agents for Stocknized Pools

**Stocknized Agents: AI agents launched as tokens on Solana, bonded to tokenized stocks, earning on RWAs.**

Built solo for the **Stocklana** Solana hackathon (Meteora DBC + Clawpump bounty). Live on **mainnet** — not a simulation.

---

## The problem

Tokenized stocks (xStocks) trade 24/7 — but the real equities only price ~6.5 hours a day. **Most of the time, the fair value of a tokenized stock is unknown.** Traders fly blind on the basis.

## What CLASP does

CLASP launches AI agents onto Solana as tokens, bonds them to tokenized stocks through dynamic bonding curves, and lets them earn real yield on RWAs — with **Pyth** as the brain.

- **Clawpump** — every agent is launched as a token by an agent, from its own non-custodial wallet
- **Meteora DBC rails** — agent tokens are quoted against xStocks on dynamic bonding curves
- **Pyth** — equity + xStock feeds power 24/7 basis tracking (Hermes)
- **Backed xStocks** — the RWA leg (AAPLx et al.)

## On-chain proof (Solana mainnet, all finalized)

The entire chain below was executed by agents. **No human signed or moved funds.**

| Step | What happened | Proof |
|---|---|---|
| 1 | CLASP agent launched its own token **$CAAPL**, self-funded | [tx](https://solscan.io/tx/5uEjZWz27rPbQfy3vsLcjrz77HE5rJ26qihn7LJUnxc3eR5C1LAPaN7DvHsWRtFCmNYF3824ETPQhStJptobEa22) · [pump.fun](https://pump.fun/coin/6AjyCgMvMp4WX8eRoWqYBuGX3yKRFQAGDFZsv4m2Mwrv) |
| 2 | CLASP agent **funded its child agent** (0.015 SOL, agent→agent) | [tx](https://solscan.io/tx/2EN8GeWmZaJWoiiQ5bchimjyoA7VELuoKyY2hMCy9DEqbdjyFCQLPspW5zyYRhZpnpZQKVXJjbWFuCjHxmhM2k5g) |
| 3 | Child agent launched **$SAAPL, quoted in AAPLx** — a token that trades against tokenized Apple stock | [tx](https://solscan.io/tx/2i2YC3t5mZBsF7TCYqVNvEi6hfMU1P2MS6ei8cPTykFJzcwaFm4G7RbYojkHQ2hyu4g6WYgq1BfgomfkYvhKRYJm) · [pump.fun](https://pump.fun/coin/DWMgU6wE3SbnvrCC41FNVFvAG8EoHCFYMW2EAvQZ4s7G) |

**The Stocknized pool:**

- `$SAAPL` mint: `DWMgU6wE3SbnvrCC41FNVFvAG8EoHCFYMW2EAvQZ4s7G`
- Quote asset: **AAPLx** `XsbEhLAtcf6HdfpFZ5xEMdqW8nfAvcsP5bdudRLJzJp` (Backed's tokenized Apple, $336.73 at launch)
- Every $SAAPL trade settles **in Apple stock**, not SOL. 2% creator fee flows back to the agent hourly.
- Launch receipts: [`launches/`](./launches)

## The app

Next.js 14 + TypeScript + Tailwind. Dark-gold terminal UI:

- **CLASP Terminal** — live xStock-vs-equity basis for AAPL/NVDA/TSLA/…, Pyth Hermes feeds
- **Launch flow** — server-side route (`app/api/clawpump/route.ts`) drives real Clawpump Partner API launches (key never leaves the server)
- **Marketplace / Earn / Architecture** — the full Stocknized Agents story

```bash
npm install
cp .env.example .env.local   # add your CLAWPUMP_API_KEY + CLAWPUMP_AGENT_ID
npm run dev
```

## Architecture

```
CLASP agent (Clawpump, own wallet)
   │  funds (agent→agent transfer)
   ▼
child agent ── launches ──► $SAAPL token
                               │ quoted in
                               ▼
                     AAPLx (Backed xStock)  ◄── bonding curve, fees → agent
                               ▲
                       Pyth feeds (equity + xStock, 24/7 basis)
```

## Built by

**@he_is_arinzaay** — solo build, in public.

Stack: @clawpumptech · @MeteoraAG · @PythNetwork · built for @Stocklana on @solana
