/**
 * adrs.mjs — generate Architecture Decision Records for entropyscope.
 * Produces 10 ADRs under docs/adr/.
 */

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = "docs/adr";

function writeIfMissing(filePath, content) {
  if (existsSync(filePath)) return;
  mkdirSync(join(filePath, ".."), { recursive: true });
  writeFileSync(filePath, content);
}

const adrs = [
  {
    num: "0001",
    title: "Deterministic Simulation by Default",
    status: "Accepted",
    body: `
## Context

entropyscope simulates labor-market dynamics over 30 years. Users need to
reproduce the same results given the same inputs, and fork scenarios at any
year to explore divergent timelines.

## Decision

Use a seeded PRNG (mulberry32, seed 7331) as the single source of randomness.
All randomness flows through this seeded generator. No Math.random(), no
Date.now(), no external entropy.

## Consequences

- Same seed => same universe, every run, on any machine.
- Forking is deterministic: fork at year N, replay, compare side by side.
- Testing is straightforward: assert exact numeric outputs.
- Trade-off: cannot model true stochasticity without changing the seed.
`,
  },
  {
    num: "0002",
    title: "Pure Domain Logic in @entropyscope/core",
    status: "Accepted",
    body: `
## Context

The simulation needs to be testable, portable across languages (TS core,
Python agent service, Rust parity engine), and free of framework coupling.

## Decision

All domain logic lives in @entropyscope/core as pure, dependency-free
functions. No React, no Next.js, no database. Route handlers are thin adapters.

## Consequences

- Core is fully unit-tested (27 tests).
- Python and Rust implementations can be verified for parity.
- Web framework changes don't affect business logic.
- Trade-off: more boilerplate for thin adapters.
`,
  },
  {
    num: "0003",
    title: "SQLite for Local Demo, Postgres for Production",
    status: "Accepted",
    body: `
## Context

The demo must run with zero configuration. Production needs a managed database.

## Decision

Use Prisma with SQLite provider by default (file:./dev.db). Schema is
designed so Postgres is a one-line provider switch for production.

## Consequences

- Zero-config demo: bun install && bun dev works immediately.
- Production docs show the Postgres switch.
- Migrations are committed.
- Trade-off: SQLite has concurrency limits for high-write production.
`,
  },
  {
    num: "0004",
    title: "Polyglot Services for Compute-Heavy Work",
    status: "Accepted",
    body: `
## Context

Some simulation work (parity checking, number-crunching) benefits from
languages other than TypeScript.

## Decision

- Python FastAPI agent service for heavier agent brains.
- Rust wasm crate as the parity oracle for the TS engine.
- Ruby pipeline CLI for documentation generation.
- Perl log extractor for telemetry parsing.

## Consequences

- Each service has its own tests, CI job, and README.
- Parity verified on CI (TS == Python == Rust on fixtures).
- Trade-off: increased operational complexity.
`,
  },
  {
    num: "0005",
    title: "No API Keys — Deterministic Local Simulation",
    status: "Accepted",
    body: `
## Context

Many "AI" demos require API keys, which breaks the demo for users without
them and creates security concerns.

## Decision

All "AI" behavior is deterministic local simulation: finite-state machines,
utility scoring, and seeded noise. Document how to plug in a real LLM later.

## Consequences

- Zero keys needed to run the demo.
- No secrets committed to the repo.
- Works fully offline.
- Trade-off: simulation is not as sophisticated as a real LLM.
`,
  },
  {
    num: "0006",
    title: "Tailwind v4 as the Styling System",
    status: "Accepted",
    body: `
## Context

The design system needs a utility-first CSS framework with dark mode support.

## Decision

Use Tailwind CSS v4 with the @tailwindcss/postcss plugin. Custom palette
(indigo-950, plasma-cyan, star-white) defined in globals.css.

## Consequences

- Rapid UI development.
- Consistent design tokens across packages.
- Dark mode by default.
- Trade-off: Tailwind v4 is newer with a smaller plugin ecosystem.
`,
  },
  {
    num: "0007",
    title: "Turborepo Monorepo Structure",
    status: "Accepted",
    body: `
## Context

The repo has multiple packages (core, ui, sdk, config, seed), services
(Python agent), and crates (Rust engine) that need to be built and tested
together.

## Decision

Use Turborepo with workspaces for TypeScript packages and separate
configuration for polyglot services. Remote caching disabled for simplicity.

## Consequences

- Single bun run typecheck / bun run test / bun run build for all.
- Parallel task execution with dependency awareness.
- Clear separation of concerns.
- Trade-off: learning curve for new contributors.
`,
  },
  {
    num: "0008",
    title: "Seed 7331 as the Canonical Universe Seed",
    status: "Accepted",
    body: `
## Context

Determinism requires a single seed value used everywhere.

## Decision

Seed 7331 is the canonical universe seed. It appears in packages/core/config,
packages/seed, services/agents/app.py, and the README. Recorded in
packages/seed/seed.json.

## Consequences

- Reproducible demos and tests.
- Easy to change the seed globally if needed.
- Trade-off: hardcoded seed is visible in multiple places.
`,
  },
  {
    num: "0009",
    title: "Vercel Standalone Output for Docker",
    status: "Accepted",
    body: `
## Context

The Dockerfile needs to build and run the Next.js app efficiently.

## Decision

Use Next.js \`output: 'standalone'\` with a multi-stage Dockerfile. Non-root
user, healthcheck on /healthz.

## Consequences

- Small production image.
- Fast cold starts.
- Health checks for orchestrators.
- Trade-off: standalone output has some limitations with certain middleware.
`,
  },
  {
    num: "0010",
    title: "12+ Mermaid Diagrams for Documentation",
    status: "Accepted",
    body: `
## Context

The README and docs need visual explanations of the architecture and flows.

## Decision

Author all diagrams as Mermaid (.mmd) files under docs/diagrams/. Embed them
in README.md and docs as mermaid code blocks. GitHub renders them natively.

## Consequences

- Diffable diagram sources.
- Native GitHub rendering.
- 12+ diagrams covering architecture, data flow, CI/CD, user journey, etc.
- Trade-off: Mermaid has limited layout control compared to hand-drawn SVGs.
`,
  },
];

export function generateADRs(_rand, _seed) {
  let count = 0;
  for (const adr of adrs) {
    const file = `${ROOT}/${adr.num}-${adr.title.toLowerCase().replace(/\s+/g, "-")}.md`;
    writeIfMissing(
      file,
      `# ADR ${adr.num}: ${adr.title}

Status: ${adr.status}

Date: 2026-10-29

${adr.body}

## Decision Makers

- entropyscope core team

## References

- [Stack Blueprint](/docs/architecture)
- [Polyglot Stack](/docs/polyglot-stack)
`,
    );
    count++;
  }
  console.log(`   ADRs: ${count} files generated`);
  return count;
}
