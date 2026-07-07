# Modifica pagina "Scopri di più" di Balance Life

Istruzioni per riempire con i contenuti reali la pagina placeholder creata a
**`https://aleblaks.github.io/AmmApp/#/balancelife/features`**.

Tutti i contenuti si trovano in un unico file: **`src/site/FeaturesPage.tsx`**.

---

## 1. La tagline sotto il titolo (hero)

**File:** `src/site/FeaturesPage.tsx` — dentro `CONTENT.balancelife.tagline` (righe 138-144)

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

**File:** `src/site/FeaturesPage.tsx` — array `BALANCELIFE_FEATURES` (righe 94-122)

Ogni elemento dell'array è una sezione della pagina. Per ognuna aggiorna:

```typescript
{
  image: MockupNomeSchermata,       // 1. aggiungi questa riga (vedi punto 3)
  alt: { it: '...', en: '...' },    // testo alternativo dell'immagine (accessibilità)
  title: { it: '...', en: '...' },  // titolo della funzionalità
  desc: { it: '...', en: '...' },   // descrizione della funzionalità
  accent: '#3b82f6',                // colore del bagliore dietro lo screenshot (hex)
},
```

**Se vuoi più o meno di 3 sezioni:** copia/incolla un blocco `{...}` per aggiungerne, o cancellalo per toglierne. L'ordine nell'array è l'ordine di comparsa nella pagina (si alternano automaticamente sinistra/destra).

---

## 3. Aggiungere gli screenshot reali (al posto del placeholder tratteggiato)

Finché un elemento di `BALANCELIFE_FEATURES` non ha la proprietà `image`, al suo posto compare un box tratteggiato con scritto "Screenshot da inserire". Per sostituirlo:

1. Metti il file PNG dello screenshot in **`src/AmmAppMockups/`** (stessa cartella degli screenshot di AirportShift)
2. In cima a `src/site/FeaturesPage.tsx`, dopo le righe 18-22 (gli import `MockupCalendario`, `MockupRiepilogo`, ecc.), aggiungi un import per il tuo file:
   ```typescript
   import MockupNomeSchermata from '../AmmAppMockups/nome-file.png'
   ```
3. Nel blocco corrispondente di `BALANCELIFE_FEATURES`, aggiungi `image: MockupNomeSchermata,` come prima riga

---

## 4. Icona dell'app nell'hero

L'icona in cima alla pagina viene già da `appIcons.balancelife` (riga 26 di `FeaturesPage.tsx`), che punta a `src/AmmAppIcon/BalanceLife.png`. Se vuoi cambiarla, sostituisci quel file PNG — non serve toccare il codice.

---

## 5. Link agli store (Apple/Google) in fondo alla pagina

Questi non si toccano qui: leggono automaticamente da `src/site/apps.ts` (entry `balancelife`). Segui **`MODIFICHE_PER_LE_APP.md` → PARTE 2** per inserire i veri ID store quando li avrai.

---

## Checklist

- [ ] Tagline in `CONTENT.balancelife.tagline` sostituita
- [ ] Titolo, descrizione e colore di ogni sezione in `BALANCELIFE_FEATURES` sostituiti
- [ ] Screenshot reali importati e collegati (proprietà `image`) per ogni sezione, oppure lasciati come placeholder se non ancora pronti
- [ ] `npm run build` senza errori
- [ ] Commit e push su `main`
