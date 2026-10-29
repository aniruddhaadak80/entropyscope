import Link from "next/link";

const features = [
  {
    title: "Branching scenario timelines",
    description:
      "Define policy shocks (AI adoption year, remote-first, four-day week, automation wave) and watch 30 years of labor-market evolution unfold. Every scenario is fully deterministic.",
  },
  {
    title: "Live agent-swarm workforce",
    description:
      "1,000+ simulated workers with skills, adaptability, and AI exposure. Watch reskilling, layoffs, and wage dynamics play out in real time across sectors.",
  },
  {
    title: "Prediction market engine",
    description:
      "Buy shares on scenario outcomes with a constant-product AMM. Prices move as traders buy in. No oracle, no external data, no API keys.",
  },
  {
    title: "Time machine with forks",
    description:
      "Fork any simulated year and replay divergent timelines side by side. What if AI arrived in 2027 instead of 2029? Compare outcomes visually.",
  },
  {
    title: "Forecast calibration",
    description:
      "Make probabilistic predictions and track your Brier score. Watch your calibration curve improve as you forecast more outcomes.",
  },
  {
    title: "World explorer",
    description:
      "Drill into sectors, workers, and jobs. See unemployment, wage bills, AI adoption, and remote rates evolve year by year.",
  },
  {
    title: "Polyglot stack",
    description:
      "TypeScript core, Python FastAPI agent service, Rust wasm parity engine, Go SSE relay. Each with its own tests, CI, and README.",
  },
  {
    title: "Deploy anywhere",
    description:
      "Vercel, Docker, Fly.io, Render, Railway. One command to run the whole stack locally with docker compose.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-indigo-900 bg-indigo-950/50 h-16 flex items-center px-6 shrink-0">
        <Link href="/" className="slab-text text-lg font-bold text-plasma-cyan">
          ◀ EntropyScope
        </Link>
      </div>
      <div className="flex-1 p-8 max-w-6xl mx-auto">
        <h1 className="slab-text text-4xl font-bold text-white mb-12">Features</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-xl border border-indigo-900 bg-indigo-900/20 hover:bg-indigo-900/40 transition group"
            >
              <div className="w-10 h-10 rounded-lg bg-plasma-cyan/10 flex items-center justify-center text-plasma-cyan mb-4 group-hover:bg-plasma-cyan/20 transition">
                ◆
              </div>
              <h3 className="slab-text text-xl font-bold text-white mb-3">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <a
            href="/dashboard"
            className="px-8 py-4 rounded-xl bg-plasma-cyan text-indigo-950 slab-text font-bold hover:bg-plasma-cyan/90 transition"
          >
            Open the sandbox →
          </a>
        </div>
      </div>
    </div>
  );
}
