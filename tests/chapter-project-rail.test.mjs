import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import test from "node:test";

const railUrl = new URL(
  "../src/components/site/chapter/ChapterProjectRail.tsx",
  import.meta.url,
);

test("chapter project rail is keyboard-accessible and supports linked project cards", async () => {
  assert.equal(existsSync(railUrl), true, "chapter project rail is missing");

  const source = await readFile(railUrl, "utf8");
  assert.match(source, /^"use client";/);
  assert.match(source, /aria-label="Previous projects"/);
  assert.match(source, /aria-label="Next projects"/);
  assert.match(source, /scrollBy\(/);
  assert.match(source, /project\.href \?/);
  assert.match(source, /<Link/);
});
