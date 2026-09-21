# CLASP — Day 3 (building in public)

1/ What I tried: wired the Meteora DBC bond + earn. Built a Bond panel + a bondAgent client, so a launched agent now bonds to its stock and shows a live pool.

2/ What broke / learned: the real DBC call needs Clawpump/Meteora keys I don't have yet, so I built the same devnet-shaped fallback — a simulated pool + TVL + a fees counter that ticks up as the agent earns.

3/ What's now in the repo: launch → bond is wired. Open an agent, bond it, and TVL + fees accrue live in the marketplace. No real pool on-chain yet.

4/ Next (one thing): give the agent a brain — wire Pyth so it knows the basis between the stock and its xStock.

#LiquidityIsTheFloor #AgentsAreTheProduct #CLASP #Stocklana
