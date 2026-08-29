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

test("My Story matches the Figma desktop collage geometry", () => {
  assert.match(
    component,
    /<section id="story" className="scroll-mt-24 overflow-hidden bg-\[#111\] text-white">/,
  );
  assert.match(component, /<div aria-hidden="true" className="absolute inset-0">/);
  assert.doesNotMatch(component, /aria-hidden="true" className="[^"]*-translate-y/);

  for (const frame of [
    /name="primary"\s+className="absolute bottom-\[-5\.82%\] left-\[58\.19%\] h-\[84\.82%\] w-\[45\.32%\]"/,
    /name="reflection"\s+className="absolute bottom-\[-8\.61%\] left-\[52\.16%\] h-\[47\.25%\] w-\[25\.26%\]"/,
    /name="leftPortrait"\s+className="absolute left-0 top-\[17\.15%\] h-\[54\.47%\] w-\[29\.06%\]"/,
    /name="rightPortrait"\s+className="absolute bottom-\[-14\.52%\] left-\[66\.49%\] h-\[62\.67%\] w-\[33\.51%\]"/,
    /name="centerPhoto"\s+className="absolute bottom-\[-1\.31%\] left-\[17\.19%\] h-\[53\.08%\] w-\[37\.6%\]"/,
    /name="leftTilt"\s+className="absolute bottom-\[-6\.94%\] left-\[-2\.16%\] h-\[66\.5%\] w-\[37\.85%\] rotate-\[6\.89deg\]"/,
    /name="circle"\s+className="absolute bottom-\[32\.32%\] left-\[66\.49%\] size-\[9\.24%\] rounded-full"/,
  ]) {
    assert.match(component, frame);
  }

  assert.match(
    component,
    /name="centerPhoto"\s+className="absolute bottom-\[-1\.31%\] left-\[17\.19%\] h-\[53\.08%\] w-\[37\.6%\]"\s+imageClassName="!bottom-auto !right-auto !left-0 !top-\[-40\.65%\] !h-\[140\.66%\] !w-\[136\.55%\] max-w-none"/,
  );
});
