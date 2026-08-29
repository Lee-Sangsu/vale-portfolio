# Projects Hero Layering Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Let every popped-out projects hero photo overlap the `PORTAfolio` title while the folder remains a translucent gray two-panel holder.

**Architecture:** Remove the `z-0` stacking context from the photo-pile group so the photo figures can layer above the title. Assign every photo figure a z-index above the heading, place the folder back and front layers beneath the photos, and give both folder panels a neutral gray 35%-opaque fill while keeping their outlines and existing front-flap hinge.

**Tech Stack:** Next.js App Router, React JSX, Tailwind CSS v4, Node's built-in test runner.

---

### Task 1: Specify hero layering and translucent folder behavior

**Files:**
- Modify: `tests/public-assets-and-projects-pile.test.mjs`
- Modify: `src/app/[locale]/projects/page.tsx:119-190,238-283`

**Step 1: Write the failing test**

Assert that the photo pile group no longer uses `z-0`, all eight photo descriptors use z-indexes above the heading, the front flap stays below those cards, and the back, tab, and flap include a 35%-opaque neutral gray background.

**Step 2: Run test to verify it fails**

Run: `node --test tests/public-assets-and-projects-pile.test.mjs`

Expected: FAIL because the current group creates a z-index stacking context and the folder panels are transparent.

**Step 3: Implement the minimal JSX/CSS change**

Remove the group-level z-index, raise the lone lower-z photo card, set the flap below the cards, and apply the shared `bg-[#737373]/35` treatment to the folder shell, tab, and flap. Keep current transforms, timing, and reduced-motion behavior unchanged.

**Step 4: Run test to verify it passes**

Run: `node --test tests/public-assets-and-projects-pile.test.mjs`

Expected: PASS.

**Step 5: Commit**

```bash
git add src/app/[locale]/projects/page.tsx tests/public-assets-and-projects-pile.test.mjs
git commit -m "fix: raise projects hero photos"
```

### Task 2: Verify rendering and merge locally

**Files:**
- Verify: `src/app/[locale]/projects/page.tsx`

**Step 1: Run full automated verification**

Run: `node --test tests/*.mjs && npm run typecheck && npm run lint && npm run build`

Expected: all checks pass.

**Step 2: Verify the hover state in `/es/projects`**

Confirm the cards overlap the title during hover, both folder panels have transparent gray fills, and the front flap retains its −14° hinge.

**Step 3: Merge the verified branch into local `main`**

Merge without including unrelated user working-tree changes, then remove the temporary worktree and branch.
