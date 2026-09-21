import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const componentPath = "src/components/site/WorkTogether.tsx";
const generalCallSitePaths = [
  "src/app/[locale]/about/page.tsx",
  "src/app/[locale]/projects/page.tsx",
  "src/app/[locale]/contact/page.tsx",
  "src/app/[locale]/page.tsx",
];
const detailCallSitePaths = [
  "src/app/[locale]/work/[slug]/page.tsx",
  "src/app/[locale]/chapters/[slug]/page.tsx",
];
const callSitePaths = [...generalCallSitePaths, ...detailCallSitePaths];

const component = readFileSync(componentPath, "utf8");

test("WorkTogether uses the approved shared Figma photo", () => {
  assert.match(component, /src="\/shared\/portraits\/work-together\.png"/);
  assert.doesNotMatch(component, /src=\{photo\}/);
});

test("WorkTogether overlaps half of the hand badge at the bottom-left photo corner", () => {
  const handBadge = component.match(/<div className="([^"]+)">\s*✋/s);

  assert.ok(handBadge, "expected to find the hand badge");
  assert.match(handBadge[1], /(?:^|\s)left-0(?:\s|$)/);
  assert.match(handBadge[1], /(?:^|\s)bottom-0(?:\s|$)/);
  assert.match(handBadge[1], /(?:^|\s)-translate-x-1\/2(?:\s|$)/);
  assert.match(handBadge[1], /(?:^|\s)translate-y-1\/2(?:\s|$)/);
  assert.doesNotMatch(handBadge[1], /(?:^|\s)-right-5(?:\s|$)/);
  assert.doesNotMatch(handBadge[1], /(?:^|\s)-bottom-5(?:\s|$)/);
  assert.match(
    component,
    /<div className="relative h-\[360px\] w-\[266px\][^"]*">\s*<div className="absolute inset-0[^"]*">\s*<Image[\s\S]*?\/>\s*<\/div>\s*<div className="[^"]*left-0[^"]*">\s*✋/,
    "expected the badge to be anchored inside the photo frame",
  );
});

test("WorkTogether call sites cannot override the shared photo", () => {
  assert.doesNotMatch(component, /photo\??:\s*string/);

  for (const path of callSitePaths) {
    const callSite = readFileSync(path, "utf8");
    assert.doesNotMatch(
      callSite,
      /<WorkTogether\s+photo=/,
      `unexpected photo override in ${path}`,
    );
  }
});

test("WorkTogether defines the approved localized coffee and detail headings", () => {
  assert.match(component, /coffeeTitle:\s*"Tomémonos un café"/);
  assert.match(component, /detailTitle:\s*"¡Trabajemos juntas!"/);
  assert.match(component, /coffeeTitle:\s*"Let's grab a coffee"/);
  assert.match(component, /detailTitle:\s*"Let's work together"/);
});

test("WorkTogether defaults to the coffee heading and selects the detail heading by variant", () => {
  assert.match(
    component,
    /variant\s*=\s*"coffee"[\s\S]*variant\s*===\s*"detail"\s*\?\s*t\.detailTitle\s*:\s*t\.coffeeTitle/,
  );
  assert.match(component, /variant\?:\s*"coffee"\s*\|\s*"detail"/);
});

test("general pages use the default coffee CTA", () => {
  for (const path of generalCallSitePaths) {
    const callSite = readFileSync(path, "utf8");
    assert.match(callSite, /<WorkTogether\s*\/>/, `missing default CTA in ${path}`);
    assert.doesNotMatch(
      callSite,
      /<WorkTogether\s+variant="detail"\s*\/>/,
      `unexpected detail CTA in ${path}`,
    );
  }
});

test("project and chapter detail pages use the detail CTA", () => {
  const workDetail = readFileSync(detailCallSitePaths[0], "utf8");
  const chapterDetail = readFileSync(detailCallSitePaths[1], "utf8");

  assert.equal(
    [...workDetail.matchAll(/<WorkTogether\s+variant="detail"\s*\/>/g)].length,
    2,
    "expected both work detail CTA placements to use the detail variant",
  );
  assert.doesNotMatch(workDetail, /<WorkTogether\s*\/>/);
  assert.equal(
    [...chapterDetail.matchAll(/<WorkTogether\s+variant="detail"\s*\/>/g)]
      .length,
    1,
    "expected the chapter detail CTA to use the detail variant",
  );
  assert.doesNotMatch(chapterDetail, /<WorkTogether\s*\/>/);
});
