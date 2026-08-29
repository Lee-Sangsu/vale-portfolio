# Notion Logo Correction Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Display the standard Notion app mark for the Notion tool instead of the incorrect CapCut image.

**Architecture:** `AppSwatchRow` consumes the `tools` array from `src/content/about.ts`, so its rendering logic stays untouched. A dedicated SVG asset is stored alongside the existing tool marks, and only the Notion record points to it.

**Tech Stack:** Next.js, TypeScript, Node.js built-in test runner, SVG.

---

### Task 1: Correct the Notion tool asset

**Files:**
- Create: `public/shared/tool-logos/notion.svg`
- Modify: `src/content/about.ts:68`
- Create: `tests/notion-logo.test.mjs`

**Step 1: Write the failing test**

```js
test("the Notion tool uses its dedicated standard app-mark asset", () => {
  assert.match(aboutSource, /slug: "notion", label: "Notion", icon: "\/shared\/tool-logos\/notion\.svg"/);
  assert.equal(existsSync(notionAsset), true);
  assert.match(readFileSync(notionAsset, "utf8"), /aria-label="Notion"/);
});
```

**Step 2: Run test to verify it fails**

Run: `node --test tests/notion-logo.test.mjs`

Expected: FAIL because the Notion tool still references `notion.png` and the SVG does not exist.

**Step 3: Write minimal implementation**

Create `public/shared/tool-logos/notion.svg` containing the standard black-and-white Notion app mark, then change only the Notion record in `src/content/about.ts` to reference `/shared/tool-logos/notion.svg`.

**Step 4: Run test to verify it passes**

Run: `node --test tests/notion-logo.test.mjs`

Expected: PASS.

**Step 5: Verify the affected asset and type safety**

Run: `npm run verify:assets && npm run typecheck`

Expected: both commands exit with status 0.

**Step 6: Commit**

```bash
git add public/shared/tool-logos/notion.svg src/content/about.ts tests/notion-logo.test.mjs docs/plans/2026-08-29-notion-logo-implementation.md
git commit -m "fix: use the Notion logo"
```
