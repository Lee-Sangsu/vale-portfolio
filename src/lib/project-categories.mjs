export const PROJECT_CATEGORY_IDS = [
  "chapters",
  "design",
  "ux-ui",
  "events",
  "marketing-content",
  "strategy",
];

export const CHAPTER_CATEGORIES = {
  n9ne: ["design", "strategy"],
  "travelling-university": ["events", "marketing-content", "strategy"],
  independent: ["design", "marketing-content", "strategy"],
  "boost-lab": ["events", "marketing-content", "strategy"],
  nomadher: ["ux-ui", "marketing-content", "strategy"],
  ironhack: ["ux-ui", "events", "strategy"],
};

export function filterProjectCards(cards, category) {
  if (category === "chapters") return cards;
  if (!PROJECT_CATEGORY_IDS.includes(category)) return [];

  return cards.filter((card) => CHAPTER_CATEGORIES[card.id]?.includes(category));
}
