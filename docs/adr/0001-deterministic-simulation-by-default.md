# ADR 0001: Deterministic Simulation by Default

Status: Accepted

Date: 2026-10-29


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


## Decision Makers

- entropyscope core team

## References

- [Stack Blueprint](/docs/architecture)
- [Polyglot Stack](/docs/polyglot-stack)
