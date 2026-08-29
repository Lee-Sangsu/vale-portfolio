# Local Feedbacker Replacement Design

## Goal

Replace the development-only Agentation toolbar with local-feedbacker, preserving a local-first feedback flow and adding build-time source locations for accurate file and line references.

## Approved approach

Mount `ImpakersFeedbackProvider` through a small client component in the locale layout. Configure its Korean UI and a stable `val-portfolio` namespace so feedback is not mixed with other apps on `localhost`.

Wrap the existing Next configuration with `withLocalFeedbacker`. This maintains the existing next-intl wrapper and Turbopack root configuration while adding source attributes. Update the production build command to strip source content from Turbopack source maps after the build.

Remove the Agentation import, mount, and dependency. The feedback widget remains development-only through its default visibility behavior and can be toggled by keyboard if needed.

## Verification

Run type checking, linting, and a production build. Confirm that the build completes and invokes `local-feedbacker-strip-maps` after Next.js writes its output.
