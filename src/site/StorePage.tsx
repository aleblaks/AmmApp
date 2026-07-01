import { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apps, detectOS, androidStoreUrl, iosStoreUrl } from './apps'
import { useT } from './lang'

export function StorePage() {
  const { app } = useParams()
  const entry = app ? apps[app.toLowerCase()] : undefined
  const t = useT()
  const os = useMemo(() => detectOS(), [])

  const iosUrl = entry ? iosStoreUrl(entry.store.iosAppId) : null
  const androidUrl = entry ? androidStoreUrl(entry.store.androidPackage) : null

  useEffect(() => {
    if (!entry) return
    if (os === 'ios' && iosUrl) window.location.replace(iosUrl)
    else if (os === 'android' && androidUrl) window.location.replace(androidUrl)
  }, [entry, os, iosUrl, androidUrl])

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
      <h1>{entry.appName}</h1>

      {os === 'other' ? (
        <p className="lead">
          {t({ it: 'Scegli la tua piattaforma:', en: 'Choose your platform:' })}
        </p>
      ) : (
        <>
          <div className="spinner" aria-hidden />
          <p className="lead">
            {t({ it: 'Apertura dello store in corso…', en: 'Opening the store…' })}
          </p>
        </>
      )}

      <div className="stores">
        {iosUrl && <a className="btn" href={iosUrl}>App Store · iPhone</a>}
        {androidUrl && <a className="btn" href={androidUrl}>Google Play · Android</a>}
      </div>
    </main>
  )
}
