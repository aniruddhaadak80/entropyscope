import { expect, test } from "@playwright/test";

/**
 * Parity Lab — the deterministic scalar core (PARITY-SPEC v1) reachable in
 * the UI and over the API. Expectation values are pinned to the committed
 * golden fixture computed from the TypeScript reference implementation.
 */
test.describe("Parity lab", () => {
  test("renders the Parity Lab page with the fixture-pinned default", async ({ page }) => {
    await page.goto("/parity");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Parity Lab");
    // seed 7331, 10 years from the golden fixture
    await expect(page.getByText(/spec: PARITY-SPEC v1/)).toBeVisible();
  });

  test("api evaluates the golden-fixture case seed=7331 years=10", async ({ request }) => {
    const res = await request.get("/api/parity?seed=7331&years=10");
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.spec).toBe("PARITY-SPEC v1");
    expect(body.state.year).toBe(10);
    // exact double bits from fixtures/parity/expected.json (seed 7331, years 10)
    expect(body.state.unemploymentRate).toBe(0.07100000000000001);
    expect(body.state.totalWageBill).toBe(1259343.1352965834);
    expect(body.state.aiAdoptionRate).toBe(0.4000000000000001);
    expect(body.state.remoteRate).toBe(0.45000000000000007);
  });

  test("api years=0 returns the wage-bill seed group undrifted", async ({ request }) => {
    const res = await request.get("/api/parity?seed=7331&years=0");
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.state.year).toBe(0);
    expect(body.state.totalWageBill).toBe(1033100);
    expect(body.state.unemploymentRate).toBe(0.061);
  });

  test("api rejects out-of-domain years", async ({ request }) => {
    const res = await request.get("/api/parity?years=-3");
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/years/);
  });
});
