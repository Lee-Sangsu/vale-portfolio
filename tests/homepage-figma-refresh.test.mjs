import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readSource = (path) =>
  readFile(new URL(path, import.meta.url), "utf8").catch(() => "");

const [hero, about, showcase, page] = await Promise.all([
  readSource("../src/components/site/HomeHero.tsx"),
  readSource("../src/components/site/HomeAboutHero.tsx"),
  readSource("../src/components/site/CategoryShowcase.tsx"),
  readSource("../src/app/[locale]/page.tsx"),
]);

test("HomeHero uses the approved copy, Figma colors, and wider folder spacing", () => {
  assert.match(
    hero,
    /I design brands, products and events that make it off the page\./,
  );
  assert.match(
    hero,
    /Here you'll find branding, events, campaigns and digital products, driven by creativity and teamwork\./,
  );
  assert.match(hero, /Hi I'm Valeria/);
  assert.match(hero, /bg-\[#acd7e8\]/);
  assert.match(hero, /color: "#c9f24d"/);
  assert.match(hero, /pos: "left-\[18%\] top-\[47%\]"/);
  assert.match(hero, /pos: "left-\[72%\] top-\[17%\]"/);
  assert.match(hero, /text-\[clamp\(34px,11vw,44px\)\]/);
});

test("the localized about section is inserted before CategoryShowcase", () => {
  assert.match(page, /import \{ HomeAboutHero \}/);
  assert.match(
    page,
    /<HomeAboutHero locale=\{locale\} \/>[\s\S]*<CategoryShowcase/,
  );
  assert.match(about, /const es = locale === "es"/);
  assert.match(about, /Designer in motion/);
  assert.match(about, /Diseñadora en movimiento/);
  assert.match(about, /lg:grid-cols-\[minmax\(0,671px\)_372px\]/);
  assert.match(about, /\/pages\/home\/figma\/about-portrait\.png/);
  assert.match(about, /contact\.instagram/);
  assert.match(about, /contact\.linkedin/);
});

test("WorkChapters follows the I design for section", () => {
  const featureProjectsIndex = page.indexOf("<FeatureProjectsMarquee");
  const designingForIndex = page.indexOf("{/* ── Designing for [rotating] ── */}");
  const workChaptersIndex = page.indexOf("<WorkChapters");
  const logoMarqueeIndex = page.indexOf("<LogoMarquee");

  assert.ok(featureProjectsIndex < designingForIndex);
  assert.ok(designingForIndex < workChaptersIndex);
  assert.ok(workChaptersIndex < logoMarqueeIndex);
});

test("the about portrait is stored locally", () => {
  assert.equal(
    existsSync(
      new URL("../public/pages/home/figma/about-portrait.png", import.meta.url),
    ),
    true,
  );
});

test("CategoryShowcase matches the Figma list and overlapping image fan", () => {
  assert.match(showcase, /useState\(0\)/);
  assert.match(showcase, /onClick=\{\(\) => setActive\(i\)\}/);
  assert.match(showcase, /aria-pressed=\{on\}/);
  assert.match(showcase, /categories\.map/);
  assert.match(showcase, /c\.desc/);
  assert.match(showcase, /cat\.projects\.slice\(0, 3\)\.map/);
  assert.match(showcase, /-ml-\[28%\]/);
  assert.match(page, /Ver proyectos de esta área/);
  assert.doesNotMatch(showcase, /Featured projects for the active category/);
  assert.doesNotMatch(showcase, /grid-cols-1 gap-5 sm:grid-cols-3/);
});
