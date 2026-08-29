import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import test from "node:test";

const componentUrl = new URL(
  "../src/components/site/ProjectChapterGrid.tsx",
  import.meta.url,
);

test("project grid is a client component with accessible category controls", async () => {
  assert.equal(existsSync(componentUrl), true, "ProjectChapterGrid is missing");

  const component = await readFile(componentUrl, "utf8");
  assert.match(component, /^"use client";/);
  assert.match(component, /aria-pressed=\{activeCategory === category\.id\}/);
  assert.match(component, /filterProjectCards\(cards, activeCategory\)/);
  assert.match(component, /<Link\s+href=\{card\.href\}/);
});
