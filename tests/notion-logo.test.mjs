import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const aboutSource = readFileSync(new URL("../src/content/about.ts", import.meta.url), "utf8");
const notionAsset = new URL("../public/shared/tool-logos/notion.svg", import.meta.url);

test("the Notion tool uses its dedicated standard app-mark asset", () => {
  assert.match(
    aboutSource,
    /slug: "notion", label: "Notion", icon: "\/shared\/tool-logos\/notion\.svg"/,
  );
  assert.equal(existsSync(notionAsset), true);
  assert.match(readFileSync(notionAsset, "utf8"), /<svg[^>]*aria-label="Notion"/);
});
