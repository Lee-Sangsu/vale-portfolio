# Project Card Badge Containment Design

## Problem

The NomadHer project-card “Ver más” badge is absolutely positioned, but the card itself does not establish a positioning context. The badge therefore escapes the project rail and appears over the preceding burgundy chapter-summary section.

## Decision

Make each project card a positioned container by adding Tailwind's `relative` utility to the existing card class. Keep the badge and the card link behavior unchanged so the badge remains visible only within “Lo que salió de este capítulo.”

## Verification

Add a source-level regression assertion that the shared card class includes `relative`, confirm the test fails before the implementation, then run the focused tests, lint, typecheck, build, and a browser check of the NomadHer route.
