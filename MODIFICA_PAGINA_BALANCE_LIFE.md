# Modifica pagina "Scopri di più" di Balance Life

> ⚠️ Dal 2026-09-27 la pagina è stata rifatta in stile Apple: i testi stanno nella mappa `PAGES` di `FeaturesPage.tsx` (voce `balancelife`), e gli screenshot si aggiungono copiandoli in `src/AmmAppMockups/shots/` con i nomi di `BalanceLife-screenshot.md` sul Desktop — nessuna modifica al codice. Le istruzioni sotto sono della versione precedente.

> Contenuti reali e 10 screenshot inseriti il 2026-09-26 (in `src/AmmAppMockups/balancelife/`). Questa guida resta valida per modificarli.

Istruzioni per modificare i contenuti della pagina
**`https://aleblaks.github.io/AmmApp/#/balancelife/features`**.

Tutti i contenuti si trovano in un unico file: **`src/site/FeaturesPage.tsx`**.

---

## 1. La tagline sotto il titolo (hero)

**File:** `src/site/FeaturesPage.tsx` — dentro `CONTENT.balancelife.tagline`

```typescript
balancelife: {
  tagline: {
    it: '[Da compilare] Breve descrizione di Balance Life.',
    en: '[TODO] Short description of Balance Life.',
  },
  features: BALANCELIFE_FEATURES,
},
```

Sostituisci le due stringhe `it`/`en` con la vera descrizione breve dell'app (quella che compare sotto il titolo, in alto nella pagina).

---

## 2. Le sezioni funzionalità (le 3 righe con screenshot + testo)

**File:** `src/site/FeaturesPage.tsx` — array `BALANCELIFE_FEATURES`

Ogni elemento dell'array è una sezione della pagina. Per ognuna aggiorna:

```typescript
{
  image: MockupNomeSchermata,       // 1. aggiungi questa riga (vedi punto 3)
  alt: { it: '...', en: '...' },    // testo alternativo dell'immagine (accessibilità)
  title: { it: '...', en: '...' },  // titolo della funzionalità
  desc: { it: '...', en: '...' },   // descrizione della funzionalità
  accent: '#3b82f6',                // colore dell'ombra sotto lo screenshot (hex)
},
```

**Se vuoi più o meno di 3 sezioni:** copia/incolla un blocco `{...}` per aggiungerne, o cancellalo per toglierne. L'ordine nell'array è l'ordine di comparsa nella pagina (si alternano automaticamente sinistra/destra).

---

## 3. Aggiungere gli screenshot reali (al posto del placeholder tratteggiato)

Finché un elemento di `BALANCELIFE_FEATURES` non ha la proprietà `image`, al suo posto compare un box tratteggiato con scritto "Screenshot da inserire". Per sostituirlo:

1. Metti il file PNG dello screenshot in **`src/AmmAppMockups/`** (stessa cartella degli screenshot di AirportShift)
2. In cima a `src/site/FeaturesPage.tsx`, dopo gli import `BlHome`, `BlTrends`, ecc., aggiungi un import per il tuo file:
   ```typescript
   import MockupNomeSchermata from '../AmmAppMockups/nome-file.png'
   ```
3. Nel blocco corrispondente di `BALANCELIFE_FEATURES`, aggiungi `image: MockupNomeSchermata,` come prima riga

---

## 4. Icona dell'app nell'hero

L'icona in cima alla pagina viene da `ICONS.balancelife` (in `AppIcon.tsx`): `src/AmmAppIcon/BalanceLife.png` col tema scuro del sito, `BalanceLife-light.png` col tema chiaro. Se vuoi cambiarla, sostituisci quei file PNG: non serve toccare il codice.

---

## 5. Link agli store (Apple/Google) in fondo alla pagina

Questi non si toccano qui: leggono automaticamente da `src/site/apps.ts` (entry `balancelife`). Segui **`MODIFICHE_PER_LE_APP.md` → PARTE 2** per inserire i veri ID store quando li avrai.

---

## 6. La sezione «Nove attività» (lo Step 2 di ogni attività)

Dal 2026-11-25, subito dopo il capitolo «Oggi», c'è una sezione con una chip per ogni attività: toccandola compaiono titolo, descrizione, punti e i componenti veri dello Step 2 di quell'attività.

- **Testi:** in `FeaturesPage.tsx`, voce `balancelife`, campo `activities`. Ogni attività (`items`) ha `key`, `icon` (nome Material Symbols), `color` (il colore dell'attività nell'app), `name`, `title`, `desc` e `points`, tutti in italiano e inglese. Con `after` scegli dopo quale capitolo compare (0 = dopo il primo). La voce nella barra dell'app è `label`.
- **Icone:** se usi un'icona nuova, aggiungi il suo nome a `icon_names` in `index.html` (in ordine alfabetico), altrimenti non si vede.
- **Immagini:** stanno in `src/AmmAppMockups/step2/` e si chiamano `bl-<key>-1.png`, `bl-<key>-2.png`… (compaiono in quell'ordine; con 3 immagini la prima è la più grande). Sono ritagli, con lo sfondo trasparente, delle slide dei post social di Balance Life (`marketing/social/` nel repository dell'app). Se cambi i post, rigenerale con:

  ```bash
  node risorse/step2/ritagli.cjs ../balance-life/marketing/social/sorgenti/post src/AmmAppMockups/step2
  ```

  Quali slide usare per ogni attività si sceglie in cima a `risorse/step2/ritagli.cjs` (`JOBS`). Puoi anche mettere a mano un PNG qualsiasi con quel nome: la pagina lo prende da sola.

---

## 7. Le card «Piccole cose. Fatte bene.»

Ogni card ha una grafica: uno screenshot (`shot`, card grande col telefono) oppure un'illustrazione (`art`, card larga con l'immagine a destra). Le illustrazioni stanno in `src/AmmAppMockups/tessere/` (`<nome>.png` e, se serve, `<nome>-dark.png` per il tema scuro): widget «La tua giornata», settimana dei dati d'esempio, guida «Come si usa», iPhone Duo (anche quello di AirportShift). Il Duo mostra una sola schermata larga, con una barra di stato, un'intestazione e una barra delle tab, e il contenuto su due colonne: mai due telefoni affiancati. La cornice è quella ufficiale di Apple (Apple Design Resources › Product Bezels › iPhone Duo, «Inner Open Landscape»), già copiata in `risorse/cornici/`: Night Sky col tema scuro, Star White col chiaro. Se Apple la aggiorna, sostituisci quei due PNG (dal DMG si estraggono con 7-Zip o, sul Mac, aprendolo) e rilancia lo script. La schermata dei Calendari è invece `shots/bl-calendari.png`. Si rigenerano tutte con:

```bash
node risorse/tessere/tessere.cjs ../balance-life src/AmmAppMockups/tessere
```

Una card nuova non va lasciata senza grafica: dalle uno `shot` o un `art`.

---

## Checklist

- [ ] Tagline in `CONTENT.balancelife.tagline` sostituita
- [ ] Titolo, descrizione e colore di ogni sezione in `BALANCELIFE_FEATURES` sostituiti
- [ ] Screenshot reali importati e collegati (proprietà `image`) per ogni sezione, oppure lasciati come placeholder se non ancora pronti
- [ ] Sezione «Nove attività»: testi in `activities` e immagini in `src/AmmAppMockups/step2/`
- [ ] `npm run build` senza errori
- [ ] Commit e push su `main`
