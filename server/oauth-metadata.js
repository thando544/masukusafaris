const SCOPES = [
  "packages.read",
  "activities.read",
  "inquiries.write",
  "bookings.write",
];

const APEX_ORIGIN = "https://masukusafaris.com";
const WWW_ORIGIN = "https://www.masukusafaris.com";

export function requestOrigin(reqLike) {
  if (reqLike instanceof URL) {
    return reqLike.origin.replace(/\/$/, "");
  }

  const url = reqLike.url instanceof URL ? reqLike.url : null;
  if (url?.origin) return url.origin.replace(/\/$/, "");

  const headers = reqLike.headers || {};
  const header = (name) => {
    const value = headers[name] || headers[name.toLowerCase()];
    return Array.isArray(value) ? value[0] : value;
  };

  const host =
    header("x-forwarded-host") || header("host") || "www.masukusafaris.com";
  const hostname = String(host).split(",")[0].trim();
  const forwardedProto = header("x-forwarded-proto");
  const proto = forwardedProto
    ? String(forwardedProto).split(",")[0].trim()
    : hostname.startsWith("localhost") || hostname.startsWith("127.")
      ? "http"
      : "https";
  return `${proto}://${hostname}`.replace(/\/$/, "");
}

export function authorizationServers(origin) {
  return [...new Set([origin.replace(/\/$/, ""), APEX_ORIGIN, WWW_ORIGIN])];
}

export function oauthProtectedResourceMetadata(origin, extraPath = "") {
  const base = String(origin || WWW_ORIGIN).replace(/\/$/, "");
  const path = extraPath && extraPath !== "/" ? extraPath : "";
  return {
    resource: `${base}${path}`,
    resource_name: "Masuku Adventure Safaris",
    resource_documentation: `${base}/docs/api`,
    authorization_servers: authorizationServers(base),
    bearer_methods_supported: ["header"],
    scopes_supported: SCOPES,
    resource_signing_alg_values_supported: ["RS256", "HS256"],
    token_endpoint_auth_methods_supported: [
      "client_secret_basic",
      "client_secret_post",
      "none",
    ],
  };
}

export function wwwAuthenticate(origin) {
  const resourceMetadata = `${String(origin).replace(/\/$/, "")}/.well-known/oauth-protected-resource`;
  return `Bearer realm="Masuku Adventure Safaris", resource_metadata="${resourceMetadata}"`;
}
