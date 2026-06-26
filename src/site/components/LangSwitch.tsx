import { useLang } from '../lang'
import type { LangCode } from '../content'

const LANGS: { code: LangCode; label: string }[] = [
  { code: 'it', label: 'IT' },
  { code: 'en', label: 'EN' },
]

export function LangSwitch() {
  const { lang, setLang } = useLang()
  return (
    <div className="lang-switch" role="group" aria-label="Language">
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          className={l.code === lang ? 'lang active' : 'lang'}
          aria-pressed={l.code === lang}
          onClick={() => setLang(l.code)}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
