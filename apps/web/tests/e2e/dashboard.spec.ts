import { expect, test } from "@playwright/test";

test.describe("Workforce simulator", () => {
  test("initializes a deterministic world at year 0", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.getByRole("heading", { name: "Workforce Simulator" })).toBeVisible();
    await expect(page.getByText(/Year 0 of 30/)).toBeVisible();
    await expect(page.getByText("Paused")).toBeVisible();
    await expect(page.getByText(/1000 simulated workers/)).toBeVisible();
  });

  test("steps a year and reflects the new year", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.getByText(/Year 0 of 30/)).toBeVisible();

    await page.getByRole("button", { name: "Step year" }).click();
    await expect(page.getByText(/Year 1 of 30/)).toBeVisible();

    await page.getByRole("button", { name: "Step year" }).click();
    await expect(page.getByText(/Year 2 of 30/)).toBeVisible();
  });

  test("reset returns the simulation to year 0", async ({ page }) => {
    await page.goto("/dashboard");
    await page.getByRole("button", { name: "Step year" }).click();
    await expect(page.getByText(/Year 1 of 30/)).toBeVisible();

    await page.getByRole("button", { name: "Reset" }).click();
    await expect(page.getByText(/Year 0 of 30/)).toBeVisible();
  });
});
