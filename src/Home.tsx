import { Link } from 'react-router-dom'
import { privacyData } from './content'

export function Home() {
  return (
    <main className="page">
      <h1>AmmApp</h1>
      {Object.entries(privacyData).map(([slug, app]) => (
        <section key={slug}>
          <h2>{app.appName}</h2>
          <ul>
            <li>
              <Link to={`/${slug}/privacy`}>Privacy · Informativa sulla privacy</Link>
            </li>
            <li>
              <Link to={`/${slug}/support`}>Support · Assistenza</Link>
            </li>
          </ul>
        </section>
      ))}
    </main>
  )
}
