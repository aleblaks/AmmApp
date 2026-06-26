import { Link, useParams } from 'react-router-dom'
import { supportData } from './content'
import { DocPage } from './DocPage'
import { useT } from './lang'

export function SupportPage() {
  const { app } = useParams()
  const entry = app ? supportData[app] : undefined
  const t = useT()

  if (!entry) {
    return (
      <main className="page">
        <h1>{t({ it: 'Assistenza', en: 'Support' })}</h1>
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
      footerLinks={[{ to: `/${app}/privacy`, label: 'Privacy' }]}
    />
  )
}
