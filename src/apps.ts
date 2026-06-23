// Registry of apps the QR "router" page can hand off to, plus the helpers used
// to build the deep link and the store URLs. Add a new app here (keyed by the
// slug used in /:app/open) to support it — no new component needed.
//
// NOTE: the apps are not published yet, so iosAppId is a PLACEHOLDER. Fill in
// the real App Store numeric id once the app is live. The Android package is
// already final.

export interface StoreLinks {
  scheme: string // custom URL scheme, e.g. 'airportshift'
  importPath: string // in-app path that imports shifts, e.g. 'c' -> airportshift://c?d=...
  androidPackage: string
  iosAppId: string // App Store numeric id (digits only). PLACEHOLDER until published.
}

export interface AppEntry {
  appName: string
  store: StoreLinks
}

export const apps: Record<string, AppEntry> = {
  airportshift: {
    appName: 'AirportShift',
    store: {
      scheme: 'airportshift',
      importPath: 'c',
      androidPackage: 'com.aleblaks.TurniAeroporto',
      iosAppId: '0000000000', // TODO: real App Store id when published
    },
  },
  // balancelife: { appName: 'Balance Life', store: { scheme: 'balancelife', ... } },
}

export type OS = 'ios' | 'android' | 'other'

// Accepts an explicit user-agent so the logic stays pure and testable.
export function detectOS(ua: string = navigator.userAgent || ''): OS {
  if (/android/i.test(ua)) return 'android'
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios'
  // iPadOS 13+ reports as Macintosh but is touch-capable
  if (/Macintosh/i.test(ua) && typeof document !== 'undefined' && 'ontouchend' in document)
    return 'ios'
  return 'other'
}

export function androidStoreUrl(pkg: string): string {
  return `https://play.google.com/store/apps/details?id=${pkg}`
}

export function iosStoreUrl(appId: string): string {
  return `https://apps.apple.com/app/id${appId}`
}

// Deep link that hands the shift payload to the installed app.
// `d` is the (decoded) payload; it is re-encoded for the query string.
//
// PRIVACY CONSTRAINT FOR FASE 4 (app side): the QR must encode the HASH-form URL
//   https://aleblaks.github.io/AmmApp/#/airportshift/open?d=<payload>
// and NEVER the path-form (.../airportshift/open?d=<payload>). In the path-form the
// `?d=` is a real query string that GitHub's server receives and logs BEFORE the
// 404.html redirect runs — the data leak happens regardless of the redirect. The
// fragment (#) keeps the payload client-side. So encodeMonthToUrl() must emit the
// #-form exclusively to satisfy the "no shift data to GitHub servers" requirement.
export function buildDeepLink(entry: AppEntry, d: string | null): string {
  const base = `${entry.store.scheme}://${entry.store.importPath}`
  return d ? `${base}?d=${encodeURIComponent(d)}` : `${entry.store.scheme}://`
}

export function storeUrlFor(os: OS, entry: AppEntry): string | null {
  if (os === 'ios') return iosStoreUrl(entry.store.iosAppId)
  if (os === 'android') return androidStoreUrl(entry.store.androidPackage)
  return null
}
