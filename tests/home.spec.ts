import { expect, test } from "@playwright/test";

const forbiddenVisibleCopy = [
  "Famous Mobile",
  "EdmontonMDs",
  "EdmontonMds",
  "Repair Services",
  "phone repair",
  "Capilano Mall",
];

test.describe("homepage review", () => {
  test("renders core homepage content and local medical images", async ({
    baseURL,
    page,
    request,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await expect(
      page.getByRole("heading", {
        name: "Family Doctors Now Accepting New Patients in Edmonton",
      }),
    ).toBeVisible();
    await expect(
      page.locator("#home").getByText("Register Now, No Waitlist"),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Getting Care Is Simple" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Common Questions Before You Register",
      }),
    ).toBeVisible();

    await expect(page.locator("#process")).toContainText("Easy As 1-2-3");
    await expect(page.locator("#process img")).toHaveCount(0);
    await expect(page.locator("#faq")).toContainText(
      "Do you collect health card numbers online?",
    );

    const locations = page.locator("#locations");
    await expect(
      locations.getByRole("heading", {
        name: "Beverly Medical Center & Walk-In",
      }),
    ).toBeVisible();
    await expect(
      locations.getByRole("heading", {
        name: "Balwin Medical Centre",
      }),
    ).toBeVisible();
    await expect(
      locations.getByRole("heading", { name: "Dr Kingsley Lasing MD" }),
    ).toHaveCount(0);
    await expect(
      locations.locator('[data-testid="clinic-location-card"]'),
    ).toHaveCount(2);
    await expect(
      page.getByRole("heading", {
        name: "Choose The Clinic That Works For You",
      }),
    ).toBeVisible();
    await expect(page.locator('[data-testid="home-locations-description"]')).toContainText(
      "Compare the Edmonton locations below and choose the clinic that is closest or easiest for your schedule.",
    );

    const registrationLinks = page.locator('a[href="/register/"]');
    expect(await registrationLinks.count()).toBeGreaterThan(0);

    const heroImage = page.locator('#home img[src^="/images/medical/"]').first();
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

    const imageSources = await page
      .locator('img[src^="/images/medical/"]')
      .evaluateAll((images) =>
        Array.from(
          new Set(
            images
              .map((image) => image.getAttribute("src"))
              .filter((src): src is string => Boolean(src)),
          ),
        ),
      );
    expect(imageSources.length).toBeGreaterThan(0);

    for (const src of imageSources) {
      const response = await request.get(new URL(src, baseURL).toString());
      expect(response.status(), `${src} should resolve`).toBeLessThan(400);
    }

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

  test("homepage location cards use compact display details", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const locations = page.locator("#locations");
    await expect(
      locations.getByRole("heading", {
        exact: true,
        name: "Balwin Medical Centre",
      }),
    ).toBeVisible();
    await expect(
      locations.getByRole("heading", {
        name: "Balwin Medical Centre & Walk in Clinic",
      }),
    ).toHaveCount(0);

    await expect(
      locations.locator('[data-testid="clinic-location-phone"]'),
    ).toHaveCount(0);
    await expect(locations).not.toContainText("(780) 522-1236");
    await expect(locations).not.toContainText("(587) 415-1251");

    await expect(
      locations.getByText("3347 118 Ave NW, Edmonton").first(),
    ).toBeVisible();
    await expect(
      locations.getByText("8103 127 Ave NW #17, Edmonton"),
    ).toBeVisible();
    await expect(locations).not.toContainText("AB T5W");
    await expect(locations).not.toContainText("AB T5C");

    const addressMetrics = await page
      .locator('#locations [data-testid="clinic-location-address"] p')
      .evaluateAll((addresses) =>
        addresses.map((address) => {
          const rect = address.getBoundingClientRect();
          const style = getComputedStyle(address);

          return {
            height: rect.height,
            lineHeight: Number.parseFloat(style.lineHeight),
          };
        }),
      );

    for (const address of addressMetrics) {
      expect(address.height).toBeLessThanOrEqual(address.lineHeight * 1.25);
    }

    const descriptionMetrics = await page
      .locator('#locations [data-testid="clinic-location-description"]')
      .evaluateAll((descriptions) =>
        descriptions.map((description) => {
          const rect = description.getBoundingClientRect();
          const style = getComputedStyle(description);

          return {
            height: rect.height,
            lineHeight: Number.parseFloat(style.lineHeight),
          };
        }),
      );

    for (const description of descriptionMetrics) {
      expect(description.height).toBeLessThanOrEqual(
        description.lineHeight * 2.25,
      );
    }
  });

  for (const width of [375, 390]) {
    test(`homepage is mobile stable at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 950 });
      await page.goto("/", { waitUntil: "domcontentloaded" });

      await expect(
        page.getByRole("heading", {
          name: "Family Doctors Now Accepting New Patients in Edmonton",
        }),
      ).toBeVisible();

      const heroImage = page.locator('#home img[src^="/images/medical/"]').first();
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

      await expect(
        page.locator('[data-testid="process-sticky-graphic"]'),
      ).toHaveCount(0);
    });
  }

  test("hero layout stays compact and readable across QA widths", async ({
    page,
  }) => {
    const viewports = [
      {
        name: "wide desktop",
        size: { width: 1820, height: 950 },
        maxHeroHeight: 900,
        maxTitleHeight: 310,
      },
      {
        name: "desktop",
        size: { width: 1440, height: 1000 },
        maxHeroHeight: 900,
        maxTitleHeight: 310,
      },
      {
        name: "mobile",
        size: { width: 390, height: 900 },
        maxHeroHeight: 980,
        maxTitleHeight: 180,
      },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport.size);
      await page.goto("/", { waitUntil: "domcontentloaded" });

      const metrics = await page.evaluate(() => {
        const rectFor = (selector: string) => {
          const element = document.querySelector(selector);
          if (!element) return null;
          const rect = element.getBoundingClientRect();

          return {
            left: rect.left,
            right: rect.right,
            top: rect.top,
            bottom: rect.bottom,
            width: rect.width,
            height: rect.height,
          };
        };

        const title = rectFor('[data-testid="home-hero-title"]');
        const image = rectFor('[data-testid="home-hero-media"]');
        const titleLines = Array.from(
          document.querySelectorAll('[data-testid="home-hero-title"] span'),
        ).map((line) => {
          const rect = line.getBoundingClientRect();

          return {
            left: rect.left,
            right: rect.right,
            top: rect.top,
            bottom: rect.bottom,
            width: rect.width,
            text: line.textContent?.trim(),
          };
        });

        const titleImageOverlap =
          title && image
            ? !(
                title.right <= image.left ||
                image.right <= title.left ||
                title.bottom <= image.top ||
                image.bottom <= title.top
              )
            : false;

        return {
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
          hero: rectFor('[data-testid="home-hero"]'),
          title,
          titleLines,
          image,
          titleImageOverlap,
        };
      });

      expect(
        metrics.scrollWidth,
        `${viewport.name} should not overflow horizontally`,
      ).toBeLessThanOrEqual(metrics.clientWidth + 1);
      expect(
        metrics.hero?.height,
        `${viewport.name} hero should not become a giant blank block`,
      ).toBeLessThanOrEqual(viewport.maxHeroHeight);
      expect(
        metrics.title?.height,
        `${viewport.name} title should stay readable`,
      ).toBeLessThanOrEqual(viewport.maxTitleHeight);
      expect(
        metrics.titleImageOverlap,
        `${viewport.name} title and image should not overlap`,
      ).toBe(false);
      if (viewport.size.width >= 1024) {
        for (const line of metrics.titleLines) {
          expect(
            line.right,
            `${viewport.name} hero title line "${line.text}" should not enter image column`,
          ).toBeLessThanOrEqual((metrics.image?.left ?? 0) - 8);
        }
      }
      expect(
        metrics.image?.right,
        `${viewport.name} hero image should fit viewport`,
      ).toBeLessThanOrEqual(metrics.clientWidth + 1);
    }
  });

  test("hero and FAQ text never overlap adjacent content", async ({ page }) => {
    for (const viewport of [
      { name: "wide desktop", width: 1820, height: 950 },
      { name: "desktop", width: 1440, height: 1000 },
      { name: "laptop", width: 1280, height: 900 },
      { name: "tablet", width: 1024, height: 900 },
      { name: "mobile", width: 390, height: 900 },
    ]) {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto("/", { waitUntil: "domcontentloaded" });

      const overlaps = await page.evaluate(() => {
        const intersects = (a: DOMRect, b: DOMRect) =>
          !(
            a.right <= b.left ||
            b.right <= a.left ||
            a.bottom <= b.top ||
            b.bottom <= a.top
          );

        const issues: string[] = [];
        const heroImage = document
          .querySelector('[data-testid="home-hero-media"]')
          ?.getBoundingClientRect();

        if (heroImage) {
          document
            .querySelectorAll('[data-testid="home-hero-title"] span')
            .forEach((line) => {
              const rect = line.getBoundingClientRect();
              if (intersects(rect, heroImage)) {
                issues.push(`hero:${line.textContent?.trim()}`);
              }
            });
        }

        const faqList = document
          .querySelector('#faq [data-testid="faq-item"]')
          ?.parentElement?.getBoundingClientRect();

        if (faqList) {
          document.querySelectorAll('#faq h2 span').forEach((line) => {
            const rect = line.getBoundingClientRect();
            if (intersects(rect, faqList)) {
              issues.push(`faq:${line.textContent?.trim()}`);
            }
          });
        }

        return issues;
      });

      expect(overlaps, `${viewport.name} should not have text overlap`).toEqual(
        [],
      );
    }
  });

  test("FAQ accordions and process badges are aligned", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await expect(page.locator('[data-testid="process-timeline"]')).toBeVisible();
    await expect(
      page.locator('[data-testid="process-sticky-graphic"]'),
    ).toHaveCount(0);
    await expect(
      page.locator('[data-testid="process-active-number"]'),
    ).toHaveCount(0);

    const processBadges = await page
      .locator('[data-testid="home-process-marker"]')
      .evaluateAll((badges) =>
        badges.map((badge) => {
          const rect = badge.getBoundingClientRect();
          const style = getComputedStyle(badge);

          return {
            active: badge
              .closest('[data-testid="home-process-step"]')
              ?.getAttribute("data-active"),
            text: badge.textContent?.trim(),
            width: rect.width,
            height: rect.height,
            color: style.color,
            background: style.backgroundColor,
          };
        }),
      );

      expect(processBadges.map((badge) => badge.text)).toEqual(["1", "2", "3"]);
      for (const badge of processBadges) {
        expect(badge.width).toBeGreaterThanOrEqual(40);
        expect(badge.height).toBeGreaterThanOrEqual(40);
      if (badge.active === "true") {
        expect(badge.color).toBe("rgb(255, 255, 255)");
      } else {
        expect(badge.color).toBe("rgb(17, 94, 89)");
      }
        expect(badge.background).not.toBe("rgba(0, 0, 0, 0)");
      }

    const faqIconAlignment = await page
      .locator('[data-testid="faq-item"]')
      .evaluateAll((items) =>
        items.map((item) => {
          const row = item.getBoundingClientRect();
          const icon = item
            .querySelector('[data-testid="faq-icon"]')
            ?.getBoundingClientRect();

          return icon
            ? {
                iconGapToRight: row.right - icon.right,
                iconWidth: icon.width,
              }
            : null;
        }),
      );

    expect(faqIconAlignment).toHaveLength(5);
    for (const item of faqIconAlignment) {
      expect(item).not.toBeNull();
      expect(item!.iconGapToRight).toBeGreaterThanOrEqual(12);
      expect(item!.iconGapToRight).toBeLessThanOrEqual(24);
      expect(item!.iconWidth).toBeGreaterThanOrEqual(32);
    }
  });

  test("process timeline follows the active scrolled step", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const processSteps = page.locator('[data-testid="home-process-step"]');

    await expect(processSteps).toHaveCount(3);
    await expect(page.locator("#process img")).toHaveCount(0);
    await expect(
      page.locator('[data-testid="process-sticky-graphic"]'),
    ).toHaveCount(0);
    await expect(
      page.locator('[data-testid="process-active-number"]'),
    ).toHaveCount(0);
    await expect(
      page.locator('#process a[href="/register/"]'),
    ).toBeVisible();

    for (const index of [0, 1, 2]) {
      await processSteps.nth(index).evaluate((element) => {
        element.scrollIntoView({ block: "center" });
      });

      await expect
        .poll(
          () => processSteps.nth(index).getAttribute("data-active"),
          {
          message: `step ${index + 1} should become active`,
          },
        )
        .toBe("true");
    }
  });

  test("locations heading uses two clean non-orphan lines", async ({ page }) => {
    for (const viewport of [
      { name: "desktop", width: 1440, height: 1000 },
      { name: "tablet", width: 768, height: 950 },
      { name: "mobile", width: 390, height: 900 },
      { name: "narrow mobile", width: 375, height: 900 },
    ]) {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto("/", { waitUntil: "domcontentloaded" });

      await expect(
        page.getByRole("heading", {
          name: "Choose The Clinic That Works For You",
        }),
      ).toBeVisible();

      const lineMetrics = await page
        .locator('[data-testid="home-locations-heading-line"]')
        .evaluateAll((lines) =>
          lines.map((line) => {
            const rect = line.getBoundingClientRect();
            const style = getComputedStyle(line);

            return {
              text: line.textContent?.trim(),
              height: rect.height,
              lineHeight: Number.parseFloat(style.lineHeight),
              right: rect.right,
              clientWidth: document.documentElement.clientWidth,
            };
          }),
        );

      expect(lineMetrics.map((line) => line.text)).toEqual([
        "Choose The Clinic",
        "That Works For You",
      ]);

      for (const line of lineMetrics) {
        expect(
          line.height,
          `${viewport.name} heading line should not wrap internally`,
        ).toBeLessThanOrEqual(line.lineHeight * 1.2);
        expect(
          line.right,
          `${viewport.name} heading line should fit viewport`,
        ).toBeLessThanOrEqual(line.clientWidth + 1);
      }
    }
  });

  test("homepage section headings avoid orphan words", async ({ page }) => {
    for (const viewport of [
      { name: "desktop", width: 1440, height: 1000 },
      { name: "tablet", width: 768, height: 950 },
      { name: "mobile", width: 390, height: 900 },
      { name: "small mobile", width: 375, height: 900 },
      { name: "narrow mobile", width: 320, height: 900 },
    ]) {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto("/", { waitUntil: "domcontentloaded" });

      const headingLines = await page.evaluate(() => {
        const headings = Array.from(
          document.querySelectorAll<HTMLElement>("main h1, main h2"),
        ).filter((heading) => {
          const rect = heading.getBoundingClientRect();
          const style = getComputedStyle(heading);

          return (
            rect.width > 0 &&
            rect.height > 0 &&
            style.visibility !== "hidden" &&
            style.display !== "none"
          );
        });

        const getWords = (heading: HTMLElement) => {
          const walker = document.createTreeWalker(
            heading,
            NodeFilter.SHOW_TEXT,
          );
          const words: Array<{ text: string; top: number }> = [];

          while (walker.nextNode()) {
            const node = walker.currentNode as Text;
            const value = node.textContent ?? "";
            const matches = Array.from(value.matchAll(/\S+/g));

            for (const match of matches) {
              const start = match.index ?? 0;
              const range = document.createRange();
              range.setStart(node, start);
              range.setEnd(node, start + match[0].length);
              const rect = Array.from(range.getClientRects()).find(
                (item) => item.width > 0 && item.height > 0,
              );
              range.detach();

              if (rect) {
                words.push({ text: match[0], top: rect.top });
              }
            }
          }

          return words;
        };

        return headings.flatMap((heading) => {
          const words = getWords(heading).sort((a, b) => a.top - b.top);
          const lines: Array<{ top: number; words: string[] }> = [];

          for (const word of words) {
            const existing = lines.find((line) => Math.abs(line.top - word.top) < 3);

            if (existing) {
              existing.words.push(word.text);
            } else {
              lines.push({ top: word.top, words: [word.text] });
            }
          }

          return lines.map((line) => ({
            heading:
              heading.getAttribute("aria-label") || heading.textContent?.trim() || "",
            words: line.words,
          }));
        });
      });

      const orphanLines = headingLines.filter((line) => line.words.length === 1);
      expect(
        orphanLines,
        `${viewport.name} should not have one-word H1/H2 lines`,
      ).toEqual([]);

      const noHorizontalScroll = await page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth + 1,
      );
      expect(
        noHorizontalScroll,
        `${viewport.name} should not overflow horizontally`,
      ).toBe(true);
    }
  });

  test("final CTA band has balanced vertical spacing and no doctor orphan", async ({
    page,
  }) => {
    for (const viewport of [
      { name: "desktop", width: 1440, height: 1000 },
      { name: "mobile", width: 390, height: 900 },
      { name: "narrow mobile", width: 320, height: 900 },
    ]) {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto("/", { waitUntil: "domcontentloaded" });

      await expect(
        page.getByRole("heading", {
          name: "Take The Next Step Toward Your Family Doctor",
        }),
      ).toBeVisible();

      const spacing = await page.evaluate(() => {
        const section = document.querySelector("#register");
        const band = document.querySelector("#register .medical-cta-band");

        if (!section || !band) return null;

        const sectionRect = section.getBoundingClientRect();
        const bandRect = band.getBoundingClientRect();

        return {
          top: bandRect.top - sectionRect.top,
          bottom: sectionRect.bottom - bandRect.bottom,
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        };
      });

      expect(spacing).not.toBeNull();
      expect(spacing!.top, `${viewport.name} CTA top padding`).toBeGreaterThanOrEqual(
        44,
      );
      expect(
        Math.abs(spacing!.top - spacing!.bottom),
        `${viewport.name} CTA top/bottom padding should feel balanced`,
      ).toBeLessThanOrEqual(18);
      expect(spacing!.scrollWidth).toBeLessThanOrEqual(spacing!.clientWidth + 1);
    }
  });

  test("doctor section uses premium styling and Cloudinary portrait", async ({
    page,
  }) => {
    const cloudinaryPortraitAsset = "EdmontonDoctors/lasing_kingely.jpg";

    for (const viewport of [
      { name: "desktop", width: 1440, height: 1000, maxTitleSize: 56 },
      { name: "mobile", width: 390, height: 900, maxTitleSize: 44 },
    ]) {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto("/", { waitUntil: "domcontentloaded" });

      await expect(
        page.getByRole("heading", { name: "Meet Dr. Kingsley Lasing" }),
      ).toBeVisible();
      await expect(
        page.getByText("Now accepting new patients in Edmonton"),
      ).toBeVisible();

      const image = page.locator('[data-testid="doctor-featured-image"]');
      await expect(image).toBeVisible();
      await expect(image).toHaveAttribute(
        "src",
        new RegExp(cloudinaryPortraitAsset.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
      );
      await expect
        .poll(
          () =>
          image.evaluate(
            (element) =>
              element instanceof HTMLImageElement &&
              element.complete &&
              element.naturalWidth > 0,
          ),
          { timeout: 20_000 },
        )
        .toBe(true);

      const styleMetrics = await page.evaluate(() => {
        const section = document.querySelector(
          '[data-testid="home-doctor-section"]',
        );
        const title = document.querySelector(
          '[data-testid="doctor-section-title"]',
        );
        const card = document.querySelector(
          '[data-testid="doctor-featured-card"]',
        );
        const sectionStyle = section ? getComputedStyle(section) : null;
        const titleStyle = title ? getComputedStyle(title) : null;
        const cardStyle = card ? getComputedStyle(card) : null;

        return {
          backgroundImage: sectionStyle?.backgroundImage ?? "",
          titleFontSize: titleStyle
            ? Number.parseFloat(titleStyle.fontSize)
            : 0,
          cardBorderRadius: cardStyle
            ? Number.parseFloat(cardStyle.borderRadius)
            : 0,
          cardShadow: cardStyle?.boxShadow ?? "none",
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        };
      });

      expect(
        styleMetrics.backgroundImage,
        `${viewport.name} doctor section should have a styled background`,
      ).toContain("clinic-reception");
      expect(
        styleMetrics.titleFontSize,
        `${viewport.name} doctor title should stay section-sized`,
      ).toBeLessThanOrEqual(viewport.maxTitleSize);
      expect(styleMetrics.cardBorderRadius).toBeGreaterThan(8);
      expect(styleMetrics.cardShadow).not.toBe("none");
      expect(styleMetrics.scrollWidth).toBeLessThanOrEqual(
        styleMetrics.clientWidth + 1,
      );
    }
  });

  test("header links resolve to exported pages", async ({
    baseURL,
    page,
    request,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const hrefs = await page.locator("header a[href]").evaluateAll((links) =>
      Array.from(
        new Set(
          links
            .map((link) => link.getAttribute("href"))
            .filter((href): href is string => Boolean(href))
            .filter((href) => href.startsWith("/"))
            .filter((href) => !href.includes("#")),
        ),
      ),
    );

    expect(hrefs).toContain("/");
    expect(hrefs).toContain("/services/");
    expect(hrefs).toContain("/register/");
    expect(hrefs).toContain("/family-doctor/");
    expect(hrefs).toContain("/walk-in/");
    expect(hrefs).not.toContain("/family-doctors-accepting-new-patients-edmonton/");
    expect(hrefs).not.toContain("/walk-in-clinic-edmonton/");
    expect(hrefs).not.toContain("/patient-registration/");

    for (const href of hrefs) {
      const response = await request.get(new URL(href, baseURL).toString());
      expect(response.status(), `${href} should resolve`).toBeLessThan(400);
    }
  });
});
