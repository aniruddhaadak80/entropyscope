# EntropyScope

[![CI](https://github.com/aniruddhaadak80/entropyscope/actions/workflows/ci.yml/badge.svg)](https://github.com/aniruddhaadak80/entropyscope/actions/workflows/ci.yml)

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
bun run ci                    # typecheck + lint + unit tests + build
bun run build && bun run e2e  # Playwright e2e (chromium + Pixel 7)
bun run ci:polyglot           # Rust + Python + Go + Ruby + Perl test suites
```

CI runs both on every push via `.github/workflows/ci.yml`.

## Polyglot parity core

The deterministic scalar core — **PARITY-SPEC v1** — exists in four languages,
all pinned to the same committed golden fixture
(`fixtures/parity/expected.json`, regenerate: `bun scripts/generate-parity-fixture.ts`):

| Language | Implementation | Test |
| --- | --- | --- |
| TypeScript | `packages/core/src/parity.ts` | `packages/core/tests/parity.test.ts` |
| Python | `services/agents/parity.py` | `services/agents/tests/test_parity.py` |
| Rust/wasm | `crates/engine/src/lib.rs` | `crates/engine/tests/engine_test.rs` |
| Go | `services/parity-go/parity.go` | `services/parity-go/parity_test.go` |

Ruby (`bin/pipeline.rb`) and Perl (`bin/xtract.pl`) power the offline content
pipeline. Every language also runs in CI — see `.github/workflows/ci.yml`.

## Scale engine

Deterministic, seeded repo-growth generator. Families: `routes`, `components`,
`docs`, `adrs`, `i18n`, `worlds`, `tests`, `stories`, `wiki`, `catalog`,
`packs`, `memos`, `snapshots` — same seed always yields the same repo.

```bash
bun run scripts/generate.ts all --seed 7331
bun run scripts/loc-count.mjs
```

Current size: ~142k total lines (100+ packages/artifacts, 500+ files) including
a 12-sector job catalog, 240-entry skill taxonomy, 7 year-by-year world
snapshots (1,000 workers each), 65 wiki entries, 36 scenario packs, and 120
monthly FOW memos. Data integrity is pinned by tests in `packages/seed/tests`.

## Deploy on Vercel

Push the repo, import it at [Vercel](https://vercel.com/new), and deploy —
`vercel.json` pins the framework (`nextjs`), build (`turbo run build`) and
region (`iad1`). The production domain is `entropyscope.vercel.app`.
