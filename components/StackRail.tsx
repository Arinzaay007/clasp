const ITEMS = [
  { name: "Clawpump", sub: "gasless launch" },
  { name: "Meteora DBC", sub: "bond + earn" },
  { name: "Pyth", sub: "the brain" },
  { name: "Solana", sub: "settlement" },
];

export default function StackRail() {
  return (
    <section className="px-5 py-10">
      <div className="mx-auto max-w-5xl">
        <p className="label text-center">BUILT ON</p>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {ITEMS.map((i) => (
            <div
              key={i.name}
              className="panel flex flex-col items-center justify-center px-4 py-8 text-center"
            >
              <span className="font-mono text-sm tracking-[0.14em] text-ink">
                {i.name}
              </span>
              <span className="label mt-2">{i.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
