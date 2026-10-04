// Pagine che Google deve trovare: una per indirizzo, con titolo e descrizione propri.
// Le legge vite.config.ts (genera un index.html per pagina, la sitemap e il robots.txt)
// e App.tsx (aggiorna titolo e descrizione quando si naviga dentro il sito).
// Niente import: questo file gira anche dentro la config di Vite.

export interface Seo {
  title: string
  description: string
  /** Dati strutturati "app" per Google (nome, sistema, prezzo). */
  app?: { name: string; iosAppId: string; category: string }
}

export const SEO: Record<string, Seo> = {
  '': {
    title: 'AmmApp | App semplici, private, fatte con cura',
    description: 'AmmApp è un piccolo laboratorio indipendente che costruisce app per iPhone leggere, senza account né server. I tuoi dati restano sul telefono.',
  },
  apps: {
    title: 'Le nostre app | AmmApp',
    description: 'AirportShift e Balance Life: app per iPhone senza account né server, che funzionano offline.',
  },
  'airportshift/features': {
    title: 'AirportShift | I turni di Aviation Service, a colpo d’occhio',
    description: 'Carica il PDF dei turni di Aviation Service: codici tradotti in orari, calendario, ore e straordinari contati, condivisione con un QR. Senza account, tutto sul telefono.',
    app: { name: 'AirportShift', iosAppId: '6783308412', category: 'ProductivityApplication' },
  },
  'balancelife/features': {
    title: 'Balance Life | La tua giornata, in equilibrio',
    description: 'Lettura, palestra, lavoro, serie, studio: registra ciò che fai, pianifica ciò che conta e guarda dove va il tuo tempo. 100% offline, nessun account.',
    app: { name: 'Balance Life', iosAppId: '6789879676', category: 'LifestyleApplication' },
  },
  insieme: {
    title: 'Balance Life e AirportShift insieme | AmmApp',
    description: 'Chi lavora con Aviation Service può portare i turni di AirportShift in Balance Life: lavoro, allenamenti e letture sulla stessa pagina, senza che i dati lascino il telefono.',
  },
  'airportshift/privacy': { title: 'Privacy | AirportShift', description: 'Informativa sulla privacy di AirportShift: nessun account, nessun server, i turni restano sul telefono.' },
  'airportshift/support': { title: 'Assistenza | AirportShift', description: 'Domande frequenti e contatti per AirportShift.' },
  'balancelife/privacy': { title: 'Privacy | Balance Life', description: 'Informativa sulla privacy di Balance Life: niente cloud, niente account, i dati restano sul telefono.' },
  'balancelife/support': { title: 'Assistenza | Balance Life', description: 'Domande frequenti e contatti per Balance Life.' },
  'resoconto/privacy': { title: 'Privacy | Resoconto', description: 'Informativa sulla privacy di Resoconto.' },
  'resoconto/support': { title: 'Assistenza | Resoconto', description: 'Domande frequenti e contatti per Resoconto.' },
}

/** Pagine da non indicizzare: aprono l'app o lo store e possono portare dati del QR. */
export const NOINDEX = /\/(open|store)\/?$/
