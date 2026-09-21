# About Skills iPod and Journey Spacing Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Match the full Figma Skills composition with its interactive iPod and correct the Journey section's desktop padding.

**Architecture:** Keep `SkillsSection` and `JourneySection` as localized server components, with `IpodCard` as the existing client interaction boundary. Reuse committed About assets and the current logo marquee, changing only breakpoint-specific layout and the iPod's visual shell.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Motion, next/image, Node test runner.

---

### Task 1: Lock the requested Figma contract with failing tests

**Files:**
- Modify: `tests/about-figma-sections.test.mjs`

1. Replace the obsolete assertion that forbids `IpodCard` with assertions requiring the restored component and localized Figma copy.
2. Assert the 1076px wide-desktop container, 1000px Skills height, 64px heading, and wide-desktop placement contract.
3. Assert `IpodCard` contains the existing interactive control handlers, compact Figma dimensions, localized caption, chrome-star asset, and reduced-motion support.
4. Assert Journey uses the same 1076px wide-desktop reference width.
5. Run `node --test tests/about-figma-sections.test.mjs` and confirm the new assertions fail for the missing composition.
6. Commit only the test file.

### Task 2: Rebuild the interactive iPod

**Files:**
- Modify: `src/components/site/about/IpodCard.tsx`
- Test: `tests/about-figma-sections.test.mjs`

1. Restyle the iPod to the 160×311px Figma shell, 82px screen, and exact click-wheel placement.
2. Preserve menu/previous/next/play/center click behavior and expose the active localized track on the compact screen.
3. Reposition and resize the five chrome stars to match the Figma grouping.
4. Add a reduced-motion-safe star animation implementation.
5. Run the focused test and ensure the iPod assertions pass.
6. Run TypeScript and scoped lint.
7. Commit only `IpodCard.tsx` and any corresponding test refinements.

### Task 3: Recompose Skills and correct Journey padding

**Files:**
- Modify: `src/components/site/about/SkillsSection.tsx`
- Modify: `src/components/site/about/SkillsLogoMarquee.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/components/site/about/JourneySection.tsx`
- Test: `tests/about-figma-sections.test.mjs`

1. Implement the exact localized Skills copy and Figma desktop geometry in a 1076px reference container.
2. Restore `IpodCard` at the right-side Figma position on wide desktop and in responsive flow below it.
3. Move the static logo-row breakpoint to wide desktop so tablet widths continue using the marquee without overflow.
4. Change Journey's wide-desktop reference container to 1076px while retaining its vertical positions and responsive flow.
5. Run the focused test and ensure all section assertions pass.
6. Run TypeScript, scoped lint, and diff checks.
7. Commit only the Task 3 paths.

### Task 4: Integrated review, browser verification, and merge

1. Run all Node tests, typecheck, lint, asset verification, and the production build.
2. Start the worktree app on an unused port.
3. At 1536px, verify the Skills left edge is 230px, heading/logo/iPod positions match Figma, the iPod is visible, and Journey starts at the same 230px reference edge.
4. Click the iPod controls and verify the active track changes.
5. At tablet and mobile widths, verify the marquee animates, the iPod remains visible below the list, and the document has no horizontal overflow.
6. Verify reduced-motion source/computed behavior and review the complete branch diff.
7. Merge the clean branch into the recorded `main` target without disturbing existing uncommitted files, then remove the worktree and merged branch.
