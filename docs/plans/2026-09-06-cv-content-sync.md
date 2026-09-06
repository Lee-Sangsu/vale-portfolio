# CV Content Sync Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Synchronize the portfolio's bilingual professional details with the latest Figma CV while preserving its existing responsive visual system.

**Architecture:** Store CV-derived profile information as typed bilingual data in `src/content/about.ts`, then let the existing About components and one new semantic credentials component render it. Keep the portfolio's current Tailwind tokens, imagery, navigation, and page structure; add only responsive content blocks that wrap naturally on mobile.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Node test runner

---

### Task 1: Define the CV-aligned bilingual content contract

**Files:**
- Create: `tests/cv-content-sync.test.mjs`
- Modify: `src/content/about.ts`

**Step 1: Write the failing test**

Add source-contract assertions covering the latest Figma facts: product/strategy/business-growth positioning, NomadHer and BOOST LAB titles and dates, the 21–23% retention and 1.3M-view metrics, education and thesis, three languages, five recognitions, and AI/Mailjet capabilities.

**Step 2: Run the test to verify it fails**

Run: `node --test tests/cv-content-sync.test.mjs`

Expected: FAIL because the structured CV-derived exports do not exist yet.

**Step 3: Write the minimal implementation**

Add typed exports in `src/content/about.ts`:

```ts
export const professionalPositioning: LocalizedString = { en: "…", es: "…" };
export const professionalSkills: Localized<LocalizedString[]> = { en: […], es: […] };
export const journeyRoles = [{ role: { en: "…", es: "…" }, company: "…", date: "…", href: "…" }];
export const credentials = {
  education: { title: { en: "…", es: "…" }, institution: "…", context: { en: "…", es: "…" }, date: "2021–2026", thesis: { en: "…", es: "…" } },
  recognitions: { en: […], es: […] },
  languages: { en: […], es: […] },
  methods: ["Figma", "Illustrator", "Canva", "CapCut", "Notion", "ManyChat", "Mailjet", "Design systems", "User research", "AI-assisted design", "AI prototyping"]
};
```

Update `aboutShort` and the relevant `aboutLong` paragraph to match the latest Figma biography without duplicating the full CV.

**Step 4: Run the test to verify it passes**

Run: `node --test tests/cv-content-sync.test.mjs`

Expected: PASS.

**Step 5: Commit**

```bash
git add tests/cv-content-sync.test.mjs src/content/about.ts
git commit -m "content: sync portfolio profile with CV"
```

### Task 2: Render the updated positioning, skills, and journey

**Files:**
- Modify: `tests/cv-content-sync.test.mjs`
- Modify: `src/components/site/about/AboutHero.tsx`
- Modify: `src/components/site/about/SkillsSection.tsx`
- Modify: `src/components/site/about/JourneySection.tsx`

**Step 1: Extend the failing test**

Assert that all three components import the shared CV-aligned exports, that journey data is no longer duplicated locally, and that responsive classes retain single-column mobile layouts with breakpoint-only grids.

**Step 2: Run the test to verify it fails**

Run: `node --test tests/cv-content-sync.test.mjs`

Expected: FAIL because the components still contain local copy and role data.

**Step 3: Write the minimal implementation**

- Render `professionalPositioning[locale]` in the About hero.
- Build the skills accordion from `professionalSkills[locale]` while retaining the current component and visual styling.
- Render the journey list from `journeyRoles`, preserving its existing mobile-first stacking and desktop alignment.

**Step 4: Run the test to verify it passes**

Run: `node --test tests/cv-content-sync.test.mjs`

Expected: PASS.

**Step 5: Commit**

```bash
git add tests/cv-content-sync.test.mjs src/components/site/about/AboutHero.tsx src/components/site/about/SkillsSection.tsx src/components/site/about/JourneySection.tsx
git commit -m "feat: surface current professional profile"
```

### Task 3: Add responsive credentials to the About page

**Files:**
- Modify: `tests/cv-content-sync.test.mjs`
- Create: `src/components/site/about/CredentialsSection.tsx`
- Modify: `src/app/[locale]/about/page.tsx`

**Step 1: Extend the failing test**

Assert that the credentials component uses semantic section headings and lists, reads shared bilingual data, has no fixed content height, uses a mobile-first one-column layout, and is rendered on the About page after the journey.

**Step 2: Run the test to verify it fails**

Run: `node --test tests/cv-content-sync.test.mjs`

Expected: FAIL because the credentials section does not exist.

**Step 3: Write the minimal implementation**

Create `CredentialsSection` using existing `font-inter`, `text-ink2`, `text-muted`, `border-win-border`, `bg-white`, and responsive spacing tokens. Present education, thesis, recognitions, languages, and methods in semantic lists that stack on mobile and form a two-column desktop grid.

Insert it after `JourneySection` in the About page, leaving every existing section and interaction in place.

**Step 4: Run the test to verify it passes**

Run: `node --test tests/cv-content-sync.test.mjs`

Expected: PASS.

**Step 5: Commit**

```bash
git add tests/cv-content-sync.test.mjs src/components/site/about/CredentialsSection.tsx src/app/[locale]/about/page.tsx
git commit -m "feat: add responsive portfolio credentials"
```

### Task 4: Localize professional chapter details precisely

**Files:**
- Modify: `tests/chapter-details.test.mjs`
- Modify: `src/content/chapter-details.ts`

**Step 1: Write the failing test**

Assert that chapter-detail content uses explicit Spanish and English values instead of copying Spanish into both locales. Cover the current Figma role titles, dates, and representative metrics for all six professional chapters.

**Step 2: Run the test to verify it fails**

Run: `node --test tests/chapter-details.test.mjs`

Expected: FAIL because the current `copy` helper assigns Spanish text to both locales.

**Step 3: Write the minimal implementation**

Replace the single-language helper with an explicit `bilingual(es, en)` helper and translate every chapter intro, role, impact label, responsibility, and project label/description. Preserve project routes, images, accents, metrics, and content structure.

**Step 4: Run the test to verify it passes**

Run: `node --test tests/chapter-details.test.mjs`

Expected: PASS.

**Step 5: Commit**

```bash
git add tests/chapter-details.test.mjs src/content/chapter-details.ts
git commit -m "content: localize professional chapter details"
```

### Task 5: Verify responsive and production behavior

**Files:**
- Modify only if verification exposes a defect in the files above.

**Step 1: Run all automated checks**

Run:

```bash
node --test tests/*.test.mjs
npm run typecheck
npm run lint
npm run build
```

Expected: every command exits 0.

**Step 2: Run browser checks**

Start the local app and inspect `/es/about` and `/en/about` at approximately 390px and 1440px widths. Confirm no horizontal overflow, clipped text, overlap, inaccessible headings, or regressions in the existing hero/navigation/sections.

**Step 3: Review the final diff**

Run: `git diff main...HEAD --check` and `git diff --stat main...HEAD`.

Expected: no whitespace errors and changes limited to the approved design/content/test files.

**Step 4: Commit verification fixes if needed**

Stage only affected files and commit with a scoped fix message.
