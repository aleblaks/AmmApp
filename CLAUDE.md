# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run build        # build to dist/ (what GitHub Pages deploys)
npm run typecheck    # tsc --noEmit, no test suite exists
npm run dev          # Vite dev server — NOT a faithful Pages test (see below)
node ghpages-sim.mjs # faithful GitHub Pages simulator on http://localhost:4178/AmmApp/
```

**Always test cold-load with `ghpages-sim.mjs`, not `npm run dev`.** Vite dev serves `index.html` for any path, giving a false positive. The simulator faithfully returns 200 only on `/AmmApp/` and 404+404.html on all other paths — the same behavior as the real Pages host.

## Architecture

Single-page app: React 18 + Vite 5 + react-router-dom 6 + TypeScript, deployed on GitHub Pages at `https://aleblaks.github.io/AmmApp/`.

**Why HashRouter:** GitHub Pages project repos serve `index.html` (HTTP 200) only on the base path `/AmmApp/`. Any path-style URL like `/AmmApp/airportshift/privacy` returns 404. HashRouter puts all routing after `#`, so the server always sees `/AmmApp/` → always 200 → cold-load works for store reviewers and QR scans. `public/404.html` is a fallback that converts path-style links to hash form for edge cases.

**`vite.config.ts` — `base: './'`:** all asset URLs are relative, so the build works regardless of the repo name or GitHub subdirectory.

**Deploy:** `.github/workflows/deploy.yml` builds `dist/` and publishes it as a Pages artifact on every push to `main`. GitHub Settings → Pages → Source must be **GitHub Actions** (not "Deploy from a branch", which would publish raw source files).

## Data flow

All app-specific data lives in two files; no new components are needed to add an app:

- **`src/content.ts`** — privacy and support text, structured as `privacyData` and `supportData` (`Record<string, AppPrivacy>`), keyed by route slug (e.g. `airportshift`). Adding a new app = adding one entry here.
- **`src/apps.ts`** — QR router config: deep-link scheme, import path, Android package, iOS App Store ID. Also contains `detectOS()`, `buildDeepLink()`, `storeUrlFor()`. `iosAppId` for AirportShift is currently a placeholder (`'0000000000'`) — replace with the real numeric ID when the app is published.

Routes are generic (`/:app/open`, `/:app/privacy`, `/:app/support`). `PrivacyPage` and `SupportPage` are thin wrappers that look up their slug in the data maps and pass the result to `DocPage` for rendering.

## QR router — critical privacy constraint

The QR encoded in the app **must** use the hash-form URL:
```
https://aleblaks.github.io/AmmApp/#/airportshift/open?d=<payload>
```
**Never** the path-form:
```
https://aleblaks.github.io/AmmApp/airportshift/open?d=<payload>  ← wrong
```
In the path-form, `?d=` is a real query string that GitHub's server receives and logs **before** the 404.html redirect runs — shift data leaks server-side. The `#` fragment is client-side only and never reaches GitHub servers. This constraint is documented in `apps.ts` and must be enforced in the private AirportShift repo when implementing `encodeMonthToUrl()` (Fase 4).

## QR open flow (`src/OpenPage.tsx`)

On mobile: sets `window.location.href` to the custom scheme deep link (`airportshift://c?d=<payload>`), then listens for `visibilitychange`/`blur`/`pagehide`. After 1800 ms, if the page is still visible, falls back to the appropriate store URL. On desktop: shows a "open on your phone" message with links to both stores. Manual store buttons are always rendered as a safety net.

## Pending TODOs

- Replace `iosAppId: '0000000000'` in `src/apps.ts` with the real App Store numeric ID once AirportShift is published.
- Add `balancelife` entry to `privacyData`, `supportData` (content.ts) and `apps` (apps.ts).
- Fase 3: real-device test (QR scan → app opens / app absent → correct store).
- Fase 4: in private `aleblaks/AirportShift` repo, `encodeMonthToUrl()` must emit only the hash-form URL; update `parseColleaguePayload()` and the in-app scanner to also recognize https URLs; preserve retrocompatibility with old `airportshift://` QR codes.
- Custom domain `www.ammapp.it` (not yet registered): when registered, add `public/CNAME` (so Vite copies it to `dist/CNAME`), make `404.html` host-aware (no `/AmmApp/` prefix on custom domain), configure DNS.
