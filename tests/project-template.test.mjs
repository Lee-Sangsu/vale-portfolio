import assert from "node:assert/strict";
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
