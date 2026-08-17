export const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS, HEAD",
  "Access-Control-Allow-Headers":
    "Authorization, Content-Type, Accept, MCP-Protocol-Version",
  "Access-Control-Expose-Headers": "x-markdown-tokens, Link, WWW-Authenticate",
};

export function setCors(res) {
  for (const [key, value] of Object.entries(CORS_HEADERS)) {
    res.setHeader(key, value);
  }
}

export function sendJson(res, status, data, extraHeaders = {}) {
  setCors(res);
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  for (const [key, value] of Object.entries(extraHeaders)) {
    res.setHeader(key, value);
  }
  if (status === 204) {
    res.end();
    return;
  }
  res.end(JSON.stringify(data));
}

export function handleOptions(req, res) {
  if (req.method === "OPTIONS" || req.method === "HEAD") {
    setCors(res);
    res.statusCode = req.method === "HEAD" ? 200 : 204;
    res.end();
    return true;
  }
  return false;
}

export async function readBody(req) {
  if (req.body && typeof req.body === "object" && !Buffer.isBuffer(req.body)) {
    return req.body;
  }
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return Object.fromEntries(new URLSearchParams(req.body));
    }
  }
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8").trim();
  if (!raw) return {};
  const contentType = String(req.headers["content-type"] || "");
  if (contentType.includes("application/json")) return JSON.parse(raw);
  if (contentType.includes("application/x-www-form-urlencoded")) {
    return Object.fromEntries(new URLSearchParams(raw));
  }
  try {
    return JSON.parse(raw);
  } catch {
    return Object.fromEntries(new URLSearchParams(raw));
  }
}
