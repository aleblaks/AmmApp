import { Link, useParams } from 'react-router-dom'
import { apps, iosStoreUrl, androidStoreUrl, detectOS } from './apps'
import { useT } from './lang'
import AirportShiftIcon from '../AmmAppIcon/AirportShift.png'

const appIcons: Record<string, string> = {
  airportshift: AirportShiftIcon,
}

interface Feature {
  image: string
  alt: { it: string; en: string }
  title: { it: string; en: string }
  desc: { it: string; en: string }
  accent: string
}

const AIRPORTSHIFT_FEATURES: Feature[] = [
  {
    image: '/mockups/screen-calendario.png',
    alt: { it: 'Schermata calendario turni', en: 'Shift calendar screen' },
    title: { it: 'I tuoi turni, sempre chiari', en: 'Your shifts, always clear' },
    desc: {
      it: 'Il calendario mensile mostra orari, riposi e ferie a colpo d\'occhio. Un puntino rosso indica una modifica manuale, il "+" arancione un allungamento, il "+" verde uno straordinario.',
      en: 'The monthly calendar shows times, rest days, and vacations at a glance. A red dot marks a manual change, an orange "+" an extension, a green "+" overtime.',
    },
    accent: '#3b82f6',
  },
  {
    image: '/mockups/screen-riepilogo.png',
    alt: { it: 'Schermata riepilogo ore', en: 'Hours summary screen' },
    title: { it: 'Le tue ore a colpo d\'occhio', en: 'Your hours at a glance' },
    desc: {
      it: 'Ore lavorate, giorni di lavoro, riposi, ferie e FNL del mese in un unico pannello. Il grafico a ciambella mostra la distribuzione dei turni per fascia oraria: mattine, pomeriggi, sere e notti.',
      en: 'Hours worked, work days, rest, vacation, and FNL for the month in one panel. The donut chart shows shift distribution by time slot: mornings, afternoons, evenings, and nights.',
    },
    accent: '#f97316',
  },
  {
    image: '/mockups/screen-impostazioni.png',
    alt: { it: 'Schermata importa PDF e sincronizzazione', en: 'PDF import and sync screen' },
    title: { it: 'Importa il PDF, sincronizza tutto', en: 'Import the PDF, sync everything' },
    desc: {
      it: 'Importa il foglio turni in PDF e l\'app popola il calendario in automatico. Puoi sincronizzarlo con il calendario del telefono, scegliere su quale calendario scrivere, e attivare la sincronizzazione automatica dopo ogni import o modifica.',
      en: 'Import the shift PDF and the app fills your calendar automatically. Sync it to your phone calendar, choose which calendar to write to, and enable automatic sync after every import or edit.',
    },
    accent: '#a855f7',
  },
  {
    image: '/mockups/screen-codici.png',
    alt: { it: 'Schermata schema codici e orari', en: 'Code scheme screen' },
    title: { it: 'Converti ogni codice turno', en: 'Decode every shift code' },
    desc: {
      it: 'Digita un codice (es. 509, 824, RIP…) e scopri subito orario e durata. La prima cifra è la durata in ore, le ultime due indicano lo slot di inizio (slot 01 = 04:00, ogni slot +30 minuti). I codici speciali FNL, RIP, ADD e FR sono riconosciuti automaticamente.',
      en: 'Type a code (e.g. 509, 824, RIP…) and instantly see the time and duration. The first digit is the duration in hours, the last two indicate the start slot (slot 01 = 04:00, each slot +30 min). Special codes FNL, RIP, ADD, and FR are recognized automatically.',
    },
    accent: '#14b8a6',
  },
  {
    image: '/mockups/screen-condividi.png',
    alt: { it: 'Schermata condivisione QR turni', en: 'QR shift sharing screen' },
    title: { it: 'Condividi con un collega', en: 'Share with a colleague' },
    desc: {
      it: 'Mostra il QR al collega: inquadrandolo vedrà i tuoi turni del mese direttamente nella sua app. Nessun account, nessun server, nessun dato che esce dal telefono. La condivisione può essere temporanea (36 ore) o fissa.',
      en: 'Show the QR to a colleague: scanning it lets them see your monthly shifts directly in their app. No account, no server, no data leaving the phone. Sharing can be temporary (36 hours) or permanent.',
    },
    accent: '#6b7280',
  },
]

const FEATURES: Record<string, Feature[]> = {
  airportshift: AIRPORTSHIFT_FEATURES,
}

export function FeaturesPage() {
  const { app } = useParams()
  const entry = app ? apps[app] : undefined
  const features = app ? FEATURES[app] : undefined
  const t = useT()
  const os = detectOS()

  if (!entry || !features) {
    return (
      <main className="page">
        <h1>{t({ it: 'Pagina non trovata', en: 'Page not found' })}</h1>
        <Link to="/">{t({ it: 'Torna alla home', en: 'Back to home' })}</Link>
      </main>
    )
  }

  const storeUrl =
    os === 'android'
      ? androidStoreUrl(entry.store.androidPackage)
      : iosStoreUrl(entry.store.iosAppId)

  return (
    <main className="features-page">
      <div className="features-hero">
        <img src={appIcons[app!]} alt={entry.appName} className="features-app-icon" />
        <h1>{entry.appName}</h1>
        <p className="features-hero-sub">
          {t({
            it: 'Gestisci e condividi i tuoi turni di lavoro in aeroporto. Tutto in locale, niente server.',
            en: 'Manage and share your airport work shifts. Fully on-device, no servers.',
          })}
        </p>
        <div className="features-hero-cta">
          <a href={storeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
            {t({ it: "Scarica l'app", en: 'Get the app' })}
          </a>
          <Link to="/" className="btn btn-ghost btn-lg">
            {t({ it: 'Torna alla home', en: 'Back to home' })}
          </Link>
        </div>
      </div>

      <div className="features-list">
        {features.map((feat, i) => (
          <section key={i} className={`feature-row ${i % 2 === 1 ? 'feature-row-reverse' : ''}`}>
            <div className="feature-mockup">
              <div className="feature-mockup-glow" style={{ '--feat-accent': feat.accent } as React.CSSProperties} />
              <img
                src={feat.image}
                alt={t(feat.alt)}
                className="feature-mockup-img"
                loading="lazy"
              />
            </div>
            <div className="feature-text">
              <h2 className="feature-title">{t(feat.title)}</h2>
              <p className="feature-desc">{t(feat.desc)}</p>
            </div>
          </section>
        ))}
      </div>

      <div className="features-cta-bottom">
        <p className="features-cta-label">
          {t({ it: 'Pronto a provarlo?', en: 'Ready to try it?' })}
        </p>
        <div className="features-hero-cta">
          <a href={iosStoreUrl(entry.store.iosAppId)} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
            App Store · iPhone
          </a>
          <a href={androidStoreUrl(entry.store.androidPackage)} target="_blank" rel="noopener noreferrer" className="btn btn-lg">
            Google Play · Android
          </a>
        </div>
        <p className="muted small" style={{ marginTop: 14 }}>
          <Link to={`/${app}/privacy`}>Privacy</Link>
          {' · '}
          <Link to={`/${app}/support`}>{t({ it: 'Assistenza', en: 'Support' })}</Link>
        </p>
      </div>
    </main>
  )
}
