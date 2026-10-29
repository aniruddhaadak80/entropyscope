# ADR 0006: Tailwind v4 as the Styling System

Status: Accepted

Date: 2026-10-29


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


## Decision Makers

- entropyscope core team

## References

- [Stack Blueprint](/docs/architecture)
- [Polyglot Stack](/docs/polyglot-stack)
