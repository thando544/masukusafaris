import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  oauthProtectedResourceMetadata,
  requestOrigin,
} from "../server/oauth-metadata.js";

const LINK_HEADER = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</api/openapi.json>; rel="service-desc"; type="application/json"',
  '</docs/api>; rel="service-doc"; type="text/html"',
  '</.well-known/mcp/server-card.json>; rel="describedby"; type="application/json"',
  '</auth.md>; rel="describedby"; type="text/markdown"',
].join(", ");

const CONTENT_TYPES = {
  "/robots.txt": "text/plain; charset=utf-8",
  "/sitemap.xml": "application/xml; charset=utf-8",
  "/auth.md": "text/markdown; charset=utf-8",
  "/llms.txt": "text/plain; charset=utf-8",
  "/.well-known/api-catalog":
    'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
  "/.well-known/oauth-authorization-server": "application/json; charset=utf-8",
  "/.well-known/openid-configuration": "application/json; charset=utf-8",
  "/.well-known/oauth-protected-resource": "application/json; charset=utf-8",
  "/.well-known/mcp.json": "application/json; charset=utf-8",
  "/.well-known/mcp/server-card.json": "application/json; charset=utf-8",
  "/.well-known/agent-skills/index.json": "application/json; charset=utf-8",
  "/.well-known/agent-index.json": "application/json; charset=utf-8",
  "/.well-known/agent-card.json": "application/json; charset=utf-8",
};

function prefersMarkdown(acceptHeader) {
  if (!acceptHeader) return false;
  return /text\/markdown|text\/x-markdown/i.test(acceptHeader);
}

function markdownPathFor(pathname) {
  const path = pathname.replace(/\/$/, "") || "/";
  const staticRoutes = new Set([
    "/",
    "/about",
    "/packages",
    "/activities",
    "/contact",
    "/book",
    "/docs/api",
  ]);
  if (staticRoutes.has(path)) return path === "/" ? "/index.md" : `${path}.md`;
  if (path.startsWith("/packages/") || path.startsWith("/activities/")) {
    return `${path}.md`;
  }
  return null;
}

export default function agentReadyPlugin() {
  return {
    name: "agent-ready",
    buildStart() {
      execFileSync(process.execPath, ["scripts/generate-agent-assets.mjs"], {
        stdio: "inherit",
      });
    },
    configureServer(server) {
      const publicDir = join(server.config.root, "public");
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url || "/", "http://localhost");
        const pathname = url.pathname;

        if (pathname === "/" || pathname === "") {
          res.setHeader("Link", LINK_HEADER);
        }

        if (
          req.method === "GET" &&
          (pathname === "/.well-known/oauth-protected-resource" ||
            pathname.startsWith("/.well-known/oauth-protected-resource/"))
        ) {
          const extra =
            pathname === "/.well-known/oauth-protected-resource"
              ? ""
              : pathname.slice("/.well-known/oauth-protected-resource".length);
          const body = JSON.stringify(
            oauthProtectedResourceMetadata(requestOrigin(req), extra),
            null,
            2
          );
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.end(body);
          return;
        }

        const typed = CONTENT_TYPES[pathname];
        if (typed && req.method === "GET") {
          try {
            const body = readFileSync(join(publicDir, pathname.slice(1)));
            res.statusCode = 200;
            res.setHeader("Content-Type", typed);
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.end(body);
            return;
          } catch {
            next();
            return;
          }
        }

        if (prefersMarkdown(req.headers.accept || "")) {
          const markdownPath = markdownPathFor(pathname);
          if (markdownPath) {
            try {
              const body = readFileSync(
                join(publicDir, markdownPath.slice(1)),
                "utf8"
              );
              res.statusCode = 200;
              res.setHeader("Content-Type", "text/markdown; charset=utf-8");
              res.setHeader(
                "x-markdown-tokens",
                String(Math.max(1, Math.ceil(body.length / 4)))
              );
              res.setHeader("Vary", "Accept");
              res.setHeader("Access-Control-Allow-Origin", "*");
              res.end(body);
              return;
            } catch {
              next();
              return;
            }
          }
        }

        const staticApi = {
          "/api/health": "/api/health.json",
          "/api/packages": "/api/packages.json",
          "/api/activities": "/api/activities.json",
        };
        if (staticApi[pathname] && req.method === "GET") {
          try {
            const body = readFileSync(
              join(publicDir, staticApi[pathname].slice(1))
            );
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.end(body);
            return;
          } catch {
            next();
            return;
          }
        }

        next();
      });
    },
  };
}
