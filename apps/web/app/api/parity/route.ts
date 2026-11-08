import { runParity } from "@repo/core";
import { NextResponse, type NextRequest } from "next/server";

/**
 * GET /api/parity?seed=7331&years=10
 *
 * PARITY-SPEC v1 evaluation endpoint over the TypeScript reference
 * implementation. The Python, Rust/wasm and Go mirrors produce these exact
 * double bits (pinned by fixtures/parity/expected.json and validated in all
 * four languages in CI).
 */
export function GET(request: NextRequest) {
  const rawSeed = request.nextUrl.searchParams.get("seed");
  const rawYears = request.nextUrl.searchParams.get("years");

  let seed = 7331;
  let years = 10;
  if (rawSeed !== null) {
    const parsed = Number(rawSeed);
    if (!Number.isInteger(parsed) || parsed < 0 || parsed > 1_000_000) {
      return NextResponse.json(
        { error: "seed must be an integer between 0 and 1000000" },
        { status: 400 },
      );
    }
    seed = parsed;
  }
  if (rawYears !== null) {
    const parsed = Number(rawYears);
    if (!Number.isInteger(parsed) || parsed < 0 || parsed > 100) {
      return NextResponse.json(
        { error: "years must be an integer between 0 and 100" },
        { status: 400 },
      );
    }
    years = parsed;
  }

  const state = runParity(seed, years);
  return NextResponse.json({
    spec: "PARITY-SPEC v1",
    seed,
    years,
    state,
    mirrors: [
      "packages/core/src/parity.ts",
      "services/agents/parity.py",
      "crates/engine/src/lib.rs",
      "services/parity-go/parity.go",
    ],
  });
}
