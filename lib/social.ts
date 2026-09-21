import type { Agent } from "./types";

const B58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

function randBase58(len: number): string {
  let s = "";
  for (let i = 0; i < len; i++) s += B58[Math.floor(Math.random() * B58.length)];
  return s;
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export interface BackResult {
  signature: string;
  backers: number;
}

/**
 * Day 5 — Social back & copy.
 * Real path (on-chain back / clone deploy) gated by NEXT_PUBLIC_SOCIAL_KEY;
 * devnet-shaped fallback otherwise so the demo runs end-to-end.
 */
export async function backAgent(
  symbol: string,
  currentBackers: number
): Promise<BackResult> {
  if (process.env.NEXT_PUBLIC_SOCIAL_KEY) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SOCIAL_API ?? "https://api.clasp.xyz"}/back`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${process.env.NEXT_PUBLIC_SOCIAL_KEY}`,
      },
      body: JSON.stringify({ symbol }),
    });
    if (!res.ok) throw new Error(`Back failed: ${res.status}`);
    const r = (await res.json()) as BackResult;
    return { signature: r.signature, backers: r.backers };
  }
  await delay(700);
  return { signature: randBase58(88), backers: currentBackers + 1 };
}

export function cloneAgent(a: Agent): Agent {
  return {
    ...a,
    name: `${a.symbol}-Copy`,
    clawpumpMint: randBase58(44),
    meteoraPool: randBase58(44),
    thesis: `Copy of ${a.symbol} strategy — cloned agent, same basis logic.`,
    feesEarned: 0,
    basisCaptured: 0,
    tvl: 0,
    roi: 0,
    backers: 1,
  };
}

export async function copyAgent(a: Agent): Promise<Agent> {
  if (process.env.NEXT_PUBLIC_SOCIAL_KEY) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SOCIAL_API ?? "https://api.clasp.xyz"}/copy`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${process.env.NEXT_PUBLIC_SOCIAL_KEY}`,
      },
      body: JSON.stringify({ symbol: a.symbol }),
    });
    if (!res.ok) throw new Error(`Copy failed: ${res.status}`);
    return (await res.json()) as Agent;
  }
  await delay(700);
  return cloneAgent(a);
}
