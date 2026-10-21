import { expect, test, type Page } from "@playwright/test";

const discoverablePages = [
  "/family-doctor/",
  "/doctors/dr-kingsley-lasing/",
  "/locations/beverly-medical-center/",
  "/locations/balwin-medical-centre/",
];

for (const path of discoverablePages) {
  test(`${path} is indexable, canonical, linked, and in the sitemap`, async ({
    page,
    request,
  }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("main h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://edmonton.doctor${path}`,
    );
    const robots = page.locator('meta[name="robots"]');
    expect(
      (await robots.count()) ? await robots.getAttribute("content") : "",
    ).not.toContain("noindex");
    const sitemap = await request.get("/sitemap.xml");
    expect(await sitemap.text()).toContain(`https://edmonton.doctor${path}`);
    const jsonLd = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const nodes = jsonLd.flatMap((text) => {
      const value = JSON.parse(text);
      return value["@graph"] || [value];
    });
    const webPage = nodes.find((node) => node["@type"] === "WebPage");
    expect(
      nodes.find((node) => node["@id"] === webPage.breadcrumb["@id"]),
    ).toBeTruthy();
    await page.goto(
      path.includes("/doctors/") ? "/family-doctor/" : "/locations/",
    );
    if (path !== "/family-doctor/")
      await expect(
        page.locator(`main a[href="${path}"]`).first(),
      ).toBeVisible();
  });
}

test("clinic pages route patients to the correct clinic", async ({ page }) => {
  for (const [path, phone, registration, doctor] of [
    [
      "/locations/beverly-medical-center/",
      "tel:+17805221236",
      "/register-bev/",
      "Dr. Kingsley Lasing",
    ],
    [
      "/locations/balwin-medical-centre/",
      "tel:+15874151251",
      "/register-balwin/",
      "Dr. Asim Bilal, MD",
    ],
  ]) {
    await page.goto(path);
    await expect(page.locator(`main a[href="${phone}"]`).first()).toBeVisible();
    await expect(
      page.locator(`main a[href="${registration}"]`).first(),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: doctor, exact: true }),
    ).toBeVisible();
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth + 1,
    );
    expect(overflow).toBe(false);
  }
});

test("homepage serves responsive compressed images without direct duplicate GA configuration", async ({
  page,
  request,
}) => {
  await page.goto("/");
  const hero = page.locator('[data-testid="home-hero-media"] img');
  await expect(hero).toHaveAttribute("srcset", /640w.*1280w/);
  await expect(hero).toHaveAttribute("width", /\d+/);
  const src = await hero.getAttribute("src");
  const image = await request.get(src!);
  expect((await image.body()).length).toBeLessThan(100_000);
  expect((await page.content()).includes("gtag('config'")).toBe(false);
  expect(await page.locator('script[src*="gtag/js"]').count()).toBe(0);
});

async function mockAnalytics(page: Page) {
  await page.addInitScript(() => {
    const target = window as unknown as Window & {
      gtag: (...args: unknown[]) => void;
      clinicEvents: unknown[][];
    };
    target.clinicEvents = [];
    target.gtag = (...args) => target.clinicEvents.push(args);
  });
}

test("successful registration records one aggregate lead; rejected submissions record none", async ({
  page,
}) => {
  await mockAnalytics(page);
  let accepted = false;
  await page.route(
    "https://api.onbooking.ca/v1/submissions/**",
    async (route) => {
      await route.fulfill({
        status: accepted ? 201 : 422,
        contentType: "application/json",
        body: JSON.stringify(
          accepted ? { ok: true } : { ok: false, message: "Test rejection" },
        ),
      });
    },
  );
  await page.goto("/register-bev/?utm_source=seo-test");
  await page.locator('input[name="name"]').fill("Test Patient");
  await page.locator('input[name="phone"]').fill("7805550199");
  await page.locator('input[name="email"]').fill("test@example.com");
  await page.locator('input[name="consent"]').check();
  await page.getByRole("button", { name: "Send Request", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("Test rejection");
  expect(
    await page.evaluate(
      () => (window as unknown as Window & { clinicEvents: unknown[] }).clinicEvents,
    ),
  ).toEqual([]);
  accepted = true;
  await page.getByRole("button", { name: "Send Request", exact: true }).click();
  await page.waitForURL("**/thank-you/");
  const events = await page.evaluate(
    () => (window as unknown as Window & { clinicEvents: unknown[][] }).clinicEvents,
  );
  expect(events.filter((event) => event[1] === "generate_lead")).toHaveLength(
    1,
  );
  const payload = JSON.stringify(events);
  for (const privateValue of [
    "Test Patient",
    "7805550199",
    "test@example.com",
    "dr-kingsley",
    "utm_source",
  ])
    expect(payload).not.toContain(privateValue);
});
