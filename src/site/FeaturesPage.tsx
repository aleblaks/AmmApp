import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Phone, shot } from './Phone'
import { useParams } from 'react-router-dom'
import { TLink as Link } from './TLink'
import { apps, iosStoreUrl, androidStoreUrl, androidComingSoonText, detectOS, storeUrlFor } from './apps'
import { lines, useT, type Bi } from './lang'
import { AppIcon } from './AppIcon'
import { ActivitiesSection, type Activities } from './Attivita'
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

// Come entrano i telefoni di un capitolo (classi .mo-* in styles.css). Ogni capitolo ne ha una diversa dai vicini:
// zoom = parte grande e si assesta · behind = il secondo esce da dietro il primo · cross = arrivano incrociati
// · stagger = salgono uno dopo l'altro · apart = partono sovrapposti e si separano · pop = compaiono in sequenza.
type Motion = 'zoom' | 'behind' | 'cross' | 'stagger' | 'apart' | 'pop'

interface Chapter {
  motion: Motion
  // then: vedi Phone (secondo screenshot nella stessa cornice, o 'night' per l'altro tema).
  shots: { name: string; fallback?: string; then?: string }[]
  eyebrow: Bi
  title: Bi
  desc: Bi
  points?: Bi[]
  accent: string
}

// also: altri screenshot accanto al primo (le schermate dell'orologio stanno in coppia).
interface Tile { icon: string; title: Bi; desc: Bi; shot?: { name: string; fallback?: string; also?: string[] } }

interface AppPage {
  badge?: Bi
  // Il momento d'apertura del titolo: 'flap' gira lettera per lettera come un tabellone delle partenze,
  // 'tilt' oscilla e si mette in bolla come una bilancia.
  heroFx: 'flap' | 'tilt'
  // Invito alla pagina /insieme.
  together: { title: Bi; desc: Bi }
  // Telefono d'apertura: uno screenshot nella cornice (lo stesso file dei capitoli, così non invecchia a parte);
  // watch = un orologio appoggiato accanto.
  hero: { name: string; fallback?: string; watch?: string }
  headline: Bi
  tagline: Bi
  chapters: Chapter[]
  // Sezione «Nove attività» (Step 2 di ogni attività), fra i capitoli: vedi Attivita.tsx.
  activities?: Activities
  tilesTitle: Bi
  tiles: Tile[]
  privacy: { title: Bi; desc: Bi }
  // Chiusura propria (es. il gioco sulla sigla AS) e riga di chiarimento sotto i pulsanti.
  end?: { title: Bi; sub?: Bi; note?: Bi }
}

const PAGES: Record<string, AppPage> = {
  airportshift: {
    badge: { it: 'Novità: Home e Riepilogo a tessere', en: 'New: tiled Home and Summary' },
    heroFx: 'flap',
    together: {
      title: { it: 'Usi anche Balance Life?', en: 'Using Balance Life too?' },
      desc: { it: 'Attiva la condivisione e i tuoi turni entrano nella giornata di Balance Life, senza uscire dal telefono.', en: 'Turn on sharing and your shifts show up in your Balance Life day, without leaving your phone.' },
    },
    hero: { name: 'as-hero', fallback: MockupCalendario, watch: 'as-watch' },
    headline: { it: 'Il tuo turno.\nA colpo d’occhio.', en: 'Your shift.\nAt a glance.' },
    tagline: {
      it: 'Carica il PDF dei turni di Aviation Service e AirportShift fa il resto: codici tradotti in orari, un calendario che si legge in un secondo, ore e straordinari già contati.',
      en: 'Load your Aviation Service shift PDF and AirportShift does the rest: codes turned into times, a calendar you read in a second, hours and overtime already counted.',
    },
    chapters: [
      {
        motion: 'zoom',
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
        motion: 'behind',
        shots: [{ name: 'as-hero', then: 'as-giorno' }],
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
        motion: 'cross',
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
        motion: 'behind',
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
        motion: 'stagger',
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
        motion: 'apart',
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
        motion: 'pop',
        shots: [{ name: 'as-watch-ore' }, { name: 'as-watch-riepilogo' }, { name: 'as-watch-quadrante' }],
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
        motion: 'behind',
        shots: [{ name: 'as-colori', fallback: MockupColori, then: 'night' }, { name: 'as-sfondo', then: 'night' }],
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
      { icon: 'calendar_month', shot: { name: 'as-calendario-nuovo' }, title: { it: 'Calendario di sistema', en: 'System calendar' }, desc: { it: 'Sincronizza i turni con il calendario del telefono, anche in automatico dopo ogni import. E li togli quando vuoi, tutti o un mese solo.', en: 'Sync shifts to your phone’s calendar, even automatically after every import. And remove them whenever you like, all of them or a single month.' } },
      { icon: 'pin', shot: { name: 'as-codici', fallback: MockupCodici }, title: { it: 'Schema codici', en: 'Code decoder' }, desc: { it: 'Scrivi 509 e scopri orario e durata. FNL, RIP, ADD e FR riconosciuti da soli.', en: 'Type 509 and see time and duration. FNL, RIP, ADD and FR recognized automatically.' } },
      { icon: 'bar_chart', shot: { name: 'as-anno' }, title: { it: 'L’anno intero', en: 'The whole year' }, desc: { it: 'Le ore lavorate mese per mese: tocca la card per giorni, straordinari e ferie, e passa da un anno all’altro.', en: 'Hours worked month by month: tap the card for days, overtime and vacation, and switch between years.' } },
      { icon: 'grid_view', shot: { name: 'as-mesi' }, title: { it: 'Tutti i mesi', en: 'All months' }, desc: { it: 'Salta a qualsiasi mese e guarda il resoconto dell’anno.', en: 'Jump to any month and see the yearly recap.' } },
      { icon: 'devices_fold', title: { it: 'iPhone Duo', en: 'iPhone Duo' }, desc: { it: 'Aperto, il calendario sta accanto alle card del giorno e della settimana, e il Riepilogo mostra le due pagine affiancate.', en: 'Unfolded, the calendar sits next to the day and week cards, and the Summary shows both pages side by side.' } },
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
    heroFx: 'tilt',
    together: {
      title: { it: 'Lavori con Aviation Service?', en: 'Working with Aviation Service?' },
      desc: { it: 'Con AirportShift i tuoi turni entrano in Balance Life, e la giornata è completa.', en: 'With AirportShift your shifts come into Balance Life, and your day is complete.' },
    },
    hero: { name: 'bl-hero', fallback: BlHome },
    headline: { it: 'La tua giornata.\nIn equilibrio.', en: 'Your day.\nIn balance.' },
    tagline: {
      it: 'Lettura, palestra, lavoro, serie, studio: registra ciò che fai, pianifica ciò che conta e guarda il tempo prendere forma.',
      en: 'Reading, gym, work, shows, study: log what you do, plan what matters and watch your time take shape.',
    },
    chapters: [
      {
        motion: 'behind',
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
        motion: 'stagger',
        shots: [{ name: 'bl-live', fallback: BlTimer }, { name: 'bl-lockscreen' }],
        eyebrow: { it: 'Dal vivo', en: 'Live' },
        title: { it: 'Premi avvia.\nPensa al resto.', en: 'Press start.\nFocus on the rest.' },
        desc: {
          it: 'Il cronometro corre mentre segni serie, pesi e ripetizioni. Resta sulla schermata di blocco, e le pause si contano da sole.',
          en: 'The timer runs while you log sets, weights and reps. It stays on the Lock Screen, and pauses are counted for you.',
        },
        points: [
          { it: 'Uno swipe sulla card mette in pausa o termina; in ogni tab la sessione in corso resta sopra la barra.', en: 'One swipe on the card pauses or stops it; on every tab, the running session stays above the bar.' },
          { it: 'Avviata in ritardo? Dal menu ⋯ sposti l’ora d’inizio mentre il cronometro corre.', en: 'Started late? Move the start time from the ⋯ menu while the timer runs.' },
          { it: 'Dalla schermata di blocco, con ✓ segni l’episodio o la puntata appena finiti.', en: 'From the Lock Screen, ✓ marks the episode you just finished.' },
        ],
        accent: '#ff453a',
      },
      {
        motion: 'cross',
        shots: [{ name: 'bl-libreria-nuovo' }, { name: 'bl-lettura' }],
        eyebrow: { it: 'Libreria', en: 'Library' },
        title: { it: 'La tua libreria.\nPagina dopo pagina.', en: 'Your library.\nPage by page.' },
        desc: {
          it: 'Dorsi colorati per genere e collana, e per ogni libro la sua scheda: ore, ritmo, giorni di fila e una heatmap giorno per giorno. Tocca «Letto» e la tessera si gira sulla data in cui lo finisci.',
          en: 'Spines colored by genre and collection, and a page for every book: hours, pace, days in a row and a day-by-day heatmap. Tap “Read” and the tile flips to the date you’ll finish it.',
        },
        points: [
          { it: 'Sospendi o interrompi una lettura: resta in libreria, al suo posto.', en: 'Pause or drop a book: it stays on the shelf, in its place.' },
        ],
        accent: '#ff9f0a',
      },
      {
        motion: 'apart',
        shots: [{ name: 'bl-trends', fallback: BlTrends }, { name: 'bl-heatmap' }],
        eyebrow: { it: 'Trends', en: 'Trends' },
        title: { it: 'Guarda dove va\nil tuo tempo.', en: 'See where\nyour time goes.' },
        desc: {
          it: 'Un mosaico di tessere che si allargano al tocco: ore, sessioni, serie di giorni attivi e record, per settimana, mese o anno. Una chip per ogni attività, con il suo resoconto.',
          en: 'A mosaic of tiles that open up when tapped: hours, sessions, streaks and records, by week, month or year. One chip per activity, each with its own report.',
        },
        points: [
          { it: 'Giorni e orari: una griglia di sette giorni per 24 ore dice quando fai ogni cosa.', en: 'Days and hours: a seven-day, 24-hour grid shows when you do each thing.' },
          { it: 'Libri e serie finiti o interrotti, autori e generi più letti.', en: 'Books and shows finished or dropped, your most-read authors and genres.' },
        ],
        accent: '#64d2ff',
      },
      {
        motion: 'zoom',
        shots: [{ name: 'bl-obiettivi', fallback: BlOrari }, { name: 'bl-calendario', fallback: BlCalendario }],
        eyebrow: { it: 'Obiettivi', en: 'Goals' },
        title: { it: 'Pianifica la settimana.\nL’agenda fa il resto.', en: 'Plan the week.\nThe agenda does the rest.' },
        desc: {
          it: 'Imposta obiettivi e orari preferiti per ogni attività: l’agenda organizza ogni giorno di conseguenza. Il calendario tiene insieme ciò che hai fatto e ciò che ti aspetta.',
          en: 'Set goals and preferred times for each activity: the agenda plans each day around them. The calendar holds what you’ve done and what’s ahead.',
        },
        points: [
          { it: 'Se vuoi, l’attività programmata parte da sola all’ora giusta e si ferma alla fine.', en: 'If you like, a planned activity starts by itself at the right time and stops at the end.' },
          { it: 'Nel calendario turni, eventi e sessioni future si vedono sempre, a righe oblique.', en: 'In the calendar, shifts, events and future sessions always show, in diagonal stripes.' },
        ],
        accent: '#5e5ce6',
      },
      {
        motion: 'pop',
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
        motion: 'behind',
        shots: [{ name: 'bl-retro', fallback: BlStile, then: 'night' }, { name: 'bl-bn', then: 'night' }],
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
    activities: {
      after: 0,
      label: { it: 'Attività', en: 'Activities' },
      prefix: 'bl',
      title: { it: 'Nove attività.\nOgnuna a modo suo.', en: 'Nine activities.\nEach in its own way.' },
      intro: {
        it: 'Tocca il +, scegli l’attività e lo Step 2 cambia faccia: chiede solo quello che conta per lei. Il resto lo calcola l’app.',
        en: 'Tap +, pick the activity and Step 2 changes to fit: it asks only what matters for that activity. The app works out the rest.',
      },
      items: [
        {
          key: 'reading', icon: 'menu_book', color: '#4a9bdd',
          name: { it: 'Lettura', en: 'Reading' },
          title: { it: 'Leggi, e sai già quando finisci.', en: 'Read, and know when you’ll finish.' },
          desc: {
            it: 'Pagine totali, da–a o solo quella dove sei arrivato: l’app fa i conti, misura il ritmo al netto delle pause e ti dice la data in cui chiudi il libro.',
            en: 'Total pages, from–to or just where you stopped: the app does the math, measures your pace net of breaks and tells you the date you’ll close the book.',
          },
          points: [
            { it: '«Lo finisci il»: con i cursori provi altri minuti al giorno o un altro ritmo, senza salvare niente.', en: '“You’ll finish on”: try other minutes a day or another pace with the sliders, without saving a thing.' },
            { it: 'Riparti da capitolo e pagina dell’ultima sessione, con i libri iniziati in cima.', en: 'Pick up from the last session’s chapter and page, with books in progress on top.' },
            { it: 'Prefazioni, introduzioni e postfazioni si spuntano e contano nel progresso.', en: 'Prefaces, introductions and afterwords get ticked off and count toward progress.' },
            { it: 'Sulla card, il ritmo in pagine all’ora e la citazione che volevi ricordare.', en: 'On the card, your pace in pages per hour and the quote you wanted to keep.' },
          ],
        },
        {
          key: 'tv', icon: 'tv', color: '#efc66d',
          name: { it: 'Serie TV', en: 'TV shows' },
          title: { it: 'Sai sempre a che episodio sei.', en: 'Always know which episode you’re on.' },
          desc: {
            it: 'Tocca gli episodi e la durata si fa da sé, partendo da quello dopo l’ultimo visto. Anche a metà episodio, anche dopo tre settimane di pausa.',
            en: 'Tap the episodes and the duration fills itself in, starting from the one after the last you watched. Even halfway through, even after three weeks off.',
          },
          points: [
            { it: 'Ti sei addormentato a metà? Tieni premuto l’episodio e scegli «Mezzo»: la prossima volta riparti da lì.', en: 'Fell asleep halfway? Long-press the episode and pick “Half”: next time you resume from there.' },
            { it: '«Visto» dalla schermata di blocco: con ✓ passi al successivo senza aprire l’app.', en: '“Watched” from the Lock Screen: ✓ moves to the next one without opening the app.' },
            { it: 'Nella scheda della serie, quando sarai in pari al tuo ritmo. E la sospendi o la lasci senza perdere lo storico.', en: 'On the show’s page, when you’ll be caught up at your pace. Pause or drop it without losing your history.' },
          ],
        },
        {
          key: 'gym', icon: 'fitness_center', color: '#e34141',
          name: { it: 'Palestra', en: 'Gym' },
          title: { it: 'La scheda si ricorda i tuoi carichi.', en: 'Your log remembers the weights.' },
          desc: {
            it: 'Ripeti l’ultima seduta in un tocco o parti da una routine: sopra ogni esercizio c’è cosa hai fatto l’ultima volta. Tocca S1, S2… e la serie è fatta.',
            en: 'Repeat your last workout in one tap or start from a routine: above every exercise is what you did last time. Tap S1, S2… and the set is done.',
          },
          points: [
            { it: 'Il recupero parte da solo e si legge da lontano, con «Salta» e un suono quando tocca a te.', en: 'Rest starts by itself and reads from across the room, with “Skip” and a sound when it’s your turn.' },
            { it: 'Plank e gli altri esercizi a tempo: preparazione, timer, squillo e recupero, tutto da sé.', en: 'Planks and other timed exercises: get ready, timer, chime and rest, all on their own.' },
            { it: 'Gruppi muscolari dedotti dagli esercizi; a fine allenamento il volume e i record battuti.', en: 'Muscle groups worked out from the exercises; at the end, your volume and the records you broke.' },
          ],
        },
        {
          key: 'study', icon: 'school', color: '#5abc95',
          name: { it: 'Studio', en: 'Study' },
          title: { it: 'Ogni sera sai quante pagine ti aspettano.', en: 'Every evening you know how many pages are waiting.' },
          desc: {
            it: 'Dai le pagine e la data della verifica: i piani di studio dividono il lavoro sulle sere che restano, e in Home trovi il tuo pezzo.',
            en: 'Give it the pages and the exam date: study plans split the work across the evenings left, and Home shows your share.',
          },
          points: [
            { it: 'Giorni di ripasso: restano in agenda ma non fanno avanzare le pagine.', en: 'Review days: they stay on the agenda but don’t move the pages forward.' },
            { it: 'Due materie la stessa sera? Prima la scadenza più vicina.', en: 'Two subjects the same evening? The nearest deadline comes first.' },
            { it: 'Il pomodoro è già dentro il cronometro, e verifiche ed esami finiscono in Eventi.', en: 'The Pomodoro is built into the timer, and tests and exams land in Events.' },
          ],
        },
        {
          key: 'work', icon: 'work', color: '#a784f0',
          name: { it: 'Lavoro', en: 'Work' },
          title: { it: 'Otto ore in ufficio,\nsette di lavoro.', en: 'Eight hours at the office,\nseven of work.' },
          desc: {
            it: 'Scegli il tipo di lavoro e l’orario c’è già. La pausa pranzo parte e finisce da sola: la card dice le ore vere.',
            en: 'Pick the type of work and the hours are already there. The lunch break starts and ends by itself: the card shows your real hours.',
          },
          points: [
            { it: 'Turni pianificati in Home, con il luogo e «Apri in Mappe».', en: 'Planned shifts on Home, with the place and “Open in Maps”.' },
            { it: 'Pranzi prima o dopo? Dal menu ⋯ avvii la pausa a mano.', en: 'Lunch earlier or later? Start the break by hand from the ⋯ menu.' },
            { it: 'In Trends, giorni e orari in una griglia: si vede subito quando lavori.', en: 'In Trends, days and hours on a grid: you see at once when you work.' },
          ],
        },
        {
          key: 'podcast', icon: 'mic', color: '#7b5cac',
          name: { it: 'Podcast', en: 'Podcasts' },
          title: { it: 'Riparti dalla puntata dopo.', en: 'Pick up from the next episode.' },
          desc: {
            it: 'Dici quante puntate hai ascoltato e il numero di partenza lo sa già. Dici in che giorno escono, e il conto delle uscite cresce da solo ogni settimana.',
            en: 'Say how many episodes you listened to and it already knows where to start. Say which day they come out, and the count grows by itself every week.',
          },
          points: [
            { it: 'Dalla schermata di blocco, ✓ segna la puntata finita.', en: 'From the Lock Screen, ✓ marks the finished episode.' },
            { it: 'Con la durata media della puntata, l’ora di fine si calcola da sé.', en: 'With the average episode length, the end time works itself out.' },
          ],
        },
        {
          key: 'movie', icon: 'movie', color: '#efa447',
          name: { it: 'Film', en: 'Movies' },
          title: { it: 'La lista dei film da vedere.', en: 'Your watchlist, built in.' },
          desc: {
            it: 'Visti, da vedere, conclusi: quando cerchi cosa guardare stasera, la risposta è già lì. Scegli il titolo e l’ora di fine si sposta da sola.',
            en: 'Watched, to watch, done: when you’re wondering what to see tonight, the answer is already there. Pick the title and the end time moves by itself.',
          },
          points: [
            { it: 'Saghe con il loro numero, o il regista se la saga non c’è.', en: 'Sagas with their number, or the director when there’s no saga.' },
            { it: 'Sotto il titolo, quando l’hai visto l’ultima volta.', en: 'Under the title, when you last watched it.' },
          ],
        },
        {
          key: 'gaming', icon: 'sports_esports', color: '#4cc5b5',
          name: { it: 'Gaming', en: 'Gaming' },
          title: { it: 'Ogni gioco, la sua piattaforma.', en: 'Every game, its own platform.' },
          desc: {
            it: 'Il titolo si riprende dall’elenco dei giochi e la piattaforma finisce sulla card. Nel resoconto, le ore per gioco dicono quanto ti è piaciuto meglio di un voto.',
            en: 'Pick the title from your games list and the platform goes on the card. In the report, hours per game say how much you liked it better than a rating.',
          },
          points: [
            { it: 'Dal menu ⋯ sospendi o interrompi un gioco, o lo escludi dalle statistiche.', en: 'From the ⋯ menu, pause or drop a game, or leave it out of your stats.' },
          ],
        },
        {
          key: 'sport', icon: 'sports_soccer', color: '#93b83a',
          name: { it: 'Sport', en: 'Sports' },
          title: { it: 'Ogni sport misura cose sue.', en: 'Every sport counts its own things.' },
          desc: {
            it: 'Chilometri per la corsa, vasche per stile nel nuoto, goal, rigori e angoli per il calcio, punti, canestri, partite: scegli lo sport e compaiono i suoi campi.',
            en: 'Kilometers for running, laps per stroke for swimming, goals, penalties and corners for football, points, baskets, matches: pick the sport and its fields appear.',
          },
          points: [
            { it: 'I numeri si salvano con la sessione e compaiono sulla card.', en: 'The numbers are saved with the session and show up on the card.' },
            { it: 'Anche una corsa al sabato tiene viva la serie di giorni attivi, da Piantina a Leggenda.', en: 'Even a Saturday run keeps your streak alive, from Sprout to Legend.' },
          ],
        },
      ],
    },
    tilesTitle: { it: 'Piccole cose. Fatte bene.', en: 'Small things. Done right.' },
    tiles: [
      { icon: 'local_parking', shot: { name: 'bl-parcheggio', fallback: BlParcheggio }, title: { it: 'Parcheggio', en: 'Parking' }, desc: { it: 'Salva dove hai lasciato l’auto e ritrovala sulla mappa.', en: 'Save where you left the car and find it on the map.' } },
      { icon: 'search', shot: { name: 'bl-cerca' }, title: { it: 'Cerca', en: 'Search' }, desc: { it: 'Una tab tutta sua: attività, libri, eventi, impostazioni. E prima ancora di scrivere, quello da riprendere.', en: 'A tab of its own: activities, books, events, settings. And before you type, what to pick up.' } },
      { icon: 'watch', shot: { name: 'bl-watch', also: ['bl-watch-oggi'] }, title: { it: 'Al polso', en: 'On your wrist' }, desc: { it: 'Avvia, metti in pausa e chiudi una sessione dall’Apple Watch, e guarda la giornata sul quadrante.', en: 'Start, pause and stop a session from Apple Watch, and see your day on the watch face.' } },
      { icon: 'widgets', title: { it: 'La tua giornata', en: 'Your day' }, desc: { it: 'Un widget in tre misure: la giornata su un quadrante di 24 ore con i promemoria di oggi, la timeline, l’agenda da spuntare.', en: 'One widget, three sizes: your day on a 24-hour dial with today’s reminders, the timeline, the agenda to tick off.' } },
      { icon: 'event', title: { it: 'Calendario di sistema', en: 'System calendar' }, desc: { it: 'Gli eventi del calendario del telefono diventano previsioni della giornata, e le sessioni ci tornano dentro.', en: 'Your phone’s calendar events become plans for the day, and sessions go back into it.' } },
      { icon: 'table_view', shot: { name: 'bl-export-nuovo' }, title: { it: 'Export leggibile', en: 'Readable export' }, desc: { it: 'Tutto in un solo file che si apre in Numbers o Excel, e si reimporta senza doppioni.', en: 'Everything in a single file that opens in Numbers or Excel, re-importable without duplicates.' } },
      { icon: 'content_copy', shot: { name: 'bl-copia' }, title: { it: 'Copia e incolla', en: 'Copy and paste' }, desc: { it: 'Duplica un’attività o un’intera giornata, anche come testo da mandare in chat.', en: 'Duplicate an activity or a whole day, even as text to send in a chat.' } },
      { icon: 'science', title: { it: 'Prova con i dati d’esempio', en: 'Try it with sample data' }, desc: { it: 'Al primo avvio l’app si riempie di un mese verosimile: esplori tutto, poi riparti dai tuoi dati.', en: 'On first launch the app fills up with a believable month: explore everything, then start over with your own data.' } },
      { icon: 'touch_app', title: { it: 'Come si usa', en: 'How it works' }, desc: { it: 'Una guida a schede con prove vere: tocca «Provalo» e l’app ti indica cosa toccare. La riapri da Impostazioni o da Cerca.', en: 'A card-by-card guide with real try-outs: tap “Try it” and the app points to what to tap. Reopen it from Settings or Search.' } },
      { icon: 'devices_fold', title: { it: 'iPhone Duo', en: 'iPhone Duo' }, desc: { it: 'Aperto, l’app si dispone su due colonne: Home, Trends, Cerca, Eventi e Impostazioni, con il + che si adatta alla piega.', en: 'Unfolded, the app spreads over two columns: Home, Trends, Search, Events and Settings, with the + adapting to the fold.' } },
    ],
    privacy: {
      title: { it: '100% offline.\n100% tuo.', en: '100% offline.\n100% yours.' },
      desc: { it: 'Niente cloud, niente account, niente server. La tua vita resta sul tuo telefono.', en: 'No cloud, no account, no server. Your life stays on your phone.' },
    },
  },
}

// Barra dell'app. La voce del capitolo che attraversa il centro dello schermo si accende, e la riga
// scorre da sola per tenerla in vista. I tocchi scorrono la pagina senza toccare l'indirizzo: così
// il tasto Indietro del browser torna alla pagina precedente, non al capitolo di prima.
function LocalNav({ name, app, labels, children }: { name: string; app: string; labels: string[]; children: ReactNode }) {
  const [on, setOn] = useState(0)
  const row = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => { for (const e of entries) if (e.isIntersecting) setOn(Number(e.target.id.slice(4))) },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    document.querySelectorAll('[id^="cap-"]').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
  useEffect(() => {
    const r = row.current
    const a = r?.children[on] as HTMLElement | undefined
    if (!r || !a) return
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches
    r.scrollTo({ left: a.offsetLeft - (r.clientWidth - a.offsetWidth) / 2, behavior: calm ? 'auto' : 'smooth' })
  }, [on])
  return (
    <nav className="fx-local" aria-label={name}>
      <div className="fx-local-inner">
        <button type="button" className="fx-local-id" onClick={() => window.scrollTo({ top: 0 })}>
          <AppIcon app={app} />
          <span>{name}</span>
        </button>
        <div className="fx-local-links" ref={row}>
          {labels.map((label, i) => (
            <a key={i} href={`#cap-${i}`} className={i === on ? 'on' : undefined} aria-current={i === on ? 'true' : undefined}
              onClick={(e) => { e.preventDefault(); document.getElementById(`cap-${i}`)?.scrollIntoView() }}>
              {label}
            </a>
          ))}
        </div>
        {children}
      </div>
    </nav>
  )
}

// Titolo d'apertura. Con 'flap' ogni lettera è uno span (--i dà il ritardo); chi usa uno screen reader
// sente il titolo intero dall'aria-label.
function Headline({ text, fx }: { text: string; fx: AppPage['heroFx'] }) {
  if (fx === 'tilt') return <h1 className="fx-headline fx-tilt">{lines(text)}</h1>
  let i = 0
  return (
    <h1 className="fx-headline fx-flap" aria-label={text.replace('\n', ' ')}>
      {text.split('\n').map((line, l) => (
        <span key={l} className="ln" aria-hidden>
          {line.split(' ').map((word, w) => (
            <span key={w}><span className="w">{[...word].map((ch, c) => <span key={c} className="ch" style={{ '--i': i++ } as CSSProperties}>{ch}</span>)}</span>{' '}</span>
          ))}
        </span>
      ))}
    </h1>
  )
}

export function FeaturesPage() {
  const { app } = useParams()
  const entry = app ? apps[app] : undefined
  const page = app ? PAGES[app] : undefined
  const t = useT()
  const os = detectOS()

  if (!entry || !page) {
    return (
      <main className="page">
        <h1>{t({ it: 'Pagina non trovata', en: 'Page not found' })}</h1>
        <Link to="/">{t({ it: 'Torna alla home', en: 'Back to home' })}</Link>
      </main>
    )
  }

  // Capitoli e, se c'è, la sezione delle attività al suo posto: la barra dell'app le elenca tutte.
  const blocks: (Chapter | 'act')[] = [...page.chapters]
  if (page.activities) blocks.splice(page.activities.after + 1, 0, 'act')

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
            <AppIcon app={app!} className="fx-icon" style={{ viewTransitionName: `icon-${app}` }} />
            <p className="fx-appname">{entry.appName}</p>
          </div>
          {page.badge && <p className="fx-badge">{t(page.badge)}</p>}
          <Headline text={t(page.headline)} fx={page.heroFx} />
          <p className="fx-lead">{t(page.tagline)}</p>
          <div className="fx-cta">{cta}</div>
        </div>
        <div className="fx-hero-shot">
          <Phone name={page.hero.name} fallback={page.hero.fallback} alt={entry.appName} vt={`phone-${app}`} />
          {page.hero.watch && <Phone name={page.hero.watch} alt="" />}
        </div>
      </section>

      <LocalNav key={app} name={entry.appName} app={app!} labels={blocks.map(b => t(b === 'act' ? page.activities!.label : b.eyebrow))}>
        {storeUrl
          ? <a href={storeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">{t({ it: 'Scarica', en: 'Get' })}</a>
          : <span className="btn btn-disabled" aria-disabled="true">{t(androidComingSoonText)}</span>}
      </LocalNav>

      {blocks.map((c, j) => c === 'act' ? <ActivitiesSection key="act" data={page.activities!} id={`cap-${j}`} /> : (() => {
        const i = page.chapters.indexOf(c)
        return (
        <section key={i} id={`cap-${j}`} className={`fx-chapter ${i % 3 === 2 ? 'fx-wide' : i % 3 ? 'fx-alt' : ''}`} style={{ '--fx-accent': c.accent } as CSSProperties}>
          <div className="fx-chapter-inner">
            <div className="fx-copy fx-reveal">
              <h2 className="fx-title">{lines(t(c.title))}</h2>
              <p className="fx-desc">{t(c.desc)}</p>
              {c.points && (
                <ul className="fx-points">{c.points.map((pt, j) => <li key={j}>{t(pt)}</li>)}</ul>
              )}
            </div>
            <div className={`fx-shots mo-${c.motion} ${['', '', 'fx-pair', 'fx-trio'][c.shots.length]}`}>
              {c.shots.map(s => <Phone key={s.name} name={s.name} fallback={s.fallback} then={s.then} alt={t(c.eyebrow)} />)}
            </div>
          </div>
        </section>
        )
      })())}

      <section className="fx-tiles-wrap">
        <h2 className="fx-title fx-center fx-reveal">{t(page.tilesTitle)}</h2>
        <div className="fx-tiles">
          {page.tiles.map((tile, i) => (
            <div key={i} className={`fx-tile ${tile.shot && (shot(tile.shot.name) || tile.shot.fallback) ? 'fx-tile-big' : ''}`}>
              {tile.shot && (shot(tile.shot.name) || tile.shot.fallback) && (
                <div className="fx-tile-shot">
                  <Phone name={tile.shot.name} fallback={tile.shot.fallback} alt={t(tile.title)} />
                  {tile.shot.also?.map(n => <Phone key={n} name={n} alt="" />)}
                </div>
              )}
              <span className="material-symbols-outlined fx-tile-icon" aria-hidden>{tile.icon}</span>
              <h3>{t(tile.title)}</h3>
              <p>{t(tile.desc)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="ins-teaser" style={{ '--fx-accent': app === 'balancelife' ? '#0a84ff' : '#30d158' } as CSSProperties}>
          <Link to="/insieme" className="ins-teaser-card">
            <div className="ins-icons" aria-hidden>
              <AppIcon app="airportshift" className="fx-icon" />
              <span className="material-symbols-outlined">add</span>
              <AppIcon app="balancelife" className="fx-icon" />
            </div>
            <div>
              <h2 className="fx-title">{t(page.together.title)}</h2>
              <p className="fx-desc">{t(page.together.desc)}</p>
              <span className="fx-more">{t({ it: 'Scopri come', en: 'See how' })}<span className="material-symbols-outlined" aria-hidden>arrow_forward</span></span>
            </div>
          </Link>
      </section>

      <section className="fx-privacy fx-reveal">
        <span className="material-symbols-outlined fx-lock" aria-hidden>lock</span>
        <h2 className="fx-title">{lines(t(page.privacy.title))}</h2>
        <p className="fx-desc">{t(page.privacy.desc)}</p>
      </section>

      <section className="fx-end">
        <AppIcon app={app!} className="fx-icon" />
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
