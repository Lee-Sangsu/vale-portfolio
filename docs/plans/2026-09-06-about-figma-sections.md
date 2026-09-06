# About Figma Sections Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the About page Skills and Journey sections match Figma nodes `543:230` and `543:316` precisely while preserving localization and applicable links.

**Architecture:** Keep both sections as server components and define their Figma-specific localized display data beside the rendering code. Reuse the project's Inter/font and color utility tokens, `next/image`, and localized `Link`; store the Figma portrait under the existing About asset directory.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, next-intl navigation, Node test runner.

---

### Task 1: Add exact-content regression coverage

**Files:**
- Create: `tests/about-figma-sections.test.mjs`

1. Write assertions for the exact Skills heading, intro, four titles/descriptions, and language footer.
2. Assert the old accordion and iPod composition is absent.
3. Write assertions for the exact Journey heading, intro, six roles, company names, dates, and portrait path.
4. Run `node --test tests/about-figma-sections.test.mjs` and confirm it fails because the Figma content is not implemented.

### Task 2: Implement the Skills node

**Files:**
- Modify: `src/components/site/about/SkillsSection.tsx`

1. Replace the accordion data and decorative components with localized static display data.
2. Implement the exact desktop typography, widths, spacing, dividers, and footer from node `543:230`.
3. Add a narrow-screen flow without changing the content hierarchy.
4. Run the content test and confirm the Skills assertions pass.

### Task 3: Implement the Journey node and portrait

**Files:**
- Modify: `src/components/site/about/JourneySection.tsx`
- Create: `public/pages/about/figma/journey-portrait.jpg`

1. Copy the exact exported Figma portrait into the About asset directory.
2. Define localized display data in the six-row Figma order, retaining matching existing case-study links.
3. Implement exact desktop positions, typography, row dimensions, dividers, image size, radius, and shadow from node `543:316`.
4. Add a compact responsive flow for narrower viewports.
5. Run the content test and confirm all assertions pass.

### Task 4: Verify the page

**Files:**
- Verify: `src/components/site/about/SkillsSection.tsx`
- Verify: `src/components/site/about/JourneySection.tsx`

1. Run `npm run typecheck`.
2. Run `npm run lint`.
3. Run `npm run verify:assets`.
4. Run `npm run build`.
5. Start the app and inspect `/en/about` at 1600px desktop and a mobile viewport, comparing the two sections with the Figma screenshots.
6. Review the scoped diff and commit only the touched plan, test, component, and asset paths.
