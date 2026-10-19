import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import test from "node:test";

const componentUrl = new URL(
  "../src/components/site/ProjectChapterGrid.tsx",
  import.meta.url,
);

test("project grid is a client component with accessible category controls", async () => {
  assert.equal(existsSync(componentUrl), true, "ProjectChapterGrid is missing");

  const component = await readFile(componentUrl, "utf8");
  assert.match(component, /^"use client";/);
  assert.match(component, /aria-pressed=\{activeCategory === category\.id\}/);
  assert.match(component, /aria-pressed=\{activeCategory === category\.id\}/);
  assert.match(component, /onClick=\{\(\) => setActiveCategory\(category\.id\)\}/);
  // The grid no longer filters chapter cards; it receives pre-built data.
  assert.doesNotMatch(component, /filterProjectCards/);
  assert.match(
    component,
    /export function ProjectChapterGrid\(\{\s*cards,\s*categories,\s*projectsByCategory,\s*locale,\s*\}/,
  );
  assert.match(component, /<Link\s+href=\{card\.href\}/);
  assert.match(component, /<Link\s+href=\{project\.href\}/);
  assert.match(component, /px-3\.5 py-2 font-inter text-\[12px\]/);
  assert.match(component, /-mx-5 mt-8 overflow-x-auto/);
  assert.match(component, /<ul className="mt-4/);
});

test("non-chapters tabs render the individual projects, not chapter cards", async () => {
  const component = await readFile(componentUrl, "utf8");
  assert.match(component, /const isChaptersTab = activeCategory === "chapters";/);
  assert.match(
    component,
    /const projects = projectsByCategory\[activeCategory\] \?\? \[\];/,
  );
  assert.match(component, /\{isChaptersTab \? \(/);

  // Chapters tab: chapter cards with their meta line and tags.
  const [chaptersBranch, projectsBranch] = component
    .split("{isChaptersTab ? (")[1]
    .split(/\n\s*\) : \(\n(?=\s*<ul)/);
  assert.match(chaptersBranch, /cards\.map\(\(card\) =>/);
  assert.match(chaptersBranch, /\{card\.meta\}/);
  assert.match(chaptersBranch, /card\.tags\.map/);
  assert.match(chaptersBranch, /<Link\s+href=\{card\.href\}/);

  // Every other tab: one project card per project, each linking to its page.
  assert.match(projectsBranch, /projects\.map\(\(project\) =>/);
  assert.match(projectsBranch, /<Link\s+href=\{project\.href\}/);
  assert.match(projectsBranch, /\{project\.title\}/);
  assert.match(projectsBranch, /\{project\.meta\}/);
  assert.doesNotMatch(projectsBranch, /cards\.map|card\.href/);

  // The projects page builds those project links as /work/<slug>.
  const page = await readFile(
    new URL("../src/app/[locale]/projects/page.tsx", import.meta.url),
    "utf8",
  );
  assert.match(page, /href: `\/work\/\$\{project\.slug\}`/);
  assert.match(page, /getProjectsByFilter\(filter, locale\)/);
  assert.match(page, /projectsByCategory=\{projectsByCategory\}/);
});
