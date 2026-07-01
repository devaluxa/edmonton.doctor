import { expect, test } from "@playwright/test";

test.describe("walk-in clinic page review", () => {
  test("renders a readable walk-in page with working clinic actions", async ({
    baseURL,
    page,
    request,
  }) => {
    await page.goto("/walk-in/");

    await expect(
      page.getByRole("heading", {
        name: "Walk-In Clinic Care in Edmonton",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Current Clinic Contacts And Hours",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Care For Timely, Non-Emergency Concerns",
      }),
    ).toBeVisible();
    await expect(page.locator('nav[aria-label="Breadcrumb"]')).toHaveCount(0);

    const locationCards = page
      .locator("article")
      .filter({ hasText: "Call Clinic" });
    await expect(locationCards).toHaveCount(2);
    await expect(page.getByText("Dr Kingsley Lasing MD")).toHaveCount(0);

    const heroImage = page.locator('img[src="/images/medical/walk-in-care-consultation.png"]');
    await expect(heroImage).toBeVisible();
    await expect
      .poll(() =>
        heroImage.evaluate(
          (image) =>
            image instanceof HTMLImageElement &&
            image.complete &&
            image.naturalWidth > 0,
        ),
      )
      .toBe(true);
    const heroImageFitsContainer = await heroImage.evaluate((image) => {
      const rect = image.getBoundingClientRect();
      const parent = image.parentElement?.getBoundingClientRect();
      const clientWidth = document.documentElement.clientWidth;

      return Boolean(
        parent &&
          rect.left >= parent.left - 1 &&
          rect.right <= parent.right + 1 &&
          rect.width <= clientWidth,
      );
    });
    expect(heroImageFitsContainer).toBe(true);

    const imageResponse = await request.get(
      new URL("/images/medical/walk-in-care-consultation.png", baseURL).toString(),
    );
    expect(imageResponse.status()).toBeLessThan(400);

    expect(await page.locator('a[href="/register/"]').count()).toBeGreaterThan(0);

    const bodyText = await page.locator("body").innerText();
    expect(bodyText).toContain("Non\u2011Emergency Injuries");
    expect(bodyText).not.toContain(
      "Call the preferred clinic location to confirm current walk-in availability and next steps.",
    );
    await expect(
      page.locator(".medical-card-eyebrow").filter({ hasText: "Walk-In Care" }),
    ).toHaveCount(0);

    const noHorizontalScroll = await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth + 1,
    );
    expect(noHorizontalScroll).toBe(true);

    const readableBodyText = await page
      .getByText("Walk-in availability can change during the day.")
      .evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize));
    expect(readableBodyText).toBeGreaterThanOrEqual(16);

    const nonEmergencyTitleHeight = await page
      .getByRole("heading", { name: "Non\u2011Emergency Injuries" })
      .evaluate((element) => element.getBoundingClientRect().height);
    expect(nonEmergencyTitleHeight).toBeLessThan(34);
  });

  test("keeps the hero image and page width stable on narrow mobile", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 900 });
    await page.goto("/walk-in/");

    const heroImage = page.locator('img[src="/images/medical/walk-in-care-consultation.png"]');
    await expect(heroImage).toBeVisible();

    const layout = await heroImage.evaluate((image) => {
      const rect = image.getBoundingClientRect();
      const parent = image.parentElement?.getBoundingClientRect();

      return {
        imageLeft: rect.left,
        imageRight: rect.right,
        imageWidth: rect.width,
        parentLeft: parent?.left ?? 0,
        parentRight: parent?.right ?? 0,
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      };
    });

    expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth + 1);
    expect(layout.imageLeft).toBeGreaterThanOrEqual(layout.parentLeft - 1);
    expect(layout.imageRight).toBeLessThanOrEqual(layout.parentRight + 1);
    expect(layout.imageWidth).toBeLessThanOrEqual(layout.clientWidth);
  });
});
