/**
 * memos.mjs — generate 120 monthly future-of-work memos (markdown).
 * Output: docs/memos/memo-<yyyy>-<mm>.md. Deterministic phrasing from banks
 * seeded by the same mulberry32 stream. Zero code risk.
 */

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = "docs/memos";

function writeIfMissing(filePath, content) {
  if (existsSync(filePath)) return;
  mkdirSync(join(filePath, ".."), { recursive: true });
  writeFileSync(filePath, content);
}

const THEMES = [
  "hybrid scheduling",
  "AI exposure",
  "wage compression",
  "reskilling cycles",
  "prediction markets",
  "calibration drift",
  "automation waves",
  "firm churn",
  "credential inflation",
  "productivity distribution",
  "labor share",
  "risk pooling",
];

const REGIONS = ["North", "South", "East", "West"];

function pick(rand, arr) {
  return arr[Math.floor(rand() * arr.length)];
}

function memo(year, month, seed, rand) {
  const mm = month.toString().padStart(2, "0");
  const t1 = pick(rand, THEMES);
  const t2 = pick(rand, THEMES);
  const t3 = pick(rand, THEMES);
  const up = 0.4 + rand() * 0.5;
  const down = 0.1 + rand() * 0.4;

  return `# FOW Memo ${year}-${mm}

**Series:** monthly future-of-work memos  ·  **Seed:** ${seed}  ·  **Horizon:** 30y

## Headline

The ${month < 7 ? "first" : "second"} half of ${year} puts ${t1} in focus:
models push adoption to ${(up * 100).toFixed(1)}% in upper scenarios while
stress cases linger near ${(down * 100).toFixed(1)}%. Attention shifts to
${t2} and ${t3} across the four regions.

## Simulated market pod

- ${pick(rand, REGIONS)} pod, base-case unemployment gap: ${(rand() * 4).toFixed(2)} pt
- Four-day-week penetration: ${(rand() * 55).toFixed(1)}%
- Remote-eligible share: ${(30 + rand() * 40).toFixed(1)}%
- Wage-bill drift: ${(1000 + rand() * 300).toFixed(0)} MPC-index

## How to read this memo

Numbers above are outputs of the deterministic engine, not live data.
Fork the year in the time machine to see how a ${t1} shock changes the
cell values, then track the same cell ids across adjacent memos.

## Guidance

Watch the calibration bins at the year boundary and keep notes short.
When ${t2} prints land outside your band, widen intervals rather than
revise the trend line mid-quarter.

## See also

- Index kept in [wiki](../wiki/index.md)
`;
}

export function generateMemos(rand, seed) {
  let count = 0;
  for (let year = 2020; year <= 2029; year++) {
    for (let month = 1; month <= 12; month++) {
      writeIfMissing(
        `${ROOT}/memo-${year}-${month.toString().padStart(2, "0")}.md`,
        memo(year, month, seed, rand),
      );
      count++;
    }
  }
  console.log(`   memos: ${count} memos generated`);
  return count;
}
