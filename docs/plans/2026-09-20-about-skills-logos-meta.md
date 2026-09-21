# About Skills Logos and Metadata Implementation Plan

> **For Codex:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Restore the About Skills tool-logo row with mobile-only motion and move the former About hero paragraph into page metadata while showing the approved short tagline.

**Architecture:** Add one Skills-specific presentational component and scoped CSS so existing shared logo rows remain unchanged. Keep localized copy in `content/about.ts`, render the short value in the hero, and generate route metadata from the existing long positioning text.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Node test runner.

---

### Task 1: Skills logo row

**Files:**
- Create: `src/components/site/about/SkillsLogoMarquee.tsx`
- Modify: `src/components/site/about/SkillsSection.tsx`
- Modify: `src/app/globals.css`
- Modify: `tests/about-figma-sections.test.mjs`

1. Add failing assertions for the Figma logo order, dedicated component, desktop-static/mobile-animation rules, and reduced-motion fallback.
2. Run the focused test and confirm it fails for the missing row.
3. Build the dedicated component with one accessible list and an aria-hidden duplicate.
4. Place it above Skills content while preserving the measured desktop content position.
5. Add scoped mobile-only keyframes and reduced-motion overflow behavior.
6. Run the focused test, typecheck, and lint for the touched implementation.
7. Commit only the Task 1 paths.

### Task 2: About hero tagline and page metadata

**Files:**
- Modify: `src/content/about.ts`
- Modify: `src/components/site/about/AboutHero.tsx`
- Modify: `src/app/[locale]/about/page.tsx`
- Modify: `tests/cv-content-sync.test.mjs`

1. Change the regression test to require the localized hero tagline and require `professionalPositioning` to be used by About-page metadata.
2. Run the focused test and confirm the new assertions fail.
3. Add the localized tagline content and render it in `AboutHero`.
4. Add locale-aware `generateMetadata` returning the long positioning text as `description` and `openGraph.description`.
5. Run the focused test, typecheck, and lint for the touched implementation.
6. Commit only the Task 2 paths.

### Task 3: Integrated verification and merge

1. Run all Node tests, TypeScript, lint, and the production build.
2. Start the worktree development server on an unused port.
3. Verify desktop shows one centered static eight-logo row and retains the intended Skills layout.
4. Verify mobile shows the animated duplicated track without wrapping and remains horizontally accessible under reduced motion by source/computed-style checks.
5. Verify English and Spanish hero copy and meta descriptions.
6. Review the full branch diff for scope and code quality.
7. Merge the verified branch into the recorded `main` target, re-run a concise verification in the main checkout, and remove the worktree and feature branch.
