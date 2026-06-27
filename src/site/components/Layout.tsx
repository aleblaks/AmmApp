import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useT } from '../lang'
import { LangSwitch } from './LangSwitch'
import AmmAppIcon from "../../AmmAppIcon/AmmAppIcone.png"

export function Layout({ children }: { children: ReactNode }) {
  const t = useT()
  return (
    <div className="shell">
      <header className="site-header">
        <div className="site-header-inner">
          <Link to="/" className="brand" aria-label="AmmApp home">
            <img
              src={AmmAppIcon}
              alt="AmmApp"
              className="brand-mark"
            />
            <span>AmmApp</span>
          </Link>
          <nav className="nav-links" aria-label="Primary">
            <Link to="/" className="nav-link">
              {t({ it: 'App', en: 'Apps' })}
            </Link>
            <a href="mailto:aleblaks@gmail.com" className="nav-link">
              {t({ it: 'Contatti', en: 'Contact' })}
            </a>
            <LangSwitch />
          </nav>
        </div>
      </header>

      {children}

      <footer className="site-footer">
        <div className="site-footer-inner">
          <span>© {new Date().getFullYear()} AmmApp</span>
          <span>
            <a href="mailto:aleblaks@gmail.com">aleblaks@gmail.com</a>
          </span>
        </div>
      </footer>
    </div>
  )
}
