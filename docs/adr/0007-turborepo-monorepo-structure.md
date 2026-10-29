# ADR 0007: Turborepo Monorepo Structure

Status: Accepted

Date: 2026-10-29


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


## Decision Makers

- entropyscope core team

## References

- [Stack Blueprint](/docs/architecture)
- [Polyglot Stack](/docs/polyglot-stack)
