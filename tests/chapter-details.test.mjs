import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import test from "node:test";

const approvedChapterIds = [
  "nomadher",
  "boost-lab",
  "independent",
  "n9ne",
  "ironhack",
  "travelling-university",
];

const chapterDetailsUrl = new URL(
  "../src/content/chapter-details.ts",
  import.meta.url,
);
const chapterTypesUrl = new URL("../src/content/types.ts", import.meta.url);
const chaptersUrl = new URL("../src/content/chapters.ts", import.meta.url);
const contentIndexUrl = new URL("../src/content/index.ts", import.meta.url);
const projectsPageUrl = new URL(
  "../src/app/[locale]/projects/page.tsx",
  import.meta.url,
);
const categoriesUrl = new URL(
  "../src/lib/project-categories.mjs",
  import.meta.url,
);

test("chapter detail content covers every approved chapter with its editorial contract", async () => {
  assert.equal(
    existsSync(chapterDetailsUrl),
    true,
    "chapter-details.ts is missing",
  );

  const [details, types, chapters, contentIndex, projectsPage, categories] =
    await Promise.all([
      readFile(chapterDetailsUrl, "utf8"),
      readFile(chapterTypesUrl, "utf8"),
      readFile(chaptersUrl, "utf8"),
      readFile(contentIndexUrl, "utf8"),
      readFile(projectsPageUrl, "utf8"),
      readFile(categoriesUrl, "utf8"),
    ]);

  for (const id of approvedChapterIds) {
    assert.match(types, new RegExp(`\\| "${id}"`));
    assert.match(details, new RegExp(`id: "${id}"`));
    assert.match(
      details,
      new RegExp(
        `id: "${id}"[\\s\\S]*?intro:[\\s\\S]*?role:[\\s\\S]*?impact:[\\s\\S]*?responsibilities:[\\s\\S]*?projects:`,
      ),
      `${id} must include intro, role, impact, responsibilities, and projects`,
    );
  }

  let previousIndex = -1;
  for (const id of approvedChapterIds) {
    const index = chapters.indexOf(`id: "${id}"`);
    assert.ok(index > previousIndex, `chapters must list ${id} in source order`);
    previousIndex = index;
  }

  assert.match(types, /href\?: `\/work\/\$\{string\}`;/);
  assert.match(
    contentIndex,
    /chapterDetails, getChapterDetail.*from "\.\/chapter-details"/,
  );
  assert.match(projectsPage, /getChapterDetail/);
  assert.match(projectsPage, /href: `\/chapters\/\$\{c\.id\}`/);
  assert.match(categories, /ironhack: \["ux-ui", "events", "strategy"\]/);
});
