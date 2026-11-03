import { expect, test } from "@playwright/test";

test.describe("Dynamic routes", () => {
  test("scenario detail renders for a known scenario", async ({ page }) => {
    await page.goto("/scenarios/baseline");
    await expect(page.getByRole("heading", { name: "Scenario Detail" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Scenario: baseline" })).toBeVisible();
  });

  test("market detail renders for a known market", async ({ page }) => {
    await page.goto("/markets/unemployment-year-10");
    await expect(page.getByRole("heading", { name: "Prediction Market Detail" })).toBeVisible();
  });

  test("year simulation renders for an arbitrary year", async ({ page }) => {
    await page.goto("/simulate/15");
    await expect(page.getByRole("heading", { name: "Year Simulation" })).toBeVisible();
    await expect(page.getByText(/Year 15 Workforce State/)).toBeVisible();
  });

  test("sector detail renders for a known sector", async ({ page }) => {
    await page.goto("/world/sectors/technology");
    await expect(page.getByRole("heading", { name: "Sector Detail" })).toBeVisible();
  });
});
