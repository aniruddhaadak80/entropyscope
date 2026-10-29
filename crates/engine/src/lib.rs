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
        let mut rng = simple_rng(seed);
        WorldState {
            year: 0,
            unemployment_rate: 0.05,
            total_wage_bill: 1_000_000.0,
            ai_adoption_rate: 0.3,
            remote_rate: 0.4,
            _rng: rng,
        }
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

    pub fn step(&mut self) {
        self.year += 1;
        // deterministic step
        self.unemployment_rate = (self.unemployment_rate + 0.001).min(0.3);
        self.total_wage_bill *= 1.02;
        self.ai_adoption_rate = (self.ai_adoption_rate + 0.01).min(0.9);
        self.remote_rate = (self.remote_rate + 0.005).min(0.8);
    }
}

struct SimpleRng {
    state: u32,
}

fn simple_rng(seed: u32) -> SimpleRng {
    SimpleRng { state: seed }
}

#[wasm_bindgen]
pub fn parity_check(seed: u32, years: u32) -> f64 {
    let mut state = WorldState::new(seed);
    for _ in 0..years {
        state.step();
    }
    state.total_wage_bill()
}
