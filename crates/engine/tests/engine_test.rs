//! Fixture-driven cross-language parity tests (JSON golden).
//! The fixture is shared with the TypeScript, Python and Go implementations:
//! `fixtures/parity/expected.json` — regenerate via
//! `bun run scripts/generate-parity-fixture.ts`.

use entropyscope_engine::{parity_check, WorldState};
use serde::Deserialize;

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct Case {
    seed: u32,
    years: u32,
    wage_bill: String,
    unemployment_rate: String,
    ai_adoption_rate: String,
    remote_rate: String,
}

#[derive(Deserialize)]
struct Fixture {
    cases: Vec<Case>,
}

/// Fixture floats are shortest-round-trip decimal STRINGS (not JSON numbers):
/// JSON-number parse paths differ between runtimes and can shift a value by
/// 1 ULP. `f64::FromStr` is correctly rounded, so parsing the string pins
/// the exact double bits.
fn parse_f64(value: &str) -> f64 {
    value
        .parse::<f64>()
        .expect("fixture float literal must be a valid f64")
}

fn fixture_cases() -> Vec<Case> {
    let fixture: Fixture =
        serde_json::from_str(include_str!("../../../fixtures/parity/expected.json"))
            .expect("fixtures/parity/expected.json must be valid JSON");
    fixture.cases
}

#[test]
fn parity_check_matches_golden_wage_bill() {
    for case in fixture_cases() {
        let result = parity_check(case.seed, case.years);
        assert_eq!(
            result,
            parse_f64(&case.wage_bill),
            "seed={}, years={}",
            case.seed,
            case.years
        );
    }
}

#[test]
fn full_state_matches_golden_all_rates() {
    for case in fixture_cases() {
        let mut state = WorldState::new(case.seed);
        for _ in 0..case.years {
            state.step();
        }
        assert_eq!(state.year(), case.years, "seed={}", case.seed);
        assert_eq!(
            state.unemployment_rate(),
            parse_f64(&case.unemployment_rate),
            "seed={}, years={}",
            case.seed,
            case.years
        );
        assert_eq!(
            state.total_wage_bill(),
            parse_f64(&case.wage_bill),
            "seed={}, years={}",
            case.seed,
            case.years
        );
        assert_eq!(
            state.ai_adoption_rate(),
            parse_f64(&case.ai_adoption_rate),
            "seed={}, years={}",
            case.seed,
            case.years
        );
        assert_eq!(
            state.remote_rate(),
            parse_f64(&case.remote_rate),
            "seed={}, years={}",
            case.seed,
            case.years
        );
    }
}

#[test]
fn parity_check_is_deterministic() {
    let a = parity_check(7331, 10);
    let b = parity_check(7331, 10);
    assert_eq!(a, b);
}

#[test]
fn wage_seed_groups() {
    // PARITY-SPEC v1: seed % 1000 shifts the starting wage bill by 100 per
    // unit, so 1000 and 1001 diverge but 1000 and 2000 share a wage group.
    assert_ne!(parity_check(1000, 0), parity_check(1001, 0));
    assert_eq!(parity_check(1000, 0), parity_check(2000, 0));
}

#[test]
fn world_state_steps_years() {
    let mut state = WorldState::new(7331);
    let start = state.year();
    state.step();
    assert_eq!(state.year(), start + 1);
}
