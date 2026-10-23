import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { SEO } from './src/site/seo'

// Dove vive il sito. Con un dominio proprio (es. www.ammapp.it): SITE_BASE=/ e SITE_URL=https://www.ammapp.it/
const BASE = process.env.SITE_BASE ?? '/AmmApp/'
const SITE_URL = process.env.SITE_URL ?? 'https://aleblaks.github.io/AmmApp/'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// Dopo la build: un index.html per ogni pagina di SEO (titolo, descrizione, anteprima social,
// indirizzo canonico, dati "app"), il 404.html che riporta al sito, sitemap.xml e robots.txt.
function paginePerGoogle(): Plugin {
  return {
    name: 'pagine-per-google',
    apply: 'build',
    closeBundle() {
      const html = readFileSync('dist/index.html', 'utf8')
      for (const [path, seo] of Object.entries(SEO)) {
        const url = SITE_URL + (path ? path + '/' : '')
        const ld = seo.app && {
          '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: seo.app.name,
          operatingSystem: 'iOS', applicationCategory: seo.app.category, description: seo.description,
          url, downloadUrl: `https://apps.apple.com/app/id${seo.app.iosAppId}`,
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        }
        const head = [
          `<title>${esc(seo.title)}</title>`,
          `<meta name="description" content="${esc(seo.description)}" />`,
          `<link rel="canonical" href="${url}" />`,
          `<meta property="og:title" content="${esc(seo.title)}" />`,
          `<meta property="og:description" content="${esc(seo.description)}" />`,
          `<meta property="og:url" content="${url}" />`,
          `<meta property="og:image" content="${SITE_URL}${seo.app ? 'icon-' + seo.app.name.toLowerCase().replace(/ /g, '') : 'icon-ammapp'}.png" />`,
          ld ? `<script type="application/ld+json">${JSON.stringify(ld)}</script>` : '',
        ].join('\n    ')
        const page = html
          .replace(/<title>.*?<\/title>/s, '')
          .replace(/<meta name="description"[^>]*>/, '')
          .replace(/<meta property="og:(title|description)"[^>]*>/g, '')
          .replace('</head>', `  ${head}\n  </head>`)
        mkdirSync(`dist/${path}`, { recursive: true })
        writeFileSync(`dist/${path}${path ? '/' : ''}index.html`, page)
      }
      // Indirizzi senza pagina propria (QR, store): GitHub risponde col 404.html, che carica il sito.
      writeFileSync('dist/404.html', html.replace('</head>', '  <meta name="robots" content="noindex" />\n  </head>'))
      writeFileSync('dist/sitemap.xml',
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
        Object.keys(SEO).map(p => `  <url><loc>${SITE_URL}${p ? p + '/' : ''}</loc></url>`).join('\n') +
        `\n</urlset>\n`)
      // Vale solo alla radice di un dominio: su aleblaks.github.io/AmmApp/ Google lo ignora,
      // con un dominio proprio inizia a contare da solo.
      writeFileSync('dist/robots.txt', `User-agent: *\nDisallow: ${BASE}*/open\nDisallow: ${BASE}*/store\n\nSitemap: ${SITE_URL}sitemap.xml\n`)
    },
  }
}

// Le immagini restano negli originali (PNG da 1206×2622, icone da 1024): alla build escono
// già ridotte e in WebP. Larghezze pensate per lo schermo più denso: un telefono sul sito
// è largo al massimo ~340 px, un'icona 88 px. Le cornici Apple restano com'erano.
function immaginiLeggere(url: URL) {
  if (url.searchParams.size || url.pathname.includes('/cornici/')) return new URLSearchParams()
  if (url.pathname.includes('/AmmAppIcon/')) return new URLSearchParams({ w: '256', format: 'webp' })
  if (url.pathname.includes('/AmmAppMockups/')) return new URLSearchParams({ w: '800', format: 'webp', quality: '80', withoutEnlargement: '' })
  return new URLSearchParams()
}

export default defineConfig(({ command }) => ({
  plugins: [react(), imagetools({ defaultDirectives: immaginiLeggere }), paginePerGoogle()],
  base: command === 'build' ? BASE : '/',
}))
