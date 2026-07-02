import { expect, test } from "@playwright/test";

const innerPages = [
  "/services/",
  "/services/walk-in-care/",
  "/services/family-medicine/",
  "/family-doctor/",
  "/locations/",
  "/faq/",
  "/contact/",
  "/register/",
  "/register-bev/",
  "/register-balwin/",
  "/thank-you/",
];

const legacyMovedPages = [
  {
    path: "/family-doctors-accepting-new-patients-edmonton/",
    target: "/family-doctor/",
  },
  {
    path: "/walk-in-clinic-edmonton/",
    target: "/walk-in/",
  },
  {
    path: "/patient-registration/",
    target: "/register/",
  },
  {
    path: "/doctors/dr-kingsley-lasing/",
    target: "/family-doctor/",
  },
];

const forbiddenVisibleCopy = [
  "Famous Mobile",
  "EdmontonMDs",
  "EdmontonMds",
  "Repair Services",
  "phone repair",
  "Capilano Mall",
  "screen replacement",
  "battery replacement",
  "device repair",
];

const onBookingSubmissionsUrl = "https://api.onbooking.ca/v1/submissions";
const onBookingRegistrationFormId = "a8560735-5edd-443a-beba-990bd08cc8d3";

async function fillRegisterFunnel(page: import("@playwright/test").Page) {
  await page.locator('input[name="name"]').fill("Playwright Test Patient");
  await page.locator('input[name="phone"]').fill("(780) 555-0199");
  await page
    .locator('input[name="email"]')
    .fill("edmonton.doctor.test+playwright@example.com");
  await page
    .locator('input[name="availability"]')
    .fill("Automated Playwright test - no action needed");
  await page
    .locator('textarea[name="message"]')
    .fill("TEST LEAD: automated mocked submission from Playwright.");
  await page.locator('input[name="consent"]').check();
}

test.describe("inner medical page system", () => {
  for (const path of innerPages) {
    test(`${path} uses shared medical layout without legacy copy`, async ({
      page,
    }) => {
      await page.goto(path);

      await expect(page.locator("main.medical-page")).toHaveCount(1);
      await expect(page.locator('nav[aria-label="Breadcrumb"]')).toHaveCount(0);

      const bodyText = await page.locator("body").innerText();
      for (const text of forbiddenVisibleCopy) {
        expect(bodyText).not.toContain(text);
      }

      const noHorizontalScroll = await page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth + 1,
      );
      expect(noHorizontalScroll).toBe(true);
    });
  }

  test("inner pages stay stable at 375px mobile width", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 900 });

    for (const path of innerPages) {
      await page.goto(path);

      const layout = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        heroImages: Array.from(
          document.querySelectorAll<HTMLImageElement>(".medical-hero-image"),
        ).map((image) => {
          const rect = image.getBoundingClientRect();
          const parent = image.parentElement?.getBoundingClientRect();

          return {
            width: rect.width,
            left: rect.left,
            right: rect.right,
            parentLeft: parent?.left ?? 0,
            parentRight: parent?.right ?? 0,
          };
        }),
      }));

      expect(layout.scrollWidth, `${path} should not overflow`).toBeLessThanOrEqual(
        layout.clientWidth + 1,
      );
      for (const image of layout.heroImages) {
        expect(image.width, `${path} hero image width`).toBeLessThanOrEqual(
          layout.clientWidth,
        );
        expect(image.left, `${path} hero image left`).toBeGreaterThanOrEqual(
          image.parentLeft - 1,
        );
        expect(image.right, `${path} hero image right`).toBeLessThanOrEqual(
          image.parentRight + 1,
        );
      }
    }
  });

  test("family doctor page shows one doctor list with large portrait images", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1200 });
    await page.goto("/family-doctor/");

    await expect(
      page.getByRole("heading", { name: "Family Doctors In Edmonton" }),
    ).toBeVisible();
    await expect(page.getByText("Beverly Medical Doctors")).toHaveCount(0);
    await expect(page.getByText("Balwin Medical Clinic Doctors")).toHaveCount(0);
    await expect(page.locator('[data-testid="doctor-clinic-group"]')).toHaveCount(0);

    for (const doctor of [
      "Dr. Kingsley",
      "Dr. Nosa",
      "Dr. Asim Bilal",
      "Dr. Olatayo Idowu-Araade",
      "Dr. Sameer Sardesai",
      "Dr. Rahul Chaturvedi",
    ]) {
      await expect(page.getByRole("heading", { name: doctor })).toBeVisible();
    }

    await expect(page.locator('[data-testid="doctor-card"]')).toHaveCount(6);
    await expect(page.locator('[data-testid="doctor-media"]')).toHaveCount(6);
    await expect(page.locator('[data-testid="doctor-image"]')).toHaveCount(6);
    await expect(page.locator('[data-testid="doctor-placeholder"]')).toHaveCount(0);
    await expect(page.locator('[data-testid="doctor-list"]')).toBeVisible();

    await expect
      .poll(async () =>
        page.locator('[data-testid="doctor-image"]').evaluateAll((images) =>
          images.every((image) => {
            const img = image as HTMLImageElement;

            return img.complete && img.naturalWidth > 0 && img.naturalHeight > 0;
          }),
        ),
      )
      .toBe(true);

    const imageStyles = await page
      .locator('[data-testid="doctor-image"]')
      .evaluateAll((images) =>
        images.map((image) => {
          const img = image as HTMLImageElement;
          const styles = getComputedStyle(img);

          return {
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
            objectFit: styles.objectFit,
          };
        }),
      );

    for (const image of imageStyles) {
      expect(image.naturalWidth).toBeGreaterThan(0);
      expect(image.naturalHeight).toBeGreaterThan(0);
      expect(image.objectFit).toBe("cover");
    }

    const layout = await page
      .locator('[data-testid="doctor-card"]')
      .evaluateAll((cards) =>
        cards.map((card) => {
          const rect = card.getBoundingClientRect();
          const image = card.querySelector<HTMLElement>(
            '[data-testid="doctor-media"]',
          );
          const imageRect = image?.getBoundingClientRect();

          return {
            cardLeft: rect.left,
            cardRight: rect.right,
            imageLeft: imageRect?.left ?? 0,
            imageRight: imageRect?.right ?? 0,
            top: rect.top,
            imageHeight: imageRect?.height ?? 0,
            imageWidth: imageRect?.width ?? 0,
            layout: card.getAttribute("data-layout"),
          };
        }),
      );

    for (let index = 1; index < layout.length; index += 1) {
      expect(layout[index].top).toBeGreaterThan(layout[index - 1].top + 20);
    }

    for (const card of layout) {
      expect(card.imageWidth).toBeGreaterThanOrEqual(285);
      expect(card.imageHeight).toBeGreaterThanOrEqual(360);
    }

    expect(layout[0].layout).toBe("image-left");
    expect(layout[1].layout).toBe("image-right");
    expect(layout[0].imageLeft).toBeLessThan(layout[0].cardLeft + 45);
    expect(layout[1].imageRight).toBeGreaterThan(layout[1].cardRight - 45);

    await expect(page.getByRole("link", { name: "Book Appointment" })).toHaveCount(6);
    await expect(
      page
        .locator('[data-testid="doctor-card"][data-location="beverly-medical-center"]')
        .locator('a[href="https://cloud.healthquest.ca:45254/onlinebooking"]'),
    ).toHaveCount(2);
    await expect(
      page
        .locator('[data-testid="doctor-card"][data-location="balwin-medical-centre"]')
        .locator('a[href="https://qstb8.healthquest.ca:3000/onlinebooking"]'),
    ).toHaveCount(4);
    await expect(
      page
        .locator('[data-testid="doctor-card"]')
        .locator('a[href="/register-bev/"], a[href="/register-balwin/"]'),
    ).toHaveCount(0);
    await expect(
      page
        .locator('[data-testid="doctor-card"][data-status="not-accepting"]')
        .getByText("Not Accepting New Patients"),
    ).toBeVisible();
    await expect(
      page
        .locator('[data-testid="doctor-card"][data-status="not-accepting"]')
        .locator('a[href="https://qstb8.healthquest.ca:3000/onlinebooking"]'),
    ).toHaveCount(1);
  });

  test("register page uses a doctor-selection funnel", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1100 });
    await page.goto("/register/");

    await expect(
      page.getByRole("heading", {
        name: "Choose Your Edmonton Doctor",
        exact: true,
      }),
    ).toBeVisible();
    await expect(page.getByText("Registration Notes")).toHaveCount(0);
    await expect(page.getByText("Minimal Lead Form Only")).toHaveCount(0);

    const doctorCards = page.locator('[data-testid="register-doctor-card"]');
    await expect(doctorCards).toHaveCount(6);
    await expect(page.locator('[data-testid="register-doctor-image"]')).toHaveCount(6);

    const portraitSources = await page
      .locator('[data-testid="register-doctor-image"]')
      .evaluateAll((images) =>
        images.map((image) => (image as HTMLImageElement).currentSrc),
      );
    expect(new Set(portraitSources).size).toBe(6);

    await doctorCards.filter({ hasText: "Dr. Asim Bilal" }).click();
    await expect(page.locator('input[name="preferredDoctor"]')).toHaveValue(
      "Dr. Asim Bilal",
    );
    await expect(page.locator('input[name="preferredDoctorSlug"]')).toHaveValue(
      "dr-asim-bilal",
    );
    await expect(page.locator('input[name="preferredLocation"]')).toHaveValue(
      "balwin-medical-centre",
    );
    await expect(page.locator('input[name="preferredLocationName"]')).toHaveValue(
      "Balwin Medical Centre",
    );
    await expect(page.locator('input[name="bookingHref"]')).toHaveValue(
      "https://qstb8.healthquest.ca:3000/onlinebooking",
    );

    await doctorCards.filter({ hasText: "Dr. Nosa" }).click();
    await expect(page.locator('input[name="preferredDoctor"]')).toHaveValue(
      "Dr. Nosa",
    );
    await expect(page.locator('input[name="preferredLocation"]')).toHaveValue(
      "beverly-medical-center",
    );
    await expect(page.locator('input[name="bookingHref"]')).toHaveValue(
      "https://cloud.healthquest.ca:45254/onlinebooking",
    );

    const noHorizontalScroll = await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth + 1,
    );
    expect(noHorizontalScroll).toBe(true);
  });

  test("register funnel stays stable across mobile and wide widths", async ({
    page,
  }) => {
    for (const width of [375, 390, 1440, 1680]) {
      await page.setViewportSize({ width, height: 1200 });
      await page.goto("/register/");

      const layout = await page.evaluate(() => {
        const heading = document.querySelector("h1")?.getBoundingClientRect();
        const heroVisual = document
          .querySelector('[aria-label="Edmonton doctor portraits"]')
          ?.getBoundingClientRect();
        const cards = Array.from(
          document.querySelectorAll('[data-testid="register-doctor-card"]'),
        ).map((card) => card.getBoundingClientRect());

        const intersects =
          heading && heroVisual
            ? !(
                heading.right <= heroVisual.left ||
                heading.left >= heroVisual.right ||
                heading.bottom <= heroVisual.top ||
                heading.top >= heroVisual.bottom
              )
            : false;

        return {
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
          heroTextOverlapsVisual: intersects,
          cardWidths: cards.map((card) => card.width),
        };
      });

      expect(layout.scrollWidth, `${width}px should not overflow`).toBeLessThanOrEqual(
        layout.clientWidth + 1,
      );
      expect(layout.heroTextOverlapsVisual, `${width}px hero overlap`).toBe(false);
      for (const cardWidth of layout.cardWidths) {
        expect(cardWidth, `${width}px doctor card width`).toBeGreaterThan(0);
        expect(cardWidth, `${width}px doctor card width`).toBeLessThanOrEqual(
          layout.clientWidth,
        );
      }
    }
  });

  test("location-specific registration routes preselect the clinic", async ({
    page,
  }) => {
    await page.goto("/register-bev/");
    await expect(page.locator('input[name="preferredLocation"]')).toHaveValue(
      "beverly-medical-center",
    );
    await expect(page.locator('input[name="bookingHref"]')).toHaveValue(
      "https://cloud.healthquest.ca:45254/onlinebooking",
    );

    await page.goto("/register-balwin/");
    await expect(page.locator('input[name="preferredLocation"]')).toHaveValue(
      "balwin-medical-centre",
    );
    await expect(page.locator('input[name="bookingHref"]')).toHaveValue(
      "https://qstb8.healthquest.ca:3000/onlinebooking",
    );
  });

  test("register funnel submits Balwin doctor payload to OnBooking and redirects", async ({
    page,
  }) => {
    let payload: Record<string, any> | null = null;

    await page.route(onBookingSubmissionsUrl, async (route) => {
      payload = route.request().postDataJSON();
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ submissionId: "playwright-balwin-test" }),
      });
    });

    await page.goto("/register/");
    await page
      .locator('[data-testid="register-doctor-card"]')
      .filter({ hasText: "Dr. Asim Bilal" })
      .click();
    await fillRegisterFunnel(page);

    await Promise.all([
      page.waitForURL("**/thank-you/"),
      page.getByRole("button", { name: "Send Request" }).click(),
    ]);

    expect(payload).toMatchObject({
      siteId: "edmontondoctors",
      formId: onBookingRegistrationFormId,
      name: "Playwright Test Patient",
      phone: "(780) 555-0199",
      email: "edmonton.doctor.test+playwright@example.com",
      preferredDoctor: "Dr. Asim Bilal",
      preferredDoctorFullName: "Dr. Asim Bilal, MD",
      preferredDoctorSlug: "dr-asim-bilal",
      preferredLocation: "balwin-medical-centre",
      preferredLocationName: "Balwin Medical Centre",
      bookingHref: "https://qstb8.healthquest.ca:3000/onlinebooking",
    });
    expect(payload?.fields).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "preferred_doctor",
          value: "Dr. Asim Bilal",
        }),
        expect.objectContaining({
          id: "preferred_location",
          value: "Balwin Medical Centre",
        }),
        expect.objectContaining({
          id: "booking_href",
          value: "https://qstb8.healthquest.ca:3000/onlinebooking",
        }),
      ]),
    );
  });

  test("register funnel submits Beverly doctor payload to OnBooking and redirects", async ({
    page,
  }) => {
    let payload: Record<string, any> | null = null;

    await page.route(onBookingSubmissionsUrl, async (route) => {
      payload = route.request().postDataJSON();
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({ ok: true, submissionId: "playwright-beverly-test" }),
      });
    });

    await page.goto("/register/");
    await page
      .locator('[data-testid="register-doctor-card"]')
      .filter({ hasText: "Dr. Nosa" })
      .click();
    await fillRegisterFunnel(page);

    await Promise.all([
      page.waitForURL("**/thank-you/"),
      page.getByRole("button", { name: "Send Request" }).click(),
    ]);

    expect(payload).toMatchObject({
      siteId: "edmontondoctors",
      formId: onBookingRegistrationFormId,
      preferredDoctor: "Dr. Nosa",
      preferredDoctorSlug: "dr-nosa",
      preferredLocation: "beverly-medical-center",
      preferredLocationName: "Beverly Medical Center & Walk-In",
      bookingHref: "https://cloud.healthquest.ca:45254/onlinebooking",
    });
  });

  test("register funnel shows readable error when OnBooking rejects the request", async ({
    page,
  }) => {
    await page.route(onBookingSubmissionsUrl, async (route) => {
      await route.fulfill({
        status: 422,
        contentType: "application/json",
        body: JSON.stringify({
          ok: false,
          message: "Test rejection from OnBooking.",
        }),
      });
    });

    await page.goto("/register/");
    await fillRegisterFunnel(page);
    await page.getByRole("button", { name: "Send Request" }).click();

    await expect(page.getByRole("status")).toContainText(
      "Test rejection from OnBooking.",
    );
    await expect(page).toHaveURL(/\/register\/$/);
  });

  test("legacy long URLs render moved pages pointing to short routes", async ({
    page,
  }) => {
    for (const legacyPage of legacyMovedPages) {
      await page.goto(legacyPage.path);
      await expect(page.getByText("Page Moved")).toBeVisible();
      await expect(
        page
          .locator("main")
          .locator(`a[href="${legacyPage.target}"]`)
          .first(),
      ).toBeVisible();
    }
  });
});
