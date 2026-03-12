const http = require("http");
const fs = require("fs");
const path = require("path");
const { parseCsv } = require("./lib/csv");

const PORT = process.env.PORT || 3010;
const PUBLIC_DIR = path.join(__dirname, "public");

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  res.end(JSON.stringify(payload, null, 2));
}

function serveFile(res, filePath) {
  fs.readFile(filePath, (error, content) => {
    if (error) {
      sendJson(res, 404, { error: "File not found" });
      return;
    }

    const contentType = filePath.endsWith(".css")
      ? "text/css; charset=utf-8"
      : "text/html; charset=utf-8";

    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  });
}

const server = http.createServer((req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    });
    res.end();
    return;
  }

  if (req.method === "GET" && req.url === "/") {
    serveFile(res, path.join(PUBLIC_DIR, "index.html"));
    return;
  }

  if (req.method === "GET" && req.url === "/styles.css") {
    serveFile(res, path.join(PUBLIC_DIR, "styles.css"));
    return;
  }

  if (req.method === "POST" && req.url === "/api/convert") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const payload = JSON.parse(body || "{}");
        const csv = typeof payload.csv === "string" ? payload.csv : "";

        if (!csv.trim()) {
          sendJson(res, 400, { error: "CSV content is required." });
          return;
        }

        const rows = parseCsv(csv);
        sendJson(res, 200, { rows });
      } catch (error) {
        sendJson(res, 400, { error: "Invalid request body." });
      }
    });

    return;
  }

  sendJson(res, 404, { error: "Route not found" });
});

server.listen(PORT, () => {
  console.log(`CSV to JSON app running at http://localhost:${PORT}`);
});
