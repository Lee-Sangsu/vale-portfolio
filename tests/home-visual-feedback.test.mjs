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

test("WorkTogether uses a black hand badge", () => {
  const handBadge = workTogether.match(/<div className="([^"]+)">\s*✋/s);

  assert.ok(handBadge, "expected to find the hand badge");
  assert.match(handBadge[1], /(?:^|\s)bg-black(?:\s|$)/);
  assert.doesNotMatch(handBadge[1], /(?:^|\s)bg-green(?:\s|$)/);
});

test("CategoryShowcase photos are static while the projects CTA remains a link", () => {
  const projectCards = categoryShowcase.match(
    /\{cat\.projects\.slice\(0, 3\)\.map\(\(project, i\) => \(([\s\S]*?)\)\)\}/,
  );

  assert.ok(projectCards, "expected to find the mapped project cards");
  assert.match(projectCards[1], /^\s*<div\b/);
  assert.doesNotMatch(projectCards[1], /<Link\b/);
  assert.match(
    categoryShowcase,
    /<Link\s+href="\/projects"[\s\S]*?\{allLabel\}[\s\S]*?<\/Link>/,
  );
});
