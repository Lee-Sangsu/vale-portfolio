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
  assert.match(page, /getChapter\(slug, locale\)/);
  // Accent color still comes from the old chapter detail; the photo comes from the chapter's portada folder.
  assert.match(page, /getChapterDetail\(slug\)/);
  assert.match(page, /detail\.accent/);
  assert.match(page, /getChapterCovers\(chapter\.id\)/);
  assert.doesNotMatch(page, /detail\.cover|pages\/chapters/, "no hard-coded chapter photos");
  for (const field of [
    "page.title",
    "page.tagline",
    "page.pill",
    "page.label",
    "page.band",
    "page.stats",
    "page.responsibilities",
  ]) {
    assert.ok(page.includes(field), `chapter page must render ${field}`);
  }
  assert.match(page, /notFound\(\);/);
  assert.match(page, /<SiteNav tone="onDark" \/>/);
  assert.match(page, /<ChapterProjectRail/);
  assert.match(page, /Mis responsabilidades/);
  assert.match(page, /bg-\[var\(--chapter-accent\)\]/);
  assert.match(page, /<WorkTogether variant="detail" \/>/);
  assert.doesNotMatch(page, /<WorkTogether photo=/);
  assert.match(nav, /onDark \? "text-white" : "text-black"/);
});
