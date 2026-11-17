import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const HOST = '127.0.0.1'
const PORT = 5173
const EDITOR_URL = `http://${HOST}:${PORT}/map-generator/`

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
}

function send(res, status, body, type = 'text/plain; charset=utf-8') {
  res.writeHead(status, {
    'Content-Type': type,
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  })
  res.end(body)
}

function serveFile(res, filePath) {
  fs.stat(filePath, (error, stat) => {
    if (error || !stat.isFile()) {
      send(res, 404, 'Not found')
      return
    }
    const type = MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream'
    res.writeHead(200, {
      'Content-Type': type,
      'Content-Length': stat.size,
      'Cache-Control': 'no-store'
    })
    fs.createReadStream(filePath).pipe(res)
  })
}

const server = http.createServer((request, response) => {
  let pathname
  try {
    pathname = decodeURIComponent(new URL(request.url, `http://${HOST}`).pathname)
  } catch {
    send(response, 400, 'Bad request')
    return
  }

  if (pathname === '/') {
    response.writeHead(302, { Location: '/map-generator/' })
    response.end()
    return
  }

  if (pathname === '/map-generator') {
    response.writeHead(301, { Location: '/map-generator/' })
    response.end()
    return
  }

  let filePath = null
  if (pathname.startsWith('/map-generator/')) {
    const relative = pathname.slice('/map-generator/'.length) || 'index.html'
    filePath = path.join(ROOT, 'map-generator', relative)
  } else if (pathname.startsWith('/src/map/')) {
    filePath = path.join(ROOT, 'src', 'map', pathname.slice('/src/map/'.length))
  } else if (pathname === '/favicon.ico') {
    filePath = path.join(ROOT, 'public', 'favicon.ico')
  }

  if (!filePath) {
    send(response, 404, 'Not found')
    return
  }

  filePath = path.normalize(filePath)
  const allowedRoots = [
    path.join(ROOT, 'map-generator'),
    path.join(ROOT, 'src', 'map')
  ]
  const isAllowed = filePath === path.join(ROOT, 'public', 'favicon.ico') ||
    allowedRoots.some((base) => filePath === base || filePath.startsWith(base + path.sep))
  if (!isAllowed) {
    send(response, 403, 'Forbidden')
    return
  }

  serveFile(response, filePath)
})

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use.`)
  } else {
    console.error(error.message)
  }
  process.exitCode = 1
})

server.listen(PORT, HOST, () => {
  console.log(`Map editor: ${EDITOR_URL}`)
})
