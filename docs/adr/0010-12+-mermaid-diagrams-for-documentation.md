# ADR 0010: 12+ Mermaid Diagrams for Documentation

Status: Accepted

Date: 2026-10-29


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


## Decision Makers

- entropyscope core team

## References

- [Stack Blueprint](/docs/architecture)
- [Polyglot Stack](/docs/polyglot-stack)
