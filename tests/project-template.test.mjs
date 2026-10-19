import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { getProjectTemplate } from "../src/lib/project-template.mjs";

test("assigns every featured project to its Figma template", () => {
  assert.equal(getProjectTemplate("nomadher-app"), "ux-ui");
  assert.equal(getProjectTemplate("jal-nomadher"), "marketing-social");

  for (const slug of [
    "global-youth-summit",
    "misiones-internacionales",
    "sejong-hackathon",
  ]) {
    assert.equal(getProjectTemplate(slug), "campaign-brand");
  }
});

test("the work page renders the case sections and extras instead of a template", async () => {
  const page = await readFile(
    new URL("../src/app/[locale]/work/[slug]/page.tsx", import.meta.url),
    "utf8",
  );

  assert.match(page, /<CaseSections\b/);
  assert.match(page, /<ProjectExtras\b/);
  assert.doesNotMatch(page, /getProjectTemplate/);
});
