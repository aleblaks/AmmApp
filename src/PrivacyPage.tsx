import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { langLabels, privacyData, type LangCode } from './content'

const LANGS: LangCode[] = ['it', 'en']

export function PrivacyPage() {
  const { app } = useParams()
  const entry = app ? privacyData[app] : undefined
  const [lang, setLang] = useState<LangCode>('it')

  if (!entry) {
    return (
      <main className="page">
        <h1>Privacy</h1>
        <p>Pagina non trovata. / Page not found.</p>
        <p>
          <Link to="/">Home</Link>
        </p>
      </main>
    )
  }

  const doc = entry.docs[lang]

  return (
    <main className="page" lang={lang}>
      <nav className="lang-switch" aria-label="Language">
        {LANGS.map((code) => (
          <button
            key={code}
            type="button"
            className={code === lang ? 'lang active' : 'lang'}
            aria-pressed={code === lang}
            onClick={() => setLang(code)}
          >
            {langLabels[code]}
          </button>
        ))}
      </nav>

      <h1>{doc.title}</h1>
      <p className="updated">{doc.lastUpdated}</p>
      <p className="intro">{doc.intro}</p>

      {doc.sections.map((section, i) => (
        <section key={i}>
          {section.heading && <h2>{section.heading}</h2>}
          {section.paragraphs?.map((p, j) => (
            <p key={j}>{p}</p>
          ))}
          {section.bullets && (
            <ul>
              {section.bullets.map((b, k) => (
                <li key={k}>
                  <strong>{b.label}:</strong> {b.text}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <section>
        <h2>{doc.contact.heading}</h2>
        <p>
          {doc.contact.text}{' '}
          <a href={`mailto:${doc.contact.email}`}>{doc.contact.email}</a>
        </p>
      </section>

      <footer className="footer">
        <p>
          {entry.appName} · {entry.packageId}
        </p>
      </footer>
    </main>
  )
}
