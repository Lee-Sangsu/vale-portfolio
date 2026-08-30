# My Story Preserve Photo Scale Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Keep the short desktop My Story section while restoring the collage photos to their original, unshrunk scale and retaining the mobile layout.

**Architecture:** The existing `1710 / 1000` outer desktop canvas continues to place the title and copy. Its photo layer becomes a separate, bottom-anchored `1710 / 1219` coordinate canvas, allowing its percentage-based frames to use their original dimensions and rise behind the text. Mobile remains in the existing `lg:hidden` grid and is not modified.

**Tech Stack:** Next.js, React, Tailwind CSS, Node.js test runner.

---

### Task 1: Restore the desktop photo coordinate canvas

**Files:**
- Modify: `src/components/site/about/MyStory.tsx:108`
- Modify: `tests/my-story-collage.test.mjs:46-47`

**Step 1: Write the failing test**

Replace the assertion for the desktop photo-layer wrapper with the expected original-scale, bottom-anchored class:

```js
assert.match(
  component,
  /<div aria-hidden="true" className="absolute inset-x-0 bottom-0 aspect-\[1710\/1219\]">/,
);
```

Keep the assertion requiring the outer desktop canvas to remain `lg:aspect-[1710/1000]`.

**Step 2: Run test to verify it fails**

Run: `node --test tests/my-story-collage.test.mjs`

Expected: FAIL because the photo layer still uses `absolute inset-0` and therefore inherits the shortened canvas height.

**Step 3: Write minimal implementation**

Change only the desktop photo-layer wrapper in `MyStory`:

```tsx
<div
  aria-hidden="true"
  className="absolute inset-x-0 bottom-0 aspect-[1710/1219]"
>
```

Do not change the outer `lg:aspect-[1710/1000]` wrapper, any image asset, `StoryPhoto`, photo-frame percentage, text placement, or the mobile grid.

**Step 4: Run test to verify it passes**

Run: `node --test tests/my-story-collage.test.mjs`

Expected: PASS, 3 tests with 0 failures.

**Step 5: Visually verify responsive behavior**

Run the local development server and inspect:

- `/en/about` at a 1280px-wide viewport: the section stays short, each photo keeps its original scale, the collage is raised, the lower edge remains clipped to one section bottom, and title/copy remain above the photos.
- `/en/about` at a mobile-width viewport: the existing two-column grid remains unchanged.

**Step 6: Run complete verification**

Run:

```bash
node --test tests/*.test.mjs
npm run lint
npm run typecheck
npm run build
```

Expected: all commands exit 0.

**Step 7: Commit**

```bash
git add src/components/site/about/MyStory.tsx tests/my-story-collage.test.mjs
git commit -m "fix: preserve my story photo scale"
```
