# BUILDLOG — CLASP

Public build journal for the Stocklana hackathon. Updated daily.

## Day 0 — Concept & naming (locked)
- Picked the "flying blind" wedge: tokenized stocks trade 24/7 but decouple from the real share after US hours.
- Evaluated 10 ideas + 5 combos; committed to **Combo A (The RWA Terminal)**.
- Re-centered heroes on **Meteora DBC + Clawpump** (user feedback), with **Pyth as the brain** (not the headline).
- Competitor scan: "Afterhours" clones do after-hours drift; ChannelSwarm does Stocknized Agents as infra. CLASP differentiates with a *consumer social agent terminal* + Pyth cross-venue basis.
- Name locked: **CLASP** = Clawpump Launched Agents for Stocknized Pools.
- Handle: @he_is_arinzaay. Building in public.

## Day 1 — Scaffold + announce
- [x] Project scaffold (Next.js + TS + Tailwind + Solana wallet adapter stubs).
- [x] `lib/` stubs: pyth (Hermes basis), clawpump (launch), meteora (DBC), agents (model).
- [x] Landing/dashboard shell with problem strip + 3 pillars + agent grid (mock data).
- [x] README + BUILDLOG + Day 1 public post drafted.
- [ ] TODO: get free Pyth Hermes API key.
- [ ] TODO: confirm Clawpump stock-pair launch endpoint.

## Day 2 — planned
- Validate Clawpump agent launch + Meteora DBC stock pool on devnet.
- Wire real Pyth feed IDs for top 7 stocks.

## Competitor intel — OpenStock (Day 1, while building in public)
- OpenStock posted a polished BIP update: *"the liquidity layer for tokenized equities on-chain."*
- Shipped: xStock trading terminal (candles / order book / 24h breadth, 25+ equities), token×xstock launch studio, dual-venue (Clawpump + Meteora DBC→DLMM), native wallet signing, holder-distribution audits.
- OVERLAP: same two heroes (Clawpump + Meteora DBC). They own the "terminal / launchpad / liquidity" narrative and are ahead.
- OUR MOAT: they are infra. CLASP is the AGENT ECONOMY on top — Stocknized Agents that earn on RWAs, Pyth basis brain, social back/copy, EM localization. None of the terminals do agents/social/basis.
- RESPONSE: stop leading with "launchpad/liquidity" language (their turf). Lead with agents + basis + social. Positive-contrast post drafted in DAY2_POST.md. Publish as a reply to @solana's Stocklana thread for reach.
