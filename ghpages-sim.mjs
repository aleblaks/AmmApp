// Faithful simulation of GitHub Pages for a PROJECT repo served at /AmmApp/.
// - existing file under /AmmApp/  -> 200 with that file
// - /AmmApp/ (dir)               -> 200 index.html
// - unknown path under /AmmApp/  -> 404 status + 404.html  (key difference vs Vite)
// - anything else                -> 404
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { join, extname } from 'node:path'

const ROOT = new URL('./dist/', import.meta.url).pathname
const BASE = '/AmmApp/'
const PORT = 4178

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
}

async function send(res, status, filePath) {
  const body = await readFile(filePath)
  res.writeHead(status, { 'Content-Type': TYPES[extname(filePath)] || 'application/octet-stream' })
  res.end(body)
}

createServer(async (req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, `http://localhost:${PORT}`).pathname)
  if (!pathname.startsWith(BASE)) {
    res.writeHead(404).end('Not found (outside base)')
    return
  }
  let rel = pathname.slice(BASE.length)
  if (rel === '' || rel.endsWith('/')) rel += 'index.html'
  const filePath = join(ROOT, rel)
  try {
    const s = await stat(filePath)
    if (s.isFile()) return await send(res, 200, filePath)
    return await send(res, 404, join(ROOT, '404.html'))
  } catch {
    // mimic GitHub Pages: unknown path -> 404 status served with 404.html
    return await send(res, 404, join(ROOT, '404.html'))
  }
}).listen(PORT, () => console.log(`ghpages-sim on http://localhost:${PORT}${BASE}`))
