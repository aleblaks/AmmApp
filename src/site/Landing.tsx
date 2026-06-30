import { Link } from 'react-router-dom'
import { useT } from './lang'
import AmmAppIcon from '../AmmAppIcon/AmmAppIcone.png'

export function Landing() {
  const t = useT()
  return (
    <section className="hero landing-hero">
      <img src={AmmAppIcon} alt="AmmApp" className="brand-mark lg landing-logo" />
      <span className="hero-eyebrow">
        <span className="dot" aria-hidden />
        {t({ it: 'App indipendenti, fatte con cura', en: 'Independent apps, crafted with care' })}
      </span>
      <h1>
        {t({ it: 'App semplici, ', en: 'Simple apps, ' })}
        <span className="grad">{t({ it: 'private', en: 'private' })}</span>
        {t({ it: ', che restano sul tuo telefono.', en: ', that stay on your phone.' })}
      </h1>
      <p className="hero-sub">
        {t({
          it: "AmmApp è un piccolo laboratorio indipendente. Costruiamo applicazioni mobile leggere, senza account né server, dove i tuoi dati non lasciano mai il dispositivo.",
          en: "AmmApp is a small independent studio. We build lightweight mobile apps with no accounts and no servers — your data never leaves your device.",
        })}
      </p>
      <div className="landing-cta">
        <Link to="/apps" className="btn btn-primary btn-lg">
          {t({ it: 'Scopri le app', en: 'Discover the apps' })}
        </Link>
      </div>
    </section>
  )
}
