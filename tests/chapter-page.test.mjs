import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pageUrl = new URL(
  "../src/app/[locale]/chapters/[slug]/page.tsx",
  import.meta.url,
);
const navUrl = new URL("../src/components/site/SiteNav.tsx", import.meta.url);

test("chapter pages use the Figma hierarchy and preserve dynamic route safeguards", async () => {
  assert.equal(existsSync(pageUrl), true, "chapter detail page is missing");

  const [page, nav] = await Promise.all([
    readFile(pageUrl, "utf8"),
    readFile(navUrl, "utf8"),
  ]);

  assert.match(page, /export function generateStaticParams\(\)/);
  assert.match(page, /getChapterDetail\(slug\)/);
  assert.match(page, /notFound\(\);/);
  assert.match(page, /<SiteNav tone="light" \/>/);
  assert.match(page, /<ChapterProjectRail/);
  assert.match(page, /Mis responsabilidades/);
  assert.match(page, /bg-\[var\(--chapter-accent\)\]/);
  assert.match(page, /<WorkTogether \/>/);
  assert.doesNotMatch(page, /<WorkTogether photo=/);
  assert.match(nav, /className="[^"]*text-black[^"]*"/);
});
