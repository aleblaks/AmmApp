import { useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'
const KEY = 'ammapp.theme'
const mq = typeof matchMedia !== 'undefined' ? matchMedia('(prefers-color-scheme: dark)') : null
const listeners = new Set<() => void>()

function saved(): Theme | null {
  try {
    const v = window.localStorage.getItem(KEY)
    return v === 'light' || v === 'dark' ? v : null
  } catch { return null }
}

// Scelta esplicita se c'è, altrimenti il tema del dispositivo.
function current(): Theme {
  return saved() ?? (mq?.matches ? 'dark' : 'light')
}

function apply() {
  const s = saved()
  if (s) document.documentElement.dataset.theme = s
  else delete document.documentElement.dataset.theme
}

export function setTheme(t: Theme) {
  try { window.localStorage.setItem(KEY, t) } catch {}
  apply()
  listeners.forEach((l) => l())
}

if (typeof document !== 'undefined') {
  apply()
  mq?.addEventListener('change', () => listeners.forEach((l) => l()))
}

const subscribe = (cb: () => void) => { listeners.add(cb); return () => { listeners.delete(cb) } }

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, current, () => 'dark')
}
