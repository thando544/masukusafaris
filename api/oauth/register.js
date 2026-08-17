import { handleOptions, readBody, sendJson } from "../_lib/http.js";

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
    sendJson(res, 400, { error: "invalid_client_metadata" });
    return;
  }

  const clientId = `msa_client_${crypto.randomUUID()}`;
  sendJson(res, 201, {
    client_id: clientId,
    client_secret: `msa_secret_${crypto.randomUUID()}`,
    client_id_issued_at: Math.floor(Date.now() / 1000),
    client_secret_expires_at: 0,
    client_name: body.client_name || "Unnamed agent",
    redirect_uris: body.redirect_uris || [],
    grant_types: body.grant_types || ["client_credentials"],
    token_endpoint_auth_method:
      body.token_endpoint_auth_method || "client_secret_basic",
    registration_client_uri:
      "https://masukusafaris.com/.well-known/oauth-authorization-server",
  });
}
