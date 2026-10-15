"use strict";
// HDD V2 — servidor local seguro (solo carpeta HDD). No expone WEB HDD.
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = __dirname;
const PORT = Number(process.env.PORT || 3100);
const MIME = { ".html":"text/html; charset=utf-8", ".js":"text/javascript; charset=utf-8", ".css":"text/css; charset=utf-8", ".json":"application/json; charset=utf-8", ".svg":"image/svg+xml", ".png":"image/png", ".ico":"image/x-icon" };
const server = http.createServer((req, res) => {
  try {
    const url = new URL(req.url, "http://" + req.headers.host);
    const pathname = decodeURIComponent(url.pathname);
    // /admin necesita COOP "same-origin-allow-popups": con "same-origin" Chrome corta
    // el window.opener del popup de login de Cloudinary y el Media Library se traba.
    const coop = pathname.startsWith("/admin/") ? "same-origin-allow-popups" : "same-origin";
    const file = pathname === "/" ? "index.html" : pathname.slice(1).split("?")[0];
    const fp = path.normalize(path.join(ROOT, file));
    if (!fp.startsWith(ROOT)) { res.writeHead(403); res.end("Forbidden"); return; }
    fs.readFile(fp, (err, data) => {
      if (err) { res.writeHead(404); res.end("Not found"); return; }
      const ext = path.extname(fp).toLowerCase();
      res.writeHead(200, {
        "content-type": MIME[ext] || "application/octet-stream",
        "x-content-type-options": "nosniff",
        "x-frame-options": "DENY",
        "referrer-policy": "strict-origin-when-cross-origin",
        "cross-origin-opener-policy": coop,
        "cross-origin-resource-policy": "same-origin",
        "permissions-policy": "camera=(), microphone=(), geolocation=()",
        "cache-control": ext === ".html" ? "no-cache" : "public, max-age=3600"
      });
      res.end(data);
    });
  } catch (e) { res.writeHead(500); res.end("internal error"); }
});
server.listen(PORT, () => console.log("HDD V2 local -> http://localhost:" + PORT));
