import assert from "node:assert/strict";
import test from "node:test";

import {
  CHAPTER_CATEGORIES,
  filterProjectCards,
} from "../src/lib/project-categories.mjs";

const cards = [
  { id: "n9ne" },
  { id: "travelling-university" },
  { id: "independent" },
  { id: "boost-lab" },
  { id: "nomadher" },
];

test("Capítulos returns every card in its existing order", () => {
  assert.deepEqual(
    filterProjectCards(cards, "chapters").map((card) => card.id),
    cards.map((card) => card.id),
  );
});

test("NomadHer is assigned to the disciplines represented in its work", () => {
  assert.deepEqual(CHAPTER_CATEGORIES.nomadher, [
    "ux-ui",
    "marketing-content",
    "strategy",
  ]);
});

test("each discipline filters to only matching project cards", () => {
  assert.deepEqual(
    filterProjectCards(cards, "design").map((card) => card.id),
    ["n9ne", "independent"],
  );
  assert.deepEqual(
    filterProjectCards(cards, "events").map((card) => card.id),
    ["travelling-university", "boost-lab"],
  );
  assert.deepEqual(filterProjectCards(cards, "missing"), []);
});
