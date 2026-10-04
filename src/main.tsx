import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './site/App'

// I vecchi indirizzi col # (link già in giro, QR di AirportShift: …/#/airportshift/open?d=…)
// diventano indirizzi veri prima che il sito parta. Il dato del QR resta dopo il #
// (…/airportshift/open#d=…): così non arriva mai ai server di GitHub.
if (location.hash.startsWith('#/')) {
  const [path, query] = location.hash.slice(2).split('?')
  history.replaceState(null, '', import.meta.env.BASE_URL + path + (query ? '#' + query : ''))
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
