# Home and Portfolio Feedback Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Apply the four outstanding home/projects feedback items while preserving the three already-correct behaviors.

**Architecture:** Keep the existing page call sites and section layout stable. Make narrow component-level changes, source local brand assets on the server, use the locale-aware navigation helper for the single approved project link, and express the Figma folder silhouette with existing Tailwind/CSS primitives.

**Tech Stack:** Next.js 16 App Router, React 19 server components, next/image, next-intl navigation, Tailwind CSS 4, Node test runner.

---

### Task 1: Restore the black WorkTogether badge

**Files:**
- Modify: `tests/home-visual-feedback.test.mjs`
- Modify: `src/components/site/WorkTogether.tsx:68`

**Step 1: Write the failing test**

Change the hand-badge assertions to require `bg-black` and reject the burgundy background utility.

**Step 2: Run test to verify it fails**

Run: `node --test tests/home-visual-feedback.test.mjs`
Expected: FAIL because the current badge is burgundy.

**Step 3: Write minimal implementation**

Replace only the badge background utility with `bg-black`.

**Step 4: Run test to verify it passes**

Run: `node --test tests/home-visual-feedback.test.mjs`
Expected: PASS.

**Step 5: Commit**

```bash
git add tests/home-visual-feedback.test.mjs src/components/site/WorkTogether.tsx
git commit -m "fix: restore black work together badge"
```

### Task 2: Render brand logos in the existing marquee

**Files:**
- Modify: `tests/home-marquee-social-icons.test.mjs`
- Modify: `src/components/site/FeatureProjectsMarquee.tsx`

**Step 1: Write the failing test**

Replace project-card expectations with assertions for `listPhotos("shared/brands")`, duplicated `logos`, empty alternative text, contained image sizing, and no project `Link` or title overlay. Preserve assertions for layout, dimensions, mask, pause behavior, and animation duration.

**Step 2: Run test to verify it fails**

Run: `node --test tests/home-marquee-social-icons.test.mjs`
Expected: FAIL because the component still renders linked project covers.

**Step 3: Write minimal implementation**

Import `listPhotos`, resolve the brand directory, return `null` when empty, duplicate the logo list, and render the existing tile shell with `<Image alt="" className="object-contain" />`. Keep `items: FeatureItem[]` in the prop type for call-site compatibility but omit it from destructuring.

**Step 4: Run focused tests**

Run: `node --test tests/home-marquee-social-icons.test.mjs tests/logo-marquee.test.mjs`
Expected: PASS.

**Step 5: Commit**

```bash
git add tests/home-marquee-social-icons.test.mjs src/components/site/FeatureProjectsMarquee.tsx
git commit -m "feat: show logos in home brand marquee"
```

### Task 3: Link the complete two-line Global Youth title

**Files:**
- Modify: `tests/favorite-projects-section.test.mjs`
- Modify: `src/components/site/FavoriteProjects.tsx`

**Step 1: Write the failing test**

Assert that the locale-aware `Link` is imported, `/work/global-youth-summit` appears exactly once, both localized title lines render as block spans in one link, hover and focus-visible utilities are present, and the other four labels remain paragraphs without hrefs.

**Step 2: Run test to verify it fails**

Run: `node --test tests/favorite-projects-section.test.mjs`
Expected: FAIL because all six current lines are independent paragraphs.

**Step 3: Write minimal implementation**

Separate the Global Youth two-line localized record from the remaining localized strings. Render one `Link` with two block spans, followed by the unchanged paragraph mapping. Preserve the surrounding typography and spacing classes.

**Step 4: Run test to verify it passes**

Run: `node --test tests/favorite-projects-section.test.mjs tests/home-visual-feedback.test.mjs`
Expected: PASS.

**Step 5: Commit**

```bash
git add tests/favorite-projects-section.test.mjs src/components/site/FavoriteProjects.tsx
git commit -m "feat: link global youth favorite project"
```

### Task 4: Match the Figma metadata folder

**Files:**
- Modify: `tests/projects-hero-and-work-chapters.test.mjs`
- Modify: `src/app/[locale]/projects/page.tsx:313`

**Step 1: Write the failing test**

Assert that the metadata wrapper has a dedicated `data-projects-folder="meta"` marker, a `data-projects-folder="meta-tab"` child behind it, a small rotation, and the existing burgundy fill, copy, separators, `z-50`, and responsive sizing.

**Step 2: Run test to verify it fails**

Run: `node --test tests/projects-hero-and-work-chapters.test.mjs`
Expected: FAIL because the current metadata block is a rounded rectangle without a tab or rotation.

**Step 3: Write minimal implementation**

Wrap the card in the existing positioned `z-50` container, add an absolutely positioned top-right burgundy tab behind the content, rotate the group about two degrees, and keep the current three-line content panel and separators intact.

**Step 4: Run focused project tests**

Run: `node --test tests/projects-hero-and-work-chapters.test.mjs tests/public-assets-and-projects-pile.test.mjs tests/projects-chapters-travel-collage.test.mjs`
Expected: PASS.

**Step 5: Commit**

```bash
git add tests/projects-hero-and-work-chapters.test.mjs 'src/app/[locale]/projects/page.tsx'
git commit -m "style: match projects metadata folder to figma"
```

### Task 5: Integrated verification

**Files:**
- Verify all changed production and test files.

**Step 1: Run full automated verification**

Run:

```bash
node --test tests/*.test.mjs
npm run typecheck
npm run lint
npm run build
```

Expected: all commands exit 0 with no failures.

**Step 2: Run browser verification**

Inspect `/es`, `/en`, and `/es/projects` at desktop and mobile widths. Confirm logo containment and animation, one two-line Global Youth link with visible hover/focus, the black badge, the metadata folder silhouette, centered travel collage, static category photos, and correct large-folder layering.

**Step 3: Review**

Run spec-compliance review, code-quality review, and a final whole-change review before merging.
