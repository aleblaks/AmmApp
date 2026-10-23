import type { CSSProperties } from 'react'
import { Phone, shot, useDark } from './Phone'
import { Link, useParams } from 'react-router-dom'
import { apps, iosStoreUrl, androidStoreUrl, androidComingSoonText, detectOS, storeUrlFor } from './apps'
import { useT, type Bi } from './lang'
import AirportShiftIcon from '../AmmAppIcon/AirportShift.png'
import BalanceLifeIcon from '../AmmAppIcon/BalanceLife.png'
import MockupCalendario from '../AmmAppMockups/screen-calendario.png'
import MockupRiepilogo from '../AmmAppMockups/screen-riepilogo.png'
import MockupColori from '../AmmAppMockups/screen-colori.png'
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

interface Chapter {
  shots: { name: string; fallback?: string }[]
  eyebrow: Bi
  title: Bi
  desc: Bi
  points?: Bi[]
  accent: string
}

interface Tile { icon: string; title: Bi; desc: Bi; shot?: { name: string; fallback?: string } }

interface AppPage {
  icon: string
  badge?: Bi
  hero: { name: string; fallback?: string }
  headline: Bi
  tagline: Bi
  chapters: Chapter[]
  tilesTitle: Bi
  tiles: Tile[]
  privacy: { title: Bi; desc: Bi }
  // Chiusura propria (es. il gioco sulla sigla AS) e riga di chiarimento sotto i pulsanti.
  end?: { title: Bi; sub?: Bi; note?: Bi }
}

const PAGES: Record<string, AppPage> = {
  airportshift: {
    icon: AirportShiftIcon,
    badge: { it: 'Novità · Calendario a tessere', en: 'New · Tile calendar' },
    hero: { name: 'as-hero-framed', fallback: MockupCalendario },
    headline: { it: 'Il tuo turno.\nA colpo d’occhio.', en: 'Your shift.\nAt a glance.' },
    tagline: {
      it: 'Carica il PDF dei turni di Aviation Service e AirportShift fa il resto: codici tradotti in orari, un calendario che si legge in un secondo, ore e straordinari già contati.',
      en: 'Load your Aviation Service shift PDF and AirportShift does the rest: codes turned into times, a calendar you read in a second, hours and overtime already counted.',
    },
    chapters: [
      {
        shots: [{ name: 'as-hero', fallback: MockupCalendario }],
        eyebrow: { it: 'Importa', en: 'Import' },
        title: { it: 'Un PDF.\nUn mese intero.', en: 'One PDF.\nA whole month.' },
        desc: {
          it: 'Apri il foglio turni pubblicato: l’app trova il tuo nome, legge ogni codice e riempie il calendario. Le modifiche che hai fatto a mano restano al loro posto.',
          en: 'Open the published shift sheet: the app finds your name, reads every code and fills the calendar. Your manual edits stay where they are.',
        },
        accent: '#0a84ff',
      },
      {
        shots: [{ name: 'as-giorno' }],
        eyebrow: { it: 'Calendario', en: 'Calendar' },
        title: { it: 'Tocca un giorno.\nL’orario è lì.', en: 'Tap a day.\nThere’s the time.' },
        desc: {
          it: 'Ogni giorno è una tessera del colore del suo tipo: turno, riposo, ferie, addestramento. Sopra, una pila di card che scorri su e giù: il turno del giorno, i prossimi cinque, la settimana e il mese.',
          en: 'Every day is a tile in the color of its type: shift, rest, vacation, training. On top, a stack of cards you swipe up and down: the day’s shift, the next five, the week and the month.',
        },
        points: [
          { it: 'Quando il turno è vicino, la card ti dice quanto manca: «tra 3h 20m».', en: 'When your shift is close, the card tells you how long: “in 3h 20m”.' },
          { it: 'Allunghi e straordinari si segnano in un attimo, e la fine del turno si sposta da sola.', en: 'Extensions and overtime take a second, and the end of the shift moves by itself.' },
        ],
        accent: '#ff9f0a',
      },
      {
        shots: [{ name: 'as-riepilogo', fallback: MockupRiepilogo }, { name: 'as-fasce' }],
        eyebrow: { it: 'Riepilogo', en: 'Summary' },
        title: { it: 'Le tue ore.\nContate per te.', en: 'Your hours.\nCounted for you.' },
        desc: {
          it: 'Un mosaico di tessere con numeri grandi: tocca una tessera e si allarga sui dettagli, dalle mattine alle notti. Scorri e trovi il calendario delle fasce orarie, che mostra non solo quante, ma quando.',
          en: 'A mosaic of tiles with big numbers: tap one and it opens up with the details, from mornings to nights. Swipe for the time-band calendar, which shows not just how many, but when.',
        },
        points: [
          { it: 'Le ore dell’anno mese per mese, con giorni, straordinari e ferie.', en: 'The year’s hours month by month, with days, overtime and vacation.' },
        ],
        accent: '#30d158',
      },
      {
        shots: [{ name: 'as-qr', fallback: MockupCondividi }, { name: 'as-collega' }],
        eyebrow: { it: 'Colleghi', en: 'Colleagues' },
        title: { it: 'Un QR.\nNiente server.', en: 'One QR.\nNo servers.' },
        desc: {
          it: 'Il collega inquadra il codice e vede i tuoi turni nella sua app, per 36 ore o per sempre. Passa da “Io” al suo nome e scopri quante ore siete al lavoro insieme.',
          en: 'Your colleague scans the code and sees your shifts in their app, for 36 hours or for good. Switch from “Me” to their name and see how many hours you work together.',
        },
        accent: '#bf5af2',
      },
      {
        shots: [{ name: 'as-live' }, { name: 'as-notifica' }],
        eyebrow: { it: 'Live Activity', en: 'Live Activity' },
        title: { it: 'Il turno in corso.\nSulla schermata di blocco.', en: 'Your shift in progress.\nOn the Lock Screen.' },
        desc: {
          it: 'Quando il turno comincia, AirportShift lo tiene davanti a te: sulla schermata di blocco e nella Dynamic Island vedi quanto è passato e quanto manca alla fine, senza sbloccare il telefono.',
          en: 'When your shift starts, AirportShift keeps it in front of you: on the Lock Screen and in the Dynamic Island you see how much has passed and how long is left, without unlocking.',
        },
        points: [
          { it: 'Promemoria prima dell\u2019inizio, con l\u2019anticipo che scegli tu.', en: 'Reminders before the start, with the lead time you choose.' },
          { it: 'La fine si aggiorna da sola se hai un allungo o uno straordinario.', en: 'The end updates by itself when you have an extension or overtime.' },
        ],
        accent: '#ff9f0a',
      },
      {
        shots: [{ name: 'as-widget' }, { name: 'as-widget-chiaro' }],
        eyebrow: { it: 'Widget', en: 'Widgets' },
        title: { it: 'Il turno di domani.\nSenza aprire l\u2019app.', en: 'Tomorrow\u2019s shift.\nWithout opening the app.' },
        desc: {
          it: 'Oggi e domani, la settimana, il mese, quanto manca alla fine del turno o le tue statistiche, direttamente sulla schermata Home. Piccoli, medi o grandi, chiari o scuri.',
          en: 'Today and tomorrow, the week, the month, time left in your shift or your stats, right on the Home Screen. Small, medium or large, light or dark.',
        },
        accent: '#64d2ff',
      },
      {
        shots: [{ name: 'as-watch' }, { name: 'as-watch-quadrante' }, { name: 'as-watch-stack' }],
        eyebrow: { it: 'Apple Watch e Wear OS', en: 'Apple Watch and Wear OS' },
        title: { it: 'Il tuo turno.\nAl polso.', en: 'Your shift.\nOn your wrist.' },
        desc: {
          it: 'Un\u2019app vera per l\u2019orologio, non una copia in piccolo. Apri e vedi oggi; scorri e hai il mese, le ore a tessere con lo skyline di un aeroporto, le fasce orarie. E il quadrante ti dice quando si parte.',
          en: 'A real watch app, not a shrunken copy. Open it and see today; scroll for the month, your hours as tiles with an airport skyline, the time bands. And the watch face tells you when it\u2019s time to go.',
        },
        points: [
          { it: 'Cinque schermate: oggi, mese, ore, riepilogo, fasce orarie.', en: 'Five screens: today, month, hours, summary, time bands.' },
          { it: 'Quattro complicazioni e tre card nello Smart Stack.', en: 'Four complications and three Smart Stack cards.' },
          { it: 'Anche su Wear OS: Galaxy Watch, Pixel Watch e gli altri, con complicazioni e schede.', en: 'On Wear OS too: Galaxy Watch, Pixel Watch and more, with complications and tiles.' },
        ],
        accent: '#ff375f',
      },
      {
        shots: [{ name: 'as-colori', fallback: MockupColori }, { name: 'as-sfondo' }],
        eyebrow: { it: 'Stile', en: 'Style' },
        title: { it: 'I tuoi colori.\nDi giorno e di notte.', en: 'Your colors.\nDay and night.' },
        desc: {
          it: 'Scegli il colore di ogni tipo di giorno: tinge tutta l\u2019app, dai grafici alle schede. Tema chiaro o scuro, come il telefono o come preferisci tu. E se vuoi, uno sfondo a sfumatura che va dal colore di oggi a quello di domani.',
          en: 'Pick the color of every day type: it tints the whole app, from charts to tabs. Light or dark, like your phone or however you like. And if you want, a gradient background from today\u2019s color to tomorrow\u2019s.',
        },
        accent: '#ffd60a',
      },
    ],
    tilesTitle: { it: 'E tutti i dettagli che contano.', en: 'And every detail that matters.' },
    tiles: [
      { icon: 'event_busy', shot: { name: 'as-impegnato' }, title: { it: 'Giorni impegnati', en: 'Busy days' }, desc: { it: 'Segna i turni che non puoi cedere. Chi scansiona il tuo QR lo vede, senza sapere il perché.', en: 'Mark shifts you can’t swap. Whoever scans your QR sees it, without knowing why.' } },
      { icon: 'calendar_month', shot: { name: 'as-calendario' }, title: { it: 'Calendario di sistema', en: 'System calendar' }, desc: { it: 'Sincronizza i turni con il calendario del telefono, anche in automatico dopo ogni import.', en: 'Sync shifts to your phone’s calendar, even automatically after every import.' } },
      { icon: 'pin', shot: { name: 'as-codici', fallback: MockupCodici }, title: { it: 'Schema codici', en: 'Code decoder' }, desc: { it: 'Scrivi 509 e scopri orario e durata. FNL, RIP, ADD e FR riconosciuti da soli.', en: 'Type 509 and see time and duration. FNL, RIP, ADD and FR recognized automatically.' } },
      { icon: 'bar_chart', shot: { name: 'as-anno' }, title: { it: 'L’anno intero', en: 'The whole year' }, desc: { it: 'Le ore lavorate mese per mese: tocca la card per giorni, straordinari e ferie, e passa da un anno all’altro.', en: 'Hours worked month by month: tap the card for days, overtime and vacation, and switch between years.' } },
      { icon: 'grid_view', shot: { name: 'as-mesi' }, title: { it: 'Tutti i mesi', en: 'All months' }, desc: { it: 'Salta a qualsiasi mese e guarda il resoconto dell’anno.', en: 'Jump to any month and see the yearly recap.' } },
      { icon: 'upload_file', title: { it: 'Trascina il PDF', en: 'Drag in the PDF' }, desc: { it: 'Dai File, da Mail o da Safari: lascialo cadere sull’app e l’import parte da solo.', en: 'From Files, Mail or Safari: drop it on the app and the import starts by itself.' } },
      { icon: 'translate', title: { it: 'Quattro lingue', en: 'Four languages' }, desc: { it: 'Italiano, inglese, spagnolo e francese, per i colleghi che vengono da lontano.', en: 'Italian, English, Spanish and French, for colleagues from far away.' } },
    ],
    privacy: {
      title: { it: 'I tuoi turni restano\nsul tuo telefono.', en: 'Your shifts stay\non your phone.' },
      desc: { it: 'Nessun account, nessun server, nessuna connessione. Anche la condivisione passa solo da un QR, da telefono a telefono.', en: 'No account, no server, no connection. Even sharing goes through a QR only, phone to phone.' },
    },
    end: {
      title: { it: 'AS, per chi lavora con AS.', en: 'AS, for people who work with AS.' },
      sub: { it: 'AirportShift legge i turni di Aviation Service. La sigla è la stessa: è un caso, ma ci piace.', en: 'AirportShift reads Aviation Service shifts. Same initials: a coincidence, but we like it.' },
      note: { it: 'AirportShift è un’app indipendente: non è affiliata ad Aviation Service né approvata dall’agenzia.', en: 'AirportShift is an independent app: it is not affiliated with or endorsed by Aviation Service.' },
    },
  },
  balancelife: {
    icon: BalanceLifeIcon,
    hero: { name: 'bl-hero-framed', fallback: BlHome },
    headline: { it: 'La tua giornata.\nIn equilibrio.', en: 'Your day.\nIn balance.' },
    tagline: {
      it: 'Lettura, palestra, lavoro, serie, studio: registra ciò che fai, pianifica ciò che conta e guarda il tempo prendere forma.',
      en: 'Reading, gym, work, shows, study: log what you do, plan what matters and watch your time take shape.',
    },
    chapters: [
      {
        shots: [{ name: 'bl-hero', fallback: BlHome }, { name: 'bl-aggiungi' }],
        eyebrow: { it: 'Oggi', en: 'Today' },
        title: { it: 'Tutto quello che fai.\nIn una timeline.', en: 'Everything you do.\nOn one timeline.' },
        desc: {
          it: 'Ogni attività al suo posto nella giornata, con l’informazione che conta: le pagine lette, gli esercizi fatti, gli episodi visti. Un tocco sul + e ne registri un’altra.',
          en: 'Every activity in its place in the day, with the detail that matters: pages read, exercises done, episodes watched. One tap on + to log another.',
        },
        accent: '#30d158',
      },
      {
        shots: [{ name: 'bl-live', fallback: BlTimer }, { name: 'bl-lockscreen' }],
        eyebrow: { it: 'Dal vivo', en: 'Live' },
        title: { it: 'Premi avvia.\nPensa al resto.', en: 'Press start.\nFocus on the rest.' },
        desc: {
          it: 'Il cronometro corre mentre segni serie, pesi e ripetizioni. Resta sulla schermata di blocco, e le pause si contano da sole.',
          en: 'The timer runs while you log sets, weights and reps. It stays on the Lock Screen, and pauses are counted for you.',
        },
        accent: '#ff453a',
      },
      {
        shots: [{ name: 'bl-libreria' }, { name: 'bl-lettura' }],
        eyebrow: { it: 'Lettura', en: 'Reading' },
        title: { it: 'La tua libreria.\nPagina dopo pagina.', en: 'Your library.\nPage by page.' },
        desc: {
          it: 'Dorsi colorati per genere e collana, ritmo di lettura, quanto manca alla fine e le tue citazioni preferite. E per le serie, l’episodio esatto da cui riprendere.',
          en: 'Spines colored by genre and series, reading pace, how far to the end and your favorite quotes. And for TV shows, the exact episode to pick up from.',
        },
        accent: '#ff9f0a',
      },
      {
        shots: [{ name: 'bl-trends', fallback: BlTrends }, { name: 'bl-heatmap' }],
        eyebrow: { it: 'Trends', en: 'Trends' },
        title: { it: 'Guarda dove va\nil tuo tempo.', en: 'See where\nyour time goes.' },
        desc: {
          it: 'Un mosaico di tessere che si allargano al tocco: ore, sessioni, serie di giorni di fila e record, per settimana, mese o anno. Una chip per ogni attività, e una heatmap per le abitudini.',
          en: 'A mosaic of tiles that open up when tapped: hours, sessions, streaks and records, by week, month or year. One chip per activity, and a heatmap for your habits.',
        },
        accent: '#64d2ff',
      },
      {
        shots: [{ name: 'bl-obiettivi', fallback: BlOrari }, { name: 'bl-calendario', fallback: BlCalendario }],
        eyebrow: { it: 'Obiettivi', en: 'Goals' },
        title: { it: 'Pianifica la settimana.\nL’agenda fa il resto.', en: 'Plan the week.\nThe agenda does the rest.' },
        desc: {
          it: 'Imposta obiettivi e orari preferiti per ogni attività: l’agenda organizza ogni giorno di conseguenza. Il calendario tiene insieme ciò che hai fatto e ciò che ti aspetta.',
          en: 'Set goals and preferred times for each activity: the agenda plans each day around them. The calendar holds what you’ve done and what’s ahead.',
        },
        accent: '#5e5ce6',
      },
      {
        shots: [{ name: 'bl-profilo', fallback: BlProfilo }, { name: 'bl-promemoria', fallback: BlPromemoria }],
        eyebrow: { it: 'Vita', en: 'Life' },
        title: { it: 'Bollo, veterinario,\ntagliando. Ricordati.', en: 'Car tax, vet,\nservice. Remembered.' },
        desc: {
          it: 'Veicoli e animali nel tuo profilo, con lo storico degli interventi. Eventi come i Promemoria di iPhone: elenchi, liste della spesa, contrassegni e ricorrenze, con l’anticipo che scegli tu.',
          en: 'Vehicles and pets in your profile, with their service history. Events like iPhone Reminders: lists, shopping lists, flags and repeats, with the lead time you choose.',
        },
        accent: '#ff375f',
      },
      {
        shots: [{ name: 'bl-retro', fallback: BlStile }, { name: 'bl-bn' }],
        eyebrow: { it: 'Stile', en: 'Style' },
        title: { it: 'Tre stili.\nDi giorno e di notte.', en: 'Three styles.\nDay and night.' },
        desc: {
          it: 'Colori, B&W o Rétro, in tema chiaro o scuro: l\u2019app segue il tuo telefono e i materiali di iOS, vetro e profondità compresi.',
          en: 'Colors, B&W or Rétro, in light or dark mode: the app follows your phone and iOS materials, glass and depth included.',
        },
        points: [
          { it: 'Rétro: carta color crema di giorno, caffè di notte, e ogni icona ridisegnata.', en: 'Rétro: cream paper by day, coffee by night, and every icon redrawn.' },
        ],
        accent: '#8e8e93',
      },
    ],
    tilesTitle: { it: 'Piccole cose. Fatte bene.', en: 'Small things. Done right.' },
    tiles: [
      { icon: 'local_parking', shot: { name: 'bl-parcheggio', fallback: BlParcheggio }, title: { it: 'Parcheggio', en: 'Parking' }, desc: { it: 'Salva dove hai lasciato l’auto e ritrovala sulla mappa.', en: 'Save where you left the car and find it on the map.' } },
      { icon: 'search', shot: { name: 'bl-cerca' }, title: { it: 'Cerca', en: 'Search' }, desc: { it: 'Una tab tutta sua: attività, libri, eventi, impostazioni. E prima ancora di scrivere, quello da riprendere.', en: 'A tab of its own: activities, books, events, settings. And before you type, what to pick up.' } },
      { icon: 'watch', shot: { name: 'bl-watch' }, title: { it: 'Al polso', en: 'On your wrist' }, desc: { it: 'Avvia, metti in pausa e chiudi una sessione dall’Apple Watch, e guarda la giornata sul quadrante.', en: 'Start, pause and stop a session from Apple Watch, and see your day on the watch face.' } },
      { icon: 'widgets', title: { it: 'La tua giornata', en: 'Your day' }, desc: { it: 'Un widget in tre misure: la giornata su un quadrante di 24 ore, la timeline, l’agenda coi promemoria da spuntare.', en: 'One widget, three sizes: your day on a 24-hour dial, the timeline, the agenda with reminders to tick off.' } },
      { icon: 'event', title: { it: 'Calendario di sistema', en: 'System calendar' }, desc: { it: 'Gli eventi del calendario del telefono diventano previsioni della giornata, e le sessioni ci tornano dentro.', en: 'Your phone’s calendar events become plans for the day, and sessions go back into it.' } },
      { icon: 'table_view', shot: { name: 'bl-export' }, title: { it: 'Export leggibile', en: 'Readable export' }, desc: { it: 'Tutto in tabelle che si aprono in Numbers o Excel, e si reimporta senza doppioni.', en: 'Everything in tables that open in Numbers or Excel, re-importable without duplicates.' } },
      { icon: 'live_tv', shot: { name: 'bl-serie' }, title: { it: 'Serie TV', en: 'TV shows' }, desc: { it: 'Stagioni, episodi visti e quello da cui riprendere.', en: 'Seasons, watched episodes and where to pick up.' } },
      { icon: 'content_copy', shot: { name: 'bl-copia' }, title: { it: 'Copia e incolla', en: 'Copy and paste' }, desc: { it: 'Duplica un’attività o un’intera giornata, anche come testo da mandare in chat.', en: 'Duplicate an activity or a whole day, even as text to send in a chat.' } },
      { icon: 'science', title: { it: 'Prova con i dati d’esempio', en: 'Try it with sample data' }, desc: { it: 'Al primo avvio l’app si riempie di un mese verosimile: esplori tutto, poi riparti dai tuoi dati.', en: 'On first launch the app fills up with a believable month: explore everything, then start over with your own data.' } },
    ],
    privacy: {
      title: { it: '100% offline.\n100% tuo.', en: '100% offline.\n100% yours.' },
      desc: { it: 'Niente cloud, niente account, niente server. La tua vita resta sul tuo telefono.', en: 'No cloud, no account, no server. Your life stays on your phone.' },
    },
  },
}

const lines = (s: string) => s.split('\n').map((l, i) => <span key={i}>{l}<br /></span>)

export function FeaturesPage() {
  const { app } = useParams()
  const entry = app ? apps[app] : undefined
  const page = app ? PAGES[app] : undefined
  const t = useT()
  const os = detectOS()
  const dark = useDark()

  if (!entry || !page) {
    return (
      <main className="page">
        <h1>{t({ it: 'Pagina non trovata', en: 'Page not found' })}</h1>
        <Link to="/">{t({ it: 'Torna alla home', en: 'Back to home' })}</Link>
      </main>
    )
  }

  const storeUrl = storeUrlFor(os === 'other' ? 'ios' : os, entry)
  const cta = storeUrl ? (
    <a href={storeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
      {t({ it: "Scarica l'app", en: 'Get the app' })}
    </a>
  ) : (
    <span className="btn btn-lg btn-disabled" aria-disabled="true">{t(androidComingSoonText)}</span>
  )

  return (
    <main className="fx">
      <section className="fx-hero" style={{ '--fx-accent': page.chapters[0].accent } as CSSProperties}>
        <div className="fx-hero-copy">
          <div className="fx-hero-id">
            <img src={page.icon} alt="" className="fx-icon" />
            <p className="fx-appname">{entry.appName}</p>
          </div>
          {page.badge && <p className="fx-badge">{t(page.badge)}</p>}
          <h1 className="fx-headline">{lines(t(page.headline))}</h1>
          <p className="fx-lead">{t(page.tagline)}</p>
          <div className="fx-cta">{cta}</div>
        </div>
        <div className="fx-hero-shot fx-hero-framed">
          <div className="fx-hero-glow" aria-hidden />
          {/* Immagine già nella cornice ufficiale Apple: niente cornice CSS */}
          <img src={shot(page.hero.name, dark) ?? page.hero.fallback} alt={entry.appName} />
        </div>
      </section>

      {page.chapters.map((c, i) => (
        <section key={i} className={`fx-chapter ${i % 3 === 2 ? 'fx-wide' : i % 3 ? 'fx-alt' : ''}`} style={{ '--fx-accent': c.accent } as CSSProperties}>
          <div className="fx-chapter-inner">
            <div className="fx-copy fx-reveal">
              <p className="fx-eyebrow">{t(c.eyebrow)}</p>
              <h2 className="fx-title">{lines(t(c.title))}</h2>
              <p className="fx-desc">{t(c.desc)}</p>
              {c.points && (
                <ul className="fx-points">{c.points.map((pt, j) => <li key={j}>{t(pt)}</li>)}</ul>
              )}
            </div>
            <div className={`fx-shots fx-reveal ${['', '', 'fx-pair', 'fx-trio'][c.shots.length]}`}>
              {c.shots.map(s => <Phone key={s.name} name={s.name} fallback={s.fallback} alt={t(c.eyebrow)} />)}
            </div>
          </div>
        </section>
      ))}

      <section className="fx-tiles-wrap">
        <h2 className="fx-title fx-center fx-reveal">{t(page.tilesTitle)}</h2>
        <div className="fx-tiles">
          {page.tiles.map((tile, i) => (
            <div key={i} className={`fx-tile fx-reveal ${tile.shot && (shot(tile.shot.name) || tile.shot.fallback) ? 'fx-tile-big' : ''}`}>
              {tile.shot && (shot(tile.shot.name) || tile.shot.fallback) && (
                <div className="fx-tile-shot"><Phone name={tile.shot.name} fallback={tile.shot.fallback} alt={t(tile.title)} /></div>
              )}
              <span className="material-symbols-outlined fx-tile-icon" aria-hidden>{tile.icon}</span>
              <h3>{t(tile.title)}</h3>
              <p>{t(tile.desc)}</p>
            </div>
          ))}
        </div>
      </section>

      {app === 'balancelife' && (
        <section className="ins-teaser fx-reveal">
          <Link to="/insieme" className="ins-teaser-card">
            <div className="ins-icons" aria-hidden>
              <img src={AirportShiftIcon} alt="" className="fx-icon" />
              <span className="material-symbols-outlined">add</span>
              <img src={BalanceLifeIcon} alt="" className="fx-icon" />
            </div>
            <div>
              <h2 className="fx-title">{t({ it: 'Lavori con Aviation Service?', en: 'Working with Aviation Service?' })}</h2>
              <p className="fx-desc">{t({ it: 'Con AirportShift i tuoi turni entrano in Balance Life, e la giornata è completa.', en: 'With AirportShift your shifts come into Balance Life, and your day is complete.' })}</p>
              <span className="ld-door-more">{t({ it: 'Scopri come', en: 'See how' })}<span className="material-symbols-outlined" aria-hidden>arrow_forward</span></span>
            </div>
          </Link>
        </section>
      )}

      <section className="fx-privacy fx-reveal">
        <span className="material-symbols-outlined fx-lock" aria-hidden>lock</span>
        <h2 className="fx-title">{lines(t(page.privacy.title))}</h2>
        <p className="fx-desc">{t(page.privacy.desc)}</p>
      </section>

      <section className="fx-end">
        <img src={page.icon} alt="" className="fx-icon" />
        <h2 className="fx-title">{t(page.end?.title ?? { it: 'Pronto a provarla?', en: 'Ready to try it?' })}</h2>
        {page.end?.sub && <p className="fx-desc">{t(page.end.sub)}</p>}
        <div className="fx-cta">{cta}</div>
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
        {page.end?.note && <p className="muted small" style={{ maxWidth: '46ch' }}>{t(page.end.note)}</p>}
        <p className="muted small" style={{ marginTop: 14 }}>
          <Link to={`/${app}/privacy`}>Privacy</Link>
          {' · '}
          <Link to={`/${app}/support`}>{t({ it: 'Assistenza', en: 'Support' })}</Link>
        </p>
      </section>
    </main>
  )
}
