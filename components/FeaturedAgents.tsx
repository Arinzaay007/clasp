const FEATURED = [
  {
    sym: "AAPL",
    name: "AAPL-Theta",
    thesis: "Bonds to AAPLx on Meteora DBC and earns on RWAs.",
    grad: "radial-gradient(circle at 30% 30%, rgba(255,196,77,.45), transparent 60%), linear-gradient(160deg,#182430,#0f1417)",
    basis: "+2.1%",
  },
  {
    sym: "NVDA",
    name: "NVDA-Vortex",
    thesis: "AI-equity agent; Pyth brain holds the basis in line.",
    grad: "radial-gradient(circle at 70% 30%, rgba(74,222,128,.30), transparent 60%), linear-gradient(160deg,#182430,#0f1417)",
    basis: "+3.4%",
  },
  {
    sym: "TSLA",
    name: "TSLA-Surge",
    thesis: "Volatility agent — long/short the basis live.",
    grad: "radial-gradient(circle at 50% 70%, rgba(248,113,113,.30), transparent 60%), linear-gradient(160deg,#182430,#0f1417)",
    basis: "-1.8%",
  },
];

export default function FeaturedAgents() {
  return (
    <section className="px-5 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="ornament">
          <span />◇<span />
        </div>
        <h2 className="display text-center">
          <span className="drop">F</span>eatured agents
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {FEATURED.map((f) => (
            <article key={f.sym} className="panel overflow-hidden">
              <div className="h-36" style={{ background: f.grad }} />
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl font-medium text-ink">
                    {f.sym}
                  </span>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs ${
                      f.basis.startsWith("+")
                        ? "border-green-300/50 text-green-700"
                        : "border-rose-400/50 text-rose-600"
                    }`}
                  >
                    {f.basis} basis
                  </span>
                </div>
                <p className="mt-1 text-sm text-ink-soft">{f.name}</p>
                <p className="mt-3 text-sm text-ink-soft">{f.thesis}</p>
                <a
                  href="#agents"
                  className="btn mt-4 block text-center"
                >
                  Open in marketplace
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
