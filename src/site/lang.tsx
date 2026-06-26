import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { LangCode } from './content'

interface LangCtx {
  lang: LangCode
  setLang: (l: LangCode) => void
}

const Ctx = createContext<LangCtx | null>(null)
const STORAGE_KEY = 'ammapp.lang'

function detectInitial(): LangCode {
  if (typeof window === 'undefined') return 'it'
  const saved = window.localStorage?.getItem(STORAGE_KEY) as LangCode | null
  if (saved === 'it' || saved === 'en') return saved
  const nav = window.navigator?.language?.toLowerCase() ?? ''
  return nav.startsWith('en') ? 'en' : 'it'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(detectInitial)
  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, lang) } catch {}
    if (typeof document !== 'undefined') document.documentElement.lang = lang
  }, [lang])
  return <Ctx.Provider value={{ lang, setLang: setLangState }}>{children}</Ctx.Provider>
}

export function useLang() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useLang must be used inside <LangProvider>')
  return c
}

export type Bi = { it: string; en: string }
export function useT() {
  const { lang } = useLang()
  return (b: Bi) => b[lang]
}
