//! entropyscope-engine — Rust/wasm parity oracle for the TS simulation core.
//!
//! Implements the deterministic PARITY-SPEC v1 scalar model, bitwise
//! identical to packages/core/src/parity.ts (TypeScript) and
//! services/agents/parity.py (Python). Fixture-driven cross-language tests
//! pin all three implementations to the same expected outputs.
//!
//! PARITY-SPEC v1:
//!   start:  unemployment_rate = 0.03 + (seed % 50) * 0.001
//!           total_wage_bill   = 1_000_000.0 + (seed % 1000) * 100.0
//!           ai_adoption_rate  = 0.3
//!           remote_rate       = 0.4
//!   step:   year += 1
//!           unemployment_rate = min(unemployment_rate + 0.001, 0.30)
//!           total_wage_bill   *= 1.02
//!           ai_adoption_rate  = min(ai_adoption_rate + 0.01, 0.90)
//!           remote_rate       = min(remote_rate + 0.005, 0.80)

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct WorldState {
    year: u32,
    unemployment_rate: f64,
    total_wage_bill: f64,
    ai_adoption_rate: f64,
    remote_rate: f64,
}

#[wasm_bindgen]
impl WorldState {
    #[wasm_bindgen(constructor)]
    pub fn new(seed: u32) -> WorldState {
        WorldState {
            year: 0,
            unemployment_rate: 0.03 + f64::from(seed % 50) * 0.001,
            total_wage_bill: 1_000_000.0 + f64::from(seed % 1000) * 100.0,
            ai_adoption_rate: 0.3,
            remote_rate: 0.4,
        }
    }

    /// Evolve the world one simulated year. Pure double arithmetic only —
    /// no RNG — so TS/Python/Rust produce bitwise-identical states.
    pub fn step(&mut self) {
        self.year += 1;
        self.unemployment_rate = (self.unemployment_rate + 0.001).min(0.30);
        self.total_wage_bill *= 1.02;
        self.ai_adoption_rate = (self.ai_adoption_rate + 0.01).min(0.90);
        self.remote_rate = (self.remote_rate + 0.005).min(0.80);
    }

    pub fn year(&self) -> u32 {
        self.year
    }

    pub fn unemployment_rate(&self) -> f64 {
        self.unemployment_rate
    }

    pub fn total_wage_bill(&self) -> f64 {
        self.total_wage_bill
    }

    pub fn ai_adoption_rate(&self) -> f64 {
        self.ai_adoption_rate
    }

    pub fn remote_rate(&self) -> f64 {
        self.remote_rate
    }
}

/// Drive `years` steps from `seed` and return the final wage bill.
/// Bitwise-identical across the TS, Python and Rust implementations.
#[wasm_bindgen]
pub fn parity_check(seed: u32, years: u32) -> f64 {
    let mut state = WorldState::new(seed);
    for _ in 0..years {
        state.step();
    }
    state.total_wage_bill()
}
