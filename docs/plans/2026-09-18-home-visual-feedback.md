# Home Visual Feedback Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Apply the approved favorite-project alignment and spacing, black contact badge, and non-clickable category photos while preserving unrelated homepage behavior.

**Architecture:** Keep all three existing components and make localized JSX/class changes at the confirmed implementation sources. Add source-level Node regression tests that fail on the current markup and pass only when the requested contracts are present.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Node test runner.

---

### Task 1: Add failing regression coverage

**Files:**
- Create: `tests/home-visual-feedback.test.mjs`

**Step 1: Write tests for each requested behavior**

Read the three component sources and assert:

- `FavoriteProjects` uses `lg:items-center`, not `lg:items-start`, and its list uses `space-y-4` with an increased large-screen value;
- the WorkTogether hand badge includes `bg-black` and no longer includes `bg-green`;
- the mapped CategoryShowcase photo cards render as `div` elements, not `Link` elements, while the `/projects` call-to-action remains linked.

**Step 2: Run the targeted test and confirm RED**

Run: `node --test tests/home-visual-feedback.test.mjs`

Expected: FAIL because the current components still use top alignment, the green badge, and photo links.

**Step 3: Commit the failing test**

```bash
git add tests/home-visual-feedback.test.mjs
git commit -m "test: cover homepage visual feedback"
```

### Task 2: Apply the scoped component changes

**Files:**
- Modify: `src/components/site/FavoriteProjects.tsx:26-57`
- Modify: `src/components/site/WorkTogether.tsx:68-70`
- Modify: `src/components/site/CategoryShowcase.tsx:87-107`

**Step 1: Update FavoriteProjects**

Change the desktop grid alignment from `lg:items-start` to `lg:items-center`. Increase the list spacing to `space-y-4 lg:space-y-6`, preserving typography, text alignment, content, and mobile stacking.

**Step 2: Update WorkTogether**

Replace only the badge's `bg-green` utility with `bg-black`.

**Step 3: Update CategoryShowcase**

Replace the per-photo `Link` wrapper with a `div`. Remove `href`, `aria-label`, `group`, and link-only hover/focus utilities. Keep keys, dimensions, overlap, rounding, background, shadow, z-index, image source, fade animation, object fit, and the separate `/projects` link unchanged.

**Step 4: Run the targeted test and confirm GREEN**

Run: `node --test tests/home-visual-feedback.test.mjs`

Expected: PASS.

**Step 5: Commit the implementation**

```bash
git add src/components/site/FavoriteProjects.tsx src/components/site/WorkTogether.tsx src/components/site/CategoryShowcase.tsx
git commit -m "fix: apply homepage visual feedback"
```

### Task 3: Verify the full change

**Files:**
- Modify: none unless verification reveals a scoped defect

**Step 1: Run automated checks**

Run:

```bash
node --test tests/*.test.mjs
npm run lint
npm run typecheck
npm run build
```

Expected: all commands exit successfully.

**Step 2: Verify in the browser**

Inspect `/en` and `/es` at desktop and mobile widths. Confirm the list alignment and gaps, black hand badge, unchanged responsive layout, and that CategoryShowcase photos are not anchors while the all-projects link still works.

**Step 3: Review the final diff**

Confirm no copy, content data, image sources, form behavior, category selection behavior, or unrelated component classes changed.
