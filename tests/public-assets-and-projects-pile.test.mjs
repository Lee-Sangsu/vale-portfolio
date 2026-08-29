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
  const portfolioPileStart = projectsPage.indexOf("const portfolioPile = [");
  const portfolioPileEnd = projectsPage.indexOf("// Chapter cards", portfolioPileStart);
  const portfolioPileSource = projectsPage.slice(portfolioPileStart, portfolioPileEnd);

  assert.match(projectsPage, /const portfolioPile = \[/);
  assert.match(projectsPage, /portfolioPile\.map/);
  assert.equal((portfolioPileSource.match(/hoverClass:/g) ?? []).length, 8);
  assert.match(projectsPage, /from-\[#cf9bac\]/);
  assert.match(projectsPage, /group-hover:translate-/);
  assert.equal(
    (
      portfolioPileSource.match(
        /className: "left-\[[^"]+\] top-\[[^"]+\] z-(?:20|30|40) h-/g,
      ) ?? []
    ).length,
    8,
  );
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
  assert.match(projectsPage, /data-projects-folder="back"[\s\S]{0,320}border border-\[#151315\] bg-\[#737373\]\/35/);
  assert.match(projectsPage, /data-projects-folder="flap"[\s\S]{0,700}data-projects-folder="tab"/);
  assert.doesNotMatch(projectsPage, /data-projects-folder="back"[\s\S]{0,600}data-projects-folder="tab"/);
  assert.match(projectsPage, /data-projects-folder="tab"[\s\S]{0,220}border border-b-0 border-\[#090809\] bg-\[#737373\]\/35/);
  assert.match(projectsPage, /data-projects-folder="flap"[\s\S]{0,420}border border-\[#090809\] bg-\[#737373\]\/35/);
  assert.equal((projectsPage.match(/bg-\[#737373\]\/35/g) ?? []).length, 3);
  assert.match(projectsPage, /group relative -mt-3 aspect-\[11\/7\]/);
  assert.doesNotMatch(projectsPage, /group relative z-0 -mt-3 aspect-\[11\/7\]/);
  assert.match(projectsPage, /z-\[45\] h-\[44%\] w-\[74%\].*perspective-\[800px\]/);
  assert.match(projectsPage, /absolute bottom-\[3%\] right-\[2%\] z-50 w-fit/);
  assert.match(projectsPage, /perspective-\[800px\]/);
  assert.match(projectsPage, /origin-bottom/);
  assert.match(projectsPage, /group-hover:rotate-x-\[-14deg\]/);
  assert.match(projectsPage, /motion-reduce:rotate-x-0/);
  assert.doesNotMatch(projectsPage, /transition-transform duration-500 ease-out/);
  assert.doesNotMatch(projectsPage, /group-hover:rotate-x-\[14deg\]/);
  assert.doesNotMatch(projectsPage, /z-10 h-\[44%\] w-\[74%\].*perspective-\[800px\]/);
  assert.doesNotMatch(projectsPage, /w-\[min\(45vw,340px\)\]/);
  assert.doesNotMatch(projectsPage, /bg-\[linear-gradient\(145deg,#3a363b/);
  assert.doesNotMatch(projectsPage, /shadow-\[0_18px_28px_rgba\(47,30,40,0\.3\)\]/);
  assert.doesNotMatch(projectsPage, /delay-\[[2-9]\d{2}ms\]/);
  assert.doesNotMatch(projectsPage, /group-hover:-translate-y-2(?=["\s])/);
  assert.doesNotMatch(projectsPage, /hero-folder\.svg/);
  assert.doesNotMatch(projectsPage, /Proyectos favoritos/);
  assert.doesNotMatch(projectsPage, /hero-pile\.png/);
});
