# FINAL SUBMISSION PACK — post before Sep 25

All links verified live as of Sep 22. Post the thread from @he_is_arinzaay (or the project account), then pin it.

---

## SUBMISSION THREAD (7 posts)

### 1/7 — hook
CLASP — Stocknized Agents. my @Stocklana submission. 🧵

AI agents launched as tokens on @solana, bonded to tokenized stocks, holding + earning on real RWAs.

everything below is finalized on mainnet. every claim has a tx.

live: clasp-stocknized.vercel.app

### 2/7 — problem
the problem: xStocks trade 24/7 but real equities price ~6.5h/day, 5 days a week.

~80% of the time, nobody knows what tokenized Apple is truly worth.

CLASP tracks that basis live, around the clock — and puts agents with wallets on the job, not dashboards.

### 3/7 — what the agents did
what the agents did, autonomously (no human signed anything):

① CLASP agent launched $CAAPL — paid from its own wallet
② CLASP agent funded a child agent (AI paying AI, on-chain)
③ child agent launched $SAAPL — quoted in AAPLx (tokenized Apple), not SOL
④ CLASP agent bought Apple stock — it holds AAPLx right now

### 4/7 — the stocknized pool
$SAAPL is the "Stocknized pool": a bonding curve where the quote asset is Apple stock.

buy $SAAPL → you pay in AAPLx
sell $SAAPL → you receive AAPLx
2% creator fee → back to the agent, settled hourly

live on @clawpumptech pump-pair rails.

### 5/7 — the product
the site isn't a deck — it's a working product:

📊 live basis terminal: on-chain xStock px vs official equity ref, 7 stocks, 15s refresh
🚀 launch terminal: anyone can birth a real agent + mainnet token in 3 clicks (Phantom funding, BYOK ownership)
🔍 zero fabricated numbers. if a feed dies, the UI says so.

clasp-stocknized.vercel.app

### 6/7 — receipts
receipts, all finalized:

$CAAPL launch:
solscan.io/tx/5uEjZWz27rPbQfy3vsLcjrz77HE5rJ26qihn7LJUnxc3eR5C1LAPaN7DvHsWRtFCmNYF3824ETPQhStJptobEa22

agent→agent funding:
solscan.io/tx/2EN8GeWmZaJWoiiQ5bchimjyoA7VELuoKyY2hMCy9DEqbdjyFCQLPspW5zyYRhZpnpZQKVXJjbWFuCjHxmhM2k5g

$SAAPL vs AAPLx launch:
solscan.io/tx/2i2YC3t5mZBsF7TCYqVNvEi6hfMU1P2MS6ei8cPTykFJzcwaFm4G7RbYojkHQ2hyu4g6WYgq1BfgomfkYvhKRYJm

agent buys Apple stock:
solscan.io/tx/5sPW8qjaNqCS6SiUQtvX1aYybNF2JoWSoVsrGHCHWaP6SVSWPCzSEaZJQFr6SaKnksQcni2dCLnKB3CSwR3Fkiwk

### 7/7 — close
code: github.com/Arinzaay007/clasp
live: clasp-stocknized.vercel.app
built solo, in public, in 5 days.

next: the agent spends its Apple stock in the $SAAPL pool — watch the wallet: 2KGjBtj6VWifaq6y389qJZH5KfYHWXo79wck5FLS6Y9a

CLASP: Clawpump Launched Agents for Stocknized Pools. 🦀🥇

@solana @clawpumptech @MeteoraAG @PythNetwork @Stocklana

---

## WORDING GUARDRAILS (do not deviate)

- $SAAPL pool = "bonding curve vs xStock via Clawpump rails". NEVER "Meteora DBC pool".
- Basis engine = live on-chain prices vs official equity reference (Jupiter Price v3). Don't claim Pyth is wired in today; Pyth/Meteora are the scale-up layers if asked.
- Trade $SAAPL: pump.fun/coin/DWMgU6wE3SbnvrCC41FNVFvAG8EoHCFYMW2EAvQZ4s7G

---

## DEMO VIDEO SCRIPT (~2:00, screen recording + voiceover)

Record at 1080p, chrome full screen, dark room vibes. Rehearse once; keep total under 2:15.

[0:00–0:15] HERO + PROOF STRIP
- Open clasp-stocknized.vercel.app, slow scroll to proof strip.
- VO: "This is CLASP — Stocknized Agents. AI agents launched as tokens, bonded to tokenized stocks. Four finalized mainnet transactions, signed by agents, not by me."

[0:15–0:30] CLICK A PROOF
- Click TX 4 card → Solscan opens → point at the AAPLx transfer + finalized status.
- VO: "Here's my agent buying tokenized Apple stock. It holds this RWA in its own wallet right now."

[0:30–1:00] BASIS TERMINAL
- Scroll to terminal. Hover rows, let a 15s refresh tick happen on camera.
- VO: "Tokenized stocks trade 24/7, but the real market prices them six and a half hours a day. This terminal shows the live gap — on-chain price versus official equity reference, seven stocks, refreshing every fifteen seconds. Nothing on this site is mocked — if a feed goes stale, it says stale."

[1:00–1:40] LAUNCH TERMINAL (the wow)
- Scroll to Launch terminal. Type a name + symbol, select AAPLx quote, click Create agent → wallet appears → show the Phantom funding button + live balance poll.
- VO: "And anyone can do this. Name an agent, and CLASP creates it — a real agent with its own Solana wallet, through the Clawpump partner API. Fund it with one Phantom click, and it launches a real mainnet token, quoted in Apple stock. Paste your own free Clawpump key and the agent is yours — your dashboard, your fees. Non-custodial end to end."
- (Don't complete the paid launch on camera unless you want to spend the SOL — the create step + funding screen is enough.)

[1:40–2:00] CLOSE
- Scroll to agents/marketplace cards, end on the hero.
- VO: "Two agent tokens live. An agent-to-agent economy with receipts. Built solo, in five days, in public. CLASP — Clawpump Launched Agents for Stocknized Pools."

---

## SUBMISSION FORM CHECKLIST

- [ ] Live demo URL: https://clasp-stocknized.vercel.app
- [ ] GitHub: https://github.com/Arinzaay007/clasp
- [ ] Video: upload unlisted YouTube/Loom, paste link
- [ ] Thread link (post + pin first)
- [ ] Tx hashes: paste all four from section 6/7
- [ ] One-liner: "CLASP: AI agents launched as tokens, bonded to tokenized stocks — 4 finalized mainnet txs of agents launching, funding each other, and buying Apple stock autonomously."
- [ ] After submitting: revoke GitHub PAT + Vercel token + rotate Clawpump key
