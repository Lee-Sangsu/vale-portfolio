import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const component = await readFile(
  new URL("../src/components/LogoMarquee.tsx", import.meta.url),
  "utf8",
);

test("logo marquee renders logos with contained sizing", () => {
  assert.match(
    component,
    /className="object-contain opacity-90"/,
  );
});
