# ADR 0008: Seed 7331 as the Canonical Universe Seed

Status: Accepted

Date: 2026-10-29


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


## Decision Makers

- entropyscope core team

## References

- [Stack Blueprint](/docs/architecture)
- [Polyglot Stack](/docs/polyglot-stack)
