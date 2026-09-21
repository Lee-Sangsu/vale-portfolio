# About Figma Refresh Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Match the approved story copy and sneak-peek gallery to Figma for English and Spanish About routes.

**Architecture:** Keep the existing server components and Tailwind styling. Model story copy as localized React content with explicit emphasis, and model the gallery as a small static asset/style manifest rendered by `SneakPeek`.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Node test runner, Next Image.

---

### Task 1: Add regression coverage

**Files:**
- Create: `tests/about-figma-refresh.test.mjs`

**Step 1: Write failing story tests**

Assert that `MyStory.tsx` contains the approved Spanish narrative, its English translation, and explicit bold emphasis rather than the old `aboutLong` concatenation.

**Step 2: Write failing gallery tests**

Assert that `SneakPeek.tsx` defines six local Figma assets, renders plain images, and no longer imports project hero data or renders project links.

**Step 3: Verify RED**

Run: `node --test tests/about-figma-refresh.test.mjs`

Expected: FAIL because the existing components still use `aboutLong`, `heroes`, and linked project cards.

**Step 4: Commit tests**

Stage only `tests/about-figma-refresh.test.mjs` and commit the failing specification.

### Task 2: Implement localized story copy

**Files:**
- Modify: `src/components/site/about/MyStory.tsx`

**Step 1: Add localized structured copy**

Define three paragraphs per locale with explicit `<strong>` spans matching the Figma emphasis. Use the exact Spanish text and a faithful English translation.

**Step 2: Render the copy in both responsive layouts**

Reuse one story-copy renderer in mobile and desktop variants. Match Figma's paragraph breaks and preserve existing collage geometry.

**Step 3: Verify the story assertions become green**

Run: `node --test tests/about-figma-refresh.test.mjs`

Expected: gallery assertions still fail; story assertions pass.

**Step 4: Commit**

Stage `MyStory.tsx` and the test file, then commit.

### Task 3: Implement the Figma gallery

**Files:**
- Modify: `src/components/site/about/SneakPeek.tsx`
- Create: `public/pages/about/figma/sneak-peek-01.png`
- Create: `public/pages/about/figma/sneak-peek-02.png`
- Create: `public/pages/about/figma/sneak-peek-03.png`
- Create: `public/pages/about/figma/sneak-peek-04.png`
- Create: `public/pages/about/figma/sneak-peek-05.png`
- Create: `public/pages/about/figma/sneak-peek-06.png`

**Step 1: Download exact assets**

Download the six temporary Figma asset URLs returned for node `523:1480` and save them under the local paths above.

**Step 2: Replace project cards with a static gallery manifest**

Remove `Link`, hero data, labels, dates, and titles. Render six `Image` elements with the Figma widths, heights, crops, radius, shadow, and bottom alignment; retain horizontal scrolling below desktop.

**Step 3: Verify GREEN**

Run: `node --test tests/about-figma-refresh.test.mjs`

Expected: PASS.

**Step 4: Commit**

Stage only the gallery component, six assets, and test; commit.

### Task 4: Verify and visually inspect

**Files:**
- Modify only if verification reveals an implementation defect.

**Step 1: Run automated verification**

Run `npm run typecheck`, `npm run lint`, `npm run test:work-together`, `node --test tests/about-figma-refresh.test.mjs`, and `npm run build`.

**Step 2: Start the app and inspect English**

Open `/en/about` at desktop and mobile widths. Confirm translated story paragraphs, bold emphasis, six-image gallery geometry, horizontal mobile scrolling, and absence of labels/titles.

**Step 3: Inspect Spanish**

Open `/es/about` and confirm the exact Figma Spanish narrative and the same gallery behavior.

**Step 4: Final review and commit fixes**

Resolve any defects, rerun the affected verification, and commit only touched paths.
