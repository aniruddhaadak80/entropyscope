// parity.go — Go mirror of PARITY-SPEC v1, the deterministic scalar world
// model shared bitwise across the polyglot stack:
//
//   - TypeScript: packages/core/src/parity.ts
//   - Python:     services/agents/parity.py
//   - Rust/wasm:  crates/engine/src/lib.rs
//   - Go:         services/parity-go/parity.go  (this file)
//
// All four are pinned to the same expected numeric outputs by
// fixtures/parity/expected.json (regenerate: bun run scripts/generate-parity-fixture.ts).
package main

import "math"

// ParityState is the deterministic scalar world state shared by every mirror.
type ParityState struct {
	Year             int     `json:"year"`
	UnemploymentRate float64 `json:"unemploymentRate"`
	TotalWageBill    float64 `json:"totalWageBill"`
	AIAdoptionRate   float64 `json:"aiAdoptionRate"`
	RemoteRate       float64 `json:"remoteRate"`
}

// CreateParityState derives the starting state purely from the seed (integer math).
func CreateParityState(seed int) ParityState {
	return ParityState{
		Year:             0,
		UnemploymentRate: 0.03 + float64(seed%50)*0.001,
		TotalWageBill:    1_000_000 + float64(seed%1000)*100,
		AIAdoptionRate:   0.3,
		RemoteRate:       0.4,
	}
}

// ParityStep evolves the world one simulated year. Pure float64 arithmetic.
func ParityStep(s ParityState) ParityState {
	return ParityState{
		Year:             s.Year + 1,
		UnemploymentRate: math.Min(s.UnemploymentRate+0.001, 0.30),
		TotalWageBill:    s.TotalWageBill * 1.02,
		AIAdoptionRate:   math.Min(s.AIAdoptionRate+0.01, 0.90),
		RemoteRate:       math.Min(s.RemoteRate+0.005, 0.80),
	}
}

// RunParity drives `years` steps from `seed` and returns the final state.
func RunParity(seed, years int) ParityState {
	state := CreateParityState(seed)
	for i := 0; i < years; i++ {
		state = ParityStep(state)
	}
	return state
}

// ParityCheck drives `years` steps from `seed`; returns the final wage bill.
func ParityCheck(seed, years int) float64 {
	return RunParity(seed, years).TotalWageBill
}

func main() {
	// Printed for humans; CI verifies numbers via parity_test.go golden fixture.
	println("parity_check seed=7331 years=10 wage bill =", ParityCheck(7331, 10))
}
