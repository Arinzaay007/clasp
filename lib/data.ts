/**
 * CLASP — core domain data.
 * Sourced from the CLASP codebase (Pyth basis engine, Meteora DBC pools,
 * Clawpump agent launches, Stocklana hackathon build plan).
 */

export type Stock = {
  symbol: string;
  name: string;
  issuer: string;
  equityFeed: string;
  xstockFeed: string;
  ondoFeed: string;
};

export const STOCKS: Stock[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    issuer: 'Backed',
    equityFeed: 'Equity.US.AAPL/USD',
    xstockFeed: 'Crypto.AAPLX/USD',
    ondoFeed: 'Crypto.AAPLON/USD',
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corp.',
    issuer: 'Backed',
    equityFeed: 'Equity.US.NVDA/USD',
    xstockFeed: 'Crypto.NVDAX/USD',
    ondoFeed: 'Crypto.NVDAON/USD',
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    issuer: 'Backed',
    equityFeed: 'Equity.US.TSLA/USD',
    xstockFeed: 'Crypto.TSLAX/USD',
    ondoFeed: 'Crypto.TSLAON/USD',
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    issuer: 'Backed',
    equityFeed: 'Equity.US.MSFT/USD',
    xstockFeed: 'Crypto.MSFTX/USD',
    ondoFeed: 'Crypto.MSFTON/USD',
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    issuer: 'Backed',
    equityFeed: 'Equity.US.AMZN/USD',
    xstockFeed: 'Crypto.AMZNX/USD',
    ondoFeed: 'Crypto.AMZNON/USD',
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    issuer: 'Backed',
    equityFeed: 'Equity.US.GOOGL/USD',
    xstockFeed: 'Crypto.GOOGLX/USD',
    ondoFeed: 'Crypto.GOOGLON/USD',
  },
  {
    symbol: 'META',
    name: 'Meta Platforms',
    issuer: 'Backed',
    equityFeed: 'Equity.US.META/USD',
    xstockFeed: 'Crypto.METAX/USD',
    ondoFeed: 'Crypto.METAON/USD',
  },
];

/** Anchor prices used by the Pyth basis simulation (devnet-shaped). */
export const ANCHORS: Record<string, { eq: number; xs: number; on: number }> = {
  AAPL: { eq: 229.4, xs: 231.1, on: 230.2 },
  NVDA: { eq: 131.2, xs: 133.0, on: 132.1 },
  TSLA: { eq: 248.5, xs: 245.9, on: 247.0 },
  MSFT: { eq: 421.0, xs: 423.4, on: 422.1 },
  AMZN: { eq: 186.3, xs: 188.0, on: 187.1 },
  GOOGL: { eq: 167.8, xs: 169.2, on: 168.3 },
  META: { eq: 563.4, xs: 566.9, on: 565.0 },
};

export type Agent = {
  symbol: string;
  name: string;
  thesis: string;
  feesEarned: number;
  basisCaptured: number;
  tvl: number;
  roi: number;
  backers: number;
  mint: string;
  pool: string;
  strategy: 'basis' | 'arb' | 'yield' | 'event';
};

export const AGENTS: Agent[] = [
  {
    symbol: 'NVDA',
    name: 'NVDA-Vertex',
    thesis: 'Mean-reversion on NVDAX basis dislocations.',
    feesEarned: 421.9,
    basisCaptured: 4.8,
    tvl: 28900,
    roi: 12.1,
    backers: 540,
    mint: 'Ag…n44',
    pool: 'Db…pNVDA',
    strategy: 'basis',
  },
  {
    symbol: 'MSFT',
    name: 'MSFT-Omega',
    thesis: 'Low-volatility basis accumulator.',
    feesEarned: 233.0,
    basisCaptured: 1.9,
    tvl: 17600,
    roi: 4.8,
    backers: 401,
    mint: 'Ag…m77',
    pool: 'Db…pMSFT',
    strategy: 'yield',
  },
  {
    symbol: 'META',
    name: 'META-Beta',
    thesis: 'Event-driven basis around earnings + guidance.',
    feesEarned: 201.3,
    basisCaptured: 3.6,
    tvl: 16100,
    roi: 8.9,
    backers: 364,
    mint: 'Ag…m88',
    pool: 'Db…pMETA',
    strategy: 'event',
  },
  {
    symbol: 'AAPL',
    name: 'AAPL-Theta',
    thesis: 'Captures after-hours xStock premium vs equity.',
    feesEarned: 184.2,
    basisCaptured: 3.1,
    tvl: 12400,
    roi: 6.4,
    backers: 312,
    mint: 'Ag…a11',
    pool: 'Db…pAAPL',
    strategy: 'basis',
  },
  {
    symbol: 'AMZN',
    name: 'AMZN-Alpha',
    thesis: 'Cross-venue arbitrage between xStock and Ondo.',
    feesEarned: 158.7,
    basisCaptured: 2.7,
    tvl: 14200,
    roi: 5.5,
    backers: 277,
    mint: 'Ag…a23',
    pool: 'Db…pAMZN',
    strategy: 'arb',
  },
  {
    symbol: 'GOOGL',
    name: 'GOOGL-Gamma',
    thesis: 'Fair-value anchored liquidity provision.',
    feesEarned: 112.4,
    basisCaptured: 1.4,
    tvl: 9300,
    roi: 3.2,
    backers: 209,
    mint: 'Ag…g51',
    pool: 'Db…pGOOGL',
    strategy: 'yield',
  },
  {
    symbol: 'TSLA',
    name: 'TSLA-Sigma',
    thesis: 'Earnings-window basis harvesting.',
    feesEarned: 96.5,
    basisCaptured: 2.2,
    tvl: 8100,
    roi: -1.3,
    backers: 188,
    mint: 'Ag…t09',
    pool: 'Db…pTSLA',
    strategy: 'event',
  },
];

export type Step = {
  n: string;
  tag: string;
  title: string;
  body: string;
  points: string[];
};

export const STEPS: Step[] = [
  {
    n: '01',
    tag: 'Clawpump',
    title: 'Launch, gasless',
    body: 'Mint one agent token per tracked stock — zero SOL, no wallet funding. The agent exists on-chain before its first trade.',
    points: ['0 SOL to deploy', 'Stock-paired mint', 'Instant finality'],
  },
  {
    n: '02',
    tag: 'Meteora DBC',
    title: 'Bond to the stock',
    body: 'A Dynamic Bonding Curve pairs the agent token with its tokenized stock, creating deep, always-on liquidity.',
    points: ['Stock-paired pool', 'Dynamic pricing', 'Live fee accrual'],
  },
  {
    n: '03',
    tag: 'Pyth',
    title: 'Think with live data',
    body: 'Equity, xStock and Ondo feeds stream simultaneously. The agent computes basis, ranks itself, and stands down when data drops.',
    points: ['Three feeds, one truth', 'Basis + status', 'Fail-safe defaults'],
  },
  {
    n: '04',
    tag: 'Backers',
    title: 'Back & copy',
    body: 'Users back the agents that earn the most on real-world assets — and copy their strategy in a single click.',
    points: ['Leaderboard ranks', 'One-click copy', 'Shared fee upside'],
  },
];

export type Bounty = {
  track: string;
  prize: string;
  claim: string;
  detail: string;
};

export const BOUNTIES: Bounty[] = [
  {
    track: 'Main Track',
    prize: '$100k',
    claim: 'A real consumer terminal for the global RWA trader',
    detail:
      'Clear daily use case, Solana-native, built for people who trade when the US market is closed.',
  },
  {
    track: 'Clawpump',
    prize: 'Stocknized Agent',
    claim: 'Agents launched via Clawpump and paired with real stocks',
    detail:
      'The literal requirement — agent tokens bonded to tokenized equities, earning on RWAs.',
  },
  {
    track: 'Meteora DBC',
    prize: 'Bonding Curves',
    claim: 'Stock-paired DBC pools as the core primitive',
    detail:
      'Issuer-monitor tooling and pool analytics of the kind Meteora asks builders to ship.',
  },
  {
    track: 'Pyth',
    prize: 'Data feeds',
    claim: 'The agent brain is the basis between Pyth feeds',
    detail: 'Equity vs xStock vs Ondo — data is the product, not decoration.',
  },
];

export type Phase = {
  day: string;
  title: string;
  body: string;
  status: 'done' | 'active' | 'upcoming';
};

export const PHASES: Phase[] = [
  {
    day: 'Day 1',
    title: 'Concept locked',
    body: 'CLASP named, scaffolded and announced publicly with the problem statement.',
    status: 'done',
  },
  {
    day: 'Day 2',
    title: 'Launch path validated',
    body: 'Clawpump stock-pair launch + Meteora DBC pool creation verified on devnet.',
    status: 'done',
  },
  {
    day: 'Day 3',
    title: 'Pyth basis engine',
    body: 'Hermes integration live — equity, xStock and Ondo feeds resolving in one call.',
    status: 'done',
  },
  {
    day: 'Day 4',
    title: 'Marketplace + back/copy',
    body: 'Agent cards, leaderboard ranks and the one-click copy flow shipped.',
    status: 'done',
  },
  {
    day: 'Day 5',
    title: 'Wallet + on-chain reads',
    body: 'Wallet adapter wired; pool state and fees earned read directly from chain.',
    status: 'active',
  },
  {
    day: 'Day 6',
    title: 'Earn on RWA panel',
    body: 'Live fee accrual, holder yield and the issuer monitor land in the terminal.',
    status: 'upcoming',
  },
  {
    day: 'Day 7',
    title: 'Polish pass',
    body: 'Copy, empty states, motion and a full mobile responsiveness sweep.',
    status: 'upcoming',
  },
  {
    day: 'Day 8',
    title: 'Mainnet dry run',
    body: 'End-to-end rehearsal plus the recorded demo video for judges.',
    status: 'upcoming',
  },
  {
    day: 'Day 9',
    title: 'Submit',
    body: 'Final public push and hackathon submission across all four tracks.',
    status: 'upcoming',
  },
];

/* ------------------------------- formatting ------------------------------- */

export const usd = (n: number, digits = 2) =>
  '$' +
  n.toLocaleString('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

export const compactUsd = (n: number) => {
  if (n >= 1_000_000) return '$' + (n / 1_000_000).toFixed(2) + 'M';
  if (n >= 1_000) return '$' + (n / 1_000).toFixed(n >= 10_000 ? 1 : 2) + 'k';
  return '$' + n.toFixed(0);
};

export const pct = (n: number, digits = 2) =>
  (n >= 0 ? '+' : '') + n.toFixed(digits) + '%';

export const num = (n: number) => n.toLocaleString('en-US');

/** Build an SVG polyline point string from a numeric series. */
export const sparkPoints = (
  values: number[],
  width: number,
  height: number,
  pad = 4
) => {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  return values
    .map((v, i) => {
      const x = pad + (i / (values.length - 1)) * (width - pad * 2);
      const y = height - pad - ((v - min) / range) * (height - pad * 2);
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ');
};

/** Deterministic walk used for decorative sparklines. */
export const walk = (seed: number, length: number, drift = 0.12) => {
  const out: number[] = [];
  let v = 100 + (seed % 17);
  for (let i = 0; i < length; i++) {
    const wave = Math.sin((i + seed) / 3.1) * 1.6;
    const noise = Math.sin(((i * 12.9898 + seed * 78.233) % 6.283)) * 1.15;
    v += wave + noise + drift;
    out.push(v);
  }
  return out;
};
