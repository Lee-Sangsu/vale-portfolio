# Projects Folder Dark Uniform Outline Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the projects hero folder darker, remove its raised tip, and use an equal-width border on every side of the front flap.

**Architecture:** Keep the existing two-layer JSX folder and its hover animation. Change only the folder panel styling and remove the tab-specific DOM nodes, while protecting the approved contract with the existing source-level Node test.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Node test runner

---

### Task 1: Lock the revised folder contract

**Files:**
- Modify: `tests/public-assets-and-projects-pile.test.mjs:56-66`

**Step 1: Write the failing test**

Replace the assertions that require the old tab, split top outlines, and partial border. Require both panels to use `bg-[#525252]/45`, require the flap to use `border border-[#090809]`, and assert that `data-projects-folder="tab"`, `top-outline-left`, `top-outline-right`, `border-x`, and `border-b` are absent from the flap markup.

**Step 2: Run the focused test to verify it fails**

Run: `node --test tests/public-assets-and-projects-pile.test.mjs`

Expected: FAIL because the source still contains the lighter fill, raised tab, split outlines, and partial border utilities.

### Task 2: Implement the darker continuous folder

**Files:**
- Modify: `src/app/[locale]/projects/page.tsx:262-308`
- Test: `tests/public-assets-and-projects-pile.test.mjs`

**Step 1: Write the minimal implementation**

Change the rear panel and front flap fill to `bg-[#525252]/45`. Replace `border-x border-b` on the flap with `border`. Delete the tab and both top-outline elements without changing the wrapper, transforms, animation, stacking, or dimensions.

**Step 2: Run the focused test**

Run: `node --test tests/public-assets-and-projects-pile.test.mjs`

Expected: PASS.

**Step 3: Run repository verification**

Run: `node --test tests/*.test.mjs`

Expected: all tests pass.

Run: `npm run typecheck`

Expected: exit 0.

Run: `npm run lint`

Expected: exit 0.

Run: `npm run build`

Expected: exit 0.

**Step 4: Verify visually**

Inspect `/es/projects` at desktop and mobile widths. Confirm both gray panels are visibly darker, the tab is gone, the front flap has a uniform outline, and the photo pile plus hover hinge still behave as before.

**Step 5: Commit**

```bash
git add 'src/app/[locale]/projects/page.tsx' tests/public-assets-and-projects-pile.test.mjs
git commit -m "style: darken projects folder outline"
```
