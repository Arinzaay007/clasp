export interface PythPrice {
  id: string;
  price: number;
  conf: number;
  publishTime: number;
}

export type BasisStatus = "rich" | "cheap" | "fair" | "stale";

export interface BasisResult {
  symbol: string;
  equity: number | null;
  xstock: number | null;
  ondo: number | null;
  // deviation of on-chain (xStock) from fair value, %
  basisPct: number | null;
  status: BasisStatus;
}

export interface Agent {
  symbol: string;
  name: string;
  clawpumpMint: string;
  meteoraPool: string;
  thesis: string;
  feesEarned: number; // USD earned on RWA this epoch
  basisCaptured: number; // % basis the agent is positioned for
  tvl: number;
  roi: number; // % since launch
  backers: number;
}

export interface LaunchAgentParams {
  name: string;
  symbol: string; // stock ticker
  stockMint: string; // tokenized stock mint (Sunrise/Backed/Ondo)
  quoteMint?: string; // default USDC
}
