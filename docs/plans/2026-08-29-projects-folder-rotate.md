# Projects Folder Rotation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Give the projects hero folder a shared −2° Z-axis rotation.

**Architecture:** Rotate the existing folder layer wrapper, leaving the photo-card stack independent and preserving the front flap's X-axis hover hinge.

**Tech Stack:** Next.js, React, Tailwind CSS, Node.js tests.

---

### Task 1: Test and implement the shared rotation

**Files:**
- Modify: `tests/public-assets-and-projects-pile.test.mjs`
- Modify: `src/app/[locale]/projects/page.tsx:264-294`

**Step 1:** Add a failing structural test for a `-rotate-[2deg]` folder wrapper.

**Step 2:** Run `node --test tests/public-assets-and-projects-pile.test.mjs` and confirm failure.

**Step 3:** Add the rotation to the shared folder layer only.

**Step 4:** Rerun the focused test, then commit the source and test.

### Task 2: Verify and merge

**Step 1:** Run `node --test tests/*.mjs && npm run typecheck && npm run lint && npm run build`.

**Step 2:** Verify `/es/projects` hover keeps the front tab attached and flap hinging.

**Step 3:** Merge the verified branch into local `main` and rerun the checks.
