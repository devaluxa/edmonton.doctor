import { expect, test } from "@playwright/test";

test.describe("contact page review", () => {
  test("stacks location cards cleanly beside the registration form", async ({
    page,
  }) => {
    await page.goto("/contact/");

    await expect(
      page.getByRole("heading", {
        name: "Register Or Contact A Clinic",
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Register As A Patient" }),
    ).toBeVisible();
    await expect(page.locator('nav[aria-label="Breadcrumb"]')).toHaveCount(0);

    const locationCards = page
      .locator("article")
      .filter({ hasText: "Call Clinic" });
    await expect(locationCards).toHaveCount(2);
    await expect(page.getByText("Dr Kingsley Lasing MD")).toHaveCount(0);
    expect(
      await page
        .locator(
          'a[href="/register/"], a[href="/register/#patient-registration-form"]',
        )
        .count(),
    ).toBeGreaterThan(0);

    const noHorizontalScroll = await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth + 1,
    );
    expect(noHorizontalScroll).toBe(true);
  });
});
