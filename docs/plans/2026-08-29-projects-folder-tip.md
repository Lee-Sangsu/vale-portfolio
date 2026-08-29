# Projects Folder Tip Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Put the projects hero folder tip on the front hinged flap so it remains visible in front of the photo stack and moves with the flap.

**Architecture:** Keep the existing rear panel as the back of the folder and move the single tab element into the existing front-flap element. The tab retains the shared transparent-gray fill and matches the front flap's dark outline. A structural test protects this DOM relationship without changing the photo-card animation.

**Tech Stack:** Next.js, React, Tailwind CSS, Node.js built-in test runner.

---

### Task 1: Protect the front-tab relationship

**Files:**
- Modify: `tests/public-assets-and-projects-pile.test.mjs`

**Step 1: Write the failing test**

Add assertions that the tab is nested after the front flap marker, is not nested in the back panel, and uses the front outline color.

**Step 2: Run test to verify it fails**

Run: `node --test tests/public-assets-and-projects-pile.test.mjs`

Expected: FAIL because the tab is still a child of the rear panel and has the rear outline color.

### Task 2: Move the tip into the front flap

**Files:**
- Modify: `src/app/[locale]/projects/page.tsx:247-282`

**Step 1: Implement the smallest change**

Remove the tab from the `data-projects-folder="back"` panel. Convert the front flap into an opening element and place the tab inside it, preserving its dimensions and transparent gray fill while using the flap's border color.

**Step 2: Run the focused test**

Run: `node --test tests/public-assets-and-projects-pile.test.mjs`

Expected: PASS.

**Step 3: Commit**

```bash
git add tests/public-assets-and-projects-pile.test.mjs 'src/app/[locale]/projects/page.tsx'
git commit -m "fix: move projects folder tip front"
```

### Task 3: Verify the UI and integrate

**Files:**
- Verify: `src/app/[locale]/projects/page.tsx`

**Step 1: Run project checks**

Run: `node --test tests/*.mjs && npm run typecheck && npm run lint && npm run build`

Expected: all checks pass.

**Step 2: Verify the hover interaction in the browser**

Open `/es/projects`, hover the hero folder, and confirm the tip is a child of the front flap and the flap still hinges at -14 degrees.

**Step 3: Merge after clean verification**

Merge the verified branch into the original local `main` checkout with a non-fast-forward merge, then re-run the project checks there.
