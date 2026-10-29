import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-indigo-900 bg-indigo-950/50 h-16 flex items-center px-6 shrink-0">
        <Link href="/" className="slab-text text-lg font-bold text-plasma-cyan">
          ◀ EntropyScope
        </Link>
      </div>
      <div className="flex-1 p-8 max-w-3xl mx-auto">
        <h1 className="slab-text text-4xl font-bold text-white mb-6">About EntropyScope</h1>
        <p className="text-muted-foreground leading-relaxed mb-8">
          EntropyScope is a forecasting sandbox for the future of work. It simulates labor-market
          dynamics under different policy scenarios — AI adoption, remote-first, four-day week,
          automation waves — and lets you fork any simulated year to replay divergent timelines.
        </p>
        <h2 className="slab-text text-2xl font-bold text-white mb-4">Design decisions</h2>
        <ul className="list-disc pl-6 text-muted-foreground leading-relaxed mb-8 space-y-2">
          <li>Deterministic by default — seed 7331 everywhere, no API keys required.</li>
          <li>Pure domain logic in @entropyscope/core, fully unit-tested.</li>
          <li>Polyglot by design — Python agent service, Rust parity engine, Go relay.</li>
          <li>Open source (MIT), public diagrams, ADRs, and contribution guides.</li>
        </ul>
        <h2 className="slab-text text-2xl font-bold text-white mb-4">Stack</h2>
        <div className="flex flex-wrap gap-2 text-sm mb-8">
          {[
            "Next.js 15",
            "React 19",
            "TypeScript strict",
            "Tailwind v4",
            "Zustand",
            "Zod",
            "Python FastAPI",
            "Rust wasm",
            "Bun",
            "Turborepo",
          ].map((s) => (
            <span
              key={s}
              className="px-3 py-1 rounded-full border border-indigo-900 bg-indigo-900/30"
            >
              {s}
            </span>
          ))}
        </div>
        <div className="mt-12 p-6 rounded-xl border border-indigo-900 bg-indigo-900/30">
          <h3 className="slab-text text-lg font-bold text-white mb-2">Run it locally</h3>
          <pre className="mono-text text-sm text-plasma-cyan/80 overflow-x-auto p-4 rounded bg-indigo-950/50 border border-indigo-900/30">
            `git clone https://github.com/aniruddhaadak80/entropyscope cd entropyscope bun install
            bun run dev`
          </pre>
        </div>
      </div>
    </div>
  );
}
