import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import {
  apps,
  buildDeepLink,
  detectOS,
  androidStoreUrl,
  iosStoreUrl,
  storeUrlFor,
} from './apps'
import { useT } from './lang'

const FALLBACK_MS = 1800

type Phase = 'opening' | 'fallback' | 'desktop' | 'unknown'

export function OpenPage() {
  const { app } = useParams()
  const [params] = useSearchParams()
  const entry = app ? apps[app] : undefined
  const t = useT()

  const os = useMemo(() => detectOS(), [])
  const deepLink = useMemo(
    () => (entry ? buildDeepLink(entry, params.get('d')) : ''),
    [entry, params],
  )
  const storeUrl = entry ? storeUrlFor(os, entry) : null

  const [phase, setPhase] = useState<Phase>('opening')
  const hiddenRef = useRef(false)

  useEffect(() => {
    if (!entry) { setPhase('unknown'); return }
    if (os === 'other') { setPhase('desktop'); return }

    const markHidden = () => { if (document.hidden) hiddenRef.current = true }
    const markHiddenHard = () => { hiddenRef.current = true }
    document.addEventListener('visibilitychange', markHidden)
    window.addEventListener('pagehide', markHiddenHard)
    window.addEventListener('blur', markHiddenHard)

    window.location.href = deepLink

    const timer = window.setTimeout(() => {
      if (!hiddenRef.current && !document.hidden && storeUrl) {
        setPhase('fallback')
        window.location.href = storeUrl
      } else {
        setPhase('fallback')
      }
    }, FALLBACK_MS)

    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('visibilitychange', markHidden)
      window.removeEventListener('pagehide', markHiddenHard)
      window.removeEventListener('blur', markHiddenHard)
    }
  }, [entry, os, deepLink, storeUrl])

  if (!entry) {
    return (
      <main className="page open">
        <h1>{t({ it: 'Link non valido', en: 'Invalid link' })}</h1>
        <div className="notice">
          <p><Link to="/">{t({ it: 'Torna alla home', en: 'Back to home' })}</Link></p>
        </div>
      </main>
    )
  }

  return (
    <main className="open">
      <img src={`./icon-${app}.png`} alt={entry.appName} className="app-icon" />
      <h1>{entry.appName}</h1>

      {phase !== 'desktop' ? (
        <>
          {phase === 'opening' && <div className="spinner" aria-hidden />}
          <p className="lead">
            {t({ it: "Apertura dell'app in corso…", en: 'Opening the app…' })}
          </p>
          <a className="btn btn-primary btn-lg" href={deepLink}>
            {t({ it: `Apri ${entry.appName}`, en: `Open ${entry.appName}` })}
          </a>
          {storeUrl && (
            <p className="muted small" style={{ marginTop: 18 }}>
              {t({ it: 'Non si apre? Scaricala qui sotto.', en: "Not opening? Get it below." })}
            </p>
          )}
        </>
      ) : (
        <p className="lead">
          {t({
            it: `Apri questo link dal tuo telefono per importare i turni in ${entry.appName}.`,
            en: `Open this link on your phone to import the shifts into ${entry.appName}.`,
          })}
        </p>
      )}

      <div className="stores">
        {(os === 'ios' || os === 'other') && (
          <a className="btn" href={iosStoreUrl(entry.store.iosAppId)}>App Store · iPhone</a>
        )}
        {(os === 'android' || os === 'other') && (
          <a className="btn" href={androidStoreUrl(entry.store.androidPackage)}>Google Play · Android</a>
        )}
      </div>

      <p className="muted small" style={{ marginTop: 28 }}>
        <Link to={`/${app}/privacy`}>Privacy</Link> · <Link to={`/${app}/support`}>{t({ it: 'Assistenza', en: 'Support' })}</Link>
      </p>
    </main>
  )
}
