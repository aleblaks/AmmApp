# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev            # Vite dev server, localhost:5173
npm run build          # outputs dist/ (what GitHub Pages deploys)
npx tsc --noEmit       # type check; vite build does NOT type-check
node ghpages-sim.mjs   # serves dist/ at localhost:4178/AmmApp/ with real GitHub Pages 404 semantics
```

No test suite, no lint step in CI. The Vite dev server serves `index.html` for any path, so it is not a faithful GitHub Pages test; use `ghpages-sim.mjs` after a build when touching routing or `public/404.html`.

## Deploy and hosting

`.github/workflows/deploy.yml` builds and publishes `dist/` on every push to `main`. Live at `https://aleblaks.github.io/AmmApp/`. GitHub Pages serves `index.html` with `Cache-Control: max-age=600`, so a fresh deploy can look stale for up to ~10 minutes.

- **HashRouter is required.** Pages only returns 200 for the base path; every route lives after `#`. `public/404.html` converts path-form URLs to hash-form as a fallback.
- **`base: './'` in build only** (`vite.config.ts`). Never reference assets by absolute path (`/foo.png`): it breaks under `/AmmApp/`. Import images from `src/` as modules instead; `public/` is only for the favicon and `404.html`.
- The repo is connected to **Lovable** (see `AGENTS.md`): never force-push or rewrite pushed history; keep `main` working.

## Architecture

React 19 + react-router-dom 7 + TypeScript, pure CSS (no Tailwind, no UI library). All site code is in `src/site/`; `App.tsx` holds the route table:

| Route | Page | Purpose |
|---|---|---|
| `/` | `Landing.tsx` | studio landing |
| `/apps` | `AppsPage.tsx` | app cards (`SHOWCASE` array) |
| `/:app/features` | `FeaturesPage.tsx` | "Scopri di più": hero + screenshot sections (`CONTENT` map) |
| `/:app/open` | `OpenPage.tsx` | QR deep-link router |
| `/:app/store` | `StorePage.tsx` | redirects to App Store / Play Store by device |
| `/:app/privacy`, `/:app/support` | `PrivacyPage` / `SupportPage` → `DocPage` | texts from `content.ts` |

**Single source of truth for stores: `src/site/apps.ts`.** Each app entry has `scheme`, `importPath`, `androidPackage`, `iosAppId`, `androidComingSoon`. Pages never build store URLs by hand; they use `iosStoreUrl`, `androidStoreUrl`, `storeUrlFor(os, entry)` and `detectOS()`. `storeUrlFor` returns `null` for Android while `androidComingSoon` is true, and every page then shows `androidComingSoonText` instead of a link. Flip the flag to `false` when an app ships on Google Play; nothing else changes.

Page data requirements differ:
- `privacy` / `support` need only a `privacyData` / `supportData` entry in `content.ts` (Resoconto has these but no `apps.ts` entry).
- `features` needs both an `apps.ts` entry and a `CONTENT` entry in `FeaturesPage.tsx`; otherwise it renders "not found".
- App icons are duplicated in `appIcons` maps in `OpenPage.tsx` and `FeaturesPage.tsx`, and imported in `AppsPage.tsx`.

`content.ts` holds the privacy/support copy that App Store listings link to. Treat it as legal text: change it only when asked.

Feature sections on `/:app/features` take `{ image?, alt, title, desc, accent }`. Screenshots live in `src/AmmAppMockups/` (Balance Life in `balancelife/`). `accent` tints the screenshot's shadow; a missing `image` renders a dashed placeholder. Row layout cycles normal / reversed / stacked (`i % 3`).

## Bilingual copy

Every visible string is a `Bi = { it, en }` rendered with `useT()` from `lang.tsx`. Language is browser-detected and persisted in `localStorage['ammapp.lang']`. Always write both languages.

## Design system

`styles.css` is token-based: off-black + the logo yellow (`--accent: #fde20b`) as the single accent, with light and dark themes via `prefers-color-scheme`. Yellow is only a fill with `--on-accent` text; links use `--link` (darker in light mode). Radius rule: interactive elements are pills, surfaces 20px, phone screenshots 28px. Motion is CSS only; hidden start states must stay inside `prefers-reduced-motion: no-preference` and `@supports (animation-timeline: view())`. Icons: Apple is an inline SVG; Android is the Material Symbols `android` glyph loaded in `index.html`.

## QR router: privacy constraint

QR codes in the apps must use the hash form, `https://aleblaks.github.io/AmmApp/#/airportshift/open?d=<payload>`, never the path form: a real `?d=` query would reach GitHub's server logs, leaking shift data. On mobile, `OpenPage` fires the custom-scheme deep link and falls back to the store after 1800 ms if the page is still visible; on desktop it asks the user to open the link on their phone.

## Guides for the owner

`MODIFICHE_PER_LE_APP.md` (store flags, activating an app) and `MODIFICA_PAGINA_BALANCE_LIFE.md` (editing the Balance Life features page) are step-by-step guides in Italian. Update them when you change the files they reference, and refer to code by identifier, not line number.

## Pending

- Real-device test: QR scan → app opens / app absent → correct store.
- Custom domain `www.ammapp.it` (not registered): add `public/CNAME`, make `404.html` host-aware, configure DNS.
