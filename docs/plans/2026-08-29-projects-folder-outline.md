# Projects Folder Outline Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the projects hero read as a transparent, two-sided folder that visibly contains the photo pile and opens its front panel outward.

**Architecture:** Retain the existing JSX back panel, tab, photo-card pile, and stacking order. Convert the back and front folder panels to transparent single-pixel outlines, remove visual fill/shadow details, and reverse the front panel's bottom-origin 3D rotation to `-14deg` so it folds outward toward the viewer.

**Tech Stack:** Next.js App Router, React JSX, Tailwind CSS v4, Node's built-in test runner.

---

### Task 1: Specify the transparent two-panel folder contract

**Files:**
- Modify: `tests/public-assets-and-projects-pile.test.mjs`
- Modify: `src/app/[locale]/projects/page.tsx:249-294`

**Step 1: Write the failing test**

Require JSX back and front folder layers, transparent backgrounds on both, one-pixel black outlines, and a `group-hover:rotate-x-[-14deg]` front-panel motion. Assert the old positive hinge angle and filled gradient classes are absent.

**Step 2: Run test to verify it fails**

Run: `node --test tests/public-assets-and-projects-pile.test.mjs`

Expected: FAIL because the current folder uses opaque gradient fills and a positive X rotation.

**Step 3: Implement the minimal JSX/CSS change**

Keep the rear panel and tab as an outline-only silhouette behind the photos. Make the front flap outline-only, remove internal decorative seams, preserve its bottom transform origin and 200ms ease-in transition, and change its hover rotation from `14deg` to `-14deg`.

**Step 4: Run test to verify it passes**

Run: `node --test tests/public-assets-and-projects-pile.test.mjs`

Expected: PASS.

**Step 5: Commit**

```bash
git add src/app/[locale]/projects/page.tsx tests/public-assets-and-projects-pile.test.mjs
git commit -m "fix: outline projects folder panels"
```

### Task 2: Verify rendering and merge locally

**Files:**
- Verify: `src/app/[locale]/projects/page.tsx`

**Step 1: Run full automated verification**

Run: `node --test tests/*.mjs && npm run typecheck && npm run lint && npm run build`

Expected: all checks pass.

**Step 2: Verify the hover state in `/es/projects`**

Confirm the back outline, front outline, and photos are separately visible; on hover, verify the front panel rotates `-14deg` and photo-card transforms remain active.

**Step 3: Merge the verified branch into local `main`**

Merge without including unrelated user working-tree changes, then remove the temporary worktree and branch.
