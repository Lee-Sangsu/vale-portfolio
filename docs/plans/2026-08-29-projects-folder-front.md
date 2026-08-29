# Projects Folder Front and Travel Card Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Place the front folder panel in front of the popped-out photos and shrink the hero travel card to its content width.

**Architecture:** Keep the existing title, photo-card, rear folder, and badge layers. Raise only the front-flap wrapper above the highest photo z-index but below the detail badges, so the photos remain above the heading yet are visually held inside the folder. Replace the travel card's responsive fixed-width expression with `w-fit`, retaining its no-wrap route label and padding.

**Tech Stack:** Next.js App Router, React JSX, Tailwind CSS v4, Node's built-in test runner.

---

### Task 1: Capture the front-panel and fit-content requirements

**Files:**
- Modify: `tests/public-assets-and-projects-pile.test.mjs`
- Modify: `src/app/[locale]/projects/page.tsx:277-290`

**Step 1: Write the failing test**

Assert that the front flap wrapper uses `z-[45]` rather than `z-10`, and that the travel card uses `w-fit` rather than `w-[min(45vw,340px)]`.

**Step 2: Run test to verify it fails**

Run: `node --test tests/public-assets-and-projects-pile.test.mjs`

Expected: FAIL because the front flap remains below the photos and the travel card still has a responsive width expression.

**Step 3: Implement the minimal JSX/CSS change**

Change only the front-flap wrapper z-index to `z-[45]`. Change only the travel card width utility to `w-fit`; leave its position, text layout, and padding untouched.

**Step 4: Run test to verify it passes**

Run: `node --test tests/public-assets-and-projects-pile.test.mjs`

Expected: PASS.

**Step 5: Commit**

```bash
git add src/app/[locale]/projects/page.tsx tests/public-assets-and-projects-pile.test.mjs
git commit -m "fix: layer projects folder front"
```

### Task 2: Verify rendering and merge locally

**Files:**
- Verify: `src/app/[locale]/projects/page.tsx`

**Step 1: Run full automated verification**

Run: `node --test tests/*.mjs && npm run typecheck && npm run lint && npm run build`

Expected: all checks pass.

**Step 2: Verify the hero in `/es/projects`**

Hover the photo pile. Confirm a photo is above the title while the front flap is above that photo, and confirm the travel card's rendered width is content-sized.

**Step 3: Merge the verified branch into local `main`**

Merge without including unrelated user working-tree changes, then remove the temporary worktree and branch.
