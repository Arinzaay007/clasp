// Core on-chain constants for CLASP.
// Program IDs verified from Meteora DBC docs (same on mainnet + devnet).

export const DBC_PROGRAM_ID = "dbcij3LWUppWqq96dh6gJWwBifmcGfLSB5D4DuSMaqN";
export const DBC_POOL_AUTHORITY = "FhVo3mqL8PW5pH5U2CN4XE33DokiyZnUwuGpH2hmHLuM";

export const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
export const SOL_MINT = "So11111111111111111111111111111111111111112";

export const CLAWPUMP_API = "https://clawpump.tech/api";
// legacy, unused — basis engine uses Jupiter Price v3 (see app/api/basis)

// Tokenized stocks we track. Feed *symbols* resolve to Pyth feed IDs
// via the official list: https://pyth.network/developers/price-feed-ids
export interface StockFeed {
  symbol: string;
  equityFeed: string; // Equity.US.<SYM>/USD  (real share, US hours)
  xstockFeed: string; // Crypto.<SYM>X/USD    (xStock, 24/7)
  ondoFeed: string; // Crypto.<SYM>ON/USD   (Ondo, 24/7)
  issuer: string;
}

export const TRACKED_STOCKS: StockFeed[] = [
  { symbol: "AAPL", equityFeed: "Equity.US.AAPL/USD", xstockFeed: "Crypto.AAPLX/USD", ondoFeed: "Crypto.AAPLON/USD", issuer: "Backed" },
  { symbol: "NVDA", equityFeed: "Equity.US.NVDA/USD", xstockFeed: "Crypto.NVDAX/USD", ondoFeed: "Crypto.NVDON/USD", issuer: "Backed" },
  { symbol: "TSLA", equityFeed: "Equity.US.TSLA/USD", xstockFeed: "Crypto.TSLAX/USD", ondoFeed: "Crypto.TSLON/USD", issuer: "Backed" },
  { symbol: "MSFT", equityFeed: "Equity.US.MSFT/USD", xstockFeed: "Crypto.MSFTX/USD", ondoFeed: "Crypto.MSFTON/USD", issuer: "Backed" },
  { symbol: "AMZN", equityFeed: "Equity.US.AMZN/USD", xstockFeed: "Crypto.AMZNX/USD", ondoFeed: "Crypto.AMZON/USD", issuer: "Backed" },
  { symbol: "GOOGL", equityFeed: "Equity.US.GOOGL/USD", xstockFeed: "Crypto.GOOGLX/USD", ondoFeed: "Crypto.GOOGLON/USD", issuer: "Backed" },
  { symbol: "META", equityFeed: "Equity.US.META/USD", xstockFeed: "Crypto.METAX/USD", ondoFeed: "Crypto.METAON/USD", issuer: "Backed" },
];
