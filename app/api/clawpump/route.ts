import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const key = process.env.CLAWPUMP_API_KEY;
  const agentId = process.env.CLAWPUMP_AGENT_ID;
  if (!key) {
    return NextResponse.json(
      { error: "CLAWPUMP_API_KEY not set on server" },
      { status: 500 }
    );
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  const headers = {
    "content-type": "application/json",
    authorization: `Bearer ${key}`,
  };

  try {
    // Real Clawpump launch: needs symbol + description + your dashboard agentId
    const lRes = await fetch("https://clawpump.tech/api/v1/launch", {
      method: "POST",
      headers,
      body: JSON.stringify({
        agentId: agentId || body.agentId,
        name: body.name || `${body.symbol}-Agent`,
        symbol: body.symbol,
        description:
          body.description ||
          `${body.symbol} Stocknized Agent on CLASP — bonds to its xStock on Meteora DBC and earns on RWAs.`,
        imageUrl:
          body.imageUrl ||
          process.env.CLAWPUMP_LAUNCH_IMAGE_URL ||
          "https://clawpump.tech/logo.webp",
        selfFunded: true,
        initialBuySol: 0,
      }),
    });
    const launched = await lRes.json().catch(() => ({}));

    const mint =
      launched.mint ?? launched.tokenMint ?? "";
    const pool = launched.pool ?? "";
    const signature = launched.signature ?? launched.tx ?? "";

    return NextResponse.json({
      mint,
      pool,
      signature,
      gasless: true,
      _raw: launched,
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 502 });
  }
}
