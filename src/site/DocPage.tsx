import { Link } from 'react-router-dom'
import { useLang } from './lang'
import type { AppPrivacy } from './content'

export interface FooterLink {
  to: string
  label: string
}

export function DocPage({
  entry,
  footerLinks,
}: {
  entry: AppPrivacy
  footerLinks?: FooterLink[]
}) {
  const { lang } = useLang()
  const doc = entry.docs[lang]

  return (
    <main className="page doc" lang={lang}>
      <div className="doc-meta">
        <span className="chip">{entry.appName}</span>
        <span className="chip">{entry.packageId}</span>
      </div>

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

      {footerLinks && footerLinks.length > 0 && (
        <p className="muted small" style={{ marginTop: 32 }}>
          {footerLinks.map((l, i) => (
            <span key={l.to}>
              {i > 0 && ' · '}
              <Link to={l.to}>{l.label}</Link>
            </span>
          ))}
        </p>
      )}
    </main>
  )
}
