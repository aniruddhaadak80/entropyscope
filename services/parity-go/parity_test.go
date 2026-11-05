package main

import (
	"encoding/json"
	"os"
	"testing"
)

// Fixture layout mirrors fixtures/parity/expected.json, shared with the
// TypeScript, Python and Rust implementations of PARITY-SPEC v1.
type parityCase struct {
	Seed             int     `json:"seed"`
	Years            int     `json:"years"`
	WageBill         float64 `json:"wageBill"`
	UnemploymentRate float64 `json:"unemploymentRate"`
	AIAdoptionRate   float64 `json:"aiAdoptionRate"`
	RemoteRate       float64 `json:"remoteRate"`
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

func TestParityCheckMatchesGoldenWageBill(t *testing.T) {
	for _, c := range loadFixture(t) {
		if got := ParityCheck(c.Seed, c.Years); got != c.WageBill {
			t.Errorf("seed=%d years=%d: got %v, want %v", c.Seed, c.Years, got, c.WageBill)
		}
	}
}

func TestFullStateMatchesGoldenAllRates(t *testing.T) {
	for _, c := range loadFixture(t) {
		s := RunParity(c.Seed, c.Years)
		if s.Year != c.Years || s.UnemploymentRate != c.UnemploymentRate ||
			s.TotalWageBill != c.WageBill || s.AIAdoptionRate != c.AIAdoptionRate ||
			s.RemoteRate != c.RemoteRate {
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
