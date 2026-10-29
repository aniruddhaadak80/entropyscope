# ADR 0009: Vercel Standalone Output for Docker

Status: Accepted

Date: 2026-10-29


## Context

The Dockerfile needs to build and run the Next.js app efficiently.

## Decision

Use Next.js `output: 'standalone'` with a multi-stage Dockerfile. Non-root
user, healthcheck on /healthz.

## Consequences

- Small production image.
- Fast cold starts.
- Health checks for orchestrators.
- Trade-off: standalone output has some limitations with certain middleware.


## Decision Makers

- entropyscope core team

## References

- [Stack Blueprint](/docs/architecture)
- [Polyglot Stack](/docs/polyglot-stack)
