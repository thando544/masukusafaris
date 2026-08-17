import { handleOptions, readBody, sendJson } from "../_lib/http.js";

function tokenResponse(scope) {
  const now = Math.floor(Date.now() / 1000);
  return {
    token_type: "Bearer",
    expires_in: 3600,
    scope:
      scope || "packages.read activities.read inquiries.write bookings.write",
    access_token: `msa_${now}_${crypto.randomUUID()}`,
  };
}

export default async function handler(req, res) {
  if (handleOptions(req, res)) return;
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "method_not_allowed" });
    return;
  }

  let body;
  try {
    body = await readBody(req);
  } catch {
    sendJson(res, 400, { error: "invalid_request" });
    return;
  }

  const grantType = body.grant_type;
  const allowed = [
    "client_credentials",
    "authorization_code",
    "refresh_token",
    "urn:ietf:params:oauth:grant-type:jwt-bearer",
    "urn:workos:agent-auth:grant-type:claim",
  ];

  if (!allowed.includes(grantType)) {
    sendJson(res, 400, {
      error: "unsupported_grant_type",
      error_description: `Supported: ${allowed.join(", ")}`,
    });
    return;
  }

  sendJson(res, 200, tokenResponse(body.scope));
}
