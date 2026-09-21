import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * REAL launch pipeline, three steps, all server-side (key never leaves).
 *
 * POST { step: "create", name, symbol, description? }
 *   -> creates a real Clawpump agent, returns { agentId, wallet }
 *
 * POST { step: "status", wallet }
 *   -> returns live SOL balance of the agent wallet (mainnet RPC)
 *
 * POST { step: "launch", agentId, name, symbol, description?, quote? }
 *   -> fires the real launch. quote="AAPLX" pairs the token against
 *      tokenized Apple stock (xStock); default quote is SOL.
 */

const AAPLX_MINT = "XsbEhLAtcf6HdfpFZ5xEMdqW8nfAvcsP5bdudRLJzJp";

export async function POST(req: NextRequest) {
  const key = process.env.CLAWPUMP_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "CLAWPUMP_API_KEY not set on server" },
      { status: 500 }
    );
  }

  let body: any = {};
  try {
    body = await req.json();
  } catch {}

  const headers = {
    "content-type": "application/json",
    authorization: `Bearer ${key}`,
  };

  try {
    // ---------- step: create ----------
    if (body.step === "create") {
      if (!body.name || !body.symbol) {
        return NextResponse.json(
          { error: "name and symbol required" },
          { status: 400 }
        );
      }
      const res = await fetch("https://clawpump.tech/api/v1/agents", {
        method: "POST",
        headers,
        body: JSON.stringify({
          name: `${String(body.name).slice(0, 40)} (CLASP)`,
          persona: `Stocknized Agent "${body.symbol}" created through the CLASP launch terminal. ${
            body.description ??
            "Tracks the xStock basis and earns creator fees on its own token."
          }`,
          skills: ["token-launch", "wallet"],
        }),
      });
      const agent = await res.json();
      if (!res.ok || !agent.id) {
        return NextResponse.json(
          { error: agent.error ?? "agent creation failed" },
          { status: 502 }
        );
      }
      return NextResponse.json({
        agentId: agent.id,
        wallet: agent.walletAddress,
        minSol: 0.013,
      });
    }

    // ---------- step: status ----------
    if (body.step === "status") {
      if (!body.wallet)
        return NextResponse.json({ error: "wallet required" }, { status: 400 });
      const res = await fetch("https://api.mainnet-beta.solana.com", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "getBalance",
          params: [body.wallet],
        }),
        cache: "no-store",
      });
      const d = await res.json();
      const sol = (d?.result?.value ?? 0) / 1e9;
      return NextResponse.json({ sol, funded: sol >= 0.013 });
    }

    // ---------- step: launch ----------
    if (body.step === "launch") {
      if (!body.agentId || !body.symbol) {
        return NextResponse.json(
          { error: "agentId and symbol required" },
          { status: 400 }
        );
      }
      const payload: any = {
        agentId: body.agentId,
        name: body.name || `${body.symbol} Stocknized Agent`,
        symbol: String(body.symbol).slice(0, 10).toUpperCase(),
        description:
          body.description ??
          `${body.symbol} Stocknized Agent — launched through the CLASP terminal on Clawpump. Built for Stocklana.`,
        imageUrl:
          body.imageUrl ?? "https://xstocks-metadata.backed.fi/logos/tokens/AAPLx.png",
        selfFunded: true,
        initialBuySol: 0,
      };
      if (body.quote === "AAPLX") {
        payload.pumpQuoteMint = AAPLX_MINT;
        payload.pumpCreatorFeeBps = 200;
      }
      const res = await fetch("https://clawpump.tech/api/v1/launch", {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });
      const launched = await res.json();
      if (!res.ok || launched.status !== "launched") {
        return NextResponse.json(
          {
            error:
              launched?.token_launch?.error ??
              launched?.error ??
              "launch failed — is the agent wallet funded?",
            raw: launched,
          },
          { status: 502 }
        );
      }
      return NextResponse.json({
        status: "launched",
        mint: launched.mintAddress,
        tx: launched.txHash,
        pumpUrl: launched.pumpUrl,
        explorerUrl: launched.explorerUrl,
        quote: body.quote === "AAPLX" ? "AAPLx (tokenized Apple)" : "SOL",
      });
    }

    return NextResponse.json({ error: "unknown step" }, { status: 400 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "launch pipeline error" },
      { status: 500 }
    );
  }
}
