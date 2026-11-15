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
// vt: nome della transizione di pagina (lo stesso telefono in due pagine vola dall'una all'altra).
// then: un secondo screenshot che subentra dentro la stessa cornice mentre si scorre (come un tocco nell'app);
// 'night' fa subentrare lo stesso screenshot nell'altro tema, dall'alto, come il giorno che diventa notte.
export function Phone({ name, fallback, alt, vt, then }: { name: string; fallback?: string; alt: string; vt?: string; then?: string }) {
  const dark = useDark()
  const src = shot(name, dark)
  const next = then === 'night' ? shot(name, !dark) : then && shot(then, dark)
  // iOS e Watch: cornici ufficiali Apple (Product Bezels); Android: cornice disegnata in CSS.
  const frame = name.includes('watch') ? 'fx-phone fx-watch fx-bezel' : ANDROID ? 'fx-phone fx-android' : 'fx-phone fx-bezel'
  if (src) return <div className={frame} style={{ viewTransitionName: vt }}><img src={src} alt={alt} loading="lazy" />{next && <img src={next} alt="" loading="lazy" className={then === 'night' ? 'fx-then fx-night' : 'fx-then'} />}</div>
  if (fallback) return <img src={fallback} alt={alt} className="fx-legacy" loading="lazy" />
  return <div className={`${frame} fx-phone-empty`}><span>{name}.png</span></div>
}

