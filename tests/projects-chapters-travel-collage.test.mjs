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
  // Stickers: two text labels and two emoji.
  assert.match(page, /I ♥ DESIGN/);
  assert.match(page, /ENJOYING THE PROCESS/);
  assert.match(page, /🎨/);
  assert.match(page, /🌸/);
  assert.doesNotMatch(page, /I ♥ SK|LONDON/);
  assert.match(
    page,
    /absolute left-1\/2 top-\[58%\] z-40 -translate-x-1\/2 whitespace-nowrap[^"]*"[^>]*>\s*ENJOYING THE PROCESS/,
    "the ENJOYING THE PROCESS label must be centered",
  );

  const collageStart = page.indexOf('data-projects-chapters="travel-collage"');
  const headingStart = page.indexOf('{es ? "Capítulos" : "Chapters"}');
  assert.ok(collageStart >= 0, "travel collage is missing");
  assert.ok(headingStart >= 0, "Chapters heading is missing");
  assert.ok(collageStart < headingStart, "travel collage must precede the Chapters heading");

  // The wrapper is a hover group; the photos live in an inner bottom-anchored
  // frame so the header text keeps clear space when photos grow on hover.
  assert.match(
    page,
    /data-projects-chapters="travel-collage"\s+className="group relative [^"]*aspect-\[320\/340\]/,
  );
  assert.match(
    page,
    /absolute inset-x-0 bottom-0 aspect-\[320\/288\]/,
  );
  assert.match(page, /chaptersTravelPhotos\.map\(\(photo\) =>/);
  assert.match(page, /\$\{photo\.className\} \$\{photo\.hoverClass\}/);

  const photosSource = page.slice(
    page.indexOf("const chaptersTravelPhotos = ["),
    page.indexOf("export default async function ProjectsPage"),
  );
  assert.equal((photosSource.match(/hoverClass:/g) ?? []).length, photoFiles.length);
  assert.equal(
    (photosSource.match(/group-hover:scale-\[/g) ?? []).length,
    photoFiles.length,
    "every travel photo spreads/scales on hover",
  );

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
