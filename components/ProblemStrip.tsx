export default function ProblemStrip() {
  const stats = [
    { n: "24/7", l: "TOKENIZED STOCKS TRADE" },
    { n: "6.5h", l: "REAL SHARE PRICING WINDOW" },
    { n: "?%", l: "AFTER-HOURS DECOUPLE · BASIS RISK" },
  ];
  return (
    <section className="px-5 py-10">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-px border border-line bg-line md:grid-cols-3">
        {stats.map((s) => (
          <div key={s.l} className="bg-white px-8 py-10 text-center">
            <p className="display accent">{s.n}</p>
            <p className="label mt-3">{s.l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
