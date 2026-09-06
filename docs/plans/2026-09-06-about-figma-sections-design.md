# About Figma Sections Design

## Scope

Apply Figma nodes `543:230` and `543:316` to the confirmed `SkillsSection` and `JourneySection` call sites on the About page. Preserve the rest of the page and the repository's bilingual route behavior.

## Skills

Use a static, always-visible content block matching the Figma node: a 48px desktop heading, 18px intro, four 24px skill titles with 14px supporting copy, the specified dividers, and the language footer. Remove the accordion and decorative iPod because neither appears in the approved node. English copy follows Figma exactly; Spanish remains localized with equivalent content.

## Journey

Use a 900px desktop composition matching the Figma frame: a 64px heading and 18px summary at the left, six compact career rows below, and the exact exported travel portrait at the right. Keep responsive flow below the desktop breakpoint and retain existing case-study links where the matching company already has one.

## Data and assets

Keep the exact Figma-specific copy close to each section rather than changing shared About content that is used elsewhere. Commit the exported Figma portrait locally so the implementation does not depend on an expiring asset URL.

## Verification

Add a Node content-contract test for the exact English text, row ordering, dates, and asset reference. Run typecheck, lint, production build, the asset verifier, and browser checks at desktop and mobile widths.
