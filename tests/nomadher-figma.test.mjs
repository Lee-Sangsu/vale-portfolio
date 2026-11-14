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

test("NomadHer chapter reads its photo from the portada folder and keeps its rail variant", async () => {
  const [page, rail] = await Promise.all([
    readFile(pageUrl, "utf8"),
    readFile(railUrl, "utf8"),
  ]);

  // The old hard-coded Figma hero photos were removed; the chapter photo is dropped in a folder.
  assert.match(page, /getChapterCovers\(chapter\.id\)/);
  assert.doesNotMatch(page, /nomadher-hero-(base|overlay)|pages\/chapters/);
  assert.match(page, /chapterId=\{chapter\.id\}/);

  assert.match(rail, /chapterId: ChapterId/);
  assert.match(rail, /chapterId === "nomadher"/);
  assert.match(rail, /"relative group flex min-h-\[540px\]/);
  assert.match(rail, /rounded-\[18px\]/);
  assert.match(rail, /Ver más/);
  assert.match(rail, /project\.date/);

  assert.equal(
    existsSync(new URL("../public/portafolio/capitulos/01-nomadher/portada", import.meta.url)),
    true,
    "the NomadHer portada folder must exist so photos can be dropped in",
  );
});
