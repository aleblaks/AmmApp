import { Link, useParams } from 'react-router-dom'
import { apps, iosStoreUrl, androidStoreUrl, androidComingSoonText, detectOS, storeUrlFor } from './apps'
import { useT, type Bi } from './lang'
import AirportShiftIcon from '../AmmAppIcon/AirportShift.png'
import BalanceLifeIcon from '../AmmAppIcon/BalanceLife.png'

function AppleIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M11.18 8.1c-.01-1.63 1.33-2.42 1.39-2.46-.76-1.11-1.94-1.26-2.36-1.27-1-.1-1.96.59-2.47.59-.51 0-1.29-.58-2.12-.56-1.09.02-2.09.63-2.65 1.59-1.14 1.97-.29 4.87.81 6.47.54.78 1.18 1.65 2.02 1.62.81-.03 1.12-.52 2.1-.52.98 0 1.26.52 2.12.5.88-.01 1.43-.79 1.96-1.57.62-.9.87-1.78.89-1.83-.02-.01-1.69-.65-1.69-2.56zM9.77 3.56c.45-.54.75-1.3.67-2.06-.64.03-1.43.43-1.89.97-.41.47-.77 1.24-.68 1.97.72.06 1.45-.36 1.9-.88z"/>
    </svg>
  )
}

function AndroidIcon() {
  return <span className="material-symbols-outlined" style={{ fontSize: 30, lineHeight: 1 }} aria-hidden>android</span>
}
import MockupCalendario from '../AmmAppMockups/screen-calendario.png'
import MockupRiepilogo from '../AmmAppMockups/screen-riepilogo.png'
import MockupColori from '../AmmAppMockups/screen-colori.png'
import MockupImpostazioni from '../AmmAppMockups/screen-impostazioni.png'
import MockupCodici from '../AmmAppMockups/screen-codici.png'
import MockupCondividi from '../AmmAppMockups/screen-condividi.png'
import BlHome from '../AmmAppMockups/balancelife/home.png'
import BlTrends from '../AmmAppMockups/balancelife/trends.png'
import BlOrari from '../AmmAppMockups/balancelife/orari.png'
import BlCalendario from '../AmmAppMockups/balancelife/calendario.png'
import BlTimer from '../AmmAppMockups/balancelife/timer.png'
import BlPromemoria from '../AmmAppMockups/balancelife/promemoria.png'
import BlProfilo from '../AmmAppMockups/balancelife/profilo.png'
import BlParcheggio from '../AmmAppMockups/balancelife/parcheggio.png'
import BlStile from '../AmmAppMockups/balancelife/stile.png'
import BlPrivacy from '../AmmAppMockups/balancelife/privacy.png'

const appIcons: Record<string, string> = {
  airportshift: AirportShiftIcon,
  balancelife: BalanceLifeIcon,
}

interface Feature {
  image?: string
  alt: Bi
  title: Bi
  desc: Bi
  accent: string
}

const AIRPORTSHIFT_FEATURES: Feature[] = [
  {
    image: MockupCalendario,
    alt: { it: 'Schermata calendario turni', en: 'Shift calendar screen' },
    title: { it: 'I tuoi turni, sempre chiari', en: 'Your shifts, always clear' },
    desc: {
      it: 'Il calendario mensile mostra orari, riposi e ferie a colpo d\'occhio. Un puntino rosso indica una modifica manuale, il "+" arancione un allungamento, il "+" verde uno straordinario.',
      en: 'The monthly calendar shows times, rest days, and vacations at a glance. A red dot marks a manual change, an orange "+" an extension, a green "+" overtime.',
    },
    accent: '#3b82f6',
  },
  {
    image: MockupRiepilogo,
    alt: { it: 'Schermata riepilogo ore', en: 'Hours summary screen' },
    title: { it: 'Scomponi i turni', en: 'Break down your shifts' },
    desc: {
      it: 'Per avere un quadro più analitico puoi controllare il riepilogo per le statistiche: ore diurne e notturne, giorni di lavoro, riposi, FNL e la distribuzione dei turni per fascia oraria in un grafico a ciambella.',
      en: 'For a more detailed picture, check the summary for the statistics: daytime and nighttime hours, work days, rest days, FNL, and the shift distribution by time slot in a donut chart.',
    },
    accent: '#f97316',
  },
  {
    image: MockupColori,
    alt: { it: 'Schermata personalizzazione colori', en: 'Color customization screen' },
    title: { it: 'Imposta i tuoi colori preferiti per ogni turno', en: 'Set your favorite colors for every shift' },
    desc: {
      it: 'Personalizza il colore di ogni tipo di giorno e degli orari dei colleghi: turni, riposi, ferie, ADD e FNL, con una palette dedicata e indipendente per i turni condivisi dai colleghi.',
      en: 'Customize the color of every day type and of your colleagues\' shifts: shifts, rest days, vacation, ADD, and FNL, with a dedicated palette for shifts shared by colleagues.',
    },
    accent: '#14b8a6',
  },
  {
    image: MockupImpostazioni,
    alt: { it: 'Schermata importa PDF e sincronizzazione', en: 'PDF import and sync screen' },
    title: { it: 'Importa il PDF, sincronizza tutto', en: 'Import the PDF, sync everything' },
    desc: {
      it: 'Importa il foglio turni in PDF e l\'app popola il calendario in automatico. Puoi sincronizzarlo con il calendario del telefono, scegliere su quale calendario scrivere, e attivare la sincronizzazione automatica dopo ogni import o modifica.',
      en: 'Import the shift PDF and the app fills your calendar automatically. Sync it to your phone calendar, choose which calendar to write to, and enable automatic sync after every import or edit.',
    },
    accent: '#a855f7',
  },
  {
    image: MockupCodici,
    alt: { it: 'Schermata schema codici e orari', en: 'Code scheme screen' },
    title: { it: 'Converti ogni codice turno', en: 'Decode every shift code' },
    desc: {
      it: 'Digita un codice (es. 509, 824, RIP…) e scopri subito orario e durata. La prima cifra è la durata in ore, le ultime due indicano lo slot di inizio (slot 01 = 04:00, ogni slot +30 minuti). I codici speciali FNL, RIP, ADD e FR sono riconosciuti automaticamente.',
      en: 'Type a code (e.g. 509, 824, RIP…) and instantly see the time and duration. The first digit is the duration in hours, the last two indicate the start slot (slot 01 = 04:00, each slot +30 min). Special codes FNL, RIP, ADD, and FR are recognized automatically.',
    },
    accent: '#ec4899',
  },
  {
    image: MockupCondividi,
    alt: { it: 'Schermata condivisione QR turni', en: 'QR shift sharing screen' },
    title: { it: 'Condividi con un collega', en: 'Share with a colleague' },
    desc: {
      it: 'Mostra il QR al collega: inquadrandolo vedrà i tuoi turni del mese direttamente nella sua app. Nessun account, nessun server, nessun dato che esce dal telefono. La condivisione può essere temporanea (36 ore) o fissa.',
      en: 'Show the QR to a colleague: scanning it lets them see your monthly shifts directly in their app. No account, no server, no data leaving the phone. Sharing can be temporary (36 hours) or permanent.',
    },
    accent: '#6b7280',
  },
]

const BALANCELIFE_FEATURES: Feature[] = [
  {
    image: BlHome,
    alt: { it: 'Schermata Oggi con la timeline della giornata', en: 'Today screen with the daily timeline' },
    title: { it: 'La tua giornata in una schermata', en: 'Your day on one screen' },
    desc: {
      it: "La timeline mostra a colpo d'occhio cosa hai fatto e cosa è in corso: lettura, lavoro, palestra, gaming. Tocca il + e registra una nuova attività in un attimo.",
      en: "The timeline shows at a glance what you did and what's running: reading, work, gym, gaming. Tap + and log a new activity in seconds.",
    },
    accent: '#34d399',
  },
  {
    image: BlTrends,
    alt: { it: 'Schermata Trends con il grafico a ciambella', en: 'Trends screen with the donut chart' },
    title: { it: 'Tieni traccia delle tue attività', en: 'Keep track of your activities' },
    desc: {
      it: "Ore totali, sessioni, giorni attivi e categoria principale, per settimana, mese o anno. Il grafico ti dice subito dove va il tuo tempo.",
      en: 'Total hours, sessions, active days and top category, by week, month or year. The chart tells you right away where your time goes.',
    },
    accent: '#2dd4bf',
  },
  {
    image: BlOrari,
    alt: { it: 'Schermate obiettivi e organizzazione settimanale', en: 'Goals and weekly planning screens' },
    title: { it: 'I tuoi orari, i tuoi tempi', en: 'Your schedule, your pace' },
    desc: {
      it: "Imposta obiettivi e orari preferiti per ogni attività e scegli come dividere il carico nella settimana. L'Agenda organizza ogni giorno di conseguenza.",
      en: 'Set goals and preferred times for each activity and choose how to spread the load across the week. The Agenda plans each day around it.',
    },
    accent: '#fb923c',
  },
  {
    image: BlCalendario,
    alt: { it: 'Calendario con le attività di luglio e agosto', en: 'Calendar with July and August activities' },
    title: { it: 'Passato e futuro in un unico posto', en: 'Past and future in one place' },
    desc: {
      it: 'Guarda cosa hai fatto ieri e cosa ti aspetta domani: il calendario raccoglie attività svolte e programmate, giorno per giorno.',
      en: "See what you did yesterday and what's waiting tomorrow: the calendar collects done and planned activities, day by day.",
    },
    accent: '#fb7185',
  },
  {
    image: BlTimer,
    alt: { it: 'Timer live di una sessione in palestra', en: 'Live timer of a gym session' },
    title: { it: 'Avvia e aggiorna in tempo reale', en: 'Start and update in real time' },
    desc: {
      it: 'Fai partire il timer e segna i progressi mentre li fai: esercizi, serie e carichi in palestra. Il timer resta visibile anche dalla schermata di blocco.',
      en: 'Start the timer and log progress as you go: gym exercises, sets and weights. The timer stays visible on the lock screen too.',
    },
    accent: '#ef4444',
  },
  {
    image: BlPromemoria,
    alt: { it: 'Creazione di un promemoria per il veterinario', en: 'Creating a vet reminder' },
    title: { it: 'Promemoria ed eventi, sempre al passo', en: 'Reminders and events, always on time' },
    desc: {
      it: 'Visite, esami, scadenze, appuntamenti per i tuoi animali: scegli quando e con quanto anticipo ricevere l’avviso.',
      en: 'Checkups, exams, deadlines, appointments for your pets: choose when and how early to be notified.',
    },
    accent: '#f97316',
  },
  {
    image: BlProfilo,
    alt: { it: 'Profilo con veicoli e animali', en: 'Profile with vehicles and pets' },
    title: { it: 'I tuoi dati, in un unico posto', en: 'Your details, in one place' },
    desc: {
      it: 'Auto, moto, abbonamenti e animali nel profilo, con bollo e assicurazione sotto controllo prima che scadano.',
      en: 'Cars, scooters, passes and pets in your profile, with road tax and insurance tracked before they expire.',
    },
    accent: '#a8a29e',
  },
  {
    image: BlParcheggio,
    alt: { it: 'Mappa con la posizione del parcheggio', en: 'Map with the parking spot' },
    title: { it: 'Torna dove hai parcheggiato', en: 'Find where you parked' },
    desc: {
      it: "Salva il punto in cui hai lasciato l'auto con un tocco e ritrovalo sulla mappa quando ti serve.",
      en: 'Save where you left the car with one tap and find it on the map when you need it.',
    },
    accent: '#38bdf8',
  },
  {
    image: BlStile,
    alt: { it: 'Tema chiaro e scuro a confronto', en: 'Light and dark theme side by side' },
    title: { it: 'Scegli il tuo stile', en: 'Pick your style' },
    desc: {
      it: "Chiaro o scuro, l'app si adatta a te e al tuo telefono.",
      en: 'Light or dark, the app adapts to you and your phone.',
    },
    accent: '#78716c',
  },
  {
    image: BlPrivacy,
    alt: { it: 'Schermata di benvenuto di Balance Life', en: 'Balance Life welcome screen' },
    title: { it: '100% offline, 100% privato', en: '100% offline, 100% private' },
    desc: {
      it: 'Niente cloud, niente server, nessun account: i tuoi dati rimangono sul tuo telefono.',
      en: 'No cloud, no servers, no account: your data stays on your phone.',
    },
    accent: '#f97316',
  },
]

interface AppFeaturesContent {
  tagline: Bi
  features: Feature[]
}

const CONTENT: Record<string, AppFeaturesContent> = {
  airportshift: {
    tagline: {
      it: 'Gestisci e condividi i tuoi turni di lavoro in aeroporto. Tutto in locale, niente server.',
      en: 'Manage and share your airport work shifts. Fully on-device, no servers.',
    },
    features: AIRPORTSHIFT_FEATURES,
  },
  balancelife: {
    tagline: {
      it: "Traccia ciò che fai, pianifica ciò che conta e raggiungi i tuoi obiettivi, un'attività alla volta.",
      en: 'Track what you do, plan what matters, and reach your goals, one activity at a time.',
    },
    features: BALANCELIFE_FEATURES,
  },
}

export function FeaturesPage() {
  const { app } = useParams()
  const entry = app ? apps[app] : undefined
  const content = app ? CONTENT[app] : undefined
  const t = useT()
  const os = detectOS()

  if (!entry || !content) {
    return (
      <main className="page">
        <h1>{t({ it: 'Pagina non trovata', en: 'Page not found' })}</h1>
        <Link to="/">{t({ it: 'Torna alla home', en: 'Back to home' })}</Link>
      </main>
    )
  }

  const { tagline, features } = content

  const storeUrl = storeUrlFor(os === 'other' ? 'ios' : os, entry)

  return (
    <main className="features-page">
      <div className="features-hero">
        <img src={appIcons[app!]} alt={entry.appName} className="features-app-icon" />
        <h1>{entry.appName}</h1>
        <p className="features-hero-sub">
          {t(tagline)}
        </p>
        <div className="features-hero-cta">
          {storeUrl ? (
            <a href={storeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              {t({ it: "Scarica l'app", en: 'Get the app' })}
            </a>
          ) : (
            <span className="btn btn-lg btn-disabled" aria-disabled="true">{t(androidComingSoonText)}</span>
          )}
          <Link to="/" className="btn btn-ghost btn-lg">
            {t({ it: 'Torna alla home', en: 'Back to home' })}
          </Link>
        </div>
      </div>

      <div className="features-list">
        {features.map((feat, i) => (
          <section key={i} className={`feature-row ${['', 'feature-row-reverse', 'feature-row-stack'][i % 3]}`}>
            <div className="feature-mockup" style={{ '--feat-accent': feat.accent } as React.CSSProperties}>
              {feat.image ? (
                <img
                  src={feat.image}
                  alt={t(feat.alt)}
                  className="feature-mockup-img"
                  loading="lazy"
                />
              ) : (
                <div className="feature-mockup-placeholder">
                  {t({ it: 'Screenshot da inserire', en: 'Screenshot placeholder' })}
                </div>
              )}
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
        <div className="features-store-icons">
          <a href={iosStoreUrl(entry.store.iosAppId)} target="_blank" rel="noopener noreferrer" className="store-icon-btn" aria-label="App Store">
            <AppleIcon />
          </a>
          {entry.store.androidComingSoon ? (
            <span className="store-icon-btn store-icon-disabled" aria-label={t(androidComingSoonText)} title={t(androidComingSoonText)}>
              <AndroidIcon />
            </span>
          ) : (
            <a href={androidStoreUrl(entry.store.androidPackage)} target="_blank" rel="noopener noreferrer" className="store-icon-btn" aria-label="Google Play">
              <AndroidIcon />
            </a>
          )}
        </div>
        {entry.store.androidComingSoon && (
          <p className="muted small" style={{ marginTop: 10 }}>
            {t(androidComingSoonText)}
          </p>
        )}
        <p className="muted small" style={{ marginTop: 14 }}>
          <Link to={`/${app}/privacy`}>Privacy</Link>
          {' · '}
          <Link to={`/${app}/support`}>{t({ it: 'Assistenza', en: 'Support' })}</Link>
        </p>
      </div>
    </main>
  )
}
