import { useState, type ReactNode } from 'react'
import { useLang, useT } from '../lang'
import { TLink } from '../TLink'
import { ThemeSwitch } from './ThemeSwitch'
import AmmAppIcon from "../../AmmAppIcon/AmmAppIcone.png"

const MAIL = 'ammapp.help@gmail.com'

// L'indirizzo scritto per esteso, con un tasto per copiarlo: un link «mailto:» da solo non fa nulla
// su un computer senza programma di posta configurato.
function Contact() {
  const t = useT()
  const [copied, setCopied] = useState(false)
  return (
    <div className="ft-contact" id="contatti">
      <a href={`mailto:${MAIL}`}>{MAIL}</a>
      <button type="button" className="btn" onClick={() => { void navigator.clipboard?.writeText(MAIL).then(() => setCopied(true)) }}>
        <span aria-live="polite">{copied ? t({ it: 'Copiato', en: 'Copied' }) : t({ it: 'Copia indirizzo', en: 'Copy address' })}</span>
      </button>
    </div>
  )
}

function LangSwitch() {
  const { lang, setLang } = useLang()
  const t = useT()
  return (
    <div className="lang-switch" role="group" aria-label={t({ it: 'Lingua', en: 'Language' })}>
      {(['it', 'en'] as const).map((code) => (
        <button key={code} type="button" className={code === lang ? 'lang active' : 'lang'} aria-pressed={code === lang} onClick={() => setLang(code)}>
          {code === 'it' ? 'Italiano' : 'English'}
        </button>
      ))}
    </div>
  )
}

export function Layout({ children }: { children: ReactNode }) {
  const t = useT()
  return (
    <div className="shell">
      <header className="site-header">
        <div className="site-header-inner">
          <TLink to="/" className="brand" aria-label="AmmApp home">
            <img src={AmmAppIcon} alt="" className="brand-mark" />
            <span>AmmApp</span>
          </TLink>
          <nav className="nav-links" aria-label="Primary">
            <TLink to="/apps" className="nav-link">{t({ it: 'App', en: 'Apps' })}</TLink>
            <button type="button" className="nav-link nav-link-secondary" onClick={() => document.getElementById('contatti')?.scrollIntoView({ block: 'center' })}>{t({ it: 'Contatti', en: 'Contact' })}</button>
            <ThemeSwitch />
          </nav>
        </div>
      </header>

      {children}

      <footer className="site-footer">
        <div className="site-footer-inner">
          <div className="ft-brand">
            <TLink to="/" className="brand"><img src={AmmAppIcon} alt="" className="brand-mark" /><span>AmmApp</span></TLink>
            <p>{t({ it: 'App per iPhone e Android che funzionano senza account e senza server.', en: 'Apps for iPhone and Android that work with no account and no server.' })}</p>
          </div>
          <nav className="ft-links" aria-label={t({ it: 'Pagine', en: 'Pages' })}>
            <TLink to="/airportshift/features">AirportShift</TLink>
            <TLink to="/balancelife/features">Balance Life</TLink>
            <TLink to="/insieme">{t({ it: 'Usarle insieme', en: 'Using them together' })}</TLink>
          </nav>
          <div className="ft-side">
            <Contact />
            <LangSwitch />
          </div>
        </div>
        <p className="ft-legal">© {new Date().getFullYear()} AmmApp</p>
      </footer>
    </div>
  )
}
