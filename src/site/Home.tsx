import { Link } from 'react-router-dom'
import { useT, type Bi } from './lang'

type Status = 'live' | 'soon'

interface AppShowcase {
  slug: string
  name: string
  icon: string
  status: Status
  tagline: Bi
  features: Bi[]
}

const SHOWCASE: AppShowcase[] = [
  {
    slug: 'airportshift',
    name: 'AirportShift',
    icon: './icon-airportshift.png',
    status: 'live',
    tagline: {
      it: 'Gestisci e condividi i tuoi turni di lavoro in aeroporto. Tutto in locale, niente server.',
      en: 'Manage and share your airport work shifts. Fully on-device, no servers.',
    },
    features: [
      { it: 'Importa i turni dal PDF', en: 'Import shifts from PDF' },
      { it: 'Condividi con un collega via QR', en: 'Share with a colleague via QR' },
      { it: 'Aggiungi al calendario del telefono', en: 'Add to your phone calendar' },
      { it: 'Nessun account, nessun tracciamento', en: 'No account, no tracking' },
    ],
  },
  {
    slug: 'balancelife',
    name: 'Balance Life',
    icon: './icon-balancelife.png',
    status: 'soon',
    tagline: {
      it: 'Un compagno gentile per ritrovare equilibrio tra lavoro, riposo e cura di sé.',
      en: 'A gentle companion to find balance between work, rest, and self-care.',
    },
    features: [
      { it: 'In sviluppo', en: 'In development' },
      { it: 'Stessa filosofia: privato, locale, semplice', en: 'Same philosophy: private, local, simple' },
    ],
  },
]

export function Home() {
  const t = useT()
  return (
    <>
      <section className="hero">
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
            it: 'AmmApp è un piccolo laboratorio indipendente. Costruiamo applicazioni mobile leggere, senza account né server, dove i tuoi dati non lasciano mai il dispositivo.',
            en: 'AmmApp is a small independent studio. We build lightweight mobile apps with no accounts and no servers — your data never leaves your device.',
          })}
        </p>
      </section>

      <section className="apps-grid" aria-label="Apps">
        {SHOWCASE.map((app) => (
          <article key={app.slug} className={`app-card ${app.status === 'soon' ? 'soon' : ''}`}>
            <div className="app-card-head">
              <img src={app.icon} alt={app.name} className="app-icon-img" />
              <div style={{ flex: 1 }}>
                <h3>{app.name}</h3>
                <span className={`badge ${app.status === 'live' ? 'badge-live' : 'badge-soon'}`}>
                  {app.status === 'live'
                    ? t({ it: 'Disponibile', en: 'Available' })
                    : t({ it: 'In arrivo', en: 'Coming soon' })}
                </span>
              </div>
            </div>

            <p className="tagline">{t(app.tagline)}</p>

            <ul className="app-features">
              {app.features.map((f, i) => (
                <li key={i}>{t(f)}</li>
              ))}
            </ul>

            <div className="app-card-actions">
              {app.status === 'live' ? (
                <>
                  <Link to={`/${app.slug}/open`} className="btn btn-primary">
                    {t({ it: 'Scarica l’app', en: 'Get the app' })}
                  </Link>
                  <Link to={`/${app.slug}/privacy`} className="btn btn-ghost">
                    Privacy
                  </Link>
                  <Link to={`/${app.slug}/support`} className="btn btn-ghost">
                    {t({ it: 'Assistenza', en: 'Support' })}
                  </Link>
                </>
              ) : (
                <span className="muted small">
                  {t({ it: 'Pagine privacy e assistenza in arrivo.', en: 'Privacy and support pages coming soon.' })}
                </span>
              )}
            </div>
          </article>
        ))}
      </section>
    </>
  )
}
