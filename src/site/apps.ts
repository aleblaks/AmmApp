export interface StoreLinks {
  scheme: string
  importPath: string
  androidPackage: string
  iosAppId: string
  androidComingSoon?: boolean
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
      iosAppId: '6783308412',
      androidComingSoon: true,
    },
  },
}

export const androidComingSoonText = {
  it: 'Disponibile su Android dal 20 luglio',
  en: 'Coming to Android on July 20',
}

export type OS = 'ios' | 'android' | 'other'

export function detectOS(ua?: string): OS {
  const agent = ua ?? (typeof navigator !== 'undefined' ? navigator.userAgent || '' : '')
  if (!agent) return 'other'
  if (/android/i.test(agent)) return 'android'
  if (/iPhone|iPad|iPod/i.test(agent)) return 'ios'
  if (/Macintosh/i.test(agent) && typeof document !== 'undefined' && 'ontouchend' in document)
    return 'ios'
  return 'other'
}

export function androidStoreUrl(pkg: string): string {
  return `https://play.google.com/store/apps/details?id=${pkg}`
}

export function iosStoreUrl(appId: string): string {
  return `https://apps.apple.com/app/id${appId}`
}

export function buildDeepLink(entry: AppEntry, d: string | null): string {
  const base = `${entry.store.scheme}://${entry.store.importPath}`
  return d ? `${base}?d=${encodeURIComponent(d)}` : `${entry.store.scheme}://`
}

export function storeUrlFor(os: OS, entry: AppEntry): string | null {
  if (os === 'ios') return iosStoreUrl(entry.store.iosAppId)
  if (os === 'android' && !entry.store.androidComingSoon) return androidStoreUrl(entry.store.androidPackage)
  return null
}
