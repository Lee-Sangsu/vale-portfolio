# Projects Hero Pop-out Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Align the Projects hero’s folder stack and chapter filters with Figma, with per-photo pop-out hover motion.

**Architecture:** Keep the data-driven `portfolioPile` in the server page and extend it to all eight Figma cards. Each card owns its own static position, z-index, and hover transform, while the black folder, date badge, and location card remain fixed. Retain the existing client-side category component and adjust only the filter-row/card-grid spacing and chip dimensions.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS 4, Node test runner.

---

### Task 1: Capture the hero interaction contract in a regression test

**Files:**
- Modify: `tests/public-assets-and-projects-pile.test.mjs:31-45`
- Modify: `src/app/[locale]/projects/page.tsx:128-244`

**Step 1: Write the failing test**

Update the Projects hero source test to assert that the pile has eight data entries and that its source includes per-photo hover classes, staggered transition delay, and motion-reduction transforms. Remove the assertion for the enclosing group translation.

```js
assert.match(projectsPage, /const portfolioPile = \[/);
assert.equal((projectsPage.match(/hoverClass:/g) ?? []).length, 8);
assert.match(projectsPage, /group-hover:translate-/);
assert.match(projectsPage, /delay-\[\d+ms\]/);
assert.match(projectsPage, /motion-reduce:transform-none/);
assert.doesNotMatch(projectsPage, /group-hover:-translate-y-2/);
```

**Step 2: Run the test to verify it fails**

Run: `node --test tests/public-assets-and-projects-pile.test.mjs`

Expected: FAIL because the hero has five cards and moves its enclosing collage.

**Step 3: Write the minimal implementation**

Adapt `portfolioPile` so each item supplies its Figma placement, card dimensions, z-layer, transform angle, hover transform, and delay. Use the available locally stored photo assets for cards and a small green accent card with no image for the Figma colour block. Render the cards with `photo.hoverClass` and transition classes. Leave the folder SVG, date badge, and location panel outside those transforms.

**Step 4: Run the test to verify it passes**

Run: `node --test tests/public-assets-and-projects-pile.test.mjs`

Expected: PASS.

**Step 5: Commit**

```bash
git add tests/public-assets-and-projects-pile.test.mjs 'src/app/[locale]/projects/page.tsx'
git commit -m "fix: pop projects photos out of folder"
```

### Task 2: Tighten Figma-aligned category controls

**Files:**
- Modify: `tests/project-chapter-grid.test.mjs:11-21`
- Modify: `src/components/site/ProjectChapterGrid.tsx:34-54`

**Step 1: Write the failing test**

Add source assertions for the smaller filter chip classes and the reduced vertical margin before the grid.

```js
assert.match(component, /px-3\.5 py-2 text-\[12px\]/);
assert.match(component, /<ul className="mt-6/);
```

**Step 2: Run the test to verify it fails**

Run: `node --test tests/project-chapter-grid.test.mjs`

Expected: FAIL because the controls use the larger current padding and `mt-10`/`sm:mt-14` grid spacing.

**Step 3: Write the minimal implementation**

Reduce the button to compact, legible padding and text size on all breakpoints. Reduce the filters-to-grid top margin while preserving the horizontal scroll container, accessible pressed state, and card layout.

**Step 4: Run the test to verify it passes**

Run: `node --test tests/project-chapter-grid.test.mjs`

Expected: PASS.

**Step 5: Commit**

```bash
git add tests/project-chapter-grid.test.mjs src/components/site/ProjectChapterGrid.tsx
git commit -m "fix: tighten projects category controls"
```

### Task 3: Verify the visual change without affecting unrelated behavior

**Files:**
- Verify only.

**Step 1: Run focused tests**

Run: `node --test tests/public-assets-and-projects-pile.test.mjs tests/project-chapter-grid.test.mjs`

Expected: PASS.

**Step 2: Run static checks**

Run separately: `npm run typecheck`, `npm run lint`, and `npm run build`.

Expected: every command exits 0.

**Step 3: Run browser verification**

At `/es/projects`, verify the initial stack is Figma-aligned; hovering it moves individual photos rather than the whole folder; reduced-motion keeps the composition static; category controls remain keyboard accessible and sit visibly closer to the project grid.

**Step 4: Review change boundaries**

Run: `git diff main...HEAD -- 'src/app/[locale]/projects/page.tsx' src/components/site/ProjectChapterGrid.tsx tests/public-assets-and-projects-pile.test.mjs tests/project-chapter-grid.test.mjs`

Expected: only hero interaction and filter-control changes appear.
