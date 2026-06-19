# val-portfolio

Bilingual (Español / English) portfolio for Valeria Jiménez — designer, product
and strategy. Built with the App Router, structured as a story of work chapters.

## Stack

- **Next.js 16** (App Router, Turbopack) — note: in Next 16, middleware is named
  `proxy` (see [`src/proxy.ts`](src/proxy.ts)). Vendored docs live in
  `node_modules/next/dist/docs/`.
- **React 19**
- **next-intl** for i18n (`es` default, `en`), locale prefix always on (`/es`, `/en`).
- **Tailwind CSS v4** — source scanning is scoped to `./src` in
  [`src/app/globals.css`](src/app/globals.css) so the large media in `public/`
  is not walked on every build.
- **TypeScript**, **ESLint**, **Prettier** (+ `prettier-plugin-tailwindcss`).
- **sharp** — used by [`src/lib/photos.ts`](src/lib/photos.ts) to read image
  dimensions at build time.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 — it redirects to the default locale (`/es`).

## Scripts

| Script              | What it does                          |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Dev server (Turbopack)                |
| `npm run build`     | Production build                      |
| `npm run start`     | Serve the production build            |
| `npm run lint`      | ESLint                                |
| `npm run typecheck` | `tsc --noEmit`                        |

## Project structure

```
src/
  app/[locale]/        Routes: home, about, projects, contact, work/[slug], proposals/*
  components/site/     Live UI components (current design)
  content/             Content model: heroes, mentions, chapters, about, photo-manifest
  i18n/                next-intl routing / request / navigation
  lib/photos.ts        Filesystem photo resolver (build-time)
  proxy.ts             next-intl locale middleware (Next 16 "proxy")
messages/              es.json / en.json message catalogs
public/                Static assets and photography
```

## Notes

- Copy is largely inlined per page as `es ? "…" : "…"`; the `messages/*.json`
  catalogs are used for metadata and the 404 page.
- `public/` holds large original media (video/photography). Consider Git LFS or
  an external asset host before this grows further.
