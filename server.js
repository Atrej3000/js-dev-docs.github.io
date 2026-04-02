/**
 * UA Dev Docs — Local Development Server
 * Node.js built-in http module — NO npm install required
 *
 * Usage: node server.js
 * Then open: http://localhost:3000
 */
const http  = require('http');
const fs    = require('fs');
const path  = require('path');
const url   = require('url');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.txt':  'text/plain; charset=utf-8',
  '.xml':  'application/xml',
};

function serveFile(res, filePath) {
  const ext  = path.extname(filePath).toLowerCase();
  const mime = MIME[ext] || 'application/octet-stream';
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('404 Not Found'); return; }
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const parsed   = url.parse(req.url);
  let   pathname = decodeURIComponent(parsed.pathname);

  // Resolve to filesystem path
  let filePath = path.join(ROOT, pathname);

  // Security: prevent directory traversal
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }

  fs.stat(filePath, (err, stat) => {
    if (err) {
      // Try .html extension
      const withHtml = filePath + '.html';
      fs.stat(withHtml, (e2, s2) => {
        if (!e2 && s2.isFile()) { serveFile(res, withHtml); return; }
        res.writeHead(404); res.end('404 Not Found');
      });
      return;
    }

    if (stat.isDirectory()) {
      // Serve index.html from directory
      const indexPath = path.join(filePath, 'index.html');
      fs.stat(indexPath, (e2, s2) => {
        if (!e2 && s2.isFile()) { serveFile(res, indexPath); return; }
        // Auto-redirect: /uk → /uk/
        if (!pathname.endsWith('/')) {
          res.writeHead(301, { Location: pathname + '/' });
          res.end(); return;
        }
        res.writeHead(404); res.end('Directory listing disabled');
      });
      return;
    }

    if (stat.isFile()) {
      serveFile(res, filePath);
      return;
    }

    res.writeHead(404); res.end('Not Found');
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('\n┌─────────────────────────────────────────┐');
  console.log('│         UA Dev Docs — Local Server       │');
  console.log('├─────────────────────────────────────────┤');
  console.log(`│  🌐  http://localhost:${PORT}               │`);
  console.log('│  📖  Ctrl+C to stop                     │');
  console.log('└─────────────────────────────────────────┘\n');
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Try: PORT=3001 node server.js`);
  } else {
    console.error(err);
  }
  process.exit(1);
});
