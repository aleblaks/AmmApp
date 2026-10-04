import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, useState, type ReactNode } from 'react'
import { LangProvider } from './lang'
import { Layout } from './components/Layout'
import { Landing } from './Landing'
import { Apps } from './AppsPage'
import { OpenPage } from './OpenPage'
import { StorePage } from './StorePage'
import { FeaturesPage } from './FeaturesPage'
import { InsiemePage } from './InsiemePage'
import { PrivacyPage } from './PrivacyPage'
import { SupportPage } from './SupportPage'
import { SEO, NOINDEX } from './seo'
import './styles.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }) }, [pathname])
  return null
}

// Titolo e descrizione della pagina corrente (le pagine statiche li hanno già al primo caricamento:
// qui si aggiornano mentre si naviga), e "noindex" sulle pagine del QR e dello store.
function Meta() {
  const { pathname } = useLocation()
  useEffect(() => {
    const seo = SEO[pathname.replace(/^\/|\/$/g, '')] ?? SEO['']
    document.title = seo.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', seo.description)
    document.querySelector('meta[name="robots"]')?.remove()
    if (NOINDEX.test(pathname)) {
      const m = document.createElement('meta')
      m.name = 'robots'; m.content = 'noindex'
      document.head.appendChild(m)
    }
  }, [pathname])
  return null
}

function ClientOnly({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  return children
}


export default function App() {
  return (
    <LangProvider>
      <ClientOnly>
        <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <ScrollToTop />
          <Meta />
          <Layout>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/apps" element={<Apps />} />
              <Route path="/insieme" element={<InsiemePage />} />
              <Route path="/:app/open" element={<OpenPage />} />
              <Route path="/:app/store" element={<StorePage />} />
              <Route path="/:app/features" element={<FeaturesPage />} />
              <Route path="/:app/privacy" element={<PrivacyPage />} />
              <Route path="/:app/support" element={<SupportPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ClientOnly>
    </LangProvider>
  )
}
