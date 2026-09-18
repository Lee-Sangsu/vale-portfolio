# WorkTogether Badge Color Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Render the WorkTogether hand badge with the exact approved `#7B173B` background.

**Architecture:** Keep the existing component structure and replace only the badge background utility. Update the existing source-level regression test before production code so the change follows a red-green cycle.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Node test runner.

---

### Task 1: Change the hand badge color

**Files:**
- Modify: `tests/home-visual-feedback.test.mjs:27-35`
- Modify: `src/components/site/WorkTogether.tsx:33-35,68`

**Step 1: Update the regression test**

Rename the badge test to describe the approved burgundy color. Require the hand badge class to contain `bg-[#7B173B]` and reject both `bg-black` and `bg-green`.

**Step 2: Run the focused test and confirm RED**

Run: `node --test tests/home-visual-feedback.test.mjs`

Expected: FAIL because the badge still uses `bg-black`.

**Step 3: Apply the minimal component change**

Replace `bg-black` with `bg-[#7B173B]` on the hand badge. Update the component comment from “black hand” to “burgundy hand.” Do not change any other class, markup, content, or behavior.

**Step 4: Run the focused test and confirm GREEN**

Run: `node --test tests/home-visual-feedback.test.mjs`

Expected: all focused tests pass.

**Step 5: Run full verification**

Run:

```bash
node --test tests/*.test.mjs
npm run lint
npm run typecheck
npm run build
```

Expected: all commands exit successfully.

**Step 6: Commit the implementation**

```bash
git add tests/home-visual-feedback.test.mjs src/components/site/WorkTogether.tsx
git commit -m "fix: update hand badge color"
```
