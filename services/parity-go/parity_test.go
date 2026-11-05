package main

import (
	"encoding/json"
	"os"
	"strconv"
	"testing"
)

// Fixture layout mirrors fixtures/parity/expected.json, shared with the
// TypeScript, Python and Rust implementations of PARITY-SPEC v1. Floats are
// shortest-round-trip decimal STRINGS (not JSON numbers): JSON-number parse
// paths differ between runtimes and can shift a value by 1 ULP, while
// strconv.ParseFloat is correctly rounded and pins the exact double bits.
type parityCase struct {
	Seed             int    `json:"seed"`
	Years            int    `json:"years"`
	WageBill         string `json:"wageBill"`
	UnemploymentRate string `json:"unemploymentRate"`
	AIAdoptionRate   string `json:"aiAdoptionRate"`
	RemoteRate       string `json:"remoteRate"`
}

type parityFixture struct {
	Cases []parityCase `json:"cases"`
}

func loadFixture(t *testing.T) []parityCase {
	t.Helper()
	raw, err := os.ReadFile("../../fixtures/parity/expected.json")
	if err != nil {
		t.Fatalf("read fixture: %v", err)
	}
	var f parityFixture
	if err := json.Unmarshal(raw, &f); err != nil {
		t.Fatalf("parse fixture: %v", err)
	}
	return f.Cases
}

func parseF64(t *testing.T, s string) float64 {
	t.Helper()
	v, err := strconv.ParseFloat(s, 64)
	if err != nil {
		t.Fatalf("parse fixture float %q: %v", s, err)
	}
	return v
}

func TestParityCheckMatchesGoldenWageBill(t *testing.T) {
	for _, c := range loadFixture(t) {
		if got := ParityCheck(c.Seed, c.Years); got != parseF64(t, c.WageBill) {
			t.Errorf("seed=%d years=%d: got %v, want %s", c.Seed, c.Years, got, c.WageBill)
		}
	}
}

func TestFullStateMatchesGoldenAllRates(t *testing.T) {
	for _, c := range loadFixture(t) {
		s := RunParity(c.Seed, c.Years)
		if s.Year != c.Years || s.UnemploymentRate != parseF64(t, c.UnemploymentRate) ||
			s.TotalWageBill != parseF64(t, c.WageBill) ||
			s.AIAdoptionRate != parseF64(t, c.AIAdoptionRate) ||
			s.RemoteRate != parseF64(t, c.RemoteRate) {
			t.Errorf("seed=%d years=%d: state %+v mismatches golden", c.Seed, c.Years, s)
		}
	}
}

func TestParityCheckIsDeterministic(t *testing.T) {
	if ParityCheck(7331, 10) != ParityCheck(7331, 10) {
		t.Fatal("parity_check must be deterministic")
	}
}

func TestWageSeedGroups(t *testing.T) {
	// PARITY-SPEC v1: seed % 1000 shifts the starting wage bill by 100/unit.
	if ParityCheck(1000, 0) == ParityCheck(1001, 0) {
		t.Fatal("expected 1000 and 1001 to differ")
	}
	if ParityCheck(1000, 0) != ParityCheck(2000, 0) {
		t.Fatal("expected 1000 and 2000 to share a wage group")
	}
}
