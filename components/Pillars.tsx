const PILLARS = [
  {
    tag: "Clawpump",
    title: "Gasless launch",
    body: "Mint an agent token per stock — 0 SOL, no wallet funding. The agent is live before the first trade.",
    etch: "M10 55 Q30 20 50 55 T90 55 T130 55 T150 40",
  },
  {
    tag: "Meteora DBC",
    title: "Bond + earn",
    body: "A Dynamic Bonding Curve pool makes the agent liquid and pays trading fees on RWAs.",
    etch: "M30 60 L70 18 L110 60 M55 60 L70 38 L85 60",
  },
  {
    tag: "Pyth",
    title: "The brain",
    body: "Live equity vs xStock vs Ondo feeds compute each agent's basis + rank. Drops? The agent stands down.",
    etch: "M45 28 a8 8 0 1 0 0.1 0 M72 22 a8 8 0 1 0 0.1 0 M100 26 a8 8 0 1 0 0.1 0",
  },
];

export default function Pillars() {
  return (
    <section id="how" className="px-5 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="ornament">
          <span />◇<span />
        </div>
        <h2 className="display text-center">
          <span className="drop">B</span>uild with unfair advantages
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {PILLARS.map((p) => (
            <article key={p.tag} className="panel flex flex-col p-6">
              <svg
                className="mb-4 h-14 w-full opacity-70"
                viewBox="0 0 160 70"
                fill="none"
                stroke="#8a8680"
              >
                <path d={p.etch} strokeWidth="2" />
              </svg>
              <span className="chip w-fit border-crimson/40 text-crimson">
                {p.tag}
              </span>
              <h3 className="mt-3 font-serif text-2xl font-medium text-ink">
                {p.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-ink-soft">{p.body}</p>
              <a href="#agents" className="btn-solid mt-4 inline-block text-center">
                ◇ Launch
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
