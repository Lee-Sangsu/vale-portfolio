import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("..", import.meta.url);
const projectsPage = await readFile(
  new URL("../src/app/[locale]/projects/page.tsx", import.meta.url),
  "utf8",
);

test("public assets are grouped by page, project, and shared purpose", () => {
  for (const directory of ["public/pages", "public/work", "public/shared"]) {
    assert.equal(existsSync(new URL(directory, root)), true, `${directory} is missing`);
  }

  for (const legacyDirectory of [
    "public/photos",
    "public/figma",
    "public/Assets ",
    "public/tools",
  ]) {
    assert.equal(
      existsSync(new URL(legacyDirectory, root)),
      false,
      `${legacyDirectory} should have been moved`,
    );
  }
});

test("projects hero renders a custom pile of project photos", () => {
  assert.match(projectsPage, /const portfolioPile = \[/);
  assert.match(projectsPage, /portfolioPile\.map/);
  assert.match(projectsPage, /from-\[#cf9bac\]/);
  assert.doesNotMatch(projectsPage, /hero-pile\.png/);
});
