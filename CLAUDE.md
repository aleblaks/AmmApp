# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run build     # build to dist/ (what GitHub Pages deploys)
npm run dev       # Vite dev server (localhost:5173)
```

No test suite exists. TypeScript errors surface at build time (`vite build` runs `tsc` implicitly via the plugin).

## Architecture

Single-page app: **React 19 + Vite 6 + react-router-dom 7 + TypeScript**, deployed on GitHub Pages at `https://aleblaks.github.io/AmmApp/`.

**Why HashRouter:** GitHub Pages project repos serve `index.html` (HTTP 200) only on the base path `/AmmApp/`. Any path-style URL returns 404. HashRouter puts all routing after `#`, so the server always sees `/AmmApp/` → always 200 → cold-load works for store reviewers and QR scans. `public/404.html` is a fallback for edge cases.

**`vite.config.ts` — `base: './'` in build only:** asset URLs are relative in production, `/` in dev. This makes the build work regardless of the repo name.

**Deploy:** `.github/workflows/deploy.yml` builds `dist/` and publishes it as a Pages artifact on every push to `main`. GitHub Settings → Pages → Source must be **GitHub Actions**.

## Source layout

All site-specific code lives under `src/site/`. Entry point is `src/site/App.tsx` via `src/main.tsx`.

```
src/
  AmmAppIcon/          # PNG icons imported directly by components (Vite bundles them)
    AmmAppIcone.png    # navbar logo
    AirportShift.png   # card + OpenPage icon
    BalanceLife.png    # card icon
  site/
    App.tsx            # root: LangProvider → ClientOnly → HashRouter → Layout + routes
    lang.tsx           # bilingual context: LangProvider, useLang, useT, Bi type
    apps.ts            # QR router config + detectOS/buildDeepLink/storeUrlFor
    content.ts         # privacy & support text (privacyData, supportData)
    styles.css         # Midnight Indigo design system — pure CSS, no Tailwind
    Home.tsx           # hero + app cards grid
    OpenPage.tsx       # QR deep-link router (/:app/open)
    PrivacyPage.tsx    # thin wrapper → DocPage
    SupportPage.tsx    # thin wrapper → DocPage
    DocPage.tsx        # renders PrivacyDoc / support content
    components/
      Layout.tsx       # sticky header + footer
      LangSwitch.tsx   # IT/EN pill toggle
public/
  404.html             # converts path-form URLs to hash-form
  icon-ammapp.png      # favicon (referenced in index.html)
  icon-airportshift.png
  icon-balancelife.png
```

## App card structure

Each live app card has:
- **Top-right**: Apple (inline SVG) and Android (Material Symbols font) icons — direct links to their respective stores.
- **Bottom-center**: "Scarica l'app" (primary) + "Scopri di più" (ghost). "Scarica l'app" uses `detectOS()` to link directly to App Store (iOS), Google Play (Android), or App Store as fallback (desktop). "Scopri di più" links to `/:app/open`.
- **Bottom-right**: `Privacy · Assistenza` as plain text links.

**Material Symbols** is loaded via Google Fonts CDN in `index.html` (only the `android` glyph). The Apple logo is an inline SVG path — Material Symbols does not include third-party brand logos.

## Adding a new app

1. **`src/site/apps.ts`** — add entry to `apps` with scheme, androidPackage, iosAppId.
2. **`src/site/content.ts`** — add entry to `privacyData` and `supportData`.
3. **`src/site/Home.tsx`** — add entry to `SHOWCASE` with imported icon from `src/AmmAppIcon/`.
4. **`src/site/OpenPage.tsx`** — add icon to `appIcons` map.
5. Drop the PNG icon in `src/AmmAppIcon/` (Vite bundles it) and in `public/` (for favicon/fallback use).

Routes are generic (`/:app/open`, `/:app/privacy`, `/:app/support`) — no new routes needed.

## Bilingual system

`useT(bi)` returns `bi.it` or `bi.en` based on the active language (browser-detected, persisted to `localStorage['ammapp.lang']`). `Bi` is `{ it: string; en: string }`. Every user-visible string in `src/site/` uses this pattern.

## QR router — critical privacy constraint

The QR encoded in the app **must** use the hash-form URL:
```
https://aleblaks.github.io/AmmApp/#/airportshift/open?d=<payload>
```
**Never** the path-form — `?d=` would be a real query string GitHub's server receives and logs before the 404.html redirect, leaking shift data server-side.

`OpenPage.tsx` on mobile: fires the custom-scheme deep link, listens for `visibilitychange`/`blur`/`pagehide`. After 1800 ms, if the page is still visible, redirects to the store. On desktop: shows a "open on your phone" message.

## Pending TODOs

- Replace `iosAppId: '0000000000'` in `src/site/apps.ts` with the real App Store numeric ID when AirportShift is published.
- Add `balancelife` entry to `privacyData`, `supportData`, `apps`, and `appIcons`.
- Real-device test: QR scan → app opens / app absent → correct store.
- Custom domain `www.ammapp.it` (not yet registered): add `public/CNAME`, make `404.html` host-aware, configure DNS.

## Note on Lovable

This repo is connected to Lovable. Avoid force-pushing or rewriting published git history — it corrupts Lovable's project history.
