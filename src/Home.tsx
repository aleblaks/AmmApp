import { Link } from 'react-router-dom'
import { privacyData } from './content'

export function Home() {
  return (
    <main className="page">
      <h1>AmmApp</h1>
      <p>Privacy policy / Informativa sulla privacy:</p>
      <ul>
        {Object.entries(privacyData).map(([slug, app]) => (
          <li key={slug}>
            <Link to={`/${slug}/privacy`}>{app.appName} — Privacy</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
