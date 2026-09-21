# Project Card Badge Containment Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Keep the NomadHer “Ver más” badge inside its project card instead of letting it appear over the chapter summary.

**Architecture:** Preserve the existing absolute badge and establish its nearest containing block on the shared card wrapper. Cover the contract with a focused source-level regression assertion consistent with the repository's existing tests.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Node.js test runner

---

### Task 1: Contain the project-card badge

**Files:**
- Modify: `tests/nomadher-figma.test.mjs`
- Modify: `src/components/site/chapter/ChapterProjectRail.tsx`

**Step 1: Write the failing test**

Add an assertion that matches the shared card class with `relative` before `group flex`:

```js
assert.match(rail, /"relative group flex min-h-\[540px\]/);
```

**Step 2: Run the test to verify it fails**

Run: `node --test tests/nomadher-figma.test.mjs`

Expected: FAIL because the card class starts with `group` and has no positioning context.

**Step 3: Write the minimal implementation**

Change the shared card class in `ChapterProjectRail.tsx` from:

```tsx
"group flex min-h-[540px] ..."
```

to:

```tsx
"relative group flex min-h-[540px] ..."
```

Do not change the badge markup, project links, or non-NomadHer card behavior.

**Step 4: Run focused verification**

Run: `node --test tests/nomadher-figma.test.mjs tests/chapter-project-rail.test.mjs tests/chapter-page.test.mjs`

Expected: PASS.

**Step 5: Run full verification**

Run: `npm run typecheck`, `npm run lint`, `npm run build`, and browser-check `http://localhost:3000/es/chapters/nomadher` at desktop and mobile widths.

Expected: all commands pass and the badge appears inside project cards only.

**Step 6: Commit**

```bash
git add docs/plans/2026-09-21-project-card-badge-containment-design.md docs/plans/2026-09-21-project-card-badge-containment.md tests/nomadher-figma.test.mjs src/components/site/chapter/ChapterProjectRail.tsx
git commit -m "fix: contain chapter project badge"
```
