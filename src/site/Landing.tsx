import { Link } from 'react-router-dom'
import { useT } from './lang'
import AmmAppIcon from '../AmmAppIcon/AmmAppIcone.png'
import MockupCalendario from '../AmmAppMockups/screen-calendario.png'

export function Landing() {
  const t = useT()
  return (
    <section className="hero landing-hero">
      <div className="landing-copy">
        <img src={AmmAppIcon} alt="AmmApp" className="landing-logo" />
        <h1>
          {t({ it: 'App semplici, ', en: 'Simple apps, ' })}
          <span className="mark">{t({ it: 'private', en: 'private' })}</span>
          {t({ it: ', che restano sul tuo telefono.', en: ', that stay on your phone.' })}
        </h1>
        <p className="hero-sub">
          {t({
            it: 'Un piccolo laboratorio indipendente. App leggere, senza account né server: i tuoi dati non lasciano mai il telefono.',
            en: 'A small independent studio. Lightweight apps with no accounts and no servers: your data never leaves your phone.',
          })}
        </p>
        <div className="landing-cta">
          <Link to="/apps" className="btn btn-primary btn-lg">
            {t({ it: 'Scopri le app', en: 'Discover the apps' })}
          </Link>
        </div>
      </div>
      <div className="landing-visual">
        <img
          src={MockupCalendario}
          alt={t({ it: 'AirportShift: calendario dei turni', en: 'AirportShift: shift calendar' })}
        />
      </div>
    </section>
  )
}
