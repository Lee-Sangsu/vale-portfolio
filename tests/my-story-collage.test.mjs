import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import test from "node:test";

const componentUrl = new URL(
  "../src/components/site/about/MyStory.tsx",
  import.meta.url,
);
const component = await readFile(componentUrl, "utf8");

const figmaPhotoFiles = [
  "story-collage-primary.png",
  "story-collage-reflection.png",
  "story-collage-left-portrait.png",
  "story-collage-right-portrait.png",
  "story-collage-center-photo.png",
  "story-collage-left-tilt.png",
  "story-collage-circle.png",
];

test("My Story renders the responsive Figma collage with local image exports", () => {
  assert.match(component, /id="story"/);
  assert.match(component, /const es = locale === "es"/);
  assert.match(component, /lg:aspect-\[1710\/1219\]/);
  assert.match(component, /max-w-\[1710px\]/);
  assert.match(
    component,
    /<div className="pointer-events-none absolute left-\[46\.61%\] top-\[5\.91%\] z-10 size-\[6\.78%\]">/,
  );
  assert.match(component, /overflow-hidden/);
  assert.doesNotMatch(component, /relative overflow-hidden \$\{className\}/);
  assert.match(component, /<div className=\{`overflow-hidden \$\{className\}`\}>/);
  assert.match(component, /sm:grid-cols-2/);
  assert.doesNotMatch(component, /lg:grid-cols-4/);

  for (const file of figmaPhotoFiles) {
    assert.match(component, new RegExp(`/pages/about/figma/${file}`));
  }
});

test("My Story Figma exports are committed locally", () => {
  for (const file of [...figmaPhotoFiles, "story-collage-doodle.svg"]) {
    assert.equal(
      existsSync(new URL(`../public/pages/about/figma/${file}`, import.meta.url)),
      true,
      `${file} is missing`,
    );
  }
});

test("My Story lifts the desktop background photos toward the description", () => {
  assert.match(
    component,
    /<div aria-hidden="true" className="absolute inset-0 -translate-y-\[10%\]">/,
  );
});
