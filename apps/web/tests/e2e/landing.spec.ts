import { expect, test } from "@playwright/test";

test.describe("Landing page", () => {
  test("renders the hero and product promise", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Simulate the future of work");
    await expect(page.getByText("— before it happens.")).toBeVisible();
    await expect(page.getByText("Zero keys. Deterministic. Open source.")).toBeVisible();
  });

  test("primary CTA opens the sandbox dashboard", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Open the sandbox" }).click();
    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(page.getByRole("heading", { name: "Workforce Simulator" })).toBeVisible();
  });

  test("features link navigates to the features page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Features" }).first().click();
    await expect(page.getByRole("heading", { name: "Features" })).toBeVisible();
  });
});
