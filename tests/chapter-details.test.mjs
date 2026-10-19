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
const chapterPageUrl = new URL(
  "../src/app/[locale]/chapters/[slug]/page.tsx",
  import.meta.url,
);
const portfolioDataUrl = new URL(
  "../src/content/portfolio/data.generated.json",
  import.meta.url,
);

test("chapter detail content covers every approved chapter with its editorial contract", async () => {
  assert.equal(
    existsSync(chapterDetailsUrl),
    true,
    "chapter-details.ts is missing",
  );

  const [details, types, chapters, contentIndex, projectsPage, portfolioRaw] =
    await Promise.all([
      readFile(chapterDetailsUrl, "utf8"),
      readFile(chapterTypesUrl, "utf8"),
      readFile(chaptersUrl, "utf8"),
      readFile(contentIndexUrl, "utf8"),
      readFile(projectsPageUrl, "utf8"),
      readFile(portfolioDataUrl, "utf8"),
    ]);
  const portfolio = JSON.parse(portfolioRaw);

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
    assert.ok(
      index > previousIndex,
      `chapters must list ${id} in source order`,
    );
    previousIndex = index;
  }

  assert.match(types, /href\?: `\/work\/\$\{string\}`;/);
  assert.match(
    contentIndex,
    /chapterDetails, getChapterDetail.*from "\.\/chapter-details"/,
  );
  assert.match(projectsPage, /getChapterDetail/);
  assert.match(projectsPage, /href: `\/chapters\/\$\{chapter\.id\}`/);

  // The generated portfolio data lists the same chapters, in the same order.
  assert.deepEqual(
    portfolio.chapters.map((chapter) => chapter.id),
    approvedChapterIds,
  );
  // Ironhack carries its case on the chapter page instead of project pages.
  const ironhack = portfolio.chapters.find((chapter) => chapter.id === "ironhack");
  assert.equal(ironhack.projects.length, 0);
  assert.ok(ironhack.es.page.case && ironhack.en.page.case);
});

test("chapter details provide explicit English copy from the latest CV", async () => {
  const [details, types, page] = await Promise.all([
    readFile(chapterDetailsUrl, "utf8"),
    readFile(chapterTypesUrl, "utf8"),
    readFile(chapterPageUrl, "utf8"),
  ]);

  assert.match(details, /const bilingual = \(es: string, en: string\)/);
  assert.doesNotMatch(details, /const copy =/);
  assert.doesNotMatch(details, /\bcopy\(/);
  assert.match(details, /Founding Designer · October 2025 to present/);
  assert.match(details, /Creative Lead · January 2024 to present/);
  assert.match(details, /Independent designer and consultant · 2025 to 2026/);
  assert.match(details, /Co-founder and team lead · 2021 to September 2024/);
  assert.match(
    details,
    /Program Manager Assistant · Berlin · March to September 2023/,
  );
  assert.match(
    details,
    /Marketing strategy and talent scouting · February to September 2025/,
  );
  assert.match(details, /1\.3M\+/);
  assert.match(details, /59,000€/);
  assert.match(details, /100,000\+/);
  assert.match(types, /value: string \| LocalizedString/);
  assert.match(details, /value: \{ en: "1\.3M\+", es: "1,3M\+" \}/);
  assert.match(details, /value: \{ en: "59,000€", es: "59\.000€" \}/);
  assert.match(details, /value: \{ en: "100,000\+", es: "100\.000\+" \}/);
  // Chapter page copy now comes from the generated portfolio content.
  assert.match(page, /getChapter,[\s\S]*?from "@\/content\/portfolio"/);
  assert.match(page, /const \{ page \} = chapter\.t;/);
  assert.match(page, /page\.stats\.map\(\(stat\)/);
  assert.match(page, /\{stat\.value\}/);
  assert.match(page, /\{stat\.label\}/);
  assert.doesNotMatch(page, /impact\.value/);
  assert.doesNotMatch(page, /detail\.intro|detail\.impact/);
  assert.doesNotMatch(
    page,
    /detail\.role\[locale\]\.toUpperCase\(\)\} · \{chapter\.dateRange/,
  );
});
