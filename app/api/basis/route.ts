import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const revalidate = 0;

/**
 * REAL basis engine.
 * - xStock on-chain price: Jupiter Price v3 (live DEX pricing of Backed xStocks)
 * - Equity reference: xStocks official reference price (stockData) via the same API
 * - basis = (xstock_onchain - equity_ref) / equity_ref
 * No mocks. If the upstream fails, we return an error — we do not fabricate numbers.
 */

const XSTOCK_MINTS: Record<string, string> = {
  AAPL: "XsbEhLAtcf6HdfpFZ5xEMdqW8nfAvcsP5bdudRLJzJp",
  NVDA: "Xsc9qvGR1efVDFGLrVsmkzv3qi45LTBjeUKSPmx9qEh",
  TSLA: "XsDoVfqeBukxuZHWhdvWHBhgEHjGNst4MLodqsJHzoB",
  MSFT: "XspzcW1PRtgf6Wj92HCiZdjzKCyFekVD8P5Ueh3dRMX",
  AMZN: "Xs3eBt7uRfJX8QUs4suhyU8p2M6DoUDrJyWBa8LLZsg",
  GOOGL: "XsCPL9dNWBMvFtTmwcCA5v3xWPSMEBCszbQdiLLq6aN",
  META: "Xsa62P5mvPszXL1krVUnU5ar38bBSVcWAB6fmPCo5Zu",
};

// CLASP's own on-chain footprint (all real, all mainnet)
const CLASP_ONCHAIN = {
  saaplMint: "DWMgU6wE3SbnvrCC41FNVFvAG8EoHCFYMW2EAvQZ4s7G",
  caaplMint: "6AjyCgMvMp4WX8eRoWqYBuGX3yKRFQAGDFZsv4m2Mwrv",
  agentWallet: "2KGjBtj6VWifaq6y389qJZH5KfYHWXo79wck5FLS6Y9a",
  childWallet: "6Zx8fPpSaoL2sA4fAbrpZjb6LbWzP8GACeqE3wuUoP9U",
};

export async function GET() {
  try {
    const ids = Object.values(XSTOCK_MINTS).join(",");
    const [jupRes, balRes] = await Promise.all([
      fetch(`https://lite-api.jup.ag/price/v3?ids=${ids}`, {
        cache: "no-store",
      }),
      fetch("https://api.mainnet-beta.solana.com", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify([
          {
            jsonrpc: "2.0",
            id: 1,
            method: "getBalance",
            params: [CLASP_ONCHAIN.agentWallet],
          },
          {
            jsonrpc: "2.0",
            id: 2,
            method: "getBalance",
            params: [CLASP_ONCHAIN.childWallet],
          },
        ]),
        cache: "no-store",
      }),
    ]);

    if (!jupRes.ok) {
      return NextResponse.json(
        { error: `price source unavailable (${jupRes.status})` },
        { status: 502 }
      );
    }

    const jup = await jupRes.json();
    const balances = await balRes.json().catch(() => null);

    const rows = Object.entries(XSTOCK_MINTS).map(([symbol, mint]) => {
      const d = jup[mint] || {};
      const xs = typeof d.usdPrice === "number" ? d.usdPrice : null;
      const eq =
        d.stockData && typeof d.stockData.price === "number"
          ? d.stockData.price
          : null;
      const basisPct = xs != null && eq != null ? ((xs - eq) / eq) * 100 : null;
      let status: "rich" | "cheap" | "fair" | "stale" = "stale";
      if (basisPct != null) {
        status = basisPct > 0.75 ? "rich" : basisPct < -0.75 ? "cheap" : "fair";
      }
      return {
        symbol,
        mint,
        xstockUsd: xs,
        equityRefUsd: eq,
        basisPct,
        status,
        liquidityUsd: typeof d.liquidity === "number" ? d.liquidity : null,
        change24hPct:
          typeof d.priceChange24h === "number" ? d.priceChange24h : null,
        equityRefAt: d.stockData?.updatedAt ?? null,
      };
    });

    const agentSol =
      balances && balances[0]?.result
        ? balances[0].result.value / 1e9
        : null;
    const childSol =
      balances && balances[1]?.result
        ? balances[1].result.value / 1e9
        : null;

    return NextResponse.json({
      asOf: new Date().toISOString(),
      source: {
        xstock: "Jupiter Price v3 (on-chain)",
        equityRef: "xStocks official reference via Jupiter",
      },
      rows,
      clasp: { ...CLASP_ONCHAIN, agentSol, childSol },
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "basis engine error" },
      { status: 500 }
    );
  }
}
