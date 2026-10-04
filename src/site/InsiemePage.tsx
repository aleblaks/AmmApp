import type { CSSProperties } from 'react'
import { useT, type Bi } from './lang'
import { apps, iosStoreUrl } from './apps'
import { Phone } from './FeaturesPage'
import AirportShiftIcon from '../AmmAppIcon/AirportShift.png'
import BalanceLifeIcon from '../AmmAppIcon/BalanceLife.png'

// Pagina "Balance Life + AirportShift": perché conviene usarle insieme.
// Solo in questa direzione: AirportShift è per chi lavora con Aviation Service, non per tutti gli utenti di Balance Life.

const PERCHE: { icon: string; title: Bi; desc: Bi }[] = [
  {
    icon: 'event_available',
    title: { it: 'Organizzi la settimana attorno al lavoro', en: 'Plan your week around work' },
    desc: {
      it: 'I turni dei prossimi giorni compaiono nel calendario di Balance Life prima che inizino. Vedi subito quando hai la mattina libera per la palestra o la sera per leggere, senza aprire un’altra app.',
      en: 'Upcoming shifts show up in Balance Life’s calendar before they start. You can see at a glance when your morning is free for the gym or your evening for reading, without opening another app.',
    },
  },
  {
    icon: 'schedule',
    title: { it: 'Le ore lavorate si contano da sole', en: 'Hours worked count themselves' },
    desc: {
      it: 'Un turno finito diventa lavoro svolto: entra nelle ore della settimana, nei grafici e negli obiettivi. Il quadro del tuo tempo è completo, senza riscrivere niente a mano.',
      en: 'A finished shift becomes work done: it goes into the week’s hours, charts and goals. The picture of your time is complete, with nothing to type in by hand.',
    },
  },
  {
    icon: 'sync',
    title: { it: 'Se il turno cambia, lo segui', en: 'When a shift changes, so does your day' },
    desc: {
      it: 'Hai fatto un cambio o è uscito il nuovo foglio? Importi di nuovo e Balance Life aggiorna solo quello che è cambiato. Niente doppioni, niente turni fantasma.',
      en: 'Swapped a shift or got the new roster? Import again and Balance Life updates only what changed. No duplicates, no ghost shifts.',
    },
  },
  {
    icon: 'edit',
    title: { it: 'Le tue correzioni restano tue', en: 'Your edits stay yours' },
    desc: {
      it: 'Se hai sistemato a mano un orario in Balance Life, un nuovo import non lo tocca. E riposi e ferie restano tempo libero: non diventano attività.',
      en: 'If you fixed a time by hand in Balance Life, a new import leaves it alone. And rest days and holidays stay free time: they don’t turn into activities.',
    },
  },
]

const PASSI: { app: 'airportshift' | 'balancelife'; text: Bi }[] = [
  { app: 'airportshift', text: { it: 'In AirportShift apri Impostazioni › Turni e attiva Balance Life.', en: 'In AirportShift, open Settings › Shifts and turn on Balance Life.' } },
  { app: 'balancelife', text: { it: 'Quando arriva un foglio nuovo, ripeti l’import: si aggiorna solo ciò che è cambiato.', en: 'When a new roster comes out, import again: only what changed is updated.' } },
]

const ICON = { airportshift: AirportShiftIcon, balancelife: BalanceLifeIcon }

export function InsiemePage() {
  const t = useT()
  return (
    <main className="fx">
      <section className="ins-hero" style={{ '--fx-accent': '#30d158' } as CSSProperties}>
        <div className="ins-icons" aria-hidden>
          <img src={AirportShiftIcon} alt="" className="fx-icon" />
          <span className="material-symbols-outlined">add</span>
          <img src={BalanceLifeIcon} alt="" className="fx-icon" />
        </div>
        <h1 className="fx-headline">{t({ it: 'Il lavoro è parte\ndella giornata.', en: 'Work is part\nof your day.' }).split('\n').map((l, i) => <span key={i}>{l}<br /></span>)}</h1>
        <p className="fx-lead">
          {t({
            it: 'Se lavori con Aviation Service e usi AirportShift, Balance Life può ricevere i tuoi turni. Lavoro, allenamenti, letture e riposo, finalmente sulla stessa pagina.',
            en: 'If you work with Aviation Service and use AirportShift, Balance Life can receive your shifts. Work, training, reading and rest, finally on the same page.',
          })}
        </p>
      </section>

      <section className="ins-show fx-reveal">
        <div className="fx-pair">
          <Phone name="as-hero" alt="AirportShift" />
          <Phone name="bl-turni" alt="Balance Life" />
        </div>
      </section>

      <section className="ins-perche">
        {PERCHE.map((p, i) => (
          <div key={i} className="ins-card fx-reveal">
            <span className="material-symbols-outlined fx-tile-icon" aria-hidden>{p.icon}</span>
            <h3>{t(p.title)}</h3>
            <p>{t(p.desc)}</p>
          </div>
        ))}
      </section>

      <section className="fx-privacy fx-reveal">
        <span className="material-symbols-outlined fx-lock" aria-hidden>lock</span>
        <h2 className="fx-title">{t({ it: 'I tuoi turni\nnon escono dal telefono.', en: 'Your shifts\nnever leave your phone.' }).split('\n').map((l, i) => <span key={i}>{l}<br /></span>)}</h2>
        <p className="fx-desc">
          {t({
            it: 'Le due app se li passano dentro il tuo iPhone. Niente account, niente cloud, niente internet: nessuno, nemmeno noi, sa dove e quando lavori.',
            en: 'The two apps pass them to each other inside your iPhone. No account, no cloud, no internet: nobody, not even us, knows where and when you work.',
          })}
        </p>
        <p className="fx-desc">
          {t({
            it: 'E succede solo quando lo decidi tu. Se cambi idea, spegni la condivisione in AirportShift e puoi togliere i turni da Balance Life.',
            en: 'And it only happens when you decide. If you change your mind, turn sharing off in AirportShift and you can remove the shifts from Balance Life.',
          })}
        </p>
      </section>

      <section className="ins-passi">
        <h2 className="fx-title fx-center fx-reveal">{t({ it: 'Si attiva in un minuto.', en: 'Set up in a minute.' })}</h2>
        <ol>
          {PASSI.map((s, i) => (
            <li key={i} className="fx-reveal">
              <img src={ICON[s.app]} alt="" />
              <p>{t(s.text)}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="fx-end">
        <h2 className="fx-title">{t({ it: 'Ti servono tutte e due.', en: 'You need both.' })}</h2>
        <div className="fx-cta">
          {(['airportshift', 'balancelife'] as const).map(k => (
            <a key={k} href={iosStoreUrl(apps[k].store.iosAppId)} target="_blank" rel="noopener noreferrer" className="btn btn-lg ins-get">
              <img src={ICON[k]} alt="" />
              {apps[k].appName}
            </a>
          ))}
        </div>
        <p className="muted small" style={{ maxWidth: '46ch' }}>{t({ it: 'AirportShift è un’app indipendente: non è affiliata ad Aviation Service né approvata dall’agenzia.', en: 'AirportShift is an independent app: it is not affiliated with or endorsed by Aviation Service.' })}</p>
      </section>
    </main>
  )
}
