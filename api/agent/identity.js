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
    sendJson(res, 400, { error: "invalid_request" });
    return;
  }

  const type = body.type || "anonymous";
  const claimToken = `claim_${crypto.randomUUID()}`;
  const userCode = String(Math.floor(100000 + Math.random() * 900000));

  if (type === "anonymous") {
    sendJson(res, 200, {
      type: "anonymous",
      identity_assertion: `assert_${crypto.randomUUID()}`,
      claim_token: claimToken,
      credential_types_supported: ["access_token"],
      token_endpoint: "https://masukusafaris.com/api/oauth/token",
    });
    return;
  }

  sendJson(res, 200, {
    type,
    claim_token: claimToken,
    claim: {
      user_code: userCode,
      verification_uri: "https://masukusafaris.com/contact",
      verification_uri_complete: `https://masukusafaris.com/contact?code=${userCode}`,
      interval: 5,
      expires_in: 1800,
    },
    instruction:
      "Ask the traveler to email bookings@masukusafaris.com with the user_code, then exchange at /api/oauth/token.",
  });
}
