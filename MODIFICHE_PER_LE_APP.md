# MODIFICHE PER LE APP

Guida passo-passo per aggiungere il Play Store ad AirportShift e attivare Balance Life.

> Per riempire con i contenuti reali la pagina "Scopri di più" di Balance Life
> (`/balancelife/features`, attualmente con placeholder), vedi
> **[MODIFICA_PAGINA_BALANCE_LIFE.md](./MODIFICA_PAGINA_BALANCE_LIFE.md)**.

---

## PARTE 1: Aggiungere il Play Store ad AirportShift

Quando l'app AirportShift sarà disponibile su Google Play, segui questi step:

### Step 1: Modifica `src/site/apps.ts` (linee 22)

**File:** `src/site/apps.ts`

Cambia il flag `androidComingSoon`:

```typescript
// PRIMA (attuale)
androidComingSoon: true,

// DOPO (quando disponibile)
androidComingSoon: false,
```

**Cosa succede:** Questo enable automaticamente il link Google Play su:
- Card nella home (`/apps`)
- Icona Android nella pagina "Scopri di più"
- Fallback dopo scan QR
- Route `/:app/store`

Non serve modificare nessun altro file — tutto legge da questo flag centrale.

### Verificare il package name

Assicurati che sia corretto (riga 20 di `apps.ts`):
```typescript
androidPackage: 'com.aleblaks.TurniAeroporto',
```

Se cambia, aggiorna qui. Il link Play Store sarà generato automaticamente come:
`https://play.google.com/store/apps/details?id=com.aleblaks.TurniAeroporto`

---

## PARTE 2: Attivare Balance Life come card attiva

Per rendere Balance Life una card funzionante come AirportShift:

### Step 1: Modifica `src/site/apps.ts` (linee 14-25)

**File:** `src/site/apps.ts`

Aggiungi una nuova entry per Balance Life nel dizionario `apps`:

```typescript
export const apps: Record<string, AppEntry> = {
  airportshift: {
    appName: 'AirportShift',
    store: {
      scheme: 'airportshift',
      importPath: 'c',
      androidPackage: 'com.aleblaks.TurniAeroporto',
      iosAppId: '6783308412',
      androidComingSoon: false,  // Cambiare qui quando disponibile
    },
  },
  balancelife: {
    appName: 'Balance Life',
    store: {
      scheme: 'balancelife',
      importPath: 'b',  // Adatta in base al deep link dell'app
      androidPackage: 'com.aleblaks.BalanceLife',  // Sostituisci con il vero package name
      iosAppId: 'XXXXXXXXXX',  // Sostituisci con il vero App Store ID
      androidComingSoon: false,  // Cambia a true se non ancora disponibile
    },
  },
}
```

**Cosa inserire:**
- `scheme`: custom URL scheme dell'app Balance Life (es. `balancelife://`)
- `importPath`: percorso deep link per l'import (chiedi al team mobile)
- `androidPackage`: package name su Google Play
- `iosAppId`: ID numerico su App Store
- `androidComingSoon`: `true` se non ancora disponibile, `false` se live

### Step 2: Modifica `src/site/AppsPage.tsx` (riga 87)

**File:** `src/site/AppsPage.tsx`

Aggiungi l'icona di Balance Life all'array `SHOWCASE`:

Copia la riga di AirportShift (righe 31-46) e adatta:

```typescript
const SHOWCASE: AppShowcase[] = [
  {
    slug: 'airportshift',
    name: 'AirportShift',
    icon: AirportShiftIcon,
    status: 'live',
    tagline: { ... },
    features: [ ... ],
  },
  {
    slug: 'balancelife',
    name: 'Balance Life',
    icon: BalanceLifeIcon,
    status: 'live',  // Cambia da 'soon' a 'live'
    tagline: {
      it: 'Traccia, pianifica, raggiungi — una attività alla volta. Privato, locale.',
      en: 'Track, plan, reach your goals — one activity at a time. Private, local.',
    },
    features: [
      { it: 'Traccia le tue attività', en: 'Track your activities' },
      { it: 'Pianifica i tuoi obiettivi', en: 'Plan your goals' },
      { it: 'Sincronizza con il calendario', en: 'Sync with your calendar' },
      { it: 'Nessun account, nessun tracciamento', en: 'No account, no tracking' },
    ],
  },
]
```

**Note:**
- `slug` deve corrispondere alla key in `apps.ts` (balancelife)
- `status: 'live'` abilita i bottoni (se 'soon' rimane disabilitato)
- Adatta `tagline` e `features` alle specifiche di Balance Life

### Step 3: Aggiungi l'icona di Balance Life

**File:** `src/site/AppsPage.tsx` (top delle imports)

L'icona è già importata (riga 5):
```typescript
import BalanceLifeIcon from '../AmmAppIcon/BalanceLife.png'
```

Assicurati che il file PNG esista:
- Percorso: `src/AmmAppIcon/BalanceLife.png`
- Se non c'è, aggiungi il file PNG lì

### Step 4: Aggiungi Privacy e Support

**File:** `src/site/content.ts`

Aggiungi voci per Balance Life (segui lo stesso pattern di AirportShift):

```typescript
privacyData: Record<string, string> = {
  airportshift: '...',
  balancelife: 'Testo privacy di Balance Life...',  // Aggiungi qui
}

supportData: Record<string, string> = {
  airportshift: '...',
  balancelife: 'Testo supporto di Balance Life...',  // Aggiungi qui
}
```

### Step 5: Aggiungi icone ai router

**File:** `src/site/OpenPage.tsx` (riga 6-9)

```typescript
const appIcons: Record<string, string> = {
  airportshift: AirportShiftIcon,
  balancelife: BalanceLifeIcon,  // Aggiungi questa linea
}
```

**File:** `src/site/FeaturesPage.tsx` (riga 4)

Aggiungi l'import:
```typescript
import BalanceLifeIcon from '../AmmAppIcon/BalanceLife.png'
```

E aggiungi all'oggetto `appIcons`:
```typescript
const appIcons: Record<string, string> = {
  airportshift: AirportShiftIcon,
  balancelife: BalanceLifeIcon,  // Aggiungi questa linea
}
```

---

## Checklist finale

- [ ] Parte 1: Flag `androidComingSoon` in `apps.ts` cambiato a `false` quando Play Store è live
- [ ] Parte 2: Entry `balancelife` aggiunta in `apps.ts` con i veri ID store
- [ ] Parte 2: Card Balance Life aggiunta in `SHOWCASE` di `AppsPage.tsx`
- [ ] Parte 2: Privacy e support text aggiunti in `content.ts`
- [ ] Parte 2: Icone aggiunte in `OpenPage.tsx` e `FeaturesPage.tsx`
- [ ] Parte 2: Contenuti della pagina "Scopri di più" compilati — vedi [MODIFICA_PAGINA_BALANCE_LIFE.md](./MODIFICA_PAGINA_BALANCE_LIFE.md)
- [ ] File PNG `BalanceLife.png` in `src/AmmAppIcon/`
- [ ] Build e test: `npm run build` non ha errori
- [ ] Commit e push su `main`

