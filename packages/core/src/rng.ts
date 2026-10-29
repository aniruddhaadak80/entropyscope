/**
 * mulberry32 — a fast, small, seeded PRNG.
 * Same seed => same sequence. Deterministic across runs, languages, platforms.
 * Used as the single source of randomness for the entire simulation.
 */

export function mulberry32(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function seededRandom(seed: number, n: number): number[] {
  const rand = mulberry32(seed);
  const out: number[] = [];
  for (let i = 0; i < n; i++) out.push(rand());
  return out;
}
