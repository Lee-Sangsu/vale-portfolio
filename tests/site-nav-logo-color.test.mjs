import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(
  new URL("../src/components/site/SiteNav.tsx", import.meta.url),
  "utf8",
);

test("the Portfolio logo is black, and turns white only on very dark backgrounds (onDark)", () => {
  const logo = source.match(/\/\* Logo \*\/[\s\S]*?<\/Link>/)?.[0] ?? "";

  assert.match(logo, /onDark \? "text-white" : "text-black"/);
  assert.doesNotMatch(logo, /light \? "text-white" : "text-black"/);
});
