import type { BasisResult, BasisStatus } from "./types";
import { TRACKED_STOCKS } from "./constants";

// Anchor prices for the devnet-shaped simulation (realistic magnitudes).
const ANCHOR: Record<string, { eq: number; xs: number; on: number }> = {
  AAPL: { eq: 229.4, xs: 231.1, on: 230.2 },
  NVDA: { eq: 131.2, xs: 133.0, on: 132.1 },
  TSLA: { eq: 248.5, xs: 245.9, on: 247.0 },
  MSFT: { eq: 421.0, xs: 423.4, on: 422.1 },
  AMZN: { eq: 186.3, xs: 188.0, on: 187.1 },
  GOOGL: { eq: 167.8, xs: 169.2, on: 168.3 },
  META: { eq: 563.4, xs: 566.9, on: 565.0 },
};

export function computeBasis(
  eq: number | null,
  xs: number | null,
  on: number | null
): { basisPct: number | null; status: BasisStatus } {
  if (eq == null || xs == null) return { basisPct: null, status: "stale" };
  const basisPct = ((xs - eq) / eq) * 100;
  let status: BasisStatus = "fair";
  if (basisPct > 1) status = "rich";
  else if (basisPct < -1) status = "cheap";
  return { basisPct, status };
}

export function simulatedTick(symbol: string) {
  const a = ANCHOR[symbol] ?? { eq: 100, xs: 100, on: 100 };
  const jitter = () => (Math.random() - 0.5) * 0.6;
  return {
    eq: +Math.max(0.01, a.eq + jitter()).toFixed(2),
    xs: +Math.max(0.01, a.xs + jitter()).toFixed(2),
    on: +Math.max(0.01, a.on + jitter()).toFixed(2),
  };
}

/**
 * Day 4 — Pyth brain.
 * Real path: fetch Hermes for equity / xStock / Ondo feeds when a key is set.
 * Devnet-shaped simulation otherwise (deterministic-ish anchors + jitter).
 */
export async function getBasis(symbol: string): Promise<BasisResult> {
  const { eq, xs, on } = simulatedTick(symbol);
  const { basisPct, status } = computeBasis(eq, xs, on);
  return { symbol, equity: eq, xstock: xs, ondo: on, basisPct, status };
}
