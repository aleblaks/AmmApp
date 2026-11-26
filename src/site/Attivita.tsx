import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { lines, useT, type Bi } from './lang'

// Ritagli dei componenti dello Step 2 (PNG con lo sfondo trasparente) in AmmAppMockups/step2/,
// chiamati <prefisso>-<attività>-<n>.png: bl-reading-1.png, bl-reading-2.png…
// Nascono dalle pagine HTML dei post social di Balance Life (marketing/social/sorgenti/post),
// che riproducono i componenti dell'app dal suo codice.
const PEZZI = import.meta.glob('../AmmAppMockups/step2/*.png', { eager: true, import: 'default' }) as Record<string, string>
const pezzi = (prefix: string) =>
  Object.keys(PEZZI).filter(k => k.includes(`/${prefix}-`)).sort().map(k => PEZZI[k])

export interface Activity {
  key: string // nome dei ritagli: <prefix>-<key>-1.png…
  icon: string // Material Symbols (va aggiunto a icon_names in index.html)
  color: string // il colore dell'attività nell'app
  name: Bi
  title: Bi
  desc: Bi
  points: Bi[]
}

export interface Activities {
  after: number // dopo quale capitolo compare (indice in chapters)
  label: Bi // voce nella barra dell'app
  prefix: string
  title: Bi
  intro: Bi
  items: Activity[]
}

// Selettore delle attività: una chip per attività e, sotto, cosa sa fare il suo Step 2,
// con i componenti veri dell'app. Frecce sinistra/destra per passare da una chip all'altra.
export function ActivitiesSection({ data, id }: { data: Activities; id: string }) {
  const t = useT()
  const [on, setOn] = useState(0)
  const row = useRef<HTMLDivElement>(null)
  const sezione = useRef<HTMLElement>(null)

  // Le immagini di tutte le attività si scaricano (e si decodificano) quando la sezione si avvicina allo
  // schermo, non al tocco della chip: così cambiando attività compaiono subito, senza un vuoto.
  useEffect(() => {
    const el = sezione.current
    if (!el) return
    const tutte = data.items.flatMap(it => pezzi(`${data.prefix}-${it.key}`))
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      for (const src of tutte) { const img = new Image(); img.src = src; img.decode().catch(() => {}) }
    }, { rootMargin: '800px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [data])
  const a = data.items[on]
  const imgs = pezzi(`${data.prefix}-${a.key}`)

  const keys = (e: KeyboardEvent) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!d) return
    e.preventDefault()
    const n = (on + d + data.items.length) % data.items.length
    setOn(n)
    ;(row.current?.children[n] as HTMLElement | undefined)?.focus()
  }

  return (
    <section ref={sezione} id={id} className="act" style={{ '--act': a.color, '--fx-accent': a.color } as CSSProperties}>
      <div className="act-head fx-reveal">
        <h2 className="fx-title">{lines(t(data.title))}</h2>
        <p className="fx-desc">{t(data.intro)}</p>
      </div>
      <div className="act-chips" role="tablist" aria-label={t(data.label)} ref={row} onKeyDown={keys}>
        {data.items.map((it, i) => (
          <button key={it.key} type="button" role="tab" id={`act-tab-${it.key}`} aria-selected={i === on} aria-controls="act-panel"
            tabIndex={i === on ? 0 : -1} className={i === on ? 'on' : undefined} style={{ '--c': it.color } as CSSProperties}
            onClick={() => setOn(i)}>
            <span className="material-symbols-outlined" aria-hidden>{it.icon}</span>
            {t(it.name)}
          </button>
        ))}
      </div>
      <div className="act-panel" id="act-panel" role="tabpanel" aria-labelledby={`act-tab-${a.key}`} key={a.key}>
        <div className="act-copy">
          <p className="act-name"><span className="material-symbols-outlined" aria-hidden>{a.icon}</span>{t(a.name)}</p>
          <h3>{t(a.title)}</h3>
          <p className="fx-desc">{t(a.desc)}</p>
          <ul className="fx-points">{a.points.map((p, j) => <li key={j}>{t(p)}</li>)}</ul>
        </div>
        <div className={`act-shots act-n${imgs.length}`}>
          {imgs.map((src, j) => <img key={src} src={src} alt="" decoding="sync" style={{ '--i': j } as CSSProperties} />)}
        </div>
      </div>
    </section>
  )
}
