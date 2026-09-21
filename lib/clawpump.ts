import type { Agent, LaunchAgentParams } from "./types";

export interface LaunchResult {
  mint: string;
  pool: string;
  signature: string;
  gasless: boolean;
}

const API = process.env.NEXT_PUBLIC_CLAWPUMP_API ?? "https://clawpump.tech/api";
const B58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

function randBase58(len: number): string {
  let s = "";
  for (let i = 0; i < len; i++) s += B58[Math.floor(Math.random() * B58.length)];
  return s;
}

/**
 * Day 2 — Clawpump gasless launch.
 *
 * If NEXT_PUBLIC_CLAWPUMP_KEY is set we hit the real Clawpump API; otherwise
 * we return a devnet-shaped simulated result so the demo runs end-to-end.
 * Swap the simulated branch for the verified real call once Clawpump devnet
 * access is confirmed (Day 2-3).
 */
export async function launchAgent(params: LaunchAgentParams): Promise<LaunchResult> {
  if (process.env.NEXT_PUBLIC_CLAWPUMP_LIVE === "true") {
    const res = await fetch("/api/clawpump", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(params),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(`Clawpump launch failed: ${res.status} ${err?.error ?? ""}`);
    }
    return (await res.json()) as LaunchResult;
  }

  // Simulated devnet result (replace with real call above).
  await new Promise((r) => setTimeout(r, 850));
  return {
    mint: randBase58(44),
    pool: randBase58(44),
    signature: randBase58(88),
    gasless: true,
  };
}

/** Build an Agent record from a successful launch (seed metrics). */
export function agentFromLaunch(params: LaunchAgentParams, r: LaunchResult): Agent {
  return {
    symbol: params.symbol,
    name: params.name,
    clawpumpMint: r.mint,
    meteoraPool: r.pool,
    thesis: `Freshly launched gasless agent on Clawpump — bonding to ${params.symbol} via Meteora DBC.`,
    feesEarned: 0,
    basisCaptured: 0,
    tvl: 0,
    roi: 0,
    backers: 1,
  };
}
