# ADR 0003: SQLite for Local Demo, Postgres for Production

Status: Accepted

Date: 2026-10-29


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


## Decision Makers

- entropyscope core team

## References

- [Stack Blueprint](/docs/architecture)
- [Polyglot Stack](/docs/polyglot-stack)
