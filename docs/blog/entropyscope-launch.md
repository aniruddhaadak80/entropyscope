---
title: "One seed, four languages: shipping a future-of-work forecasting sandbox that's deterministic all the way down"
published: false
description: "Same seed 7331, same world — every time. A tour of entropyscope's polyglot parity core, the 1-ULP serde_json bug CI caught, and the tooling that keeps it honest."
tags: deterministic, python, rust, golang, testing
---

**Same seed, same universe.** That's the entire pitch of [entropyscope](https://github.com/aniruddhaadak80/entropyscope) — a future-of-work forecasting sandbox where a simulated economy of 1,000 workers, a prediction market, and 30-year scenario forks all derive from seed `7331`. No API keys, no LLM calls, no rabbits: if you run it twice, you get bit-identical numbers.

This post is the build log of the part I'm proudest of: the deterministic scalar core — **PARITY-SPEC v1** — implemented four times, in four languages, pinned to one golden fixture. And the genuinely sneaky float bug that only cross-language CI could catch.

## The core is tiny. That's the point.

The whole world model that every language implements is this:

```text
start:  unemployment_rate = 0.03 + (seed % 50) * 0.001
        total_wage_bill   = 1_000_000 + (seed % 1000) * 100
        ai_adoption_rate  = 0.3,  remote_rate = 0.4
step:   unemployment = min(u + 0.001, 0.30)
        wage_bill   *= 1.02
        ai: min(+0.01, 0.90),  remote: min(+0.005, 0.80)
```

No RNG. Pure IEEE-754 doubles. Which means it *should* be identical in every language on the planet. The four mirrors:

| Language | Where | Test |
| --- | --- | --- |
| TypeScript | `packages/core/src/parity.ts` | vitest |
| Python | `services/agents/parity.py` | pytest |
| Rust/wasm | `crates/engine/src/lib.rs` | cargo test |
| Go | `services/parity-go/parity.go` | go test |

Every one of them reads the same committed fixture, `fixtures/parity/expected.json` — 60 cases (12 seeds × 5 horizons) regenerated from the TypeScript reference with `bun scripts/generate-parity-fixture.ts`.

## The bug CI caught: 1 ULP, and it wasn't Rust's fault

First CI run of the Rust job:

```text
seed=0, years=3:  left: 0.41500000000000004   right: 0.415
seed=0, years=30: left: 1811361.5841033538    right: 1811361.5841033536
```

The instinct is "Rust and JS disagree about floats." They don't. Both compute `((0.4 + 0.005) + 0.005) + 0.005` to the same double. The actual culprit: **how each runtime parses the JSON fixture**. `serde_json` reconstructs a JSON number by casting the decimal significand to an f64 and then scaling it — a double-rounding that can drift the final value by exactly 1 ULP. Python's `float()`, Go's `strconv.ParseFloat`, and ECMAScript's `Number()` are correctly rounded, so those three agree bit-for-bit while Rust disagreed.

Bit-level diagnosis (hex dumps of the computed value vs the parsed fixture on both runtimes) confirmed it: the bytes were identical everywhere except inside serde's JSON parser.

**The fix is the nice part.** Store fixture floats as decimal *strings*:

```json
{ "seed": 0, "years": 3, "wageBill": "1061208.0000000002", "remoteRate": "0.41500000000000004" }
```

Then every mirror parses with its own correctly-rounded parser — `Number(str)`, `float(str)`, `f64::from_str`, `strconv.ParseFloat` — and all four reconcile to identical bits *by construction*. JSON numbers were the bug; strings were never parseable in a surprising way.

The 5-line fix hex-deepened my respect for "obviously deterministic" pipelines. If your spec depends on float literals crossing a JSON wall — encode them as strings.

## Keeping it honest: seven CI jobs

Every push to `main` runs:

```yaml
- typecheck / lint / tests / build   # bun + turbo: tsc, biome, vitest, next build
- Playwright e2e                     # 70 tests, chromium + Pixel 7
- Rust (wasm parity oracle)          # cargo test against the fixture
- Python (agent service)             # pytest vs the same fixture
- Go (parity oracle)                 # go test vs the same fixture
- Ruby + Perl                        # content-pipeline suites
```

82 unit tests, plus 70 e2e — including an axe-core accessibility audit over seven core routes that *found real violations on first run* (unlabeled sliders, an unlabeled fork-year input; fixed at the component level). The e2e suite also smoke-tests production directly: point it at the live deployment with `E2E_BASE_URL` and it validates the shipped edge, not yesterday's local build:

```sh
E2E_BASE_URL=https://entropyscope.vercel.app bunx playwright test
# 70 passed
```

There's also a live **Parity Lab** route at <https://entropyscope.vercel.app/parity> — the scalar core computed in your browser from the seed, with the four mirrors listed and the `wageBill` bits printed raw. The API behind it is a regression pin: `GET /api/parity?seed=7331&years=10` returns exactly the fixture's doubles, and e2e asserts them with `toBe`.

## How the repo scales without becoming slop

A "scale engine" generates the heavy artifacts from pure, seeded code — 14 families: dynamic routes, components, ADRs, docs, i18n, a 65-page wiki, a 300-job catalog across 12 sectors, a 240-skill taxonomy, 36 scenario packs, 120 memos, 1,000-worker year snapshots, and (new this week) `deepdrills`: per-sector × 31-year metric tables, per-job automation-risk and 10-year wage forecasts, and per-skill demand curves. Integrity of the generated data is itself pinned by tests, so generation can't quietly corrupt numbers. Everything regenerates byte-identically from `--seed 7331`.

143,805 total lines, 527 files, and every one of them traceable or tested.

## Try it

```sh
bun install
bun run dev            # http://localhost:3000
bun run ci             # typecheck + lint + 82 unit tests + build
bun run ci:polyglot    # cargo + pytest + go test + ruby + perl
```

Zero API keys. The next step on the polyglot side is wiring the Rust crate into the browser as actual wasm (the fixture already guards its behavior), and giving `deepdrills` a drill-down UI.

Same seed. Same universe. That's the whole trick — and it took four languages, one 1-ULP bug, and seven CI jobs to make it stick.
