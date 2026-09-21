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
    "What isn't taught in a classroom and supports everything else.",
    "Lo que no se enseña en una clase y sostiene todo lo demás",
    "Leadership & project management",
    "Liderazgo y gestión de proyectos",
    "Cross-cultural teams, international coordination and end-to-end ownership, equally comfortable leading a team or carrying a project solo.",
    "Equipos interculturales, coordinación internacional y responsabilidad de principio a fin, tanto liderando un equipo como llevando un proyecto en solitario.",
    "Adaptability",
    "Adaptabilidad",
    "Switching industries, countries and languages without losing pace: every new context becomes familiar ground fast.",
    "Cambio de industria, país e idioma sin perder el ritmo: cada contexto nuevo se convierte rápido en terreno familiar.",
    "Creativity & design",
    "Creatividad y diseño",
    "Design as a native language: from concept and art to pieces that work.",
    "El diseño como lenguaje nativo: del concepto y el arte a piezas que funcionan.",
    "Innovation & entrepreneurship",
    "Innovación y emprendimiento",
    "Founder mindset: spotting gaps and building from zero to launch.",
    "Mentalidad fundadora: detectar oportunidades y construir desde cero hasta el lanzamiento.",
    "Languages: Native Spanish · Fluent English · Basic Korean",
    "Idiomas: Español nativo · Inglés fluido · Coreano básico",
  ];

  for (const text of expected) {
    assert.ok(source.includes(text), `missing Skills Figma text: ${text}`);
  }

  assert.match(source, /SkillsLogoMarquee/);
  assert.match(source, /import \{ IpodCard \} from "\.\/IpodCard"/);
  assert.match(source, /<IpodCard locale=\{locale\} \/>/);
  assert.match(source, /max-w-\[1076px\]/);
  assert.match(source, /(?:xl|2xl):h-\[1000px\]/);
  assert.match(source, /(?:xl|2xl):pt-\[73px\]/);
  assert.match(source, /(?:xl|2xl):text-\[64px\]/);
  assert.match(source, /(?:xl|2xl):top-\[252px\]/);
  assert.match(
    source,
    /(?:xl|2xl):absolute[^\"]*(?:(?:xl|2xl):top-\[463px\][^\"]*(?:xl|2xl):left-\[885px\]|(?:xl|2xl):left-\[885px\][^\"]*(?:xl|2xl):top-\[463px\])[^>]*>[\s\S]*<IpodCard locale=\{locale\} \/>/,
  );
  assert.doesNotMatch(source, /NumberedAccordion|AppSwatchRow/);
});

test("IpodCard preserves its controls in the compact Figma composition", async () => {
  const source = await readSource(
    "src/components/site/about/IpodCard.tsx",
  );

  assert.match(source, /const \[active, setActive\] = useState\(0\)/);
  assert.match(source, /setActive\(\(current\) =>/);
  assert.match(source, /setActive\(0\)/);

  const labeledControls = [...source.matchAll(/<button[\s\S]*?<\/button>/g)]
    .map(([button]) => button)
    .filter((button) => button.includes("aria-label="));
  assert.equal(
    labeledControls.length,
    5,
    "the click wheel must expose five accessible controls",
  );
  for (const control of labeledControls) {
    assert.match(control, /onClick=/, "each labeled control must be interactive");
  }
  for (const label of [
    "Volver al inicio",
    "Back to menu",
    "Canción anterior",
    "Previous track",
    "Siguiente canción",
    "Next track",
    "Reproducir selección",
    "Play selection",
    "Cambiar selección",
    "Change selection",
  ]) {
    assert.ok(source.includes(label), `missing accessible control label: ${label}`);
  }

  assert.match(source, /h-\[311px\]/);
  assert.match(source, /w-\[160px\]/);
  assert.match(source, /h-\[82px\]/);
  assert.match(source, /size-\[118px\]/);
  assert.match(source, /Empecemos con música, dale click a una canción ·\.°☆/);
  assert.match(source, /Let's start with music, click a song ·\.°☆/);
});

test("IpodCard renders five chrome stars and honors reduced motion", async () => {
  const source = await readSource(
    "src/components/site/about/IpodCard.tsx",
  );
  const stars = source.match(/const STARS:[\s\S]*?= \[([\s\S]*?)\];/)?.[1];

  assert.ok(stars, "STARS configuration must remain explicit");
  assert.equal(
    stars.match(/className:/g)?.length,
    5,
    "the Figma composition contains exactly five chrome stars",
  );
  assert.match(source, /skills-red-star\.png/);
  const reducedMotionName = source.match(
    /const\s+(\w+)\s*=\s*useReducedMotion\(\)/,
  )?.[1];
  assert.ok(reducedMotionName, "star animation must read reduced-motion preference");
  assert.match(
    source,
    new RegExp(
      `${reducedMotionName}\\s*\\?\\s*s\\.rotate\\s*:\\s*s\\.rotate\\s*\\+\\s*360`,
    ),
    "reduced motion must prevent star rotation",
  );
  assert.match(
    source,
    new RegExp(
      `repeat:\\s*${reducedMotionName}\\s*\\?\\s*0\\s*:\\s*Infinity`,
    ),
    "reduced motion must prevent repeating star animation",
  );
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
  assert.match(source, /xl:w-\[954px\]/);
  assert.match(source, /xl:gap-\[54px\]/);
  assert.match(source, /size-\[72px\]/);
  assert.match(source, /rounded-\[18px\]/);
  assert.match(source, /xl:hidden/);
});

test("SkillsLogoMarquee animates only below desktop and supports reduced motion", async () => {
  const source = await readSource("src/app/globals.css");

  assert.match(source, /@keyframes skills-logo-marquee/);
  assert.match(source, /@media \(max-width: 1279px\)/);
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
  assert.match(component, /skills-logo-toggle[^\"]*xl:hidden/);
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

  assert.match(source, /max-w-\[1076px\]/);
  assert.doesNotMatch(source, /max-w-\[1140px\]/);
});
