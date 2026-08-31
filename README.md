# Jack Fowler — Portfolio Site

Personal portfolio / résumé website for Jack Fowler, built with **React 18 + TypeScript**
and **Vite**, deployed to GitHub Pages at **https://jackfowler.me** (custom domain).

## Quickstart

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (localhost)
npm run dev
```

Then open **http://localhost:5173** in your browser. Vite serves with hot module
replacement (HMR) — edits to `src/` show up instantly.

## Useful commands

| Command             | What it does                                              |
| ------------------- | --------------------------------------------------------- |
| `npm run dev`       | Start dev server → http://localhost:5173                  |
| `npm run build`     | Production build to `dist/` (also generates `sitemap.xml`) |
| `npm run preview`   | Serve the built `dist/` locally to verify production output |
| `npm run lint`      | ESLint check over `src/` (must pass with zero warnings)   |
| `npm run deploy`    | Build + publish `dist/` to the `gh-pages` branch          |

## Tech stack

- **React 18** + **TypeScript** (strict) — `src/`
- **Vite 4** — dev server, build, bundling
- **React Router v6** — routes: `/`, `/projects`, `/projects/:slug`, `/resume`
- **react-helmet-async** — per-page SEO/head tags
- **react-katex / katex** — math rendering in project write-ups
- **react-medium-image-zoom** — zoomable project images
- **vite-plugin-sitemap** — sitemap generation (hostname `jackfowler.me`)
- **gh-pages** — deployment to GitHub Pages

## Project structure

```
src/
  data/        projects.tsx · experience.ts · machines.ts  (content source of truth)
  pages/       Home · Projects · ProjectDetail
  components/  Navbar, Footer, ProjectCard, MachineCassette, Timeline, ...
  assets/      images & project media (src/assets/Projects/<Folder>/)
  workers/     titleTimer.ts (tab-title animation, Vite ?worker import)
public/        CNAME, 404.html (SPA fallback), favicon, robots.txt
```

See **[agents.md](./agents.md)** for full agentic context, conventions, and gotchas
when working on this repo.

## Deployment

Deployment is manual and goes to GitHub Pages:

```bash
npm run deploy   # builds dist/ and pushes it to the gh-pages branch
```

- The working branch is `main`; `dist/` and `node_modules/` are gitignored.
- `public/CNAME` keeps the custom domain `jackfowler.me` intact.
- `public/404.html` is the client-side routing fallback required by GitHub Pages.

## Requirements

- Node.js 18+ (developed on Node 22) and npm 9+.
