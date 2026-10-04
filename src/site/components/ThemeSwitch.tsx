import { useTheme, setTheme, type Theme } from '../theme'
import { useT } from '../lang'

const THEMES: { code: Theme; it: string; en: string }[] = [
  { code: 'light', it: 'Chiaro', en: 'Light' },
  { code: 'dark', it: 'Scuro', en: 'Dark' },
]

export function ThemeSwitch() {
  const theme = useTheme()
  const t = useT()
  return (
    <div className="lang-switch" role="group" aria-label={t({ it: 'Tema', en: 'Theme' })}>
      {THEMES.map((o) => (
        <button
          key={o.code}
          type="button"
          className={o.code === theme ? 'lang active' : 'lang'}
          aria-pressed={o.code === theme}
          onClick={() => setTheme(o.code)}
        >
          {t(o)}
        </button>
      ))}
    </div>
  )
}
