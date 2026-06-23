# AmmApp

Static site (React + React Router) hosted on GitHub Pages. It serves the privacy
policies for AirportShift and future sibling apps, and will later host the QR
"router" landing page for shift sharing.

Live base URL: **https://aleblaks.github.io/AmmApp/**

## Privacy URLs (paste into the stores)

- AirportShift: `https://aleblaks.github.io/AmmApp/#/airportshift/privacy`

The URLs use **HashRouter** so a cold, direct load always resolves: GitHub Pages
serves `index.html` (HTTP 200) for the base path and the router reads the part
after `#` in the browser. A `public/404.html` fallback also converts path-style
deep links (`/AmmApp/airportshift/privacy`) into the hash form.

## Local development

```bash
npm install
npm run dev      # http://localhost:5173 (note: dev server is NOT a faithful
                 # GitHub Pages test — it serves index.html for any path)
npm run build    # outputs to dist/
```

## Deploy

The repo ships a GitHub Actions workflow (`.github/workflows/deploy.yml`) that
builds and publishes `dist/` on every push to `main`.

One-time setup on GitHub:

1. Create the repo `aleblaks/AmmApp` and push this folder to `main`.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. Push to `main` (or run the workflow manually). When it finishes, the site is
   live at the base URL above.

## Adding another app (e.g. Balance Life)

Add an entry to `privacyData` in `src/content.ts` keyed by its slug
(e.g. `balancelife`). The route `/:app/privacy` and the layout are already
generic — no new component is needed. Its URL becomes
`https://aleblaks.github.io/AmmApp/#/balancelife/privacy`.
