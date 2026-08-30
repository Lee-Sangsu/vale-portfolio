import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(
  new URL("../src/components/site/SiteNav.tsx", import.meta.url),
  "utf8",
);

test("the Portfolio logo stays black independently of navigation tone", () => {
  const logo = source.match(/\/\* Logo \*\/[\s\S]*?<\/Link>/)?.[0] ?? "";

  assert.match(logo, /"[^"\n]*text-black[^"\n]*"/);
  assert.doesNotMatch(logo, /light \? "text-white" : "text-black"/);
});
