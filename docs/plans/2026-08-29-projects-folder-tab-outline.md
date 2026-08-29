# Projects Folder Tab Outline Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the projects hero folder tab sit in the front folder outline without a horizontal border crossing beneath it.

**Architecture:** Keep the tab nested in the hinged front flap. Replace the flap's single top border with two JSX stroke segments placed on either side of the tab, so the front folder outline visibly joins the tab without obscuring its transparent gray face.

**Tech Stack:** Next.js, React, Tailwind CSS, Node.js built-in test runner.

---

### Task 1: Protect the gap beneath the front folder tab

**Files:**
- Modify: `tests/public-assets-and-projects-pile.test.mjs`

**Step 1: Write the failing test**

Require the front flap to omit `border-t` and assert that it contains exactly two named top-outline segments around the tab.

**Step 2: Run the focused test**

Run: `node --test tests/public-assets-and-projects-pile.test.mjs`

Expected: FAIL because the front flap currently uses a continuous border and has no split outline segments.

### Task 2: Render the segmented front outline

**Files:**
- Modify: `src/app/[locale]/projects/page.tsx:270-285`

**Step 1: Implement the smallest change**

Change the front flap to side-and-bottom borders only. Add two non-interactive JSX elements at its top edge: one between the left corner and the tab, and one between the tab and the right corner. Keep the tab's geometry, transparent-gray color, and flap hinge unchanged.

**Step 2: Run the focused test**

Run: `node --test tests/public-assets-and-projects-pile.test.mjs`

Expected: PASS.

**Step 3: Commit**

```bash
git add tests/public-assets-and-projects-pile.test.mjs 'src/app/[locale]/projects/page.tsx'
git commit -m "fix: join projects folder tab outline"
```

### Task 3: Verify and integrate

**Files:**
- Verify: `src/app/[locale]/projects/page.tsx`

**Step 1: Run full checks**

Run: `node --test tests/*.mjs && npm run typecheck && npm run lint && npm run build`

Expected: all checks pass.

**Step 2: Verify the browser hover state**

Open `/es/projects`, hover the folder, and verify the tab remains on the front flap with no continuous top stroke behind it.

**Step 3: Merge after clean verification**

Merge the branch into the original local `main` checkout with a non-fast-forward merge and rerun full checks there.
