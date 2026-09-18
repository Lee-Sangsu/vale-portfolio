import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const favoriteProjects = readFileSync(
  "src/components/site/FavoriteProjects.tsx",
  "utf8",
);
const workTogether = readFileSync(
  "src/components/site/WorkTogether.tsx",
  "utf8",
);
const categoryShowcase = readFileSync(
  "src/components/site/CategoryShowcase.tsx",
  "utf8",
);

test("FavoriteProjects vertically centers its columns and spaces project names", () => {
  assert.match(favoriteProjects, /(?:^|\s)lg:items-center(?:\s|$)/);
  assert.doesNotMatch(favoriteProjects, /(?:^|\s)lg:items-start(?:\s|$)/);
  assert.match(
    favoriteProjects,
    /className="[^"]*(?:^|\s)space-y-4(?:\s|$)[^"]*(?:^|\s)lg:space-y-6(?:\s|$)[^"]*"/,
  );
});

test("WorkTogether uses the approved burgundy hand badge", () => {
  const handBadge = workTogether.match(/<div className="([^"]+)">\s*✋/s);

  assert.ok(handBadge, "expected to find the hand badge");
  assert.match(handBadge[1], /(?:^|\s)bg-\[#7B173B\](?:\s|$)/);
  assert.doesNotMatch(handBadge[1], /(?:^|\s)bg-black(?:\s|$)/);
  assert.doesNotMatch(handBadge[1], /(?:^|\s)bg-green(?:\s|$)/);
});

test("CategoryShowcase photos are static while the projects CTA remains a link", () => {
  const projectCards = categoryShowcase.match(
    /\{cat\.projects\.slice\(0, 3\)\.map\(\(project, i\) => \(([\s\S]*?)\)\)\}/,
  );
  const photoFanMarker = categoryShowcase.indexOf('aria-live="polite"');
  const photoFanStart = categoryShowcase.lastIndexOf("<div", photoFanMarker);
  const photoFanEnd = categoryShowcase.indexOf("</section>", photoFanMarker);

  assert.ok(projectCards, "expected to find the mapped project cards");
  assert.ok(photoFanMarker >= 0, "expected to find the photo-fan live region");
  assert.ok(photoFanStart >= 0, "expected to find the photo-fan container");
  assert.ok(photoFanEnd > photoFanMarker, "expected to find the photo-fan end");

  const photoFan = categoryShowcase.slice(photoFanStart, photoFanEnd);

  assert.match(projectCards[1], /^\s*<div\b/);
  assert.match(photoFan, /aria-live="polite"/);
  assert.doesNotMatch(photoFan, /<Link\b/);
  assert.doesNotMatch(photoFan, /<a\b/i);
  assert.doesNotMatch(photoFan, /href\s*=/);
  assert.doesNotMatch(photoFan, /role\s*=\s*["']link["']/);
  assert.doesNotMatch(photoFan, /onClick\s*=/);
  assert.doesNotMatch(photoFan, /aria-label\s*=/);
  assert.doesNotMatch(photoFan, /["\s]group(?=[\s"])/);
  assert.doesNotMatch(photoFan, /hover:/);
  assert.doesNotMatch(photoFan, /focus-visible:/);
  assert.match(
    categoryShowcase,
    /<Link\s+href="\/projects"[\s\S]*?\{allLabel\}[\s\S]*?<\/Link>/,
  );
});
