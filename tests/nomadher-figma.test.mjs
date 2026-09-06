import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pageUrl = new URL(
  "../src/app/[locale]/chapters/[slug]/page.tsx",
  import.meta.url,
);
const railUrl = new URL(
  "../src/components/site/chapter/ChapterProjectRail.tsx",
  import.meta.url,
);
const detailsUrl = new URL("../src/content/chapter-details.ts", import.meta.url);

const figmaAssets = [
  "nomadher-hero-base.png",
  "nomadher-hero-overlay.png",
  "nomadher-project-01.png",
  "nomadher-project-02.png",
  "nomadher-project-03.png",
  "nomadher-project-04.png",
  "nomadher-project-05.png",
  "nomadher-project-06.png",
];

test("NomadHer chapter uses its local Figma hero and six-card rail variant", async () => {
  const [page, rail, details] = await Promise.all([
    readFile(pageUrl, "utf8"),
    readFile(railUrl, "utf8"),
    readFile(detailsUrl, "utf8"),
  ]);

  assert.match(page, /slug === "nomadher"/);
  assert.match(page, /pages\/chapters\/nomadher-hero-base\.png/);
  assert.match(page, /pages\/chapters\/nomadher-hero-overlay\.png/);
  assert.match(page, /chapterId=\{chapter\.id\}/);

  assert.match(rail, /chapterId: ChapterId/);
  assert.match(rail, /chapterId === "nomadher"/);
  assert.match(rail, /rounded-\[18px\]/);
  assert.match(rail, /Ver más/);
  assert.match(rail, /project\.date/);

  const nomadHerStart = details.indexOf('id: "nomadher"');
  const boostLabStart = details.indexOf('id: "boost-lab"', nomadHerStart);
  const nomadHer = details.slice(nomadHerStart, boostLabStart);
  assert.equal((nomadHer.match(/title: bilingual\(/g) ?? []).length, 12);
  assert.match(nomadHer, /Automatización ManyChat/);
  assert.match(nomadHer, /Análisis de contenido/);

  for (const asset of figmaAssets) {
    assert.equal(
      existsSync(new URL(`../public/pages/chapters/${asset}`, import.meta.url)),
      true,
      `${asset} is missing`,
    );
  }
});
