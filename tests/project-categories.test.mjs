import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

// The discipline filters now live in the generated portfolio content
// (content/source/{es,en}/*.md -> src/content/portfolio/data.generated.json).
const data = JSON.parse(
  await readFile(
    new URL("../src/content/portfolio/data.generated.json", import.meta.url),
    "utf8",
  ),
);

const expectedFilterCounts = {
  design: 20,
  "ux-ui": 7,
  events: 14,
  "marketing-content": 15,
  strategy: 20,
};

const projects = data.chapters.flatMap((chapter) => chapter.projects);
const slugs = new Set(projects.map((project) => project.slug));

test("the portfolio has the six chapters and 37 projects", () => {
  assert.equal(data.chapters.length, 6);
  assert.equal(projects.length, 37);
  assert.equal(slugs.size, 37, "project slugs must be unique");
});

test("each discipline lists exactly the expected number of projects", () => {
  assert.deepEqual(
    Object.keys(data.filters).sort(),
    Object.keys(expectedFilterCounts).sort(),
  );

  for (const [filter, count] of Object.entries(expectedFilterCounts)) {
    assert.equal(
      data.filters[filter].length,
      count,
      `${filter} must list ${count} projects`,
    );
    assert.equal(
      new Set(data.filters[filter]).size,
      count,
      `${filter} must not list a project twice`,
    );
  }
});

test("every project slug in a discipline exists in some chapter", () => {
  for (const [filter, filterSlugs] of Object.entries(data.filters)) {
    for (const slug of filterSlugs) {
      assert.ok(slugs.has(slug), `${filter} lists unknown project: ${slug}`);
    }
  }
});

test("every project has a localized challenge, approach and result", () => {
  for (const project of projects) {
    for (const locale of ["es", "en"]) {
      for (const field of ["challenge", "approach", "result"]) {
        const text = project[locale].page[field];
        assert.ok(
          typeof text === "string" && text.trim().length > 0,
          `${project.slug} (${locale}) is missing ${field}`,
        );
      }
    }
  }
});
