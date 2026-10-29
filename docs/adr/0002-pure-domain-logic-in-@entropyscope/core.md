# ADR 0002: Pure Domain Logic in @entropyscope/core

Status: Accepted

Date: 2026-10-29


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


## Decision Makers

- entropyscope core team

## References

- [Stack Blueprint](/docs/architecture)
- [Polyglot Stack](/docs/polyglot-stack)
