import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readSource = (path) =>
  readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("SkillsSection contains the exact approved Figma content", async () => {
  const source = await readSource(
    "src/components/site/about/SkillsSection.tsx",
  );
  const expected = [
    "A multidisciplinary designer working across strategy, product, and content to turn ideas into real things",
    "Leadership & project management",
    "Cross-cultural teams, international coordination and end-to-end ownership, equally comfortable leading a team or carrying a project solo.",
    "Adaptability",
    "Switching industries, countries and languages without losing pace: every new context becomes familiar ground fast.",
    "Creativity & design",
    "Design as a native language: from concept and art to pieces that work.",
    "Innovation & entrepreneurship",
    "Founder mindset: spotting gaps and building from zero to launch.",
    "Languages: Native Spanish · Fluent English · Basic Korean",
  ];

  for (const text of expected) {
    assert.ok(source.includes(text), `missing Skills Figma text: ${text}`);
  }

  assert.match(source, /SkillsLogoMarquee/);
  assert.match(source, /max-w-\[1140px\][^\"]*lg:pt-\[73px\]/);
  assert.doesNotMatch(source, /lg:mt-\[73px\]/);
  assert.match(source, /lg:mt-\[107px\]/);
  assert.doesNotMatch(source, /NumberedAccordion|IpodCard|AppSwatchRow/);
});

test("SkillsLogoMarquee matches the approved logo order and desktop layout", async () => {
  const source = await readSource(
    "src/components/site/about/SkillsLogoMarquee.tsx",
  );
  const approvedOrder = [
    '"figma"',
    '"manychat"',
    '"photoshop"',
    '"capcut"',
    '"framer"',
    '"illustrator"',
    '"canva"',
    '"notion"',
  ];

  let previousIndex = -1;
  for (const slug of approvedOrder) {
    const index = source.indexOf(slug);
    assert.ok(index > previousIndex, `logo is out of order: ${slug}`);
    previousIndex = index;
  }

  assert.match(source, /Design tools/);
  assert.match(source, /aria-hidden="true"/);
  assert.match(source, /lg:w-\[954px\]/);
  assert.match(source, /lg:gap-\[54px\]/);
  assert.match(source, /size-\[72px\]/);
  assert.match(source, /rounded-\[18px\]/);
  assert.match(source, /lg:hidden/);
});

test("SkillsLogoMarquee animates only below desktop and supports reduced motion", async () => {
  const source = await readSource("src/app/globals.css");

  assert.match(source, /@keyframes skills-logo-marquee/);
  assert.match(source, /@media \(max-width: 1023px\)/);
  assert.match(
    source,
    /\.skills-logo-track\s*\{[^}]*animation:\s*skills-logo-marquee/s,
  );
  assert.match(source, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(source, /\.skills-logo-viewport\s*\{[^}]*overflow-x:\s*auto/s);
});

test("SkillsLogoMarquee offers a localized mobile pause control", async () => {
  const component = await readSource(
    "src/components/site/about/SkillsLogoMarquee.tsx",
  );
  const styles = await readSource("src/app/globals.css");
  const section = await readSource(
    "src/components/site/about/SkillsSection.tsx",
  );

  assert.match(component, /^"use client";/);
  assert.match(component, /useState\(false\)/);
  assert.match(component, /aria-pressed=\{isPaused\}/);
  assert.match(component, /Pause logo animation/);
  assert.match(component, /Resume logo animation/);
  assert.match(component, /Pausar animación de logos/);
  assert.match(component, /Reanudar animación de logos/);
  assert.match(component, /Herramientas de diseño/);
  assert.match(component, /skills-logo-toggle[^\"]*lg:hidden/);
  assert.match(component, /data-paused=\{isPaused\}/);
  assert.match(section, /<SkillsLogoMarquee locale=\{locale\} \/>/);
  assert.match(
    styles,
    /\[data-paused="true"\][^}]*animation-play-state:\s*paused/s,
  );
  assert.ok(
    styles.indexOf('[data-paused="true"]') >
      styles.indexOf("animation: skills-logo-marquee"),
    "paused play-state must follow the mobile animation shorthand in the cascade",
  );
  assert.match(
    styles,
    /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.skills-logo-toggle\s*\{[^}]*display:\s*none/s,
  );
});

test("JourneySection contains the exact approved Figma content and asset", async () => {
  const source = await readSource(
    "src/components/site/about/JourneySection.tsx",
  );
  const expected = [
    "Discover My Journey",
    "Five years designing brands, products, events and communities across Bilbao, Berlin, Bogotá and Seoul.",
    "Product & design",
    "NomadHer",
    "Oct 2025 - present",
    "Innovation & expansion",
    "BOOST LAB",
    "2024 - present",
    "Branding & strategy",
    "Diseño independiente",
    "2025 - 2026",
    "LATAM talent scouting",
    "Travelling University",
    "2024 - 2025",
    "Creative direction & strategy",
    "N9NE",
    "2021 - 2024",
    "Program Manager Assistant",
    "Ironhack",
    "2022 - 2023",
    "/pages/about/figma/journey-portrait.jpg",
  ];

  for (const text of expected) {
    assert.ok(source.includes(text), `missing Journey Figma text: ${text}`);
  }
});
