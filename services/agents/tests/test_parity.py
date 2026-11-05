"""Cross-language parity tests for services/agents/parity.py.

Pins the Python implementation of PARITY-SPEC v1 to the shared JSON golden
fixture (fixtures/parity/expected.json), which the TypeScript, Rust and Go
mirrors validate against too.

Run: cd services/agents && python -m pytest tests -q
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from parity import parity_check, run_parity  # noqa: E402

FIXTURE = Path(__file__).resolve().parents[3] / "fixtures" / "parity" / "expected.json"


def load_cases():
    return json.loads(FIXTURE.read_text(encoding="utf-8"))["cases"]


def test_parity_check_matches_golden_wage_bill():
    for case in load_cases():
        # Fixture floats are shortest-round-trip strings; float(str) is
        # correctly rounded, so this pins the exact double bits.
        assert parity_check(case["seed"], case["years"]) == float(case["wageBill"]), (
            case
        )


def test_full_state_matches_golden_all_rates():
    for case in load_cases():
        state = run_parity(case["seed"], case["years"])
        assert state.year == case["years"], case
        assert state.unemployment_rate == float(case["unemploymentRate"]), case
        assert state.total_wage_bill == float(case["wageBill"]), case
        assert state.ai_adoption_rate == float(case["aiAdoptionRate"]), case
        assert state.remote_rate == float(case["remoteRate"]), case


def test_parity_check_is_deterministic():
    assert parity_check(7331, 10) == parity_check(7331, 10)


def test_wage_seed_groups():
    # PARITY-SPEC v1: seed % 1000 shifts the starting wage bill by 100/unit.
    assert parity_check(1000, 0) != parity_check(1001, 0)
    assert parity_check(1000, 0) == parity_check(2000, 0)
