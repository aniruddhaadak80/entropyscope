# ADR 0004: Polyglot Services for Compute-Heavy Work

Status: Accepted

Date: 2026-10-29


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


## Decision Makers

- entropyscope core team

## References

- [Stack Blueprint](/docs/architecture)
- [Polyglot Stack](/docs/polyglot-stack)
