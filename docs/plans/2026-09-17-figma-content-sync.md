# Figma Portfolio Content Sync Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Complete the portfolio index and all six chapter frames in Figma using the live portfolio content, while preserving the existing visual composition.

**Architecture:** Treat the repository content model as authoritative and the existing Figma portfolio/chapter frames as visual templates. Inspect and mutate the file incrementally: correct the index first, then duplicate and populate chapter frames one at a time, and finally run structural and screenshot verification.

**Tech Stack:** Figma Plugin API through `use_figma`, Figma asset upload API, TypeScript content files, local public image assets.

---

### Task 1: Build the authoritative content and asset map

**Files:**
- Read: `src/content/chapters.ts`
- Read: `src/content/chapter-details.ts`
- Read: `src/content/heroes/*.ts`
- Read: `public/**`

**Step 1: Extract the six canonical chapter records**

Record chapter title, number, date range, location, introduction, role, accent, impact, responsibilities, projects, hrefs, and image paths for NomadHer, BOOST LAB, Independent Design, N9NE, Ironhack, and Travelling University.

**Step 2: Validate every referenced image**

Run:

```bash
npm run verify:assets
```

Expected: the asset validation command exits successfully, or unavailable images are replaced with an existing related public asset without changing content claims.

**Step 3: Inspect the target Figma templates**

Read page `0:1`, portfolio frame `656:272`, alternate project-grid frame `656:274`, NomadHer chapter `656:273`, and BOOST LAB placeholder `656:506`. Record the exact text and image node IDs that will be updated.

### Task 2: Correct the portfolio chapter index

**Figma nodes:**
- Modify: `656:272`
- Reference: `656:274`

**Step 1: Upload missing cover assets**

Upload the selected public images for N9NE, Independent Design, Ironhack, and Travelling University and target only the existing cover rectangles.

**Step 2: Correct card content**

Update the six chapter cards so their titles, dates, locations, summaries, and discipline pills match the authoritative content map. Replace “Educación y premios” with “Ironhack.”

**Step 3: Preserve the existing composition**

Do not change the index frame size, card positions, typography, spacing, colors, or filter controls. Load every current font before changing text.

**Step 4: Verify the index**

Return all mutated node IDs, inspect text bounds for overflow, and capture a full-frame screenshot of `656:272`.

### Task 3: Replace the BOOST LAB placeholder

**Figma nodes:**
- Modify: `656:506`
- Reference: `656:273`

**Step 1: Replace hero content and imagery**

Update the title, tagline, chapter label, hero cover, accent color, introduction, role, and three verified impact metrics with BOOST LAB content.

**Step 2: Replace responsibility content**

Populate the six existing responsibility cells from BOOST LAB’s chapter responsibilities without changing their geometry.

**Step 3: Replace the project rail**

Populate the visible cards from the BOOST LAB project records, including available images and case-study destinations.

**Step 4: Verify the chapter**

Return all mutated node IDs, check for clipped text and residual NomadHer copy, and capture a full-frame screenshot of `656:506`.

### Task 4: Create Independent Design and N9NE chapter frames

**Figma nodes:**
- Duplicate template: `656:273`
- Create: `Chapter · Independent Design`
- Create: `Chapter · N9NE`

**Step 1: Duplicate the template into clear canvas space**

Place each duplicate to the right of the existing chapter frames with at least 240px separation. Keep the original NomadHer frame unchanged.

**Step 2: Populate Independent Design**

Replace all content-driven text, accent fills, hero image, impact metrics, responsibilities, and project cards with the authoritative Independent Design record.

**Step 3: Populate N9NE**

Replace all content-driven text, accent fills, hero image, impact metrics, responsibilities, and project cards with the authoritative N9NE record.

**Step 4: Verify both frames**

Search each duplicate for residual “NomadHer,” inspect text bounds, and capture a full-frame screenshot of each frame.

### Task 5: Create Ironhack and Travelling University chapter frames

**Figma nodes:**
- Duplicate template: `656:273`
- Create: `Chapter · Ironhack`
- Create: `Chapter · Travelling University`

**Step 1: Duplicate the template into clear canvas space**

Place each duplicate after the chapter frames created in Task 4 using the same horizontal rhythm.

**Step 2: Populate Ironhack**

Replace content-driven text, accent fills, hero image, impact metrics, responsibilities, and project cards. Preserve sparse source material honestly; do not invent metrics or routes.

**Step 3: Populate Travelling University**

Replace content-driven text, accent fills, hero image, impact metrics, responsibilities, and project cards. Preserve sparse source material honestly.

**Step 4: Verify both frames**

Search each duplicate for residual template copy, inspect text bounds, and capture a full-frame screenshot of each frame.

### Task 6: Final Figma quality review

**Figma nodes:**
- Verify: `656:272`
- Verify: `656:273`
- Verify: `656:506`
- Verify: all four newly created chapter-frame IDs

**Step 1: Run structural checks**

Confirm the index exposes six canonical chapters and each chapter frame has a unique title, introduction, impact section, responsibilities, and project rail.

**Step 2: Run content checks**

Search the completed frames for placeholder strings, wrong chapter labels, duplicated NomadHer copy, empty cover layers, and unsupported outcome claims.

**Step 3: Run visual checks**

Review full-frame screenshots for clipping, overflow, accidental geometry changes, missing images, inconsistent accent use, and misaligned cards.

**Step 4: Report completion**

Provide the updated frame IDs, summarize the corrected content, and identify any intentionally sparse cards that reflect limited source material.
