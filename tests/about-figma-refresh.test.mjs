import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readSource = (path) =>
  readFile(new URL(`../${path}`, import.meta.url), "utf8");

const escapeRegExp = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const normalizeWhitespace = (value) => value.replace(/\s+/g, " ").trim();

function readDelimited(source, openingIndex, open, close) {
  let depth = 0;

  for (let index = openingIndex; index < source.length; index += 1) {
    if (source[index] === open) depth += 1;
    if (source[index] === close) depth -= 1;
    if (depth === 0) return source.slice(openingIndex + 1, index);
  }

  assert.fail(`unterminated ${open}${close} block`);
}

function readStoryLocale(source, locale) {
  const declaration = source.indexOf("const STORY_COPY");
  assert.notEqual(declaration, -1, "story copy must use a STORY_COPY locale map");

  const objectStart = source.indexOf("{", source.indexOf("=", declaration));
  const storyCopy = readDelimited(source, objectStart, "{", "}");
  const localeMatch = new RegExp(`\\b${locale}\\s*:`).exec(storyCopy);
  assert.ok(localeMatch, `STORY_COPY must define the ${locale} locale`);

  const arrayStart = storyCopy.indexOf("[", localeMatch.index + localeMatch[0].length);
  assert.notEqual(arrayStart, -1, `${locale} story copy must be a paragraph array`);
  return readDelimited(storyCopy, arrayStart, "[", "]");
}

test("My Story contains the approved localized narrative with explicit emphasis", async () => {
  const source = await readSource("src/components/site/about/MyStory.tsx");
  const narratives = {
    es: {
      fragments: [
        "Lo que siempre me ha movido es una pregunta:",
        "qué puedo construir que todavía no existe, y a quién puede cambiarle algo.",
        "Esa inquietud definió la carrera que escogí, los equipos a los que me he unido y la manera en que trabajo hasta hoy.",
        "Por esa puerta entraron cosas muy distintas: co-fundar compañías, conectar talento entre Latinoamérica y Corea, montar un laboratorio de innovación en Seúl, crear marcas para cafeteros colombianos en Berlín y diseñar producto para una comunidad global de viajeras. Contextos que no se parecen en nada, y en todos el mismo patrón:",
        "entender rápido, proponer y ejecutar",
        "En el camino encontré lo que me mueve de verdad: crear.",
        "Cada propuesta nueva, cada idea que arranca de cero, me fascina. Porque para mí un proyecto no termina cuando se entrega; termina cuando cambia algo.",
      ],
      emphasized: [
        "qué puedo construir que todavía no existe, y a quién puede cambiarle algo.",
        "entender rápido, proponer y ejecutar",
        "En el camino encontré lo que me mueve de verdad: crear.",
      ],
    },
    en: {
      fragments: [
        "What has always driven me is one question:",
        "what can I build that does not exist yet, and whose life can it change?",
        "That curiosity has defined the career I chose, the teams I have joined, and the way I work to this day.",
        "That path has led me to very different things: co-founding companies, connecting talent between Latin America and Korea, setting up an innovation lab in Seoul, creating brands for Colombian coffee growers in Berlin, and designing products for a global community of women travelers. The contexts could not be more different, yet the pattern has always been the same:",
        "understand quickly, propose, and execute",
        "Along the way, I found what truly drives me: creating.",
        "Every new proposal and every idea that starts from scratch fascinates me. Because to me, a project does not end when it is delivered; it ends when it changes something.",
      ],
      emphasized: [
        "what can I build that does not exist yet, and whose life can it change?",
        "understand quickly, propose, and execute",
        "Along the way, I found what truly drives me: creating.",
      ],
    },
  };

  for (const [locale, narrative] of Object.entries(narratives)) {
    const localeSource = normalizeWhitespace(readStoryLocale(source, locale));

    for (const fragment of narrative.fragments) {
      assert.ok(
        localeSource.includes(fragment),
        `missing approved ${locale} story copy: ${fragment}`,
      );
    }

    for (const phrase of narrative.emphasized) {
      assert.match(
        localeSource,
        new RegExp(`<strong\\b[^>]*>\\s*${escapeRegExp(phrase)}\\s*</strong>`),
        `${locale} story emphasis must be wrapped in <strong>: ${phrase}`,
      );
    }
  }

  assert.doesNotMatch(source, /\baboutLong\b/);
  assert.doesNotMatch(source, /const\s+intro\s*=\s*`/);
});

test("My Story maps the current locale's narrative into rendered paragraphs", async () => {
  const source = await readSource("src/components/site/about/MyStory.tsx");

  assert.match(
    source,
    /STORY_COPY\s*\[\s*locale\s*\]\s*\.map\s*\(/,
    "rendered story paragraphs must be mapped from STORY_COPY[locale]",
  );
});

test("Sneak Peek renders the six local Figma images instead of linked project cards", async () => {
  const source = await readSource("src/components/site/about/SneakPeek.tsx");

  for (let index = 1; index <= 6; index += 1) {
    const suffix = String(index).padStart(2, "0");
    assert.ok(
      source.includes(`/pages/about/figma/sneak-peek-${suffix}.png`),
      `missing local Figma gallery asset sneak-peek-${suffix}.png`,
    );
  }

  assert.match(source, /<Image\b/, "the gallery must render Next Image elements");
  assert.doesNotMatch(
    source,
    /import\s+[\s\S]*?\s+from\s+["']next\/link["']\s*;/,
    "Sneak Peek must not import next/link, including under an alias",
  );
  assert.doesNotMatch(
    source,
    /import\s*{[^}]*\bheroes\b[^}]*}\s*from/,
    "Sneak Peek must not import heroes, including under an alias",
  );
  assert.doesNotMatch(
    source,
    /import\s*{[^}]*\bHERO_MANIFEST\b[^}]*}\s*from/,
    "Sneak Peek must not import HERO_MANIFEST, including under an alias",
  );
  assert.doesNotMatch(
    source,
    /<Link\b|\bhref\s*=\s*(?:["'][^"']*\/work\/|{[^}]*\/work\/)/,
    "Sneak Peek must not render linked project cards",
  );
});

test("Sneak Peek Figma exports are committed locally", () => {
  for (let index = 1; index <= 6; index += 1) {
    const suffix = String(index).padStart(2, "0");
    const file = `sneak-peek-${suffix}.png`;
    assert.equal(
      existsSync(new URL(`../public/pages/about/figma/${file}`, import.meta.url)),
      true,
      `${file} is missing`,
    );
  }
});
