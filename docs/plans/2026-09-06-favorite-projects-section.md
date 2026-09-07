# Favorite Projects Section Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add the Figma-matched Favorite Projects section immediately after the home-page “I design for” panel, with English and Spanish copy.

**Architecture:** Create a small server component that owns the fixed, locale-aware labels and responsive layout. Store the two exported Figma photographs under `public/` and render them with `next/image`; mount the component in the locale home page directly after the existing rotating-heading section.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Node test runner.

---

### Task 1: Add a regression test for the new section

**Files:**
- Create: `tests/favorite-projects-section.test.mjs`
- Modify: none

**Step 1: Write the failing test**

Create a source-level test that asserts the component exists, includes both localized headings (`Fav projects` and `Proyectos favoritos`), renders the six Figma project labels, and is positioned after the `Designing for` section in `src/app/[locale]/page.tsx`.

**Step 2: Run test to verify it fails**

Run: `node --test tests/favorite-projects-section.test.mjs`

Expected: FAIL because the component and insertion do not exist.

**Step 3: Commit the failing test**

```bash
git add tests/favorite-projects-section.test.mjs
git commit -m "test: cover favorite projects section"
```

### Task 2: Add local Figma image assets and the component

**Files:**
- Create: `public/pages/home/favorite-projects/city-photo.png`
- Create: `public/pages/home/favorite-projects/workshop-photo.png`
- Create: `src/components/site/FavoriteProjects.tsx`

**Step 1: Add the exported Figma photographs**

Download the exact two images surfaced by Figma node `543:3`, preserve their source bytes, and commit them under the dedicated home-page asset directory.

**Step 2: Implement the minimal component**

Create a locale-aware server component with:

```tsx
export function FavoriteProjects({ locale }: { locale: Locale }) {
  const es = locale === "es";
  // Render the translated title, two rotated local photos, and list.
}
```

Match the Figma desktop layout using a constrained two-column grid: left heading plus two overlapping 360×300/340×300 photos, and right-aligned six-line uppercase project list. On small screens, stack heading, image collage, and list without clipping.

**Step 3: Run the targeted test**

Run: `node --test tests/favorite-projects-section.test.mjs`

Expected: PASS.

**Step 4: Commit implementation**

```bash
git add public/pages/home/favorite-projects/city-photo.png public/pages/home/favorite-projects/workshop-photo.png src/components/site/FavoriteProjects.tsx
git commit -m "feat: add favorite projects section"
```

### Task 3: Mount and verify the section

**Files:**
- Modify: `src/app/[locale]/page.tsx`

**Step 1: Mount the component at the confirmed call site**

Import `FavoriteProjects` and render `<FavoriteProjects locale={locale} />` directly after the `Designing for` section and before `WorkChapters`, preserving every surrounding section.

**Step 2: Run focused checks**

Run:

```bash
node --test tests/favorite-projects-section.test.mjs
npm run lint
npm run typecheck
```

Expected: all pass.

**Step 3: Verify the visual result**

Run the local app and inspect `/en` and `/es` at desktop and mobile widths. Confirm the image overlap, typography, order, translated Spanish copy, and responsive stacking.

**Step 4: Commit the mount**

```bash
git add src/app/[locale]/page.tsx
git commit -m "feat: show favorite projects on home"
```
