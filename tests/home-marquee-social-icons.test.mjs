import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

const readSource = (path) =>
  readFile(new URL(path, import.meta.url), "utf8").catch(() => "");

const [about, marquee, page] = await Promise.all([
  readSource("../src/components/site/HomeAboutHero.tsx"),
  readSource("../src/components/site/FeatureProjectsMarquee.tsx"),
  readSource("../src/app/[locale]/page.tsx"),
]);

const brandLogos = await readdir(
  new URL("../public/shared/brands/", import.meta.url),
).catch(() => []);

test("the brand marquee ships at least one supported raster logo", () => {
  assert.ok(
    brandLogos.some((name) => /\.(?:png|jpe?g|webp|gif|avif)$/i.test(name)),
  );
});

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
  assert.match(marquee, /maskImage/);
  assert.match(marquee, /WebkitMaskImage/);
});

test("the marquee renders decorative brand logos with duplicate accessibility", () => {
  assert.match(marquee, /listPhotos\("shared\/brands"\)/);
  assert.match(marquee, /const strip = \[\.\.\.logos, \.\.\.logos\]/);
  assert.match(marquee, /alt=""/);
  assert.match(marquee, /object-contain/);
  assert.match(marquee, /aria-hidden=\{i >= logos\.length\}/);
  assert.match(marquee, /marquee-pause/);
  assert.match(marquee, /--marquee-duration/);
});

test("the marquee hides the decorative logo strip from assistive technology", () => {
  assert.match(marquee, /<ul[^>]*aria-hidden="true"[^>]*>/);
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
