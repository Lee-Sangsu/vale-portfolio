import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const componentPath = "src/components/site/WorkTogether.tsx";
const callSitePaths = [
  "src/app/[locale]/about/page.tsx",
  "src/app/[locale]/projects/page.tsx",
  "src/app/[locale]/contact/page.tsx",
  "src/app/[locale]/work/[slug]/page.tsx",
  "src/app/[locale]/chapters/[slug]/page.tsx",
  "src/app/[locale]/page.tsx",
];

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
