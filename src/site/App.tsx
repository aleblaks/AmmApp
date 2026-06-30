import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, useState, type ReactNode } from 'react'
import { LangProvider } from './lang'
import { Layout } from './components/Layout'
import { Landing } from './Landing'
import { Apps } from './AppsPage'
import { OpenPage } from './OpenPage'
import { FeaturesPage } from './FeaturesPage'
import { PrivacyPage } from './PrivacyPage'
import { SupportPage } from './SupportPage'
import './styles.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }) }, [pathname])
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
        <HashRouter>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/apps" element={<Apps />} />
              <Route path="/:app/open" element={<OpenPage />} />
              <Route path="/:app/features" element={<FeaturesPage />} />
              <Route path="/:app/privacy" element={<PrivacyPage />} />
              <Route path="/:app/support" element={<SupportPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </HashRouter>
      </ClientOnly>
    </LangProvider>
  )
}
