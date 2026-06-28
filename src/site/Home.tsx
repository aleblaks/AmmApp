import { Link } from 'react-router-dom'
import { useT, type Bi } from './lang'
import { apps, iosStoreUrl, androidStoreUrl } from './apps'
import AirportShiftIcon from '../AmmAppIcon/AirportShift.png'
import BalanceLifeIcon from '../AmmAppIcon/BalanceLife.png'

function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M11.18 8.1c-.01-1.63 1.33-2.42 1.39-2.46-.76-1.11-1.94-1.26-2.36-1.27-1-.1-1.96.59-2.47.59-.51 0-1.29-.58-2.12-.56-1.09.02-2.09.63-2.65 1.59-1.14 1.97-.29 4.87.81 6.47.54.78 1.18 1.65 2.02 1.62.81-.03 1.12-.52 2.1-.52.98 0 1.26.52 2.12.5.88-.01 1.43-.79 1.96-1.57.62-.9.87-1.78.89-1.83-.02-.01-1.69-.65-1.69-2.56zM9.77 3.56c.45-.54.75-1.3.67-2.06-.64.03-1.43.43-1.89.97-.41.47-.77 1.24-.68 1.97.72.06 1.45-.36 1.9-.88z"/>
    </svg>
  )
}

function AndroidIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M17.523 15.341a.85.85 0 0 1-.851.851.85.85 0 0 1-.851-.851V10.9a.85.85 0 0 1 .851-.851.85.85 0 0 1 .851.851v4.441zm-9.297 0a.85.85 0 0 1-.851.851.85.85 0 0 1-.851-.851V10.9a.85.85 0 0 1 .851-.851.85.85 0 0 1 .851.851v4.441zM17.69 6.482l1.294-2.241a.27.27 0 0 0-.098-.368.27.27 0 0 0-.368.098L17.2 6.24A7.538 7.538 0 0 0 12 4.5a7.538 7.538 0 0 0-5.2 1.74L5.482 3.971a.27.27 0 0 0-.368-.098.27.27 0 0 0-.098.368l1.294 2.241C4.57 7.571 3.5 9.58 3.5 11.85v.3h17v-.3c0-2.27-1.07-4.279-2.81-5.368zM9.5 9.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zm5 0a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zM3.5 13.2v4.6A1.7 1.7 0 0 0 5.2 19.5h.65v2.65a.85.85 0 0 0 .851.851.85.85 0 0 0 .851-.851V19.5h8.896v2.65a.85.85 0 0 0 .851.851.85.85 0 0 0 .851-.851V19.5h.65A1.7 1.7 0 0 0 20.5 17.8V13.2H3.5z"/>
    </svg>
  )
}

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
    icon: AirportShiftIcon,
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
    icon: BalanceLifeIcon,
    status: 'soon',
    tagline: {
      it: "Traccia ciò che fai, pianifica ciò che conta e raggiungi i tuoi obiettivi — un'attività alla volta",
      en: '"Track what you do, plan what matters, and reach your goals — one activity at a time.',
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
            it: "AmmApp è un piccolo laboratorio indipendente. Costruiamo applicazioni mobile leggere, senza account né server, dove i tuoi dati non lasciano mai il dispositivo.",
            en: "AmmApp is a small independent studio. We build lightweight mobile apps with no accounts and no servers — your data never leaves your device.",
          })}
        </p>
      </section>

      <section className="apps-grid" aria-label="Apps">
        {SHOWCASE.map((app) => (
          <article key={app.slug} className={`app-card ${app.status === 'soon' ? 'soon' : ''}`}>
            {app.status === 'live' && apps[app.slug] && (
              <div className="card-platforms">
                <a href={iosStoreUrl(apps[app.slug].store.iosAppId)} target="_blank" rel="noopener noreferrer" aria-label="App Store">
                  <AppleIcon />
                </a>
                <a href={androidStoreUrl(apps[app.slug].store.androidPackage)} target="_blank" rel="noopener noreferrer" aria-label="Google Play">
                  <AndroidIcon />
                </a>
              </div>
            )}
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
                  <div className="card-cta-row">
                    <Link to={`/${app.slug}/open`} className="btn btn-primary">
                      {t({ it: "Scarica l'app", en: 'Get the app' })}
                    </Link>
                    <Link to={`/${app.slug}/open`} className="btn btn-ghost">
                      {t({ it: 'Scopri di più', en: 'Learn more' })}
                    </Link>
                  </div>
                  <div className="card-doc-links">
                    <Link to={`/${app.slug}/privacy`} className="card-doc-link">
                      Privacy
                    </Link>
                    <span className="card-doc-sep">·</span>
                    <Link to={`/${app.slug}/support`} className="card-doc-link">
                      {t({ it: 'Assistenza', en: 'Support' })}
                    </Link>
                  </div>
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
