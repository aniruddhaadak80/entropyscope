"""
parity.py — Python mirror of PARITY-SPEC v1, the deterministic scalar
world model shared bitwise across the polyglot stack:

  - TypeScript: packages/core/src/parity.ts
  - Python:     services/agents/parity.py        (this file)
  - Rust/wasm:  crates/engine/src/lib.rs
  - Go:         services/parity-go/parity.go

All four are pinned to the same expected numeric outputs by
fixtures/parity/expected.json (regenerate: bun run scripts/generate-parity-fixture.ts).

PARITY-SPEC v1:
  start:  unemployment_rate = 0.03 + (seed % 50) * 0.001
          total_wage_bill   = 1_000_000.0 + (seed % 1000) * 100.0
          ai_adoption_rate  = 0.3
          remote_rate       = 0.4
  step:   year += 1
          unemployment_rate = min(unemployment_rate + 0.001, 0.30)
          total_wage_bill   *= 1.02
          ai_adoption_rate  = min(ai_adoption_rate + 0.01, 0.90)
          remote_rate       = min(remote_rate + 0.005, 0.80)
"""

from dataclasses import dataclass


@dataclass(frozen=True)
class ParityState:
    """Deterministic scalar world state shared by every language mirror."""

    year: int
    unemployment_rate: float
    total_wage_bill: float
    ai_adoption_rate: float
    remote_rate: float


def create_parity_state(seed: int) -> ParityState:
    """Deterministic starting state derived purely from the seed (integer math)."""
    return ParityState(
        year=0,
        unemployment_rate=0.03 + (seed % 50) * 0.001,
        total_wage_bill=1_000_000 + (seed % 1000) * 100,
        ai_adoption_rate=0.3,
        remote_rate=0.4,
    )


def parity_step(state: ParityState) -> ParityState:
    """Evolve the world one simulated year. Pure double arithmetic — no RNG."""
    return ParityState(
        year=state.year + 1,
        unemployment_rate=min(state.unemployment_rate + 0.001, 0.30),
        total_wage_bill=state.total_wage_bill * 1.02,
        ai_adoption_rate=min(state.ai_adoption_rate + 0.01, 0.90),
        remote_rate=min(state.remote_rate + 0.005, 0.80),
    )


def run_parity(seed: int, years: int) -> ParityState:
    state = create_parity_state(seed)
    for _ in range(years):
        state = parity_step(state)
    return state


def parity_check(seed: int, years: int) -> float:
    """Drive `years` steps from `seed`; return the final wage bill (Rust twin)."""
    return run_parity(seed, years).total_wage_bill
