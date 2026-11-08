import { expect, test } from "@playwright/test";

const routes: Array<{ path: string; heading: string }> = [
  { path: "/scenarios", heading: "Scenarios" },
  { path: "/markets", heading: "Prediction Markets" },
  { path: "/calibration", heading: "Forecast Calibration" },
  { path: "/world", heading: "World Explorer" },
  { path: "/time-machine", heading: "Time Machine" },
  { path: "/parity", heading: "Parity Lab" },
  { path: "/features", heading: "Features" },
  { path: "/about", heading: "About EntropyScope" },
];

test.describe("Product navigation", () => {
  for (const route of routes) {
    test(`renders ${route.path}`, async ({ page }) => {
      await page.goto(route.path);
      await expect(page.getByRole("heading", { level: 1 })).toContainText(route.heading);
    });
  }
});
