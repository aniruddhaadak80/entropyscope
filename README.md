# EntropyScope

**Simulate the future of work — before it happens.**

Deterministic labor-market forecasting sandbox: branching scenario timelines,
prediction-market calibration (Brier scores), time-machine forks, and a
1,000-worker agent swarm. Seed 7331 — same seed, same universe. Zero API keys.

- 🌐 **Live:** <https://entropyscope.vercel.app>
- 📦 **Repo:** <https://github.com/aniruddhaadak80/entropyscope>
- 🔍 **Health:** <https://entropyscope.vercel.app/healthz>

## Quick start

```bash
bun install
bun run dev
# open http://localhost:3000
```

## Quality gates

```bash
bun run ci   # typecheck + lint + test + build
```

## Scale engine

Deterministic, seeded repo-growth generator:

```bash
bun run scripts/generate.ts all --seed 7331
bun run scripts/loc-count.mjs
```

## Deploy on Vercel

Push the repo, import it at [Vercel](https://vercel.com/new), and deploy —
`vercel.json` pins the framework (`nextjs`), build (`turbo run build`) and
region (`iad1`). The production domain is `entropyscope.vercel.app`.
