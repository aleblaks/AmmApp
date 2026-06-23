import { Link, useParams } from 'react-router-dom'
import { supportData } from './content'
import { DocPage } from './DocPage'

export function SupportPage() {
  const { app } = useParams()
  const entry = app ? supportData[app] : undefined

  if (!entry) {
    return (
      <main className="page">
        <h1>Assistenza / Support</h1>
        <p>Pagina non trovata. / Page not found.</p>
        <p>
          <Link to="/">Home</Link>
        </p>
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
