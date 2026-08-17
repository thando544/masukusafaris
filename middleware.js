const LINK_HEADER = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</api/openapi.json>; rel="service-desc"; type="application/json"',
  '</docs/api>; rel="service-doc"; type="text/html"',
  '</.well-known/mcp/server-card.json>; rel="describedby"; type="application/json"',
  '</auth.md>; rel="describedby"; type="text/markdown"',
].join(", ");

const MARKDOWN_ROUTES = new Set([
  "/",
  "/about",
  "/packages",
  "/activities",
  "/contact",
  "/book",
  "/docs/api",
]);

export const config = {
  matcher: [
    "/",
    "/about",
    "/packages",
    "/packages/:path*",
    "/activities",
    "/activities/:path*",
    "/contact",
    "/book",
    "/docs/api",
  ],
};

function prefersMarkdown(acceptHeader) {
  if (!acceptHeader) return false;
  const parts = acceptHeader.split(",").map((part) => {
    const [type, ...params] = part.trim().split(";");
    const qParam = params.find((param) => param.trim().startsWith("q="));
    const q = qParam ? Number.parseFloat(qParam.trim().slice(2)) : 1;
    return { type: type.trim().toLowerCase(), q: Number.isFinite(q) ? q : 1 };
  });
  const markdown = parts.find(
    (part) => part.type === "text/markdown" || part.type === "text/x-markdown"
  );
  if (!markdown) return false;
  const html = parts.find((part) => part.type === "text/html");
  if (!html) return true;
  return markdown.q >= html.q;
}

function markdownPathFor(pathname) {
  const path = pathname.replace(/\/$/, "") || "/";
  if (MARKDOWN_ROUTES.has(path)) {
    return path === "/" ? "/index.md" : `${path}.md`;
  }
  if (path.startsWith("/packages/") || path.startsWith("/activities/")) {
    return `${path}.md`;
  }
  return null;
}

export default async function middleware(request) {
  const url = new URL(request.url);
  const headers = new Headers();
  headers.set("Link", LINK_HEADER);
  headers.set("Vary", "Accept");

  if (!prefersMarkdown(request.headers.get("accept") || "")) {
    return;
  }

  const markdownPath = markdownPathFor(url.pathname);
  if (!markdownPath) return;

  const markdownUrl = new URL(markdownPath, url.origin);
  const markdownResponse = await fetch(markdownUrl);
  if (!markdownResponse.ok) return;

  const body = await markdownResponse.text();
  headers.set("Content-Type", "text/markdown; charset=utf-8");
  headers.set("x-markdown-tokens", String(Math.max(1, Math.ceil(body.length / 4))));
  headers.set("Access-Control-Allow-Origin", "*");
  return new Response(body, { status: 200, headers });
}
