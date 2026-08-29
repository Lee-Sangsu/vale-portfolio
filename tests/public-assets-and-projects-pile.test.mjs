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
  assert.equal((projectsPage.match(/hoverClass:/g) ?? []).length, 8);
  assert.match(projectsPage, /from-\[#cf9bac\]/);
  assert.match(projectsPage, /group-hover:translate-/);
  assert.equal((projectsPage.match(/group-hover:scale-\[1\.06\]/g) ?? []).length, 8);
  assert.equal((projectsPage.match(/group-hover:-translate-y-32/g) ?? []).length, 2);
  assert.match(projectsPage, /group-hover:-translate-x-16/);
  assert.match(projectsPage, /group-hover:translate-x-20/);
  assert.match(projectsPage, /delay-\[\d+ms\]/);
  assert.match(projectsPage, /transition-transform duration-200 ease-in/);
  assert.match(projectsPage, /motion-reduce:transform-none/);
  assert.match(projectsPage, /data-projects-folder="back"/);
  assert.match(projectsPage, /data-projects-folder="tab"/);
  assert.match(projectsPage, /data-projects-folder="flap"/);
  assert.match(projectsPage, /perspective-\[800px\]/);
  assert.match(projectsPage, /origin-bottom/);
  assert.match(projectsPage, /group-hover:rotate-x-\[14deg\]/);
  assert.match(projectsPage, /motion-reduce:rotate-x-0/);
  assert.doesNotMatch(projectsPage, /transition-transform duration-500 ease-out/);
  assert.doesNotMatch(projectsPage, /delay-\[[2-9]\d{2}ms\]/);
  assert.doesNotMatch(projectsPage, /group-hover:-translate-y-2(?=["\s])/);
  assert.doesNotMatch(projectsPage, /hero-folder\.svg/);
  assert.doesNotMatch(projectsPage, /Proyectos favoritos/);
  assert.doesNotMatch(projectsPage, /hero-pile\.png/);
});
