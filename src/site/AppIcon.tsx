import type { CSSProperties } from 'react'
import { useTheme } from './theme'
import AirportShiftDark from '../AmmAppIcon/AirportShift.png'
import AirportShiftLight from '../AmmAppIcon/AirportShift-light.png'
import BalanceLifeDark from '../AmmAppIcon/BalanceLife.png'
import BalanceLifeLight from '../AmmAppIcon/BalanceLife-light.png'

// Unico posto dove stanno le icone delle app: quella chiara col tema chiaro, quella scura col tema scuro.
// Per un'app nuova: due file in src/AmmAppIcon/ e una riga qui.
const ICONS = {
  airportshift: { dark: AirportShiftDark, light: AirportShiftLight },
  balancelife: { dark: BalanceLifeDark, light: BalanceLifeLight },
}
export type AppSlug = keyof typeof ICONS

export function AppIcon({ app, className, alt = '', style }: { app: string; className?: string; alt?: string; style?: CSSProperties }) {
  const theme = useTheme()
  const icon = ICONS[app as AppSlug]
  return icon ? <img src={icon[theme]} alt={alt} className={className} style={style} /> : null
}
