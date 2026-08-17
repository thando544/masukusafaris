import { handleOptions, readBody, sendJson } from "../../_lib/http.js";

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

  sendJson(res, 200, {
    status: "pending",
    claim_token: body.claim_token || null,
    email: body.email || null,
    verification_uri: "https://masukusafaris.com/contact",
    instruction:
      "The traveler should confirm by emailing bookings@masukusafaris.com. Then exchange the claim_token at /api/oauth/token.",
  });
}
