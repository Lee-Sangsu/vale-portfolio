# WorkTogether Half-Overlap Badge Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Anchor the WorkTogether hand badge at the bottom-left photo corner with half of the badge overlapping the photo.

**Architecture:** Retain the photo's existing `fill` and `object-cover` configuration. Replace fixed right/bottom offsets with a corner anchor plus percentage transforms, which remain correct when the badge changes size at the `sm` breakpoint.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Node.js test runner

---

### Task 1: Write the failing positioning regression test

**Files:**
- Modify: `tests/work-together.test.mjs`

**Step 1: Require the intended classes**

Update the hand-badge assertion to require `left-0`, `bottom-0`, `-translate-x-1/2`, and `translate-y-1/2`; assert that it does not use the old right-side or fixed-offset classes.

**Step 2: Verify red**

Run: `npm run test:work-together`

Expected: FAIL because the component still uses `-right-5 -bottom-5`.

### Task 2: Implement the responsive half-overlap

**Files:**
- Modify: `src/components/site/WorkTogether.tsx:67`

**Step 1: Apply the minimal class change**

Set the badge classes to `absolute left-0 bottom-0 -translate-x-1/2 translate-y-1/2` while preserving its size, color, shape, shadow, and content.

**Step 2: Verify green**

Run: `npm run test:work-together`

Expected: PASS.

### Task 3: Verify visual integration

**Files:**
- Verify: `src/components/site/WorkTogether.tsx`

**Step 1: Run static verification**

Run: `npm run typecheck && npm run lint && npm run build`

Expected: all commands exit successfully.

**Step 2: Check desktop and mobile**

Open `/en/about` at 1280×720 and 390×844. Confirm the photo fills its frame and the badge overlaps half of its width and height at the frame's bottom-left corner.
