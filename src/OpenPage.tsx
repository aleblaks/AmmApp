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

// How long to wait for the app to take over before sending the user to the store.
const FALLBACK_MS = 1800

type Phase = 'opening' | 'fallback' | 'desktop' | 'unknown'

export function OpenPage() {
  const { app } = useParams()
  const [params] = useSearchParams()
  const entry = app ? apps[app] : undefined

  const os = useMemo(() => detectOS(), [])
  const deepLink = useMemo(
    () => (entry ? buildDeepLink(entry, params.get('d')) : ''),
    [entry, params],
  )
  const storeUrl = entry ? storeUrlFor(os, entry) : null

  const [phase, setPhase] = useState<Phase>('opening')
  const hiddenRef = useRef(false)

  useEffect(() => {
    if (!entry) {
      setPhase('unknown')
      return
    }
    if (os === 'other') {
      setPhase('desktop')
      return
    }

    // If the app opens, the page is backgrounded; cancel the store redirect.
    const markHidden = () => {
      if (document.hidden) hiddenRef.current = true
    }
    const markHiddenHard = () => {
      hiddenRef.current = true
    }
    document.addEventListener('visibilitychange', markHidden)
    window.addEventListener('pagehide', markHiddenHard)
    window.addEventListener('blur', markHiddenHard)

    // Try to open the app.
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
        <h1>Link non valido</h1>
        <p>Invalid link.</p>
        <p>
          <Link to="/">Home</Link>
        </p>
      </main>
    )
  }

  return (
    <main className="page open">
      <h1>{entry.appName}</h1>

      {phase !== 'desktop' ? (
        <>
          <p className="lead">
            Apertura dell'app in corso…
            <br />
            <span className="muted">Opening the app…</span>
          </p>
          <a className="btn btn-primary" href={deepLink}>
            Apri {entry.appName} · Open {entry.appName}
          </a>
          {storeUrl && (
            <p className="muted small">
              Non si apre? Scaricala qui sotto.
              <br />
              Not opening? Get it below.
            </p>
          )}
        </>
      ) : (
        <p className="lead">
          Apri questo link dal tuo telefono per importare i turni in {entry.appName}.
          <br />
          <span className="muted">
            Open this link on your phone to import the shifts into {entry.appName}.
          </span>
        </p>
      )}

      <div className="stores">
        {(os === 'ios' || os === 'other') && (
          <a className="btn" href={iosStoreUrl(entry.store.iosAppId)}>
            App Store (iPhone)
          </a>
        )}
        {(os === 'android' || os === 'other') && (
          <a className="btn" href={androidStoreUrl(entry.store.androidPackage)}>
            Google Play (Android)
          </a>
        )}
      </div>

      <footer className="footer">
        <p>
          <Link to={`/${app}/privacy`}>Privacy</Link>
        </p>
      </footer>
    </main>
  )
}
