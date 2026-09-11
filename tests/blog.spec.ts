import { expect, test } from "@playwright/test";
import { blogPosts } from "../lib/blog";

test("blog index and navigation expose every guide", async ({ page }) => {
  await page.goto("/blog/", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Blog & News");
  for (const post of blogPosts) {
    await expect(page.getByRole("heading", { level: 3, name: post.title }).getByRole("link")).toHaveAttribute("href", post.path);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: test.info().outputPath("blog-index.png"), fullPage: true });
});

for (const post of blogPosts) {
  test(`${post.slug}: article, citations, metadata and local links`, async ({ page, request }) => {
    await page.goto(post.path, { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(post.title);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://edmonton.doctor${post.path}`);
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "article");
    const text = await page.locator("main").innerText();
    expect(text).not.toMatch(/Publishing metadata|Editorial notes|\[\^\d+\]|physician-approved/);
    expect(text.split(/\s+/).length).toBeGreaterThan(1800);
    const brokenAnchors = await page.locator('main a[href^="#"]').evaluateAll((links) => links.map((link) => link.getAttribute("href")!).filter((href) => !document.getElementById(href.slice(1))));
    expect(brokenAnchors).toEqual([]);
    const paths = await page.locator('main a[href^="/"]').evaluateAll((links) => [...new Set(links.map((link) => link.getAttribute("href")!))]);
    for (const path of paths) expect((await request.get(path)).status(), path).toBe(200);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: test.info().outputPath("article.png"), fullPage: false });
  });
}

test("production sitemap includes the blog and uses the live domain", async ({ request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).not.toContain("placeholder");
  for (const path of ["/blog/", ...blogPosts.map((post) => post.path)]) expect(sitemap).toContain(`https://edmonton.doctor${path}`);
});

test("navigation fits tablet and small desktop widths", async ({ page }) => {
  for (const width of [768, 1024, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/blog/", { waitUntil: "domcontentloaded" });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Width ${width}`).toBe(true);
  }
});
