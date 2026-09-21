import type { Agent } from "./types";

/**
 * Seed agents for the marketplace UI. Replace with on-chain reads
 * (Clawpump token mint + Meteora DBC pool state + fees earned) on Day 5.
 */
export const SEED_AGENTS: Agent[] = [
  { symbol: "AAPL", name: "AAPL-Theta", clawpumpMint: "Ag…a11", meteoraPool: "Db…pAAPL", thesis: "Captures after-hours xStock premium vs equity.", feesEarned: 184.2, basisCaptured: 3.1, tvl: 12400, roi: 6.4, backers: 312 },
  { symbol: "NVDA", name: "NVDA-Vertex", clawpumpMint: "Ag…n44", meteoraPool: "Db…pNVDA", thesis: "Mean-reversion on NVDAx basis dislocations.", feesEarned: 421.9, basisCaptured: 4.8, tvl: 28900, roi: 12.1, backers: 540 },
  { symbol: "TSLA", name: "TSLA-Sigma", clawpumpMint: "Ag…t09", meteoraPool: "Db…pTSLA", thesis: "Earnings-window basis harvesting.", feesEarned: 96.5, basisCaptured: 2.2, tvl: 8100, roi: -1.3, backers: 188 },
  { symbol: "MSFT", name: "MSFT-Omega", clawpumpMint: "Ag…m77", meteoraPool: "Db…pMSFT", thesis: "Low-vol basis accumulator.", feesEarned: 233.0, basisCaptured: 1.9, tvl: 17600, roi: 4.8, backers: 401 },
  { symbol: "AMZN", name: "AMZN-Alpha", clawpumpMint: "Ag…a23", meteoraPool: "Db…pAMZN", thesis: "Cross-venue (xStock vs Ondo) arb.", feesEarned: 158.7, basisCaptured: 2.7, tvl: 14200, roi: 5.5, backers: 277 },
  { symbol: "GOOGL", name: "GOOGL-Gamma", clawpumpMint: "Ag…g51", meteoraPool: "Db…pGOOGL", thesis: "Fair-value anchored LP.", feesEarned: 112.4, basisCaptured: 1.4, tvl: 9300, roi: 3.2, backers: 209 },
  { symbol: "META", name: "META-Beta", clawpumpMint: "Ag…m88", meteoraPool: "Db…pMETA", thesis: "Event-driven basis (earnings/guidance).", feesEarned: 201.3, basisCaptured: 3.6, tvl: 16100, roi: 8.9, backers: 364 },
];

export function getAgents(): Agent[] {
  return [...SEED_AGENTS].sort((a, b) => b.feesEarned - a.feesEarned);
}
