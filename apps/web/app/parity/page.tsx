"use client";
import { runParity } from "@repo/core";
import { Badge } from "@repo/ui/src/components/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/src/components/Card";
import { Slider } from "@repo/ui/src/components/Slider";
import { Stat } from "@repo/ui/src/components/Stat";
import { useState } from "react";

const MIRRORS = [
  { language: "TypeScript", implementation: "packages/core/src/parity.ts" },
  { language: "Python", implementation: "services/agents/parity.py" },
  { language: "Rust/wasm", implementation: "crates/engine/src/lib.rs" },
  { language: "Go", implementation: "services/parity-go/parity.go" },
];

/**
 * Parity Lab — live browser evaluation of PARITY-SPEC v1 through the
 * TypeScript reference implementation (@repo/core). The Python, Rust/wasm
 * and Go mirrors compute these exact double bits from the seed (proven by
 * the committed golden fixture, fixtures/parity/expected.json, tested in
 * all four languages on every push).
 */
export default function ParityPage() {
  const [seed, setSeed] = useState(7331);
  const [years, setYears] = useState(10);
  const state = runParity(seed, years);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="slab-text text-3xl font-bold text-white">Parity Lab</h1>
        <Badge>{`spec: PARITY-SPEC v1`}</Badge>
      </div>
      <p className="text-muted-foreground">
        The deterministic scalar core computed live from the seed. TypeScript here — the same
        numbers are pinned bit-for-bit in Python, Rust/wasm and Go via the shared golden fixture.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Year" value={`${state.year}`} />
        <Stat label="Unemployment" value={`${(100 * state.unemploymentRate).toFixed(2)}%`} />
        <Stat label="AI adoption" value={`${(100 * state.aiAdoptionRate).toFixed(2)}%`} />
        <Stat label="Remote rate" value={`${(100 * state.remoteRate).toFixed(2)}%`} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-white">Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Seed</span>
              <span className="text-xs text-muted-foreground">{seed}</span>
            </div>
            <Slider
              value={Math.min(seed, 100000)}
              onValueChange={setSeed}
              min={0}
              max={100000}
              ariaLabel="Simulation seed"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Simulated years</span>
              <span className="text-xs text-muted-foreground">{years}</span>
            </div>
            <Slider
              value={years}
              onValueChange={setYears}
              min={0}
              max={30}
              ariaLabel="Simulated years"
            />
          </div>
          <div className="border-t border-indigo-900 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total wage bill</span>
              <span className="slab-text text-xl text-white">
                ${state.totalWageBill.toLocaleString("en-US", { maximumFractionDigits: 8 })}
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              wageBill(seed {seed}, year {years}) = {state.totalWageBill.toString()} — pinned to the
              golden fixture by cargo test, go test, pytest and vitest.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-white">Language mirrors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {MIRRORS.map((m) => (
              <div key={m.language} className="flex items-center justify-between text-sm">
                <span className="font-medium text-white">{m.language}</span>
                <code className="text-xs text-muted-foreground">{m.implementation}</code>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Fixture floats are stored as decimal strings because JSON-number parse paths differ
            between runtimes — serde_json double-rounds and drifts 1 ULP. Each mirror parses the
            same string with its own correctly-rounded parser, so all four reconcile to identical
            double bits.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
