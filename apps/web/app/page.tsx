export default function Home() {
  return (
    <div className="flex flex-col h-full">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-plasma-cyan/10 rounded-full blur-[120px] -mt-32" />
          <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="slab-text text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">
            Simulate the future of work
            <br />
            <span className="text-plasma-cyan">— before it happens.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            EntropyScope is a forecasting sandbox where you build branching workforce scenarios over
            30 simulated years, resolve them with a prediction-market engine, and track your own
            forecast calibration. Fork any simulated year and replay divergent timelines side by
            side.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/dashboard"
              className="px-8 py-4 rounded-xl bg-plasma-cyan text-indigo-950 slab-text font-bold hover:bg-plasma-cyan/90 transition"
            >
              Open the sandbox
            </a>
            <a
              href="/features"
              className="px-8 py-4 rounded-xl border border-indigo-900 text-white hover:bg-indigo-900/30 transition"
            >
              Features
            </a>
          </div>
        </div>
      </section>

      <section className="border-y border-indigo-900 bg-indigo-950 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="slab-text text-3xl font-bold text-white mb-12 text-center">
            What you can simulate
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Branching scenarios",
                desc: "Build policy shock timelines — AI adoption, remote-first, four-day week, automation waves — and watch them diverge.",
              },
              {
                title: "Agent swarm",
                desc: "1,000+ simulated workers as a live workforce. Reskilling, layoffs, wage dynamics — all deterministic.",
              },
              {
                title: "Prediction markets",
                desc: "Buy shares on scenario outcomes. Prices move with a constant-product AMM. No oracle, no keys.",
              },
              {
                title: "Time machine",
                desc: "Fork any simulated year and replay what-if timelines side by side. Deterministic replay.",
              },
              {
                title: "Calibration tracking",
                desc: "Brier-score forecast calibration. Watch your prediction skill improve over time.",
              },
              {
                title: "World explorer",
                desc: "Drill into sectors, workers, and jobs. Watch the labor market evolve year by year.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-xl border border-indigo-900 bg-indigo-900/30"
              >
                <h3 className="slab-text text-lg font-bold text-white mb-3">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="slab-text text-3xl font-bold text-white mb-10 text-center">
            Zero keys. Deterministic. Open source.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-center">
            <div className="flex flex-col gap-2">
              <span className="text-2xl font-bold text-plasma-cyan">🔑</span>
              <span className="slab-text font-semibold text-white">No API keys</span>
              <span className="text-sm text-muted-foreground">
                Everything runs as local simulation
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-2xl font-bold text-plasma-cyan">🎲</span>
              <span className="slab-text font-semibold text-white">Seed 7331</span>
              <span className="text-sm text-muted-foreground">
                Same seed = same universe, every run
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-2xl font-bold text-plasma-cyan">📄</span>
              <span className="slab-text font-semibold text-white">MIT licensed</span>
              <span className="text-sm text-muted-foreground">
                Open source, contribution welcome
              </span>
            </div>
          </div>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="/dashboard"
              className="px-8 py-4 rounded-xl bg-plasma-cyan text-indigo-950 slab-text font-bold hover:bg-plasma-cyan/90 transition"
            >
              Start simulating →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
