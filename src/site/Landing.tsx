import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { useT, type Bi } from './lang'
import { Phone } from './Phone'
import AirportShiftIcon from '../AmmAppIcon/AirportShift.png'
import BalanceLifeIcon from '../AmmAppIcon/BalanceLife.png'
import MockupCalendario from '../AmmAppMockups/screen-calendario.png'
import BlHome from '../AmmAppMockups/balancelife/home.png'
import BlTrends from '../AmmAppMockups/balancelife/trends.png'
import MockupRiepilogo from '../AmmAppMockups/screen-riepilogo.png'

interface Door {
  slug: string
  name: string
  icon: string
  accent: string
  title: Bi
  desc: Bi
  shots: { name: string; fallback: string }[]
}

const DOORS: Door[] = [
  {
    slug: 'airportshift',
    name: 'AirportShift',
    icon: AirportShiftIcon,
    accent: '#0a84ff',
    title: { it: 'I turni di Aviation Service, letti in un secondo.', en: 'Aviation Service shifts, read in a second.' },
    desc: {
      it: 'Carichi il PDF dei turni: codici tradotti in orari, ore e straordinari contati, condivisione col collega via QR.',
      en: 'Load the shift PDF: codes turned into times, hours and overtime counted, sharing with a colleague via QR.',
    },
    shots: [{ name: 'as-hero', fallback: MockupCalendario }, { name: 'as-riepilogo', fallback: MockupRiepilogo }],
  },
  {
    slug: 'balancelife',
    name: 'Balance Life',
    icon: BalanceLifeIcon,
    accent: '#30d158',
    title: { it: 'La tua giornata, finalmente in equilibrio.', en: 'Your day, finally in balance.' },
    desc: {
      it: 'Lettura, palestra, lavoro, serie, studio: registri ciò che fai e guardi il tempo prendere forma.',
      en: 'Reading, gym, work, shows, study: log what you do and watch your time take shape.',
    },
    shots: [{ name: 'bl-hero', fallback: BlHome }, { name: 'bl-trends', fallback: BlTrends }],
  },
]

export function Landing() {
  const t = useT()
  return (
    <main className="ld">
      <section className="ld-hero">
        <div className="ld-copy">
          <h1 className="ld-title">
            {t({ it: 'App che restano ', en: 'Apps that stay ' })}
            <span className="ld-hl">{t({ it: 'sul tuo telefono.', en: 'on your phone.' })}</span>
          </h1>
          <p className="ld-sub">
            {t({
              it: 'Un piccolo laboratorio indipendente. Niente account, niente server: i tuoi dati non escono mai.',
              en: 'A small independent studio. No accounts, no servers: your data never leaves.',
            })}
          </p>
          <div className="ld-cta">
            <Link to="/apps" className="btn btn-primary btn-lg">{t({ it: 'Scopri le app', en: 'See the apps' })}</Link>
          </div>
        </div>
        <div className="ld-stage" aria-hidden>
          <div className="ld-glow" />
          <div className="ld-phone ld-phone-a"><Phone name="as-hero" fallback={MockupCalendario} alt="" /></div>
          <div className="ld-phone ld-phone-b"><Phone name="bl-hero" fallback={BlHome} alt="" /></div>
        </div>
      </section>

      {DOORS.map((d, i) => (
        <section key={d.slug} className={`ld-door ${i % 2 ? 'ld-door-alt' : ''}`} style={{ '--fx-accent': d.accent } as CSSProperties}>
          <Link to={`/${d.slug}/features`} className="ld-door-card fx-reveal">
            <div className="ld-door-copy">
              <img src={d.icon} alt="" className="ld-door-icon" />
              <p className="ld-door-name">{d.name}</p>
              <h2 className="fx-title">{t(d.title)}</h2>
              <p className="fx-desc">{t(d.desc)}</p>
              <span className="ld-door-more">
                {t({ it: 'Scopri di più', en: 'Learn more' })}
                <span className="material-symbols-outlined" aria-hidden>arrow_forward</span>
              </span>
            </div>
            <div className="ld-door-shots">
              {d.shots.map(s => <Phone key={s.name} name={s.name} fallback={s.fallback} alt={d.name} />)}
            </div>
          </Link>
        </section>
      ))}

      <section className="ld-manifesto fx-reveal">
        <p className="ld-big">
          {t({ it: 'Zero account. Zero server. Zero tracciamento.', en: 'Zero accounts. Zero servers. Zero tracking.' })}
        </p>
        <p className="fx-desc">
          {t({
            it: 'Ogni app funziona offline. Quello che scrivi resta tuo, e basta.',
            en: 'Every app works offline. What you write stays yours, period.',
          })}
        </p>
      </section>
    </main>
  )
}
