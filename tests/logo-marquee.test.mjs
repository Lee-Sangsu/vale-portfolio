import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const component = await readFile(
  new URL("../src/components/LogoMarquee.tsx", import.meta.url),
  "utf8",
);

test("logo marquee fits logos within the tile's padded bounds", () => {
  assert.match(
    component,
    /className="min-h-0 h-full w-full object-contain opacity-90"/,
  );
});
