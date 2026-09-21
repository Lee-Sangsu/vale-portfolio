import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readSource = (path) =>
  readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("My Story contains the approved localized narrative with explicit emphasis", async () => {
  const source = await readSource("src/components/site/about/MyStory.tsx");
  const approvedCopy = [
    "Lo que siempre me ha movido es una pregunta: ",
    "qué puedo construir que todavía no existe, y a quién puede cambiarle algo.",
    " Esa inquietud definió la carrera que escogí, los equipos a los que me he unido y la manera en que trabajo hasta hoy.",
    "Por esa puerta entraron cosas muy distintas: co-fundar compañías, conectar talento entre Latinoamérica y Corea, montar un laboratorio de innovación en Seúl, crear marcas para cafeteros colombianos en Berlín y diseñar producto para una comunidad global de viajeras. Contextos que no se parecen en nada, y en todos el mismo patrón: ",
    "entender rápido, proponer y ejecutar",
    "En el camino encontré lo que me mueve de verdad: crear. ",
    "Cada propuesta nueva, cada idea que arranca de cero, me fascina. Porque para mí un proyecto no termina cuando se entrega; termina cuando cambia algo.",
    "What has always driven me is one question: ",
    "what can I build that does not exist yet, and whose life can it change?",
    " That curiosity has defined the career I chose, the teams I have joined, and the way I work to this day.",
    "That path has led me to very different things: co-founding companies, connecting talent between Latin America and Korea, setting up an innovation lab in Seoul, creating brands for Colombian coffee growers in Berlin, and designing products for a global community of women travelers. The contexts could not be more different, yet the pattern has always been the same: ",
    "understand quickly, propose, and execute",
    "Along the way, I found what truly drives me: creating. ",
    "Every new proposal and every idea that starts from scratch fascinates me. Because to me, a project does not end when it is delivered; it ends when it changes something.",
  ];

  for (const fragment of approvedCopy) {
    assert.ok(source.includes(fragment), `missing approved story copy: ${fragment}`);
  }

  assert.match(source, /<strong\b[^>]*>/, "story emphasis must use semantic strong elements");
  assert.doesNotMatch(source, /\baboutLong\b/);
  assert.doesNotMatch(source, /const\s+intro\s*=\s*`/);
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
  assert.doesNotMatch(source, /import\s+Link\s+from\s+["']next\/link["']/);
  assert.doesNotMatch(source, /import\s+\{[^}]*\bheroes\b[^}]*\}\s+from/);
  assert.doesNotMatch(source, /\bHERO_MANIFEST\b/);
  assert.doesNotMatch(source, /<Link\b/);
  assert.doesNotMatch(source, /href=\{?`?\/work\//);
});
