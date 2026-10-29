/**
 * @entropyscope/config — shared monorepo configuration.
 * Central design tokens, API contracts, and environment schema.
 */

export const palette = {
  indigo: "#1e1b4b",
  indigoLight: "#312e81",
  starWhite: "#fafafa",
  plasmaCyan: "#22d3ee",
  slate: "#64748b",
} as const;

export type Palette = (typeof palette)[keyof typeof palette];

export const fontFamilies = {
  display: "Space Grotesk, ui-sans-serif, system-ui, sans-serif",
  body: "Inter, ui-sans-serif, system-ui, sans-serif",
  mono: "JetBrains Mono, ui-monospace, SFMono-Regular, monospace",
} as const;

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
} as const;

export const apiBase = "http://localhost:8000";
