# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev            # Vite dev server, localhost:5173
npm run build          # outputs dist/ (what GitHub Pages deploys)
npx tsc --noEmit       # type check; vite build does NOT type-check
node ghpages-sim.mjs   # serves dist/ at localhost:4178/AmmApp/ with real GitHub Pages 404 semantics
```

No test suite, no lint step in CI. The Vite dev server serves `index.html` for any path, so it is not a faithful GitHub Pages test; use `ghpages-sim.mjs` after a build when touching routing or the generated pages.

## Deploy and hosting

`.github/workflows/deploy.yml` builds and publishes `dist/` on every push to `main`. Live at `https://aleblaks.github.io/AmmApp/`. GitHub Pages serves `index.html` with `Cache-Control: max-age=600`, so a fresh deploy can look stale for up to ~10 minutes.

- **Real paths, not `#` (since 2026-10-04), so Google can index each page.** `BrowserRouter` with `basename` = Vite's `BASE_URL`. The `pagine-per-google` plugin in `vite.config.ts` writes, after the build, one `index.html` per entry of `src/site/seo.ts` (own title, description, canonical, Open Graph, `SoftwareApplication` JSON-LD), plus `404.html` (SPA fallback, `noindex`), `sitemap.xml` and `robots.txt`. A new indexable page = a route in `App.tsx` + an entry in `SEO`.
- **Old `#` links still work:** `main.tsx` rewrites `#/path?query` to `/path#query` before React mounts.
- **Base:** `SITE_BASE` (default `/AmmApp/`) and `SITE_URL` (default `https://aleblaks.github.io/AmmApp/`) env vars in `vite.config.ts`; for a custom domain set `SITE_BASE=/` and `SITE_URL=https://…/`. Import images from `src/` as modules; `public/` is only for favicons and the `og:image` icons.
- **Images are shrunk at build time** by `vite-imagetools` (`immaginiLeggere` in `vite.config.ts`): everything under `AmmAppMockups/` becomes an 800 px WebP, `AmmAppIcon/` a 256 px WebP; `cornici/` is left alone. Keep dropping full-size originals into `src/`; never pre-shrink them by hand.
- **Pages are lazy-loaded** (`React.lazy` in `App.tsx`) except `Landing`. Shared screenshot helpers (`Phone`, `shot`, `useDark`) live in `Phone.tsx`, so importing them does not pull in `FeaturesPage`.
- `robots.txt` only counts at a domain root: on `aleblaks.github.io/AmmApp/` Google ignores it, so `/open` and `/store` also get a `noindex` meta at runtime (`Meta` in `App.tsx`).
- The repo is connected to **Lovable** (see `AGENTS.md`): never force-push or rewrite pushed history; keep `main` working.

## Architecture

React 19 + react-router-dom 7 + TypeScript, pure CSS (no Tailwind, no UI library). All site code is in `src/site/`; `App.tsx` holds the route table:

| Route | Page | Purpose |
|---|---|---|
| `/` | `Landing.tsx` | studio landing |
| `/apps` | `AppsPage.tsx` | app cards (`SHOWCASE` array) |
| `/:app/features` | `FeaturesPage.tsx` | "Scopri di più": Apple-style page (`PAGES` map) |
| `/:app/open` | `OpenPage.tsx` | QR deep-link router |
| `/:app/store` | `StorePage.tsx` | redirects to App Store / Play Store by device |
| `/:app/privacy`, `/:app/support` | `PrivacyPage` / `SupportPage` → `DocPage` | texts from `content.ts` |

**Single source of truth for stores: `src/site/apps.ts`.** Each app entry has `scheme`, `importPath`, `androidPackage`, `iosAppId`, `androidComingSoon`. Pages never build store URLs by hand; they use `iosStoreUrl`, `androidStoreUrl`, `storeUrlFor(os, entry)` and `detectOS()`. `storeUrlFor` returns `null` for Android while `androidComingSoon` is true, and every page then shows `androidComingSoonText` instead of a link. Flip the flag to `false` when an app ships on Google Play; nothing else changes.

Page data requirements differ:
- `privacy` / `support` need only a `privacyData` / `supportData` entry in `content.ts` (Resoconto has these but no `apps.ts` entry).
- `features` needs both an `apps.ts` entry and a `PAGES` entry in `FeaturesPage.tsx`; otherwise it renders "not found".
- App icons are duplicated in `appIcons` maps in `OpenPage.tsx` and `FeaturesPage.tsx`, and imported in `AppsPage.tsx`.

`content.ts` holds the privacy/support copy that App Store listings link to. Treat it as legal text: change it only when asked.

`FeaturesPage.tsx` is Apple-style: a `PAGES` map per app with hero, `chapters` (1–2 phones each, alternating), `tiles` (secondary features, optional screenshot), privacy block and CTA. Screenshots are raw simulator shots (1206×2622) dropped into `src/AmmAppMockups/shots/` with the names listed in the owner's `*-screenshot.md` (e.g. `as-hero.png`, `bl-live.png`); `import.meta.glob` picks them up by name. Optional per-visitor variants: `<name>-dark.png`, `<name>-android.png`, `<name>-android-dark.png` (chosen by `detectOS()` + `prefers-color-scheme`, falling back to `<name>.png`; Android visitors get a squarer frame, `.fx-android`) and `Phone` (in `Phone.tsx`) draws the frame. A missing shot falls back to the old framed mockup, or to an empty frame labeled with the expected filename. Scroll reveal is the CSS `.fx-reveal` class.

## Bilingual copy

Every visible string is a `Bi = { it, en }` rendered with `useT()` from `lang.tsx`. Language is browser-detected and persisted in `localStorage['ammapp.lang']`. Always write both languages.

## Design system

`styles.css` is token-based: off-black + the logo yellow (`--accent: #fde20b`) as the single accent, with light and dark themes via `prefers-color-scheme`. Yellow is only a fill with `--on-accent` text; links use `--link` (darker in light mode). Radius rule: interactive elements are pills, surfaces 20px, phone screenshots 28px. Motion is CSS only; hidden start states must stay inside `prefers-reduced-motion: no-preference` and `@supports (animation-timeline: view())`. Icons: Apple is an inline SVG; Android is the Material Symbols `android` glyph loaded in `index.html`.

## QR router: privacy constraint

QR codes in the apps must keep the payload after `#`: `https://aleblaks.github.io/AmmApp/#/airportshift/open?d=<payload>` (what the apps generate today; `main.tsx` turns it into `/airportshift/open#d=<payload>`, which `OpenPage` reads from the hash). Never a real `?d=` query: it would reach GitHub's server logs, leaking shift data. On mobile, `OpenPage` fires the custom-scheme deep link and falls back to the store after 1800 ms if the page is still visible; on desktop it asks the user to open the link on their phone.

## Guides for the owner

`MODIFICHE_PER_LE_APP.md` (store flags, activating an app) and `MODIFICA_PAGINA_BALANCE_LIFE.md` (editing the Balance Life features page) are step-by-step guides in Italian. Update them when you change the files they reference, and refer to code by identifier, not line number.

## Pending

- Real-device test: QR scan → app opens / app absent → correct store.
- Custom domain `www.ammapp.it` (not registered): add `public/CNAME`, build with `SITE_BASE=/ SITE_URL=https://www.ammapp.it/`, configure DNS.
- Google Search Console: verify the site and submit `sitemap.xml` (owner's account).
