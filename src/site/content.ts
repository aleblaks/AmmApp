export type LangCode = 'it' | 'en'

export interface PrivacySection {
  heading?: string
  paragraphs?: string[]
  bullets?: { label: string; text: string }[]
}

export interface PrivacyDoc {
  title: string
  lastUpdated: string
  intro: string
  sections: PrivacySection[]
  contact: { heading: string; text: string; email: string }
}

export interface AppPrivacy {
  appName: string
  packageId: string
  docs: Record<LangCode, PrivacyDoc>
}

export const langLabels: Record<LangCode, string> = {
  it: 'Italiano',
  en: 'English',
}

const airportshift: AppPrivacy = {
  appName: 'AirportShift',
  packageId: 'com.aleblaks.TurniAeroporto',
  docs: {
    it: {
      title: 'Informativa sulla Privacy — AirportShift',
      lastUpdated: 'Ultimo aggiornamento: 23 giugno 2026',
      intro:
        "AirportShift è un'app pensata per gestire i tuoi turni di lavoro. La tua privacy è una priorità: l'app funziona interamente sul tuo dispositivo e non raccoglie alcun dato personale.",
      sections: [
        {
          heading: 'Nessuna raccolta dati',
          paragraphs: [
            "AirportShift non raccoglie, non invia e non condivide alcun dato personale. Non ci sono server: l'app non effettua alcuna connessione di rete per trasmettere i tuoi dati. Non utilizziamo strumenti di analisi, tracciamento, pubblicità o segnalazione errori di terze parti.",
          ],
        },
        {
          heading: 'Dove restano i tuoi dati',
          paragraphs: [
            'Il tuo nome e i tuoi turni sono salvati esclusivamente in locale, sulla memoria del tuo telefono. Restano sul dispositivo e non lasciano mai il telefono.',
          ],
        },
        {
          heading: 'PDF dei turni',
          paragraphs: [
            'Il PDF dei turni che importi viene letto ed elaborato direttamente sul tuo dispositivo. Non viene mai caricato né inviato da nessuna parte.',
          ],
        },
        {
          heading: 'Condivisione con i colleghi (QR code)',
          paragraphs: [
            'Puoi condividere i tuoi turni con un collega tramite un QR code. I dati viaggiano direttamente da dispositivo a dispositivo tramite il codice: non passano attraverso alcun server.',
          ],
        },
        {
          heading: 'Permessi',
          bullets: [
            {
              label: 'Fotocamera',
              text: 'usata unicamente per scansionare il QR di un collega. Non vengono salvate o trasmesse foto.',
            },
            {
              label: 'Calendario',
              text: 'usato unicamente, su tua richiesta, per aggiungere i turni al calendario locale del tuo telefono.',
            },
          ],
        },
        {
          heading: 'Nessun account',
          paragraphs: [
            "Non è richiesta alcuna registrazione, nessun account e nessun login per usare l'app.",
          ],
        },
      ],
      contact: {
        heading: 'Contatti',
        text: 'Per qualsiasi domanda su questa informativa:',
        email: 'ammapp.help@gmail.com',
      },
    },
    en: {
      title: 'Privacy Policy — AirportShift',
      lastUpdated: 'Last updated: 23 June 2026',
      intro:
        'AirportShift is an app designed to manage your work shifts. Your privacy is a priority: the app runs entirely on your device and does not collect any personal data.',
      sections: [
        {
          heading: 'No data collection',
          paragraphs: [
            'AirportShift does not collect, send, or share any personal data. There are no servers: the app makes no network connection to transmit your data. We do not use any third-party analytics, tracking, advertising, or crash-reporting tools.',
          ],
        },
        {
          heading: 'Where your data stays',
          paragraphs: [
            "Your name and your shifts are stored only locally, in your phone's storage. They stay on your device and never leave your phone.",
          ],
        },
        {
          heading: 'Shift PDF',
          paragraphs: [
            'The shift PDF you import is read and processed directly on your device. It is never uploaded or sent anywhere.',
          ],
        },
        {
          heading: 'Sharing with colleagues (QR code)',
          paragraphs: [
            'You can share your shifts with a colleague via a QR code. The data travels directly device-to-device through the code: it never passes through any server.',
          ],
        },
        {
          heading: 'Permissions',
          bullets: [
            {
              label: 'Camera',
              text: "used solely to scan a colleague's QR code. No photos are saved or transmitted.",
            },
            {
              label: 'Calendar',
              text: "used solely, at your request, to add shifts to your phone's local calendar.",
            },
          ],
        },
        {
          heading: 'No account',
          paragraphs: [
            'No registration, account, or login is required to use the app.',
          ],
        },
      ],
      contact: {
        heading: 'Contact',
        text: 'For any questions about this policy:',
        email: 'ammapp.help@gmail.com',
      },
    },
  },
}

export const privacyData: Record<string, AppPrivacy> = {
  airportshift,
}

const airportshiftSupport: AppPrivacy = {
  appName: 'AirportShift',
  packageId: 'com.aleblaks.TurniAeroporto',
  docs: {
    it: {
      title: 'Assistenza — AirportShift',
      lastUpdated: 'Ultimo aggiornamento: 24 giugno 2026',
      intro:
        "Hai bisogno di aiuto con AirportShift? Siamo qui per aiutarti. Scrivici e ti rispondiamo il prima possibile.",
      sections: [
        {
          heading: 'Come contattarci',
          paragraphs: [
            "Per assistenza, segnalazione di problemi o suggerimenti, scrivi all'indirizzo qui sotto. Indica il modello del telefono e una breve descrizione del problema: ci aiuta a risponderti più in fretta.",
          ],
        },
        {
          heading: 'Domande frequenti',
          bullets: [
            {
              label: 'Come importo i turni',
              text: 'Importa il PDF dei turni nell’app: viene letto ed elaborato direttamente sul tuo telefono.',
            },
            {
              label: 'Come condivido i turni con un collega',
              text: 'Genera un QR code dall’app; il collega lo inquadra e importa i turni. I dati passano direttamente da telefono a telefono.',
            },
            {
              label: 'Perché l’app chiede fotocamera e calendario',
              text: 'La fotocamera serve solo a scansionare il QR di un collega; il calendario solo, su tua richiesta, ad aggiungere i turni al calendario del telefono.',
            },
          ],
        },
      ],
      contact: {
        heading: 'Contatti',
        text: 'Scrivici a:',
        email: 'ammapp.help@gmail.com',
      },
    },
    en: {
      title: 'Support — AirportShift',
      lastUpdated: 'Last updated: 24 June 2026',
      intro:
        'Need help with AirportShift? We’re here for you. Get in touch and we’ll reply as soon as possible.',
      sections: [
        {
          heading: 'How to reach us',
          paragraphs: [
            'For support, bug reports, or suggestions, write to the address below. Please include your phone model and a short description of the issue: it helps us reply faster.',
          ],
        },
        {
          heading: 'Frequently asked questions',
          bullets: [
            {
              label: 'How do I import my shifts',
              text: 'Import the shift PDF into the app: it is read and processed directly on your phone.',
            },
            {
              label: 'How do I share shifts with a colleague',
              text: 'Generate a QR code in the app; your colleague scans it and imports the shifts. The data travels directly device-to-device.',
            },
            {
              label: 'Why does the app ask for camera and calendar',
              text: "The camera is used only to scan a colleague's QR code; the calendar only, at your request, to add shifts to your phone's calendar.",
            },
          ],
        },
      ],
      contact: {
        heading: 'Contact',
        text: 'Write to us at:',
        email: 'ammapp.help@gmail.com',
      },
    },
  },
}

export const supportData: Record<string, AppPrivacy> = {
  airportshift: airportshiftSupport,
}
