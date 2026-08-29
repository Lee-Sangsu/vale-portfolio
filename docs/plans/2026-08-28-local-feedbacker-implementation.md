# Local Feedbacker Integration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace Agentation with local-feedbacker in the portfolio's development UI feedback workflow.

**Architecture:** A client component mounts local-feedbacker from the server locale layout. The existing Next configuration is wrapped to add JSX call-site instrumentation, and the production build strips source text from Turbopack maps.

**Tech Stack:** Next.js 16, React 19, TypeScript, local-feedbacker 0.1.5.

---

### Task 1: Replace the development feedback mount

**Files:**

- Create: `src/components/LocalFeedback.tsx`
- Modify: `src/app/[locale]/layout.tsx`

**Step 1: Verify the baseline**

Run: `npm run typecheck`

Expected: the existing layout type-checks but has no local-feedbacker provider.

**Step 2: Add the minimal client provider**

```tsx
"use client";

import { ImpakersFeedbackProvider } from "local-feedbacker/react";

export function LocalFeedback() {
  return <ImpakersFeedbackProvider language="ko" namespace="val-portfolio" />;
}
```

**Step 3: Replace the Agentation layout import and mount**

```tsx
import { LocalFeedback } from "@/components/LocalFeedback";

// Inside <body>, after the application content:
<LocalFeedback />
```

**Step 4: Run type checking**

Run: `npm run typecheck`

Expected: PASS.

### Task 2: Enable source-location instrumentation and remove Agentation

**Files:**

- Modify: `next.config.ts`
- Modify: `package.json`
- Modify: `package-lock.json`

**Step 1: Update the build command**

```json
"build": "next build && local-feedbacker-strip-maps"
```

**Step 2: Wrap the existing Next config**

```ts
import { withLocalFeedbacker } from "local-feedbacker/next";

export default withNextIntl(withLocalFeedbacker(nextConfig));
```

**Step 3: Remove Agentation dependency**

Run: `npm uninstall agentation`

Expected: `agentation` is absent from `package.json` and lockfile; `local-feedbacker` remains.

**Step 4: Run lint and production build**

Run: `npm run lint && npm run build`

Expected: PASS; source-map strip step completes after the Next build.

### Task 3: Review the integration diff

**Files:**

- Review: `src/components/LocalFeedback.tsx`
- Review: `src/app/[locale]/layout.tsx`
- Review: `next.config.ts`
- Review: `package.json`
- Review: `package-lock.json`

**Step 1: Inspect the targeted diff**

Run: `git diff --check HEAD~1..HEAD && git status --short`

Expected: no whitespace errors and only the planned files are changed.

**Step 2: Commit the implementation**

Run: `git add src/components/LocalFeedback.tsx src/app/[locale]/layout.tsx next.config.ts package.json package-lock.json && git commit -m "feat: replace agentation with local feedbacker"`
