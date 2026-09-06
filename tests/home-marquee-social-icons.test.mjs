import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readSource = (path) =>
  readFile(new URL(path, import.meta.url), "utf8").catch(() => "");

const [about, marquee, page] = await Promise.all([
  readSource("../src/components/site/HomeAboutHero.tsx"),
  readSource("../src/components/site/FeatureProjectsMarquee.tsx"),
  readSource("../src/app/[locale]/page.tsx"),
]);

test("the featured-project marquee follows the about hero", () => {
  assert.match(
    page,
    /<HomeAboutHero locale=\{locale\} \/>[\s\S]*?<FeatureProjectsMarquee[\s\S]*?<CategoryShowcase/,
  );
  assert.doesNotMatch(page, /<WorkChapters[\s\S]*?<FeatureProjectsMarquee/);
  assert.match(about, /pt-24 pb-0/);
  assert.match(about, /sm:pt-32/);
  assert.match(about, /lg:pt-\[180px\]/);
});

test("the marquee translates the Figma 507:174 presentation", () => {
  assert.match(marquee, /max-w-\[1460px\]/);
  assert.match(marquee, /sm:text-\[48px\]/);
  assert.match(marquee, /sm:h-\[192px\]/);
  assert.match(marquee, /sm:w-\[234px\]/);
  assert.match(marquee, /rounded-\[12px\]/);
  assert.match(marquee, /gap-\[22px\]/);
  assert.match(marquee, /sm:text-\[16px\]/);
});

test("the marquee preserves project links and duplicate accessibility", () => {
  assert.match(marquee, /const strip = \[\.\.\.items, \.\.\.items\]/);
  assert.match(marquee, /<Link[\s\S]*?href=\{p\.href\}/);
  assert.match(marquee, /alt=\{p\.title\}/);
  assert.match(marquee, /aria-hidden=\{i >= items\.length\}/);
  assert.match(marquee, /marquee-pause/);
  assert.match(marquee, /--marquee-duration/);
});

test("the about hero renders recognizable accessible social icons", () => {
  assert.match(about, /function InstagramIcon/);
  assert.match(about, /function MailIcon/);
  assert.match(about, /function LinkedInIcon/);
  assert.equal((about.match(/aria-hidden="true"/g) ?? []).length, 3);
  assert.match(about, /aria-label="Instagram"/);
  assert.match(about, /aria-label="Email"/);
  assert.match(about, /aria-label="LinkedIn"/);
  assert.match(about, /focus-visible:ring-2/);
  assert.doesNotMatch(about, />\s*IG\s*</);
  assert.doesNotMatch(about, />\s*@\s*</);
  assert.doesNotMatch(about, />\s*in\s*</);
});
