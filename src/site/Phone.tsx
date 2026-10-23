import { useTheme } from './theme'
import { detectOS } from './apps'

// Screenshot nudi (1206×2622) caricati per nome: basta copiare il file in shots/.
// Varianti per chi visita: <nome>.png (iOS chiaro), <nome>-dark.png, <nome>-android.png,
// <nome>-android-dark.png. Se la variante manca si ripiega sulla base.
const SHOTS = import.meta.glob('../AmmAppMockups/shots/*.{png,webp}', { eager: true, import: 'default' }) as Record<string, string>
const file = (n: string) => SHOTS[`../AmmAppMockups/shots/${n}.png`] ?? SHOTS[`../AmmAppMockups/shots/${n}.webp`]
const ANDROID = detectOS() === 'android'
export const shot = (name: string, dark = false) =>
  (ANDROID && dark && file(`${name}-android-dark`)) || (ANDROID && file(`${name}-android`)) ||
  (dark && file(`${name}-dark`)) || file(name)

export const useDark = () => useTheme() === 'dark'

// Uno screenshot nudo va nella cornice dell'iPhone; il vecchio mockup (già incorniciato) no.
export function Phone({ name, fallback, alt }: { name: string; fallback?: string; alt: string }) {
  const src = shot(name, useDark())
  // iOS e Watch: cornici ufficiali Apple (Product Bezels); Android: cornice disegnata in CSS.
  const frame = name.includes('watch') ? 'fx-phone fx-watch fx-bezel' : ANDROID ? 'fx-phone fx-android' : 'fx-phone fx-bezel'
  if (src) return <div className={frame}><img src={src} alt={alt} loading="lazy" /></div>
  if (fallback) return <img src={fallback} alt={alt} className="fx-legacy" loading="lazy" />
  return <div className={`${frame} fx-phone-empty`}><span>{name}.png</span></div>
}

