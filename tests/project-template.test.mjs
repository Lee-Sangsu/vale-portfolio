import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("the work page renders the case sections and extras instead of a template", async () => {
  const page = await readFile(
    new URL("../src/app/[locale]/work/[slug]/page.tsx", import.meta.url),
    "utf8",
  );

  assert.match(page, /<CaseSections\b/);
  assert.match(page, /<ProjectExtras\b/);
  assert.doesNotMatch(page, /getProjectTemplate/);
});
