import type { Agent } from "./types";

export interface BondResult {
  pool: string;
  tvl: number;
  feesEarned: number;
}

const API = process.env.NEXT_PUBLIC_METEORA_API ?? "https://api.meteora.ag";
const B58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

function randBase58(len: number): string {
  let s = "";
  for (let i = 0; i < len; i++) s += B58[Math.floor(Math.random() * B58.length)];
  return s;
}

/**
 * Day 3 — Meteora DBC bond + earn.
 *
 * If NEXT_PUBLIC_METEORA_KEY is set we hit the real Meteora DBC endpoint;
 * otherwise we return a devnet-shaped simulated pool so the demo runs
 * end-to-end. Swap the simulated branch for the verified real call once
 * Meteora devnet access is confirmed (Day 3-4).
 */
export async function bondAgent(symbol: string): Promise<BondResult> {
  if (process.env.NEXT_PUBLIC_METEORA_KEY) {
    const res = await fetch(`${API}/dynamic-bonding-curve/pair`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${process.env.NEXT_PUBLIC_METEORA_KEY}`,
      },
      body: JSON.stringify({ symbol, quoteMint: "So11111111111111111111111111111111111111112" }),
    });
    if (!res.ok) throw new Error(`Meteora bond failed: ${res.status}`);
    return (await res.json()) as BondResult;
  }

  // Simulated devnet result (replace with real call above).
  await new Promise((r) => setTimeout(r, 900));
  return {
    pool: randBase58(44),
    tvl: 12400,
    feesEarned: 0,
  };
}

/** Build an Agent record from a successful bond (seed metrics). */
export function agentFromBond(symbol: string, r: BondResult, fees: number): Agent {
  return {
    symbol,
    name: `${symbol}-Agent`,
    clawpumpMint: "",
    meteoraPool: r.pool,
    thesis: `Bonded to ${symbol} via Meteora DBC — earning on RWAs.`,
    feesEarned: fees,
    basisCaptured: 0,
    tvl: r.tvl,
    roi: 0,
    backers: 1,
  };
}
