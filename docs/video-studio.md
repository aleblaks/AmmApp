# Studio dei video promo (Balance Life e AirportShift)

Rilevamento del 2026-10-23, in sola lettura. Nessun file di `balance-life/` o `AirportShift/` è stato
modificato; qui non sono stati copiati né `node_modules`, né musica, né render.

## 1. `balance-life/video/`: cosa c'è davvero oggi

**I sorgenti non ci sono più.** La cartella è in `.gitignore` (riga `video/`), quindi non ha storia
git, e dal 14 ottobre contiene solo:

| Percorso | Contenuto |
|---|---|
| `renders/calma-render.mp4` | Versione A «calma», scorrimento: 1080×1920, 21,5 s, h264, **senza audio** |
| `renders/calma-dissolvenza-render.mp4` | Versione A «calma», dissolvenza: 1080×1920, 21,5 s, senza audio |
| `renders/bozza-calma.mp4`, `bozza-dinamica-a.mp4`, `bozza-dinamica-b.mp4` | Bozze da 5 s, 1080×1920 |
| `registrazioni/grezze/*.mp4` | 7 riprese del simulatore a 1206×2622: `home-giorno` (2,4 s), `aggiungi-palestra` (4,9 s), `palestra-avvio` (10,1 s), `palestra-serie` (6,3 s), `lettura-apertura` (5,5 s), `trends` (5,2 s), `stile` (6,6 s) |
| `assets/cornice-iphone.png` | Cornice iPhone, foro 1206×2622 |
| `node_modules/@fontsource/` | Font Inter e Newsreader |
| `remotion/node_modules/` | Solo le dipendenze (Remotion **4.0.529**, 152 pacchetti), nessun `src/` |

Mancano, rispetto a quanto annotato il 10–11 ottobre: `README.md`, l'`index.html` HyperFrames della
calma, `dinamica/`, `remotion/src/` (composizioni `Calma`, `DinamicaB`, `Pop`, `Narrata`),
`audio/sintetizza.mjs` e `audio/voce.mjs`, e i render con audio (`Pop`, `Narrata`, `DinamicaB`).
Se servono vanno ritrovati altrove (backup, Time Machine, un'altra copia del repo): da qui non si
possono ricostruire.

### Cosa si vede nei render rimasti

- **Calma (21,5 s):** fondo crema, titolo «Balance Life» in serif (Newsreader) con sottolineatura a
  mano; iPhone in cornice che scorre tra Home → Aggiungi → dettaglio lettura → Trends → Home in
  scuro, con scarabocchi a linea sottile attorno al telefono e una parola chiave («Capisci») per
  scena; chiusura sul titolo. Ritmo lento, nessuna musica.
- **Dinamica B (bozza 5 s):** riprese vere a tutto schermo, tagli sulle azioni (Aggiungi → Palestra
  → «Ripeti l'ultimo» → serie → recupero 1:30), zoom sul dettaglio, parola grande («Registra»).

### Come si lanciava il render (dalla memoria di progetto, da verificare quando i sorgenti tornano)

- HyperFrames 0.8.145: `npx hyperframes render` nella cartella della composizione.
- Remotion: `npx remotion render <Composizione> --image-format png` (senza PNG esce yuvj420p).
- Riprese: simulatore iPhone 17 a 1206×2622, `xcrun simctl io booted recordVideo --codec=h264`,
  fermata con SIGINT, poi `ffmpeg -vf fps=30,format=yuv420p`. I tempi dei tocchi si misurano dai
  fotogrammi, non dall'orologio.

## 2. AirportShift: progetti video esistenti (questi ci sono)

### 2a. `AirportShift/video/remotion/` — «Pop», app finta in React (Remotion 4.0.529)

Il progetto più utile per un promo di AS, perché l'app è **ricostruita in React** e ogni parte si
può animare.

- Formato previsto: 1080×1920, 30 fps, 44 s (dal README). **La composizione «Pop» però non esiste
  ancora:** `src/Root.tsx` registra solo le prove 1:1 (`Ref-*`, un fotogramma a 1206×2622 con lo
  screenshot vero sovrapponibile per confronto).
- Schermate già ricostruite (`src/app/screens/`): `Home` (con la pila di card: oggi, prossimi,
  settimana; varianti di colore viola e verde), `Riepilogo`, `Fasce`, `Import` (scelta del nome dal
  PDF), `DayEdit` (codice, orario libero, altro). In più `Mosaico.tsx`, `ui.tsx` (schermo in punti
  iOS 402×874 ingrandito ×3), `icons.tsx` (MaterialCommunityIcons).
- La logica è **importata** dall'app (`src/theme.ts`, `src/lib/monthStats.ts`,
  `src/lib/shiftCodes.ts`, `src/i18n`); `react-native` è risolto su `react-native-web`, AsyncStorage
  su uno stub (`remotion.config.ts`).
- Interfaccia nativa ritagliata dagli screenshot in `public/chrome/` (barra di stato, toolbar e tab
  bar in vetro). Cornice `public/iphone.webp`, foro 1206×2622 a +72+69.
- Dati demo in `capture/demoShifts.mjs` + `capture/cap.sh` (seed dell'AsyncStorage del simulatore,
  scatto dei riferimenti). Attenzione: il README avverte che `Math.floor` + ora legale fa slittare
  i giorni da fine marzo e chiede di non correggerlo.
- Comandi: `npm i`, `npx remotion studio`, `scripts/compare.sh <Ref>` / `scripts/all.sh` (RMSE
  contro gli screenshot). Render solo su richiesta: `npx remotion render`.
- Testo: richiede SF Pro Text/Display installati sul Mac del render.

### 2b. `AirportShift/videos/airportshift-promo/` — HyperFrames 0.8.140

- `BRIEF.md` + `STORYBOARD.md`: 27,5 s, 1080×1920, nessuna musica né voce, testi in italiano.
  Cinque scene: Hook tipografico («Turni in PDF?» → «Codici da decifrare?» → «Fai ordine.»),
  logo + «Importa il PDF. Vedi i tuoi orari.», l'app in cornice (calendario → Riepilogo → fasce),
  Colori turni che ricolorano l'app, chiusura «I tuoi turni, in ordine.».
- Render: `renders/video.mp4` e `video-v1.mp4` (20 s), `video-v2.mp4` (28 s), tutti 1080×1920.
- Comandi in `package.json`: `npx --yes hyperframes@0.8.140 preview | check | render`.

### 2c. `AirportShift/videos/airportshift-promo-60s/`

HyperFrames, **orizzontale** 1920×1080, 60 s (`renders/airportshift-promo-60s.mp4`), costruito da
tre screenshot (`cal.png`, `riep.png`, `stile.png`).

## 3. Cosa servirebbe per un promo di AmmApp / AirportShift

Ripartire da `AirportShift/video/remotion/` (non da HyperFrames): ha già metà dell'app finta e la
pipeline di verifica 1:1.

Componenti da aggiungere o completare:

1. **La composizione `Pop`** in `Root.tsx`: oggi c'è solo l'infrastruttura di prova.
2. **Schermate mancanti** dell'app finta: Riepilogo a mosaico aggiornato (card «Ore lavorate» con
   skyline, tessere Ferie/FNL/Addestramento, card dell'anno apribile — vedi `as-riepilogo.png` e
   `as-anno.png`), confronto con un collega (selettore Io/collega, card viola «sola lettura» —
   `as-collega.png`), condivisione QR (`as-qr.png`), giorni «impegnato» (`as-impegnato.png`),
   sfondo a sfumatura «Colori» (`as-sfondo.png`), Tutti i mesi (`as-mesi.png`).
3. **Telefono in cornice** riutilizzabile (cornice + maschera del foro + ombra opzionale; per
   l'App Store solo dissolvenze e niente ombre sulla cornice, come annotato per la calma di BL).
4. **Tipografia cinetica** per gli hook (parole che si sostituiscono a taglio, come la scena 1 di
   `airportshift-promo`) e un **lockup finale** icona + nome + frase.
5. **Contatore** per i numeri (85 h, 237 h) e **riempimento barre** — c'è già la logica nelle props
   di avanzamento 0→1 descritte nel README.
6. **Tocco visibile** (cerchio che si allarga) per mostrare le interazioni; nella B(b) di BL è
   risultato decisivo che fosse grande e sincronizzato col taglio.
7. **Audio**: per AS i progetti attuali sono muti. Per una versione con musica riprendere
   l'approccio di BL (musica sintetizzata da script, battiti a 120 BPM), che però va ritrovato
   (vedi §1).
8. Per un video **AmmApp** (le due app insieme): una scena di apertura col marchio AmmApp, poi
   blocchi BL e AS con la stessa cornice, e chiusura comune. Gli screenshot nuovi di
   `src/AmmAppMockups/shots/` (chiaro e scuro, 1206×2622) possono fare da riferimento per le
   ricostruzioni o, nella versione più semplice, da immagini dentro la cornice.
