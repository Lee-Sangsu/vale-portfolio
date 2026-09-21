import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readSource = (path) =>
  readFile(new URL(`../${path}`, import.meta.url), "utf8");

function readBalanced(source, openingBrace) {
  let depth = 0;

  for (let index = openingBrace; index < source.length; index += 1) {
    if (source[index] === "{") depth += 1;
    if (source[index] === "}") depth -= 1;
    if (depth === 0) return source.slice(openingBrace + 1, index);
  }

  assert.fail("unterminated JSX expression");
}

function readOnClick(button) {
  const start = button.indexOf("onClick={");
  assert.notEqual(start, -1, "click-wheel control must have an onClick handler");
  return readBalanced(button, start + "onClick=".length).trim();
}

function readHandlerBody(source, handlerExpression) {
  if (/setActive\s*\(/.test(handlerExpression)) return handlerExpression;

  const reference = handlerExpression.match(/^([\w.]+)$/)?.[1];
  assert.ok(reference, `unsupported click handler: ${handlerExpression}`);
  const name = reference.split(".").at(-1);
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const definitions = [
    new RegExp(`\\b${escapedName}\\s*:\\s*\\(\\)\\s*=>\\s*`),
    new RegExp(`\\bconst\\s+${escapedName}\\s*=\\s*\\(\\)\\s*=>\\s*`),
    new RegExp(`\\bfunction\\s+${escapedName}\\s*\\(\\)\\s*`),
  ];

  for (const definition of definitions) {
    const match = definition.exec(source);
    if (!match) continue;

    const bodyStart = match.index + match[0].length;
    if (source[bodyStart] === "{") {
      return readBalanced(source, bodyStart);
    }

    let depth = 0;
    for (let index = bodyStart; index < source.length; index += 1) {
      const character = source[index];
      if ("([{".includes(character)) depth += 1;
      if (")]}".includes(character)) depth -= 1;
      if (depth === 0 && (character === "," || character === ";" || character === "\n")) {
        return source.slice(bodyStart, index).trim();
      }
    }
  }

  assert.fail(`could not resolve click handler: ${handlerExpression}`);
}

function findControl(clickWheel, ...labels) {
  const controls = [...clickWheel.matchAll(/<button[\s\S]*?<\/button>/g)].map(
    ([button]) => button,
  );
  const control = controls.find((button) =>
    labels.every((label) => button.includes(label)),
  );
  assert.ok(control, `missing click-wheel control: ${labels.join(" / ")}`);
  return control;
}

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
  const wheelStart = source.indexOf("{/* Click wheel */}");
  const wheelEnd = source.indexOf("<p className=", wheelStart);
  assert.ok(wheelStart >= 0 && wheelEnd > wheelStart, "missing click-wheel region");
  const clickWheel = source.slice(wheelStart, wheelEnd);
  const wheelButtons = [...clickWheel.matchAll(/<button[\s\S]*?<\/button>/g)];
  assert.equal(wheelButtons.length, 5, "the click wheel must contain five controls");

  const menu = findControl(clickWheel, "Volver al inicio", "Back to menu");
  const previous = findControl(clickWheel, "Canción anterior", "Previous track");
  const next = findControl(clickWheel, "Siguiente canción", "Next track");
  const play = findControl(clickWheel, "Reproducir selección", "Play selection");
  const center = findControl(clickWheel, "Cambiar selección", "Change selection");

  for (const [name, control] of [
    ["menu", menu],
    ["previous", previous],
    ["next", next],
    ["play", play],
    ["center", center],
  ]) {
    const targetSize = Number(control.match(/size-\[(\d+)px\]/)?.[1]);
    assert.ok(
      targetSize >= 24,
      `${name} must provide at least a 24px square touch target`,
    );
  }

  assert.match(
    readHandlerBody(source, readOnClick(menu)),
    /setActive\s*\(\s*0\s*\)/,
    "menu must reset the selection to the first track",
  );
  assert.match(
    readHandlerBody(source, readOnClick(previous)),
    /setActive[\s\S]*current\s*-\s*1[\s\S]*%\s*TRACKS\.length/,
    "previous must decrement and wrap the selection",
  );
  for (const [name, control] of [
    ["next", next],
    ["play", play],
    ["center", center],
  ]) {
    assert.match(
      readHandlerBody(source, readOnClick(control)),
      /setActive[\s\S]*current\s*\+\s*1[\s\S]*%\s*TRACKS\.length/,
      `${name} must advance and wrap the selection`,
    );
  }

  assert.match(source, /h-\[311px\]/);
  assert.match(source, /w-\[160px\]/);
  assert.match(source, /h-\[82px\]/);
  assert.match(source, /size-\[118px\]/);
  assert.match(source, /rounded-\[18px\]/);
  assert.match(source, /border-\[#e0e0da\]/);
  assert.match(source, /bg-\[#fafaf8\]/);
  assert.match(source, /h-\[82px\][^\"]*rounded-\[6px\]/);
  assert.match(source, /top-\[325px\][^\"]*w-\[240px\][^\"]*text-\[14px\]/);
  assert.match(
    source,
    /Empecemos con música,\s*<br \/>\s*dale click a una canción ·\.°☆/,
  );
  assert.match(
    source,
    /Let(?:&apos;|')s start with music,\s*<br \/>\s*click a song ·\.°☆/,
  );
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
  for (const offset of [
    "2xl:left-[317px] 2xl:top-[-86px]",
    "2xl:left-[189px] 2xl:top-[-32px]",
    "2xl:left-[-91px] 2xl:top-[-134px]",
    "2xl:left-[250px] 2xl:top-[169px]",
    "2xl:left-[-124px] 2xl:top-[160px]",
  ]) {
    assert.ok(stars.includes(offset), `missing 1536px star offset: ${offset}`);
  }
  assert.doesNotMatch(
    stars,
    /(?:^|\s)xl:(?:left|top)-/,
    "the full Figma star spread must not activate below 1536px",
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
