import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const projectsPage = await readFile(
  new URL("../src/app/[locale]/projects/page.tsx", import.meta.url),
  "utf8",
);
const workChapters = await readFile(
  new URL("../src/components/site/WorkChapters.tsx", import.meta.url),
  "utf8",
);

test("projects hero contains the PORTAfolio collage treatment", () => {
  assert.match(projectsPage, /PORTA/);
  assert.match(projectsPage, /folio/);
  assert.match(projectsPage, /from-\[#cf9bac\]/);
  assert.match(projectsPage, /BOG → BIO → BER → ICN/);
});

test("filled work-chapter image stays inside a positioned container", () => {
  assert.doesNotMatch(workChapters, /relative[^"\n]*md:sticky/);
  assert.match(workChapters, /<div className="md:sticky md:top-24">/);
});
