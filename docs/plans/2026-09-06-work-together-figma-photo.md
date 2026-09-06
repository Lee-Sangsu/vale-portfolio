# WorkTogether Figma Photo Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Render the approved Figma photo in every WorkTogether section with the hand badge overlapping its bottom-right corner.

**Architecture:** Commit the exact Figma image as a local public asset and make `WorkTogether` the single owner of that asset. Remove the obsolete `photo` prop and all page-level overrides so the visual stays consistent across routes.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Node.js test runner

---

### Task 1: Add a failing WorkTogether visual contract test

**Files:**
- Create: `tests/work-together.test.mjs`
- Modify: `package.json`

**Step 1: Write the failing test**

Add a Node test that reads `WorkTogether.tsx` and its call sites, then asserts:

- the component uses `/shared/portraits/work-together.png`;
- the badge uses `-right-5` and not `-left-5`;
- the component no longer declares a `photo` prop;
- no call site passes a `photo` override.

**Step 2: Run test to verify it fails**

Run: `npm run test:work-together`

Expected: FAIL because the shared asset path and bottom-right positioning are not implemented yet.

### Task 2: Add the exact Figma asset and update WorkTogether

**Files:**
- Create: `public/shared/portraits/work-together.png`
- Modify: `src/components/site/WorkTogether.tsx`
- Modify: `src/app/[locale]/about/page.tsx`
- Modify: `src/app/[locale]/projects/page.tsx`
- Modify: `src/app/[locale]/contact/page.tsx`
- Modify: `src/app/[locale]/work/[slug]/page.tsx`
- Modify: `src/app/[locale]/chapters/[slug]/page.tsx`
- Modify: `src/app/[locale]/page.tsx`

**Step 1: Download the source image**

Download the exact raster asset exported from Figma node `543:257` and save it as `public/shared/portraits/work-together.png`.

**Step 2: Implement the minimal component change**

Replace `src={photo}` with `src="/shared/portraits/work-together.png"`, remove the `photo` prop, and replace `-left-5` with `-right-5` on the absolute hand badge.

**Step 3: Remove page-level overrides**

Change each invocation to `<WorkTogether />` and remove imports or local values that become unused.

**Step 4: Run the focused test**

Run: `npm run test:work-together`

Expected: PASS.

### Task 3: Verify the completed change

**Files:**
- Verify all files changed above.

**Step 1: Run static checks**

Run: `npm run typecheck && npm run lint && npm run verify:assets && npm run build`

Expected: type-check, lint, and build pass. The known baseline `verify:assets` failure may remain only for the 16 pre-existing `Decoration.tsx` paths.

**Step 2: Run browser checks**

Open `/en/about` at desktop and mobile widths. Confirm the approved image fills the existing frame and the hand badge overlaps the bottom-right corner without clipping or horizontal overflow.

**Step 3: Commit only task files**

Stage the exact files changed by this task and commit them on `codex/work-together-figma-photo`.
