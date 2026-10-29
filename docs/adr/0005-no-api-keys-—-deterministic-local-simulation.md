# ADR 0005: No API Keys — Deterministic Local Simulation

Status: Accepted

Date: 2026-10-29


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


## Decision Makers

- entropyscope core team

## References

- [Stack Blueprint](/docs/architecture)
- [Polyglot Stack](/docs/polyglot-stack)
