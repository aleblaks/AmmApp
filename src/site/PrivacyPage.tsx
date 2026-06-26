import { Link, useParams } from 'react-router-dom'
import { privacyData } from './content'
import { DocPage } from './DocPage'
import { useT } from './lang'

export function PrivacyPage() {
  const { app } = useParams()
  const entry = app ? privacyData[app] : undefined
  const t = useT()

  if (!entry) {
    return (
      <main className="page">
        <h1>Privacy</h1>
        <div className="notice">
          <p>{t({ it: 'Pagina non trovata.', en: 'Page not found.' })}</p>
          <p><Link to="/">{t({ it: 'Torna alla home', en: 'Back to home' })}</Link></p>
        </div>
      </main>
    )
  }

  return (
    <DocPage
      entry={entry}
      footerLinks={[{ to: `/${app}/support`, label: t({ it: 'Assistenza', en: 'Support' }) }]}
    />
  )
}
