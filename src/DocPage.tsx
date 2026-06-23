import { useState } from 'react'
import { Link } from 'react-router-dom'
import { langLabels, type AppPrivacy, type LangCode } from './content'

const LANGS: LangCode[] = ['it', 'en']

export interface FooterLink {
  to: string
  label: string
}

// Shared renderer for a localized document (privacy, support, …): language
// switch + sections + contact + footer. Used by PrivacyPage and SupportPage.
export function DocPage({
  entry,
  footerLinks,
}: {
  entry: AppPrivacy
  footerLinks?: FooterLink[]
}) {
  const [lang, setLang] = useState<LangCode>('it')
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
        {footerLinks && footerLinks.length > 0 && (
          <p>
            {footerLinks.map((l, i) => (
              <span key={l.to}>
                {i > 0 && ' · '}
                <Link to={l.to}>{l.label}</Link>
              </span>
            ))}
          </p>
        )}
        <p>
          {entry.appName} · {entry.packageId}
        </p>
      </footer>
    </main>
  )
}
