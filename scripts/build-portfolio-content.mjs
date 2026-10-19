#!/usr/bin/env node
/**
 * Converts the portfolio copy in content/source/{es,en}/*.md into
 * src/content/portfolio/data.generated.json.
 *
 * The Markdown is the source of truth (Vale edits it, or hands over new text);
 * run `npm run content` after changing it. The parser is structure-based, so
 * the Spanish label keywords (Título, Descripción, Overview...) are kept in
 * both languages and only the values are translated.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "content/source");
const OUT = path.join(ROOT, "src/content/portfolio/data.generated.json");
const LOCALES = ["es", "en"];

const CHAPTER_FILES = [
  { file: "01-nomadher.md", id: "nomadher" },
  { file: "02-boost-lab.md", id: "boost-lab" },
  { file: "03-independiente.md", id: "independent" },
  { file: "04-n9ne.md", id: "n9ne" },
  { file: "05-ironhack.md", id: "ironhack" },
  { file: "06-travelling-university.md", id: "travelling-university" },
];

/** URL slug per project number. Legacy slugs keep existing links working. */
const SLUGS = {
  "1.1": "nomadher-app",
  "1.2": "city-lounge",
  "1.3": "travel-buddy-meetups",
  "1.4": "levels-badges-perks",
  "1.5": "jal-nomadher",
  "1.6": "applied-brand",
  "1.7": "content-community",
  "1.8": "bloggers-creators",
  "1.9": "business-decks",
  "1.10": "website-redesign",
  "1.11": "notion-workspace",
  "1.12": "she-can-travel-anywhere-seoul",
  "1.13": "she-can-found-anywhere",
  "1.14": "she-can-create-anywhere",
  "1.15": "wellness-creator-trip",
  "1.16": "partner-campaigns",
  "1.17": "merch-drop-model",
  "1.18": "automated-reporting",
  "2.1": "global-youth-summit",
  "2.2": "sejong-hackathon",
  "2.3": "misiones-internacionales",
  "2.4": "seoul-women-entrepreneur-summit",
  "2.5": "seoul-entrepreneur-summit",
  "2.6": "ruta-8",
  "2.7": "seoul-wellness-workshop",
  "2.8": "youth-future-talent",
  "2.9": "boost-lab-workshops",
  "3.1": "serema-hotel",
  "3.2": "opuesto-sas",
  "3.3": "brujula-etica",
  "3.4": "santa-juliana",
  "3.5": "teampreneurship-cooperative",
  "4.1": "nobled-coffee",
  "4.2": "eats-real",
  "4.3": "hola-guesthouse-jeju",
  "6.1": "talent-scouting",
  "6.2": "mentes-sin-fronteras",
};

const FILTER_IDS = {
  "Diseño gráfico": "design",
  "UX/UI": "ux-ui",
  "Eventos y talleres": "events",
  "Marketing y contenido": "marketing-content",
  Estrategia: "strategy",
};

/**
 * Order of each filter's project list, from "Proyectos por filtro" (99-filtros.md).
 * Membership comes from each project's own `Filtros` line; this only sorts.
 */
const FILTER_ORDER = {
  design: ["applied-brand","jal-nomadher","she-can-travel-anywhere-seoul","she-can-found-anywhere","she-can-create-anywhere","wellness-creator-trip","business-decks","merch-drop-model","brujula-etica","serema-hotel","opuesto-sas","santa-juliana","teampreneurship-cooperative","nobled-coffee","hola-guesthouse-jeju","eats-real","seoul-entrepreneur-summit","seoul-wellness-workshop","sejong-hackathon","ruta-8"],
  "ux-ui": ["nomadher-app","city-lounge","travel-buddy-meetups","levels-badges-perks","website-redesign","opuesto-sas","eats-real"],
  events: ["global-youth-summit","she-can-travel-anywhere-seoul","sejong-hackathon","ruta-8","boost-lab-workshops","misiones-internacionales","seoul-women-entrepreneur-summit","seoul-entrepreneur-summit","seoul-wellness-workshop","youth-future-talent","she-can-found-anywhere","she-can-create-anywhere","wellness-creator-trip","mentes-sin-fronteras"],
  "marketing-content": ["content-community","jal-nomadher","bloggers-creators","partner-campaigns","she-can-found-anywhere","she-can-create-anywhere","wellness-creator-trip","automated-reporting","serema-hotel","brujula-etica","global-youth-summit","seoul-women-entrepreneur-summit","ruta-8","talent-scouting","mentes-sin-fronteras"],
  strategy: ["nomadher-app","city-lounge","travel-buddy-meetups","levels-badges-perks","business-decks","notion-workspace","content-community","bloggers-creators","website-redesign","merch-drop-model","automated-reporting","serema-hotel","opuesto-sas","nobled-coffee","global-youth-summit","sejong-hackathon","misiones-internacionales","ruta-8","boost-lab-workshops","talent-scouting"],
};

/** English for the short "type" tags (Etiquetas) the translators may have left in Spanish. */
const TYPE_EN = {
  Evento: "Event",
  Estrategia: "Strategy",
  Campaña: "Campaign",
  Programa: "Program",
  Talleres: "Workshops",
  Comunidad: "Community",
  Contenido: "Content",
  Operación: "Operations",
  "Producto interno": "Internal product",
  "Expansión internacional": "International expansion",
  "Evento digital": "Digital event",
};

const warnings = [];
const warn = (msg) => warnings.push(msg);

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

const MARK = /\s*\*\((?:tuyo|para stat cards)[^)]*\)\*/g;
const clean = (s) => s.replace(MARK, "").replace(/\s+$/g, "").trim();
const splitDots = (s) => s.split(/\s+·\s+/).map((p) => p.trim()).filter(Boolean);
const stripBold = (s) => s.replace(/\*\*/g, "").trim();

/** `**Label** *(marker)* · value` or `**Label** *(marker)*` */
function boldLine(line) {
  const m = line.match(/^\*\*(.+?)\*\*(?:\s*\*\([^)]*\)\*)?(?:\s*·\s*(.*))?\s*$/);
  if (!m) return null;
  return { label: m[1].trim(), value: m[2] === undefined ? null : clean(m[2]), raw: line };
}

/** `Label *(marker)* · value` (card lines, no bold) */
function plainLine(line) {
  const m = line.match(
    /^(Etiquetas|Meta|Título|Descripción|Tags|Filtros|Cliente|Clientes|Mi rol|Tipo de proyecto)(?:\s*\*\([^)]*\)\*)?\s*·\s*(.*)$/,
  );
  if (!m) return null;
  return { label: m[1], value: clean(m[2]) };
}

function parseTable(lines) {
  const rows = lines
    .filter((l) => l.trim().startsWith("|"))
    .map((l) => l.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim()));
  // drop the `---` separator row
  return rows.filter((r) => !r.every((c) => /^:?-{3,}:?$/.test(c) || c === ""));
}

function parseStats(lines) {
  return parseTable(lines)
    .filter((r) => r.length >= 2)
    .map((r) => ({ value: stripBold(r[0]), label: stripBold(r[1]) }));
}

/** "value · label" lines (the "Cifras (para stat cards)" extras). */
function parseDotStats(lines) {
  return lines
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const i = l.indexOf(" · ");
      return i === -1 ? null : { value: l.slice(0, i).trim(), label: l.slice(i + 3).trim() };
    })
    .filter(Boolean);
}

/**
 * Turns the lines under an extra-section heading into display blocks:
 *  - table       | a | b |
 *  - items       *Lead.* text   (italic lead per line)
 *  - rows        several lines of `a · b · c`
 *  - chips       one line of `a · b · c`
 *  - p           plain paragraph
 */
function parseBlocks(lines) {
  const blocks = [];
  let group = [];
  const flush = () => {
    if (!group.length) return;
    const g = group;
    group = [];
    if (g.every((l) => l.trim().startsWith("|"))) {
      const rows = parseTable(g);
      blocks.push({ type: "table", head: rows[0] ?? [], rows: rows.slice(1) });
      return;
    }
    if (g.every((l) => /^\*[^*]+\*/.test(l.trim()))) {
      blocks.push({
        type: "items",
        items: g.map((l) => {
          const m = l.trim().match(/^\*([^*]+)\*\s*(?:·\s*)?(.*)$/);
          return { lead: m[1].trim().replace(/\.$/, ""), text: m[2].trim() };
        }),
      });
      return;
    }
    if (g.length > 1 && g.every((l) => /^\d{2}\s/.test(l.trim()))) {
      blocks.push({ type: "steps", items: g.map((l) => l.trim()) });
      return;
    }
    if (g.length > 1 && g.every((l) => / · /.test(l))) {
      blocks.push({ type: "rows", rows: g.map((l) => splitDots(l.trim())) });
      return;
    }
    if (g.length === 1 && / · /.test(g[0]) && !/[.!?]\s/.test(g[0].replace(/"[^"]*"/g, ""))) {
      blocks.push({ type: "chips", items: splitDots(g[0].trim()) });
      return;
    }
    for (const line of g) blocks.push({ type: "p", text: line.trim() });
  };
  for (const raw of lines) {
    const line = raw.replace(/\s+$/, "");
    if (!line.trim()) flush();
    else if (line.trim().startsWith(">") || /^---+$/.test(line.trim())) continue;
    else group.push(line);
  }
  flush();
  return blocks;
}

/** Collect non-empty, non-note paragraphs (joined) from a list of lines. */
function paragraphs(lines) {
  const out = [];
  let cur = [];
  const flush = () => {
    if (cur.length) out.push(cur.join(" ").trim());
    cur = [];
  };
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) flush();
    else if (line.startsWith(">")) continue;
    else cur.push(line);
  }
  flush();
  return out;
}

/* ------------------------------------------------------------------ */
/* Project page + card                                                 */
/* ------------------------------------------------------------------ */

function parseCard(lines, locale) {
  const card = {};
  for (const raw of lines) {
    const p = plainLine(raw.trim());
    if (!p) continue;
    card[p.label] = p.value;
  }
  let labels = splitDots(card.Etiquetas ?? "");
  if (locale === "en") labels = labels.map((l) => TYPE_EN[l] ?? l);
  return {
    labels,
    meta: card.Meta ?? "",
    title: card["Título"] ?? "",
    description: card["Descripción"] ?? "",
    tags: splitDots(card.Tags ?? ""),
    filters: splitDots(card.Filtros ?? "")
      .map((f) => FILTER_IDS[f])
      .filter(Boolean),
  };
}

/** Parses the Overview/Challenge/Approach/Result part shared by projects and Ironhack's case. */
function parseCase(lines) {
  const out = { overview: [], challenge: "", approach: "", result: "" };
  let section = null;
  const buf = { challenge: [], approach: [], result: [] };
  for (const raw of lines) {
    const line = raw.trim();
    const b = boldLine(line);
    if (b && /^Overview$/.test(b.label)) {
      section = "overview";
      continue;
    }
    if (b && /^01 Challenge$/.test(b.label)) {
      section = "challenge";
      continue;
    }
    if (b && /^02 Approach$/.test(b.label)) {
      section = "approach";
      continue;
    }
    if (b && /^03 Result$/.test(b.label)) {
      section = "result";
      continue;
    }
    if (!line || line.startsWith(">") || /^---+$/.test(line)) {
      if (section && buf[section]) buf[section].push("");
      continue;
    }
    if (section === "overview") {
      const p = plainLine(line);
      if (p) out.overview.push({ label: p.label, value: p.value });
    } else if (section && buf[section]) {
      buf[section].push(line);
    }
  }
  for (const k of ["challenge", "approach", "result"]) out[k] = paragraphs(buf[k]).join("\n\n");
  return out;
}

function parseProject(heading, body, locale) {
  const m = heading.match(/^##\s+(\d+\.\d+)\s+(.+)$/);
  const number = m[1];
  const lines = body;

  const idx = (re) => lines.findIndex((l) => re.test(l.trim()));
  const cardAt = idx(/^\*\*CARD\*\*$/);
  const pageAt = idx(/^\*\*PÁGINA\*\*$/);
  const card = parseCard(lines.slice(cardAt + 1, pageAt), locale);

  const page = lines.slice(pageAt + 1);
  const extraAt = page.findIndex((l) => /^\*\*Secciones extra\*\*$/.test(l.trim()));
  const main = extraAt === -1 ? page : page.slice(0, extraAt);
  const extraLines = extraAt === -1 ? [] : page.slice(extraAt + 1);

  // title, description, purpose
  let title = "";
  let purpose = [];
  const descLines = [];
  let inDesc = false;
  for (const raw of main) {
    const line = raw.trim();
    const b = boldLine(line);
    if (b && b.label === "Título" && b.value != null) {
      title = b.value;
      inDesc = false;
    } else if (b && b.label === "Descripción" && b.value == null) {
      inDesc = true;
    } else if (b && b.label === "Propósito" && b.value != null) {
      purpose = splitDots(b.value);
      inDesc = false;
    } else if (b && /^(Overview|01 Challenge)$/.test(b.label)) {
      inDesc = false;
    } else if (inDesc && line && !line.startsWith(">")) {
      descLines.push(line);
    }
  }
  const kase = parseCase(main);

  // extras
  const extras = [];
  let cur = null;
  const flush = () => {
    if (!cur) return;
    if (cur.stats) {
      cur.stats = parseDotStats(cur.lines);
      cur.blocks = [];
    } else {
      cur.blocks = parseBlocks(cur.lines);
    }
    delete cur.lines;
    extras.push(cur);
    cur = null;
  };
  for (const raw of extraLines) {
    const line = raw.trim();
    const b = boldLine(line);
    if (b && b.value === null && !/^(\*\*.+\*\*.*·)/.test(line)) {
      flush();
      cur = { title: b.label, stats: /\*\(para stat cards\)\*/.test(line), lines: [] };
    } else if (cur) {
      cur.lines.push(raw);
    }
  }
  flush();

  return {
    number,
    card,
    page: {
      title,
      description: paragraphs(descLines).join("\n\n"),
      purpose,
      ...kase,
      extras,
    },
  };
}

/* ------------------------------------------------------------------ */
/* Chapter page + card                                                 */
/* ------------------------------------------------------------------ */

function parseChapter(text, locale) {
  const all = text.split("\n");
  const firstProject = all.findIndex((l) => /^##\s+\d+\.\d+\s/.test(l));
  const head = firstProject === -1 ? all : all.slice(0, firstProject);

  const cardAt = head.findIndex((l) => /^##\s+Card del capítulo/.test(l));
  const pageAt = head.findIndex((l) => /^##\s+Página del capítulo/.test(l));

  // chapter card
  const cardRaw = {};
  for (const raw of head.slice(cardAt + 1, pageAt)) {
    const b = boldLine(raw.trim());
    if (b && b.value != null) cardRaw[b.label] = b.value;
  }
  const card = {
    title: cardRaw["Título"] ?? "",
    meta: cardRaw.Meta ?? "",
    description: cardRaw["Descripción"] ?? "",
    tags: splitDots(cardRaw.Tags ?? ""),
  };

  // chapter page
  const pageLines = head.slice(pageAt + 1);
  const raw = {};
  let band = [];
  let statsLines = [];
  const responsibilities = [];
  let projectNames = [];
  let mode = null;
  let resp = null;
  let caseStart = -1;

  pageLines.forEach((line0, i) => {
    const line = line0.trim();
    if (/^###\s+El caso/.test(line)) caseStart = i;
  });
  const chapterLines = caseStart === -1 ? pageLines : pageLines.slice(0, caseStart);
  const caseLines = caseStart === -1 ? [] : pageLines.slice(caseStart + 1);

  for (const line0 of chapterLines) {
    const line = line0.trim();
    if (/^###\s+Mis responsabilidades/.test(line)) {
      mode = "resp";
      continue;
    }
    if (/^###\s+Lo que salió/.test(line)) {
      mode = "projects";
      continue;
    }
    const b = boldLine(line);
    if (mode === "resp") {
      const m = line.match(/^\*\*\[(\d+)\]\s+(.+?)\*\*$/);
      if (m) {
        resp = { n: m[1], title: m[2].trim(), body: "" };
        responsibilities.push(resp);
      } else if (resp && line && !line.startsWith(">")) {
        resp.body = (resp.body + " " + line).trim();
      }
      continue;
    }
    if (mode === "projects") {
      if (line && !line.startsWith(">") && !/^---+$/.test(line)) projectNames = splitDots(line);
      continue;
    }
    if (b) {
      if (b.label === "Texto de la banda") mode = "band";
      else if (b.label === "Cifras") mode = "stats";
      else {
        mode = null;
        if (b.value != null) raw[b.label] = b.value;
      }
      continue;
    }
    if (mode === "band" && line && !line.startsWith(">")) band.push(line);
    if (mode === "stats" && line.startsWith("|")) statsLines.push(line);
  }

  const page = {
    title: raw["Título"] ?? "",
    tagline: raw.Bajada ?? "",
    pill: raw["Píldora"] ?? "",
    label: (raw.Etiqueta ?? "").replace(/^\[\s*|\s*\]$/g, ""),
    band: band.join(" "),
    stats: parseStats(statsLines),
    responsibilities,
    projectNames,
    case: caseLines.length ? parseCase(caseLines) : null,
  };

  // projects
  const projects = [];
  let i = firstProject;
  while (firstProject !== -1 && i < all.length) {
    if (/^##\s+\d+\.\d+\s/.test(all[i])) {
      let j = i + 1;
      while (j < all.length && !/^##\s+\d+\.\d+\s/.test(all[j])) j++;
      projects.push(parseProject(all[i], all.slice(i + 1, j), locale));
      i = j;
    } else i++;
  }
  return { card, page, projects };
}

/* ------------------------------------------------------------------ */
/* Build                                                               */
/* ------------------------------------------------------------------ */

function count(o) {
  return {
    projects: o.projects.length,
    resp: o.page.responsibilities.length,
    stats: o.page.stats.length,
    extras: o.projects.map((p) => p.page.extras.length).join(","),
  };
}

const chapters = [];
CHAPTER_FILES.forEach(({ file, id }, index) => {
  const parsed = {};
  for (const locale of LOCALES) {
    const fp = path.join(SRC, locale, file);
    if (!fs.existsSync(fp)) {
      warn(`missing ${locale}/${file}`);
      continue;
    }
    parsed[locale] = parseChapter(fs.readFileSync(fp, "utf8"), locale);
  }
  const es = parsed.es;
  const en = parsed.en ?? es; // fall back to Spanish until a translation exists
  if (parsed.en) {
    const a = JSON.stringify(count(es));
    const b = JSON.stringify(count(en));
    if (a !== b) warn(`structure mismatch in ${file}: es ${a} vs en ${b}`);
  }

  const projects = es.projects.map((esProject, k) => {
    const enProject = en.projects[k] ?? esProject;
    const slug = SLUGS[esProject.number];
    if (!slug) warn(`no slug for project ${esProject.number}`);
    return {
      slug,
      number: esProject.number,
      chapter: id,
      filters: esProject.card.filters,
      es: { card: esProject.card, page: esProject.page },
      en: { card: enProject.card, page: enProject.page },
    };
  });

  chapters.push({
    id,
    number: String(index + 1).padStart(2, "0"),
    es: { card: es.card, page: es.page },
    en: { card: en.card, page: en.page },
    projects,
  });
});

// filters: membership from each project's `Filtros`, order from FILTER_ORDER
const allProjects = chapters.flatMap((c) => c.projects);
const filters = {};
for (const [filterId, order] of Object.entries(FILTER_ORDER)) {
  const members = allProjects.filter((p) => p.filters.includes(filterId)).map((p) => p.slug);
  const ordered = order.filter((s) => members.includes(s));
  const missing = members.filter((s) => !ordered.includes(s));
  const extra = order.filter((s) => !members.includes(s));
  if (missing.length) warn(`filter ${filterId}: in cards but not in order list: ${missing.join(", ")}`);
  if (extra.length) warn(`filter ${filterId}: in order list but not tagged on the card: ${extra.join(", ")}`);
  filters[filterId] = [...ordered, ...missing];
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({ chapters, filters }, null, 2) + "\n");

console.log(
  `wrote ${path.relative(ROOT, OUT)}: ${chapters.length} chapters, ${allProjects.length} projects`,
);
if (warnings.length) {
  console.log("\nWarnings:");
  for (const w of warnings) console.log(" - " + w);
  process.exitCode = warnings.some((w) => w.startsWith("structure") || w.startsWith("no slug")) ? 1 : 0;
}
