import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pageUrl = new URL(
  "../src/app/[locale]/projects/page.tsx",
  import.meta.url,
);
const page = await readFile(pageUrl, "utf8");

const photoFiles = [
  "chapters-travel-1.jpeg",
  "chapters-travel-2.jpeg",
  "chapters-travel-3.jpeg",
];

test("projects page renders the Figma travel collage above the Chapters heading", () => {
  assert.match(page, /const chaptersTravelPhotos = \[/);
  assert.match(page, /Viajando por el mundo/);
  assert.match(page, /@valejimenez\.cm/);
  assert.match(page, /I ♥ SK/);
  assert.match(page, /LONDON/);

  const collageStart = page.indexOf('data-projects-chapters="travel-collage"');
  const headingStart = page.indexOf('{es ? "Capítulos" : "Chapters"}');
  assert.ok(collageStart >= 0, "travel collage is missing");
  assert.ok(headingStart >= 0, "Chapters heading is missing");
  assert.ok(collageStart < headingStart, "travel collage must precede the Chapters heading");

  for (const file of photoFiles) {
    assert.match(page, new RegExp(`pages/projects/figma/${file}`));
  }
});

test("projects Chapters travel-photo exports are committed locally", () => {
  for (const file of photoFiles) {
    assert.equal(
      existsSync(new URL(`../public/pages/projects/figma/${file}`, import.meta.url)),
      true,
      `${file} is missing`,
    );
  }
});
