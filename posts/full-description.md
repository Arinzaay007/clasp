# CLASP — full submission description (~4,950 chars, fits 5,000 limit)

CLASP — Clawpump Launched Agents for Stocknized Pools

AI agents born as tokens, bonded to tokenized stocks, earning on real-world assets. Live on Solana mainnet.

THE PROBLEM

Tokenized stocks (xStocks — real equities like Apple and NVIDIA wrapped as Solana tokens) trade 24/7. But the actual stock market only prices them 6.5 hours a day, 5 days a week. That means roughly 80% of the time, there is no official price for a tokenized stock. The on-chain price drifts from the last real close, and nobody can say what tokenized Apple is truly worth at 3am on a Sunday. Traders fly blind on that gap — the "basis."

There's a second problem stacked on top: AI agents are exploding across crypto, but almost none of them can touch traditional markets. Agents can read prices and post tweets — they can't hold real stock exposure, and they can't earn real-world-asset income. Access to traditional markets is the missing limb of the agent economy.

THE SOLUTION

CLASP closes both gaps at once. We launch AI agents as tokens on Solana — each agent has its own non-custodial wallet, launches its own token, and gets bonded to tokenized stocks through pools where the quote asset is the stock itself. A live basis engine gives every agent (and every human) the true price gap, around the clock.

The result is a new primitive we call the Stocknized Agent: an autonomous economic actor whose token trades against Apple stock and whose income is denominated in Apple stock.

WHAT'S LIVE ON MAINNET — WITH RECEIPTS

Everything below is finalized on Solana mainnet, signed by agents, not humans. Every claim has a transaction hash:

1. Our CLASP agent launched its own token, $CAAPL, paying the launch fee from its own wallet.
2. It then funded a second agent — an AI paying another AI, on-chain.
3. That child agent launched $SAAPL, quoted in AAPLx (tokenized Apple). Buy $SAAPL and you pay in Apple stock; sell and you receive Apple stock. A 2% creator fee on every trade flows back to the agent, settled hourly — an income stream denominated in a real-world asset.
4. The CLASP agent bought tokenized Apple on the open market and holds it in its wallet right now.

The bounty asks builders to "empower your agents with access to traditional markets and let agents earn on RWAs." CLASP implements that sentence literally: an agent that holds Apple stock, and an agent whose salary is paid in Apple stock.

THE PRODUCT

clasp-stocknized.vercel.app is a working product, not a deck:

- Live basis terminal — on-chain xStock prices vs official equity references for 7 stocks (AAPL, NVDA, TSLA, MSFT, AMZN, GOOGL, META), refreshing every 15 seconds. Zero fabricated numbers anywhere: if a feed dies, the UI says "stale" instead of pretending.
- Self-serve launch terminal — anyone can birth a real agent in three clicks: create the agent, fund its wallet with one Phantom click, and launch a real mainnet token quoted in tokenized Apple. Bring your own free Clawpump key and the agent is created in your account — your dashboard, your agent, your fees. Non-custodial end to end: CLASP never holds your key, your agent, or your token.
- Proof strip — every headline claim links directly to a finalized transaction on Solscan. Don't trust us; verify.

THE STACK

Clawpump is the agent factory and the muscle of this build — fully live in CLASP. Every agent is born through the Clawpump Partner API with its own non-custodial Solana wallet and signs its own transactions. Clawpump's pump-pair rails let new tokens quote against Backed xStocks, and its fee engine settles creator fees to the agent's wallet hourly, in the paired asset — which is how an agent ends up earning Apple stock.

Meteora is the liquidity layer in the roadmap. Today, $SAAPL's bonding curve runs on pump.fun's program via Clawpump's rails (we verified the transaction on-chain and say exactly that). Meteora is the graduation layer: when an agent token outgrows its curve, a Meteora pool against AAPLx becomes the deep-liquidity home. Bonding curves are for birth; concentrated liquidity is for scale.

Pyth Network is the oracle upgrade path. The basis concept is pure oracle work — basis = on-chain xStock price minus official equity reference. Pyth's Hermes API moved to paid access mid-hackathon, so today's engine runs on Jupiter Price v3, which carries the same official reference. With feed access, Pyth becomes the canonical eyes of every CLASP agent: sub-second equity prices with confidence intervals instead of 15-second polls.

WHY IT MATTERS

CLASP demonstrates a working loop nobody else has shipped: agents that launch themselves, fund each other, bond to real stocks, and earn real-world assets — autonomously, on mainnet, verifiable by anyone in one click. The demo is live, the code is open (github.com/Arinzaay007/clasp), and the agent's wallet is public. Watch it: the next transaction is the agent spending its Apple stock inside the Stocknized pool.

Built solo, in five days, in public. 🦀
